import Flag from '@/components/icons/flag';
import React from 'react'

type Props = {
  onClick(): void
}

const ReportButton = (props: Props) => {
  const {onClick} = props;
  return (
    <button onClick={onClick} className='flex flex-row items-center justify-center cursor-pointer hover:bg-red-500 rounded-sm px-2 md:px-4 py-2 gap-2'>
      <Flag />
      <span className='text-nowrap'>Report Topic</span>
    </button>
  )
}

export default ReportButton