<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2022-03-03 17:37:39
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ws3\generalPage\mainSubSuppliersAndProductNames\index.vue
-->
<template>
  <i-card :title="$t('XITONGXIUGAILISHILIEBIAO')" tabCard>
    <template slot="header-control" v-if="$route.query.subSupplierType!=='GP'">
      <i-button @click="exportsTable" v-if="showExportsButton" v-permission="SUPPLIER_CHANGEHISTORY_TABLE_EXPORT">{{ $t('LK_DAOCHU') }}</i-button>
    </template>
    <template slot="header-control" v-if="$route.query.subSupplierType=='GP'">
      <i-button @click="exportsTable" v-if="showExportsButton" v-permission="SUPPLIER_CHANGEHISTORY_TABLE_EXPORT_GP">{{ $t('LK_DAOCHU') }}</i-button>
    </template>
        <!-- v-permission="SUPPLIER_CHANGEHISTORY_TABLE" -->
    <table-list
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :index="true"
        @handleSelectionChange="handleSelectionChange"
        border
    >
      <!-- 变更前 -->
      <template #beforeFileName="scope">
        <span class="value_click" v-if="scope.row.isAttachMent" @click="upload(scope.row.beforeValue)">{{scope.row.beforeFileName}}</span>
        <span v-else>{{scope.row.beforeFileName}}</span>
      </template>
      <!-- 变更后 -->
      <template #afterFileName="scope">
        <span class="value_click" v-if="scope.row.isAttachMent" @click="upload(scope.row.afterValue)">{{scope.row.afterFileName}}</span>
        <span v-else>{{scope.row.afterFileName}}</span>
      </template>
    </table-list>
  </i-card>
</template>

<script>
import {iCard, iButton} from "rise";
import {generalPageMixins} from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import {tableTitle} from './data'
import { downloadUdFile } from '@/api/file'
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
    async upload(val){
      await downloadUdFile(val)
    },
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

<style scoped lang="scss">
.value_click{
  color:#1763F7;
  text-decoration:underline;
  font-weight:bold;
  cursor: pointer;
}
</style>