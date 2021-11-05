<!--
 * @Author: youyuan
 * @Date: 2021-09-27 15:12:49
 * @LastEditTime: 2021-10-18 21:07:46
 * @LastEditors: Please set LastEditors
 * @Description: 上传点价单错误信息展示弹窗
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\dataBase\preciousMetalMarketPriceInquiry\components\orderDialog.vue
-->
<template>
  <div>
    <iDialog  :visible.sync="value" width="80%" @close='closeDiolog'>
      <p class="errorTitle" slot="title">{{language('CUOWUXINXI', '错误信息')}}</p>
      <tableList
        class="table"
        ref="commonTable"
        :tableData="data"
        :tableTitle="tableTitle"
        :selection="false"
        :index="index">
      </tableList>
    </iDialog>
  </div>
</template>

<script>
import { iDialog } from 'rise'
import tableList from '@/components/commonTable';
export default {
  components: {
    iDialog,
    tableList
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    },
    tableTitle: {
      type: Array,
      default: () => []
    },
    index: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  created() {
    
  },
  methods: {
    closeDiolog() {
      this.$emit('handleCloseDialog')
    }
  }
}
</script>

<style lang='scss' scoped>
.errorTitle {
  font-size: 18px;
  font-weight: bold;
  color: #DD292A;
}
.table {
  padding-bottom: 20px;
}
 
</style>
