/* eslint-disable @next/next/no-img-element */
import { ForumCommentResponse } from '@/types'
import { formatDistanceToNow } from 'date-fns'
import React from 'react'

type Props = {
  comments: ForumCommentResponse[]
  bucket_url: string | undefined
  toggleReplies(e: number): void
  openReplies: Record<number, boolean>
  commentsRepliesLoading: Record<number, boolean>
  commentReplies: Record<number, ForumCommentResponse[]>
  isAuthenticated: boolean
  replyInputs: Record<number, string>
  setReplyInputs(id: number, e: string): void
  handleAddReply(e: number): void
}

const CommentList = (props: Props) => {
  const {comments, bucket_url, toggleReplies, openReplies, commentsRepliesLoading, commentReplies, isAuthenticated, replyInputs, setReplyInputs, handleAddReply} = props;
  return (
    <>
      <div className="space-y-5">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4"
          >
            {/* Comment Author */}
            <div className="flex items-center gap-3 mb-2">
              {comment.user?.image_name ? (
                <img
                  src={`${bucket_url}/${comment.user.image_name}`}
                  alt={comment.user.username}
                  width={32}
                  height={32}
                  className="rounded-full border border-gray-700"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-semibold text-gray-300">
                  {comment.user?.username?.[0]?.toUpperCase() ?? '?'}
                </div>
              )}
              <span className="font-medium">{comment.user?.username}</span>
              <span className="text-gray-500 text-xs ml-auto">
                {formatDistanceToNow(new Date(comment.created_at), {
                  addSuffix: true,
                })}
              </span>
            </div>

            <p className="text-gray-300 mb-3">{comment.content}</p>

            {/* Replies */}
            <button
              onClick={() => toggleReplies(comment.id)}
              className="text-sm text-blue-400 hover:underline"
            >
              {openReplies[comment.id]
                ? 'Hide replies'
                : `${comment.reply_count && comment.reply_count > 0 ? `${comment.reply_count} replies` : "Reply "}`}
            </button>

            {openReplies[comment.id] && (
              <div className="mt-3 pl-6 border-l border-gray-800 space-y-3">
                {commentsRepliesLoading[comment.id] ? (
                  <p className="text-gray-500 text-sm">Loading replies...</p>
                ) : commentReplies[comment.id]?.length ? (
                  commentReplies[comment.id].map((reply) => (
                    <div key={reply.id} className="flex items-start gap-3">
                      {reply.user?.image_name ? (
                        <img
                          src={`${bucket_url}/${reply.user.image_name}`}
                          alt={reply.user.username}
                          width={28}
                          height={28}
                          className="rounded-full border border-gray-700"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs font-semibold text-gray-300">
                          {reply.user?.username?.[0]?.toUpperCase() ?? '?'}
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-gray-300">
                          <span className="font-medium">{reply.user?.username}</span>{' '}
                          {reply.content}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(reply.created_at), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No replies yet.</p>
                )}

                {/* Add Reply Input */}
                {isAuthenticated && <div className="flex gap-2 mt-3">
                  <input
                    type="text"
                    value={replyInputs[comment.id] || ''}
                    onChange={(e) => setReplyInputs(comment.id, e.target.value)}
                    placeholder="Write a reply..."
                    className="flex-1 bg-[#111] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none"
                  />
                  <button
                    onClick={() => handleAddReply(comment.id)}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-sm rounded-lg"
                  >
                    Reply
                  </button>
                </div>}
              </div>
            )}

          </div>
        ))}
      </div>
    </>
  )
}

export default CommentList