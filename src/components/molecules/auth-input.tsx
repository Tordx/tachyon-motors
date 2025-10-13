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
            'p-2 border rounded outline-none transition',
            error ? 'border-red-500' : 'border-gray-300',
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
