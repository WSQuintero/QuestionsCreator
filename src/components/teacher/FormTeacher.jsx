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
        <>
          <form
            className='flex flex-col w-2/4 items-center  border-4 border-blue-300  text-blue-500 font-medium text-5xl'
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
              min={1}
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
              min={1}
            />
            <button className='border border-gray-700 w-[200px] mt-10 p-4 rounded-xl'>
              Enviar
            </button>
            <ErrorInput
              errorQuestions={errorQuestions}
              errorAnswers={errorAnswers}
            />
          </form>
          <button
            onClick={() => setOptionSelected("")}
            className='w-[100px] bg-green-500 p-5 rounded-2xl hover:bg-green-200 text-xl font-bold text-white'
          >
            Volver
          </button>
        </>
      )}
    </>
  )
}

export { FormTeacher }
