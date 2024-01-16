import { useNavigate } from 'react-router'
import { useLoginUserAuthentication } from '../../customHooks/useLoginUserAuthentication'
import './Login.css'

function Login() {
  const { loginUserAuth, errorAutehenticationLogin } =
    useLoginUserAuthentication()

  const navigate = useNavigate()

  const handleSubmitLogin = (event) => {
    event.preventDefault()
    const inputUser = event.target.inputUser.value
    const inputPassword = event.target.inputPassword.value
    loginUserAuth({ email: inputUser, password: inputPassword })
  }

  return (
    <>
      <div className='flex  justify-center items-center w-4/5 bg-deep-magenta h-[80vh] rounded-3xl border-2 overflow-hidden'>
        <figure className='w-2/5 h-full flex justify-center items-center  bg-pale-yellow'>
          <img src='/klipartz.png' alt='loginImg'  className=' object-cover object-right h-full'/>
        </figure>
        <form
          className='flex flex-col  w-3/5 justify-center p-10 gap-3 bg-pastel-yellow h-full'
          onSubmit={handleSubmitLogin}>
          <label htmlFor='inputUser' className='text-3xl font-bold'>
            Usuario
          </label>
          <input
            type='email'
            name='inputUser'
            id='inputUser'
            className='border h-[40px] rounded-lg px-5'
            required
          />
          <label htmlFor='inputPassword' className='text-3xl font-bold'>
            Password
          </label>{' '}
          <input
            type='password'
            name='inputPassword'
            id='inputPassword'
            className='border h-[40px] rounded-lg px-5'
            required
          />
          <button className='p-5 rounded-2xl mt-10 bg-dark-red text-white hover:bg-pale-yellow hover:text-dark-maroon font-bold text-2xl border border-dark-maroon'>
            Ingresar
          </button>
          <div className='w-full flex justify-end text-2xl'>

          <p className=' mt-5'>
            ¿Aun no tienes cuenta?{' '}
            <span
              className='font-bold cursor-pointer text-dark-red'
              onClick={() => navigate('/sign-up')}>
              {' '}
              click aquí{' '}
            </span>
          </p>
          </div>
        </form>
      </div>
      <span className='text-3xl text-red-600 font-bold '>
        {errorAutehenticationLogin}
      </span>
    </>
  )
}

export { Login }
