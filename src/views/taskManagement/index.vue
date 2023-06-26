<template>
  <iPage>
    <div class="header">
      <div>{{ $t('任务管理') }}</div>
    </div>
    <search
      class="margin-top20"
      @sure="sure"
      @reset="reset"
      :searchFormData="searchFormData"
      :searchForm="searchForm"
      :options="options"
    />
    <iCard class="margin-top20">
      <div class="flex margin-bottom10">
        <span class="table-title">任务列表</span>
        <div class="table-btn floatright">
          <iButton @click="transferBtn" >{{ $t('LK_ZHUANPAI') }}</iButton>
          <buttonTableSetting
            showBadge
            :hiddenCount="hiddenCount"
            @click="edittableHeader"
          />
        </div>
      </div>
      <iTableCustom
        ref="tableList"
        :data="tableListData"
        :columns="tableTitle"
        :loading="tableLoading"
        permissionKey="ADMIN_TASK_MANAGEMENT"
        :index="true"
        border
        @setHiddenCount="setHiddenCount"
        @handleClickFsupplierName="handleClickFsupplierName"
        @handle-selection-change="handleSelectionChange"
      />
      <iPagination
        class="footer-pagination"
        @size-change="handleSizeChange($event, sure)"
        @current-change="handleCurrentChange($event, getData)"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :current-page="page.currPage"
        :total="page.totalCount"
        :layout="page.layout"
      >
      </iPagination>
    </iCard>
    <transferDialog :visible.sync="transferVisiable" :selected="selected" @getData="getData"/>
  </iPage>
</template>

<script>
import { iPage, iCard, iButton, iTableCustom, iPagination } from 'rise'
import buttonTableSetting from 'rise/web/components/buttonTableSetting'
import { tableSortMixins } from 'rise/web/components/iTableSort/tableSortMixins'
import search from './components/search.vue'
import transferDialog from './components/transferDialog.vue'
import { pageMixins } from '@/utils/pageMixins'
import { findByPage } from '@/api/terms/terms'
import { searchFormData, tableTitle } from './data'

export default {
  mixins: [pageMixins, tableSortMixins],
  components: {
    iPage,
    iCard,
    iButton,
    iTableCustom,
    iPagination,
    buttonTableSetting,
    search,
    transferDialog,
  },
  data() {
    return {
      searchFormData,
      searchForm: {},
      options: {},
      tableTitle,
      tableListData: [],
      selected:[],
      tableLoading: false,
      transferVisiable:false,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    sure() {},
    reset() {},
    // 转派
    transferBtn(){
      this.transferVisiable = true
    },
    handleSelectionChange(val){
      this.selected = val
    },
    getData(e) {
      this.searchForm = e
      this.page.currPage = 1
      let param = {
        ...this.searchForm,
        pageNum: 1,
        pageSize: this.page.pageSize
      }
      this.query(param)
    },
    refTabList() {
      this.page.currPage = 1
      let param = {
        ...this.searchForm,
        pageNum: 1,
        pageSize: this.page.pageSize
      }
      this.query(param)
    },
    handleChangePage(e) {
      this.page.currPage = e
      let param = {
        ...this.searchForm,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      this.query(param)
    },
    handleSizeChange(e) {
      this.page.currPage = 1
      this.page.pageSize = e
      let param = {
        ...this.searchForm,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      this.query(param)
    },
    query(e) {
      this.tableLoading = true
      if (typeof e.isPersonalTerms != 'boolean') {
        delete e.isPersonalTerms
      }
      if (
        e.supplierRange == '' ||
        e.supplierRange == null ||
        e.supplierRange == undefined
      ) {
        delete e.supplierRange
      } else {
        let temp = []
        e.supplierRange.includes('PP') ? temp.push('PP') : ''
        e.supplierRange.includes('GP') ? temp.push('GP') : ''
        e.supplierRange.includes('NT') ? temp.push('NT') : ''
        e.supplierRange = temp
          .map((i) => {
            return i
          })
          .join(',')
      }
      if (
        e.supplierIdentity == '' ||
        e.supplierIdentity == null ||
        e.supplierIdentity == undefined
      ) {
        delete e.supplierIdentity
      } else {
        e.supplierIdentity = e.supplierIdentity
          .sort()
          .map((i) => {
            return i
          })
          .join(',')
      }
      if (e.state == '' || e.state == null || e.state == undefined) {
        delete e.state
      } else {
        e.state = e.state
          .map((i) => {
            return i
          })
          .join(',')
      }
      if (e.signNode == '' || e.signNode == null || e.signNode == undefined) {
        delete e.signNode
      } else {
        e.signNode = e.signNode
          .map((i) => {
            return i
          })
          .join(',')
      }
      findByPage(e)
        .then((res) => {
          this.tableListData = res.data
          this.page.totalCount = res.total
          this.tableLoading = false
        })
        .catch(() => {
          this.tableLoading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex {
  align-items: center;
  justify-content: space-between;
  .table-title {
    font-size: 16px !important;
    font-weight: 500 !important;
  }
  .table-btn {
    display: inline-flex;
    align-items: center;
  }
}
</style>
