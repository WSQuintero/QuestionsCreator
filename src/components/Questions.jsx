import { useState } from "react"
import { GeneratorAnswers } from "./GeneratorAnswers"
import ButtonsSend from "./ButtonsSend"
import { GeneratedAnswers } from "./GeneratedAnswers"

function Questions({ setPage, page, questionCount, answersCount }) {
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [answers, setAnswers] = useState([])
  const [generatedAnswers, setGeneratedAnswers] = useState(false)
  return (
    <>
      {page === "questions" && (
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
            <GeneratedAnswers answers={answers} />
          )}
          <ButtonsSend
            setPage={setPage}
            setCorrectAnswers={setCorrectAnswers}
          />
        </div>
      )}
    </>
  )
}

export { Questions }
