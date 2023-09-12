import { collection, addDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"

async function addUserInDb(data) {
  try {
    const docRef = await addDoc(collection(db, "questonaries"), data)
    return docRef.id
  } catch (error) {
    return error
  }
}

export { addUserInDb }
