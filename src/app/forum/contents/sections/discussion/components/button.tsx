import { Discussion } from '@/types';
import React from 'react'

type Props = {
  onClick(): void;
  item: Discussion
}

const DiscussionButton = (props: Props) => {
  const {item, onClick} = props;
  return (
    <button className='flex flex-row items-center justify-start gap-2 cursor-pointer hover:bg-[#00000555] p-4 rounded-sm text-white' onClick={onClick}>
      <div className='w-3 h-3 rounded-full' style={{backgroundColor: item.bg_color}} />
      <span className='font-montserrat'>{item.title}</span>
    </button>
  )
}

export default DiscussionButton