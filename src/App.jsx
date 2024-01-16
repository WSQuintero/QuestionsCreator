import { ContextProvider } from "./context/ContextProvider"
import { AppRoutes } from "./routes/AppRoutes"

function App() {
  return (
    <main className='flex flex-col justify-center items-center min-h-[100vh] gap-5 w-full font-lemon  bg-dark-maroon text-dark-maroon/80'>
      <ContextProvider>
        <AppRoutes />
      </ContextProvider>
    </main>
  )
}

export {App}
