<template>
  <iPage>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">
        <!--发起初步评级-->
        {{ $t('SPR_FRM_FRMGL_FQCBPJ') }}
      </span>
      <div class="floatright">
        <logButton />
      </div>
    </div>
    <iCard>
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <!-- 手动添加-->
          <iButton @click="addManully">{{ $t('SPR_FRM_FRMGL_SDTJ') }}</iButton>
          <!--自动添加-->
          <iButton @click="automaticallyAdded">{{
            $t('SPR_FRM_FRMGL_ZDTJ')
          }}</iButton>
          <!--提交-->
          <iButton @click="handleSubmit" :loading="submitLoading">{{
            $t('LK_TIJIAO')
          }}</iButton>
        </div>
      </div>
      <tableList
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :index="true"
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
    </iCard>
    <manuallyAddPreliminaryRatingsDialog
      v-model="manuallyAddPreliminaryRatingsDialog"
    />
    <automaticallyAddedDialog
      v-model="automaticallyAddedDialog"
      @handleSubmit="handleAutoSubmit"
      :loading="automaticallyAddedDialogLoading"
    />
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iButton, iMessage, iSelect } from 'rise'
import logButton from '@/components/logButton'
import tableList from '@/components/commonTable'
import { pageMixins } from '@/utils/pageMixins'
import resultMessageMixin from '@/mixins/resultMessageMixin'
import { tableTitle } from './components/data'
import manuallyAddPreliminaryRatingsDialog from './components/manuallyAddPreliminaryRatingsDialog'
import automaticallyAddedDialog from './components/automaticallyAddedDialog'
import {
  saveTimeAuto,
  getCommentConfirmedListPage,
  handleInitialCommentsubmit,
  getSelectModalList
} from '../../../../api/frmRating/frmIntegratedManagement'

export default {
  mixins: [pageMixins, resultMessageMixin],
  components: {
    iPage,
    iCard,
    tableList,
    iPagination,
    iButton,
    logButton,
    manuallyAddPreliminaryRatingsDialog,
    automaticallyAddedDialog,
    iSelect
  },
  data() {
    return {
      tableListData: [],
      tableTitle,
      tableLoading: false,
      selectTableData: [],
      manuallyAddPreliminaryRatingsDialog: false,
      automaticallyAddedDialog: false,
      automaticallyAddedDialogLoading: false,
      selectList: [],
      submitLoading: false,
      defaultModleId: ''
    }
  },
  created() {
    //this.getTableList();
    this.getSelectModalList()
  },
  methods: {
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    async getTableList() {
      this.tableLoading = true
      try {
        const req = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          supplierIdList: this.$store.state.frmRating.addToPreliminaryReviewList
        }
        const res = await getCommentConfirmedListPage(req)
        if (res.result) {
          this.tableListData = res.data.map(item => {
            item.modelId = this.defaultModleId
            return item
          })
          this.page.currPage = res.pageNum
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.total || 0
        } else {
          this.resultMessage(res)
          this.tableListData = []
        }
        this.tableLoading = false
      } catch {
        this.tableListData = []
        this.tableLoading = false
      }
    },
    addManully() {
      this.manuallyAddPreliminaryRatingsDialog = true
    },
    automaticallyAdded() {
      this.automaticallyAddedDialog = true
    },
    async handleAutoSubmit(params) {
      try {
        this.automaticallyAddedDialogLoading = true
        const req = {
          ...params
        }
        const res = await saveTimeAuto(req)
        this.resultMessage(res, () => {
          this.automaticallyAddedDialog = false
        })
        this.automaticallyAddedDialogLoading = false
      } catch {
        this.automaticallyAddedDialogLoading = false
      }
    },
    async handleSubmit() {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'))
      }
      let flag = true
      this.selectTableData.some(item => {
        const modelId = item.modelId
        if (!modelId) {
          flag = false
          return iMessage.warn(this.$t('SPR_FRM_FRMGL_QXZSYMX'))
        }
      })
      if (flag) {
        try {
          this.submitLoading = true
          const req = {
            initialCommentList: this.selectTableData
          }
          const res = await handleInitialCommentsubmit(req)
          this.resultMessage(res, () => {
            this.filterSubmitList()
            this.getTableList()
          })
          this.submitLoading = false
        } catch {
          this.submitLoading = false
        }
      }
    },
    async getSelectModalList() {
      const res = await getSelectModalList({})
      this.selectList = res.data.modelDTOList
      this.defaultModleId = this.selectList[0].id
    },
    filterSubmitList() {
      const idList = this.selectTableData.map(item => {
        return item.id
      })
      const tableIdList = this.tableListData.map(item => {
        return item.id
      })
      const finalIdList = _.difference(tableIdList, idList)
      this.$store.dispatch('setAddToPreliminaryReviewList', finalIdList)
    }
  },
  watch: {
    '$store.state.frmRating.addToPreliminaryReviewList'() {
      //this.manuallyAddPreliminaryRatingsDialog = false;
      this.getTableList()
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
