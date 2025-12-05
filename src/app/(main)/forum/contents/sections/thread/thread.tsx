import { ForumContent } from '@/types'
import React from 'react'
import ThreadCard from './components/card'

type Props = {
  item: ForumContent[]
  onClick(type: string, id: number): void;
}

const Thread = (props: Props) => {
  const {item, onClick} = props;
  return (
    <div className='w-full md:w-3/4'>
      {item.map((item) => (
        <ThreadCard onClick={onClick} key={item.id} item={item} />
      ))}
    </div>
  )
}

export default Thread;