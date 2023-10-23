<!--
 * @Author: your name
 * @Date: 2021-11-09 15:26:31
 * @LastEditTime: 2022-01-13 11:23:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\views\supplierManagement\KPI\supplierKpiTreeTable.vue
-->
<template>
  <div>
    <div class="tabs">
      <div :class="!isShowImgKpi?'current':''"
           style="font-size:16px"
           @click="isShowImgKpi=false">查看</div>
      <div :class="isShowImgKpi?'current':''"
           style="font-size:16px"
           @click="isShowImgKpi=true">维护</div>
    </div>
    <template v-if="!isShowImgKpi">
      <Viewkpi />
    </template>
    <template v-if="isShowImgKpi">
      <ImgKpi style="margin-top:20px" />
    </template>
  </div>
</template>

<script>
import ImgKpi from './imgKpi'
import Viewkpi from './view'
export default {
  components: {
    ImgKpi,
    Viewkpi
  },
  data () {
    return {
      isShowImgKpi: false,
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.tabs {
  width: 208px;
  height: 35px;
  background: #f5f6f7;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
  opacity: 1;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  line-height: 35px;
  div:first-child {
    width: 104px;
    height: 35px;
    text-align: center;
    cursor: pointer;
    border-radius: 10px 0 0 10px;
  }
  div:last-child {
    width: 104px;
    height: 35px;
    text-align: center;
    cursor: pointer;
    border-radius: 0 10px 10px 0;
  }
  .current {
    background: #fff !important;
    // font-size: 16px;
    color: #67C23A !important;
    font-weight: bold !important;
  }
}
</style>