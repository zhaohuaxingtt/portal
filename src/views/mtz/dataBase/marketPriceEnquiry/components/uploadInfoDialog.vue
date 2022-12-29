<!--
 * @Author: youyuan
 * @Date: 2021-09-27 15:12:49
 * @LastEditTime: 2022-12-26 19:27:12
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: 上传点价单错误信息展示弹窗
 * @FilePath: \front-portal\src\views\mtz\dataBase\marketPriceEnquiry\components\uploadInfoDialog.vue
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
        <template #budget="scope">
          <p>{{moneyInfo(scope.row['budget'])}}</p>
        </template>
      </tableList>
    </iDialog>
  </div>
</template>

<script>
import { iDialog } from 'rise'
import tableList from '@/components/commonTable';
import { money, moneyInfo } from '@/views/mtz/moneyComputation'
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
    money, moneyInfo,
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
