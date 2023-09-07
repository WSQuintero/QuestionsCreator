import { useState } from "react"

function Questions({ page, questionCount, answersCount }) {
  const [finalData, setFInalData] = useState([])
  const handleSubmitQuestions = (event) => {
    event.preventDefault()
    const finalAnswers = []
    const element = event.target.elements
    const nameAnswer = element.nameQuestion.value

    for (let i = 0; i < answersCount.length; i++) {
      finalAnswers.push({
        nameAnswer: nameAnswer,
        answers: element["input" + (i + 1)].value,
      })
    }
    setFInalData([...finalData, finalAnswers])
  }

  console.log(finalData)

  return (
    <>
      {page === "questions" &&
        questionCount.map((number, ind) => (
          <form
            action=''
            key={ind}
            className='flex flex-col justify-center items-center border border-blue-300 rounded-xl p-5 gap-2'
            onSubmit={handleSubmitQuestions}
          >
            <div className='w-full'>
              <input
                placeholder={`Agrega tu pregunta ${ind + 1}`}
                className='border w-full border-blue-600 text-center placeholder:text-blue-300'
                name='nameQuestion'
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
    </>
  )
}

export { Questions }
