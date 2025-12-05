import React from 'react'
import AddComment from './add-comment'
import { ForumCommentResponse } from '@/types';
import CommentList from './comment-list';

type Props = {
  newComment: string;
  setNewComment(e: string): void;
  handleAddComment(): void;
  commentLoading: boolean;
  comments: ForumCommentResponse[];
  bucket_url: string | undefined;
  toggleReplies(e: number): void;
  openReplies: Record<number, boolean>;
  commentsRepliesLoading: Record<number, boolean>;
  commentReplies: Record<number, ForumCommentResponse[]>;
  isAuthenticated: boolean;
  replyInputs: Record<number, string>;
  setReplyInputs(id: number, e: string): void;
  handleAddReply(e: number): void;
}

const CommentSection = (props: Props) => {
  const { newComment, setNewComment, handleAddComment, commentLoading, comments, bucket_url, toggleReplies, openReplies, commentsRepliesLoading, commentReplies, isAuthenticated, replyInputs, setReplyInputs, handleAddReply } = props;
  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      {/* Add Comment */}
      <AddComment newComment={newComment} setNewComment={setNewComment} handleAddComment={handleAddComment} />

      {/* Comment List */}

      {commentLoading ? (
        <p className="text-gray-500">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-500">No comments yet. Be the first!</p>
      ) : (
        <CommentList
          comments={comments}
          bucket_url={bucket_url}
          toggleReplies={toggleReplies}
          openReplies={openReplies}
          commentsRepliesLoading={commentsRepliesLoading}
          commentReplies={commentReplies}
          isAuthenticated={isAuthenticated}
          replyInputs={replyInputs}
          setReplyInputs={setReplyInputs}
          handleAddReply={handleAddReply} 
        />
      )}
    </div>
  )
}

export default CommentSection