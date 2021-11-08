<template>
  <div class="search-box flex-between-center-center margin-bottom20">
    <div class="input-box flex-between-center-center margin-right30">
      <div v-for="(item, index) in query" :key="index" :class="'margin-right68'">
        <iLabel :label="query[index].label" slot="label"></iLabel>
        <i-input v-model="query[index].value" class="search-input"/>
      </div>
    </div>
      <div class="btn-box margin-top25">
        <iButton @click="handleConfirm">{{ $t('LK_INQUIRE') }}</iButton>
        <iButton @click="handleReset">{{ $t('LK_ZHONGZHI') }}</iButton>
      </div>
  </div>
</template>

<script>
import { iLabel, iInput, iButton } from 'rise'
export default {
  components: { iLabel, iInput, iButton },
  props: {
    query: {
      type: Array
    },
  },
  methods: {
    handleConfirm() {
      this.$store.commit('SET_ROLELIST_QUERY', this.query)
      this.$store.dispatch('GetRoleList', this.query)
      
    },
    handleReset() {
      this.query.map(item => {
        this.$set(item, 'value', '')
      })
      this.$store.commit('SET_ROLELIST_QUERY', this.query)
      this.$store.dispatch('GetRoleList', this.query)
    },
  },
}
</script>
