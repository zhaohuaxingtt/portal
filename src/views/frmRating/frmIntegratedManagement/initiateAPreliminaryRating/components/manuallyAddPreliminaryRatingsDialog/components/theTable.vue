<template>
  <div>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <!-- 导出供应商模板-->
        <iButton
          @click="exportSupplierTemplate"
          :loading="exportButtonLoading"
          >{{ $t('SPR_FRM_FRMGL_DCGYSMB') }}</iButton
        >
        <!-- 导入供应商-->
        <importButton
          buttonText="SPR_FRM_FRMGL_DRGYS"
          @uploadedCallback="importConfirmedListExcel"
          class="margin-right10 margin-left10"
        />
        <!--添加至初评-->
        <iButton @click="addToPreliminaryReview">{{
          $t('SPR_FRM_FRMGL_TJZCP')
        }}</iButton>
        <!--删除-->
        <el-popconfirm
          :title="$t('LK_SHIFOUQUERENSHANCHU')"
          @confirm="handleDelete"
        >
          <iButton slot="reference" class="margin-left10">{{
            $t('delete')
          }}</iButton>
        </el-popconfirm>
      </div>
    </div>
    <tableList
      :tableData="tableListData"
      :tableTitle="tableTitle"
      :tableLoading="tableLoading"
      :index="true"
      @handleSelectionChange="handleSelectionChange"
    />
    <iPagination
      v-if="showPagination"
      v-update
      @size-change="handleSizeChange($event, getTableList)"
      @current-change="handleCurrentChange($event, getTableList)"
      background
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
    />
  </div>
</template>

<script>
import { iPagination, iButton, iMessage } from 'rise'
import tableList from '@/components/commonTable'
import { pageMixins } from '@/utils/pageMixins'
import resultMessageMixin from '@/mixins/resultMessageMixin'
import { tableTitle } from '../../data'
import {
  importConfirmedListExcel,
  getCommentConfirmedHandListPage,
  exportInitialCommentConfirmedList
} from '@/api/frmRating/frmIntegratedManagement'
import importButton from './importButton'
import { downloadFile } from '@/api/file'

export default {
  mixins: [pageMixins, resultMessageMixin],
  components: {
    tableList,
    iPagination,
    iButton,
    importButton
  },
  data() {
    return {
      tableListData: [],
      selectTableData: [],
      tableTitle,
      tableLoading: false,
      showPagination: false,
      exportButtonLoading: false
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    handleSearch() {
      this.page.currPage = 1
      this.getTableList()
    },
    async getTableList() {
      this.tableLoading = true
      const searchItem = this.$parent.$children.filter(item => {
        return item.$attrs.name === 'theSearch'
      })
      const searchForm = searchItem[0].form
      try {
        const req = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          ...searchForm
        }
        const res = await getCommentConfirmedHandListPage(req)
        if (res.result) {
          this.tableListData = res.data
          this.page.currPage = res.pageNum
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.total || 0
          this.showPagination = true
        }
        this.tableLoading = false
      } catch {
        this.tableListData = []
        this.tableLoading = false
        this.showPagination = false
      }
    },
    async importConfirmedListExcel(content) {
      const formData = new FormData()
      formData.append('file', content.file)
      const res = await importConfirmedListExcel(formData)
      this.tableListData = res.data
      this.showPagination = false
      this.resultMessage(res)
    },
    handleDelete() {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'))
      }
      const idList = this.selectTableData.map(item => {
        return item.id
      })
      this.tableListData = this.tableListData.filter(item => {
        return !idList.includes(item.id)
      })
      iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
    },
    async addToPreliminaryReview() {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'))
      }
      const supplierIdList = this.selectTableData.map(item => {
        return item.id
      })
      const oldSupplierIdList = [
        ...this.$store.state.frmRating.addToPreliminaryReviewList
      ]
      const newSupplierIdList = Array.from(
        new Set(oldSupplierIdList.concat(supplierIdList))
      )
      this.$store.dispatch('setAddToPreliminaryReviewList', newSupplierIdList)
      iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
    },
    async exportSupplierTemplate() {
      try {
        this.exportButtonLoading = true
        const res = await exportInitialCommentConfirmedList({})
        const name = res.data.modelUrl
        const req = {
          applicationName: 'rise',
          fileList: [name]
        }
        await downloadFile(req)
        this.exportButtonLoading = false
      } catch {
        this.exportButtonLoading = false
      }
    }
  }
}
</script>

<style scoped></style>
