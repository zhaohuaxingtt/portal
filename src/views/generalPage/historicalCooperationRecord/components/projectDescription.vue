<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2022-03-03 17:04:51
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ws3\generalPage\mainSubSuppliersAndProductNames\index.vue
-->
<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <i-button @click="exportsTable">{{ $t('LK_DAOCHU') }}</i-button>
      </div>
    </div>
    <table-list
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :index="true"
        border
    />
    <iPagination
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :current-page="page.currPage"
        :total="page.totalCount"
        :layout="page.layout"
      >
    </iPagination>
  </i-card>
</template>

<script>
import {iCard, iButton,iPagination} from "rise";
import {generalPageMixins} from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import {projectDescriptionsTableTitle} from './data'
import { pageMixins } from '@/utils/pageMixins'


export default {
  mixins: [generalPageMixins,pageMixins],
  components: {
    iCard,
    iButton,
    tableList,
    iPagination
  },
  data() {
    return {
      tableListData: [],
      tableTitle: projectDescriptionsTableTitle,
      tableLoading: false,
      selectTableData: []
    }
  },
  methods: {
    getTableList(){

    },
  }
}
</script>

<style scoped>

</style>