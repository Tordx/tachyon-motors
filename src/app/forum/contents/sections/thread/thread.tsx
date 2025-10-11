import { ForumContent } from '@/types'
import React from 'react'
import ThreadCard from './components/card'

type Props = {
  item: ForumContent[]
}

const Thread = (props: Props) => {
  const {item} = props;
  return (
    <div className='w-full md:w-3/4'>
      {item.map((item) => (
        <ThreadCard key={item.id} item={item} />
      ))}
    </div>
  )
}

export default Thread;