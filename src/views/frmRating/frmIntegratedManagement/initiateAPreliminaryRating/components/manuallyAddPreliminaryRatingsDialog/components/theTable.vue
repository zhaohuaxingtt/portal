<template>
  <div>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <!-- 导出供应商模板-->
        <iButton
          @click="exportSupplierTemplate"
          v-permission="
            PORTAL_SUPPLIER_NAV_FRMZONGHEGUANLI_FQCBPJ_SHOUDONG_DCGYSMB
          "
          :loading="exportButtonLoading"
          >{{ $t('SPR_FRM_FRMGL_DCGYSMB') }}</iButton
        >
        <!-- 导入供应商-->
        <importButton
          buttonText="SPR_FRM_FRMGL_DRGYS"
          v-permission="
            PORTAL_SUPPLIER_NAV_FRMZONGHEGUANLI_FQCBPJ_SHOUDONG_DRGYS
          "
          @uploadedCallback="importConfirmedListExcel"
          class="margin-right10 margin-left10"
        />
        <!--添加至初评-->
        <iButton
          @click="addToPreliminaryReview"
          v-permission="
            PORTAL_SUPPLIER_NAV_FRMZONGHEGUANLI_FQCBPJ_SHOUDONG_TJZCP
          "
          >{{ $t('SPR_FRM_FRMGL_TJZCP') }}</iButton
        >
        <!--删除-->
        <iButton
          @click="handleDelete"
          v-permission="PORTAL_SUPPLIER_NAV_FRMZONGHEGUANLI_FQCBPJ_SHOUDONG_DEL"
          >{{ $t('delete') }}</iButton
        >
        <!-- <el-popconfirm
          :title="$t('LK_SHIFOUQUERENSHANCHU')"
          @confirm="handleDelete"
        >
          <iButton slot="reference" class="margin-left10">{{
            $t('delete')
          }}</iButton>
        </el-popconfirm> -->
      </div>
    </div>
    <tableList
      :tableData="tableListData"
      :tableTitle="tableTitle"
      :tableLoading="tableLoading"
      :index="true"
      border
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
import {
  NewMessageBox,
  NewMessageBoxClose
} from '@/components/newMessageBox/dialogReset.js'
import { tableTitle } from '../../data'
import {
  importConfirmedListExcel,
  getCommentConfirmedHandListPage,
  exportInitialCommentConfirmedList
} from '@/api/frmRating/frmIntegratedManagement'
import importButton from './importButton'
import { downloadUdFile } from '@/api/file'

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
      const searchItem = this.$parent.$children.filter((item) => {
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
      NewMessageBox({
        title: this.language('LK_WENXINTISHI', '温馨提示'),
        Tips: this.language('SHIFOUSHANCHU', '是否删除？'),
        cancelButtonText: this.language('QUXIAO', '取消'),
        confirmButtonText: this.language('QUEREN', '确认')
      })
        .then(() => {
          const idList = this.selectTableData.map((item) => {
            return item.id
          })
          this.tableListData = this.tableListData.filter((item) => {
            return !idList.includes(item.id)
          })
          iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
        })
        .catch((err) => {
          // console.log(err)
        })
    },
    async addToPreliminaryReview() {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'))
      }
      if (
        this.selectTableData.some(
          (e) => !e.relevantDept || !e.relevantDept.length
        )
      ) {
        return iMessage.warn(
          this.$t(
            '在一年内没有TO记录或者三年内没有定点信息不允许加入初步评级清单'
          )
        )
      }
      const supplierIdList = this.selectTableData.map((item) => {
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
        await downloadUdFile(name)
        this.exportButtonLoading = false
      } catch {
        this.exportButtonLoading = false
      }
    }
  },
  destroyed() {
    NewMessageBoxClose()
  }
}
</script>

<style scoped></style>
