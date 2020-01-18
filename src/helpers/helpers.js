import moment from 'moment'
// export const hasStockFromOrderInPortfolio = (order, portfolio) =>
//   portfolio.some(el => el.ticker === order.ticker)

// const addOrderToPortfolio = (order, portfolio) => {
//   const { ticker, quantity, type, price } = order
//   const portfolioItem = {
//     ticker,
//     quantity,
//     price,
//   }
//   if (type === 'buy') {
//     return portfolio.push(portfolioItem)
//   } else {
//     return portfolio
//   }
// }

// const updateOrderQuantityOfStockInPortfolio = (order, portfolio) => {
//   const { ticker, quantity, type } = order
//   const index = portfolio.findIndex(el => el.ticker == ticker)
//   if (type === 'buy') {
//     return (portfolio[index].quantity += quantity)
//   } else {
//     return (portfolio[index].quantity -= quantity)
//   }
// }

// export const getPortfolio = orders => {
//   const portfolio = []
//   orders.forEach(order => {
//     if (hasStockFromOrderInPortfolio(order, portfolio)) {
//       return updateOrderQuantityOfStockInPortfolio(order, portfolio)
//     } else {
//       return addOrderToPortfolio(order, portfolio)
//     }
//   })
//   return portfolio
// }

// export const getPorfolioArray = () => {
//   const data = []
//   const portfolio = getPortfolio()
//   portfolio.forEach(item => {
//     data.push(item.quantity * item.price)
//   })
//   return data
// }

// export const getLabelsArray = () => {
//   const data = []
//   const portfolio = getPortfolio()
//   portfolio.forEach(item => {
//     data.push(item.ticker)
//   })
//   return data
// }

export const getTodaysDate = () => {
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = today.getFullYear()
  const todayString = yyyy + '-' + mm + '-' + dd
  return todayString
}

export const getDaysBetween = (fromDate, toDate) => {
  const fromDateMoment = moment(fromDate)
  const toDateMoment = moment(toDate)
  return fromDateMoment.diff(toDateMoment, 'days')
}

export const getFirstOrderDateInOrdersObject = ordersObject => {
  let firstOrderDate = getTodaysDate()
  for (const order of ordersObject) {
    if (order.date < firstOrderDate) {
      firstOrderDate = order.date
    }
  }
  return firstOrderDate
}

export const hasTickerInObject = (ticker, object) => {
  if (ticker in object) {
    return true
  } else {
    return false
  }
}

export const getTickersObjectInOrdersObject = ordersObject => {
  const tickersObjectInOrders = {}
  for (const order of ordersObject) {
    if (!hasTickerInObject(order.ticker, tickersObjectInOrders)) {
      tickersObjectInOrders[order.ticker] = {}
    }
  }
  return tickersObjectInOrders
}

export const hasTickerInArray = (ticker, array) =>
  array.some(el => el === ticker)

export const getTickersArrayInOrdersObject = ordersObject => {
  const tickersArrayInOrders = []
  for (const order of ordersObject) {
    if (!hasTickerInArray(order.ticker, tickersArrayInOrders)) {
      tickersArrayInOrders.push(order.ticker)
    }
  }
  return tickersArrayInOrders
}
