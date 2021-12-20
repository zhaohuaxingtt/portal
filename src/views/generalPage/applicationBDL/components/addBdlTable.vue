<!--
 * @Author: moxuan
 * @Date: 2021-04-15 17:30:36
 * @LastEditTime: 2021-12-07 16:21:30
 * @LastEditors: Please set LastEditors
 * @Description: 材料表格
-->
<template>
  <div>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <i-button @click="handleSelect">选择</i-button>
        <i-button @click="exportsTable">{{ $t('LK_DAOCHU') }}</i-button>
      </div>
    </div>
    <table-list :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                :index="true"
                @handleSelectionChange="handleSelectionChange" />
    <iPagination v-update
                 @size-change="handleSizeChange($event, getTableList)"
                 @current-change="handleCurrentChange($event, getTableList)"
                 background
                 :page-sizes="page.pageSizes"
                 :page-size="page.pageSize"
                 :layout="page.layout"
                 :current-page='page.currPage'
                 :total="page.totalCount" />
  </div>
</template>

<script>
import { iButton, iPagination } from "rise";
import { pageMixins } from "@/utils/pageMixins";
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import { addBDLTableTitle } from './data'
import { getPageStuffMaterialGroup } from "../../../../api/supplier360/material";


export default {
  mixins: [generalPageMixins, pageMixins],
  components: {
    iButton,
    tableList,
    iPagination
  },
  data () {
    return {
      tableListData: [],
      tableTitle: addBDLTableTitle,
      tableLoading: false,
      selectTableData: [],
      addBdldialog: false
    }
  },
  created () {
    this.getTableList()
  },
  methods: {
    handleSelectionChange (e) {
      this.selectTableData = e
    },
    async getTableList (form, flag = false) {
      let formData = form || this.$parent.$parent.$refs.addBdlSearch.form
      console.log(formData)
      this.tableLoading = true
      const pms = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        ...formData,
        supplierToken: this.$route.query.supplierToken
      }
      if (flag) {
        pms.pageNo = 1
      }
      const res = await getPageStuffMaterialGroup(pms)
      this.page.currPage = res.pageNum
      this.page.pageSize = res.pageSize
      this.page.totalCount = res.total
      this.tableLoading = false
      this.tableListData = res.data
    },
    handleSelect () {
      this.$emit('handleSelection', this.selectTableData)
    },
    handleOpenPage () {
    }
  }
}
</script>

<style scoped>
</style>