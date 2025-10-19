import React from 'react'

type Props = {
  onClick(): void;
  children: React.ReactNode;
  count?: number;
  className?: string;
}

const InteractionButton = (props: Props) => {
  const {onClick, children, count, className} = props;
  return (
    <button onClick={onClick} className={`text-white font-medium flex flex-row justify-center items-center gap-2 ring-white rounded-full cursor-pointer ${className ? className : "ring-2 hover:bg-[#ffffff55] p-2"}`}>
      {children}
      {count && <span>{count}</span>}
    </button>
  )
}

export default InteractionButton