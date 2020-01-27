<template>
  <div class="columns">
    <div class="column is-two-fifths">
      <div class="section">
        <p class="subtitle is-4" v-if="loading">{{ $t('loading') }}</p>
        <Doughnut v-else :data="mainDoughnutData" />
      </div>
    </div>
    <div class="column is-three-fifths">
      <div class="section">
        <p class="subtitle is-4" v-if="loading">{{ $t('loading') }}</p>
        <Dashboard
          v-else
          :loading="loading"
          :label="$t('myPortfolio')"
          :todaysValue="mainTodaysValue"
          :todaysGain="mainTodaysGain"
          :todaysDividend="mainTodaysDividen"
          :todaysReturn="mainTodaysReturn"
        />
      </div>
      <div class="section">
        <div>
          <p v-if="loading">{{ $t('loading') }}</p>
          <NewLine v-else :data="mainLineChartData" />
        </div>
      </div>
      <div class="section">
        <h2 class="title is-2">{{ $t('slices') }}</h2>
      </div>
      <div class="section">
        <p v-if="loading">{{ $t('loading') }}</p>
        <Slices v-else :table-data="mainTableData" />
      </div>
    </div>
  </div>
</template>

<script>
import Doughnut from '@/components/charts/Doughnut.vue'
import Dashboard from '@/components/Dashboard.vue'
import NewLine from '@/components/charts/NewLine.vue'
import Slices from '@/components/Slices.vue'
import { mapState } from 'vuex'

export default {
  name: 'doughnuts',
  props: ['id'],
  components: {
    Doughnut,
    Dashboard,
    NewLine,
    Slices,
  },
  computed: {
    ...mapState({
      loading: state => state.computedData.loading,
    }),
    mainTodaysValue() {
      return this.$store.getters.getMainTodaysValue
    },
    mainTodaysGain() {
      return this.$store.getters.getMainTodaysGain
    },
    mainTodaysDividen() {
      return this.$store.getters.getMainTodaysDividend
    },
    mainTodaysReturn() {
      return this.$store.getters.getMainTodaysReturn
    },
    mainDoughnutData() {
      return this.$store.getters.getMainDoughnutData
    },
    mainLineChartData() {
      return this.$store.getters.getMainLineChartData
    },
    mainTableData() {
      return this.$store.getters.getMainTableData
    },
  },
}
</script>
