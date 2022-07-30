<template>
  <div >
    {{ goons }}
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    goons: []
  }),
  async fetch() {
    this.goons = await this.$http.$get('/api/get-goons')
  },
  fetchOnServer: false,
})
</script>
