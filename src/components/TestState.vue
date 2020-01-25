<template>
  <div class="container">
    <p>Hello Test State {{ id }}</p>
  </div>
</template>

<script>
export default {
  name: 'TestState',
  props: ['id'],
  data() {
    return {}
  },
}
</script>
