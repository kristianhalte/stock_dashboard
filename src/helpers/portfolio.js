import { getData } from '@/helpers/alpha'
import { orders } from '@/data/orders.json'
import { todaysDate } from '@/helpers/helpers'
const today = todaysDate()

export const getPortfolioOfStocksObject = async () => {
  const portfolioOfStocksObject = {}
  for (const order of orders) {
    // const result = hasStockFromOrderInportfolioObject(order, portfolioObject)
    if (order.ticker in portfolioOfStocksObject) {
      // adjust value of portfolioObject
      Object.entries(portfolioOfStocksObject[order.ticker]).forEach(([key]) => {
        if (key > order.date) {
          if (order.type === 'sell') {
            portfolioOfStocksObject[order.ticker][key].quantity -=
              order.quantity
          } else if (order.type === 'buy') {
            portfolioOfStocksObject[order.ticker][key].quantity +=
              order.quantity
          } else {
            console.error('Something happened with this order: ', order)
          }
        }
      })
    } else {
      // add order to portfolioObject
      const data = await getData(order.ticker, today, order.date)
      const portfolioObjectItem = {}
      Object.entries(data).forEach(([key, value]) => {
        portfolioObjectItem[key] = {
          quantity: order.quantity,
          price: value['4. close'],
        }
      })

      portfolioOfStocksObject[order.ticker] = portfolioObjectItem
    }
  }
  // console.log(orders)
  console.log(portfolioOfStocksObject)
  return portfolioOfStocksObject
}

export const getCombinedPortfolioObject = async () => {
  const combinedPortfolioObject = {}
  const portfolioOfStocksObject = await getPortfolioOfStocksObject()
  Object.entries(portfolioOfStocksObject).forEach(([, holding]) => {
    const stockHolding = holding
    Object.entries(stockHolding).forEach(([date, value]) => {
      if (date in combinedPortfolioObject) {
        combinedPortfolioObject[date] += value.quantity * value.price
      } else {
        combinedPortfolioObject[date] = value.quantity * value.price
      }
    })
  })
  return combinedPortfolioObject
}

export const getCombinedPortfolioArray = async () => {
  const portfolioDataArray = []
  const portfolioLabelArray = []
  const combinedPortfolioObject = await getCombinedPortfolioObject()
  Object.entries(combinedPortfolioObject).forEach(([date, value]) => {
    portfolioDataArray.push(value)
    portfolioLabelArray.push(date)
  })
  const portfolioDataArrayReversed = portfolioDataArray.reverse()
  const portfolioLabelArrayReversed = portfolioLabelArray.reverse()
  const portfolioData = {
    portfolioDataArrayReversed,
    portfolioLabelArrayReversed,
  }
  console.log(portfolioData)
  // console.log(portfolioData)
  return portfolioData
}
