import { getFirstDate, getPlotChartData } from '@/helpers/utils'

import {
  getPortfolioValue,
  getPortfolioGain,
  getPortfolioDividend,
  getPortfolioReturns,
  getPortfolioDoughnutData,
  getPortfolioPlotChartData,
  getPortfolioTableData,
} from '@/helpers/portfolio'

export const portfolioLabelGetter = data => {
  const label = data.label
  return label
}

export const portfolioValueGetter = data => {
  const value = getPortfolioValue(data)
  return value
}

export const portfolioGainGetter = (data, dateRange) => {
  const firstDate = getFirstDate(dateRange)
  const gain = getPortfolioGain(data, firstDate)
  return gain
}

export const portfolioDividendGetter = (data, dateRange) => {
  const firstDate = getFirstDate(dateRange)
  const dividend = getPortfolioDividend(data, firstDate)
  return dividend
}

export const portfolioReturnsGetter = (data, dateRange) => {
  const firstDate = getFirstDate(dateRange)
  const { portfolioReturns } = getPortfolioReturns(data, firstDate)
  return portfolioReturns
}

export const portfolioDoughnutChartDataGetter = data => {
  const doughnutData = getPortfolioDoughnutData(data)
  return doughnutData
}

export const portfolioPlotChartDataGetter = (data, dateRange) => {
  const firstDate = getFirstDate(dateRange)
  // const plotChartData = getPortfolioPlotChartData(data, firstDate)
  const {
    portfolioLabelsArray,
    portfolioValuesArray,
  } = getPortfolioPlotChartData(data, firstDate)
  const plotChartData = getPlotChartData(
    portfolioLabelsArray,
    portfolioValuesArray
  )
  return plotChartData
}

export const portfolioTableDataGetter = (data, dateRange) => {
  const firstDate = getFirstDate(dateRange)
  const tableData = getPortfolioTableData(data, firstDate)
  return tableData
}
