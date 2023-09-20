import { useContext, useEffect, useRef, useState } from "react"
import { useReadDataInDb } from "../../customHooks/useReadDataInDb"
import { Context } from "../../context/ContextProvider"
import { useNavigate } from "react-router"

function GeneratedAnswersStudent() {
  const { data, error, readDataInDb } = useReadDataInDb("questonaries")
  const [errorInReadData, setErrorInReadData] = useState("")
  const [exist, setExist] = useState(false)
  const inputQuestionarieCode = useRef(null)
  const finalAnswer = useRef()
  const { setUserAnswers, setCorrectAnswers, setTotalAnswers } =
    useContext(Context)
  const navigate = useNavigate()
  const handleSubmitQuestionarieCode = (event) => {
    event.preventDefault()
    readDataInDb(inputQuestionarieCode.current.value)
  }
  useEffect(() => {
    if (data?.docData) setExist(true)
    if (error) {
      setErrorInReadData(String(error))
      setTimeout(() => setErrorInReadData(""), 2500)
    }
  }, [data, error])

  const handleSubmitFinalAnswers = (event) => {
    const finalAnswers = []
    event.preventDefault()

    data?.docData?.answers?.forEach((container, index) => {
      const inputs = event.target[`selectedAnswer${index}`]
      const arrayInputs = Array(...inputs)

      const answerUser = arrayInputs.find((inputAnswer) => inputAnswer.checked)
      const answer = answerUser.dataset.answer
      finalAnswers.push({
        question: index,
        answer: answer[answer.length - 1],
        correctAnswer: data?.docData?.correctAnswers.sort(
          (a, b) => a.numberQuestion - b.numberQuestion
        )[index],
      })
    })
    setUserAnswers(finalAnswers)
    setCorrectAnswers(data?.docData?.correctAnswers)
    setTotalAnswers(data?.docData?.answers)
    navigate("/results")
  }
  return (
    <>
      {!exist ? (
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
      ) : (
        <form onSubmit={handleSubmitFinalAnswers}>
          {data?.docData?.answers?.map((element, index) => (
            <article
              key={element.question + index}
              className='border border-blue-400 min-w-[350px] w-50% max-w-[600px] h-[auto] p-10 flex flex-col gap-3 items-center'
            >
              <strong className='w-full bg-blue-600 flex justify-start text-center h-10 items-center text-xl text-blue-100 rounded-2xl p-10'>
                <span className='w-[20px] border border-blue-300 m-2 p-1 rounded-full'>
                  {index + 1}
                </span>
                {element.question}
              </strong>
              <ul className='w-full flex flex-col gap-5'>
                {element.answers.map((answer, ind) => (
                  <li
                    key={answer + ind}
                    className='border w-full border-blue-200 p-2 text-blue-600 '
                  >
                    <span className='w-[20px] border border-blue-300 m-5 p-2'>
                      {ind + 1}
                    </span>
                    <label htmlFor=''>{answer}</label>
                    <input
                      type='radio'
                      name={`selectedAnswer${index}`}
                      data-answer={`answer-${ind}`}
                      ref={finalAnswer}
                      data-text={answer}
                    />
                  </li>
                ))}
              </ul>
            </article>
          ))}
          <button className='border border-gray-500 p-4 w-[200px] rounded-xl hover:bg-green-400 hover:text-white font-bold text-2xl'>
            Enviar
          </button>
        </form>
      )}
      {errorInReadData && (
        <p className='text-3xl text-red-600'>{errorInReadData}</p>
      )}
    </>
  )
}

export { GeneratedAnswersStudent }
