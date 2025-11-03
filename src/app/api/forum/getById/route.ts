import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const forumId = Number(searchParams.get("forumId"));

  if (!forumId) {
    return NextResponse.json(
      { error: "Missing forumId parameter" },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("forum_contents")
    .select(
      `
      id,
      forum_id,
      title,
      content,
      is_current,
      edited_at,
      forum:forum_id (
        id,
        user_id,
        users:user_id (
          username,
          image_name
        ),
        interaction_counter:interaction_counter!interaction_counter_forum_id_fkey (
          id,
          like_count,
          comment_count,
          share_count,
          report_count
        )
      )
    `
    )
    .eq("forum_id", forumId)
    .eq("is_current", true)
    .order("edited_at", { ascending: false });

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch forum content" },
      { status: 500 }
    );
  }

  // 🟢 Safely extract interaction_counter IDs
  const interactionCounterIds =
    data
      ?.map((fc) => {
        const forumItem = Array.isArray(fc.forum) ? fc.forum[0] : fc.forum;
        if (!forumItem) return null;

        const ic = Array.isArray(forumItem.interaction_counter)
          ? forumItem.interaction_counter[0]
          : forumItem.interaction_counter;

        return ic?.id ?? null;
      })
      .filter(Boolean) || [];

  // 🟢 If no user or user error, skip lookup and just mark liked as false
  let likedInteractions: number[] = [];
  if (!user || userError) {
    const formattedData =
      data?.map((fc) => {
        const forumItem = Array.isArray(fc.forum) ? fc.forum[0] : fc.forum;
        const forumUser = Array.isArray(forumItem?.users)
          ? forumItem.users[0]
          : forumItem?.users;
        const interactionCounter = Array.isArray(
          forumItem?.interaction_counter
        )
          ? forumItem.interaction_counter[0]
          : forumItem?.interaction_counter;

        return {
          id: fc.id,
          forum_id: fc.forum_id,
          title: fc.title,
          content: fc.content,
          is_current: fc.is_current,
          edited_at: fc.edited_at,
          user: forumUser
            ? {
                username: forumUser.username,
                image_name: forumUser.image_name,
              }
            : null,
          interaction_counter: interactionCounter
            ? {
                id: interactionCounter.id,
                like_count: interactionCounter.like_count,
                comment_count: interactionCounter.comment_count,
                share_count: interactionCounter.share_count,
                report_count: interactionCounter.report_count,
              }
            : null,
          liked: false,
        };
      }) || [];

    return NextResponse.json(formattedData);
  }

  if (interactionCounterIds.length > 0) {
    const { data: likedData, error: likedError } = await supabase
      .from("interactions")
      .select("ic_id")
      .in("ic_id", interactionCounterIds)
      .eq("user_id", user.id);

    if (!likedError && likedData) {
      likedInteractions = likedData.map((item) => item.ic_id);
    }
  }

  // 🟢 Format final data safely
  const formattedData =
    data?.map((fc) => {
      const forumItem = Array.isArray(fc.forum) ? fc.forum[0] : fc.forum;
      const forumUser = Array.isArray(forumItem?.users)
        ? forumItem.users[0]
        : forumItem?.users;

      const interactionCounter = Array.isArray(forumItem?.interaction_counter)
        ? forumItem.interaction_counter[0]
        : forumItem?.interaction_counter;

      const liked =
        interactionCounter && likedInteractions.includes(interactionCounter.id);

      return {
        id: fc.id,
        forum_id: fc.forum_id,
        title: fc.title,
        content: fc.content,
        is_current: fc.is_current,
        edited_at: fc.edited_at,
        user: forumUser
          ? {
              username: forumUser.username,
              image_name: forumUser.image_name,
            }
          : null,
        interaction_counter: interactionCounter
          ? {
              id: interactionCounter.id,
              like_count: interactionCounter.like_count,
              comment_count: interactionCounter.comment_count,
              share_count: interactionCounter.share_count,
              report_count: interactionCounter.report_count,
            }
          : null,
        liked,
      };
    }) || [];

  return NextResponse.json(formattedData);
}
