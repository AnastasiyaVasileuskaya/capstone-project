import { useEffect, useState } from 'react'
import loadFromLocal from '../lib/loadFromLocal'
import saveToLocal from '../lib/saveToLocal'

export default function useLocalStorage(key, initialData) {
  const [data, setData] = useState(initialData ?? loadFromLocal(key))

  useEffect(() => {
    saveToLocal(key, data)
  }, [data, key])

  return [data, setData]
}
