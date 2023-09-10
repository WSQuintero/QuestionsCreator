import { useEffect, useState } from "react"

function GeneratorAnswers({
  questionCount,
  answersCount,
  correctAnswers,
  setCorrectAnswers,
  answers,
  setAnswers,
  setGeneratedAnswers,
}) {
  const [error, setError] = useState("")

  const unifiedAnswers = (finalAnswers) => {
    //explicación de unificación de respuestas
    //Primero iteramos el array de respuestas con un método reduce.
    //currentAnswer hace referncia al objeto actual con respuesta
    //accumulator hace referencia a un objeto con objetos dentro, cada objeto es nombrado con "question-position" que sería la clave de cada uno

    const groupedAnswers = finalAnswers.reduce((accumulator, currentAnswer) => {
      //creamos una clave que agrupe la "question-position", que hace de nombre de cada objeto.
      //como estamos iterando cada objeto independientemente, estas propiedades son únicas para cada objeto
      const key = `${currentAnswer.question}-${currentAnswer.position}`

      /*aquí debemos pensar en que inicialmente no tenemos ningun objeto con dicha key, por lo tanto el objeto principal accumulator creará
        un objeto dentro con la clave (nombre) definida en key y crearáuna tercera propiedad answers que es un array
      */
      if (!accumulator[key]) {
        accumulator[key] = {
          question: currentAnswer.question,
          position: currentAnswer.position,
          answers: [currentAnswer.answer],
        }
        //si ya existe en el objeto accumulator una clave igual se modifica dicho objeto para agregar la nueva answer, de ahí que se entra al objeto directamente
        //con accumulator[key]. y luego accedemos al array answers e dicho objeto para agregar la propiedad
      } else {
        accumulator[key].answers.push(currentAnswer.answer)
      }

      return accumulator
    }, {})

    return Object.values(groupedAnswers)
  }

  const handleSubmitQuestions = (event) => {
    event.preventDefault()
    const finalAnswers = []

    if (correctAnswers.length !== answersCount.length) {
      setError("Por favor selecciona la respuesta correcta para cada pregunta")
      setTimeout(() => {
        setError("")
      }, 2000)
    } else {
      for (let i = 0; i < questionCount.length; i++) {
        const question = event.target.elements[`nameQuestion${i}`].value

        for (let o = 0; o < answersCount.length; o++) {
          const answer = event.target.elements[`input${o + 1}`][i].value
          finalAnswers.push({ question, answer, position: i })
        }
      }

      const answersArray = unifiedAnswers(finalAnswers)

      const questionsExistInAnswers = answersArray.some((groupedAnswer) =>
        answers.some(
          (existingAnswer) => existingAnswer.question === groupedAnswer.question
        )
      )

      if (!questionsExistInAnswers) {
        setAnswers((prev) => [...prev, ...answersArray])
      }
    }
  }

  useEffect(() => {
    const validateEmpty = (b) => b === "" || b === undefined || b === " "
    if (
      answers.some(
        (a) =>
          a.answers.some((b) => validateEmpty(b)) || validateEmpty(a.question)
      )
    ) {
      setError("Por favor diligencia todas las casillas")
      setAnswers([])
      setTimeout(() => {
        setError("")
      }, 2000)
    } else {
      if (answers.length !== 0) {
        setGeneratedAnswers(true)
      }
    }
  }, [answers, setAnswers, setGeneratedAnswers])

  return (
    <>
      <form onSubmit={handleSubmitQuestions}>
        {questionCount.map((number, ind) => (
          <div
            key={number.position}
            className='flex flex-col justify-center items-center border border-blue-300 rounded-xl p-5 gap-2'
          >
            <div className='w-full'>
              <input
                placeholder={`Agrega tu pregunta ${ind + 1}`}
                className='border w-full border-blue-600 text-center placeholder:text-blue-300'
                name={`nameQuestion${ind}`}
                id='nameQuestion'
                data-number={number.position}
              />
            </div>
            {answersCount.map((numberTwo, index) => (
              <div key={index} className='flex justify-between w-full'>
                <span className=' border p-1 mr-2 border-blue-300'>
                  {index + 1}
                </span>
                <input
                  type='text'
                  placeholder={`posible respuesta ${index + 1}`}
                  className='border border-blue-200 px-2 w-full'
                  name={`input${index + 1}`}
                />
                {!correctAnswers.find(
                  (a) => a.numberQuestion === number.position
                ) && (
                  <button
                    onClick={(event) => {
                      event.preventDefault()
                      setCorrectAnswers([
                        ...correctAnswers,
                        {
                          numberQuestion: ind,
                          correctAnswer: number.position,
                        },
                      ])
                    }}
                    className=' bg-green-600  text-white hover:bg-green-200 hover:text-green-700 p-2'
                  >
                    ¿Correcta?
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
        <button className='bg-blue-600 w-full hover:bg-blue-400 text-white p-1 rounded-md ml-2'>
          crear
        </button>
      </form>

      <span className='text-red-600 font-bold text-center flex justify-center text-xl'>
        {error}
      </span>
    </>
  )
}

export { GeneratorAnswers }
