import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { GeneratedAnswersStudent } from "../components/student/GeneratedAnswersStudent"
import { HomeTeacher } from "../pages/teacher/HomeTeacher/HomeTeacher"
import HomeStudent from "../pages/student/HomeStudent/HomeStudent"

function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <GeneratedAnswersStudent />,
    },
    {
      path: "/teacher",
      element: <HomeTeacher />,
    },
    {
      path: "/student",
      element: <HomeStudent />,
    },
  ])
  return <RouterProvider router={router} />
}

export { AppRoutes }
