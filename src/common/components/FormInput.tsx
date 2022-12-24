import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
}

const FormInput = ({ name, label, ...otherProps }: InputProps) => {
  return (
    <label className="block text-gray-700 mb-2">
      {label}
      <input
        className="shadow font-normal! appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...otherProps}
        name={name}
      />
    </label>
  )
}

export default FormInput
