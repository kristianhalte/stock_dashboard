import { getDoughnutsLabelsArrayFromDoughnutsArray } from '@/helpers/helpers'
import { getDoughnutData } from '@/helpers/doughnutHelpers'

/* -----==================================----- */
/* -----=====  MY DOUGHNUTS HELPERS  =====----- */
/* -----==================================----- */

export const getMyDoughnutsData = (
  timeSeriesArray,
  ordersArray,
  doughnutsArray
) => {
  const myDoughnutsData = []
  const doughnutsLabelsArray = getDoughnutsLabelsArrayFromDoughnutsArray(
    doughnutsArray
  )
  doughnutsLabelsArray.forEach(doughnutLabel => {
    const doughnutDataObject = {
      label: doughnutLabel,
      data: getDoughnutData(timeSeriesArray, ordersArray, doughnutLabel),
    }
    myDoughnutsData.push(doughnutDataObject)
  })
  return myDoughnutsData
}
