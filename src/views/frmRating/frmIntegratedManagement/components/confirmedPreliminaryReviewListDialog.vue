<template>
  <!--待确认初评清单-->
  <iDialog
    :title="$t('SPR_FRM_FRMGL_DQRCPQD')"
    :visible.sync="value"
    width="90%"
    @close="clearDiolog"
    :close-on-click-modal="false"
  >
    <div class="content">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <!--退回-->
          <iButton
            @click="handleBack"
            :loading="backButtonLoading"
            v-permission="PORTAL_SUPPLIER_NAV_FRMZONGHEGUANLI_DAIQUEREN_TUIHUI"
            >{{ $t('LK_TUIHUI') }}</iButton
          >
          <!--提交-->
          <iButton
            @click="handleSubmit"
            :loading="submitButtonLoading"
            v-permission="PORTAL_SUPPLIER_NAV_FRMZONGHEGUANLI_DAIQUEREN_TIJIAO"
            >{{ $t('LK_TIJIAO') }}</iButton
          >
        </div>
      </div>
      <tableList
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :index="true"
        border
        @handleSelectionChange="handleSelectionChange"
      >
        <template #modelId="scope">
          <iSelect v-model="scope.row.modelId">
            <el-option
              v-for="item of selectList"
              :key="item.id"
              :value="item.id"
              :label="item.modelName"
            />
          </iSelect>
        </template>
      </tableList>
      <iPagination
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
  </iDialog>
</template>

<script>
import { iDialog, iButton, iPagination, iMessage, iSelect } from 'rise'
import tableList from '@/components/commonTable'
import { pageMixins } from '@/utils/pageMixins'
import resultMessageMixin from '@/mixins/resultMessageMixin'
import { confirmedPreliminaryReviewListTableTitle } from './data'
import {
  getInitialCommentConfirmedList,
  getSelectModalList,
  handleInitialCommentConfirmedListBack,
  handleConfirmedListSubmit
} from '../../../../api/frmRating/frmIntegratedManagement'

export default {
  mixins: [pageMixins, resultMessageMixin],
  components: {
    iDialog,
    iButton,
    iPagination,
    tableList,
    iSelect
  },
  props: {
    value: { type: Boolean }
  },
  data() {
    return {
      tableListData: [],
      tableTitle: confirmedPreliminaryReviewListTableTitle,
      tableLoading: false,
      selectTableData: [],
      backButtonLoading: false,
      submitButtonLoading: false,
      selectList: [],
      defaultModleId: ''
    }
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false)
    },
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    async getTableList() {
      this.tableLoading = true
      try {
        const req = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize
        }
        const res = await getInitialCommentConfirmedList(req)
        if (res.result) {
          this.tableListData = res.data.map((item) => {
            item.modelId = this.defaultModleId
            return item
          })
          this.page.currPage = res.pageNum
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.total || 0
        }
        this.tableLoading = false
      } catch {
        this.tableListData = []
        this.tableLoading = false
      }
    },
    async getSelectModalList() {
      const res = await getSelectModalList({})
      this.selectList = res.data.modelDTOList
      this.defaultModleId = this.selectList[0].id
    },
    async handleBack() {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'))
      }
      try {
        this.backButtonLoading = true
        const ids = this.selectTableData.map((item) => {
          return item.id
        })
        const req = { ids }
        const res = await handleInitialCommentConfirmedListBack(req)
        this.resultMessage(res, () => {
          this.getTableList()
        })
        this.backButtonLoading = false
      } catch {
        this.backButtonLoading = false
      }
    },
    async handleSubmit() {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'))
      }
      let flag = true
      this.selectTableData.some((item) => {
        const modelId = item.modelId
        if (!modelId) {
          flag = false
          return iMessage.warn(this.$t('SPR_FRM_FRMGL_QXZSYMX'))
        }
      })
      if (flag) {
        try {
          this.submitButtonLoading = true
          const req = {
            initConfirmedList: this.selectTableData
          }
          const res = await handleConfirmedListSubmit(req)
          this.resultMessage(res, () => {
            this.getTableList()
          })
          this.submitButtonLoading = false
        } catch {
          this.submitButtonLoading = false
        }
      }
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.getTableList()
        this.getSelectModalList()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.content {
  padding-bottom: 20px;
}

::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}

.row1 {
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: #000000;
}

.row2 {
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: #999999;
}

.dialog-footer {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
}
</style>
