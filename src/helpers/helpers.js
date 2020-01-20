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
  for (const order of ordersArray) {
    if (order.date < firstOrderDate) {
      firstOrderDate = order.date
    }
  }
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
  for (const orderObject of ordersArray) {
    if (!isValueInArray(orderObject.ticker, tickersArray)) {
      tickersArray.push(orderObject.ticker)
    }
  }
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
  let totalSpend = 8
  ordersArray.forEach(orderObject => {
    if (orderObject.date <= date) {
      if (orderObject.type === 'buy') {
        totalSpend += orderObject.quantity * orderObject.price
      } else if (orderObject.type === 'sell') {
        totalSpend -= orderObject.quantity * orderObject.price
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
const getDaysValueFromPortfolioDataArray = portfolioDataArray => {
  const daysValue = []
  portfolioDataArray.forEach(dateObject => {
    daysValue.unshift(getHoldingsObjectValue(dateObject.holdings))
  })
  return daysValue
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
  const todaysValue = getHoldingsObjectValue(portfolioDataArray[0].holdings)
  todaysGain = todaysValue - todaysSpend
  return todaysGain
}

// helper returning
const getTodaysReturn = portfolioDataArray => {
  let todaysReturn = 8.24
  const todaysSpend = portfolioDataArray[0].spend
  const todaysValue = getHoldingsObjectValue(portfolioDataArray[0].holdings)
  const todaysGain = todaysValue - todaysSpend
  todaysReturn = (todaysGain / todaysSpend) * 100
  return todaysReturn
}

// helper returning
const getSubPortfolioDataArray = (portfolioDataArray, id) => {
  const subPortfolioDataArray = []
  let counter = 0
  portfolioDataArray.forEach(dateObject => {
    const obj = {
      counter: counter,
      date: dateObject.date,
      spend: 2000,
      holdings: mergeHoldingsObjects(
        dateObject.holdings,
        dateObject.doughnutsDataArray[id].holdings
      ),
    }
    subPortfolioDataArray.push(obj)
    counter += 1
  })
  return subPortfolioDataArray
}

/* -----===============================----- */
/* -----=====  DOUGHNUTS HELPERS  =====----- */
/* -----===============================----- */

// helper returning
const getLabelsArrayFromDoughnutsArray = doughnutsArray => {
  const labelsArray = []
  doughnutsArray.forEach(dateObject => {
    labelsArray.push(dateObject.name)
  })
  return labelsArray
}

// helper returning
export const getDoughnutsLabelsArrayFromDoughnutsArray = doughnutsArray => {
  const doughnutsLabelsArray = []
  doughnutsArray.forEach(dateObject => {
    doughnutsLabelsArray.push(dateObject.name)
  })
  return doughnutsLabelsArray
}

// helper returning
const getOptimalVolumeArrayFromDoughnutsArray = doughnutsArray => {
  const optimalVolumeArray = []
  doughnutsArray.forEach(dateObject => {
    optimalVolumeArray.push(dateObject.optimalVolume)
  })
  return optimalVolumeArray
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
    const obj = {
      name: doughnutLabel,
      holdings: getHoldingsOfDoughnutObjectByDateFromOrdersArray(
        doughnutLabel,
        date,
        ordersArray,
        tickersArray
      ),
    }
    doughnutsDataArray.push(obj)
  })
  return doughnutsDataArray
}

/* -----===========================----- */
/* -----=====  STORE HELPERS  =====----- */
/* -----===========================----- */

// helper returning
export const getMyPortfolioData = (portfolioDataArray, doughnutsArray) => {
  const myPortfolioData = {
    todaysValue: getTodaysValue(portfolioDataArray),
    todaysGain: getTodaysGain(portfolioDataArray),
    todaysReturn: getTodaysReturn(portfolioDataArray),
    doughnutChartDataset: getDoughnutChartDataset(doughnutsArray),
    lineChartDataset: getPortfolioLineChartDataset(portfolioDataArray),
  }
  return myPortfolioData
}

// helper returning
export const getMyDoughnutsData = (portfolioDataArray, doughnutsArray) => {
  const labelsArray = getLabelsArrayFromDoughnutsArray(doughnutsArray)
  const doughnutsData = []
  labelsArray.forEach((label, index) => {
    const obj = {
      label: label,
      todaysValue: getTodaysValue(
        getSubPortfolioDataArray(portfolioDataArray, index)
      ),
      todaysGain: getTodaysGain(
        getSubPortfolioDataArray(portfolioDataArray, index)
      ),
      todaysReturn: getTodaysReturn(
        getSubPortfolioDataArray(portfolioDataArray, index)
      ),
      doughnutChartDataset: getDoughnutChartDataset(
        doughnutsArray[index].subDoughnutsArray
      ),
      lineChartDataset: getPortfolioLineChartDataset(
        getSubPortfolioDataArray(portfolioDataArray, index)
      ),
    }
    doughnutsData.push(obj)
  })
  return doughnutsData
}

// helper returning
export const getMyDoughnutData = (
  portfolioDataArray,
  doughnutsArray,
  labelId
) => {
  const labelsArray = getLabelsArrayFromDoughnutsArray(doughnutsArray)
  const doughnutData = {
    label: labelsArray[labelId],
    todaysValue: getTodaysValue(
      getSubPortfolioDataArray(portfolioDataArray, labelId)
    ),
    todaysGain: getTodaysGain(
      getSubPortfolioDataArray(portfolioDataArray, labelId)
    ),
    todaysReturn: getTodaysReturn(
      getSubPortfolioDataArray(portfolioDataArray, labelId)
    ),
    doughnutChartDataset: getDoughnutChartDataset(
      doughnutsArray[labelId].subDoughnutsArray
    ),
    lineChartDataset: getPortfolioLineChartDataset(
      getSubPortfolioDataArray(portfolioDataArray, labelId)
    ),
  }
  return doughnutData
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
        data: getDaysValueFromPortfolioDataArray(portfolioDataArray),
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        borderColor: borderColor[0],
        borderWidth: 3,
      },
    ],
  }
  return chartData
}

// helper returning
const getDoughnutChartDataset = doughnutsArray => {
  const chartData = {
    labels: getLabelsArrayFromDoughnutsArray(doughnutsArray),
    datasets: [
      {
        data: getOptimalVolumeArrayFromDoughnutsArray(doughnutsArray),
        backgroundColor,
        borderColor,
        borderWidth,
      },
    ],
  }
  return chartData
}
