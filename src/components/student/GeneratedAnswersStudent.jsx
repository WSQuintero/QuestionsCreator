import { useRef } from "react"
import { useReadDataInDb } from "../../customHooks/useReadDataInDb"

function GeneratedAnswersStudent() {
  const { data, error, readDataInDb } = useReadDataInDb()
  const inputQuestionarieCode = useRef(null)


  const handleSubmitQuestionarieCode = (event) => {
    event.preventDefault()
    readDataInDb(inputQuestionarieCode.current.value)
  }

    console.log(data || error)
  return (
    <div className='flex  flex-col items-center justify-center'>
      <form
        onSubmit={handleSubmitQuestionarieCode}
        className='flex flex-col justify-center items-center'
      >
        <div className='flex flex-col justify-center items-center'>
          <label htmlFor='inputQuestionarieCode'>
            Por favor ingresa tu código de cuestionario:{" "}
          </label>
          <input
            type='text'
            className='p-5 border border-gray-600'
            ref={inputQuestionarieCode}
            id='inputQuestionarieCode'
            name='inputQuestionarieCode'
          />
        </div>
        <button>enviar</button>
      </form>
    </div>
    // <div>
    //   {answers.map((element, index) => (
    //     <article
    //       key={element.question + index}
    //       className='border border-blue-400 min-w-[350px] w-50% max-w-[600px] h-[auto] p-10 flex flex-col gap-3 items-center'
    //     >
    //       <strong className='w-full bg-blue-600 flex justify-start text-center h-10 items-center text-xl text-blue-100 rounded-2xl p-10'>
    //         <span className='w-[20px] border border-blue-300 m-2 p-1 rounded-full'>
    //           {index + 1}
    //         </span>
    //         {element.question}
    //       </strong>
    //       <ul className='w-full flex flex-col gap-5'>
    //         {element.answers.map((answer, index) => (
    //           <li
    //             key={answer + index}
    //             className='border w-full border-blue-200 p-2 text-blue-600 '
    //           >
    //             <span className='w-[20px] border border-blue-300 m-5 p-2'>
    //               {index + 1}
    //             </span>
    //             {answer}
    //           </li>
    //         ))}
    //       </ul>
    //       <span className='w-2/4 bg-green-100 flex justify-center items-center h-10 rounded-2xl text-green-900'>
    //         Creada
    //       </span>
    //     </article>
    //   ))}
    // </div>
  )
}

export { GeneratedAnswersStudent }
