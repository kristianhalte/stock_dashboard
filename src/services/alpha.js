import alphavantage from 'alphavantage'
import Bottleneck from 'bottleneck'
import { getDaysBetween } from '@/helpers/helpers'
const apiKey = process.env.VUE_APP_ALPHA_VANTAGE_API_KEY

const limiter = new Bottleneck({
  reservoir: 5,
  reservoirRefreshAmount: 5,
  reservoirRefreshInterval: 60 * 1000,
  maxConcurrent: 1,
  minTime: 333,
})

const alpha = alphavantage({ key: apiKey })

export const getTimeSeriesDataForTicker = async (ticker, today, endDate) => {
  let outputsize = 'compact'
  if (getDaysBetween(today, endDate) > 100) {
    outputsize = 'full'
  }
  try {
    return limiter
      .schedule(() => alpha.data.daily(ticker, outputsize))
      .then(data => {
        const timeSeries = data['Time Series (Daily)']
        const response = {}
        Object.entries(timeSeries).forEach(([key, value]) => {
          if (key > endDate) {
            response[key] = { close: value['4. close'] }
            // response[key] = value
          }
        })
        return response
      })
  } catch (err) {
    console.log(err)
  }
}

export const getTimeSeriesDataForTickersObject = async (
  tickersObject,
  today,
  endDate
) => {
  const timeSeriesDataForTickersObject = {}
  for (const [ticker] of Object.entries(tickersObject)) {
    timeSeriesDataForTickersObject[ticker] = await getTimeSeriesDataForTicker(
      ticker,
      today,
      endDate
    )
  }
  return timeSeriesDataForTickersObject
}
