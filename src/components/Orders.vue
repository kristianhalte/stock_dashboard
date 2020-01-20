<template>
  <div class="container">
    <b-table :data="orders" :columns="columns" :striped="true">
      <template slot-scope="props">
        <b-table-column centered>
          <span
            :class="[
              'tag',
              { 'is-danger': props.row.type === 'sell' },
              { 'is-success': props.row.type === 'buy' },
            ]"
          >
            {{ props.row.type }}
          </span>
        </b-table-column>

        <b-table-column centered>
          {{ props.row.date }}
        </b-table-column>

        <b-table-column centered>
          {{ props.row.ticker }}
        </b-table-column>

        <b-table-column class="has-text-right">
          {{ props.row.quantity }}
        </b-table-column>

        <b-table-column class="has-text-right">
          {{ props.row.price | numFormat('$0,0.00') }}
        </b-table-column>

        <b-table-column class="has-text-right">
          {{ props.row.fee | numFormat('$0,0.00') }}
        </b-table-column>

        <b-table-column centered>
          {{ props.row.currency }}
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import { ordersArray } from '@/data/orders.json'
export default {
  name: 'Orders',
  data() {
    return {
      orders: ordersArray,
      columns: [
        {
          field: 'type',
          label: 'Type',
          centered: true,
        },
        {
          field: 'date',
          label: 'Date',
          centered: true,
        },
        {
          field: 'ticker',
          label: 'Ticker',
          centered: true,
        },
        {
          field: 'quantity',
          label: 'Quantity',
          centered: true,
        },
        {
          field: 'price',
          label: 'Price',
          centered: true,
        },
        {
          field: 'fee',
          label: 'Fee',
          centered: true,
        },
        {
          field: 'currency',
          label: 'Currency',
          centered: true,
        },
      ],
    }
  },
}
</script>
