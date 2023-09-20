import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { HomeTeacher } from "../pages/teacher/HomeTeacher/HomeTeacher"
import { ErrorAccess } from "../pages/ErrorAccess/ErrorAccess"
import { HomeStudent } from "../pages/student/HomeStudent/HomeStudent"
import { Login } from "../pages/Login/Login"
import { SignUp } from "../pages/SignUp/SignUp"
import { useContext } from "react"
import { Context } from "../context/ContextProvider"
import Results from "../pages/Results/Results"

function AppRoutes() {
  const { typeUser, } = useContext(Context)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/teacher",
      element: typeUser === "teacher" ? <HomeTeacher /> : <ErrorAccess />,
    },
    {
      path: "/student",
      element: typeUser === "student" ? <HomeStudent /> : <ErrorAccess />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/results",
      element: <Results />,
    },
  ])
  return <RouterProvider router={router} />
}

export { AppRoutes }
