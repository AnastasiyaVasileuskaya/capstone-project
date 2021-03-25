export default function copyMapAndSetValue(map, key, value) {
  var newMap = new Map()
  map && map.forEach((value, key) => newMap.set(key, value))
  newMap.set(key, value)
  return newMap
}
