<template>
  <div class="columns">
    <div class="column is-two-fifths">
      <div class="section">
        <p class="subtitle is-4" v-if="loading">{{ $t('loading') }}</p>
        <Doughnut
          v-else
          :data="doughnutDoughnutData"
          :label="doughnutLabel"
          :todaysValue="doughnutTodaysValue"
        />
      </div>
    </div>
    <div class="column is-three-fifths">
      <div class="section">
        <p class="subtitle is-4" v-if="loading">{{ $t('loading') }}</p>
        <Dashboard
          v-else
          :loading="loading"
          :label="doughnutLabel"
          :todaysValue="doughnutTodaysValue"
          :todaysGain="doughnutTodaysGain"
          :todaysDividend="doughnutTodaysDividen"
          :todaysReturn="doughnutTodaysReturn"
        />
      </div>
      <div class="section">
        <div>
          <p v-if="loading">{{ $t('loading') }}</p>
          <NewLine v-else :data="doughnutLineChartData" />
        </div>
      </div>
      <div class="section">
        <h2 class="title is-2">{{ $t('slices') }}</h2>
      </div>
      <div class="section">
        <p v-if="loading">{{ $t('loading') }}</p>
        <Slices v-else :table-data="doughnutTableData" />
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
  created() {
    this.$store.watch(
      (state, getters) => getters.getDoughnutDoughnutData,
      (newValue, oldValue) => {
        console.log(`Updating from ${oldValue} to ${newValue}`)

        // Do whatever makes sense now
        // if (newValue === 'success') {
        //   this.complex = {
        //     deep: 'some deep object',
        //   }
        // }
      }
    )
  },
  computed: {
    ...mapState({
      loading: state => state.computedData.loading,
    }),
    doughnutLabel() {
      return this.$store.getters.getDoughnutLabel(this.id)
    },
    doughnutTodaysValue() {
      return this.$store.getters.getDoughnutTodaysValue(this.id)
    },
    doughnutTodaysGain() {
      return this.$store.getters.getDoughnutTodaysGain(this.id)
    },
    doughnutTodaysDividen() {
      return this.$store.getters.getDoughnutTodaysDividend(this.id)
    },
    doughnutTodaysReturn() {
      return this.$store.getters.getDoughnutTodaysReturn(this.id)
    },
    doughnutDoughnutData() {
      return this.$store.getters.getDoughnutDoughnutData(this.id)
    },
    doughnutLineChartData() {
      return this.$store.getters.getDoughnutLineChartData(this.id)
    },
    doughnutTableData() {
      return this.$store.getters.getDoughnutTableData(this.id)
    },
  },
}
</script>
