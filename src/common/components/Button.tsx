type ButtonProperties = {
  backgroundColor: string
  text: string
  onClickHandle: () => void
}

// TODO Add Icon
// TODO pass extra class variables
const Button = ({ backgroundColor, text, onClickHandle }: ButtonProperties) => {
  return (
    <button
      className={`${backgroundColor} text-white font-bold py-2 px-4 rounded`}
      onClick={onClickHandle}
    >
      {text}
    </button>
  )
}

export default Button
