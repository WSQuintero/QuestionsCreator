import { useState } from "react"

function Questions({ page, questionCount, answersCount, setQuestionCount }) {
  const [finalData, setFinalData] = useState([])

  const handleSubmitQuestions = (event) => {
    event.preventDefault()
    const finalAnswers = []
    const element = event.target.elements
    const nameAnswer = element.nameQuestion.value
    const numberQuestion = element.nameQuestion.dataset.number

    console.log(numberQuestion)
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

  console.log(finalData)

  return (
    <>
      {page === "questions" &&
        questionCount.map((number, ind) => (
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
                data-number={ind}
              ></input>
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
              </div>
            ))}
            <button className='bg-blue-600 w-full hover:bg-blue-400 text-white p-1 rounded-md ml-2'>
              crear
            </button>
          </form>
        ))}

      {finalData.map((element, index) => (
        <article key={element[0].nameAnswer + index}>
          <strong>{element[0].nameAnswer}</strong>
          <ul>
            {element.map((answer) => (
              <li key={answer.answers}>{answer.answers}</li>
            ))}
          </ul>
          <span>Creada</span>
        </article>
      ))}
    </>
  )
}

export { Questions }
