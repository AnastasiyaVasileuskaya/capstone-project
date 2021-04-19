import createUrlParams from './createUrlParams'

export default function createUrlParamsFromString(urlParamsString) {
  const urlParams = new URLSearchParams(urlParamsString)
  return createUrlParams(
    urlParams.get('query') ?? '',
    urlParams.get('caloriesRangeFrom') ?? '',
    urlParams.get('caloriesRangeTo') ?? '',
    urlParams.get('healthLabels')?.split(',') || [],
    urlParams.get('dishTypes')?.split(',') || []
  )
}
