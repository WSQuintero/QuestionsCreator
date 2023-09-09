import { useEffect, useRef, useState } from "react"
import { GeneratedAnswers } from "./GeneratedAnswers"
import { GeneratorAnswers } from "./GeneratorAnswers"
import ButtonsSend from "./ButtonsSend"

function Questions({
  setPage,
  page,
  questionCount,
  answersCount,
  setQuestionCount,
}) {
  const [correctAnswers, setCorrectAnswers] = useState([])
  
  

  return (
    <>
      {page === "questions" && (
        <div className='flex gap-10 flex-col items-center justify-center'>
          <GeneratorAnswers
            questionCount={questionCount}
            answersCount={answersCount}
            correctAnswers={correctAnswers}
            setCorrectAnswers={setCorrectAnswers}
          />
          {/* <ButtonsSend
            setPage={setPage}
            setFinalData={setFinalData}
            setCorrectAnswers={setCorrectAnswers}
          /> */}
        </div>
      )}
    
    </>
  )
}

export { Questions }
