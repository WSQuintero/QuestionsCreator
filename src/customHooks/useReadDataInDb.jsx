import { useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"

function useReadDataInDb() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const readDataInDb = async (documentId) => {
    try {
      const docRef = doc(db, "questonaries", documentId) // Reemplaza 'questonaries' por el nombre de tu colección
      const docSnapshot = await getDoc(docRef)

      if (docSnapshot.exists()) {
        setData({ docId: docSnapshot.id, docData: docSnapshot.data() })
      } else {
        setData(null)
        throw new Error("El número de documento no existe")
      }
    } catch (error) {
      setError(error)
    }
  }

  return { data, error, readDataInDb }
}

export { useReadDataInDb }
