import { createContext, useState } from "react"

const Context = createContext()

function ContextProvider({ children }) {
  const [userAnswers, setUserAnswers] = useState([])
  const [totalAnswers, setTotalAnswers] = useState([])
  const [correctAnswers, setCorrectAnswers] = useState([])
  const actualUser = JSON.parse(sessionStorage.getItem("actualUser"))
  const findedTypeUser =
    actualUser?._document.data.value.mapValue.fields.typeUser.stringValue || ""
  const [isLoged, setIsLoged] = useState({
    isLogedUser: actualUser?.isLoged || false,
    logedUser: null,
  })
  const [typeUser, setTypeUser] = useState(findedTypeUser || "")

  return (
    <Context.Provider
      value={{
        isLoged,
        setIsLoged,
        typeUser,
        setTypeUser,
        userAnswers,
        setUserAnswers,
        correctAnswers,
        setCorrectAnswers,
        totalAnswers,
        setTotalAnswers,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { ContextProvider, Context }
