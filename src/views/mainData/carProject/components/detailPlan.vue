<template>
  <iCard
    title="车型项目产量计划"
    class="margin-bottom20"
    header-control
    collapse
  >
    <detailPlanList
      class="margin-bottom20"
      :data="detailPlanData"
      :loading="loading"
      :planListStatus="planListStatus"
      @add-version="addVersion"
      @save-success="savePlanDataSuccess"
      @edit-change="editChange"
      @reset="val => (detailPlanData = val)"
    />
    <el-divider v-show="detailPlanVersions.length > 0" />

    <!-- 详细产量计划 -->
    <detailPlanModify
      ref="detailPlanModify"
      :versions="detailPlanVersions"
      :default-version="defaultVersion"
      :versionListStatus="versionListStatus"
      @save-success="savePlanModifySuccess"
      @edit-change="editChange"
    />
  </iCard>
</template>

<script>
import { iCard } from 'rise'
import detailPlanList from './detailPlanList'
import detailPlanModify from './detailPlanModify'
import { fetchCarProjectPlanVersionList } from '@/api/mainData/carProject'
export default {
  name: 'detailPlan',
  inheritAttrs: true,
  components: { iCard, detailPlanList, detailPlanModify },
  computed: {
    triggerQueryPlan() {
      return this.$store.state.mainData.mainDataQueryPlan
    }
  },
  watch: {
    triggerQueryPlan() {
      this.queryCartypeOutputPlanVersion()
    }
  },
  data() {
    return {
      versionListStatus: false,
      planListStatus: false,
      detailPlanData: [],
      detailPlanVersions: [],
      defaultVersion: '',
      loading: false
    }
  },
  created() {
    this.queryCartypeOutputPlanVersion()
  },
  methods: {
    // 查询列表
    async queryCartypeOutputPlanVersion() {
      this.loading = true
      const { data } = await fetchCarProjectPlanVersionList({
        cartypeProId: this.$route.query.id
      }).finally(() => (this.loading = false))
      this.detailPlanData = data || []
      this.detailPlanVersions = []

      for (let i = 0; i < this.detailPlanData.length; i++) {
        const element = this.detailPlanData[i]
        if (element.isValid) {
          this.defaultVersion = element.riseVersionCode
        }
        this.detailPlanVersions.push(element.riseVersionCode)
      }
    },
    editChange(key, state) {
      // console.log('00000000')
      if (key == 'version') {
        this.versionListStatus = state
        // console.log('Version===')
      } else if (key == 'plan') {
        this.planListStatus = state
        // console.log('Plan===')
      }
    },
    addVersion() {
      console.log('add version')
      this.$refs.detailPlanModify.addVersion()
    },
    savePlanModifySuccess() {
      this.queryCartypeOutputPlanVersion()
    },
    savePlanDataSuccess() {
      this.queryCartypeOutputPlanVersion()
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-plan-item {
  margin-bottom: 30px;
}
</style>
