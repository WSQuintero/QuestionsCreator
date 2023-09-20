import { useState } from "react"

import { db } from "../firebase/firebase"
import { collection, getDocs } from "firebase/firestore"

function useReadAllDataInDb(collecction) {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  const readDataInDb = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, collecction))

      setData(querySnapshot.docs)
    } catch (error) {
      setError(error)
    }
  }

  return { data, error, readDataInDb }
}

export { useReadAllDataInDb }
