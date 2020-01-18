import alphavantage from 'alphavantage'
import Bottleneck from 'bottleneck'
const apiKey = process.env.VUE_APP_ALPHA_VANTAGE_API_KEY

const limiter = new Bottleneck({
  reservoir: 5,
  reservoirRefreshAmount: 5,
  reservoirRefreshInterval: 60 * 1000,
  maxConcurrent: 1,
  minTime: 333,
})

const alpha = alphavantage({ key: apiKey })

export const getTimeSeriesData = async (ticker, today, endDate) => {
  try {
    return limiter
      .schedule(() => alpha.data.daily('nflx', `compact`))
      .then(data => {
        const timeSeries = data['Time Series (Daily)']
        // const response = {}
        // Object.entries(timeSeries).forEach(([key, value]) => {
        //   if (key > endDate) {
        //     response[key] = value
        //   }
        // })
        // return response
        return timeSeries
      })
  } catch (err) {
    console.log(err)
  }
}
