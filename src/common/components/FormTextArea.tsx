import React, { TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label: string
}

const FormTextArea = ({ name, label, ...otherProps }: TextAreaProps) => {
  return (
    <label className="block text-gray-700 mb-2">
      {label}
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...otherProps}
        name={name}
      />
    </label>
  )
}

export default FormTextArea
