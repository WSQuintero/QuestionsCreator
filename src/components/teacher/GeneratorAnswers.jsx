import { useEffect, useState } from "react"

function GeneratorAnswers({
  questionCount,
  answersCount,
  correctAnswers,
  setCorrectAnswers,
  answers,
  setAnswers,
  setGeneratedAnswers,
}) {
  const [error, setError] = useState("")

  const unifiedAnswers = (finalAnswers) => {
        const groupedAnswers = finalAnswers.reduce((accumulator, currentAnswer) => {
      const key = `${currentAnswer.question}-${currentAnswer.position}`

      if (!accumulator[key]) {
        accumulator[key] = {
          question: currentAnswer.question,
          position: currentAnswer.position,
          answers: [currentAnswer.answer],
        }
      } else {
        accumulator[key].answers.push(currentAnswer.answer)
      }

      return accumulator
    }, {})

    return Object.values(groupedAnswers)
  }

  const handleSubmitQuestions = (event) => {
    event.preventDefault()
    const finalAnswers = []

    if (correctAnswers.length !== questionCount.length) {
      setError("Por favor selecciona la respuesta correcta para cada pregunta")
      setTimeout(() => {
        setError("")
      }, 2000)
    } else {
      for (let i = 0; i < questionCount.length; i++) {
        const question = event.target.elements[`nameQuestion${i}`].value

        for (let o = 0; o < answersCount.length; o++) {
          const answer = event.target.elements[`input${o + 1}`][i].value
          finalAnswers.push({ question, answer, position: i })
        }
      }

      const answersArray = unifiedAnswers(finalAnswers)

      const questionsExistInAnswers = answersArray.some((groupedAnswer) =>
        answers.some(
          (existingAnswer) => existingAnswer.question === groupedAnswer.question
        )
      )

      if (!questionsExistInAnswers) {
        setAnswers((prev) => [...prev, ...answersArray])
      }
    }
  }



  useEffect(() => {
    const validateEmpty = (b) => b === "" || b === undefined || b === " "
    if (
      answers.some(
        (a) =>
          a.answers.some((b) => validateEmpty(b)) || validateEmpty(a.question)
      )
    ) {
      setError("Por favor diligencia todas las casillas")
      setAnswers([])
      setTimeout(() => {
        setError("")
      }, 2000)
    } else {
      if (answers.length !== 0) {
        setGeneratedAnswers(true)
      }
    }
  }, [answers, setAnswers, setGeneratedAnswers])

  return (
    <>
      <form onSubmit={handleSubmitQuestions} className="w-full flex flex-col gap-5 ">
        {questionCount.map((number, ind) => (
          <div
            key={number.position}
            className='flex flex-col justify-center items-center  rounded-xl p-5 gap-5 w-full border border-dark-maroon'
          >
            <div className='w-full flex items-center justify-center'>
            <span className=' text-dark-maroon  p-4 mr-2 border border-dark-maroon rounded-full text-3xl'>
                  {ind + 1}
                </span>
              <input
                placeholder={`Agrega tu pregunta ${ind + 1}`}
                className='border w-full  text-center placeholder:text-dark-maroon/50   '
                name={`nameQuestion${ind}`}
                id='nameQuestion'
                data-number={number.position}
              />
            </div>
            {answersCount.map((numberTwo, index) => (
              <div key={index} className='flex justify-between w-[90%] items-center'>
                <span className=' text-dark-maroon  p-1 mr-2'>
                  {index + 1}
                </span>
                <input
                  type='text'
                  placeholder={`posible respuesta ${index + 1}`}
                  className='border border-blue-200 px-10 w-full '
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
                    className=' bg-green-600  text-white hover:bg-green-200 hover:text-green-700 p-2'
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

      <span className='text-red-600 font-bold text-center flex justify-center text-xl'>
        {error}
      </span>
    </>
  )
}

export { GeneratorAnswers }
