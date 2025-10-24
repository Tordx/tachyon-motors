import { ForumService } from "@/services/forum"
import ForumItem from "./client"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const forumDetails = await ForumService.getByForumId(Number(params.id))
  const forum = forumDetails // assuming forumDetails is the object you need

  return {
    title: forum ? `${forum.title} | Forum` : 'Forum Post',
    description: forum?.content?.slice(0, 150) || 'View detailed discussions and topics.',
    openGraph: {
      title: forum ? `${forum.title} | Forum` : 'Forum Post',
      description: forum?.content?.slice(0, 150) || 'View detailed discussions and topics.',
      images: [
        {
          url: 'https://tachyon-motors.vercel.app/assets/tachyon.png',
          width: 1200,
          height: 630,
          alt: forum?.title || 'Forum Post',
        },
      ],
      url: `https://tachyon-motors.vercel.app/forum/${params.id}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: forum?.title || 'Forum Post',
      description: forum?.content?.slice(0, 150) || 'Join the discussion now!',
      images: 'https://tachyon-motors.vercel.app/assets/tachyon.png',
    },
  }
}
export default async function Page({ params }: { params: { id: string } }) {
  const forumDetails = await ForumService.getByForumId(Number(params.id))
  return <ForumItem forumDetails={forumDetails} />
}
