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
            className='flex flex-col w-full h-[100vh] justify-center gap-10 items-center bg-pale-yellow   font-medium text-5xl'
            onSubmit={handleSubmit}
          >
            <label htmlFor='questions' className='text-dark-maroon'>
              ¿Cuantas preguntas tiene el cuestionario?
            </label>
            <input
              type='number'
              name='questions'
              id='questions'
              className={`border border-gray-500 px-5 text-4xl w-[70%] ${
                errorQuestions && "border-red-700"
              }`}
              defaultValue=''
              min={1}
            />
            <label htmlFor='answers' className='text-dark-maroon'>
              ¿cuantas respuestas son por pregunta
            </label>
            <input
              type='number'
              name='answers'
              id='answers'
              className={`border border-gray-500 text-4xl w-[70%] ${
                errorAnswers && "border-red-700"
              } px-5`}
              defaultValue='defaultValue'
              min={1}
            />
            <button className='border border-dark-maroon hover:bg-dark-red hover:text-pale-yellow w-[200px] mt-10 p-4 rounded-xl text-dark-maroon text-2xl'>
              Enviar
            </button>
            <ErrorInput
              errorQuestions={errorQuestions}
              errorAnswers={errorAnswers}
            />
          </form>
          <button
            onClick={() => setOptionSelected("")}
            className='w-[100px] bg-green-500 p-5 rounded-2xl hover:bg-green-200 text-xl font-bold text-dark-maroon'
          >
            Volver
          </button>
        </>
      )}
    </>
  )
}

export { FormTeacher }
