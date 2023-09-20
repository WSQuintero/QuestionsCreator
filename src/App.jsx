import { ContextProvider } from "./context/ContextProvider"
import { AppRoutes } from "./routes/AppRoutes"

function App() {
  return (
    <main className='flex flex-col justify-center items-center h-[100vh] gap-5 w-full'>
      <ContextProvider>
        <AppRoutes />
      </ContextProvider>
    </main>
  )
}

export default App
