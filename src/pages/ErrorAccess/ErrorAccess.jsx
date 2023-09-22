import { useNavigate } from "react-router"

function ErrorAccess() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <p className="text-red-800 text-3xl">No tienes autorización para ingresar a esta página</p>
      <button onClick={() => navigate("/")} className="w-[100px] bg-green-500 p-5 rounded-2xl hover:bg-green-200 text-xl font-bold text-white">Volver</button>
    </div>
  )
}

export { ErrorAccess }
