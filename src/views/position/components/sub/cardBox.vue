<template>
  <div class="card-list" v-loading="loading">
    <position-card
      class="margin-bottom20"
      v-for="(item, index) in positionList"
      :key="index"
      :item="item"
      :deptId="deptId"
    ></position-card>
  </div>
</template>

<script>
import positionCard from './positionCard'
export default {
  components: { positionCard },
  props: {
    deptId: {
      type: Number
    }
  },
  computed: {
    positionList() {
      return this.$store.state.subPosition.subPositionList
    },
    loading() {
      return this.$store.state.subPosition.getSubPositionLoading
    }
  }
}
</script>
<style lang="scss" scoped>
.card-list {
  min-height: 200px;
}
</style>
