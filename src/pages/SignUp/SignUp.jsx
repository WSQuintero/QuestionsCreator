import { useEffect, useState } from "react"
import { addUserInDb } from "../../logic/addUserInDb"
import { useNavigate } from "react-router"
import { useReadAllDataInDb } from "../../customHooks/useReadAllDataInDb"
import { useAddUserAuthentication } from "../../customHooks/useAddUserAuthentication"
import "./SignUp.css"

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
    <div className='flex w-4/5 border border-gray-300 h-[80vh] rounded-xl'>
      <div className='w-2/4 sm:flex flex-col justify-center items-center background-img hidden' />
      <form
        className='w-full sm:w-2/4 flex flex-col justify-center items-start p-10'
        onSubmit={handleRegisterForm}
      >
        <label htmlFor='userName'>Nombre</label>
        <input
          type='text'
          id='userName'
          name='userName'
          className='border border-gray-400 w-full'
        />
        <label htmlFor='userEmail'>Usuario</label>
        <input
          type='email'
          id='userEmail'
          name='userEmail'
          className='border border-gray-400 w-full'
          required
        />
        <label htmlFor='password'>password</label>
        <input
          type='password'
          id='password'
          name='password'
          className='border border-gray-400 w-full'
          required
        />
        <label htmlFor='repeatPassword'>Repeat password</label>
        <input
          type='password'
          id='repeatPassword'
          name='repeatPassword'
          className='border border-gray-400 w-full'
          required
        />
        <label htmlFor='repeatPassword'>Institución</label>
        <input
          type='text'
          id='school'
          name='school'
          className='border border-gray-400 w-full'
          required
        />
        <button className='border border-gray-400 rounded-full w-[150px] m-auto mt-5 mb-0 h-[30px] hover:bg-green-500 hover:text-white font-medium'>
          Enviar
        </button>
        <div className='flex w-2/4 m-auto mb-0 justify-between mt-10 '>
          <label htmlFor='teacher' className='font-bold'>
            Profesor
          </label>
          <input type='radio' name='typeUser' id='teacher' required />
          <label htmlFor='student' className='font-bold'>
            Estudiante
          </label>
          <input type='radio' name='typeUser' id='student' required />
        </div>
      </form>
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
    </div>
  )
}

export { SignUp }
