<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <!--分派-->
        <iButton @click="handleOpenAssign" v-permission="PROTAL_SUPPLIER_WORKBENCHFINANCE_CHUBUPINGJI_FENPAI">{{ $t('SPR_FRM_CBPJ_FP') }}</iButton>
        <!--重新打分-->
        <iButton @click="handleReScoring"
                  v-permission="PROTAL_SUPPLIER_WORKBENCHFINANCE_CHUBUPINGJI_CHONGXINDAFEN"
                 :loading="reScoreButtonLoading">{{
          $t('SPR_FRM_CBPJ_CXDF')
        }}</iButton>
        <!--定性打分-->
        <iButton @click="handleQualitativeScoring"
           v-permission="PROTAL_SUPPLIER_WORKBENCHFINANCE_CHUBUPINGJI_DINGXINGDAFEN"
        >{{
          $t('SPR_FRM_FRMGL_DXDAF')
        }}</iButton>
        <!--退回-->
        <iButton @click="handleReturn"  v-permission="PROTAL_SUPPLIER_WORKBENCHFINANCE_CHUBUPINGJI_TUIHUI">{{ $t('LK_TUIHUI') }}</iButton>
        <!--取消-->
        <iButton @click="handleCancel"  v-permission="PROTAL_SUPPLIER_WORKBENCHFINANCE_CHUBUPINGJI_QUXIAO">{{ language('取消') }}</iButton>
        <!--转派-->
        <iButton @click="handleTransfer"  v-permission="PROTAL_SUPPLIER_WORKBENCHFINANCE_CHUBUPINGJI_ZHUANPAI">{{ $t('LK_ZHUANPAI') }}</iButton>
        <!--查看-->
        <iButton @click="handleView"  v-permission="PROTAL_SUPPLIER_WORKBENCHFINANCE_CHUBUPINGJI_CHAKAN">{{ $t('LK_CHAKAN') }}</iButton>
        <buttonTableSetting @click="$refs.tableListRef.openSetting()"></buttonTableSetting>
      </div>
    </div>

    <iTableCustom
      ref="tableListRef"
      :data="tableListData"
      :columns="tableTitle"
      :loading="tableLoading"
      @handle-selection-change="handleSelectionChange"
      @go-detail="handleOpenPage"
    >
    </iTableCustom>

    <!-- <tableList :tableData="tableListData"
               :tableTitle="tableTitle"
               :tableLoading="tableLoading"
               :index="true"
               @handleSelectionChange="handleSelectionChange"
               openPageProps="view"
               @openPage="handleOpenPage"
               :openPageGetRowData="true"
               :customOpenPageWord="$t('LK_CHAKAN')" /> -->
    <iPagination v-update
                 @size-change="handleSizeChange($event, getTableList)"
                 @current-change="handleCurrentChange($event, getTableList)"
                 background
                 :page-sizes="page.pageSizes"
                 :page-size="page.pageSize"
                 :layout="page.layout"
                 :current-page="page.currPage"
                 :total="page.totalCount" />

    <!--分派-->
    <assignDialog v-model="assignDialog"
                  :selectOptionsList="assignQualitativeScoreList"
                  :loading="assignQualitativeScoreLoading"
                  @handleSubmit="handleAssignQualitativeScoreSubmit"
                  :initialId="assignDialogSelectId" />
    <!--退回-->
    <returnDialog @handleSubmit="handleReturnSubmit"
                  v-model="returnDialog" />
    <!--转派-->
    <transferDialog v-model="transferDialog"
                    :selectOptionsList="transferQualitativeScoreList"
                    :loading="transferQualitativeScoreLoading"
                    @handleSubmit="handleTransferQualitativeScoreSubmit" />
    <!--定性打分-->
    <scoringDialog :isView='isView' :title="$t('SPR_FRM_FRMGL_DXDAF')"
                   v-model="qualitativeScoringDialog"
                   :outerSelectTableData="selectTableData"
                   :selectProps="scoreDiloagSelectProps"
                   @handleSubmitCallback="handleScoreDialogSubmitCallcak" />
    <!--重新打分-->
    <scoringDialog :isView='isView' :title="$t('SPR_FRM_CBPJ_CXDF')"
                   :showFollowButton="false"
                   v-model="reScoringDialog"
                   :outerSelectTableData="selectTableData"
                   :selectProps="scoreDiloagSelectProps"
                   @handleSubmitCallback="handleScoreDialogSubmitCallcak" />
    <!--查看-->
    <scoringDialog :title="$t('LK_CHAKAN')"
                   :showFollowButton="false"
                   :showSubmitButton="false"
                   :showTemporaryStorageButton="false"
                   v-model="viewDialog"
                   :outerSelectTableData="selectTableData"
                   :selectProps="[]"
                   action="view"
                   :selection="false" />
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessageBox, iMessage } from 'rise'
import tableList from '@/components/commonTable'
import iTableCustom from '@/components/iTableCustom'
import buttonTableSetting from '@/components/buttonTableSetting'
import { pageMixins } from '@/utils/pageMixins'
import resultMessageMixin from '@/mixins/resultMessageMixin'
import { tableTitle } from './data'
import assignDialog from './assignDialog'
import returnDialog from './returnDialog'
import transferDialog from './transferDialog'
import scoringDialog from './scoringDialog'
import {
  getQualitativeScoreList,
  assignQualitativeScore,
  transferQualitativeScore,
  handleScoreAgain,
  updateScoreStatus
} from '../../../../../api/frmRating/preliminaryRating/qualitativeScoringPage'

export default {
  mixins: [pageMixins, resultMessageMixin],
  components: {
    iCard,
    iButton,
    tableList,
    iTableCustom,
    iPagination,
    assignDialog,
    returnDialog,
    transferDialog,
    scoringDialog,
    buttonTableSetting
  },
  created () {
    this.checkRolePermission()
    this.getTableList()
    this.defaultOpenScroingDialog()
  },
  data () {
    return {
      isView:false,
      tableListData: [],
      tableTitle,
      selectTableData: [],
      tableLoading: false,
      assignDialog: false,
      returnDialog: false,
      transferDialog: false,
      qualitativeScoringDialog: false,
      reScoringDialog: false,
      viewDialog: false,
      assignQualitativeScoreList: [],
      transferQualitativeScoreList: [],
      assignQualitativeScoreLoading: false,
      transferQualitativeScoreLoading: false,
      reScoreButtonLoading: false,
      scoreDiloagSelectProps: [
        'policyImpact',
        'industryDemandStatus',
        'managementStandardDegree',
        'projectManagementSkill',
        'industryReputation',
        'mainCustomerStrength',
        'mainCustomerStableCooperation',
        'mainSupplierStrength',
        'mainSupplierStableCooperation',
        'contractCompliance'
      ],
      isFRM: false,
      isGZ: false,
      assignDialogSelectId: 0
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.selectTableData = val
    },
    handleSearch () {
      this.page.currPage = 1
      this.getTableList()
    },
    async getTableList () {
      const searchItem = this.$parent.$children.filter((item) => {
        return item.$attrs.name === 'theSearch'
      })
      const searchForm = searchItem[0].form
      this.tableLoading = true
      try {
        const req = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          ...searchForm
        }
        const res = await getQualitativeScoreList(req)
        if (res.result) {
          this.tableListData = res.data
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
    handleOpenAssign () {//分派
      // if (!this.gzOperationCheck()) {
      //   return false
      // }
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'))
      }
      if (this.selectTableData.length > 1) {
        return iMessage.warn(this.$t('SPR_FRM_ZNXZYTSJ'))
      }
      if(this.selectTableData[0].qualitativeScoreStatus == "草稿" || this.selectTableData[0].qualitativeScoreStatus == "退回"){}else{
        return iMessage.error(this.language("ZYTHHCGZTCNFP","只有退回和草稿状态才能分派"))
      }

      this.selectTableData.map((item) => {
        this.assignDialogSelectId = item.id
      })
      const status = true
      // const status = this.checkButtonStatus('分派')
      status && (this.assignDialog = true)
    },
    handleReturn () {//退回
      // if (!this.gzOperationCheck()) {
      //   return false
      // }
      if(this.selectTableData[0].qualitativeScoreStatus == "已取消"){
        return iMessage.error(this.$t("已取消状态不能点击退回"))
      }
      if (!this.frmOperationCheck()) {
        return false
      }
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'))
      }
      const status = this.checkButtonStatus('退回')
      status && (this.returnDialog = true)
    },
    handleTransfer () {//转派
      // if (!this.gzOperationCheck()) {
      //   return false
      // }
      // if (!this.frmOperationCheck()) {
      //   return false
      // }
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'))
      }
      if (this.selectTableData.length > 1) {
        return iMessage.warn(this.$t('SPR_FRM_ZNXZYTSJ'))
      }
      if(this.selectTableData[0].qualitativeScoreStatus == "草稿" || this.selectTableData[0].qualitativeScoreStatus == "退回"){}else{
        return iMessage.error(this.language("ZYTHHCGZTCNZP","只有退回和草稿状态才能转派"))
      }
      const status = this.checkButtonStatus('转派')
      status && (this.transferDialog = true)
    },
    handleCancel () {//取消
      // if (!this.gzOperationCheck()) {
      //   return false
      // }
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'))
      }
      const status = this.checkButtonStatus('已取消')
      status &&
        iMessageBox(this.$t('SPR_FRM_CBPJ_QDQXM'), this.$t('LK_WENXINTISHI'), {
          confirmButtonText: this.$t('LK_QUEDING'),
          cancelButtonText: this.$t('LK_QUXIAO')
        }).then(async () => {
          const ids = this.selectTableData.map((item) => {
            return item.id
          })
          const req = {
            ids,
            qualitativeScoreStatus: '已取消'
          }
          const res = await updateScoreStatus(req)
          this.resultMessage(res, () => {
            this.getTableList()
          })
        })
    },
    handleQualitativeScoring () {//定性打分
        this.isView=false
      // if (!this.gzOperationCheck()) {
      //   return false
      // }
      // if (!this.frmOperationCheck()) {
      //   return false
      // }
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'))
      }
      let flag = true
      this.selectTableData.some((item) => {
        if (item.qualitativeScoreStatus == '草稿' || item.qualitativeScoreStatus == '退回') {
          flag = true
          return true
        }else{
          flag = false
          return true
        }
      })
      if (flag) {
        this.qualitativeScoringDialog = true
      } else {
        iMessage.error(this.$t('SPR_FRM_CBPJ_ZYZTWCGCNJXDXDFNOW'))
      }
    },
    async handleReScoring () {//重新打分
        this.isView=false
      // if (!this.gzOperationCheck()) {
      //   return false
      // }
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'))
      }
      try {
        this.reScoreButtonLoading = true
        const initialIds = this.selectTableData.map((item) => {
          return item.id
        })
        const req = { initialIds }
        const res = await handleScoreAgain(req)
        if (res.result) {
          this.reScoringDialog = true
          this.getTableList()
        } else {
          this.resultMessage(res)
        }
        this.reScoreButtonLoading = false
      } catch {
        this.reScoreButtonLoading = false
      }
    },
    handleView () {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'))
      }
      this.isView=true
      this.viewDialog = true
    },
    handleOpenPage (row) {
      this.$router.push({
        path: '/supplier/frmrating/preliminaryrating/operationrecord',
        query: {
          id: row.id
        }
      })
    },
    async handleAssignQualitativeScoreSubmit (reqParams) {
      try {
        this.assignQualitativeScoreLoading = true
        // const initialIds = this.selectTableData.map((item) => {
        //   return item.id
        // })
        /*const req = {
          initialIds,
          ...reqParams
        }*/
        const res = await assignQualitativeScore(reqParams)
        this.resultMessage(res, () => {
          this.assignDialog = false
          this.getTableList()
        })
        this.assignQualitativeScoreLoading = false
      } catch {
        this.assignQualitativeScoreLoading = false
      }
    },
    async handleTransferQualitativeScoreSubmit (reqParams) {
      try {
        this.transferQualitativeScoreLoading = true
        const initialIds = this.selectTableData.map((item) => {
          return item.id
        })
        const req = {
          initialIds,
          ...reqParams
        }
        const res = await transferQualitativeScore(req)
        this.resultMessage(res, () => {
          this.transferDialog = false
          this.getTableList()
        })
        this.transferQualitativeScoreLoading = false
      } catch {
        this.transferQualitativeScoreLoading = false
      }
    },
    handleScoreDialogSubmitCallcak () {
      //this.qualitativeScoringDialog = false;
      //this.reScoringDialog = false;
      this.getTableList()
    },
    async handleReturnSubmit (form) {
      const ids = this.selectTableData.map((item) => {
        return item.id
      })
      const req = {
        ids,
        qualitativeScoreStatus: '退回',
        ...form
      }
      const res = await updateScoreStatus(req)
      this.resultMessage(res, () => {
        this.getTableList()
        this.returnDialog = false
      })
    },
    checkButtonStatus (status) {
      let flag = true
      this.selectTableData.some((item) => {
        if(status == "分派" || status == "转派" || status == "退回"){}else{
          if (item.operateContent === status) {
            flag = false
            return true
          }
        }
      })
      if(!flag){
        switch (status){
          // case "退回":
          //   iMessage.error(this.$t("所选数据已为退回状态不能再次退回"))
          //   break;
          // case "转派":
          //   iMessage.error(this.$t("所选数据已为转派状态不能再次转派"))
          //   break;
          case "已取消":
            iMessage.error(this.$t("所选数据已为已取消状态不能再次取消"))
            break;
        }
      }
      //  && iMessage.error(this.$t('SPR_FRM_CBPJ_SXZTYWQCXQZ'))
      return flag
    },
    checkRolePermission () {
      this.isFRM = false
      this.isGZ = false
      const positionList = this.$store.state.permission.userInfo.positionList
      if (positionList) {
        positionList.map((item) => {
          item.roleDTOList.map((item2) => {
            if (item2.code === 'WS3FRMGLY') {
              this.isFRM = true
            }
            if (item2.code.indexOf('GZ') > -1) {
              this.isGZ = true
            }
          })
        })
      }
    },
    gzOperationCheck () {
      let flag = true
      this.selectTableData.some((item) => {
        if (item.qualitativeScoreStatus === '退回' && this.isGZ) {
          flag = false
          iMessage.warn(this.$t('SPR_FRM_CBPJ_GZPANDUAN'))
          return true
        }
      })
      return flag
    },
    frmOperationCheck () {
      let flag = true
      this.selectTableData.some((item) => {
        if (item.qualitativeScoreStatus === '退回' && this.isFRM) {
          flag = false
          iMessage.warn(this.$t('SPR_FRM_CBPJ_FRMPANDUAN'))
          return true
        }
      })
      return flag
    },
    defaultOpenScroingDialog () {
      const scoring = this.$route.query.scoring
      if (scoring) {
        const ids = this.$route.query.ids.split(',')
        this.selectTableData = []
        ids.map((item) => {
          this.selectTableData.push({
            id: Number(item)
          })
        })
        this.$nextTick(() => {
          this.qualitativeScoringDialog = true
        })
      } else {
        return false
      }
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
