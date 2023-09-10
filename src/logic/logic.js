export function handleSubmitQuestions({
  event,
  questionCount,
  answersCount,
  answers,
  
}) {
  const handleSubmitQuestion = () => {
    const finalAnswers = []
    event.preventDefault()
    event.stopPropagation()

    for (let i = 0; i < questionCount.length; i++) {
      const question = event.target.elements[`nameQuestion${i}`].value

      for (let o = 0; o < answersCount.length; o++) {
        const answer = event.target.elements[`input${o + 1}`][i].value
        finalAnswers.push({ question, answer, position: i })
      }
    }

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

    const answersArray = Object.values(groupedAnswers)

    const questionsExistInAnswers = answersArray.some((groupedAnswer) =>
      answers.some(
        (existingAnswer) => existingAnswer.question === groupedAnswer.question
      )
    )

    if (!questionsExistInAnswers) {
      setAnswers((prev) => [...prev, ...answersArray])
      setGeneratedAnswers(true)
    }
  }
  return handleSubmitQuestion()
}