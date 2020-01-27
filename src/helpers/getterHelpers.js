import { getValueFromHoldingsObject } from '@/helpers/helpers'

/* -----==========================----- */
/* -----=====  MAIN GETTERS  =====----- */
/* -----==========================----- */

export const getMainTodaysValue = doughnutObject => {
  const arr = 5000
  return arr
}

export const getMainTodaysGain = doughnutObject => {
  const arr = 240
  return arr
}

export const getMainTodaysDividend = doughnutObject => {
  const arr = 40
  return arr
}

export const getMainTodaysReturn = doughnutObject => {
  const arr = 0.1234
  return arr
}

export const getMainDoughnutData = doughnutObject => {
  const arr = [
    {
      label: 'Mon',
      value: 15123,
    },
    {
      label: 'Tue',
      value: 14233,
    },
    {
      label: 'Wed',
      value: 23507,
    },
    {
      label: 'Thu',
      value: 9110,
    },
    {
      label: 'Fri',
      value: 15529,
    },
    {
      label: 'Sat',
      value: 20803,
    },
    {
      label: 'Sun',
      value: 19202,
    },
  ]
  return arr
}

export const getMainLineChartData = doughnutObject => {
  const arr = [
    {
      label: 'Mon',
      value: 15123,
    },
    {
      label: 'Tue',
      value: 14233,
    },
    {
      label: 'Wed',
      value: 23507,
    },
    {
      label: 'Thu',
      value: 9110,
    },
    {
      label: 'Fri',
      value: 15529,
    },
    {
      label: 'Sat',
      value: 20803,
    },
    {
      label: 'Sun',
      value: 19202,
    },
  ]
  return arr
}

export const getMainTableData = doughnutObject => {
  const arr = []
  return arr
}

/* -----==============================----- */
/* -----=====  DOUGHNUT GETTERS  =====----- */
/* -----==============================----- */

export const getDoughnutLabel = doughnutObject => {
  const doubhnutLabel = doughnutObject.label
  return doubhnutLabel
}

export const getDoughnutTodaysValue = doughnutObject => {
  const doughnutTodaysHoldings = doughnutObject.data[0].holdings
  const doughnutTodaysValue = getValueFromHoldingsObject(doughnutTodaysHoldings)
  return doughnutTodaysValue
}

export const getDoughnutTodaysGain = doughnutObject => {
  const doughnutTodaysSpend = doughnutObject.data[0].spend
  const doughnutTodaysHoldings = doughnutObject.data[0].holdings
  const doughnutTodaysValue = getValueFromHoldingsObject(doughnutTodaysHoldings)
  const doughnutTodaysGain = doughnutTodaysValue - doughnutTodaysSpend
  return doughnutTodaysGain
}

export const getDoughnutTodaysDividend = doughnutObject => {
  const doughnutTodaysDividend = doughnutObject.data[0].dividend
  return doughnutTodaysDividend
}

export const getDoughnutTodaysReturn = doughnutObject => {
  let doughnutTodaysReturn = 0
  const doughnutTodaysSpend = doughnutObject.data[0].spend

  if (doughnutTodaysSpend === 0) {
    return doughnutTodaysReturn
  }
  const doughnutTodaysGain = getDoughnutTodaysGain(doughnutObject)
  const doughnutTodaysDividend = getDoughnutTodaysDividend(doughnutObject)
  doughnutTodaysReturn =
    (doughnutTodaysGain + doughnutTodaysDividend) / doughnutTodaysSpend
  return doughnutTodaysReturn
}

export const getDoughnutDoughnutData = doughnutObject => {
  const arr = [
    {
      label: 'Mon',
      value: 15123,
    },
    {
      label: 'Tue',
      value: 14233,
    },
    {
      label: 'Wed',
      value: 23507,
    },
    {
      label: 'Thu',
      value: 9110,
    },
    {
      label: 'Fri',
      value: 15529,
    },
    {
      label: 'Sat',
      value: 20803,
    },
    {
      label: 'Sun',
      value: 19202,
    },
  ]
  return arr
}

export const getDoughnutLineChartData = doughnutObject => {
  const arr = [
    {
      label: 'Mon',
      value: 15123,
    },
    {
      label: 'Tue',
      value: 14233,
    },
    {
      label: 'Wed',
      value: 23507,
    },
    {
      label: 'Thu',
      value: 9110,
    },
    {
      label: 'Fri',
      value: 15529,
    },
    {
      label: 'Sat',
      value: 20803,
    },
    {
      label: 'Sun',
      value: 19202,
    },
  ]
  return arr
}

export const getDoughnutTableData = doughnutObject => {
  const arr = []
  return arr
}
