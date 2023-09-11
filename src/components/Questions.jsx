import { useState } from "react"
import { GeneratorAnswers } from "./GeneratorAnswers"
import { GeneratedAnswers } from "./GeneratedAnswers"
import { ButtonsSend } from "./ButtonsSend"
import { addUserInDb } from "../logic/addUserInDb"

function Questions({
  setPage,
  page,
  questionCount,
  answersCount,
  confirmMessage,
  setConfirmMessage,
}) {
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [answers, setAnswers] = useState([])
  const [generatedAnswers, setGeneratedAnswers] = useState(false)

  const addUser = async (event) => {
    event.stopPropagation()
    const result = await addUserInDb({ answers, correctAnswers })
    setConfirmMessage(result)
    setCorrectAnswers([])
    setAnswers([])
  }
  return (
    <>
      {page === "questions" &&
        (confirmMessage === "" ? (
          <div className='flex gap-10 flex-col items-center justify-center'>
            {!generatedAnswers ? (
              <GeneratorAnswers
                questionCount={questionCount}
                answersCount={answersCount}
                correctAnswers={correctAnswers}
                setCorrectAnswers={setCorrectAnswers}
                setAnswers={setAnswers}
                answers={answers}
                setGeneratedAnswers={setGeneratedAnswers}
              />
            ) : (
              <GeneratedAnswers
                answers={answers}
                correctAnswers={correctAnswers}
              />
            )}
            <ButtonsSend
              setPage={setPage}
              setCorrectAnswers={setCorrectAnswers}
              setGeneratedAnswers={setGeneratedAnswers}
              setAnswers={setAnswers}
              addUser={addUser}
              setConfirmMessage={setConfirmMessage}
            />
          </div>
        ) : (
          <div>
            <p>{confirmMessage}</p>
            <ButtonsSend
              setPage={setPage}
              setCorrectAnswers={setCorrectAnswers}
              setGeneratedAnswers={setGeneratedAnswers}
              setAnswers={setAnswers}
              addUser={addUser}
              setConfirmMessage={setConfirmMessage}
              confirmMessage={confirmMessage}
            />
          </div>
        ))}
    </>
  )
}

export { Questions }
