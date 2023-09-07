function ErrorInput({ errorQuestions, errorAnswers }) {
  return (
    <>
      {(errorQuestions || errorAnswers) && (
        <div className="mt-5">
          <p className='font-bold text-xl text-red-600'>
            Por favor digita todos los campos
          </p>
        </div>
      )}
    </>
  )
}

export { ErrorInput }
