import React from 'react'

type Props = {
  onClick(): void;
  children: React.ReactNode;
  count?: number;
  className?: string;
  liked?: boolean;
}

const InteractionButton = (props: Props) => {
  const {onClick, children, count, className, liked} = props;
  return (
    <button onClick={onClick} className={`active:scale-110 hover:scale-103 text-white font-medium flex flex-row justify-center items-center gap-2 rounded-full cursor-pointer ${className ? className : "ring-2 hover:bg-[#ffffff55] p-2"} ${liked ? "bg-gradient-to-r from-amber-500 to-yellow-600 border-none ring-0 ring-[#171717]":"ring-gray-700 hover:ring-[#ffffff55] r"}`}>
      {children}
      {count && <span>{count}</span>}
    </button>
  )
}

export default InteractionButton