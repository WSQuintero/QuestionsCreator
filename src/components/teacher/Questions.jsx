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
    <div className="w-full flex justify-around bg-pale-yellow p-10">
      <div className="flex justify-center items-center w-1/3">
                <img src="/quest.png" alt="question" className="object-cover w-full" />
              </div>
      {page === "questions" &&
        (confirmMessage === "" ? (
          <div className='flex gap-10 flex-col items-center justify-center w-[60%]'>
            {!generatedAnswers ? (
              <>

              <GeneratorAnswers
                questionCount={questionCount}
                answersCount={answersCount}
                correctAnswers={correctAnswers}
                setCorrectAnswers={setCorrectAnswers}
                setAnswers={setAnswers}
                answers={answers}
                setGeneratedAnswers={setGeneratedAnswers}
              />
              </>
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
    </div>
  )
}

export { Questions }
