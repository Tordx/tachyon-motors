'use client'

import React from 'react'
import classNames from 'classnames'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const AuthInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && <label className="text-sm font-medium">{label}</label>}
        <input
          ref={ref}
          className={classNames(
            'bg-[#2a2a2a] rounded-md p-2 border border-gray-700 focus:outline-none focus:border-amber-500 transition',
            error ? 'border-red-500' : 'border-gray-800',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)

AuthInput.displayName = 'TextInput'

export default AuthInput
