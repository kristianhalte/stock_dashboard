<template>
  <div class="container">
    <b-table :data="orders" :columns="columns"></b-table>
  </div>
</template>

<script>
import { orders } from '@/data/orders.json'
export default {
  name: 'Orders',
  data() {
    return {
      orders: orders,
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true,
        },
        {
          field: 'date',
          label: 'Date',
          centered: true,
        },
        {
          field: 'type',
          label: 'Type',
        },
        {
          field: 'ticker',
          label: 'Ticker',
        },

        {
          field: 'price',
          label: 'Price',
        },
        {
          field: 'currency',
          label: 'Currency',
        },
        {
          field: 'fee',
          label: 'Fee',
        },

        {
          field: 'quantity',
          label: 'Quantity',
        },
      ],
    }
  },
}
</script>
