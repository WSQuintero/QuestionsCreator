function updateUserInformation(actualUser) {
  sessionStorage.setItem(
    'actualUser',
    JSON.stringify({ ...actualUser, isLoged: true })
  )
}
function updateIsLogedUser(user, setIsLogedUser, setLogedUser) {
  setIsLogedUser(true)
  setLogedUser(user)
}
function navigateUserLoged({
  actualUser,
  navigate,
  setTypeUser,
  userCredential,
  setIsLogedUser,
  setLogedUser
}) {
  const findedTypeUser =
    actualUser._document.data.value.mapValue.fields.typeUser.stringValue
  const user = userCredential.user
  updateIsLogedUser(user, setIsLogedUser, setLogedUser)

  if (findedTypeUser === 'teacher') {
    navigate('/teacher')
    setTypeUser('teacher')
  } else if (findedTypeUser === 'student') {
    navigate('/student')
    setTypeUser('student')
  }
}

export { updateUserInformation, updateIsLogedUser, navigateUserLoged }
