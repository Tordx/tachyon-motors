import { ForumService } from "@/services/forum"
import ForumItem from "./client"

export default async function Page({ params }: { params: { id: string } }) {
  const forumDetails = await ForumService.getByForumId(Number(params.id))
  return <ForumItem forumDetails={forumDetails} />
}
