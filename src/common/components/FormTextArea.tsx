import React, { ForwardRefRenderFunction, TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label: string
  ref: string
}

const TextArea: ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaProps> = (
  { name, label, ...otherProps },
  ref
) => {
  return (
    <label className="block text-gray-700 mb-2">
      {label}
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...otherProps}
        name={name}
        ref={ref}
      />
    </label>
  )
}

const FormTextArea = React.forwardRef(TextArea)

export default FormTextArea
