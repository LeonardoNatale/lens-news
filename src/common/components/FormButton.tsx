export enum FormButtonColors {
  GREEN = 'green',
  RED = 'red'
}

const colorMap = new Map<string, string>([
  ['green', 'bg-utilities-success hover:bg-utilities-success-75'],
  ['red', 'bg-utilities-error hover:utilities-error-75']
])

type FormButtonProperties = {
  backgroundColor: FormButtonColors
  text: string
}

// TODO merge with Button
const FormButton = ({ backgroundColor, text }: FormButtonProperties) => {
  return (
    <button
      className={`${colorMap.get(backgroundColor)} text-light-bg py-2 px-4 rounded`}
      type="submit"
    >
      {text}
    </button>
  )
}

export default FormButton
