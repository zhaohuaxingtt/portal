<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <!-- 导出 -->
        <iButton @click="downExcel">{{$t('MT_DAOCHU')}}</iButton>
        <!-- 新供应商评级-->
        <iButton @click="handleTask" v-permission="PORTAL_SUPPLIER_NAV_XINGONGYINGSHANGPINGJI_XGYSPJ">{{
          $t('SUPPLIER_XINGONGYINGSHANGPINGJI')
        }}</iButton>
        <buttonTableSetting @click="$refs.tableListRef.openSetting()"></buttonTableSetting>
      </div>
    </div>
    <iTableCustom
      ref="tableListRef"
      :data="tableListData"
      :columns="tableTitle"
      :loading="tableLoading"
      @handle-selection-change="handleSelectionChange"
      @go-detail="openPage"
    >
    </iTableCustom>
    
    <iPagination v-update
                 @size-change="handleSizeChange($event, getTableList)"
                 @current-change="handleCurrentChange($event, getTableList)"
                 background
                 :page-sizes="page.pageSizes"
                 :page-size="page.pageSize"
                 :layout="page.layout"
                 :current-page="page.currPage"
                 :total="page.totalCount" />
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage } from 'rise'
import tableList from '@/components/commonTable'
import iTableCustom from '@/components/iTableCustom'
import buttonTableSetting from '@/components/buttonTableSetting'
import { tableTitle } from './data'
import { getNewSupplierRating,exportLoad } from '@/api/frmRating/newSupplierRating/newSupplierRating'
import { pageMixins } from '@/utils/pageMixins'
import resultMessageMixin from '@/mixins/resultMessageMixin'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import { downloadUdFile } from '@/api/file'
export default {
  mixins: [resultMessageMixin, pageMixins, generalPageMixins],
  components: {
    iCard,
    iButton,
    tableList,
    iPagination,
    buttonTableSetting,
    iTableCustom
  },
  data () {
    return {
      tableListData: [],
      selectTableData: [],
      tableTitle,
      tableLoading: false
    }
  },
  created () {
    this.getTableList()
  },
  methods: {
    downExcel(){
      exportLoad().then(res=>{
        
      })
    },
    async getTableList (reqParams) {
      this.tableLoading = true
      try {
        const req = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          ratingStatusList: this.$route.query.ratingStatusList ? JSON.parse(this.$route.query.ratingStatusList) : [],
          ...reqParams
        }
        const res = await getNewSupplierRating(req)
        if (res.result) {
          this.tableListData = res.data && res.data.list
          this.page.currPage = res.data.current
          this.page.pageSize = res.data.size
          this.page.totalCount = res.data.total || 0
        }
        this.tableLoading = false
      } catch {
        this.tableListData = []
        this.tableLoading = false
      }
    },
    handleSelectionChange (e) {
      this.selectTableData = e
    },
    // 下载
    async handleExampleDownload (row) {
      await downloadUdFile(row.snapshotPath)
    },
    handleTask () {
      if (this.selectTableData.length === 1) {
        if (
          this.selectTableData[0].ratingStatus === '草稿' ||
          this.selectTableData[0].ratingStatus === '驳回'
        ) {
          this.$router.push({
            path: '/supplier/frmrating/newsupplierrating/rating1',
            query: this.selectTableData[0]
          })
        } else {
          this.handleExampleDownload(this.selectTableData[0])
        }
      } else if (this.selectTableData.length > 1) {
        iMessage.warn(this.$t('SPR_FRM_ZNXZYTSJ'))
      } else if (this.selectTableData.length < 1) {
        iMessage.warn(this.$t('SPR_FRM_XGYSPJ_QXZYTSJTJ'))
      }
    },
    openPage (row) {
      if (row.ratingStatus === '草稿' || row.ratingStatus === '驳回') {
        this.$router.push({
          path: '/supplier/frmrating/newsupplierrating/rating1',
          query: row
        })
      } else {
        this.handleExampleDownload(row)
      }
    }
  }
}
</script>

<style scoped></style>
