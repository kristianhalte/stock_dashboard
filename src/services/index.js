import { timeout } from '@/helpers'

export const getData = async () => {
  const data = [
    {
      first: 'this',
      second: 'is',
      third: 'zero',
      chart: [
        {
          label: 'Ice Cream Sandwich',
          value: '1000',
        },
        {
          label: 'Jelly Bean',
          value: '5300',
        },
        {
          label: 'Kitkat',
          value: '10500',
        },
        {
          label: 'Lollipop',
          value: '18900',
        },
        {
          label: 'Marshmallow',
          value: '17904',
        },
      ],
    },
    {
      first: 'this',
      second: 'is',
      third: 'one',
      chart: [
        {
          label: 'Ice Cream Sandwich',
          value: '10',
        },
        {
          label: 'Jelly Bean',
          value: '20',
        },
        {
          label: 'Kitkat',
          value: '30',
        },
        {
          label: 'Lollipop',
          value: '40',
        },
        {
          label: 'Marshmallow',
          value: '50',
        },
      ],
    },
    {
      first: 'this',
      second: 'is',
      third: 'two',
      chart: [
        {
          label: 'Ice Cream Sandwich',
          value: '300',
        },
        {
          label: 'Jelly Bean',
          value: '200',
        },
        {
          label: 'Kitkat',
          value: '150',
        },
        {
          label: 'Lollipop',
          value: '50',
        },
        {
          label: 'Marshmallow',
          value: '245',
        },
      ],
    },
  ]
  await timeout(3000)
  return data
}
