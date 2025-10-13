"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ForumContent } from "@/types";
import Interaction from "./interactions";
import InteractionButton from "./button";
import More from "@/components/icons/more";
import ReportButton from "./report-button";

type Props = {
  item: ForumContent;
};
const ThreadCard = (props: Props) => {
  const { id, title, content, edited_at, is_current, forum_id } = props.item;

  const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false);

  function handleOpenMore() {
    setIsMoreOpen(!isMoreOpen)
  }

  return (
    <div
      key={id}
      className="flex border-b-none sm:border-b-1 flex-col items-start justify-center p-4 gap-4 rounded-lg sm:rounded-none hover:bg-[#00000555] transition-all duration-150 cursor-pointer font-montserrat ring-white ring-2 sm:ring-0 my-4 md:my-0"
    >
      <div className="flex flex-row justify-between items-start  w-full">
        <Link className="group w-full" href={`/forum/${forum_id}`} passHref>
          <h3 className="text-lg font-semibold text-white group-hover:underline">{title}</h3>
          <p className="text-sm text-[#ccc] mt-2 line-clamp-2">{content}</p>

          <div className="flex justify-between items-center mt-3 text-xs text-white">
            <span>
              {edited_at ? new Date(edited_at).toLocaleDateString() : "No date"}
            </span>
          </div>

          {!is_current && (
            <p className="text-xs text-red-500 mt-2 font-medium">
              ⚠️ This version is not current
            </p>
          )}
        </Link>
        <div className="relative">
          <InteractionButton onClick={handleOpenMore} className='ring-0 gap-0 p-0 flex md:hidden'>
            <More />
          </InteractionButton>
          {isMoreOpen && <div className='absolute top-10 right-0 bg-black px-4 rounded-md flex md:hidden z-30'>
            <ReportButton onClick={() => { }} />
          </div>}
        </div>
      </div>
      <Interaction handleOpenMore={handleOpenMore} isMoreOpen={isMoreOpen} />
    </div>
  );
};

export default ThreadCard;
