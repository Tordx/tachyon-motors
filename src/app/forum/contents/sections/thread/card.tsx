import React from "react";
import Link from "next/link";
import { ForumContent } from "@/types";

type Props = {
  item: ForumContent
}
const ThreadCard = (props: Props) => {
  const {
    id,
    title,
    content,
    edited_at,
    is_current,
  } = props.item;
  return (
    <Link href={`/forum/${id}`} passHref>
      <div
        key={id}
        className="p-4 rounded-lg hover:shadow-md transition-all duration-150 cursor-pointer font-montserrat "
      >
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{content}</p>

        <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
          <span>{edited_at ? new Date(edited_at).toLocaleString() : "No date"}</span>
        </div>

        {!is_current && (
          <p className="text-xs text-red-500 mt-2 font-medium">
            ⚠️ This version is not current
          </p>
        )}
      </div>
    </Link>
  );
};

export default ThreadCard;
