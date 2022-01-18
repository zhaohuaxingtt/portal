<!--
 * @Date: 2021-12-16 18:06:53
 * @LastEditors: caopeng
 * @LastEditTime: 2022-01-17 18:17:46
 * @FilePath: \front-portal-new\src\views\opcsSupervise\opcsPermission\application\userManage\components\systeamDetailAdd.vue
-->

<template>
  <iDialog :visible.sync="value"
           width="90%"
           v-if="value"
           top="2%"
           append-to-body
           @close="closeDiolog"
           :title="language('GUANLIANYINGYONG', '关联应用')">
    <div class="btnbox">
      <i-button @click="add">{{ language('QUEREN', '确认') }}
      </i-button>
    </div>
    <table-list  style="padding-bottom:20px" :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                @handleSelectionChange="handleSelectionChange"
                :index="true"
                ref="commonTable">

    </table-list>
  </iDialog>
</template>

<script>
import tableList from '@/components/commonTable'
import { iDialog, iButton, iMessage } from 'rise'
import { tableTitleDetailAdd } from './data'
import {  relateQuery } from '@/api/opcs/system'
export default {
  components: {
    iDialog,
    iButton,
    tableList
  },
  props: {
    value: { type: Boolean },
    rowList: { type: Object }
  },
  watch:{
  },
  data() {
    return {
        
      tableLoading: false,
      tableTitle: tableTitleDetailAdd,
      selectTableData: [],
      tableListData: []
    }
  },
  created() {
      this.getTableData()
  },
  methods: {
    //获取列表接口
    getTableData() {
      this.tableLoading = true
      const params = {
        opcsSupplierId: this.$route.query.opcsSupplierId,
   
      }
      relateQuery(params).then((res) => {
        this.tableLoading = false
        if (res && res.code == 200) {
          this.tableListData = res.data
        } else iMessage.error(res.desZh)
      })
    },
  add(){
      this.$emit('save',this.selectTableData)
      this.closeDiolog()
        // iMessage.success(this.language('CAOZUOCHENGGONG', '操作成功'))
  },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val

    },
    closeDiolog() {
        this.$emit('closeDiolog')
    }
  }
}
</script>

<style>
.btnbox {
  text-align: right;
  padding: 0 0 20px 0px;
}
</style>