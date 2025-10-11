'use client'

type Props = {
  onClick(): void;
}

const CreateForumButton = (props: Props) => {
  return (
    <button
      className='px-4 py-2 my-4 ring-2 text-black rounded-lg text-sm sm:text-lg font-bold font-montserrat bg-white hover:bg-[#ccc] transition-colors uppercase cursor-pointer'
      onClick={props.onClick}>Create a Topic</button>
  )
}

export default CreateForumButton