import { weightedMean, sumOfArray } from '@/helpers/utils'

import {
  getCategoryValue,
  getCategoryGain,
  getCategoryDividend,
  getCategoryReturns,
  getCategoryPlotChartData,
} from '@/helpers/category'

export const getPortfolioValue = data => {
  let portfolioValue = 0
  data.categories.forEach(categoryObject => {
    const categoryValue = getCategoryValue(categoryObject)
    portfolioValue += categoryValue
  })
  return portfolioValue
}

export const getPortfolioGain = (data, firstDate) => {
  let portfolioGain = 0
  data.categories.forEach(categoryObject => {
    const categoryGain = getCategoryGain(categoryObject, firstDate)
    portfolioGain += categoryGain
  })
  return portfolioGain
}

export const getPortfolioDividend = (data, firstDate) => {
  let portfolioDividend = 0
  data.categories.forEach(categoryObject => {
    const categoryDividend = getCategoryDividend(categoryObject, firstDate)
    portfolioDividend += categoryDividend
  })
  return portfolioDividend
}

export const getPortfolioReturns = (data, firstDate) => {
  const returnsArray = []
  const weightsArray = []
  data.categories.forEach(categoryObject => {
    const { categoryReturns, categoryWeight } = getCategoryReturns(
      categoryObject,
      firstDate
    )
    returnsArray.push(categoryReturns)
    weightsArray.push(categoryWeight)
  })
  const portfolioReturns = weightedMean(returnsArray, weightsArray)
  const portfolioWeight = sumOfArray(weightsArray)
  return { portfolioReturns, portfolioWeight }
}

export const getPortfolioDoughnutData = data => {
  const portfolioDoughnutData = data.categories.map(categoryObject => {
    const sliceObject = {
      label: categoryObject.label,
      value: getCategoryValue(categoryObject),
    }
    return sliceObject
  })
  return portfolioDoughnutData
}

export const getPortfolioPlotChartData = (data, firstDate) => {
  const portfolioLabelsArray = []
  const portfolioValuesArray = []
  data.categories.forEach((categoryObject, categoryIndex) => {
    const {
      categoryLabelsArray,
      categoryValuesArray,
    } = getCategoryPlotChartData(categoryObject, firstDate)
    categoryLabelsArray.forEach((label, labelIndex) => {
      portfolioLabelsArray.splice(labelIndex, 1, label)
      if (categoryIndex === 0) {
        portfolioValuesArray.splice(
          labelIndex,
          1,
          categoryValuesArray[labelIndex]
        )
      } else {
        portfolioValuesArray.splice(
          labelIndex,
          1,
          portfolioValuesArray[labelIndex] + categoryValuesArray[labelIndex]
        )
      }
    })
  })
  return { portfolioLabelsArray, portfolioValuesArray }
}

export const getPortfolioTableData = (data, firstDate) => {
  const portfolioValue = getPortfolioValue(data)
  const tableData = data.categories.map((categoryObject, index) => {
    const rowObject = {
      id: index,
      label: categoryObject.label,
      value: getCategoryValue(categoryObject),
      gain: getCategoryGain(categoryObject, firstDate),
      returns: getCategoryReturns(categoryObject, firstDate).categoryReturns,
      actual: getCategoryValue(categoryObject) / portfolioValue,
      target: categoryObject.target,
    }
    return rowObject
  })
  return tableData
}
