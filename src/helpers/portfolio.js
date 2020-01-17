import { getData } from '@/helpers/alpha'
import { orders } from '@/data/orders.json'

export const getPortfolio = async () => {
  const data = await getData(orders[0].ticker)
  // const data = await getData()
  console.log(data)
  console.log(orders)
}
