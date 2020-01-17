import { orders } from '@/data/orders'

const hasStockFromOrderInPortfolio = (order, portfolio) =>
  portfolio.some(el => el.ticker === order.ticker)

const addOrderToPortfolio = (order, portfolio) => {
  const { ticker, quantity, type, price } = order
  const portfolioItem = {
    ticker,
    quantity,
    price,
  }
  if (type === 'buy') {
    return portfolio.push(portfolioItem)
  } else {
    return portfolio
  }
}

const updateOrderQuantityOfStockInPortfolio = (order, portfolio) => {
  const { ticker, quantity, type } = order
  const index = portfolio.findIndex(el => el.ticker == ticker)
  if (type === 'buy') {
    return (portfolio[index].quantity += quantity)
  } else {
    return (portfolio[index].quantity -= quantity)
  }
}

export const getPortfolio = () => {
  const portfolio = []
  orders.forEach(order => {
    if (hasStockFromOrderInPortfolio(order, portfolio)) {
      return updateOrderQuantityOfStockInPortfolio(order, portfolio)
    } else {
      return addOrderToPortfolio(order, portfolio)
    }
  })
  return portfolio
}

export const getPorfolioArray = () => {
  const data = []
  const portfolio = getPortfolio()
  portfolio.forEach(item => {
    data.push(item.quantity * item.price)
  })
  return data
}

export const getLabelsArray = () => {
  const data = []
  const portfolio = getPortfolio()
  portfolio.forEach(item => {
    data.push(item.ticker)
  })
  return data
}
