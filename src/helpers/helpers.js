import moment from 'moment'
import { backgroundColor, borderColor, borderWidth } from '@/data/styles.json'

/* -----=============================----- */
/* -----=====  GENERAL HELPERS  =====----- */
/* -----=============================----- */

// helper returning boolean value if key exists in an object
export const isKeyInObject = (key, object) => {
  if (key in object) {
    return true
  } else {
    return false
  }
}

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
export const getFirstTickerFromOrdersArray = ordersArray => {
  for (const order of ordersArray) {
    if (order.type === 'buy') {
      return order.ticker
    }
  }
}

// helper returning an object of tickers from an array of orders
export const getTickersObjectFromOrdersArray = ordersObject => {
  const tickersObjectFromOrdersArray = {}
  for (const order of ordersObject) {
    if (!isKeyInObject(order.ticker, tickersObjectFromOrdersArray)) {
      tickersObjectFromOrdersArray[order.ticker] = {}
    }
  }
  return tickersObjectFromOrdersArray
}

// helper returning boolean value if ticker exists in an array
export const isValueInArray = (value, array) => array.some(el => el === value)

// helper returning an array of tickers from an array of orders
export const getTickersArrayFromOrdersArray = ordersArray => {
  const tickersArrayFromOrdersArray = []
  for (const orderObject of ordersArray) {
    if (!isValueInArray(orderObject.ticker, tickersArrayFromOrdersArray)) {
      tickersArrayFromOrdersArray.push(orderObject.ticker)
    }
  }
  return tickersArrayFromOrdersArray
}

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
  let quantity = 0
  ordersArray.forEach(orderObject => {
    if (orderObject.ticker === ticker && orderObject.date <= date) {
      if (orderObject.type === 'buy') {
        quantity += orderObject.quantity
      } else if (orderObject.type === 'sell') {
        quantity -= orderObject.quantity
      }
    }
  })
  return quantity
}

// helper returning
export const getLabelsArrayFromPortfolioDataArray = portfolioDataArray => {
  const labels = []
  portfolioDataArray.reverse().forEach(dateObject => {
    labels.push(dateObject.date)
  })
  return labels
}

// helper returning
export const getHoldingsObjectValue = holdingsObject => {
  let holdingValue = 0
  for (const [, value] of Object.entries(holdingsObject)) {
    holdingValue += value.close * value.quantity
  }
  return holdingValue
}

// helper returning
export const getDailyValueFromPortfolioDataArray = portfolioDataArray => {
  const data = []
  portfolioDataArray.forEach(dateObject => {
    data.push(getHoldingsObjectValue(dateObject.holdings))
  })
  return data
}

// helper returning
export const getTodaysValue = portfolioDataArray => {
  const lastIndex = portfolioDataArray.length - 1
  const todaysValue = getHoldingsObjectValue(
    portfolioDataArray[lastIndex].holdings
  )
  // getHoldingsObjectValue(portfolioDataArray[0].holdings)
  return todaysValue
}

// helper returning
export const getTodaysGain = portfolioDataArray => {
  let todaysGain = 0
  const lastIndex = portfolioDataArray.length - 1
  const todaysSpend = portfolioDataArray[lastIndex].spend
  const todaysValue = getHoldingsObjectValue(
    portfolioDataArray[lastIndex].holdings
  )
  todaysGain = todaysValue - todaysSpend
  return todaysGain
}

// helper returning
export const getTodaysReturn = portfolioDataArray => {
  let todaysReturn = 8.24
  const lastIndex = portfolioDataArray.length - 1
  const todaysSpend = portfolioDataArray[lastIndex].spend
  const todaysValue = getHoldingsObjectValue(
    portfolioDataArray[lastIndex].holdings
  )
  const todaysGain = todaysValue - todaysSpend
  todaysReturn = (todaysGain / todaysSpend) * 100
  return todaysReturn
}

/* -----===============================----- */
/* -----=====  DOUGHNUTS HELPERS  =====----- */
/* -----===============================----- */

// helper returning
export const getLabelsArrayFromDoughnutsArray = doughnutsArray => {
  const labels = []
  doughnutsArray.forEach(dateObject => {
    labels.push(dateObject.name)
  })
  return labels
}

// helper returning
export const getOptimalVolumeArrayFromDoughnutsArray = doughnutsArray => {
  const data = []
  doughnutsArray.forEach(dateObject => {
    data.push(dateObject.optimalVolume)
  })
  return data
}

/* -----===========================----- */
/* -----=====  CHART HELPERS  =====----- */
/* -----===========================----- */

// helper returning
export const getPortfolioLineChartDataset = portfolioDataArray => {
  const chartData = {
    labels: getLabelsArrayFromPortfolioDataArray(portfolioDataArray),
    datasets: [
      {
        label: 'Value',
        data: getDailyValueFromPortfolioDataArray(portfolioDataArray),
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        borderColor: borderColor[0],
        borderWidth: 3,
      },
    ],
  }
  return chartData
}

// helper returning
export const getDoughnutChartDataset = doughnutsArray => {
  console.log(doughnutsArray)
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
