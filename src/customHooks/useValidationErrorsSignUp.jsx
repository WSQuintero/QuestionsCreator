import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useAddUserAuthentication } from "./useAddUserAuthentication"
import { useReadAllDataInDb } from "./useReadAllDataInDb"
import { addUserInDb } from "../logic/addUserInDb"

function useValidationErrorsSignUp() {
  const navigate=useNavigate()
  const { isCreatedUser, AddUserAuth } = useAddUserAuthentication()
  const [user, setUser] = useState(null)
  const [userWithPass, setUserWithPass] = useState({})
  const [messageAdd, setMessageAdd] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { data, readDataInDb } = useReadAllDataInDb('users')

  useEffect(() => {
    if(user){
      if (userWithPass.password.length >= 6) {
        if (userWithPass.password === userWithPass.repeatPassword) {
          const validateUsers = data?.some(
            (validateUser) =>
              validateUser?._document?.data?.value?.mapValue?.fields?.userEmail
                ?.stringValue === user.userEmail
          )


          if (!validateUsers) {
            AddUserAuth({
              email: userWithPass.userEmail,
              password: userWithPass.password
            })
          } else {
            setErrorMessage('El correo ya se encuentra registrado')
            setTimeout(() => {
              setErrorMessage('')
            }, 2000)
          }
        } else {
          setErrorMessage('Las dos contraseñas deben coincidir')
          setTimeout(() => {
            setErrorMessage('')
          }, 2000)
        }
      } else {
        setErrorMessage('La contraseña debe contener mínimo 6 caracteres')
        setTimeout(() => {
          setErrorMessage('')
        }, 2000)
      }
    }

}, [user])

useEffect(()=>{

  const sendUser = async (newUser) => {
    const resultAdd = await addUserInDb(newUser, 'users')

    setMessageAdd(resultAdd)
    setTimeout(() => {
      setMessageAdd('')
      navigate('/login')
    }, 2000)
  }
  if (isCreatedUser) sendUser(user)

},[isCreatedUser])

return {setUser,
  setUserWithPass,messageAdd,
  errorMessage,readDataInDb}
}

export  {useValidationErrorsSignUp}