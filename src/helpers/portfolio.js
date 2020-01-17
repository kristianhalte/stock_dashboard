import { getData } from '@/helpers/alpha'
import { orders } from '@/data/orders.json'
import { todaysDate } from '@/helpers/helpers'
const today = todaysDate()

export const getPortfolioObject = async () => {
  const portfolioObject = {}
  for (const order of orders) {
    // const result = hasStockFromOrderInportfolioObject(order, portfolioObject)
    if (order.ticker in portfolioObject) {
      // adjust value of portfolioObject
      Object.entries(portfolioObject[order.ticker]).forEach(([key]) => {
        if (key > order.date) {
          if (order.type === 'sell') {
            portfolioObject[order.ticker][key].quantity -= order.quantity
          } else if (order.type === 'buy') {
            portfolioObject[order.ticker][key].quantity += order.quantity
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

      portfolioObject[order.ticker] = portfolioObjectItem
    }
  }
  // console.log(orders)
  console.log(portfolioObject)
  return portfolioObject
}
