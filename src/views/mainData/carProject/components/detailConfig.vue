<template>
  <iCard
    :title="language('车型项目配置')"
    header-control
    collapse
    class="detail-config-list"
  >
    <detailConfigList
      class="margin-bottom20"
      :data="detailConfigData"
      :loading="configLoading"
      :configListStatus="configListStatus"
      @edit-change="editChange"
      @save-success="queryCarTypeProConfigGroup"
      @reset="val => (detailConfigData = val)"
    />

    <el-divider />

    <detailConfigModify
      :data="detailConfigItems"
      :config-versions="detailConfigData"
      :versionListStatus="versionListStatus"
      @save-success="queryCarTypeProConfigGroup"
      @edit-change="editChange"
    />
  </iCard>
</template>

<script>
import { iCard } from 'rise'
import detailConfigList from './detailConfigList'
import detailConfigModify from './detailConfigModify'
import { CAR_PROJECT_CONFIG_EDIT_ROW } from './data'
import { fetchCarTypeProConfigGroup } from '@/api/mainData/carProject'
export default {
  name: 'detailConfig',
  components: { iCard, detailConfigList, detailConfigModify },
  data() {
    return {
      configLoading: false,
      versionListStatus: false,
      configListStatus: false,
      detailConfigData: [],
      detailConfigItems: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.queryCarTypeProConfigGroup()
    },
    editChange(key, state) {
      // console.log("9999")
      if (key == 'version') {
        this.versionListStatus = state
      } else if (key == 'config') {
        this.configListStatus = state
      }
    },
    addConfigModify() {
      this.detailConfigItems.push({
        ...CAR_PROJECT_CONFIG_EDIT_ROW,
        createBy: this.$store.state.permission.userInfo.id,
        cartypeId: this.$route.query.id
      })
    },
    async queryCarTypeProConfigGroup() {
      this.configLoading = true
      const { data } = await fetchCarTypeProConfigGroup({
        carTypeProId: this.$route.query.id
      }).finally(() => (this.configLoading = false))
      this.detailConfigData = data || []
      if (!data || data.length === 0) {
        this.addConfigModify()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-config-modify-item {
  margin-bottom: 30px;
}
</style>
