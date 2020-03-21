import alphavantage from 'alphavantage'
import Bottleneck from 'bottleneck'

import { ordersArray } from '@/data/orders.json' //TODO: inject from higher level
import { targetPortfoliosArray } from '@/data/targets.json' //TODO: inject from higher level
import {
  getDaysSince,
  firstNewTradeDate,
  getNewTickersArray,
  getNewNewData,
} from '@/helpers/service'
const apiKey = process.env.VUE_APP_ALPHA_VANTAGE_API_KEY

const limiter = new Bottleneck({
  reservoir: 4,
  reservoirRefreshAmount: 4,
  reservoirRefreshInterval: 65 * 1000,
  maxConcurrent: 1,
  minTime: 15000,
})

const firsTradeDate = firstNewTradeDate(ordersArray)
const daysSince = getDaysSince(firsTradeDate)
const tickersArray = getNewTickersArray(targetPortfoliosArray)
let outputsize = 'compact'
if (daysSince > 100) {
  outputsize = 'full'
}

const alpha = alphavantage({ key: apiKey })

const getNewAlphaData = async ticker => {
  const result = await alpha.data.daily(ticker, outputsize).then(data => {
    console.log('data: ', data)
    const timeSeriesObject = data['Time Series (Daily)']
    const tickerObject = {
      ticker,
      timeSeriesObject,
    }
    console.log('tickerObject: ', tickerObject)
    return tickerObject
  })
  console.log('result: ', result)
  return result
}

const throttledGetNewAlphaData = limiter.wrap(getNewAlphaData)

const getAllNewAlphaData = async () => {
  const allThePromises = tickersArray.map(ticker =>
    throttledGetNewAlphaData(ticker)
  )
  try {
    const allTimeSeries = await Promise.all(allThePromises)
    console.log('allTimeSeries: ', allTimeSeries)
    return allTimeSeries
  } catch (err) {
    console.log(err)
  }
}

export const getNewData = async () => {
  const alphaData = await getAllNewAlphaData()
  console.log('alphaData: ', alphaData)
  const data = getNewNewData(alphaData, ordersArray, targetPortfoliosArray)
  return data
}

// export const getAlphaData = async () => {
//   // const firsTradeDate = firstNewTradeDate(ordersArray)
//   // const daysSince = getDaysSince(firsTradeDate)
//   // const tickersArray = getNewTickersArray(ordersArray)
//   // let outputsize = 'compact'
//   // if (daysSince > 100) {
//   //   outputsize = 'full'
//   // }
//   try {
//     return limiter.schedule(() => {
//       const allTimeSeries = tickersArray.map(ticker =>
//         alpha.data.daily(ticker, outputsize).then(data => {
//           console.log(data)
//           const timeSeriesObject = data['Time Series (Daily)']
//           const tickerObject = {
//             ticker,
//             timeSeriesObject,
//           }
//           return tickerObject
//         })
//       )
//       return Promise.all(allTimeSeries)
//     })
//   } catch (err) {
//     console.log(err)
//   }
// }

// OLD
// import moment from 'moment'

// import { timeout, firstTradeDate, momentFormat } from '@/helpers'

// moment.defaultFormat = momentFormat

// const getPriceChange = (i, price, priceChangeRoll) => {
//   if (i === 0) {
//     return 0
//   } else {
//     if (priceChangeRoll < 0.1) {
//       return (price * Math.random()) / 40
//     } else if (priceChangeRoll < 0.3) {
//       return (price * Math.random()) / 80
//     } else if (priceChangeRoll < 0.6) {
//       return (price * Math.random()) / 160
//     } else if (priceChangeRoll < 0.8) {
//       return (price * Math.random() * -1) / 80
//     } else {
//       return (price * Math.random() * -1) / 160
//     }
//   }
// }

// const getQtyChange = (i, qty, qtyChangeRoll) => {
//   if (i === 0) {
//     return 0
//   } else {
//     if (qtyChangeRoll < 0.2) {
//       return (qty * Math.random()) / 4
//     } else if (qtyChangeRoll < 0.4) {
//       return (qty * Math.random()) / 8
//     } else if (qtyChangeRoll < 0.8) {
//       return (qty * Math.random()) / 16
//     } else if (qtyChangeRoll < 0.9) {
//       return (qty * Math.random() * -1) / 8
//     } else {
//       return (qty * Math.random() * -1) / 16
//     }
//   }
// }

// const getDividend = (i, price, qty, dividendChangeRoll) => {
//   if (i === 0) {
//     return 0
//   } else {
//     if (dividendChangeRoll < 0.001) {
//       return (qty * (price * Math.random())) / 4
//     } else if (dividendChangeRoll < 0.005) {
//       return (qty * (price * Math.random())) / 8
//     } else if (dividendChangeRoll < 0.01) {
//       return (qty * (price * Math.random())) / 16
//     } else {
//       return 0
//     }
//   }
// }

// const getDateArray = (startPrice, startQty) => {
//   const dateArray = []
//   const days = moment().diff(firstTradeDate, 'days') + 1
//   let price = startPrice
//   let qty = startQty
//   let spend = startPrice * startQty
//   for (var i = 0; i < days; i++) {
//     const priceChangeRoll = Math.random()
//     const qtyChanngeRoll = Math.random()
//     const dividendChangeRoll = Math.random()
//     const priceChange = getPriceChange(i, price, priceChangeRoll)
//     const qtyChange = getQtyChange(i, qty, qtyChanngeRoll)
//     const date = moment(firstTradeDate)
//       .add(i, 'days')
//       .format()
//     price = Math.round((price + priceChange) * 100) / 100
//     qty = Math.round(qty + qtyChange)
//     spend = spend + Math.round(qtyChange) * price
//     const dataObject = {
//       date: date,
//       spend: spend,
//       dividend: getDividend(i, price, qty, dividendChangeRoll),
//       qty: qty,
//       price: price,
//     }
//     dateArray.push(dataObject)
//   }
//   return dateArray
// }

// export const getData = async () => {
//   const data = {
//     label: 'My Portfolios',
//     portfolios: [
//       {
//         label: 'Index Funds',
//         categories: [
//           {
//             label: 'American',
//             holdings: [
//               {
//                 label: 'spdr',
//                 dateArray: getDateArray(238.93, 5),
//               },
//               {
//                 label: 'voo',
//                 dateArray: getDateArray(219.73, 37),
//               },
//             ],
//           },
//           {
//             label: 'European',
//             holdings: [
//               {
//                 label: 'dax',
//                 dateArray: getDateArray(219.73, 37),
//               },
//               {
//                 label: 'omxc20',
//                 dateArray: getDateArray(219.73, 37),
//               },
//             ],
//           },
//         ],
//       },
//       {
//         label: 'Bonds',
//         categories: [
//           {
//             label: 'European',
//             holdings: [
//               {
//                 label: 'aaa',
//                 dateArray: getDateArray(219.73, 37),
//               },
//               {
//                 label: 'bbb',
//                 dateArray: getDateArray(219.73, 37),
//               },
//             ],
//           },
//           {
//             label: 'Japanese',
//             holdings: [
//               {
//                 label: 'ccc',
//                 dateArray: getDateArray(219.73, 37),
//               },
//               {
//                 label: 'ddd',
//                 dateArray: getDateArray(219.73, 37),
//               },
//             ],
//           },
//         ],
//       },
//       {
//         label: 'Dividend',
//         categories: [
//           {
//             label: 'Consumer',
//             holdings: [
//               {
//                 label: 'cost',
//                 dateArray: getDateArray(219.73, 37),
//               },
//               {
//                 label: 'ko',
//                 dateArray: getDateArray(219.73, 37),
//               },
//             ],
//           },
//           {
//             label: 'Industrial',
//             holdings: [
//               {
//                 label: 'ge',
//                 dateArray: getDateArray(219.73, 37),
//               },
//               {
//                 label: 'ba',
//                 dateArray: getDateArray(219.73, 37),
//               },
//             ],
//           },
//         ],
//       },
//       {
//         label: 'High Risk',
//         categories: [
//           {
//             label: 'Technology',
//             holdings: [
//               {
//                 label: 'aapl',
//                 dateArray: getDateArray(219.73, 37),
//               },
//               {
//                 label: 'nflx',
//                 dateArray: getDateArray(219.73, 37),
//               },
//             ],
//           },
//           {
//             label: 'Medicine',
//             holdings: [
//               {
//                 label: 'pfe',
//                 dateArray: getDateArray(219.73, 37),
//               },
//               {
//                 label: 'jnj',
//                 dateArray: getDateArray(219.73, 37),
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   }
//   await timeout(500)
//   return data
// }
