'use client'

type Props = {
  onClick(): void;
}

const CreateForumButton = (props: Props) => {
  return (
    <button
      className="font-montserrat font-bold text-lg uppercase w-full mt-6 bg-gradient-to-r from-amber-500 to-yellow-600 text-black py-3 rounded-lg hover:opacity-90 transition cursor-pointer"
      onClick={props.onClick}>Create a Topic</button>
  )
}

export default CreateForumButton;