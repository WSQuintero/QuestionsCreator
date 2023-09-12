function ButtonsSend({
  setPage,
  setCorrectAnswers,
  setGeneratedAnswers,
  setAnswers,
  addUser,
  setConfirmMessage,
  confirmMessage,
}) {
  return (
    <div className='flex flex-col sm:flex-row justify-center items-center'>
      {confirmMessage === "" ||confirmMessage===undefined && (
        <button
          onClick={addUser}
          className='w-[200px] bg-green-600 rounded-3xl text-white hover:bg-green-200 hover:text-green-700'
        >
          enviar
        </button>
      )}
      <button
        onClick={() => {
          setPage("form")
          setCorrectAnswers([])
          setGeneratedAnswers(false)
          setAnswers([])
          setConfirmMessage("")
        }}
        className='w-[200px] bg-red-600 rounded-3xl text-white hover:bg-red-200 hover:text-red-700'
      >
        Volver a empezar
      </button>
    </div>
  )
}

export { ButtonsSend }
