import { useNavigate } from "react-router"

function ErrorAccess() {
  const navigate = useNavigate()

  return (
    <div>
      <p>No tienes autorización para ingresar a esta página</p>
      <button onClick={() => navigate("/")}>Volver</button>
    </div>
  )
}

export { ErrorAccess }
