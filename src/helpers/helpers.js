import moment from 'moment'
import extend from 'extend'
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

// helper returning boolean value if ticker exists in an array
export const isValueInArray = (value, array) => array.some(el => el === value)

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
  const tickersObjecty = {}
  for (const order of ordersObject) {
    if (!isKeyInObject(order.ticker, tickersObjecty)) {
      tickersObjecty[order.ticker] = {}
    }
  }
  return tickersObjecty
}

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
export const getDoughnutsArrayFromOrdersArray = ordersArray => {
  const doughnutsArray = []
  for (const orderObject of ordersArray) {
    if (!isValueInArray(orderObject.doughnut, doughnutsArray)) {
      doughnutsArray.push(orderObject.doughnut)
    }
  }
  return doughnutsArray
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
export const getQuantityOfStockByDateAndDoughnutFromOrdersArray = (
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
export const getHoldingsOfDoughnutObjectByDateFromOrdersArray = (
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
export const getLabelsArrayFromPortfolioDataArray = portfolioDataArray => {
  const labelsArray = []
  portfolioDataArray.forEach(dateObject => {
    labelsArray.unshift(dateObject.date)
  })
  return labelsArray
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
export const mergeHoldingsObjects = (holdingsObject1, holdingsObject2) => {
  const holdingsObject = holdingsObject1
  for (const [key] of Object.entries(holdingsObject1)) {
    holdingsObject[key].quantity = holdingsObject2[key].quantity
  }
  return holdingsObject
}

// helper returning
export const getDaysValueFromPortfolioDataArray = portfolioDataArray => {
  const daysValue = []
  portfolioDataArray.forEach(dateObject => {
    daysValue.unshift(getHoldingsObjectValue(dateObject.holdings))
  })
  return daysValue
}

// helper returning
export const getTodaysValue = portfolioDataArray => {
  const todaysValue = getHoldingsObjectValue(portfolioDataArray[0].holdings)
  return todaysValue
}

// helper returning
export const getTodaysGain = portfolioDataArray => {
  let todaysGain = 0
  const todaysSpend = portfolioDataArray[0].spend
  const todaysValue = getHoldingsObjectValue(portfolioDataArray[0].holdings)
  todaysGain = todaysValue - todaysSpend
  return todaysGain
}

// helper returning
export const getTodaysReturn = portfolioDataArray => {
  let todaysReturn = 8.24
  const todaysSpend = portfolioDataArray[0].spend
  const todaysValue = getHoldingsObjectValue(portfolioDataArray[0].holdings)
  const todaysGain = todaysValue - todaysSpend
  todaysReturn = (todaysGain / todaysSpend) * 100
  return todaysReturn
}

// helper returning
export const getSubPortfolioDataArray = (portfolioDataArray, id) => {
  // console.log('original:\n', portfolioDataArray)
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
  // console.log('sub:\n', subPortfolioDataArray)
  return subPortfolioDataArray
}

/* -----===============================----- */
/* -----=====  DOUGHNUTS HELPERS  =====----- */
/* -----===============================----- */

// helper returning
export const getLabelsArrayFromDoughnutsArray = doughnutsArray => {
  const labelsArray = []
  doughnutsArray.forEach(dateObject => {
    labelsArray.push(dateObject.name)
  })
  return labelsArray
}

// helper returning
export const getOptimalVolumeArrayFromDoughnutsArray = doughnutsArray => {
  const optimalVolumeArray = []
  doughnutsArray.forEach(dateObject => {
    optimalVolumeArray.push(dateObject.optimalVolume)
  })
  return optimalVolumeArray
}

// helper returning
export const getDoughnutsDataArrayFromDoughnutsArray = (
  doughnutsArray,
  date,
  ordersArray,
  tickersArray
) => {
  const doughnutsDataArray = []
  doughnutsArray.forEach(doughnutName => {
    const obj = {
      name: doughnutName,
      holdings: getHoldingsOfDoughnutObjectByDateFromOrdersArray(
        doughnutName,
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
/* -----=====  CHART HELPERS  =====----- */
/* -----===========================----- */

// helper returning
export const getPortfolioLineChartDataset = portfolioDataArray => {
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
export const getDoughnutChartDataset = doughnutsArray => {
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
