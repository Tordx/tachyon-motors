import api from "@/lib/axios";
import { ForumCommentResponse, ForumContent, ForumContentResponse } from "@/types";

export class ForumService {
  static async getAllCurrent(): Promise<ForumContent[]> {
    const response = await api.get('forum');
    const data = response.data
    return data as ForumContent[];
  }

  static async getByForumId(
    forumId: number
  ): Promise<ForumContentResponse> {
    const response = await api.get(`forum/${forumId}`)
    const data = response.data as ForumContentResponse[]
    return data[0]
  }

  static async getForumComments(
    forumId: number
  ): Promise<ForumCommentResponse[]> {
    const response = await api.get(`forum/${forumId}/comments `)
    const data = response.data as ForumCommentResponse[]
    return data;
  }

  static async getCommentReplies(
    comment_id: number
  ): Promise<ForumCommentResponse[]> {

    const response = await api.get(`forum/replies`, {
      params: {
        comment_id
      }
    })
    const data = response.data as ForumCommentResponse[]
    return data;
  }

 static async addForumComment(forumId: number, content: string) {
    const res = await api.post(`forum/${forumId}/comments/add`, { content })
    return res.data
  }

  static async addCommentReply(commentId: number, content: string) {
    const res = await api.post('forum/replies/add', {
      comment_id: commentId,
      content,
    })
    return res.data
  }
}
