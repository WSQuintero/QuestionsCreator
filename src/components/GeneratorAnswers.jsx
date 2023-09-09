import { useEffect, useRef, useState } from "react"

function GeneratorAnswers({
  questionCount,
  answersCount,
  correctAnswers,
  setCorrectAnswers,
}) {
  const [answers, setAnswers] = useState([])
  const [unifiedAnswers, setUnifiedAnswers] = useState([])

  const handleSubmitQuestions = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const nameQuestion = event.target.elements.nameQuestion.value
    const numberQuestion = Number(
      event.target.elements.nameQuestion.dataset.number
    )

    answersCount.forEach((a, i) => {
      setAnswers((prevAnswers) => [
        ...prevAnswers,
        {
          nameQuestion: nameQuestion,
          numberQuestion: numberQuestion,
          ans: event.target.elements[`input${i + 1}`].value,
        },
      ])
    })
  }

  useEffect(() => {
    const newUnifiedAnswers = []

    for (let index = 0; index < answers.length; index++) {
      const answer = answers[index]
      const nextAnswer = answers[index + 1]

      if (
        nextAnswer &&
        answer.nameQuestion === nextAnswer.nameQuestion &&
        answer.numberQuestion === nextAnswer.numberQuestion
      ) {
        const isDuplicateAdded = newUnifiedAnswers.some(
          (ua) =>
            ua.nameQuestion === answer.nameQuestion &&
            ua.numberQuestion === answer.numberQuestion
        )

        if (!isDuplicateAdded) {
          newUnifiedAnswers.push({
            ...answer,
            finalAnswers: [answer.ans, nextAnswer.ans],
          })
        }
      } 
    }

    setUnifiedAnswers(newUnifiedAnswers)
  }, [answers])


  console.log(unifiedAnswers)
  return (
    <div>
      {questionCount.map((number, ind) => (
        <form
          key={number.position}
          className='flex flex-col justify-center items-center border border-blue-300 rounded-xl p-5 gap-2'
          onSubmit={handleSubmitQuestions}
        >
          <div className='w-full'>
            <input
              placeholder={`Agrega tu pregunta ${ind + 1}`}
              className='border w-full border-blue-600 text-center placeholder:text-blue-300'
              name='nameQuestion'
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
          <button className='bg-blue-600 w-full hover:bg-blue-400 text-white p-1 rounded-md ml-2'>
            crear
          </button>
        </form>
      ))}
    </div>
  )
}

export { GeneratorAnswers }