import { getFirstDate, getPlotChartData } from '@/helpers/utils'

import {
  getMainValue,
  getMainGain,
  getMainDividend,
  getMainReturns,
  getMainDoughnutData,
  getMainPlotChartData,
  getMainTableData,
} from '@/helpers/main'

export const mainLabelGetter = data => {
  const label = data.label
  return label
}

export const mainValueGetter = data => {
  const value = getMainValue(data)
  return value
}

export const mainGainGetter = (data, dateRange) => {
  const firstDate = getFirstDate(dateRange)
  const gain = getMainGain(data, firstDate)
  return gain
}

export const mainDividendGetter = (data, dateRange) => {
  const firstDate = getFirstDate(dateRange)
  const dividend = getMainDividend(data, firstDate)
  return dividend
}

export const mainReturnsGetter = (data, dateRange) => {
  const firstDate = getFirstDate(dateRange)
  const { mainReturns } = getMainReturns(data, firstDate)
  return mainReturns
}

export const mainDoughnutChartDataGetter = data => {
  const doughnutData = getMainDoughnutData(data)
  return doughnutData
}

export const mainPlotChartDataGetter = (data, dateRange) => {
  const firstDate = getFirstDate(dateRange)
  // const plotChartData = getMainPlotChartData(data, firstDate)
  const { mainLabelsArray, mainValuesArray } = getMainPlotChartData(
    data,
    firstDate
  )
  const plotChartData = getPlotChartData(mainLabelsArray, mainValuesArray)
  return plotChartData
  // return plotChartData
}

export const mainTableDataGetter = (data, dateRange) => {
  const firstDate = getFirstDate(dateRange)
  const tableData = getMainTableData(data, firstDate)
  return tableData
}
