import alphavantage from 'alphavantage'
const apiKey = process.env.VUE_APP_ALPHA_VANTAGE_API_KEY

const alpha = alphavantage({ key: apiKey })

export const getData = async ticker => {
  try {
    return alpha.data.daily(ticker, `full`).then(data => data)
  } catch (err) {
    console.log(err)
  }
}
