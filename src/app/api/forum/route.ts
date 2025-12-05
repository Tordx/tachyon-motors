import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;


interface RawUserInteraction {
  ic_id: number;
  interaction_counter:
    | { forum_id: number }
    | { forum_id: number }[]
    | null;
}

interface UserInteraction {
  ic_id: number;
  interaction_counter: { forum_id: number } | null;
}


export async function GET() {
  const supabase = await createClient();

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    const { data: forumContents, error: forumError } = await supabase
      .from("forum_contents")
      .select("*")
      .eq("is_current", true);

    console.log("isnull?", user)
    if (forumError) throw forumError;

    const { data: interactionCounts, error: countsError } = await supabase
      .from("interaction_counter")
      .select("forum_id, like_count, comment_count, share_count");

    if (countsError) throw countsError;

    if (userError || !user) {
      const mergedData = (forumContents ?? []).map((content) => {
        const counts = interactionCounts?.find(
          (c) => c.forum_id === content.forum_id
        );

        return {
          ...content,
          like_count: counts?.like_count ?? 0,
          comment_count: counts?.comment_count ?? 0,
          share_count: counts?.share_count ?? 0,
          liked: false,
        };
      });

      return NextResponse.json(mergedData, { status: 200 });
    }

    const userId = user.id;

    const { data: rawUserInteractions, error: userIntError } = await supabase
      .from("interactions")
      .select(`
        ic_id,
        interaction_counter:ic_id (forum_id)
      `)
      .eq("user_id", userId);

    if (userIntError) throw userIntError;

    const userInteractions: UserInteraction[] = (rawUserInteractions ?? []).map(
      (item: RawUserInteraction): UserInteraction => ({
        ic_id: item.ic_id,
        interaction_counter: Array.isArray(item.interaction_counter)
          ? item.interaction_counter[0] ?? null
          : item.interaction_counter ?? null,
      })
    );

    const mergedData = (forumContents ?? []).map((content) => {
      const counts = interactionCounts?.find(
        (c) => c.forum_id === content.forum_id
      );

      const userHasLiked = userInteractions.some(
        (ui) => ui.interaction_counter?.forum_id === content.forum_id
      );

      return {
        ...content,
        like_count: counts?.like_count ?? 0,
        comment_count: counts?.comment_count ?? 0,
        share_count: counts?.share_count ?? 0,
        liked: userHasLiked,
      };
    });

    return NextResponse.json(mergedData, { status: 200 });
  } catch (error) {
    console.error("Error fetching forum contents:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
