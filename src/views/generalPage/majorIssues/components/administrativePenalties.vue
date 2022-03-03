<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2022-03-03 17:05:13
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ws3\generalPage\mainSubSuppliersAndProductNames\index.vue
-->
<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{$t('SUPPLIER_ZHONGDASHIXIANGXINGZHENCHUFA')}}</span>
      <div class="floatright">
        <i-button @click="exportsTable" v-permission="SUPPLIER_SIGNIFICANTEVENTS_ADMINISTRATIVEPENALTIES_EXPORT">{{ $t('LK_DAOCHU') }}</i-button>
      </div>
    </div>
        <!-- v-permission="SUPPLIER_SIGNIFICANTEVENTS_ADMINISTRATIVEPENALTIES" -->
    <table-list
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :index="true"
        openPageProps="view"
        :customOpenPageWord="$t('LK_CHAKAN')"
        @handleSelectionChange="handleSelectionChange"
        @openPage="handleOpenPage"
        :openPageGetRowData="true"
        border
    />
    <!--内容框-->
    <content-dialog
        v-model="contentDialog"
        :detail="content"
    />
  </i-card>
</template>

<script>
import {iCard, iButton} from "rise";
import {generalPageMixins} from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import {administrativePenaltiesTableTitle} from './data'
import {getAdministrativePenaltyListView} from '../../../../api/supplier360/majorIssues'
import contentDialog from './contentDialog'


export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    tableList,
    contentDialog
  },
  data() {
    return {
      tableListData: [],
      tableTitle: administrativePenaltiesTableTitle,
      tableLoading: false,
      selectTableData: [],
      contentDialog: false,
      content: ''
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    async getTableList() {
      this.tableLoading = true
      const req = {
        pageNo: 1,
        pageSize: 9999
      }
      try {
        const res = await getAdministrativePenaltyListView(req)
        this.tableListData = res.data !== null ? res.data.list : []
        this.tableLoading = false
      } catch {
        this.tableLoading = false
      }
    },
    handleOpenPage(row) {
      this.contentDialog = true
      this.content = row.content
    }
  }
}
</script>

<style scoped>

</style>