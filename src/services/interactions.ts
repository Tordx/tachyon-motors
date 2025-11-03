import api from "@/lib/axios";

export class InteractionsServices {
  static async cookie(forum_id: number){

    const response = await api.post('forum/interactions/cookie', {
      forum_id
    })
    return response
  }
}