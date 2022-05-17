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
    </div>
    <table-list :tableData="tableListData"
                ref="table"
                :tableTitle="tableTitle"
                :selection="false"
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
import tableList from './updatingFilesTableListYear'
import { upadtingFilesTableTitle } from './data'
import {
  getTemplateListNew,
  getAttachmentCommitment,
  signatureAttachment,
  saveAttachmentNew,
  submitTempTaskInfo,
  getSupplierFileReloadVo,
  supplierFileReloadSave
} from '../../../../api/register/relevantAttachments'
import attachmentDialog from './attachmentDialog'
import { downloadUdFile } from '@/api/file'
import { cloneDeep } from 'lodash'
import clauseDialog from "@/views/generalPage/clausePage/clauseDialog.vue";
import { purchaseTerms } from '@/api/frmRating/overView/overView.js'

export default {
  mixins: [generalPageMixins],
  props:{
    
  },
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
      supplierToken:"",
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
  },
  mounted () {
  },
  methods: {
    reluesType(){
      // let newTableList = cloneDeep(this.tableListData)
      // var requiredNum = 0;
      // newTableList.forEach(e => {
      //   if(e.required){
      //     if(!e.fileId){
      //       requiredNum++;
      //     }
      //   }
      // });
      // if(requiredNum !== 0){
      //   iMessage.error("请上传附件名称中带星号的附件")
      //   return;
      // }else{
        submitTempTaskInfo({
            taskId:this.$route.query.id,
            supplierToken:this.supplierToken
        }).then(res=>{
            if(res.result){
                iMessage.success(res.desZh);
            }else{
                iMessage.error(res.desZh);
            }
        })
      // }
    },
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
        var res = await getSupplierFileReloadVo({taskId:this.$route.query.id})
        if(res.data){
          this.supplierToken = res.data.token;
          this.$emit("getSupplierToken",res.data.token);
          this.tableListData = res.data.informationList;
          this.tableLoading = false
          if (this.isFirst) {
            this.oldTableListDataStr = JSON.stringify(_.cloneDeep(this.tableListData))
            this.isFirst = false
          }
        }else{
          iMessage.error(res.desZh);
        }
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
      console.log(evnet, row)

      const red = {
        id:row.attachId,
        fileId:evnet.id,
        supplierToken:this.supplierToken
      }
      const res = await supplierFileReloadSave(red);
      console.log(res);
      // TODO先注释代码，重复调用接口attachment/save
      // await this.saveInfos('', false, true)
      if(res.result){
        iMessage.success(this.$t('SUPPLIER_FUJIANSHANGCHUAN'))
        this.getTableList()
      }else{
        iMessage.error(res.desZh)
      }
    },
    async saveInfos (step = '', nextStep = false, hideMessage = false) {
      let newTableList = cloneDeep(this.tableListData)
      newTableList = newTableList.filter((item) => {
        return !item.isCommitment
      })
      this.tableLoading = true
      const req = {
        list: newTableList,
        step: 'submit',
        supplierToken:this.supplierToken
      }
      if (nextStep) {
        req.isCheck = true
      }
      if (step !== '') {
        req.step = step
      }
      const res = await saveAttachmentNew(req)
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
