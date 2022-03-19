<template>
  <div class="search-box flex-between-center-center margin-bottom2">
    <div class="input-box flex-align-center margin-right30">
      <div
        v-for="(item, index) in query"
        :key="index"
        :class="!index && 'margin-right68'"
      >
        <iLabel
          :label="language(query[index].label)"
          slot="label"
          class="labelfont"
        ></iLabel>
        <i-input v-model="query[index].value" class="search-input" />
      </div>
    </div>
    <div class="btn-box margin-top25">
      <iButton @click="handleConfirm">{{ language('查询') }}</iButton>
      <iButton @click="handleReset">{{ language('重置') }}</iButton>
      <slot />
    </div>
  </div>
</template>

<script>
import { iLabel, iInput, iButton } from 'rise'
export default {
  components: { iLabel, iInput, iButton },
  props: {
    type: {
      type: String
    },
    query: {
      type: Array
    }
  },
  methods: {
    handleConfirm() {
      const data = { type: this.type, params: this.query }
      this.$store.commit('SET_LIST_QUERY', data)
      if (this.type === 'pos') {
        this.$store.dispatch('GetPositionList', data)
      } else {
        const flag = this.query.find((item) => {
          return item.value
        })
        if (flag) {
          this.$store.commit('SET_ORG_QUERY_FLAG', true)
          this.$store.commit('SET_ORG_ARRAYLIST_QUERY')
        } else {
          this.$store.commit('SET_ORG_QUERY_FLAG', false)
          this.$store.commit('SET_ORG_ARRAYLIST_QUERY')
        }
      }
    },
    handleReset() {
      this.query.map((item) => {
        this.$set(item, 'value', '')
      })
      const data = { type: this.type, params: this.query }
      this.$store.commit('SET_LIST_QUERY', data)
      if (this.type === 'pos') {
        this.$store.dispatch('GetPositionList', data)
      } else {
        this.$store.commit('SET_ORG_QUERY_FLAG', false)
        this.$store.commit('SET_ORG_ARRAYLIST_QUERY')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.labelfont {
  font-size: 14px;
  margin-bottom: 6px;
}
</style>
