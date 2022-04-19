<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2022-03-03 17:05:27
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\generalPage\mainSubSuppliersAndProductNames\index.vue
-->
<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{$t('SUPPLIER_ZHONGDASHIXIANGSIFAXINXI')}}</span>
      <div class="floatright">
        <i-button v-if="$route.query.subSupplierType!=='GP'" @click="exportsTable" v-permission="SUPPLIER_SIGNIFICANTEVENTS_JUDICIALINFORMATION_EXPORT">{{ $t('LK_DAOCHU') }}</i-button>
        <i-button v-if="$route.query.subSupplierType=='GP'" @click="exportsTable" v-permission="SUPPLIER_SIGNIFICANTEVENTS_JUDICIALINFORMATION_EXPORT_GP">{{ $t('LK_DAOCHU') }}</i-button>
      </div>
    </div>
    <!-- v-permission="SUPPLIER_SIGNIFICANTEVENTS_JUDICIALINFORMATION" -->
    <table-list :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                :index="true"
                openPageProps="view"
                :customOpenPageWord="$t('LK_CHAKAN')"
                @handleSelectionChange="handleSelectionChange"
                @openPage="handleOpenPage"
                :openPageGetRowData="true"
                border
                >
      <template v-slot:currency="scope">
        <span>{{currency(scope.row.currency)}}</span>
      </template>
    </table-list>

    <!--内容框-->
    <content-dialog v-model="contentDialog"
                    :detail="content" />
  </i-card>
</template>

<script>
import { iCard, iButton } from "rise";
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import { judicialInformationTableTitle } from './data'
import { getJudiciaryInfoListView } from '../../../../api/supplier360/majorIssues'
import contentDialog from './contentDialog'
import { getDictByCode } from '@/api/dictionary'


export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    tableList,
    contentDialog
  },
  data () {
    return {
      tableListData: [],
      tableTitle: judicialInformationTableTitle,
      tableLoading: false,
      selectTableData: [],
      contentDialog: false,
      content: '',
      currencyList: []
    }
  },
  created () {
    this.getDictByCode()
    this.getTableList()
  },
  computed: {
    currency () {
      return function (data) {
        this.currencyList.forEach(item => {
          if (item.code === data) {
            return item.name
          }
        })
      }
    }
  },
  methods: {
    async getDictByCode () {
      let res = await getDictByCode('PP_CSTMGMT_CURRENCY')
      this.currencyList = res.data[0].subDictResultVo
    },
    async getTableList () {
      this.tableLoading = true
      const req = {
        pageNo: 1,
        pageSize: 9999
      }
      try {
        const res = await getJudiciaryInfoListView(req)
        this.tableListData = res.data
        this.tableLoading = false
      } catch {
        this.tableLoading = false
      }
    },
    handleOpenPage (row) {
      this.contentDialog = true
      this.content = row.content
    }
  }
}
</script>

<style scoped>
</style>