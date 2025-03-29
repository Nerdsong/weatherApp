
interface buttonProps{
    onClickFunction: () => void; 
}

function Button({onClickFunction}:buttonProps) {
  return (
    <button onClick={onClickFunction}> Search </button>
  )
}

export default Button