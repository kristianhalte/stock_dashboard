<template>
  <div>
    <button class="button" @click="goToTestState1">
      TestState 1
    </button>
    <button class="button" @click="goToTestState2">
      TestState 2
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
    goToTestState1() {
      this.$router.push({ path: `/teststates/1` })
    },
    goToTestState2() {
      this.$router.push({ path: `/teststates/2` })
    },
  },
}
</script>
