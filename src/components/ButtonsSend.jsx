
function ButtonsSend({ setPage, setCorrectAnswers }) {
  return (
    <div>
      <button
        onClick={() => {}}
        className='w-[200px] bg-green-600 rounded-3xl text-white hover:bg-green-200 hover:text-green-700'
      >
        enviar
      </button>
      <button
        onClick={() => {
          setPage("form")
          setCorrectAnswers([])
        }}
        className='w-[200px] bg-red-600 rounded-3xl text-white hover:bg-red-200 hover:text-red-700'
      >
        Volver a empezar
      </button>
    </div>
  )
}

export default ButtonsSend