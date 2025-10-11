'use client'
import { Discussion } from '@/types'
import React from 'react'
import DiscussionButton from './button'
import { redirect } from 'next/navigation'
import CreateForumButton from './create-forum-button'

type Props = {
  item: Discussion[]
}

const DiscussionTab = (props: Props) => {
  const {item} = props;
  return (
    <div className='flex flex-col gap-4'>
      <CreateForumButton onClick={() => {}} />
      {item.map((dis) => (
        <DiscussionButton key={dis.id} onClick={() => redirect(`/forum/discussion/${dis.slug}`)} item={dis}/>
      ))}
    </div>
  )
}

export default DiscussionTab