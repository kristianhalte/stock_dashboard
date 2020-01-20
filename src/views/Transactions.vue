<template>
  <div>
    <Orders />
    <!-- <TestState /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Orders from '@/components/Orders.vue'
// import TestState from '@/components/TestState.vue'

export default {
  name: 'transactions',
  components: {
    Orders,
    // TestState,
  },
}
</script>
