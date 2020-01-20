<template>
  <b-table
    :data="tableData"
    :columns="columns"
    :hoverable="true"
    @click="goToDoughnut"
  >
    <template slot-scope="props">
      <b-table-column style="vertical-align:middle">
        <span class="is-vcentered">{{ props.row.label }}</span>
      </b-table-column>

      <b-table-column class="has-text-right" style="vertical-align:middle">
        {{ props.row.todaysValue | numFormat('$0,0.00') }}
      </b-table-column>

      <b-table-column class="has-text-right">
        <span
          v-bind:class="[
            props.row.todaysGain >= 0 ? 'has-text-primary' : 'has-text-danger',
          ]"
          >{{ props.row.todaysGain | numFormat('+$-0,0.00') }}</span
        >
        <br />
        (<span
          :class="
            props.row.todaysReturn >= 0
              ? 'has-text-primary'
              : 'has-text-danger',
          "
        >
          <b-icon
            v-if="props.row.todaysReturn !== 0"
            pack="fas"
            :icon="props.row.todaysReturn > 0 ? 'caret-up' : 'caret-down'"
            size="is-small"
          ></b-icon>
          {{ props.row.todaysReturn | numFormat('0,0.00%') }} </span
        >)
      </b-table-column>

      <b-table-column class="has-text-right">
        <span>{{ props.row.todaysActual | numFormat('0,0[.]0%') }}</span>
        <br />
        <span class="has-text-weight-semibold">{{
          props.row.target | numFormat('0,0[.]0%')
        }}</span>
      </b-table-column>
    </template>
  </b-table>
</template>

<script>
export default {
  name: 'Slices',
  props: {
    tableData: {
      type: Array,
      default: null,
    },
  },
  methods: {
    goToDoughnut(item) {
      this.$router.push({ path: `/doughnut/${item.id}` })
    },
  },
  data() {
    return {
      columns: [
        {
          field: 'label',
          label: 'Name',
        },
        {
          field: 'todaysValue',
          label: 'Value',
          centered: true,
        },
        {
          field: 'todaysGain',
          label: 'Gain (return)',
          centered: true,
        },
        {
          field: 'todaysActual',
          label: 'Actual/Target',
          centered: true,
        },
      ],
    }
  },
}
</script>
