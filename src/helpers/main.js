import { weightedMean, sumOfArray } from '@/helpers/utils'

import {
  getPortfolioValue,
  getPortfolioGain,
  getPortfolioDividend,
  getPortfolioReturns,
  getPortfolioPlotChartData,
} from '@/helpers/portfolio'

export const getMainValue = data => {
  let mainValue = 0
  data.portfolios.forEach(portfolioObject => {
    const portfolioValue = getPortfolioValue(portfolioObject)
    mainValue += portfolioValue
  })
  return mainValue
}

export const getMainGain = (data, firstDate) => {
  let mainGain = 0
  data.portfolios.forEach(portfolioObject => {
    const portfolioGain = getPortfolioGain(portfolioObject, firstDate)
    mainGain += portfolioGain
  })
  return mainGain
}

export const getMainDividend = (data, firstDate) => {
  let mainDividend = 0
  data.portfolios.forEach(portfolioObject => {
    const portfolioDividend = getPortfolioDividend(portfolioObject, firstDate)
    mainDividend += portfolioDividend
  })
  return mainDividend
}

export const getMainReturns = (data, firstDate) => {
  const returnsArray = []
  const weightsArray = []
  data.portfolios.forEach(portfolioObject => {
    const { portfolioReturns, portfolioWeight } = getPortfolioReturns(
      portfolioObject,
      firstDate
    )
    returnsArray.push(portfolioReturns)
    weightsArray.push(portfolioWeight)
  })
  const mainReturns = weightedMean(returnsArray, weightsArray)
  const mainWeight = sumOfArray(weightsArray)
  return { mainReturns, mainWeight }
}

export const getMainDoughnutData = data => {
  const mainDoughnutData = data.portfolios.map(portfolioObject => {
    const sliceObject = {
      label: portfolioObject.label,
      value: getPortfolioValue(portfolioObject),
    }
    return sliceObject
  })
  return mainDoughnutData
}

export const getMainPlotChartData = (data, firstDate) => {
  const mainLabelsArray = []
  const mainValuesArray = []
  data.portfolios.forEach((portfolioObject, portfolioIndex) => {
    const {
      portfolioLabelsArray,
      portfolioValuesArray,
    } = getPortfolioPlotChartData(portfolioObject, firstDate)
    portfolioLabelsArray.forEach((label, labelIndex) => {
      mainLabelsArray.splice(labelIndex, 1, label)
      if (portfolioIndex === 0) {
        mainValuesArray.splice(labelIndex, 1, portfolioValuesArray[labelIndex])
      } else {
        mainValuesArray.splice(
          labelIndex,
          1,
          mainValuesArray[labelIndex] + portfolioValuesArray[labelIndex]
        )
      }
    })
  })
  return { mainLabelsArray, mainValuesArray }
}

export const getMainTableData = (data, firstDate) => {
  const mainValue = getMainValue(data)
  const tableData = data.portfolios.map((portfolioObject, index) => {
    const rowObject = {
      id: index,
      label: portfolioObject.label,
      value: getPortfolioValue(portfolioObject),
      gain: getPortfolioGain(portfolioObject, firstDate),
      returns: getPortfolioReturns(portfolioObject, firstDate).portfolioReturns,
      actual: getPortfolioValue(portfolioObject) / mainValue,
      target: portfolioObject.target,
    }
    return rowObject
  })
  return tableData
}
