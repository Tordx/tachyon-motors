'use client'

type Props = {
  onClick(): void;
}

const ConsultButton = (props: Props) => {
  return (
    <button
      className='px-4 py-2 my-4 ring-2 ring-white text-white rounded-lg text-sm sm:text-lg font-bold font-montserrat hover:bg-[#00000666] transition-colors uppercase cursor-pointer'
      onClick={props.onClick}>Get Expert Advice</button>
  )
}

export default ConsultButton