<template>
  <div>
    <p>From Deep</p>
    <p>{{ data.first }} {{ data.second }} {{ data.third }}</p>
    <DeepDeep :data="data" />
  </div>
</template>

<script>
import DeepDeep from '@/components/DeepDeep.vue'
export default {
  name: 'deep',
  components: {
    DeepDeep,
  },
  props: ['data'],
}
</script>
