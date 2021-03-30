import { useEffect, useState } from 'react'
import loadFromLocal from '../lib/loadFromLocal'
import saveToLocal from '../lib/saveToLocal'

export default function useMapFromLocalStorage(key, initialMap) {
  const [map, setMap] = useState(getMapFromLocalStorage(key, initialMap))

  useEffect(() => {
    saveToLocal(key, convertMapToObject(map))
  }, [map])

  return [map, setMap]
}

function convertMapToObject(map) {
  if (!map) {
    return {}
  }
  return Object.fromEntries(map)
}

function getMapFromLocalStorage(key, initialMap) {
  let data = loadFromLocal(key)
  if (data) {
    return convertObjectToMap(data)
  }
  if (initialMap) {
    return initialMap
  }
  return new Map()
}

function convertObjectToMap(data) {
  return new Map(Object.entries(data))
}
