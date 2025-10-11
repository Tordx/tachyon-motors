import { ForumContent } from "@/types";
import type { SupabaseClient } from "@supabase/supabase-js";

export class ForumService {
  static async getAllCurrent(supabase: SupabaseClient): Promise<ForumContent[]> {
    const { data, error } = await supabase
      .from("forum_contents")
      .select(`
        *,
        forum:forum_id (id, created_at)
      `)
      .eq("is_current", true);

    if (error) throw error;
    return data as ForumContent[];
  }

  static async getByForumId(
    supabase: SupabaseClient,
    forumId: number
  ): Promise<ForumContent[]> {
    const { data, error } = await supabase
      .from("forum_contents")
      .select(`
        *
      `)
      .eq("is_current", true)
      .eq("forum_id", forumId)
      .order("edited_at", { ascending: false });

    if (error) throw error;
    return data as ForumContent[];
  }
}
