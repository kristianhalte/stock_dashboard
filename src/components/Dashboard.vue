<template>
  <div>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h2 class="title is-2">{{ label }}</h2>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div>
            <div class="buttons is-marginless">
              <button
                class="button is-rounded"
                @click="$router.push('/doughnuts/0')"
              >
                1D
              </button>
              <button
                class="button is-rounded"
                @click="$router.push('/doughnuts/1')"
              >
                1W
              </button>
              <button
                class="button is-rounded"
                @click="$router.push('/doughnuts/2')"
              >
                1M
              </button>
              <button
                class="button is-rounded"
                @click="$router.push('/doughnuts/3')"
              >
                1Q
              </button>
              <button
                class="button is-rounded"
                @click="$router.push('/doughnuts/4')"
              >
                1Y
              </button>
              <button
                class="button is-rounded is-primary"
                @click="$router.push('/doughnuts/5')"
              >
                All
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
          {{ todaysValue | numFormat('$0,0.00') }}
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
            todaysGain + todaysDividend >= 0
              ? 'has-text-primary'
              : 'has-text-danger',
          ]"
        >
          {{ (todaysGain + todaysDividend) | numFormat('+$-0,0.00') }}
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
          v-bind:class="[
            todaysReturn >= 0 ? 'has-text-primary' : 'has-text-danger',
          ]"
        >
          {{ todaysReturn | numFormat('+0,0.00%') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashbaord',
  props: [
    'loading',
    'label',
    'todaysValue',
    'todaysGain',
    'todaysDividend',
    'todaysReturn',
  ],
}
</script>
