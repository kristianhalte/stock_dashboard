import { timeout } from '@/helpers'

export const getData = async () => {
  const data = ['data', 'is', 'live']
  await timeout(3000)
  return data
}
