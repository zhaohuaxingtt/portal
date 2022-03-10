<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <div v-loading="onLoading">
    <factoryMap :factoryAddressVOList='factoryAddressVOList'
                :supplier360ViewVO='supplier360ViewVO'
                :isShowAll="isShowAll"
                class="margin-bottom20" />
    <earlyWarning :financialEarlyWarningVO='financialEarlyWarningVO'
                  :supplier360ViewVO='supplier360ViewVO'
                  v-if="isShowAll"
                  class="margin-bottom25" />
    <affiliatedCompany :groupRelationsVO='groupRelationsVO'
                       :relatedCompanyVO='relatedCompanyVO'
                       v-if="isShowAll" />
  </div>
</template>

<script>
import { tabRouterList } from "../list/data";
import { getProfile } from "@/api/basic/basic";
import factoryMap from "./components/factoryMap";
import earlyWarning from "./components/earlyWarning";
import affiliatedCompany from "./components/affiliatedCompany";
export default {
  components: {
    factoryMap, earlyWarning, affiliatedCompany
  },
  data () {
    return {
      tabRouterList,
      factoryAddressVOList: [],
      supplier360ViewVO: {},
      financialEarlyWarningVO: [],
      relatedCompanyVO: [],
      isShowAll: false,
      onLoading: false
    }
  },
  created () {
    this.isShowAll = Boolean(this.$route.query.isShowAll);
    this.handleInit()
  },
  methods: {
    async handleInit () {
      this.onLoading = true
      const pms = {
        subSupplierId: this.$route.query.subSupplierId,
        supplierType: this.$route.query.supplierType
      }
      const res = await getProfile(pms)
      if (res?.code === '200') {
        this.onLoading = false
        this.factoryAddressVOList = res.data.factoryAddressVOList
        this.supplier360ViewVO = res.data.supplier360ViewVO
        this.financialEarlyWarningVO = res.data.financialEarlyWarningVO
        this.relatedCompanyVO = res.data.relatedCompanyVO
        this.groupRelationsVO = res.data.groupRelationsVO
      }

    }
  }
}
</script>

<style lang='scss' scoped>
.header {
  display: flex;
  justify-content: space-between;
}
</style>
