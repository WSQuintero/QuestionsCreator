import { Questions } from "../../../components/teacher/Questions"
import { useState } from "react"
import { FormTeacher } from "../../../components/teacher/FormTeacher"
import { CheckResults } from "../../../components/teacher/CheckResults"

function HomeTeacher() {
  const [page, setPage] = useState("form")
  const [questionCount, setQuestionCount] = useState(null)
  const [answersCount, setAnswersCount] = useState(null)
  const [errorQuestions, setErrorQuestions] = useState(false)
  const [errorAnswers, setErrorAnswers] = useState(false)
  const [confirmMessage, setConfirmMessage] = useState("")
  const [optionSelected,setOptionSelected]=useState("")
  const handleSubmit = (event) => {
    event.preventDefault()

    const questions = event.target.elements.questions
    const answers = event.target.elements.answers
    setErrorQuestions(false)
    setErrorAnswers(false)
    setConfirmMessage("")

    if (questions.value !== "") {
      if (answers.value !== "") {
        setPage("questions")
        setQuestionCount(
          Array(Number(questions.value))
            .fill({})
            .map((a, index) => {
              return (a = { position: index })
            })
        )
        setAnswersCount(
          Array(Number(answers.value))
            .fill({})
            .map((a, index) => {
              return (a = { position: index })
            })
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
    <>
      {optionSelected === "" && (
        <>
          <button onClick={() => setOptionSelected("newQuestionarie")}>
            Crear un nuevo questionario
          </button>
          <button onClick={() => setOptionSelected("checkResultsStudent")}>
            validar resuktados estudiantes
          </button>
        </>
      )}
      {optionSelected === "newQuestionarie" && (
        <>
          <FormTeacher
            handleSubmit={handleSubmit}
            page={page}
            errorQuestions={errorQuestions}
            errorAnswers={errorAnswers}
            confirmMessage={confirmMessage}
            setConfirmMessage={setConfirmMessage}
            setOptionSelected={setOptionSelected}
          />
          <Questions
            questionCount={questionCount}
            answersCount={answersCount}
            page={page}
            setQuestionCount={setQuestionCount}
            setPage={setPage}
            confirmMessage={confirmMessage}
            setConfirmMessage={setConfirmMessage}
          />
        </>
      )}
      {optionSelected === "checkResultsStudent" && (
        <CheckResults setOptionSelected={setOptionSelected} />
      )}
    </>
  )
}

export { HomeTeacher }
