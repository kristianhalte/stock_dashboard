import alphavantage from 'alphavantage'
import Bottleneck from 'bottleneck'
import extend from 'extend'
import { doughnutsArray } from '@/data/doughnuts.json'
import {
  getDaysBetween,
  getTodaysDate,
  getFirstOrderDateFromOrdersArray,
  getTickersArrayFromOrdersArray,
  getTotalSpendByDateFromOrdersArray,
  getQuantityOfStockByDateFromOrdersArray,
  getDoughnutsDataArrayFromDoughnutsLabelsArray,
  getDoughnutsLabelsArrayFromDoughnutsArray,
} from '@/helpers/helpers'
const apiKey = process.env.VUE_APP_ALPHA_VANTAGE_API_KEY

const limiter = new Bottleneck({
  reservoir: 5,
  reservoirRefreshAmount: 5,
  reservoirRefreshInterval: 60 * 1000,
  maxConcurrent: 1,
  minTime: 333,
})

const alpha = alphavantage({ key: apiKey })

const getArrayOfTimeSeriesFromOrdersArray = async ordersArray => {
  const today = getTodaysDate()
  const endDate = getFirstOrderDateFromOrdersArray(ordersArray)
  const tickersArray = getTickersArrayFromOrdersArray(ordersArray)
  const doughnutsLabelsArray = getDoughnutsLabelsArrayFromDoughnutsArray(
    doughnutsArray
  )
  let outputsize = 'compact'
  if (getDaysBetween(today, endDate) > 100) {
    outputsize = 'full'
  }
  try {
    return limiter.schedule(() => {
      const allTimeSeries = tickersArray.map(ticker =>
        alpha.data.daily(ticker, outputsize).then(data => {
          const timeSeriesObject = data['Time Series (Daily)']
          const timeSeriesDataArrayForTicker = []
          for (const [date, value] of Object.entries(timeSeriesObject)) {
            if (date >= endDate) {
              const obj = {
                date: date,
                spend: getTotalSpendByDateFromOrdersArray(date, ordersArray),
                holdings: {
                  [ticker]: {
                    close: value['4. close'],
                    quantity: getQuantityOfStockByDateFromOrdersArray(
                      ticker,
                      date,
                      ordersArray
                    ),
                  },
                },
                doughnutsDataArray: getDoughnutsDataArrayFromDoughnutsLabelsArray(
                  doughnutsLabelsArray,
                  date,
                  ordersArray,
                  tickersArray
                ),
              }
              timeSeriesDataArrayForTicker.push(obj)
            }
          }
          return timeSeriesDataArrayForTicker
        })
      )
      return Promise.all(allTimeSeries)
    })
  } catch (err) {
    console.log(err)
  }
}

export const getPortfolioDataArrayFromOrdersArray = async ordersArray => {
  const arrayOfTimeSeriesFromOrdersArray = await getArrayOfTimeSeriesFromOrdersArray(
    ordersArray
  )
  const portfolioDataArray = arrayOfTimeSeriesFromOrdersArray[0]
  arrayOfTimeSeriesFromOrdersArray.forEach(arrayOfTimeSeries => {
    portfolioDataArray.forEach((dataObject, index) => {
      portfolioDataArray[index].holdings = extend(
        dataObject.holdings,
        arrayOfTimeSeries[index].holdings
      )
    })
  })
  return portfolioDataArray
}
