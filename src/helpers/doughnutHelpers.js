import {
  getFirstOrderDateFromOrdersArray,
  getTotalSpendByDateAndDoughnutLabelFromOrdersArray,
  getTotalDividendByDateAndDoughnutLabelFromOrdersArray,
  getTickersArrayFromOrdersArray,
  getQuantityOfStockByDateAndDoughnutLabelFromOrdersArray,
} from '@/helpers/helpers'

const getDatesArrayFromTimeSeriesArrayAndFirstOrderDate = (
  timeSeriesArray,
  firstOrderDate
) => {
  const datesArray = []
  for (const [date] of Object.entries(timeSeriesArray[0].timeSeriesObject)) {
    if (date >= firstOrderDate) {
      datesArray.push(date)
    }
  }
  return datesArray
}

const getCloseOfStockByDateFromTimeSeriesArray = (
  ticker,
  date,
  timeSeriesArray
) => {
  const tickerObject = timeSeriesArray.find(o => o.ticker === ticker)
  const close = tickerObject.timeSeriesObject[date]['4. close']
  return close
}

const getHoldingsByDateAndDoughnutLabelFromTimeSeriesArrayAndOrdersArray = (
  date,
  doughnutLabel,
  timeSeriesArray,
  ordersArray
) => {
  const holdingsObject = {}
  const tickersArray = getTickersArrayFromOrdersArray(ordersArray)
  tickersArray.forEach(ticker => {
    const obj = {
      close: getCloseOfStockByDateFromTimeSeriesArray(
        ticker,
        date,
        timeSeriesArray
      ),
      quantity: getQuantityOfStockByDateAndDoughnutLabelFromOrdersArray(
        doughnutLabel,
        ticker,
        date,
        ordersArray
      ),
    }
    holdingsObject[ticker] = obj
  })
  return holdingsObject
}

export const getDoughnutData = (
  timeSeriesArray,
  ordersArray,
  doughnutLabel
) => {
  const dataArray = []
  const data = {}
  const firstOrderDate = getFirstOrderDateFromOrdersArray(ordersArray)
  const datesArray = getDatesArrayFromTimeSeriesArrayAndFirstOrderDate(
    timeSeriesArray,
    firstOrderDate
  )
  datesArray.forEach(date => {
    const dateObject = {
      date,
      spend: getTotalSpendByDateAndDoughnutLabelFromOrdersArray(
        date,
        doughnutLabel,
        ordersArray
      ),
      dividend: getTotalDividendByDateAndDoughnutLabelFromOrdersArray(
        date,
        doughnutLabel,
        ordersArray
      ),
      holdings: getHoldingsByDateAndDoughnutLabelFromTimeSeriesArrayAndOrdersArray(
        date,
        doughnutLabel,
        timeSeriesArray,
        ordersArray
      ),
    }
    dataArray.push(dateObject)
    // const dateObject = {
    //   spend: getTotalSpendByDateAndDoughnutLabelFromOrdersArray(
    //     date,
    //     doughnutLabel,
    //     ordersArray
    //   ),
    //   dividend: getTotalDividendByDateAndDoughnutLabelFromOrdersArray(
    //     date,
    //     doughnutLabel,
    //     ordersArray
    //   ),
    //   holdings: getHoldingsByDateAndDoughnutLabelFromTimeSeriesArrayAndOrdersArray(
    //     date,
    //     doughnutLabel,
    //     timeSeriesArray,
    //     ordersArray
    //   ),
    // }
    // data[date] = dateObject
  })
  return dataArray
}
