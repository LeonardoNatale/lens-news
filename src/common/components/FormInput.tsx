import React, { ForwardRefRenderFunction, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  ref: string
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, ...otherProps },
  ref
) => {
  return (
    <label className="block text-gray-700 mb-2">
      {label}
      <input
        className="shadow font-normal! appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...otherProps}
        name={name}
        ref={ref}
      />
    </label>
  )
}

const FormInput = React.forwardRef(Input)

export default FormInput
