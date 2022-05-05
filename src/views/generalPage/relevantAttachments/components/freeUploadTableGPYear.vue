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
      <span class="font18 font-weight">{{ $t('SUPPLIER_ZIYOUSHANGCHUAN') }}</span>
      <div class="floatright" v-if="$route.query.subSupplierType!=='GP'">
        <i-button @click="deleteItem"  v-permission="SUPPLIER_RELATEDACCESSORY_FREEUPLOAD_DELETE">{{
            $t('SUPPLIER_FUJIANSHANCHU')
          }}
        </i-button>
        <upload-button class="margin-left20" @uploadedCallback="handleUploadedCallback" v-permission="SUPPLIER_RELATEDACCESSORY_FREEUPLOAD_ADD"/>
      </div>
      <div class="floatright" v-if="$route.query.subSupplierType=='GP'">
        <i-button @click="deleteItem"  v-permission="SUPPLIER_RELATEDACCESSORY_FREEUPLOAD_DELETE_GP">{{
            $t('SUPPLIER_FUJIANSHANCHU')
          }}
        </i-button>
        <upload-button class="margin-left20" @uploadedCallback="handleUploadedCallback" v-permission="SUPPLIER_RELATEDACCESSORY_FREEUPLOAD_ADD_GP"/>
      </div>
    </div>
        <!-- v-permission="SUPPLIER_RELATEDACCESSORY_FREEUPLOAD" -->
    <table-list
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :openPageGetRowData="true"
        openPageProps="fileName"
        @openPage="handleDownload"
        :index="true"
        border
    >
      <template #validityOfCertificate="scope">
        <iDatePicker
            value-format="yyyy-MM-dd"
            v-model="scope.row.validityOfCertificate"
            type="date"
            :placeholder="$t('SUPPLIER_XUANZERQI')"
            :picker-options="{disabledDate(time) {return time.getTime() < Date.now() - 24 * 60 * 60 * 1000}}"
        />
      </template>
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
  getFreeAttachmentList,
  deleteAttachment,
  saveAttachment
} from "@/api/register/relevantAttachments";

export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    tableList,
    uploadButton,
    iDatePicker
  },
  data() {
    return {
      tableListData: [],
      tableTitle: freeUploadTableTitle,
      tableLoading: false,
      selectTableData: []
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    async getTableList() {
      this.tableLoading = true
      const req = {
        pageNo: 1,
        pageSize: 9999,
        step: 'submit',
        supplierToken:this.$route.query.supplierToken
      }
      const res = await getFreeAttachmentList(req)
      this.tableListData = res.data
      this.tableLoading = false
    },
    async deleteItem() {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t("LK_NINDANGQIANHAIWEIXUANZE"));
      }
      iMessageBox(
          this.$t('LK_SHIFOUQUERENSHANCHU'),
          this.$t('LK_WENXINTISHI'),
          {confirmButtonText: this.$t('LK_QUEDING'), cancelButtonText: this.$t('LK_QUXIAO')}
      ).then(async () => {
        const ids = this.selectTableData.map(item => {
          return item.id
        })
        const req = {
          ids
        }
        const res = await deleteAttachment(req)
        res.moduleName = this.$t('SUPPLIER_ZIYOUSHANGCHUAN')
        this.resultMessage(res, () => {
          this.getTableList()
        })
      })
    },
    async handleDownload(row) {
      const req = {
        applicationName: 'rise',
        fileList: [row.fileName]
      }
      await downloadFile(req)
    },
    async handleUploadedCallback(event) {
      this.tableLoading = true
      const req = {
        list: [
          {
            file: {
              fileName: event.fileName,
              filePath: event.filePath,
              fileSize: event.fileSize
            }
          }
        ],
        step: 'submit'
      }
      const res = await saveAttachment(req)
      await this.saveInfos('', true)
      res.moduleName = this.$t('SUPPLIER_ZIYOUSHANGCHUAN')
      this.resultMessage(res, () => {
        this.getTableList()
        this.tableLoading = false
      }, () => {
        this.tableLoading = false
      })
    },
    async saveInfos(step = '', hideMessage = false) {
      this.tableLoading = true
      const req = {
        list: this.tableListData,
        step: 'submit'
      }
      if (step !== '') {
        req.step = step
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
    async handleNextStep(step = '') {
      await this.saveInfos(step)
      return this.nextStep
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
