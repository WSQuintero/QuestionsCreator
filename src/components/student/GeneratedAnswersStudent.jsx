import { useContext, useEffect, useRef, useState } from "react"
import { useReadDataInDb } from "../../customHooks/useReadDataInDb"
import { Context } from "../../context/ContextProvider"
import { useNavigate } from "react-router"
import { addUserInDb } from "../../logic/addUserInDb"

function GeneratedAnswersStudent() {
  const { data, error, readDataInDb } = useReadDataInDb("questonaries")
  const [errorInReadData, setErrorInReadData] = useState("")
  const [exist, setExist] = useState(false)
  const inputQuestionarieCode = useRef(null)
  const finalAnswer = useRef()
  const navigate = useNavigate()

  const { setUserAnswers, setCorrectAnswers, setTotalAnswers } = useContext(Context)
  
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

  const userName = JSON.parse(sessionStorage.getItem("actualUser"))._document
    .data.value.mapValue.fields.userName.stringValue
  const userEmail = JSON.parse(sessionStorage.getItem("actualUser"))._document
    .data.value.mapValue.fields.userEmail.stringValue
      let count=0

  const handleSubmitFinalAnswers = (event) => {
    const finalAnswers = []
    event.preventDefault()

    data?.docData?.answers?.forEach((container, index) => {
      const inputs = event.target[`selectedAnswer${index}`]
      const arrayInputs = Array(...inputs)

      const answerUser = arrayInputs.find((inputAnswer) => inputAnswer.checked)
      const answer = answerUser.dataset.answer
      if (
        Number(answer[answer.length - 1]) ===
        data?.docData?.correctAnswers.sort(
          (a, b) => a.numberQuestion - b.numberQuestion
        )[index].correctAnswer
      ){
        count++
      }
        finalAnswers.push({
          question: index,
          answer: answer[answer.length - 1],
          correctAnswer: data?.docData?.correctAnswers.sort(
            (a, b) => a.numberQuestion - b.numberQuestion
          )[index],
          
        })
    })

    addUserInDb(
      { userName, userEmail, countCorrectAnswers: count, finalAnswers },
      "answersStudent"
    )

    setUserAnswers(finalAnswers)
    setCorrectAnswers(data?.docData?.correctAnswers)
    setTotalAnswers(data?.docData?.answers)
    navigate("/results")
  }
  return (
    <div className='min-h-[100vh] flex justify-center items-center p-5 flex-col gap-10 w-full'>
      <h2 className='absolute top-20 text-3xl text-green-950 font-bold text-center'>
        {userName}
      </h2>
      {!exist ? (
        <div className='flex  flex-col items-center justify-center  '>
          <form
            onSubmit={handleSubmitQuestionarieCode}
            className='flex  justify-center items-center gap-10 bg-green-800 p-10 rounded-xl'
          >
            <div className='flex  justify-center items-center gap-10 '>
              <label
                htmlFor='inputQuestionarieCode'
                className='text-2xl font-semibold text-green-100'
              >
                Por favor ingresa tu código de cuestionario:{" "}
              </label>
              <input
                type='text'
                className='p-5 border border-gray-600'
                ref={inputQuestionarieCode}
                id='inputQuestionarieCode'
                name='inputQuestionarieCode'
                placeholder='hIQyyVYbwbrKyzbpCkV0'
              />
            </div>
            <button className="bg-green-200 w-[100px] p-5 rounded-2xl text-xl font-semibold hover:bg-green-300 hover">Enviar</button>
          </form>
        </div>
      ) : (
        <form
          onSubmit={handleSubmitFinalAnswers}
          className='h-full flex flex-col justify-between items-center gap-5 '
        >
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
    </div>
  )
}

export { GeneratedAnswersStudent }
