export enum FormButtonColors {
  GREEN = 'green',
  RED = 'red'
}

const colorMap = new Map<string, string>([
  ['green', 'bg-green-500 hover:bg-green-700'],
  ['red', 'bg-red-500 hover:bg-red-700']
])

type FormButtonProperties = {
  backgroundColor: FormButtonColors
  text: string
}

// TODO merge with Button
const FormButton = ({ backgroundColor, text }: FormButtonProperties) => {
  return (
    <button
      className={`${colorMap.get(
        backgroundColor
      )} text-white font-bold py-2 px-4 rounded`}
      type="submit"
    >
      {text}
    </button>
  )
}

export default FormButton
