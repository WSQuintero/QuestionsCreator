import { useEffect, useRef, useState } from "react"

function GeneratorAnswers({
  questionCount,
  answersCount,
  correctAnswers,
  setCorrectAnswers,
}) {
  const [answers, setAnswers] = useState([])
  const [unifiedAnswers, setUnifiedAnswers] = useState([])
  const finalAnswers = []
  const handleSubmitQuestions = (event) => {
    event.preventDefault()
    event.stopPropagation()

    for (let i = 0; i < questionCount.length; i++) {
      const question = event.target.elements.nameQuestion[i].value

      for (let o = 0; o < answersCount.length; o++) {
        const answer = event.target.elements[`input${o + 1}`][i].value
        finalAnswers.push({ question, answer })
      }
    }
    if (
      !answers.some(
        (b) =>
          finalAnswers.find((a) => a.question === b.question).question ===
          b.question
      )
    ) {
      setAnswers((prev) => [...prev, ...finalAnswers])
    }
  }

  console.log(answers)
  return (
    <form onSubmit={handleSubmitQuestions}>
      {questionCount.map((number, ind) => (
        <div
          key={number.position}
          className='flex flex-col justify-center items-center border border-blue-300 rounded-xl p-5 gap-2'
        >
          <div className='w-full'>
            <input
              placeholder={`Agrega tu pregunta ${ind + 1}`}
              className='border w-full border-blue-600 text-center placeholder:text-blue-300'
              name={`nameQuestion${ind}`}
              id='nameQuestion'
              data-number={number.position}
            />
          </div>

          {answersCount.map((numberTwo, index) => (
            <div key={index}>
              <span className=' border p-1 mr-2 border-blue-300'>
                {index + 1}
              </span>
              <input
                type='text'
                placeholder={`posible respuesta ${index + 1}`}
                className='border border-blue-200 px-2'
                name={`input${index + 1}`}
              />
              {!correctAnswers.find(
                (a) => a.numberQuestion === number.position
              ) && (
                <button
                  onClick={(event) => {
                    event.preventDefault()
                    setCorrectAnswers([
                      ...correctAnswers,
                      {
                        numberQuestion: ind,
                        correctAnswer: number.position,
                      },
                    ])
                  }}
                >
                  ¿Correcta?
                </button>
              )}
            </div>
          ))}
        </div>
      ))}
      <button className='bg-blue-600 w-full hover:bg-blue-400 text-white p-1 rounded-md ml-2'>
        crear
      </button>
    </form>
  )
}

export { GeneratorAnswers }
