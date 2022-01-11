<template>
  <iCard tabCard class="margin-bottom20">
    <div class="group-box flex-align-center">
      <div class="base-info flex-align-center">
        <div class="margin-right20">{{ deptDetail.nameZh }}</div>
        <div>负责人：{{ deptDetail.leaderName || '暂无' }}</div>
      </div>
      <div class="group-tip margin-left20">
        <div v-if="materialUndistributed.length">
          <span @click="handleOpenDialog" class="open-link-text">{{
            materialUndistributed.length
          }}</span>
          个材料组未分配完
        </div>
        <div v-else>所有材料组均已分配完</div>
      </div>
    </div>
    <material-dialog :show.sync="showDialog" />
  </iCard>
</template>

<script>
import { iCard } from 'rise'
import materialDialog from './materialDialog'
export default {
  components: { iCard, materialDialog },
  props: {
    deptId: {
      type: String
    }
  },
  data() {
    return {
      showDialog: false
    }
  },
  computed: {
    deptDetail() {
      return this.$store.state.subPosition.deptDetail
    },
    materialUndistributed() {
      return this.$store.state.subPosition.materialUndistributed
    }
  },
  methods: {
    handleOpenDialog() {
      this.showDialog = true
    }
  }
}
</script>
