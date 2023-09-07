import { useState } from "react"
import { Form } from "./components/Form"
import { Questions } from "./components/Questions"

function App() {
  const [page, setPage] = useState("form")
  const [questionCount, setQuestionCount] = useState(null)
  const [answersCount, setAnswersCount] = useState(null)
  const [errorQuestions, setErrorQuestions] = useState(false)
  const [errorAnswers, setErrorAnswers] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const questions = event.target.elements.questions
    const answers = event.target.elements.answers
    setErrorQuestions(false)
    setErrorAnswers(false)

    if (questions.value !== "") {
      if (answers.value !== "") {
        setPage("questions")
        setQuestionCount(Array(Number(questions.value)).fill({isCompleted:false}))
        setAnswersCount(
          Array(Number(answers.value)).fill({ isCompleted: false })
        )
      } else {
        answers.value === "" && setErrorAnswers(true)
      }
    } else {
      questions.value === "" && setErrorQuestions(true)
      answers.value === "" && setErrorAnswers(true)
    }
  }

  return (
    <main className='flex flex-col justify-center items-center h-[100vh] gap-5'>
      <Form
        handleSubmit={handleSubmit}
        page={page}
        errorQuestions={errorQuestions}
        errorAnswers={errorAnswers}
      />
      <Questions
        questionCount={questionCount}
        answersCount={answersCount}
        page={page}
      />
    </main>
  )
}

export default App
