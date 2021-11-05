<!--
 * @Author: qyu
 * @Date: 2021-08-10 14:33:59
 * @LastEditTime: 2021-08-13 10:05:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mainData\car\components\detailConfig.vue
-->
<template>
  <iCard
    :title="$t('车型配置')"
    header-control
    collapse
    class="detail-config-list"
  >
    <detailConfigList
      class="margin-bottom20"
      :data="detailConfigData"
      :loading="configLoading"
      @save-success="queryCartypeConfigVersionList"
      @reset="val => (detailConfigData = val)"
    />

    <el-divider />

    <detailConfigModify
      :data="detailConfigItems"
      :config-versions="detailConfigData"
      @save-success="queryCartypeConfigVersionList"
    />
  </iCard>
</template>

<script>
import { iCard } from 'rise'
import detailConfigList from './detailConfigList'
import detailConfigModify from './detailConfigModify'
import { CAR_CONFIG_EDIT_ROW } from './data'
import { fetchCartypeConfigVersionList } from '@/api/mainData/car'
export default {
  name: 'detailConfig',
  components: { iCard, detailConfigList, detailConfigModify },
  data() {
    return {
      configLoading: false,
      detailConfigData: [],
      detailConfigItems: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    changeEditable(key, value) {
      this.editableMap[key] = value
    },
    init() {
      this.queryCartypeConfigVersionList()
    },
    addConfigModify() {
      this.detailConfigItems.push({
        ...CAR_CONFIG_EDIT_ROW,
        createBy: this.$store.state.permission.userInfo.id,
        cartypeId: this.$route.query.id
      })
    },
    async queryCartypeConfigVersionList() {
      this.configLoading = true
      const { data } = await fetchCartypeConfigVersionList({
        cartypeId: this.$route.query.id
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
