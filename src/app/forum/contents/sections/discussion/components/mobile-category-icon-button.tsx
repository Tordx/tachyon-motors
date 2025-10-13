import Topic from '@/components/icons/topic'
import React from 'react'

type Props = {
  onClick(): void;
}

const MobileCategoryIconButton = (props: Props) => {
  const {onClick} = props;
  return (
    <button onClick={onClick} className='flex justify-center items-center p-2 ring-2 ring-white rounded-full'>
      <Topic />
    </button>
  )
}

export default MobileCategoryIconButton