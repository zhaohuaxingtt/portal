<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-18 09:48:38
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <i-dialog :visible.sync="value" width="90%" @close="clearDiolog">
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <i-button>{{$t('LK_BAOCUN')}}</i-button>
      </div>
    </div>
    <div class="changeContent">
      <table-list :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" :index="true" :selectProps="['isActivity']" :selectPropsOptionsObject="{isActivity:[
      {
        code:true,
        name:'是',
        key:'SUPPLIER_SHI'
      },
      {
        code:false,
        name:'否',
        key:'SUPPLIER_FOU'
      }
      ]}">
      </table-list>
    </div>
  </i-dialog>
</template>

<script>
import { iDialog, iButton } from 'rise'
import tableList from '@/components/commonTable'
import { dialogTableTitle } from './data'

export default {
  components: {
    iDialog,
    tableList, iButton
  },
  props: {
    value: { type: Boolean }
  },
  data() {
    return {
      tableListData: [],
      tableTitle: dialogTableTitle,
      tableLoading: false,
      selectTableData: []
    }
  },
  created() {

  },
  methods: {
    clearDiolog() {
      this.$emit("input", false);
    },
    handleSelection(e) {
      this.$emit('handleSelection', e)
      this.clearDiolog()
    }
  }
}
</script>

<style scoped lang="scss">
.changeContent {
  padding: 0px 10px 20px 10px;
}
</style>