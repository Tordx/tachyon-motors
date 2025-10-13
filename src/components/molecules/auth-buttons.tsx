import React from 'react'

type Props = {
  children: React.ReactNode;
  onClick?(): void;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
}

const AuthButton = (props: Props) => {
  const {children, onClick, type, disabled} = props;
  return (
    <button type={type} disabled={disabled} className='my-4 py-2 w-full bg-white text-center text-black text-montserrat font-semibold rounded-sm shadow cursor-pointer hover:bg-white/80 active:bg-white-/60 active:scale-101' onClick={onClick}>{children}</button>
  )
}

export default AuthButton