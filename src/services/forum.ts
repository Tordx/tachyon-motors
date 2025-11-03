import api from "@/lib/axios";
import { ForumContent, ForumContentResponse } from "@/types";

export class ForumService {
  static async getAllCurrent(): Promise<ForumContent[]> {
    const response = await api.get('forum');
    const data = response.data
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
