import api from "@/lib/axios";
import { ForumContent, ForumContentResponse } from "@/types";
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
    forumId: number
  ): Promise<ForumContentResponse> {
    const response = await api.get('forum/getById', {
      params: {
        forumId
      }
    })
    const data = response.data as ForumContentResponse[]
    return data[0]
  }
}
