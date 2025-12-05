import React from 'react'

type Props = {
  newComment: string;
  setNewComment(e: string): void;
  handleAddComment(): void;
}

const AddComment = (props: Props) => {
  const {newComment, setNewComment, handleAddComment} = props;
  return (
    <div className="flex gap-3 mb-6">
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <button
        onClick={handleAddComment}
        className="cursor-pointer px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white font-medium"
      >
        Post
      </button>
    </div>
  )
}

export default AddComment;