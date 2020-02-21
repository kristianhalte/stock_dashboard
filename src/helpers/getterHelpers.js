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
  const doughnutDoughnutData = doughnutObject.subDoughnutsArray
  return doughnutDoughnutData
}

export const getDoughnutLineChartData = doughnutObject => {
  const dataArray = doughnutObject.data
  const doughnutLineChartData = []
  dataArray.forEach(dateObject => {
    const lineChartDataPoint = {
      label: dateObject.date,
      value: getValueFromHoldingsObject(dateObject.holdings),
    }
    doughnutLineChartData.unshift(lineChartDataPoint)
  })
  // const arr = [
  //   {
  //     label: 'Mon',
  //     value: 15123,
  //   },
  //   {
  //     label: 'Tue',
  //     value: 14233,
  //   },
  //   {
  //     label: 'Wed',
  //     value: 23507,
  //   },
  //   {
  //     label: 'Thu',
  //     value: 9110,
  //   },
  //   {
  //     label: 'Fri',
  //     value: 15529,
  //   },
  //   {
  //     label: 'Sat',
  //     value: 20803,
  //   },
  //   {
  //     label: 'Sun',
  //     value: 19202,
  //   },
  // ]
  return doughnutLineChartData
}

export const getDoughnutTableData = doughnutObject => {
  const data = [
    {
      id: 1,
      first_name: 'Jesse',
      last_name: 'Simmons',
      date: '2016-10-15 13:43:27',
      gender: 'Male',
    },
    {
      id: 2,
      first_name: 'John',
      last_name: 'Jacobs',
      date: '2016-12-15 06:00:53',
      gender: 'Male',
    },
    {
      id: 3,
      first_name: 'Tina',
      last_name: 'Gilbert',
      date: '2016-04-26 06:26:28',
      gender: 'Female',
    },
    {
      id: 4,
      first_name: 'Clarence',
      last_name: 'Flores',
      date: '2016-04-10 10:28:46',
      gender: 'Male',
    },
    {
      id: 5,
      first_name: 'Anne',
      last_name: 'Lee',
      date: '2016-12-06 14:38:38',
      gender: 'Female',
    },
  ]
  return data
}
