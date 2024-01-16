import { useEffect, useState } from 'react'
import { addUserInDb } from '../../logic/addUserInDb'
import { useNavigate } from 'react-router'
import { useReadAllDataInDb } from '../../customHooks/useReadAllDataInDb'
import { useAddUserAuthentication } from '../../customHooks/useAddUserAuthentication'
import './SignUp.css'

function SignUp() {
  const { data, readDataInDb } = useReadAllDataInDb('users')
  const [messageAdd, setMessageAdd] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
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
        ? 'teacher'
        : inputTypeUser[1].checked
        ? 'student'
        : false,
      userSchool: event.target.school.value.toLowerCase()
    }
    setUser(newUser)

    const pass = {
      userEmail: event.target.userEmail.value,
      password: event.target.password.value,
      repeatPassword: event.target.repeatPassword.value
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
            const resultAdd = await addUserInDb(newUser, 'users')

            setMessageAdd(resultAdd)
            setTimeout(() => {
              setMessageAdd('')
              navigate('/login')
            }, 2000)
          }

          if (!validateUsers) {
            AddUserAuth({
              email: userWithPass.userEmail,
              password: userWithPass.password
            })
            if (isCreatedUser) sendUser(user)
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
  }, [user, isCreatedUser])

  return (
    <div className='flex  justify-center items-center w-4/5 bg-deep-magenta h-[80vh] rounded-3xl border-2 overflow-hidden'>
      <figure className='w-2/5 h-full flex justify-center items-center  bg-pale-yellow'>
        <img
          src='/klipartz.png'
          alt='loginImg'
          className=' object-cover object-right h-full'
        />
      </figure>{' '}
      <div className='flex flex-col  w-3/5 justify-center p-20 gap-3 bg-pastel-yellow h-full '>

      <form
          className='flex flex-col  w-full justify-center  gap-3 bg-pastel-yellow h-full'
          onSubmit={handleRegisterForm}>
        <label htmlFor='userName'>Nombre</label>
        <input
          type='text'
          id='userName'
          name='userName'
          className='px-5'
        />
        <label htmlFor='userEmail'>Usuario</label>
        <input
          type='email'
          id='userEmail'
          name='userEmail'
          required
          className='px-5'

        />
        <label htmlFor='password'>password</label>
        <input
          type='password'
          id='password'
          name='password'
          required
          className='px-5'

        />
        <label htmlFor='repeatPassword'>Repeat password</label>
        <input
          type='password'
          id='repeatPassword'
          name='repeatPassword'
          required
          className='px-5'

        />
        <label htmlFor='repeatPassword'>Institución</label>
        <input
          type='text'
          id='school'
          name='school'
          required
          className='px-5'

        />
        <div className='w-full flex justify-center p-5'>

        <button className='text-3xl font-bold' >
          Enviar
        </button>
        </div>
        <div className='flex w-2/4 m-auto mb-0 justify-between mt-10 items-center border border-dark-maroon p-5 rounded-xl '>
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
      {messageAdd !== '' && (
        <p className='text-3xl text-green-600 font-medium m-auto'>
          Usuario creado exitosamente
        </p>
      )}
      {errorMessage !== '' && (
        <p className='text-3xl text-red-600 font-medium mt-5 m-auto'>
          {errorMessage}{' '}
        </p>
      )}
      </div>
    </div>
  )
}

export { SignUp }
