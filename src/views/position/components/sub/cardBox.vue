<template>
  <iCard tabCard class="card-list">
    <position-card
      class="margin-bottom20"
      v-for="(item, index) in positionList"
      :key="index"
      :item="item"
      :deptId="deptId"
    ></position-card>
  </iCard>
</template>

<script>
import positionCard from './positionCard'
import { iCard } from 'rise'
export default {
  components: { iCard, positionCard },
  props: {
    deptId: {
      type: Number
    }
  },
  computed: {
    positionList() {
      return this.$store.state.subPosition.subPositionList
    }
  }
}
</script>
