<template>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li
        v-for="item in data"
        :key="item.id"
        :class="{ 'is-active': item.isLast }"
      >
        <a href="#" v-if="item.isLast" aria-current="page">{{ item.name }}</a>
        <a v-else @click="$router.push(item.href)">{{ item.name }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'breadcrumb',
  props: ['data'],
}
</script>
