<template>
  <div>
    <p>From DeepDeep</p>
    <p>{{ data.first }} {{ data.second }} {{ data.third }}</p>
    <DeepDeepDeep :data="data" />
  </div>
</template>

<script>
import DeepDeepDeep from '@/components/DeepDeepDeep.vue'
export default {
  name: 'deep',
  components: {
    DeepDeepDeep,
  },
  props: ['data'],
}
</script>
