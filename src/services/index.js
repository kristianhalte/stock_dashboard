import alphavantage from 'alphavantage'
import Bottleneck from 'bottleneck'
import {
  getDaysBetween,
  getTodaysDate,
  getFirstOrderDateFromOrdersArray,
  getTickersArrayFromOrdersArray,
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

export const getTimeSeriesArrayFromOrdersArray = async ordersArray => {
  const todayDate = getTodaysDate()
  const firstOrderDate = getFirstOrderDateFromOrdersArray(ordersArray)
  const tickersArray = getTickersArrayFromOrdersArray(ordersArray)
  let outputsize = 'compact'
  if (getDaysBetween(todayDate, firstOrderDate) > 100) {
    outputsize = 'full'
  }
  try {
    return limiter.schedule(() => {
      const allTimeSeries = tickersArray.map(ticker =>
        alpha.data.daily(ticker, outputsize).then(data => {
          const timeSeriesObject = data['Time Series (Daily)']
          const timeSeriesObjectForTicker = {
            ticker,
            timeSeriesObject,
          }
          return timeSeriesObjectForTicker
        })
      )
      return Promise.all(allTimeSeries)
    })
  } catch (err) {
    console.log(err)
  }
}
