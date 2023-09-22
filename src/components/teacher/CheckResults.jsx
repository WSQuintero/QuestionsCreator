import { useEffect, useState } from "react"
import { useReadAllDataInDb } from "../../customHooks/useReadAllDataInDb"

function CheckResults({ setOptionSelected }) {
  const { data, readDataInDb } = useReadAllDataInDb("answersStudent")
  const usersInSchool = useReadAllDataInDb("users")
  const [finalUsers, setFinalUsers] = useState([])
  const actualSchool = JSON.parse(sessionStorage.getItem("actualUser"))
    ._document.data.value.mapValue.fields.userSchool.stringValue

  useEffect(() => {
    readDataInDb()
    usersInSchool.readDataInDb()
  }, [])

  useEffect(() => {
    const studentsInActualSchool = usersInSchool.data.filter(
      (student) =>
        student._document.data.value.mapValue.fields?.userSchool
          ?.stringValue === actualSchool
    )
    setFinalUsers(studentsInActualSchool)
  }, [usersInSchool.data])

  return (
    <div className='w-2/4 flex flex-col gap-10 justify-center items-center'>
      {!finalUsers.find(
        (user) =>
          user._document.data.value.mapValue.fields?.typeUser.stringValue ===
          "student"
      ) && (
        <p className='border border-red-400 p-6 w-full text-center text-red-800 rounded-xl'>
          No hay estudiantes para mostrar
        </p>
      )}
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

      <button
        onClick={() => setOptionSelected("")}
        className='w-[100px] bg-green-500 p-5 rounded-2xl hover:bg-green-200 text-xl font-bold text-white'
      >
        Volver
      </button>
    </div>
  )
}

export { CheckResults }
