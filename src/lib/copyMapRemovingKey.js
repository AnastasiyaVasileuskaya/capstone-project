export default function copyMapRemovingKey(map, keyToRemove) {
  var newMap = new Map()
  map &&
    map.forEach((value, key) => {
      if (keyToRemove !== key) {
        newMap.set(key, value)
      }
    })
  return newMap
}
