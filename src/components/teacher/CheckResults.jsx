import { useEffect, useState } from "react"
import { useReadAllDataInDb } from "../../customHooks/useReadAllDataInDb"

function CheckResults({ setOptionSelected }) {
  const { data, readDataInDb } = useReadAllDataInDb("answersStudent")
  const usersInSchool = useReadAllDataInDb("users")
  const [finalUsers, setFinalUsers] = useState([])
  
  useEffect(() => {
    readDataInDb()
    usersInSchool.readDataInDb()
  }, [])

  useEffect(() => {
    const actualSchool = JSON.parse(sessionStorage.getItem("actualUser"))
      ._document.data.value.mapValue.fields.userSchool.stringValue

    const studentsInActualSchool = usersInSchool.data.filter(
      (student) =>
        student._document.data.value.mapValue.fields?.userSchool
          ?.stringValue === actualSchool
    )
    setFinalUsers(studentsInActualSchool)
  }, [usersInSchool.data])

  return (
    <div>
      {finalUsers?.map(
        (student, index) =>
          student._document?.data?.value?.mapValue?.fields?.typeUser
            .stringValue === "student" && (
            <div key={index}>
              <p className='text-3xl font-bold text-black'>
                Estudiante:{" "}
                <span className='font-light'>
                  {
                    data.find(
                      (dat) =>
                        dat._document?.data?.value?.mapValue?.fields?.userEmail
                          ?.stringValue ===
                        student._document?.data?.value?.mapValue?.fields
                          ?.userEmail?.stringValue
                    )._document?.data?.value?.mapValue?.fields?.userName
                      ?.stringValue
                  }
                </span>
              </p>
              <p className='text-3xl font-bold text-black'>
                Email:{" "}
                <span className='font-light'>
                  {
                    data.find(
                      (dat) =>
                        dat._document?.data?.value?.mapValue?.fields?.userEmail
                          ?.stringValue ===
                        student._document?.data?.value?.mapValue?.fields
                          ?.userEmail?.stringValue
                    )._document?.data?.value?.mapValue?.fields?.userEmail
                      ?.stringValue
                  }
                </span>
              </p>
              <p className='text-3xl font-bold text-black'>
                Rspuestas correctas:{" "}
                <span className='font-light'>
                  {
                    data.find(
                      (dat) =>
                        dat._document?.data?.value?.mapValue?.fields?.userEmail
                          ?.stringValue ===
                        student._document?.data?.value?.mapValue?.fields
                          ?.userEmail?.stringValue
                    )._document?.data?.value?.mapValue?.fields
                      ?.countCorrectAnswers.integerValue
                  }
                </span>
              </p>
            </div>
          )
      )}
      <button onClick={() => setOptionSelected("")}>Volver</button>
    </div>
  )
}

export { CheckResults }
