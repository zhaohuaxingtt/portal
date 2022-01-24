<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2021-04-13 17:30:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ws3\generalPage\mainSubSuppliersAndProductNames\index.vue
-->
<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <i-button @click="exportsTable" v-if="showExportsButton" v-permission="SUPPLIER_CHANGEHISTORY_TABLE_EXPORT">{{ $t('LK_DAOCHU') }}</i-button>
      </div>
    </div>
        <!-- v-permission="SUPPLIER_CHANGEHISTORY_TABLE" -->
    <table-list
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :index="true"
        @handleSelectionChange="handleSelectionChange"
    />
  </i-card>
</template>

<script>
import {iCard, iButton} from "rise";
import {generalPageMixins} from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import {tableTitle} from './data'
import {getSupplierEditList} from "../../../../api/supplier360/systemModificationHistory";


export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    tableList
  },
  data() {
    return {
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: []
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    async getTableList(otherParams = {}) {
      this.tableLoading = true
      const req = {
        pageNo: 1,
        pageSize: 9999,
        ...otherParams
      }
      try {
        const res = await getSupplierEditList(req)
        this.tableListData = res.data ? res.data.list : []
        this.tableLoading = false
      } catch {
        this.tableLoading = false
      }
    }
  }
}
</script>

<style scoped>

</style>