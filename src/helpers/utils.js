import moment from 'moment'

const momentFormat = 'YYYY-MM-DD'
const firstTradeDate = '2020-01-03'

moment.defaultFormat = momentFormat

export const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

export const getFirstTradeDate = ordersArray => {
  let firstOrderDate = moment().format()
  ordersArray.forEach(orderObject => {
    if (orderObject.date < firstOrderDate) {
      firstOrderDate = orderObject.date
    }
  })
  return firstOrderDate
}

export const getLastElementInArray = array => array[array.length - 1]

export const isValueInArray = (value, array) => array.some(el => el === value)

// TODO: rename all Array to arr
// TODO: rename all Object to obj
export const weightedMean = (valuesArray, weightsArray) => {
  const result = valuesArray
    .map((value, i) => {
      const weight = weightsArray[i]
      const sum = value * weight
      return [sum, weight]
    })
    .reduce((p, c) => [p[0] + c[0], p[1] + c[1]], [0, 0])

  return result[0] / result[1]
}

export const sumOfArray = valueArray => {
  let sum = 0
  valueArray.forEach(value => {
    sum += value
  })
  return sum
}

export const getPlotChartData = (labelsArray, valuesArray) => {
  const plotChartData = []
  labelsArray.forEach((label, index) => {
    const plotObject = {
      label: label,
      value: valuesArray[index],
    }
    plotChartData.push(plotObject)
  })
  return plotChartData
}

export const getFirstDate = dateRange => {
  let firstDate = null
  if (dateRange === 'a') {
    firstDate = moment(firstTradeDate, momentFormat).format() //TODO: change to getFirstTradeDate, maybe from Store
  } else if (dateRange === 'y') {
    firstDate = moment()
      .subtract(1, 'year')
      .add(1, 'day')
      .format()
  } else if (dateRange === 'q') {
    firstDate = moment()
      .subtract(3, 'months')
      .add(1, 'day')
      .format()
  } else if (dateRange === 'm') {
    firstDate = moment()
      .subtract(1, 'month')
      .add(1, 'day')
      .format()
  } else if (dateRange === 'w') {
    firstDate = moment()
      .subtract(1, 'week')
      .add(1, 'day')
      .format()
  } else if (dateRange === 'd') {
    firstDate = moment()
      .subtract(1, 'day')
      .add(1, 'day')
      .format()
  }
  if (firstTradeDate > firstDate) {
    return firstTradeDate
  }
  return firstDate
}

export const splitTimeSeriesData = (timeSeriesData, firstDate) => {
  const pastDateArray = []
  const currentDateArray = []
  timeSeriesData.forEach(dateObject => {
    if (dateObject.date < firstDate) {
      pastDateArray.push(dateObject)
    } else {
      currentDateArray.push(dateObject)
    }
  })
  return { pastDateArray, currentDateArray }
}
