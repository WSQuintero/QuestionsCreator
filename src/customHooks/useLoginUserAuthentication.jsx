import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { app } from "../firebase/firebase"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useReadAllDataInDb } from "./useReadAllDataInDb"
import { Context } from "../context/ContextProvider"

function useLoginUserAuthentication() {
  const { setTypeUser } = useContext(Context)
  const { data, readDataInDb } = useReadAllDataInDb("users")
  const [isLogedUser, setIsLogedUser] = useState(false)
  const [logedUser, setlogedUser] = useState(null)
  const navigate = useNavigate()
  const [errorAutehenticationLogin, setErrorAutehenticationLogin] = useState("")
  const auth = getAuth(app)

  useEffect(() => {
    readDataInDb()
  }, [data])

  const loginUserAuth = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const actualUser = data.find(
          (dat) =>
            dat._document.data.value.mapValue.fields.userEmail.stringValue ===
            email
        )
        sessionStorage.setItem(
          "actualUser",
          JSON.stringify({ ...actualUser, isLoged: true })
        )
        const findedTypeUser =
          actualUser._document.data.value.mapValue.fields.typeUser.stringValue

        const user = userCredential.user
        setIsLogedUser(true)
        setlogedUser(user)

        if (findedTypeUser === "teacher") {
          navigate("/teacher")
          setTypeUser("teacher")
        }
        if (findedTypeUser === "student") {
          navigate("/student")
          setTypeUser("student")
        }
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        if (errorCode === "auth/user-not-found") {
          setErrorAutehenticationLogin(`EL usuario no se encuentra registrado`)
          setTimeout(() => setErrorAutehenticationLogin(""), 2000)

        }
        if (errorMessage.includes("wrong password")) {
          setErrorAutehenticationLogin(`La contraseña es incorrecta`)
          setTimeout(() => setErrorAutehenticationLogin(""), 2000)

        }

      })
  }

  return { isLogedUser, logedUser, errorAutehenticationLogin, loginUserAuth }
}

export { useLoginUserAuthentication }
