import { ErrorInput } from "./ErrorInput"

function FormTeacher({
  handleSubmit,
  page,
  errorQuestions,
  errorAnswers,
  setOptionSelected,
}) {
  return (
    <>
      {page === "form" && (
        <form
          className='flex flex-col w-2/4 items-center gap-3 border-4 border-blue-300 p-20 text-blue-500 font-medium text-2xl'
          onSubmit={handleSubmit}
        >
          <label htmlFor='questions' className='text-green-600'>
            ¿Cuantas preguntas tiene el cuestionario?
          </label>
          <input
            type='number'
            name='questions'
            id='questions'
            className={`border border-gray-500 p-2 ${
              errorQuestions && "border-red-700"
            }`}
            defaultValue=''
          />
          <label htmlFor='answers' className='text-red-600'>
            ¿cuantas respuestas son por pregunta
          </label>
          <input
            type='number'
            name='answers'
            id='answers'
            className={`border border-gray-500 p-2 ${
              errorAnswers && "border-red-700"
            }`}
            defaultValue='defaultValue'
          />
          <button className='border border-gray-700 w-[200px] mt-10 p-4 rounded-xl'>
            Enviar
          </button>
          <ErrorInput
            errorQuestions={errorQuestions}
            errorAnswers={errorAnswers}
          />
        </form>
      )}
      <button onClick={() => setOptionSelected("")}>Volver</button>
    </>
  )
}

export { FormTeacher }
