<!--
 * @Author: moxuan
 * @Date: 2021-04-14 17:30:36
 * @LastEditTime: 2021-04-14 17:30:36
 * @LastEditors: Please set LastEditors
 * @Description: 相关附件
-->
<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ $t('SUPPLIER_FUJIANSHANGCHUAN') }}</span>
      <div class="floatright">
        <i-button @click="saveInfos('')"  v-permission="SUPPLIER_RELATEDACCESSORY_UPLOADATTACHMENTS_EXPORT">
          {{ $t('LK_BAOCUN') }}
        </i-button>
        <i-button @click="exportsTable"
                  v-permission="SUPPLIER_RELATEDACCESSORY_UPLOADATTACHMENTS_EXPORT">{{ $t('LK_DAOCHU') }}
        </i-button>
      </div>
    </div>
    <table-list
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        @handleViewAttachment="handleViewAttachment"
        @handleUploadedCallback="handleUploadedCallback"
        @handleFileDownload="handleFileDownload"
        @handleExampleDownload="handleExampleDownload"
        :index="true"
        v-permission="SUPPLIER_RELATEDACCESSORY_UPLOADATTACHMENTS"
    />
    <attachment-dialog
        @handleSignature="handleSignature"
        :detail="attachmentDetail"
        :loading="attachmentLoading"
        v-model="attachmentDialog"
    />
  </i-card>
</template>

<script>
import {iCard, iButton, iMessage} from "rise";
import {generalPageMixins} from '@/views/generalPage/commonFunMixins'
import tableList from './updatingFilesTableList'
import {upadtingFilesTableTitle} from './data'
import {
  getTemplateList,
  getAttachmentCommitment,
  signatureAttachment,
  saveAttachment
} from "../../../../api/register/relevantAttachments";
import attachmentDialog from './attachmentDialog'
import {downloadFile} from "@/api/file";
import {cloneDeep} from 'lodash'

export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    tableList,
    attachmentDialog
  },
  data() {
    return {
      tableListData: [],
      tableTitle: upadtingFilesTableTitle,
      tableLoading: false,
      selectTableData: [],
      attachmentDialog: false,
      attachmentDetail: '',
      attachmentLoading: false,
      currentTemplateId: ''
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    async getTableList() {
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
    async handleViewAttachment(row) {
      this.attachmentDetail = ''
      this.attachmentDialog = true
      this.attachmentLoading = true
      this.currentTemplateId = row.templateId
      const req = {
        id: this.currentTemplateId
      }
      const res = await getAttachmentCommitment(req)
      this.attachmentDetail = res.data.detail
      this.attachmentLoading = false
    },
    async handleSignature() {
      this.attachmentLoading = true
      const req = {
        step: 'submit',
        id: this.currentTemplateId
      }
      const res = await signatureAttachment(req)
      this.attachmentLoading = false
      res.moduleName = this.$t('SUPPLIER_FUJIANSHANGCHUAN')
      this.resultMessage(res, () => {
        this.attachmentDialog = false
        this.getTableList()
      })
    },
    async handleUploadedCallback(evnet, row) {
      const req = {
        list: [
          {
            file: {
              fileName: evnet.fileName,
              filePath: evnet.filePath,
              fileSize: evnet.fileSize
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
    async saveInfos(step = '', nextStep = false, hideMessage = false) {
      let newTableList = cloneDeep(this.tableListData)
      newTableList = newTableList.filter(item => {
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
        this.resultMessage(res, () => {
          this.getTableList()
          this.nextStep = true
        }, () => {
          this.tableLoading = false
          this.nextStep = false
        })
      }
    },
    async handleFileDownload(row) {
      if (row.attachId && !row.isCommitment) {
        const req = {
          applicationName: 'rise',
          fileList: [row.fileName]
        }
        await downloadFile(req)
      } else {
        return false
      }
    },
    async handleExampleDownload(row) {
      if (row.templateDemoUrl && !row.isCommitment) {
        const req = {
          applicationName: 'rise',
          fileList: [row.templateDemoUrl]
        }
        await downloadFile(req)
      } else {
        iMessage.warn('没有样例文件')
        return false
      }
    },
    async handleNextStep(step = '') {
      await this.saveInfos(step, true)
      return this.nextStep
    }
  }
}
</script>

<style scoped>

</style>
