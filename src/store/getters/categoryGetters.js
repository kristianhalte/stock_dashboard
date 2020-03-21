import { getFirstDate, getPlotChartData } from '@/helpers/utils'

import {
  getCategoryValue,
  getCategoryGain,
  getCategoryDividend,
  getCategoryReturns,
  getCategoryDoughnutData,
  getCategoryPlotChartData,
  getCategoryTableData,
} from '@/helpers/category'

export const categoryLabelGetter = data => {
  const label = data.label
  return label
}

export const categoryValueGetter = data => {
  const value = getCategoryValue(data)
  return value
}

export const categoryGainGetter = (data, dateRange) => {
  const firstDate = getFirstDate(dateRange)
  const gain = getCategoryGain(data, firstDate)
  return gain
}

export const categoryDividendGetter = (data, dateRange) => {
  const firstDate = getFirstDate(dateRange)
  const dividend = getCategoryDividend(data, firstDate)
  return dividend
}

export const categoryReturnsGetter = (data, dateRange) => {
  const firstDate = getFirstDate(dateRange)
  const { categoryReturns } = getCategoryReturns(data, firstDate)
  return categoryReturns
}

export const categoryDoughnutChartDataGetter = data => {
  const doughnutData = getCategoryDoughnutData(data)
  return doughnutData
}

export const categoryPlotChartDataGetter = (data, dateRange) => {
  const firstDate = getFirstDate(dateRange)
  const { categoryLabelsArray, categoryValuesArray } = getCategoryPlotChartData(
    data,
    firstDate
  )
  const plotChartData = getPlotChartData(
    categoryLabelsArray,
    categoryValuesArray
  )
  return plotChartData
}

export const categoryTableDataGetter = (data, dateRange) => {
  const firstDate = getFirstDate(dateRange)
  const tableData = getCategoryTableData(data, firstDate)
  return tableData
}
