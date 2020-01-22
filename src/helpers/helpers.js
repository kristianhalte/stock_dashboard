import moment from 'moment'
import extend from 'extend'
import { backgroundColor, borderColor, borderWidth } from '@/data/styles.json'

/* -----=============================----- */
/* -----=====  GENERAL HELPERS  =====----- */
/* -----=============================----- */

// helper returning boolean value if key exists in an object
// const isKeyInObject = (key, object) => {
//   if (key in object) {
//     return true
//   } else {
//     return false
//   }
// }

// helper returning boolean value if ticker exists in an array
const isValueInArray = (value, array) => array.some(el => el === value)

/* -----===========================----- */
/* -----=====  DATES HELPERS  =====----- */
/* -----===========================----- */

// helper returning todays date
export const getTodaysDate = () => {
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = today.getFullYear()
  const todayString = yyyy + '-' + mm + '-' + dd
  return todayString
}

// helper returning days between two dates as an integer
export const getDaysBetween = (fromDate, toDate) => {
  const fromDateMoment = moment(fromDate)
  const toDateMoment = moment(toDate)
  return fromDateMoment.diff(toDateMoment, 'days')
}

/* -----============================----- */
/* -----=====  ORDERS HELPERS  =====----- */
/* -----============================----- */

// helper returning the date of the first order in an array of orders
export const getFirstOrderDateFromOrdersArray = ordersArray => {
  let firstOrderDate = getTodaysDate()
  ordersArray.forEach(orderObject => {
    if (orderObject.date < firstOrderDate) {
      firstOrderDate = orderObject.date
    }
  })
  return firstOrderDate
}

// helper returning the ticker of the first buy order in an array of orders
// const getFirstTickerFromOrdersArray = ordersArray => {
//   for (const order of ordersArray) {
//     if (order.type === 'buy') {
//       return order.ticker
//     }
//   }
// }

// helper returning an object of tickers from an array of orders
// const getTickersObjectFromOrdersArray = ordersObject => {
//   const tickersObjecty = {}
//   for (const order of ordersObject) {
//     if (!isKeyInObject(order.ticker, tickersObjecty)) {
//       tickersObjecty[order.ticker] = {}
//     }
//   }
//   return tickersObjecty
// }

// helper returning an array of tickers from an array of orders
export const getTickersArrayFromOrdersArray = ordersArray => {
  const tickersArray = []
  ordersArray.forEach(orderObject => {
    if (!isValueInArray(orderObject.ticker, tickersArray)) {
      tickersArray.push(orderObject.ticker)
    }
  })
  return tickersArray
}

// helper returning an array of tickers from an array of orders
// const getDoughnutsArrayFromOrdersArray = ordersArray => {
//   const doughnutsArray = []
//   for (const orderObject of ordersArray) {
//     if (!isValueInArray(orderObject.doughnut, doughnutsArray)) {
//       doughnutsArray.push(orderObject.doughnut)
//     }
//   }
//   return doughnutsArray
// }

/* -----===============================----- */
/* -----=====  PORTFOLIO HELPERS  =====----- */
/* -----===============================----- */

// helper returning quantity of stocks held at given date based on an array of orders
export const getTotalSpendByDateFromOrdersArray = (date, ordersArray) => {
  let totalSpend = 0
  ordersArray.forEach(orderObject => {
    if (orderObject.date <= date) {
      if (orderObject.type === 'buy') {
        totalSpend += orderObject.quantity * orderObject.price + orderObject.fee
      } else if (orderObject.type === 'sell') {
        totalSpend -= orderObject.quantity * orderObject.price - orderObject.fee
      }
    }
  })
  return totalSpend
}

// helper returning quantity of stocks held at given date based on an array of orders
export const getTotalDividendByDateFromOrdersArray = (date, ordersArray) => {
  let totalDividend = 0
  ordersArray.forEach(orderObject => {
    if (orderObject.date <= date) {
      if (orderObject.type === 'dividend') {
        totalDividend += orderObject.quantity * orderObject.price
      }
    }
  })
  return totalDividend
}

// helper returning quantity of stocks held at given date based on an array of orders
export const getTotalSpendByDateAndDoughnutLabelFromOrdersArray = (
  date,
  ordersArray,
  doughnutLabel
) => {
  let totalSpend = 0
  ordersArray.forEach(orderObject => {
    if (orderObject.date <= date && orderObject.doughnut === doughnutLabel) {
      if (orderObject.type === 'buy') {
        totalSpend += orderObject.quantity * orderObject.price + orderObject.fee
      } else if (orderObject.type === 'sell') {
        totalSpend -= orderObject.quantity * orderObject.price - orderObject.fee
      }
    }
  })
  return totalSpend
}

// helper returning quantity of stocks held at given date based on an array of orders
export const getQuantityOfStockByDateFromOrdersArray = (
  ticker,
  date,
  ordersArray
) => {
  let quantityOfStocks = 0
  ordersArray.forEach(orderObject => {
    if (orderObject.ticker === ticker && orderObject.date <= date) {
      if (orderObject.type === 'buy') {
        quantityOfStocks += orderObject.quantity
      } else if (orderObject.type === 'sell') {
        quantityOfStocks -= orderObject.quantity
      }
    }
  })
  return quantityOfStocks
}

// helper returning
const getQuantityOfStockByDateAndDoughnutFromOrdersArray = (
  doughnutName,
  ticker,
  date,
  ordersArray
) => {
  let quantityOfStocks = 0
  ordersArray.forEach(orderObject => {
    if (
      orderObject.ticker === ticker &&
      orderObject.doughnut === doughnutName &&
      orderObject.date <= date
    ) {
      if (orderObject.type === 'buy') {
        quantityOfStocks += orderObject.quantity
      } else if (orderObject.type === 'sell') {
        quantityOfStocks -= orderObject.quantity
      }
    }
  })
  return quantityOfStocks
}

// helper returning
const getHoldingsOfDoughnutObjectByDateFromOrdersArray = (
  doughnutName,
  date,
  ordersArray,
  tickersArray
) => {
  let holdings = {}
  tickersArray.forEach(ticker => {
    const holding = {
      [ticker]: {
        quantity: getQuantityOfStockByDateAndDoughnutFromOrdersArray(
          doughnutName,
          ticker,
          date,
          ordersArray
        ),
      },
    }
    holdings = extend(holdings, holding)
  })
  return holdings
}

// helper returning
const getLabelsArrayFromPortfolioDataArray = portfolioDataArray => {
  const labelsArray = []
  portfolioDataArray.forEach(dateObject => {
    labelsArray.unshift(dateObject.date)
  })
  return labelsArray
}

// helper returning
const getHoldingsObjectValue = holdingsObject => {
  let holdingValue = 0
  for (const [, value] of Object.entries(holdingsObject)) {
    holdingValue += value.close * value.quantity
  }
  return holdingValue
}

// helper returning
const mergeHoldingsObjects = (holdingsObject1, holdingsObject2) => {
  const holdingsObject = holdingsObject1
  for (const [key] of Object.entries(holdingsObject1)) {
    holdingsObject[key].quantity = holdingsObject2[key].quantity
  }
  return holdingsObject
}

// helper returning
const getDaysValueArrayFromPortfolioDataArray = portfolioDataArray => {
  const daysValueArray = []
  portfolioDataArray.forEach(dateObject => {
    daysValueArray.unshift(getHoldingsObjectValue(dateObject.holdings))
  })
  return daysValueArray
}

// helper returning
const getTodaysValue = portfolioDataArray => {
  const todaysValue = getHoldingsObjectValue(portfolioDataArray[0].holdings)
  return todaysValue
}

// helper returning
const getTodaysGain = portfolioDataArray => {
  let todaysGain = 0
  const todaysSpend = portfolioDataArray[0].spend
  const todaysValue = getTodaysValue(portfolioDataArray)
  todaysGain = todaysValue - todaysSpend
  return todaysGain
}

// helper returning
const getTodaysDividend = portfolioDataArray => {
  const todaysDividend = portfolioDataArray[0].dividend
  return todaysDividend
}

// helper returning
const getTodaysReturn = portfolioDataArray => {
  let todaysReturn = 0
  const todaysSpend = portfolioDataArray[0].spend
  const todaysValue = getTodaysValue(portfolioDataArray)
  const todaysGain = todaysValue - todaysSpend
  const todaysDividend = getTodaysDividend(portfolioDataArray)
  if (todaysSpend === 0) {
    return todaysReturn
  }
  todaysReturn = (todaysGain + todaysDividend) / todaysSpend
  return todaysReturn
}

// helper returning
const getSubPortfolioDataArray = (
  portfolioDataArray,
  doughnutId,
  doughnutLabel,
  ordersArray
) => {
  const subPortfolioDataArray = []
  portfolioDataArray.forEach(dateObject => {
    const dataObject = {
      date: dateObject.date,
      spend: getTotalSpendByDateAndDoughnutLabelFromOrdersArray(
        dateObject.date,
        ordersArray,
        doughnutLabel
      ),
      holdings: mergeHoldingsObjects(
        dateObject.holdings,
        dateObject.doughnutsDataArray[doughnutId].holdings
      ),
    }
    subPortfolioDataArray.push(dataObject)
  })
  return subPortfolioDataArray
}

/* -----===============================----- */
/* -----=====  DOUGHNUTS HELPERS  =====----- */
/* -----===============================----- */

// helper returning
export const getDoughnutsLabelsArrayFromDoughnutsArray = doughnutsArray => {
  const doughnutsLabelsArray = []
  doughnutsArray.forEach(doughnutObject => {
    doughnutsLabelsArray.push(doughnutObject.label)
  })
  return doughnutsLabelsArray
}

// helper returning
const getDoughnutsTargetsArrayFromDoughnutsArray = doughnutsArray => {
  const doughnutsTargetsArray = []
  doughnutsArray.forEach(doughnutObject => {
    doughnutsTargetsArray.push(doughnutObject.target)
  })
  return doughnutsTargetsArray
}

// helper returning
export const getDoughnutsDataArrayFromDoughnutsLabelsArray = (
  doughnutsLabelsArray,
  date,
  ordersArray,
  tickersArray
) => {
  const doughnutsDataArray = []
  doughnutsLabelsArray.forEach(doughnutLabel => {
    const dataObject = {
      label: doughnutLabel,
      holdings: getHoldingsOfDoughnutObjectByDateFromOrdersArray(
        doughnutLabel,
        date,
        ordersArray,
        tickersArray
      ),
    }
    doughnutsDataArray.push(dataObject)
  })
  return doughnutsDataArray
}

/* -----===========================----- */
/* -----=====  STORE HELPERS  =====----- */
/* -----===========================----- */

// helper returning
export const getMyPortfolioData = (
  portfolioDataArray,
  doughnutsArray,
  ordersArray
) => {
  const todaysValue = getTodaysValue(portfolioDataArray)
  const myPortfolioData = {
    todaysValue,
    todaysGain: getTodaysGain(portfolioDataArray),
    todaysDividend: getTodaysDividend(portfolioDataArray),
    todaysReturn: getTodaysReturn(portfolioDataArray),
    doughnutChartDataset: getDoughnutChartDataset(doughnutsArray),
    lineChartDataset: getPortfolioLineChartDataset(portfolioDataArray),
    tableData: getTableData(
      portfolioDataArray,
      doughnutsArray,
      ordersArray,
      todaysValue
    ),
  }
  return myPortfolioData
}

// helper returning
const getTableData = (
  portfolioDataArray,
  doughnutsArray,
  ordersArray,
  todaysValue
) => {
  const tableData = []
  doughnutsArray.forEach((doughnutObject, doughnutId) => {
    const doughnutLabel = doughnutObject.label
    const doughnutTarget = doughnutObject.target
    const subPortfolioDataArray = getSubPortfolioDataArray(
      portfolioDataArray,
      doughnutId,
      doughnutLabel,
      ordersArray
    )
    const todaysDoughnutValue = getTodaysValue(subPortfolioDataArray)
    const todaysActual = todaysDoughnutValue / todaysValue
    const dataObject = {
      id: doughnutId,
      label: doughnutLabel,
      todaysValue: todaysDoughnutValue,
      todaysGain: getTodaysGain(subPortfolioDataArray),
      todaysReturn: getTodaysReturn(subPortfolioDataArray),
      todaysActual: todaysActual,
      target: doughnutTarget,
    }
    tableData.push(dataObject)
  })
  return tableData
}

// helper returning
// export const getMyDoughnutsData = (
//   portfolioDataArray,
//   doughnutsArray,
//   ordersArray
// ) => {
//   const doughnutsData = []
//   doughnutsArray.forEach((doughnutObject, doughnutId) => {
//     const doughnutLabel = doughnutObject.label
//     const subPortfolioDataArray = getSubPortfolioDataArray(
//       portfolioDataArray,
//       doughnutId,
//       doughnutLabel,
//       ordersArray
//     )
//     const dataObject = {
//       label: doughnutLabel,
//       todaysValue: getTodaysValue(subPortfolioDataArray),
//       todaysGain: getTodaysGain(subPortfolioDataArray),
//       todaysReturn: getTodaysReturn(subPortfolioDataArray),
//       doughnutChartDataset: getDoughnutChartDataset(
//         doughnutsArray[doughnutId].subDoughnutsArray
//       ),
//       lineChartDataset: getPortfolioLineChartDataset(subPortfolioDataArray),
//     }
//     doughnutsData.push(dataObject)
//   })
//   return doughnutsData
// }

// helper returning
export const getMyDoughnutData = (
  portfolioDataArray,
  doughnutsArray,
  doughnutId,
  ordersArray
) => {
  const doughnutLabel = doughnutsArray[doughnutId].label
  const subPortfolioDataArray = getSubPortfolioDataArray(
    portfolioDataArray,
    doughnutId,
    doughnutLabel,
    ordersArray
  )
  const myDoughnutData = {
    label: doughnutLabel,
    todaysValue: getTodaysValue(subPortfolioDataArray),
    todaysGain: getTodaysGain(subPortfolioDataArray),
    todaysReturn: getTodaysReturn(subPortfolioDataArray),
    doughnutChartDataset: getDoughnutChartDataset(
      doughnutsArray[doughnutId].subDoughnutsArray
    ),
    lineChartDataset: getPortfolioLineChartDataset(subPortfolioDataArray),
  }
  return myDoughnutData
}

/* -----===========================----- */
/* -----=====  CHART HELPERS  =====----- */
/* -----===========================----- */

// helper returning
const getPortfolioLineChartDataset = portfolioDataArray => {
  const chartData = {
    labels: getLabelsArrayFromPortfolioDataArray(portfolioDataArray),
    datasets: [
      {
        label: 'Value',
        data: getDaysValueArrayFromPortfolioDataArray(portfolioDataArray),
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        borderColor: borderColor[5],
        borderWidth: 3,
      },
    ],
  }
  return chartData
}

// helper returning
const getDoughnutChartDataset = doughnutsArray => {
  const chartData = {
    labels: getDoughnutsLabelsArrayFromDoughnutsArray(doughnutsArray),
    datasets: [
      {
        data: getDoughnutsTargetsArrayFromDoughnutsArray(doughnutsArray),
        backgroundColor,
        borderColor,
        borderWidth,
      },
    ],
  }
  return chartData
}
