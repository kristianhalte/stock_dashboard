<template>
  <div>
    <Orders />
  </div>
</template>

<script>
// @ is an alias to /src
import Orders from '@/components/Orders.vue'

export default {
  name: 'transactions',
  components: {
    Orders,
  },
}
</script>
