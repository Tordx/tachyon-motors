import React from 'react'

type Props = {
  onClick(): void;
}

const BackButton = (props: Props) => {
  const { onClick } = props;
  return (
    <button onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" /></svg>
    </button>
  )
}

export default BackButton