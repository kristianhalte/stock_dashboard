<template>
  <div>
    <p>From DeepDeepDeep</p>
    <p>{{ data.first }} {{ data.second }} {{ data.third }}</p>
  </div>
</template>

<script>
export default {
  name: 'deepdeepdeep',
  props: ['data'],
}
</script>
