<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditors: zbin
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ws3\generalPage\mainSubSuppliersAndProductNames\index.vue
-->
<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">受控记录</span>
      <div class="floatright">
        <i-button v-permission="SUPPLIER_MATERIALGROUP_LIST_SAVE" @click="exportsTable">{{ $t('LK_DAOCHU') }}</i-button>
      </div>
    </div>
    <table-list
        v-permission="SUPPLIER_MATERIALGROUP_RECORD"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :index="true"
        @handleSelectionChange="handleSelectionChange"
    />
  </i-card>
</template>

<script>
import {iCard, iButton, iMessage} from "rise";
import {generalPageMixins} from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import {controllerRecordTableTitle} from './data'
import { getPageControlRecord } from "../../../../api/supplier360/material";


export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    tableList
  },
  data() {
    return {
      tableListData: [
      ],
      tableTitle: controllerRecordTableTitle,
      tableLoading: false,
      selectTableData: []
    }
  },
  created(){
    this.getTableList()
  },
  methods: {
    async getTableList() {
      this.tableLoading = true
      const pms = {
        pageNo: 1,
        pageSize: 10
      }
      const res = await getPageControlRecord(pms)
      this.tableListData = res.data
      this.tableLoading = false
    },
    handleOpenPage() {
    }
  }
}
</script>

<style scoped>

</style>