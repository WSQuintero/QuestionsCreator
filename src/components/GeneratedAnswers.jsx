
function GeneratedAnswers({ finalData }) {
  return (
    <div>
      {finalData.map((element, index) => (
        <article
          key={element[0].nameAnswer + index}
          className='border border-blue-400 min-w-[350px] w-50% max-w-[600px] h-[auto] p-10 flex flex-col gap-3 items-center'
        >
          <strong className='w-full bg-blue-600 flex justify-start text-center h-10 items-center text-xl text-blue-100 rounded-2xl p-10'>
            <span className='w-[20px] border border-blue-300 m-2 p-1 rounded-full'>
              {index + 1}
            </span>
            {element[0].nameAnswer}
          </strong>
          <ul className='w-full flex flex-col gap-5'>
            {element.map((answer, index) => (
              <li
                key={answer.answers + index}
                className='border w-full border-blue-200 p-2 text-blue-600 '
              >
                <span className='w-[20px] border border-blue-300 m-5 p-2'>
                  {index + 1}
                </span>
                {answer.answers}
              </li>
            ))}
          </ul>
          <span className='w-2/4 bg-green-100 flex justify-center items-center h-10 rounded-2xl text-green-900'>
            Creada
          </span>
        </article>
      ))}
    </div>
  )
}

export  {GeneratedAnswers}