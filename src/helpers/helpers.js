import moment from 'moment'

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
export const getTickersArrayInOrdersArray = ordersArray => {
  const tickersArrayInOrdersArray = []
  for (const orderObject of ordersArray) {
    if (!isValueInArray(orderObject.ticker, tickersArrayInOrdersArray)) {
      tickersArrayInOrdersArray.push(orderObject.ticker)
    }
  }
  return tickersArrayInOrdersArray
}

/* -----===============================----- */
/* -----=====  PORTFOLIO HELPERS  =====----- */
/* -----===============================----- */

// helper returning quantity of stocks held at given date based on an array of orders
export const getQuantityOfStockByDateAndOrdersArray = (
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

/* -----===========================----- */
/* -----=====  CHART HELPERS  =====----- */
/* -----===========================----- */

// helper returning
export const getPortfolioLineChartDataset = (
  timeSeriesDataFromStore,
  portfolioDataFromStore
) => {
  console.log(timeSeriesDataFromStore, portfolioDataFromStore)
}
