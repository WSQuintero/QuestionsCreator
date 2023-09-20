import { useContext, useEffect, useRef } from "react"
import { Context } from "../../context/ContextProvider"

function Results() {
  const { userAnswers, correctAnswers, totalAnswers } = useContext(Context)
  const resultAnswer = useRef(null)
  // useEffect(() => {
  //   console.log(userAnswers)
  // }, [])
  let count = 0
  userAnswers.forEach((answer) => {
    if (Number(answer.answer) === answer.correctAnswer.correctAnswer) {
      count++
    }
  })

  console.log(count)

  return (
    <div ref={resultAnswer}>
      {totalAnswers.map((element, index) => (
        <article
          key={element.question + index}
          className='border border-blue-400 min-w-[350px] w-50% max-w-[600px] h-[auto] p-10 flex flex-col gap-3 items-center'
          id='container'
        >
          <strong className='w-full bg-blue-600 flex justify-start text-center h-10 items-center text-xl text-blue-100 rounded-2xl p-10'>
            <span className='w-[20px] border border-blue-300 m-2 p-1 rounded-full'>
              {index + 1}
            </span>
            {element.question}
          </strong>
          <ul className='w-full flex flex-col gap-5'>
            {console.log(userAnswers[index])}
            {element.answers.map(
              (answer, ind) =>
                Number(userAnswers[index].answer) === ind && (
                  <li
                    key={answer + ind}
                    className='border w-full border-blue-200 p-2 text-blue-600 '
                  >
                    <span className='w-[20px] border border-blue-300 m-5 p-2'>
                      {Number(userAnswers[index].answer) + 1}
                    </span>
                    <label htmlFor=''>
                      {answer} <span>Respuesta seleccionada</span>
                    </label>
                  </li>
                )
            )}
            {element.answers.map(
              (answer, ind) =>
                Number(userAnswers[index].correctAnswer.correctAnswer) ===
                  ind && (
                  <li
                    key={answer + ind}
                    className='border w-full border-blue-200 p-2 text-blue-600 '
                  >
                    <span className='w-[20px] border border-blue-300 m-5 p-2'>
                      {Number(userAnswers[index].correctAnswer.correctAnswer) +
                        1}
                    </span>
                    <label htmlFor=''>
                      {answer} <span>Respuesta correcta</span>
                    </label>
                  </li>
                )
            )}
          </ul>
        </article>
      ))}
      <p className='font-bold text-green-700 text-3xl'>
        Tuviste {count} {count > 1 ? "respuestas" : "respuesta"} {" "}
        {count > 1 ? "correctas" : "correcta"} de {userAnswers.length}{" "}
      </p>
    </div>
  )
}

export default Results
