import { useNavigate } from "react-router"
import { useLoginUserAuthentication } from "../../customHooks/useLoginUserAuthentication"

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
      <div>
        <form className='flex flex-col' onSubmit={handleSubmitLogin}>
          <label htmlFor='inputUser'>Usuario</label>
          <input
            type='email'
            name='inputUser'
            id='inputUser'
            className='border border-gray-400'
            required
          />
          <label htmlFor='inputPassword'>Password</label>{" "}
          <input
            type='password'
            name='inputPassword'
            id='inputPassword'
            className='border border-gray-400'
            required
          />
          <button className='border border-gray-400 p-5 rounded-2xl mt-10'>
            Ingresar
          </button>
          <p className='w-full mt-5'>
            ¿Aun no tienes cuenta?{" "}
            <span
              className='font-bold cursor-pointer'
              onClick={() => navigate("/sign-up")}
            >
              {" "}
              click aquí{" "}
            </span>
          </p>
        </form>
      </div>
      <span className='text-3xl text-red-600 font-bold '>
        {errorAutehenticationLogin}
      </span>
    </>
  )
}

export { Login }
