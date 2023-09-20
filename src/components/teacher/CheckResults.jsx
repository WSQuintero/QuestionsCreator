import { useEffect } from "react"
import { useReadAllDataInDb } from "../../customHooks/useReadAllDataInDb"

function CheckResults() {
  const { data,  readDataInDb } = useReadAllDataInDb("answersStudent")

  useEffect(() => {
    readDataInDb()
  }, [])

  return (
    <div>
      {data?.map((student, index) => (
        <div key={index}>
          <p className='text-3xl font-bold text-black'>
            Estudiante:{" "}
            <span className='font-light'>
              {
                student?._document?.data?.value?.mapValue?.fields?.userName
                  ?.stringValue
              }
            </span>
          </p>
          <p className='text-3xl font-bold text-black'>
            Email:{" "}
            <span className='font-light'>
              {
                student?._document?.data?.value?.mapValue?.fields?.userEmail
                  ?.stringValue
              }
            </span>
          </p>
          <p className='text-3xl font-bold text-black'>
            Rspuestas correctas:{" "}
            <span className='font-light'>
              {
                student?._document?.data?.value?.mapValue?.fields
                  ?.countCorrectAnswers.integerValue
              }
            </span>
          </p>
        </div>
      ))}
    </div>
  )
}

export { CheckResults }
