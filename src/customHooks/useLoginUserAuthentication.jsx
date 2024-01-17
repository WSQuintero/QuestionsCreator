import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from '../firebase/firebase'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useReadAllDataInDb } from './useReadAllDataInDb'
import { Context } from '../context/ContextProvider'
import { navigateUserLoged, updateUserInformation} from '../helpers/functionsLogin'

function useLoginUserAuthentication() {
  const { setTypeUser } = useContext(Context)
  const { data, readDataInDb } = useReadAllDataInDb('users')
  const [isLogedUser, setIsLogedUser] = useState(false)
  const [logedUser, setLogedUser] = useState(null)
  const [errorAuthenticationLogin, setErrorAuthenticationLogin] = useState('')
  const auth = getAuth(app)
  const navigate = useNavigate()
  const navigateUser = { navigate, setTypeUser, setIsLogedUser, setLogedUser }
  const templateEmail = (data) =>
    data._document.data.value.mapValue.fields.userEmail.stringValue

  useEffect(() => {
    readDataInDb()
  }, [data])

  const loginUserAuth = async ({ email, password }) => {
    try {
      const userCredential =
        await signInWithEmailAndPassword(auth,email,password)
      const actualUser = data.find((dat) => templateEmail(dat) === email)

      updateUserInformation(actualUser)
      navigateUserLoged({ ...navigateUser, userCredential, actualUser })

    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setErrorAuthenticationLogin('El usuario no se encuentra registrado')
      } else if (error.message.includes('wrong password')) {
        setErrorAuthenticationLogin('La contraseña es incorrecta')
      }

      setTimeout(() => setErrorAuthenticationLogin(''), 2000)
    }
  }

  return {
    isLogedUser,
    logedUser,
    errorAuthenticationLogin,
    loginUserAuth
  }
}

export { useLoginUserAuthentication }
