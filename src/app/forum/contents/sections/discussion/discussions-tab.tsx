'use client'
import { Discussion } from '@/types'
import React from 'react'
import DiscussionButton from './components/button'
import { redirect } from 'next/navigation'
import CreateForumButton from './components/create-forum-button'
import MobileCategoryIconButton from './components/mobile-category-icon-button'

type Props = {
  item: Discussion[]
}

const DiscussionTab = (props: Props) => {
  const {item} = props;
  return (
    <>
    <div className='flex flex-row w-full justify-between items-center flex md:hidden mb-5'>
          <CreateForumButton onClick={() => {}} />
          <MobileCategoryIconButton />
    </div>
    <div className='flex flex-col gap-4 hidden md:flex'>
      <CreateForumButton onClick={() => {}} />
      {item.map((dis) => (
        <DiscussionButton key={dis.id} onClick={() => redirect(`/forum/discussion/${dis.slug}`)} item={dis}/>
      ))}
    </div>
    </>
  )
}

export default DiscussionTab