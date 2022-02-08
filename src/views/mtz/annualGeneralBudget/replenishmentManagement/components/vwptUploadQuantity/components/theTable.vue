<template>
  <div>
    <iCard v-loading="cardLoading">
      <div class="margin-bottom20">
        <span class="font18 font-weight">{{language('BUCHAXIANGQING', '补差详情')}}</span>
        <div class="floatright">
          <iButton @click="handleDownloadTemplate" :loading="downloadTemplateButtonLoading"
                    v-permission="MTZ_REPORT_BUCHAGUANLI_VWPTSHANGZAISHULIANG_XIAZAIMUBAN"
          >
            {{ language('XIAZAIMOBAN', '下载模板')}}
          </iButton>
          <uploadButton
              v-permission="MTZ_REPORT_BUCHAGUANLI_VWPTSHANGZAISHULIANG_SHANGCHUAN"
              ref="uploadButtonAttachment"
              :buttonText="language('SHANGCHUAN', '上传')"
              :uploadByBusiness="true"
              @uploadedCallback="handleUpload($event)"
              class="margin-left10"
          />
        </div>
      </div>
      <tableList
          ref="commonTable"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :index="true"
          :selection="false"
      />
      <iPagination
          v-update
          @size-change="handleSizeChange($event, handleSizeChange($event))"
          @current-change="handleCurrentChange($event, getTableList)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page='page.currPage'
          :total="page.totalCount"/>
    </iCard>
    <uploadDialog v-model="dialogParams.visible" :tableTitle="errorInfoTableTitle" :key="dialogParams.key" :data="dialogParams.data" @handleCloseDialog="handleCloseDialog"/>
  </div>
</template>

<script>
import {iCard, iPagination, iButton} from 'rise';
import {pageMixins} from '@/utils/pageMixins';
import resultMessageMixin from '@/mixins/resultMessageMixin';
import tableList from '@/components/commonTable';
import uploadButton from '@/components/uploadButton';
import {tableTitle} from './data';
import {downloadFileByUrl} from '@/utils';
import {downloadUdFile} from '@/api/file';
import {
  getTableList,
  getTemplateUrl,
  uploadAttach,
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/vwptUploadQuantity';
import uploadDialog from '@/views/mtz/dataBase/marketPriceEnquiry/components/uploadInfoDialog'
import { errorInfoTableTitle } from './data'
export default {
  mixins: [pageMixins, resultMessageMixin],
  components: {
    iPagination,
    iCard,
    iButton,
    tableList,
    uploadButton,
    uploadDialog
  },
  data() {
    return {
      tableListData: [],
      tableTitle,
      downloadTemplateButtonLoading: false,
      cardLoading: false,
      dialogParams: {
        key: 0,
        visible: false,
        data: []
      },
      errorInfoTableTitle,
      searchForm: {}
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    async getTableList() {
      this.cardLoading = true;
      try {
        const req = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          ...this.searchForm,
          secReceiptDateStart: this.searchForm.secReceiptDate ? this.searchForm.secReceiptDate[0] : null,
          secReceiptDateEnd: this.searchForm.secReceiptDate ? this.searchForm.secReceiptDate[1] : null,
        };
        const res = await getTableList(req);
        if (res.result) {
          this.tableListData = res.data;
          this.page.currPage = res.pageNum;
          this.page.pageSize = res.pageSize;
          this.page.totalCount = res.total || 0;
        } else {
          this.resultMessage(res);
          this.tableListData = [];
        }
      } catch {
        this.tableListData = [];
      } finally {
        this.cardLoading = false;
      }
    },
    // 分页参数改变：每页条数变化
    handleSizeChange(val) {
      this.page.pageSize = val
      this.page.currPage = 1
      this.getTableList()
    },
    async handleDownloadTemplate() {
      try {
        this.downloadTemplateButtonLoading = true;
        const res = await getTemplateUrl();
        console.log(res);
        if(res.code == "200" && res.result){
          downloadUdFile(res.data);
        }
      } finally {
        this.downloadTemplateButtonLoading = false;
      }

    },
    async handleUpload(content) {
      try {
        this.cardLoading = true;
        const formData = new FormData();
        formData.append('file', content.file);
        formData.append('userId', this.$store.state.permission.userInfo.id);
        const res = await uploadAttach(formData);
        if(res && res.data && res.data.length > 0) {
            this.dialogParams = {
              ...this.dialogParams,
              key: Math.random(),
              visible: true,
              data: res.data
            }
            return
          }
        this.resultMessage(res, () => {
          this.getTableList();
        });
      } finally {
        this.cardLoading = false;
      }
    },
        // 关闭弹窗
    handleCloseDialog() {
      this.dialogParams.visible = false
    }
  },
};
</script>

<style scoped>

</style>
