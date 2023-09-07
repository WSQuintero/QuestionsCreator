import { useState } from "react"

function Questions({
  setPage,
  page,
  questionCount,
  answersCount,
  setQuestionCount,
}) {
  const [finalData, setFinalData] = useState([])
  const [correctAnswers,setCorrectAnswers]=useState([])

  const handleSubmitQuestions = (event) => {
    event.preventDefault()
    const finalAnswers = []
    const element = event.target.elements
    const nameAnswer = element.nameQuestion.value
    const numberQuestion = element.nameQuestion.dataset.number

    for (let i = 0; i < answersCount.length; i++) {
      finalAnswers.push({
        nameAnswer: nameAnswer,
        answers: element["input" + (i + 1)].value,
        numberQuestion: numberQuestion,
      })
      element["input" + (i + 1)].value = ""
    }
    element.nameQuestion.value = ""
    setFinalData([...finalData, finalAnswers.reduce((a, b) => a.concat(b), [])])
    setQuestionCount(
      questionCount.filter((a, index) => index !== Number(numberQuestion))
    )
  }
  console.log(correctAnswers)
  return (
    <>
      {page === "questions" && (
        <div className='flex gap-10 flex-col items-center justify-center'>
          {finalData.map((element, index) => (
            <article
              key={element[0].nameAnswer + index}
              className='border border-blue-400 min-w-[350px] w-50% max-w-[600px] h-[auto] p-10 flex flex-col gap-3 items-center'
            >
              {/* <span>{element}</span> */}
              <strong className='w-full bg-blue-600 flex justify-start text-center h-10 items-center text-xl text-blue-100 rounded-2xl p-10'>
                <span className='w-[20px] border border-blue-300 m-2 p-1 rounded-full'>
                  {index + 1}
                </span>
                {element[0].nameAnswer}
              </strong>
              <ul className='w-full flex flex-col gap-5'>
                {element.map((answer, index) => (
                  <li
                    key={answer.answers + index}
                    className='border w-full border-blue-200 p-2 text-blue-600 '
                  >
                    <span className='w-[20px] border border-blue-300 m-5 p-2'>
                      {index + 1}
                    </span>
                    {answer.answers}
                  </li>
                ))}
              </ul>
              <span className='w-2/4 bg-green-100 flex justify-center items-center h-10 rounded-2xl text-green-900'>
                Creada
              </span>
            </article>
          ))}
          {questionCount.map((number, ind) => (
            <form
              key={ind}
              className='flex flex-col justify-center items-center border border-blue-300 rounded-xl p-5 gap-2'
              onSubmit={handleSubmitQuestions}
            >
              <div className='w-full'>
                <input
                  placeholder={`Agrega tu pregunta ${ind + 1}`}
                  className='border w-full border-blue-600 text-center placeholder:text-blue-300'
                  name='nameQuestion'
                  id='nameQuestion'
                  data-number={ind}
                />
              </div>
              {answersCount.map((number, index) => (
                <div key={index + number}>
                  <span className=' border p-1 mr-2 border-blue-300'>
                    {index + 1}
                  </span>
                  <input
                    type='text'
                    placeholder={`posible respuesta ${index + 1}`}
                    className='border border-blue-200 px-2'
                    name={`input${index + 1}`}
                  />
                  {!correctAnswers.find((a)=>a.numberQuestion===ind) &&
                  
                  <button
                    onClick={(event) => {
                      event.preventDefault()
                      setCorrectAnswers([
                        ...correctAnswers,
                        { numberQuestion: ind, correctAnswer: index },
                      ])
                    }}
                  >
                    ¿Correcta?
                  </button>
                  }
                </div>
              ))}
              <button className='bg-blue-600 w-full hover:bg-blue-400 text-white p-1 rounded-md ml-2'>
                crear
              </button>
            </form>
          ))}
          <button
            onClick={() => {}}
            className='w-[200px] bg-green-600 rounded-3xl text-white hover:bg-green-200 hover:text-green-700'
          >
            enviar
          </button>
          <button
            onClick={() => {
              setPage("form")
              setFinalData([])
              setCorrectAnswers([])
            }}
            className='w-[200px] bg-red-600 rounded-3xl text-white hover:bg-red-200 hover:text-red-700'
          >
            Volver a empezar
          </button>
        </div>
      )}
    </>
  )
}

export { Questions }
