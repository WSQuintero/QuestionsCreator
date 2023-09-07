import { ErrorInput } from "./ErrorInput"

function Form({ handleSubmit, page,  errorQuestions, errorAnswers }) {
  return (
    <>
      {page === "form" && (
        <form
          className='flex flex-col w-2/4 items-center gap-3 border border-gray-300 p-20'
          onSubmit={handleSubmit}
        >
          <label htmlFor='questions' className='font-bold'>
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
          <label htmlFor='answers' className='font-bold'>
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
    </>
  )
}

export { Form }
