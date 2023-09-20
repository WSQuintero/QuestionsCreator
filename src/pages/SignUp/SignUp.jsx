import { useEffect, useState } from "react"
import { addUserInDb } from "../../logic/addUserInDb"
import { useNavigate } from "react-router"
import { useReadAllDataInDb } from "../../customHooks/useReadAllDataInDb"
import { useAddUserAuthentication } from "../../customHooks/useAddUserAuthentication"

function SignUp() {
  const { data, readDataInDb } = useReadAllDataInDb("users")
  const [messageAdd, setMessageAdd] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [user, setUser] = useState(null)
  const [userWithPass, setUserWithPass] = useState({})
  const { isCreatedUser, AddUserAuth } = useAddUserAuthentication()
  const navigate = useNavigate()

  const handleRegisterForm = async (event) => {
    event.preventDefault()
    const inputTypeUser = event.target.typeUser
    const newUser = {
      userName: event.target.userName.value,
      userEmail: event.target.userEmail.value,
      typeUser: inputTypeUser[0].checked
        ? "teacher"
        : inputTypeUser[1].checked
        ? "student"
        : false,
      userSchool: event.target.school.value.toLowerCase(),
    }
    setUser(newUser)

    const pass = {
      userEmail: event.target.userEmail.value,
      password: event.target.password.value,
      repeatPassword: event.target.repeatPassword.value,
    }
    setUserWithPass(pass)
  }

  useEffect(() => {
    readDataInDb()
  }, [])
  useEffect(() => {
    if (user) {
      if (userWithPass.password.length >= 6) {
        if (userWithPass.password === userWithPass.repeatPassword) {
          const validateUsers = data?.some(
            (validateUser) =>
              validateUser?._document?.data?.value?.mapValue?.fields?.userEmail
                ?.stringValue === user.userEmail
          )

          const sendUser = async (newUser) => {
            const resultAdd = await addUserInDb(newUser, "users")

            setMessageAdd(resultAdd)
            setTimeout(() => {
              setMessageAdd("")
              navigate("/login")
            }, 2000)
          }

          if (!validateUsers) {
            AddUserAuth({
              email: userWithPass.userEmail,
              password: userWithPass.password,
            })
            if (isCreatedUser) sendUser(user)
          } else {
            setErrorMessage("El correo ya se encuentra registrado")
            setTimeout(() => {
              setErrorMessage("")
            }, 2000)
          }
        } else {
          setErrorMessage("Las dos contraseñas deben coincidir")
          setTimeout(() => {
            setErrorMessage("")
          }, 2000)
        }
      } else {
        setErrorMessage("La contraseña debe contener mínimo 6 caracteres")
        setTimeout(() => {
          setErrorMessage("")
        }, 2000)
      }
    }
  }, [user, isCreatedUser])

  return (
    <>
      <div>
        <form className='flex flex-col ' onSubmit={handleRegisterForm}>
          <label htmlFor='userName'>Nombre</label>
          <input
            type='text'
            id='userName'
            name='userName'
            className='border border-gray-400'
          />
          <label htmlFor='userEmail'>Usuario</label>
          <input
            type='email'
            id='userEmail'
            name='userEmail'
            className='border border-gray-400'
            required
          />
          <label htmlFor='password'>password</label>
          <input
            type='password'
            id='password'
            name='password'
            className='border border-gray-400'
            required
          />
          <label htmlFor='repeatPassword'>Repeat password</label>
          <input
            type='password'
            id='repeatPassword'
            name='repeatPassword'
            className='border border-gray-400'
            required
          />
          <label htmlFor='repeatPassword'>Institución</label>
          <input
            type='text'
            id='school'
            name='school'
            className='border border-gray-400'
            required
          />
          <button className='border border-gray-400 rounded-xl mt-5'>
            Enviar
          </button>
          <div className='flex w-full justify-between mt-5'>
            <label htmlFor='teacher'>Profesor</label>
            <input type='radio' name='typeUser' id='teacher' required />
            <label htmlFor='student'>Estudiante</label>
            <input type='radio' name='typeUser' id='student' required />
          </div>
        </form>
      </div>
      {messageAdd !== "" && (
        <p className='text-3xl text-green-600 font-medium'>
          Usuario creado exitosamente
        </p>
      )}
      {errorMessage !== "" && (
        <p className='text-3xl text-red-600 font-medium mt-5'>
          {errorMessage}{" "}
        </p>
      )}
    </>
  )
}

export { SignUp }
