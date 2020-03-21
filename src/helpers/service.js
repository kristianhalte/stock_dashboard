import moment from 'moment'

import { getFirstTradeDate, isValueInArray } from '@/helpers/utils'

//TODO: check if still needed
export const firstNewTradeDate = ordersArray => {
  let firstTradeDate = moment().format()
  ordersArray.forEach(orderObject => {
    if (orderObject.date < firstTradeDate) {
      firstTradeDate = orderObject.date
    }
  })
  return firstTradeDate
}

export const getDaysSince = date => moment().diff(date, 'days')

//TODO: rename
export const getNewTickersArray = targetPortfoliosArray => {
  const tickersArray = [] //TODO: change to .map
  targetPortfoliosArray.forEach(portfolioObject => {
    portfolioObject.categories.forEach(categoryObject => {
      categoryObject.holdings.forEach(holdingObject => {
        if (!isValueInArray(holdingObject.label, tickersArray)) {
          tickersArray.push(holdingObject.label)
        }
      })
    })
  })
  return tickersArray
}

// // new version with an extra date before first trade date
const getTradeDaysArray = (alphaTimeSeriesObject, firstTradeDate) => {
  const timeSeriesKeys = Object.keys(alphaTimeSeriesObject)
  const tradeDaysArray = timeSeriesKeys
  const index = timeSeriesKeys.indexOf(firstTradeDate) + 2 //TODO: check if +2 still needed
  let valuesToRemove = -1
  timeSeriesKeys.forEach(date => {
    if (date < firstTradeDate) {
      valuesToRemove += 1
    }
  })
  if (index > -1 && valuesToRemove > 0) {
    tradeDaysArray.splice(index, valuesToRemove)
  }
  tradeDaysArray.shift() // will remove todays date
  return tradeDaysArray.reverse()
}

// // original version
// const getTradeDaysArray = (alphaTimeSeriesObject, firstTradeDate) => {
//   const tradeDaysArray = []
//   for (const [date] of Object.entries(alphaTimeSeriesObject)) {
//     if (date >= firstTradeDate) {
//       tradeDaysArray.unshift(date)
//     }
//   }
//   return tradeDaysArray
// }

const getDividend = (
  ordersArray,
  targetPortfolioLabel,
  targetCategoryLabel,
  targetHoldingLabel,
  date
) => {
  let dividend = 0
  ordersArray.forEach(orderObject => {
    if (
      (orderObject.date === date) &
      (orderObject.portfolio === targetPortfolioLabel) &
      (orderObject.category === targetCategoryLabel) &
      (orderObject.ticker === targetHoldingLabel) &
      (orderObject.type === 'dividend')
    ) {
      dividend = orderObject.price
    }
  })
  return dividend
}

const getQty = (
  ordersArray,
  targetPortfolioLabel,
  targetCategoryLabel,
  targetHoldingLabel,
  date
) => {
  let qty = 0
  ordersArray.forEach(orderObject => {
    if (
      (orderObject.date === date) &
      (orderObject.portfolio === targetPortfolioLabel) &
      (orderObject.category === targetCategoryLabel) &
      (orderObject.ticker === targetHoldingLabel)
    ) {
      qty = orderObject.quantity
    }
  })
  return qty
}

const getSpend = (
  ordersArray,
  targetPortfolioLabel,
  targetCategoryLabel,
  targetHoldingLabel,
  date
) => {
  let spend = 0
  ordersArray.forEach(orderObject => {
    if (
      (orderObject.date === date) &
      (orderObject.portfolio === targetPortfolioLabel) &
      (orderObject.category === targetCategoryLabel) &
      (orderObject.ticker === targetHoldingLabel)
    ) {
      if (orderObject.type === 'buy') {
        spend = orderObject.quantity * orderObject.price + orderObject.fee
      } else if (orderObject.type === 'sell') {
        spend = -1 * orderObject.quantity * orderObject.price + orderObject.fee
      }
    }
  })
  return spend
}

const getTimeSeriesDataObject = (
  alphaDateObject,
  ordersArray,
  targetPortfolioLabel,
  targetCategoryLabel,
  targetHoldingLabel,
  date,
  prev
) => {
  console.log('alphaDateObject: ', alphaDateObject)
  console.log('previousTimeSeriesDataObject: ', prev)
  const deltaDividend = getDividend(
    ordersArray,
    targetPortfolioLabel,
    targetCategoryLabel,
    targetHoldingLabel,
    date
  )
  const dividend = prev.dividend + deltaDividend
  const price = parseFloat(alphaDateObject['4. close'])
  const deltaPrice = price - prev.price
  const deltaQty = getQty(
    ordersArray,
    targetPortfolioLabel,
    targetCategoryLabel,
    targetHoldingLabel,
    date
  )
  const qty = prev.qty + deltaQty
  const deltaSpend = getSpend(
    ordersArray,
    targetPortfolioLabel,
    targetCategoryLabel,
    targetHoldingLabel,
    date
  )
  const spend = prev.spend + deltaSpend
  const gain = (qty - deltaQty) * deltaPrice + deltaQty * price - deltaSpend
  const value = qty * price
  const returns = (value - prev.value - deltaSpend) / spend
  const timeSeriesDataObject = {
    date: date,
    deltaDividend: deltaDividend,
    dividend: dividend,
    deltaPrice: deltaPrice,
    price: price,
    deltaQty: deltaQty,
    qty: qty,
    deltaSpend: deltaSpend,
    spend: spend,
    gain: gain,
    value: value,
    returns: returns,
  }
  return timeSeriesDataObject
}

const getTimeSeriesData = (
  alphaData,
  ordersArray,
  targetPortfolioLabel,
  targetCategoryLabel,
  targetHoldingLabel,
  tradeDatesArray
) => {
  console.log('targetHoldingLabel: ', targetHoldingLabel)
  const alphaDataArray = alphaData.find(
    ({ ticker }) => ticker === targetHoldingLabel
  )
  console.log('alphaDataArray: ', alphaDataArray)
  // TODO: can this be put inside the .map loop to get a starting price?
  let previousTimeSeriesDataObject = {
    date: null,
    deltaDividend: null,
    dividend: 0,
    deltaQty: null,
    qty: 0,
    deltaPrice: null,
    price: 0,
    deltaSpend: null,
    spend: 0,
    gain: 0,
    value: 0,
    return: 0,
  }
  const timeSeriesData = tradeDatesArray.map(date => {
    const timeSeriesDataObject = getTimeSeriesDataObject(
      alphaDataArray.timeSeriesObject[date],
      ordersArray,
      targetPortfolioLabel,
      targetCategoryLabel,
      targetHoldingLabel,
      date,
      previousTimeSeriesDataObject
    )
    previousTimeSeriesDataObject = timeSeriesDataObject
    return timeSeriesDataObject
  })
  return timeSeriesData
}

const getHoldings = (
  alphaData,
  ordersArray,
  targetPortfolioLabel,
  targetCategoryLabel,
  targetCategoryHoldings,
  tradeDatesArray
) => {
  const holdings = targetCategoryHoldings.map(targetHoldingObject => {
    const holdingObject = {
      label: targetHoldingObject.label,
      target: targetHoldingObject.target,
      timeSeriesData: getTimeSeriesData(
        alphaData,
        ordersArray,
        targetPortfolioLabel,
        targetCategoryLabel,
        targetHoldingObject.label,
        tradeDatesArray
      ),
    }
    return holdingObject
  })
  return holdings
}

const getCategories = (
  alphaData,
  ordersArray,
  targetPortfolioLabel,
  targetPortfolioCategories,
  tradeDatesArray
) => {
  const categories = targetPortfolioCategories.map(targetCategoryObject => {
    const categoryObject = {
      label: targetCategoryObject.label,
      target: targetCategoryObject.target,
      holdings: getHoldings(
        alphaData,
        ordersArray,
        targetPortfolioLabel,
        targetCategoryObject.label,
        targetCategoryObject.holdings,
        tradeDatesArray
      ),
    }
    return categoryObject
  })
  return categories
}

const getPortfolios = (
  alphaData,
  ordersArray,
  targetPortfoliosArray,
  tradeDatesArray
) => {
  const portfolios = targetPortfoliosArray.map(targetPortfolioObject => {
    const portfolioObject = {
      label: targetPortfolioObject.label,
      target: targetPortfolioObject.target,
      categories: getCategories(
        alphaData,
        ordersArray,
        targetPortfolioObject.label,
        targetPortfolioObject.categories,
        tradeDatesArray
      ),
    }
    return portfolioObject
  })
  return portfolios
}

export const getNewNewData = (
  alphaData,
  ordersArray,
  targetPortfoliosArray
) => {
  const firstTradeDay = getFirstTradeDate(ordersArray)
  const tradeDatesArray = getTradeDaysArray(
    alphaData[0].timeSeriesObject,
    firstTradeDay
  )
  console.log('tradeDatesArray returned: ', tradeDatesArray)
  const newNewData = {
    label: 'My Portfolios',
    portfolios: getPortfolios(
      alphaData,
      ordersArray,
      targetPortfoliosArray,
      tradeDatesArray
    ),
  }
  return newNewData
}
