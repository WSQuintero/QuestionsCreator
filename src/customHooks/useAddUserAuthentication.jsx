import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { app } from "../firebase/firebase"
import { useState } from "react"

function useAddUserAuthentication() {
  const [isCreatedUser, setIsCreatedUser] = useState(null)
  const [errorAutehentication, setErrorAutehentication] = useState("")
  const auth = getAuth(app)

  const AddUserAuth = ({email, password}) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        setIsCreatedUser(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        setErrorAutehentication(`${errorCode}-${errorMessage}`)
      })
  }
 
  return { isCreatedUser, errorAutehentication, AddUserAuth }
}

export { useAddUserAuthentication }
