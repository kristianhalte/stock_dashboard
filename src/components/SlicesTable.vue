<template>
  <b-table
    :data="tableData"
    :columns="columns"
    :hoverable="true"
    @click="goToSlice"
    :default-sort="['target', 'desc']"
  >
    <template slot-scope="props">
      <b-table-column style="vertical-align:middle;">
        <span class="is-vcentered">{{ props.row.label }}</span>
      </b-table-column>

      <b-table-column class="has-text-right" style="vertical-align:middle;">
        {{ props.row.value | numFormat('$0,0.00') }}
      </b-table-column>

      <b-table-column class="has-text-right">
        <span
          v-bind:class="[
            props.row.gain >= 0 ? 'has-text-primary' : 'has-text-danger',
          ]"
          >{{ props.row.gain | numFormat('+$-0,0.00') }}</span
        >
        <br />
        (<span
          :class="
            props.row.returns >= 0
              ? 'has-text-primary'
              : 'has-text-danger',
          "
        >
          <b-icon
            v-if="props.row.returns !== 0"
            pack="fas"
            :icon="props.row.returns > 0 ? 'caret-up' : 'caret-down'"
            size="is-small"
          ></b-icon>
          {{ props.row.returns | numFormat('0,0.00%') }} </span
        >)
      </b-table-column>

      <b-table-column class="has-text-right">
        <span>{{ props.row.actual | numFormat('0,0[.]0%') }}</span>
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
  props: ['tableData', 'routeTo'],
  methods: {
    goToSlice(item) {
      if (this.routeTo) {
        this.$router.push({ path: `/${this.routeTo}/${item.id}` })
      } else {
        console.log('No route')
      }
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
          field: 'value',
          label: 'Value',
          centered: true,
        },
        {
          field: 'gain',
          label: 'Gain (return)',
          centered: true,
        },
        {
          field: 'actual',
          label: 'Actual/Target',
          sortable: true,
        },
        {
          field: 'target',
          label: 'Sortable',
          sortable: true,
          visible: false,
        },
      ],
    }
  },
}
</script>
