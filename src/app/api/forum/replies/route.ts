import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const supabase = await createClient();

  const { searchParams } = new URL(req.url);
  const commentId = searchParams.get("comment_id");

  if (!commentId) {
    return NextResponse.json({ error: "Missing comment_id" }, { status: 400 });
  }

  // Get all replies for the given comment
  const { data: replies, error } = await supabase
    .from("forum_comment_replies")
    .select(
      `
      id,
      comment_id,
      content,
      created_at,
      user_id,
      users:user_id (
        username,
        image_name
      )
    `
    )
    .eq("comment_id", commentId)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(replies);
}
