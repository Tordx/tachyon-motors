import ForumItem from "./client"
import { Metadata } from "next"
import { createClient } from "@/utils/supabase/server";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const supabase = await createClient()
  const { data: forum, error } = await supabase
    .from("forum_contents")
    .select("title, content")
    .eq("forum_id", params.id)
    .single();

  if (error || !forum) {
    return {
      title: "Forum Post",
      description: "View detailed discussions and topics."
    };
  }

  return {
    title: `${forum.title} | Forum`,
    description: forum.content?.slice(0, 150) || 'View detailed discussions and topics.',
    openGraph: {
      title: `${forum.title} | Forum`,
      description: forum.content?.slice(0, 150) || 'View detailed discussions and topics.',
      images: [
        {
          url: 'https://tachyon-motors.vercel.app/assets/tachyon.png',
          width: 1200,
          height: 630,
          alt: forum.title,
        },
      ],
      url: `https://tachyon-motors.vercel.app/forum/${params.id}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: forum.title,
      description: forum.content?.slice(0, 150) || 'Join the discussion now!',
      images: 'https://tachyon-motors.vercel.app/assets/tachyon.png',
    },
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  return <ForumItem  id={params.id} />
}
