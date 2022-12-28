import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
}

const FormInput = ({ name, label, ...otherProps }: InputProps) => {
  return (
    <label className="block mb-2 p-2">
      {label}
      <input
        className="shadow font-normal! appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...otherProps}
        name={name}
      />
    </label>
  )
}

export default FormInput
