<template>
  <div class="columns">
    <div class="column is-two-fifths">
      <div class="section">
        <p class="subtitle is-4" v-if="loading">{{ $t('loading') }}</p>
        <p class="subtitle is-4" v-else>Done Loading</p>
      </div>
    </div>
    <div class="column is-three-fifths">
      <div class="section">
        <p class="subtitle is-4" v-if="loading">{{ $t('loading') }}</p>
        <p class="subtitle is-4" v-else>Done Loading</p>
      </div>
      <div class="section">
        <div>
          <p v-if="loading">{{ $t('loading') }}</p>
          <p v-else>Done Loading</p>
        </div>
      </div>
      <div class="section">
        <h2 class="title is-2">{{ $t('slices') }}</h2>
      </div>
      <div class="section">
        <p v-if="loading">{{ $t('loading') }}</p>
        <p v-else>Done Loading</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'home',
  computed: {
    ...mapState({
      loading: state => state.loading,
    }),
  },
}
</script>
