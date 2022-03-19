<!--
 * @Author: moxuan
 * @Date: 2021-04-14 17:30:36
 * @LastEditTime: 2022-02-16 17:47:37
 * @LastEditors: YoHo
 * @Description: 相关附件
-->
<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{
        $t('SUPPLIER_FUJIANSHANGCHUAN')
      }}</span>
      <div class="floatright">
        <i-button @click="saveInfos('')"
                  v-permission="SUPPLIER_RELATEDACCESSORY_UPLOADATTACHMENTS_EXPORT_BAOCUN">
          {{ $t('LK_BAOCUN') }}
        </i-button>
        <i-button @click="exportsTable"
                  v-permission="SUPPLIER_RELATEDACCESSORY_UPLOADATTACHMENTS_EXPORT">{{ $t('LK_DAOCHU') }}
        </i-button>
      </div>
    </div>
    <!-- v-permission="SUPPLIER_RELATEDACCESSORY_UPLOADATTACHMENTS"  -->
    <table-list :tableData="tableListData"
                ref="table"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                @handleSelectionChange="handleSelectionChange"
                @handleViewAttachment="handleViewAttachment"
                @handleUploadedCallback="handleUploadedCallback"
                @handleFileDownload="handleFileDownload"
                @handleExampleDownload="handleExampleDownload"
                @viewPublish="viewPublish"
                @publish="publish"
                :index="true"
                :disabled="disabled" />
    <attachment-dialog @handleSignature="handleSignature"
                       :detail="attachmentDetail"
                       :id=currentTemplateId
                       :loading="attachmentLoading"
                       v-model="attachmentDialog"
                       :disableButton="disableButton" />
    <clause-dialog v-model="show"
                   :supplierId="supplierId"
                   @purchaseTerms="purchaseTerms"
                   :isMaintain="isMaintain"></clause-dialog>
  </i-card>
</template>

<script>
import { iCard, iButton, iMessage } from 'rise'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import tableList from './updatingFilesTableList'
import { upadtingFilesTableTitle } from './data'
import {
  getTemplateList,
  getAttachmentCommitment,
  signatureAttachment,
  saveAttachment
} from '../../../../api/register/relevantAttachments'
import attachmentDialog from './attachmentDialog'
import { downloadUdFile } from '@/api/file'
import { cloneDeep } from 'lodash'
import clauseDialog from "@/views/generalPage/clausePage/clauseDialog.vue";
import { purchaseTerms } from '@/api/frmRating/overView/overView.js'

export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    tableList,
    attachmentDialog,
    clauseDialog
  },
  data () {
    return {
      tableListData: [],
      tableTitle: upadtingFilesTableTitle,
      tableLoading: false,
      selectTableData: [],
      attachmentDialog: false,
      attachmentDetail: '',
      disableButton: false,
      attachmentLoading: false,
      currentTemplateId: '',
      attachmentInfo: {},
      isMaintain: true,
      show: false,
      disabled: false,
    }
  },
  computed: {
    supplierId () {
      return this.$store.state.baseInfo.baseMsg.ppSupplierDTO.id
    },
    supplierIdMain () {
      return this.$store.state.baseInfo.baseMsg.supplierDTO.id
    },
  },
  created () {
    this.getTableList()
    this.purchaseTerms()
  },
  mounted () {
  },
  methods: {
    async purchaseTerms () {
      let disabled = false
      let params = {
        supplierId: this.supplierId,
        headerId: this.$store.state.permission.userInfo.id // 就是Linie id
      }
      await purchaseTerms(params).then(res => {
        if (res?.code == '200') {
          res.data.forEach(i => {
            disabled = disabled || ['02', '04', '05'].includes(i.termsStatus) // 02:审批中,04:审批通过,05:签署中
          })
        }
      })
      this.disabled = disabled
    },
    async getTableList () {
      this.tableLoading = true
      try {
        const req = {
          pageNo: 1,
          pageSize: 9999,
          step: 'submit'
        }
        const res = await getTemplateList(req)
        this.tableListData = res.data
        this.tableLoading = false
      } catch {
        this.tableLoading = false
      }
    },
    async publish (row) {
      if (!this.supplierId&&this.supplierIdMain) {
        iMessage.error('供应商id获取失败')
        return
      }
      await this.purchaseTerms()
      if (this.disabled) return
      let query = {
        supplierId: this.supplierId,
        supplierIdMain: this.supplierIdMain
      }
      const router = this.$router.resolve({ path: '/clausepage/item', query })
      window.open(router.href, '_blank')
    },
    viewPublish (row) {
      if (!this.supplierId) {
        iMessage.error('供应商id获取失败')
        return
      }
      this.show = true
    },
    async handleViewAttachment (row) {
      this.attachmentInfo = {}
      this.attachmentDetail = ''
      this.attachmentDialog = true
      this.attachmentLoading = true
      this.currentTemplateId = row.templateId
      const req = {
        id: this.currentTemplateId
      }
      const res = await getAttachmentCommitment(req)
      this.attachmentDetail = res.data?.detail
      this.disableButton = (res.data?.termsId == null)
      this.attachmentLoading = false
      this.attachmentInfo = res.data
    },
    async handleSignature (detailContent) {
      this.attachmentLoading = true
      const req = {
        step: 'submit',
        id: this.currentTemplateId,
        termsId: this.attachmentInfo.termsId || '',
        termsVersion: this.attachmentInfo.termsVersion || '',
        termsContent: detailContent
      }
      const res = await signatureAttachment(req)
      this.attachmentLoading = false
      res.moduleName = this.$t('SUPPLIER_FUJIANSHANGCHUAN')
      this.resultMessage(res, () => {
        this.attachmentDialog = false
        this.getTableList()
      })
    },
    async handleUploadedCallback (evnet, row) {
      const req = {
        list: [
          {
            file: {
              // fileName: evnet.fileName,
              // filePath: evnet.filePath,
              // fileSize: evnet.fileSize
              // TODO上传返回的字段临时修改
              fileName: evnet.name,
              filePath: evnet.path,
              fileSize: evnet.size,
              id: evnet.path.split('?')[1].split('=')[1]
            },
            ...row
          }
        ],
        step: 'submit'
      }
      const res = await saveAttachment(req)
      await this.saveInfos('', false, true)
      res.moduleName = this.$t('SUPPLIER_FUJIANSHANGCHUAN')
      this.resultMessage(res, () => {
        this.getTableList()
      })
    },
    async saveInfos (step = '', nextStep = false, hideMessage = false) {
      let newTableList = cloneDeep(this.tableListData)
      newTableList = newTableList.filter((item) => {
        return !item.isCommitment
      })
      this.tableLoading = true
      const req = {
        list: newTableList,
        step: 'submit'
      }
      if (nextStep) {
        req.isCheck = true
      }
      if (step !== '') {
        req.step = step
      }
      const res = await saveAttachment(req)
      res.moduleName = this.$t('SUPPLIER_FUJIANSHANGCHUAN')
      if (hideMessage) {
        if (res.result) {
          this.getTableList()
        } else {
          this.tableLoading = false
        }
      } else {
        this.resultMessage(
          res,
          () => {
            this.getTableList()
            this.nextStep = true
          },
          () => {
            this.tableLoading = false
            this.nextStep = false
          }
        )
      }
    },
    async handleFileDownload (row) {
      console.log(row)
      if (row.attachId && !row.isCommitment) {
        // const req = {
        //   applicationName: 'rise',
        //   fileList: [row.fileName]
        // }
        await downloadUdFile(row.fileId)
      } else {
        return false
      }
    },
    async handleExampleDownload (row) {
      console.log(row)
      if (row.templateDemoUrl && !row.isCommitment) {
        // const req = {
        //   applicationName: 'rise',
        //   fileList: [row.templateDemoUrl]
        // }
        await downloadUdFile(row.templateDemoUrl)
      } else {
        iMessage.warn('没有样例文件')
        return false
      }
    },
    async handleNextStep (step = '') {
      await this.saveInfos(step, true)
      return this.nextStep
    }
  }
}
</script>

<style scoped></style>
