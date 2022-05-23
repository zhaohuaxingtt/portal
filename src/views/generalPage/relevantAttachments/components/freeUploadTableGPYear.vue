<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2022-03-03 17:06:54
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ws3\generalPage\mainSubSuppliersAndProductNames\index.vue
-->
<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{
        $t('SUPPLIER_ZIYOUSHANGCHUAN')
      }}</span>
      <div class="floatright" v-if="!approveValue">
        <i-button @click="deleteItem">{{
          $t('SUPPLIER_FUJIANSHANCHU')
        }}</i-button>
        <upload-button class="margin-left20"
                       @uploadedCallback="handleUploadedCallback"
                       />
      </div>
    </div>
    <table-list :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                @handleSelectionChange="handleSelectionChange"
                :openPageGetRowData="true"
                openPageProps="fileName"
                @openPage="handleDownload"
                :index="true"
                v-permission="SUPPLIER_RELATEDACCESSORY_FREEUPLOAD">
      <!-- <template #validityOfCertificate="scope"> -->
        <!-- <iDatePicker value-format="yyyy-MM-dd"
                     v-model="scope.row.validityOfCertificate"
                     type="date"
                     :placeholder="$t('SUPPLIER_XUANZERQI')"
                     :picker-options="{
            disabledDate(time) {
              return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
            }
          }" /> -->
      <!-- </template> -->
    </table-list>
  </i-card>
</template>

<script>
import {iCard, iButton, iMessage, iMessageBox, iDatePicker} from "rise";
import {generalPageMixins} from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import {freeUploadTableTitle} from './data'
import uploadButton from '@/components/uploadButton'
import {downloadFile} from "@/api/file";
import {
  saveAttachment,
  supplierFileReloadSave,
  getSupplierFileReloadVo,
  supplierFreeFileReloadDelete
} from "@/api/register/relevantAttachments";

import _ from 'lodash'
import { mapMutations } from 'vuex'

export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    tableList,
    uploadButton,
    iDatePicker
  },
  props:{
    approveValue: { type: Boolean, default: false },
  },
  data() {
    return {
      tableListData: [],
      oldTableListDataStr: '',
      tableTitle: freeUploadTableTitle,
      tableLoading: false,
      selectTableData: [],
      supplierToken:"",
      isFirst: true,
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    async getTableList () {
      this.tableLoading = true
      try {
        var res = await getSupplierFileReloadVo({taskId:this.$route.query.id})
        if(res.data){
          this.supplierToken = res.data.token;
          this.tableListData = res.data.attachList;
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

    async deleteItem () {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'))
      }
      iMessageBox(
        this.$t('LK_SHIFOUQUERENSHANCHU'),
        this.$t('LK_WENXINTISHI'),
        {
          confirmButtonText: this.$t('LK_QUEDING'),
          cancelButtonText: this.$t('LK_QUXIAO')
        }
      ).then(async () => {
        const ids = this.selectTableData.map((item) => {
          return Number(item.id)
        })
        const res = await supplierFreeFileReloadDelete(ids)
        if (res?.code === '200') {
          iMessage.success(res.desZh)
          this.getTableList()
        }
        // res.moduleName = this.$t('SUPPLIER_ZIYOUSHANGCHUAN')
        // this.resultMessage(res, () => {
        //   this.getTableList()
        // })
      })
    },
    async handleDownload (row) {
      const req = row.fileId
      await downloadUdFileNew(req)
    },
    async handleUploadedCallback (event, row) {
      const red = {
        fileId:event.id,
        tempCode:this.$route.query.tempCode,
        supplierToken:this.supplierToken,
      }
      const res = await supplierFileReloadSave(red);
      // TODO先注释代码，重复调用接口attachment/save
      if(res.result){
        iMessage.success(this.$t('SUPPLIER_FUJIANSHANGCHUAN'))
        this.getTableList()
      }else{
        iMessage.error(res.desZh)
      }
    },
    async saveInfos (step = '', hideMessage = false) {
      this.tableLoading = true
      const req = {
        list: this.tableListData,
        businessType: this.supplierGP,
        step: 'register'
      }
      if (this.supplierType > 3) {
        req.step = 'submit'
      }
      if (step !== '') {
        req.step = step
      }
      const res = await saveAttachment(req, this.supplierType)
      res.moduleName = this.$t('SUPPLIER_ZIYOUSHANGCHUAN')
      if (hideMessage) {
        if (res.result) {
          this.getTableList()
        } else {
          this.tableLoading = false
        }
      } else {
        console.log(hideMessage)
        this.resultMessage(
          res, hideMessage,
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
    async handleNextStep (step = '') {
      if (this.tableListData?.length === 0) {
        await this.saveInfos(step, true)
      }
      return this.nextStep
    },
    ...mapMutations({
      setFlag: 'SET_FLAG',
      setIsDisabledSave: 'SET_IS_DISABLED_SAVE'
    })
  },
  watch: {
    tableListData: {
      handler (newVal) {
        const flag = JSON.stringify(newVal) == this.oldTableListDataStr
        if (this.name == 'relevantAttachments' && this.oldVuexStoreFlag) {
          this.setFlag(flag)
        }
        if (!flag) {
          this.setIsDisabledSave(false)
        } else {
          // this.setIsDisabledSave(true)
        }
      },
      immediate: false,
      deep: true
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-form-item{
  margin-top: 0;
  margin-bottom: 0;
}
</style>
