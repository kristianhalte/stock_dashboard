import {
  getLastElementInArray,
  weightedMean,
  splitTimeSeriesData,
  sumOfArray,
} from '@/helpers/utils'

import {
  getHoldingPeriodGain,
  getHoldingPeriodReturns,
} from '@/helpers/holding'

export const getCategoryValue = data => {
  let categoryValue = 0
  data.holdings.forEach(holdingObject => {
    const lastDateObject = getLastElementInArray(holdingObject.timeSeriesData)
    categoryValue += lastDateObject.value
  })
  return categoryValue
}

export const getCategoryGain = (data, firstDate) => {
  let categoryGain = 0
  data.holdings.forEach(holdingObject => {
    const periodGain = getHoldingPeriodGain(
      holdingObject.timeSeriesData,
      firstDate
    )
    categoryGain += periodGain
  })
  return categoryGain
}

// TODO: fix dividend, as it's a DELTA
export const getCategoryDividend = (data, firstDate) => {
  let categoryDividend = 0
  data.holdings.forEach(holdingObject => {
    const { pastDateArray, currentDateArray } = splitTimeSeriesData(
      holdingObject.timeSeriesData,
      firstDate
    )
    const lastPastDateObject = getLastElementInArray(pastDateArray)
    const lastCurrentDateObject = getLastElementInArray(currentDateArray)
    const lastPastDateDividend = lastPastDateObject.dividend
    const lastCurrentDateDividend = lastCurrentDateObject.dividend
    const deltaDividend = lastCurrentDateDividend - lastPastDateDividend
    categoryDividend += deltaDividend
  })
  return categoryDividend
}

export const getCategoryReturns = (data, firstDate) => {
  const returnsArray = []
  const weightsArray = []
  data.holdings.forEach(holdingObject => {
    const { periodReturns, lastCurrentDateValue } = getHoldingPeriodReturns(
      holdingObject.timeSeriesData,
      firstDate
    )
    returnsArray.push(periodReturns)
    weightsArray.push(lastCurrentDateValue)
  })
  const categoryReturns = weightedMean(returnsArray, weightsArray)
  const categoryWeight = sumOfArray(weightsArray)
  return { categoryReturns, categoryWeight }
}

export const getCategoryDoughnutData = data => {
  const categoryDoughnutData = data.holdings.map(holdingObject => {
    const sliceObject = {
      label: holdingObject.label,
      value: getLastElementInArray(holdingObject.timeSeriesData).value,
    }
    return sliceObject
  })
  return categoryDoughnutData
}

export const getCategoryPlotChartData = (data, firstDate) => {
  const categoryLabelsArray = []
  const categoryValuesArray = []
  data.holdings.forEach((holdingObject, holdingIndex) => {
    const { currentDateArray } = splitTimeSeriesData(
      holdingObject.timeSeriesData,
      firstDate
    )
    // // VERSION: includes the extra date
    // const lastPastDateObject = getLastElementInArray(pastDateArray)
    // const lastPastDateDate = lastPastDateObject.date
    // const lastPastDateValue = lastPastDateObject.value
    // const labelsArray = [lastPastDateDate]
    // const valuesArray = [lastPastDateValue]
    // currentDateArray.forEach((dateObject, index) => {
    //   labelsArray.splice(index + 1, 1, dateObject.date)
    //   valuesArray.splice(index + 1, 1, dateObject.value)
    // })
    // VERSION: regular
    currentDateArray.forEach((dateObject, dateIndex) => {
      categoryLabelsArray.splice(dateIndex, 1, dateObject.date)
      if (holdingIndex === 0) {
        categoryValuesArray.splice(dateIndex, 1, dateObject.value)
      } else {
        categoryValuesArray.splice(
          dateIndex,
          1,
          categoryValuesArray[dateIndex] + dateObject.value
        )
      }
    })
  })
  // const categoryPlotChartData = getPlotChartData(labelsArray, valuesArray)
  return { categoryLabelsArray, categoryValuesArray }
}

export const getCategoryTableData = (data, firstDate) => {
  const categoryValue = getCategoryValue(data)
  const tableData = data.holdings.map((holdingObject, index) => {
    const lastDateObject = getLastElementInArray(holdingObject.timeSeriesData)
    const rowObject = {
      id: index,
      label: holdingObject.label,
      value: lastDateObject.value,
      gain: getHoldingPeriodGain(holdingObject.timeSeriesData, firstDate),
      returns: getHoldingPeriodReturns(holdingObject.timeSeriesData, firstDate)
        .periodReturns,
      actual: lastDateObject.value / categoryValue,
      target: holdingObject.target,
    }
    return rowObject
  })
  return tableData
}
