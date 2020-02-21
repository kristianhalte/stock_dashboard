<template>
  <div>
    <div class="buttons is-marginless">
      <button class="button is-rounded" @click="$router.push('/portfolios/0')">
        0
      </button>
      <button class="button is-rounded" @click="$router.push('/portfolios/1')">
        1
      </button>
      <button class="button is-rounded" @click="$router.push('/portfolios/2')">
        2
      </button>
    </div>
    <div class="section">
      <p class="subtitle is-4" v-if="loading">{{ $t('loading') }}</p>
      <div v-else>
        <p class="subtitle is-4">Done Loading {{ id }}</p>
        <Deep :data="data" />
        <Doughnut
          :data="data.chart"
          :label="doughnutLabel"
          :todaysValue="doughnutTodaysValue"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Deep from '@/components/Deep.vue'
import Doughnut from '@/components/charts/Doughnut.vue'
import { mapState } from 'vuex'
export default {
  name: 'portfolios',
  components: {
    Deep,
    Doughnut,
  },
  props: ['id'],
  data() {
    return {
      doughnutLabel: 'Hello Doughnut',
      doughnutTodaysValue: 500,
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      // data: state => state.data,
    }),
    data() {
      return this.$store.getters.getData(this.id)
    },
  },
}
</script>
