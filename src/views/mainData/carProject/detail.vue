<template>
  <iPage>
    <pageHeader class="margin-bottom20">
      {{ language($route.query.id ? '编辑' : '新增') }}{{language('车型项目主数据')}}
    </pageHeader>
    <baseInfo @save-success="saveSuccess" @PEPData="PEPData" />
    <detailPlan v-if="carProjectID" />
    <detailPEP v-if="carProjectID" :pepData="pepData" />
    <detailConfig v-if="carProjectID" />
  </iPage>
</template>

<script>
import { iPage } from 'rise'
import pageHeader from '@/components/pageHeader'
import baseInfo from './components/baseInfo'
import detailPlan from './components/detailPlan'
import detailPEP from './components/detailPEP'
import detailConfig from './components/detailConfig'
export default {
  methods: {
    saveSuccess(data) {
      //保存成功之后的ID
      console.log(data)
      this.carProjectID = data
    },
    queryBaseInfo() {
      //
    },
    PEPData(data) {
      this.pepData = data
    }
  },

  created() {
    if (this.carProjectID && this.carProjectID.length > 0) {
      this.queryBaseInfo()
    }
  },
  computed: {
    carProjectID() {
      return this.$route.query.id
    }
  },
  data() {
    return {
      pepData: {}
    }
  },
  components: {
    iPage,
    pageHeader,
    baseInfo,
    detailPlan,
    detailPEP,
    detailConfig
  }
}
</script>

<style lang="scss" scoped>
// .header-title{
//   font-size: 20px;
// }
</style>
