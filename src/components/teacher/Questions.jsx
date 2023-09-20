import { useState } from "react"
import { addUserInDb } from "../../logic/addUserInDb"
import { GeneratorAnswers } from "./GeneratorAnswers"
import { GeneratedAnswers } from "./GeneratedAnswers"
import { ButtonsSend } from "./ButtonsSend"

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
    const result = await addUserInDb(
      { answers, correctAnswers },
      "questonaries"
    )
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
          <div className='w-full flex flex-col justify-center items-center'>
            <p className='text-center font-semibold p-5 text-3xl'>
              Tú código de questionario es:{" "}
              <span className='text-green-600'>{confirmMessage}</span>
            </p>
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
