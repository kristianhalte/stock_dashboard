import alphavantage from 'alphavantage'
// import { RateLimiter } from 'limiter'
import Bottleneck from 'bottleneck'
const apiKey = process.env.VUE_APP_ALPHA_VANTAGE_API_KEY

const limiter = new Bottleneck({
  reservoir: 5, // initial value
  reservoirRefreshAmount: 5,
  reservoirRefreshInterval: 60 * 1000, // must be divisible by 250

  // also use maxConcurrent and/or minTime for safety
  maxConcurrent: 1,
  minTime: 333, // pick a value that makes sense for your use case
})

const alpha = alphavantage({ key: apiKey })
// const delay = ms => new Promise(res => setTimeout(res, ms))
// const limiter = new RateLimiter(5, 'minute')

export const getData = async (ticker, today, endDate) => {
  // await delay(12000)
  try {
    return limiter
      .schedule(() => alpha.data.daily(ticker, `compact`))
      .then(data => {
        const timeSeries = data['Time Series (Daily)']
        const response = {}
        Object.entries(timeSeries).forEach(([key, value]) => {
          if (key > endDate) {
            response[key] = value
          }
        })
        return response
      })
    // return alpha.data.daily(ticker, `compact`).then(data => {
    //   const timeSeries = data['Time Series (Daily)']
    //   const response = {}
    //   Object.entries(timeSeries).forEach(([key, value]) => {
    //     if (key > endDate) {
    //       response[key] = value
    //     }
    //   })
    //   return response
    // })
  } catch (err) {
    console.log(err)
  }
}

// const callAPI = async (ticker, today, endDate) => {
//   // await delay(12000)
//   try {
//     return alpha.data.daily(ticker, `compact`).then(data => {
//       const timeSeries = data['Time Series (Daily)']
//       const response = {}
//       Object.entries(timeSeries).forEach(([key, value]) => {
//         if (key > endDate) {
//           response[key] = value
//         }
//       })
//       return response
//     })
//   } catch (err) {
//     console.log(err)
//   }
// }

// export const getData = () => {
//   limiter.removeTokens(1, function() {
//     callAPI()
//   })
// }
