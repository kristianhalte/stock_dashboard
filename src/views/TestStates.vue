<template>
  <div>
    <button class="button" @click="goToTestState0">
      TestState 0
    </button>
    <button class="button" @click="goToTestState1">
      TestState 1
    </button>
    <TestState :id="id" />
  </div>
</template>

<script>
import TestState from '@/components/TestState.vue'

export default {
  name: 'teststates',
  components: {
    TestState,
  },
  props: ['id'],
  methods: {
    goToTestState0() {
      this.$router.push({ path: `/teststates/0` })
    },
    goToTestState1() {
      this.$router.push({ path: `/teststates/1` })
    },
  },
}
</script>
