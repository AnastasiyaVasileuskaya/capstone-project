import useLocalStorage from './useLocalStorage'
import { useEffect, useState } from 'react'

export default function useMapFromLocal(key, initialMap) {
  const [data, setData] = useLocalStorage(key, convertMapToJson(initialMap))

  const [map, setMap] = useState(convertJsonToMap(data))

  useEffect(() => {
    setData(convertMapToJson(map))
  }, [map])

  return [map, setMap]
}

function convertMapToJson(map) {
  if (!map) {
    map = new Map()
  }
  return JSON.stringify(Object.fromEntries(map))
}

function convertJsonToMap(data) {
  return new Map(Object.entries(JSON.parse(data)))
}
