import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ forum_id: string }> }
) {
  const { forum_id } = await context.params;
  const forumId = Number(forum_id);

  if (!forumId) {
    return NextResponse.json(
      { error: "Missing or invalid forum_id parameter" },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const { data: comments, error: commentError } = await supabase
    .from("forum_comments")
    .select(
      `
      id,
      created_at,
      content,
      user_id,
      users:user_id (
        username,
        image_name
      )
    `
    )
    .eq("forum_id", forumId)
    .order("created_at", { ascending: false });

  if (commentError) {
    console.error(commentError);
    return NextResponse.json(
      { error: "Failed to fetch forum comments" },
      { status: 500 }
    );
  }

  const commentIds = comments?.map((c) => c.id) || [];
  const replyCounts: Record<number, number> = {};

  if (commentIds.length > 0) {
    const { data: replies, error: replyError } = await supabase
      .from("forum_comment_replies")
      .select("comment_id")
      .in("comment_id", commentIds);

    if (replyError) console.error(replyError);
    else {
      replies.forEach((r) => {
        replyCounts[r.comment_id] = (replyCounts[r.comment_id] || 0) + 1;
      });
    }
  }

  const formattedComments = comments.map((comment) => {
    const userData = Array.isArray(comment.users)
      ? comment.users[0]
      : comment.users;

    return {
      id: comment.id,
      created_at: comment.created_at,
      content: comment.content,
      user: userData
        ? {
            username: userData.username,
            image_name: userData.image_name,
          }
        : null,
      reply_count: replyCounts[comment.id] || 0,
    };
  });

  return NextResponse.json(formattedComments);
}
