<!--
 * @Author: youyuan
 * @Date: 2021-08-30 11:30:17
 * @LastEditTime: 2021-10-25 11:31:59
 * @LastEditors: Please set LastEditors
 * @Description: 年度预算明细
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\annualGeneralBudget\annualBudget\components\detail.vue
-->
<template>
  <div>
    <iDialog  :visible.sync="value" width="80%" @close='closeDialog'>
      <div class="dialogBox">
        <div class="headerBox">
          <el-tabs v-model="activeName" @tab-click="handleClickTab">
            <el-tab-pane v-for="item in navList" :key="item.value" :label="language(item.key, item.name)" :name="item.value"></el-tab-pane>
          </el-tabs>
          <el-tooltip :content="language('RXTZQLXNDYSFZR', '如需调整，请联系年度预算负责人')" placement="top" effect="light">
            <i class="el-icon-warning-outline titleIcon"></i>
          </el-tooltip>
        </div>
        <div class="contentBox padding-top30">
          <materialGroup :forecastId="forecastId" v-if="activeName == 1"/>
          <partInfo :forecastId="forecastId" v-if="activeName == 2" :num="num" />
        </div>
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iDialog } from 'rise'
import { navList } from './data'
import materialGroup from './materialGroup'
import partInfo from './partInfo'
export default {
  components: {
    iDialog,
    materialGroup,
    partInfo
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    num:{
      type:String,
      default: null
    },
    forecastId: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      navList,
      activeName: 1,
      materialData: [],
      partData: []
    }
  },
  created() {
  },
  methods: {
    
    // 关闭弹窗
    closeDialog() {
      this.$emit('handleCloseDialog')
    },
  }
}
</script>

<style lang='scss' scoped>
.dialogBox {
  position: relative;
  .headerBox {
    display: flex;
    position: absolute;
    top: -40px;
    .titleIcon {
      transform: rotate(180deg);
      color: #A0BFFC;
      margin-left: 20px;
      margin-bottom: 20px;
      font-size: 24px;
    }
  }
}

</style>
