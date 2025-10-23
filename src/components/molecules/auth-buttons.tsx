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
    <button type={type} disabled={disabled} className="w-full mt-6 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition cursor-pointer  " onClick={onClick}>{children}</button>
  )
}

export default AuthButton