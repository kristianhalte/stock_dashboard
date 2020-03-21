import { splitTimeSeriesData, getLastElementInArray } from '@/helpers/utils'

// TODO: rename to remove the PERIOD part
export const getHoldingPeriodGain = (data, firstDate) => {
  const { pastDateArray, currentDateArray } = splitTimeSeriesData(
    data,
    firstDate
  )
  const lastPastDateObject = getLastElementInArray(pastDateArray)
  const lastCurrentDateObject = getLastElementInArray(currentDateArray)
  const lastPastDateSpend = lastPastDateObject.spend
  const lastPastDateValue = lastPastDateObject.value
  const lastCurrentDateSpend = lastCurrentDateObject.spend
  const lastCurrentDateValue = lastCurrentDateObject.value
  const deltaSpend = lastCurrentDateSpend - lastPastDateSpend
  const deltaValue = lastCurrentDateValue - lastPastDateValue
  const periodGain = deltaValue - deltaSpend
  return periodGain
}

// TODO: rename to remove the PERIOD part
export const getHoldingPeriodReturns = (data, firstDate) => {
  const { pastDateArray, currentDateArray } = splitTimeSeriesData(
    data,
    firstDate
  )
  const lastPastDateObject = getLastElementInArray(pastDateArray)
  const lastCurrentDateObject = getLastElementInArray(currentDateArray)
  const lastPastDateSpend = lastPastDateObject.spend
  const lastPastDateValue = lastPastDateObject.value
  const lastCurrentDateSpend = lastCurrentDateObject.spend
  const lastCurrentDateValue = lastCurrentDateObject.value
  const deltaSpend = lastCurrentDateSpend - lastPastDateSpend
  const deltaValue = lastCurrentDateValue - lastPastDateValue
  const periodReturns = (deltaValue - deltaSpend) / lastCurrentDateSpend
  return { periodReturns, lastCurrentDateValue }
}

// const getHoldingValue = (data, firstDate) => {
//   const { pastDateArray, currentDateArray } = splitTimeSeriesData(
//     data,
//     firstDate
//   )
//   const lastPastDateObject = getLastElementInArray(pastDateArray)
//   const lastCurrentDateObject = getLastElementInArray(currentDateArray)
//   const lastPastDateSpend = lastPastDateObject.spend
//   const lastPastDateValue = lastPastDateObject.value
//   const lastCurrentDateSpend = lastCurrentDateObject.spend
//   const lastCurrentDateValue = lastCurrentDateObject.value
//   const deltaSpend = lastCurrentDateSpend - lastPastDateSpend
//   const deltaValue = lastCurrentDateValue - lastPastDateValue
//   const periodReturns = (deltaValue - deltaSpend) / lastCurrentDateSpend
//   return { periodReturns, lastCurrentDateValue }
// }
