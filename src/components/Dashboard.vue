<template>
  <div>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h2 class="title is-2" v-if="loading">{{ $t('loading') }}</h2>
          <h2 class="title is-2" v-else>{{ label }}</h2>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div>
            <div class="buttons is-marginless">
              <button
                v-for="button in buttons"
                class="button is-rounded"
                :class="{ 'is-primary': button.value === activeButton }"
                @click="datePicker(button.value)"
                :key="button.value"
              >
                {{ button.label }}
              </button>
            </div>
            <p class="has-text-right has-text-grey">
              Performance since Jan 01, 2020
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <p class="title is-6">{{ $t('value') }}</p>
        <p class="subtitle is-4" v-if="loading">{{ $t('loading') }}</p>
        <p class="subtitle is-4" v-else>
          {{ value | numFormat('$0,0.00') }}
        </p>
      </div>
      <div class="column">
        <p class="title is-6 has-text-right">{{ $t('gain') }}</p>
        <p class="subtitle is-4 has-text-right" v-if="loading">
          {{ $t('loading') }}
        </p>
        <p
          class="subtitle is-4 has-text-right"
          v-else
          v-bind:class="[
            gain + dividend >= 0 ? 'has-text-primary' : 'has-text-danger',
          ]"
        >
          {{ (gain + dividend) | numFormat('+$-0,0.00') }}
        </p>
      </div>
      <div class="column">
        <p class="title is-6 has-text-right">{{ $t('return') }}</p>
        <p class="subtitle is-4 has-text-right" v-if="loading">
          {{ $t('loading') }}
        </p>
        <p
          class="subtitle is-4 has-text-right"
          v-else
          v-bind:class="[returns >= 0 ? 'has-text-primary' : 'has-text-danger']"
        >
          {{ returns | numFormat('+0,0.00%') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashbaord',
  props: ['loading', 'label', 'value', 'gain', 'dividend', 'returns'],
  data() {
    return {
      buttons: [
        { value: 'd', label: '1D' },
        { value: 'w', label: '1W' },
        { value: 'm', label: '1M' },
        { value: 'q', label: '1Q' },
        { value: 'y', label: '1Y' },
        { value: 'a', label: 'All' },
      ],
      activeButton: this.$store.state.dateRange,
    }
  },
  methods: {
    datePicker(value) {
      this.$store.commit('updateDateRange', value)
      this.activeButton = value
    },
  },
}
</script>
