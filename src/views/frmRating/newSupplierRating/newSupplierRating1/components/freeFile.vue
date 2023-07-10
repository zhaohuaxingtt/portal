<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2022-05-05 17:03:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ws3\generalPage\mainSubSuppliersAndProductNames\index.vue
-->
<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ $t('SUPPLIER_FUJIANSHANGCHUAN') }}</span>
      <div v-if="$route.path !== '/supplier/frmrating/newsupplierrating/task'">
        <div class="floatright" v-if="$route.query.subSupplierType!=='GP'">
          <i-button @click="deleteItem" v-permission="SUPPLIER_RELATEDACCESSORY_FREEUPLOAD_DELETE">{{$t('SUPPLIER_FUJIANSHANCHU')}}</i-button>
          <upload-button class="margin-left20"
                        @uploadedCallback="handleUploadedCallback"
                        :uploadButtonLoading="uploadButtonLoading"
                        v-permission="SUPPLIER_RELATEDACCESSORY_FREEUPLOAD_ADD" />
        </div>
        <div class="floatright" v-if="$route.query.subSupplierType=='GP'">
          <i-button @click="deleteItem" v-permission="SUPPLIER_RELATEDACCESSORY_FREEUPLOAD_DELETE_GP">{{$t('SUPPLIER_FUJIANSHANCHU')}}</i-button>
          <upload-button class="margin-left20"
                        @uploadedCallback="handleUploadedCallback"
                        :uploadButtonLoading="uploadButtonLoading"
                        v-permission="SUPPLIER_RELATEDACCESSORY_FREEUPLOAD_ADD_GP" />
        </div>
      </div>
    </div>
    <!-- v-permission="SUPPLIER_RELATEDACCESSORY_FREEUPLOAD" -->
    <table-list :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                @handleSelectionChange="handleSelectionChange"
                :openPageGetRowData="true"
                openPageProps="fileName"
                @openPage="handleDownload"
                :index="true"
                border>
      <template #validityOfCertificate="scope">
        <template v-if="$route.path !== '/supplier/frmrating/newsupplierrating/task'">
          <iDatePicker value-format="yyyy-MM-dd"
                     v-model="scope.row.validityOfCertificate"
                     type="date"
                     :placeholder="$t('SUPPLIER_XUANZERQI')"
                     :picker-options="{disabledDate(time) {return time.getTime() < Date.now() - 24 * 60 * 60 * 1000}}" />
        </template>
        <template v-else>
          <span>{{scope.row.validityOfCertificate}}</span>
        </template>
      </template>
    </table-list>
  </i-card>
</template>

<script>
import { iCard, iButton, iMessage, iMessageBox, iDatePicker } from "rise";
import tableList from '@/components/commonTable'
import { freeUploadTableTitle } from './data'
import { getNewSupplierInfo,  } from "@/api/frmRating/newSupplierRating/newSupplierRating";
import uploadButton from '@/components/uploadButton'
import { downloadFile, downloadUdFile } from "@/api/file";
import {
  getFreeAttachmentList,
  deleteAttachment,
  saveAttachment
} from "@/api/register/relevantAttachments";

export default {
  components: {
    iCard,
    iButton,
    tableList,
    uploadButton,
    iDatePicker
  },
  data () {
    return {
      tableListData: [],
      tableTitle: freeUploadTableTitle,
      tableLoading: false,
      uploadButtonLoading: false,
      selectTableData: []
    }
  },
  async created () {
    await this.getSupplier()
    this.getTableList()
  },
  methods: {
    handleSelectionChange(val){
      this.selectTableData = val;
    },
    async getSupplier(){
      const pms = {
        ratingId: this.$route.query.ratingId || this.$route.query.id,
        ratingSupplierId: this.$route.query.supplierId,
      }
      const res = await getNewSupplierInfo(pms)
      this.supplierToken = res.data.supplierToken;
    },
    async getTableList () {
      this.tableLoading = true
      var req = {}
      if(this.$route.path == "/supplier/frmrating/newsupplierrating/rating1" || this.$route.path == "/supplier/frmrating/newsupplierrating/task"){
        req = {
          pageNo: 1,
          pageSize: 9999,
          supplierToken:this.supplierToken,
          step:"newGrade",
        }
      }else{
        req = {
          pageNo: 1,
          pageSize: 9999,
          supplierToken:this.supplierToken,
        }
      }

      const res = await getFreeAttachmentList(req)
      this.tableListData = res.data
      this.tableLoading = false
    },
    async deleteItem () {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t("LK_NINDANGQIANHAIWEIXUANZE"));
      }
      iMessageBox(
        this.$t('LK_SHIFOUQUERENSHANCHU'),
        this.$t('LK_WENXINTISHI'),
        { confirmButtonText: this.$t('LK_QUEDING'), cancelButtonText: this.$t('LK_QUXIAO') }
      ).then(async () => {
        const ids = this.selectTableData.map(item => {
          return item.id
        })
        const req = {
          ids
        }
        deleteAttachment(req).then(res=>{
          if(res.result){
            iMessage.success(res.desZh)
            this.getTableList()
          }else{
            iMessage.success(res.desZh)
          }
        })
      })
    },
    async handleDownload (row) {
      // const req = {
      //   applicationName: 'rise',
      //   fileList: [row.fileName]
      // }
      await downloadUdFile(row.fileId)
    },
    async handleUploadedCallback (event) {
      console.log(event)
      this.tableLoading = true
      this.uploadButtonLoading = true

      console.log(this.$route.path)
      var req = {};
      if(this.$route.path == "/supplier/frmrating/newsupplierrating/rating1" || this.$route.path == '/supplier/frmrating/newsupplierrating/task'){
        req = {
          list: [
            {
              file: {
                fileName: event.name,
                filePath: event.path,
                fileSize: event.size,
                id: event.id
              }
            }
          ],
          step:"newGrade",
        }
      }else{
        req = {
          list: [
            {
              file: {
                fileName: event.name,
                filePath: event.path,
                fileSize: event.size,
                id: event.id
              }
            }
          ],
        }
      }
      saveAttachment(req).then(res=>{
        if(res.result){
          iMessage.success(res.desZh)
          this.getTableList()
        }else{
          iMessage.success(res.desZh)
        }
      }).finally(()=>{
        this.uploadButtonLoading = false
      })
    },
    async saveInfos (step = '', hideMessage = false) {
      this.tableLoading = true
      const req = {
        list: this.tableListData,
      }
      const res = await saveAttachment(req)
      res.moduleName = this.$t('SUPPLIER_ZIYOUSHANGCHUAN')
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
    async handleNextStep (step = '') {
      await this.saveInfos(step)
      return this.nextStep
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
