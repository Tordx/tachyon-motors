'use client'

import { useEffect, useState } from 'react'
import { ForumCommentResponse, ForumContentResponse } from '@/types'
import { InteractionsServices } from '@/services/interactions'
import axios from 'axios'
import { useAuth } from '@/context/auth-context'
import { ForumService } from '@/services/forum'
import { useRouter } from 'next/navigation'
import Loading from './loading'
import AuthorSection from './sections/author'
import ContentSection from './sections/content'
import CommentSection from './sections/comments'

const ForumItem = ({ id }: { id: string }) => {
  const { isAuthenticated } = useAuth()
  const [forumDetails, setForumDetails] = useState<ForumContentResponse | null>(null)
  const [comments, setComments] = useState<ForumCommentResponse[]>([])
  const [commentLoading, setCommentLoading] = useState<boolean>(false)
  const [newComment, setNewComment] = useState('')
  const [replyInputs, setReplyInputs] = useState<Record<number, string>>({})
  const [commentReplies, setCommentReplies] = useState<Record<number, ForumCommentResponse[]>>({});
  const [openReplies, setOpenReplies] = useState<Record<number, boolean>>({});
  const [commentsRepliesLoading, setCommentsRepliesLoading] = useState<Record<number, boolean>>({});
  const [iLiked, setILiked] = useState<boolean>(false)
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const BUCKET_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;


  useEffect(() => {
    fetchData()
    fetchComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const fetchComments = async () => {
    try {
      setCommentLoading(true)
      const response = await ForumService.getForumComments(Number(id))
      setComments(response)
    } catch (error) {
      console.error(error)
    } finally {
      setCommentLoading(false)
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await ForumService.getByForumId(Number(id))
      setForumDetails(response || null)
      if (response?.liked) setILiked(response.liked)
    } catch (error) {
      console.error(error)
      setForumDetails(null)
    } finally {
      setLoading(false)
    }
  }

  const handleInteractionPressed = async (item: string) => {
    if (!isAuthenticated) {
      router.replace('?modal=login')
      return
    }

    if (item === 'cookie') {
      const increment = iLiked ? -1 : 1
      setILiked(!iLiked)
      setForumDetails((prev) =>
        prev
          ? {
            ...prev,
            interaction_counter: {
              ...prev.interaction_counter,
              like_count: (prev.interaction_counter?.like_count ?? 0) + increment,
              comment_count: prev.interaction_counter?.comment_count ?? 0,
              share_count: prev.interaction_counter?.share_count ?? 0,
              report_count: prev.interaction_counter?.report_count ?? 0,
            },
          }
          : prev
      )
      try {
        await InteractionsServices.cookie(forumDetails!.forum_id)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            router.replace('?modal=login')
          } else {
            console.error('API Error:', err)
          }
        } else {
          console.error('Unexpected Error:', err)
        }
      }
    }
  }

  const handleAddComment = async () => {
    if (!isAuthenticated) {
      router.replace('?modal=login')
      return
    }

    if (!newComment.trim()) return
    try {
      await ForumService.addForumComment(Number(id), newComment)
      setNewComment('')
      fetchComments()
      setForumDetails((prev) =>
        prev
          ? {
            ...prev,
            interaction_counter: {
              ...prev.interaction_counter,
              like_count: prev.interaction_counter?.like_count ?? 0,
              comment_count: (prev.interaction_counter?.comment_count ?? 0) + 1,
              share_count: prev.interaction_counter?.share_count ?? 0,
              report_count: prev.interaction_counter?.report_count ?? 0,
            },
          }
          : prev
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddReply = async (commentId: number) => {
    if (!isAuthenticated) {
      router.replace('?modal=login')
      return
    }

    const reply = replyInputs[commentId]?.trim()
    if (!reply) return
    try {
      await ForumService.addCommentReply(commentId, reply)
      setReplyInputs((prev) => ({ ...prev, [commentId]: '' }))
      fetchComments()
    } catch (error) {
      console.error(error)
    }
  }

  const toggleReplies = async (commentId: number) => {
    setOpenReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId], // toggle only this comment
    }));

    // if replies already loaded, skip refetch
    if (commentReplies[commentId]) return;

    try {
      setCommentsRepliesLoading((prev) => ({ ...prev, [commentId]: true }));

      const response = await ForumService.getCommentReplies(commentId);
      if (response?.length) {
        setCommentReplies((prev) => ({ ...prev, [commentId]: response }));
      } else {
        setCommentReplies((prev) => ({ ...prev, [commentId]: [] }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCommentsRepliesLoading((prev) => ({ ...prev, [commentId]: false }));
    }
  };

  if (loading) return <Loading />

  if (!forumDetails)
    return (
      <div className="max-w-3xl mx-auto py-20 text-center text-gray-400 font-montserrat">
        <p>No forum content found.</p>
      </div>
    )



  return (
    <div className="fixed pt-25 inset-0 overflow-y-auto bg-black text-gray-100 font-montserrat">
      <div className="w-full max-w-4xl mx-auto py-10 px-4">

        {/* Forum Author */}
        <AuthorSection forumDetails={forumDetails} bucket_url={BUCKET_URL} />
        {/* Forum Content */}
        <ContentSection forumDetails={forumDetails} iLiked={iLiked} handleInteractionPressed={handleInteractionPressed} />
        {/* Comments Section */}
        <CommentSection
          comments={comments}
          commentLoading={commentLoading}
          commentReplies={commentReplies}
          commentsRepliesLoading={commentsRepliesLoading}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
          toggleReplies={toggleReplies}
          openReplies={openReplies}
          isAuthenticated={isAuthenticated}
          handleAddReply={handleAddReply}
          bucket_url={BUCKET_URL}
          replyInputs={replyInputs}
          setReplyInputs={(id, e) =>
            setReplyInputs((prev) => ({
              ...prev,
              [id]: e,
            }))} />
      </div>
    </div>
  )
}

export default ForumItem
