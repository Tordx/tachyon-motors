import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server"; // adjust path if needed

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

  const formattedData =
    data?.map((fc) => {
      const forum = fc.forum?.[0] || fc.forum || {};
      const user = forum.users?.[0] || forum.users || null;
      const interactionCounter =
        forum.interaction_counter?.[0] || forum.interaction_counter || null;

      return {
        id: fc.id,
        forum_id: fc.forum_id,
        title: fc.title,
        content: fc.content,
        is_current: fc.is_current,
        edited_at: fc.edited_at,
        user: user
          ? {
              username: user.username,
              image_name: user.image_name,
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
      };
    }) || [];

  return NextResponse.json(formattedData);
}
