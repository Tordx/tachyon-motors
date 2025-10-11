import { Discussion } from "@/types";
import type { SupabaseClient } from "@supabase/supabase-js";

export class DiscussionService {
  /**
   * Fetch all discussions (categories)
   */
  static async getAll(supabase: SupabaseClient): Promise<Discussion[]> {
    const { data, error } = await supabase
      .from("discussions")
      .select(`
        *,
        parent:parent_id (id, title, slug)
      `)
      .order("title", { ascending: true });

    if (error) throw error;
    return data as Discussion[];
  }

  /**
   * Fetch discussion by ID
   */
  static async getById(
    supabase: SupabaseClient,
    id: number
  ): Promise<Discussion | null> {
    const { data, error } = await supabase
      .from("discussions")
      .select(`
        *,
        parent:parent_id (id, title, slug)
      `)
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as Discussion | null;
  }

  /**
   * Fetch subcategories or child discussions
   */
  static async getChildren(
    supabase: SupabaseClient,
    parentId: number
  ): Promise<Discussion[]> {
    const { data, error } = await supabase
      .from("discussions")
      .select("*")
      .eq("parent_id", parentId)
      .order("title", { ascending: true });

    if (error) throw error;
    return data as Discussion[];
  }
}
