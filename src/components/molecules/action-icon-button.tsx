import React from 'react'
import FilterIcon from '../icons/filter';

type Props = {
  onClick(): void;
  title: string;
  active: boolean;
}

const ActionIconButton = (props: Props) => {
  const { title, active, onClick } = props;
  return (
    <button onClick={onClick} className={`px-2 rounded-lg flex items-center hover:bg-gray-700 transition-colors relative cursor-pointer`}>
      
      {active && <div className='w-2 h-2 bg-green-500 rounded-full absolute top-0 right-0' />}
      <FilterIcon />
      <span className='inline-block text-white text-sm px-3 py-1 rounded-md '>
        {title}
      </span>
    </button>
  )
}

export default ActionIconButton