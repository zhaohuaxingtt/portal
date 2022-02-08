<template>
  <div>
    <iCard v-loading="cardLoading">
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{language('SHICHANGJIAXIANGQING', '市场价详情')}}</span>
        <div class="floatright">
          <template v-if="!tableEditStatus">
            <uploadButton ref="uploadButtonAttachment"
                          :buttonText="language('SHANGCHUANFUJIAN', '上传附件')"
                          v-permission="PORTAL_MTZ_SEARCH_GUIJINSHUSHICHANGJIACHAXUN_SHANGCHUANFJ"
                          :uploadByBusiness="true"
                          :hideButton="true"
                          @uploadedCallback="handleUpload($event, 'attachment')" />
            <iButton @click="clickUpload(ATTACHMENT)" v-permission="PORTAL_MTZ_SEARCH_GUIJINSHUSHICHANGJIACHAXUN_SHANGCHUANFJ">{{ language('SHANGCHUANFUJIAN', '上传附件') }}</iButton>
            <iButton @click="handleDelete" v-permission="PORTAL_MTZ_SEARCH_GUIJINSHUSHICHANGJIACHAXUN_SHANCHUFJ">{{ language('SHANCHUFUJIAN', '删除附件') }}</iButton>
            <iButton @click="handleDownloadTemplate"
                      v-permission="PORTAL_MTZ_SEARCH_GUIJINSHUSHICHANGJIACHAXUN_XIAZAIMUBAN"
                     :loading="downloadTemplateButtonLoading">
              {{ language('XIAZAIMUBAN', '下载模板')}}
            </iButton>
            <uploadButton ref="uploadButtonOrder"
                          v-permission="PORTAL_MTZ_SEARCH_GUIJINSHUSHICHANGJIACHAXUN_SHANGCHUANDJD"
                          :buttonText="language('SHANGCHUANDIANJIADAN', '上传点价单')"
                          :uploadByBusiness="true"
                          @uploadedCallback="handleUpload($event, 'order')"
                          class="margin-left10 margin-right10" />
            <iButton @click="handleEdit" v-permission="PORTAL_MTZ_SEARCH_GUIJINSHUSHICHANGJIACHAXUN_BIANJI">{{ language('BIANJI', '编辑') }}</iButton>
            <iButton @click="handleExport"
                     :loading="exportButtonLoading" v-permission="PORTAL_MTZ_SEARCH_GUIJINSHUSHICHANGJIACHAXUN_DAOCHU">{{ language('DAOCHU', '导出') }}</iButton>
          </template>
          <template v-else>
            <iButton @click="handleCancel">{{ language('QUXIAO', '取消') }}</iButton>
            <iButton @click="handleSave">{{ language('BAOCUN', '保存') }}</iButton>
          </template>
        </div>
      </div>
      <tableList ref="commonTable"
                 :tableData="tableListData"
                 :tableTitle="tableTitle"
                 :index="true"
                 openPageProps="fileName"
                 :openPageGetRowData="true"
                 @handleSelectionChange="handleSelectionChange"
                 @openPage="handleOpenPage">
        <template #partNumber="scope">
          <iInput v-Int
                  v-if="tableEditStatus && (scope.row.partNumber != scope.row.bulkPartsConsume + scope.row.partsConsume)"
                  v-model="scope.row.partNumber"></iInput>
          <p v-else>{{scope.row.partNumber}}</p>
        </template>
        <template #partsConsume="scope">
          <iInput v-Int
                  v-if="tableEditStatus"
                  v-model="scope.row.partsConsume"></iInput>
          <p v-else>{{scope.row.partsConsume}}</p>
        </template>
      </tableList>
      <iPagination v-update
                   @size-change="handleSizeChange($event, getTableList)"
                   @current-change="handleCurrentChange($event, getTableList)"
                   background
                   :page-sizes="page.pageSizes"
                   :page-size="page.pageSize"
                   :layout="page.layout"
                   :current-page='page.currPage'
                   :total="page.totalCount" />
    </iCard>
    <orderDialog v-model="orderDialogParams.visible"
                 :key="orderDialogParams.key"
                 :tableTitle="orderInfoTableTitle"
                 :data="orderDialogParams.data"
                 @handleCloseDialog="handleCloseDialog" />
  </div>
</template>

<script>
import { iCard, iPagination, iButton, iMessage, iMessageBox, iInput } from 'rise';
import { pageMixins } from '@/utils/pageMixins';
import resultMessageMixin from '@/mixins/resultMessageMixin';
import tableList from '@/components/commonTable';
import uploadButton from '@/components/uploadButton';
import { tableTitle } from './data';
import orderDialog from '@/views/mtz/dataBase/marketPriceEnquiry/components/uploadInfoDialog'
import { orderInfoTableTitle } from './data'
import {
  getTableList,
  getTemplateUrl,
  handleExport,
  deleteAttach,
  uploadAttach,
  saveAndUpdate,
  uploadOrder,
  fileudUdDown
} from '@/api/mtz/database/preciousMetalMarketPriceInquiry';
import { downloadFileByUrl } from '@/utils';
import {downloadUdFile} from '@/api/file';

export default {
  mixins: [pageMixins, resultMessageMixin],
  components: {
    iPagination,
    iCard,
    iButton,
    tableList,
    uploadButton,
    iInput,
    orderDialog
  },
  data () {
    return {
      tableListData: [],
      backupData: [],
      tableTitle,
      tableEditStatus: false,
      selectTableData: [],
      downloadTemplateButtonLoading: false,
      exportButtonLoading: false,
      cardLoading: false,
      ATTACHMENT: 'attachment',
      ORDER: 'order',
      orderDialogParams: {
        key: 0,
        visible: false,
        data: []
      },
      orderInfoTableTitle
    };
  },
  created () {
    this.getTableList();
  },
  methods: {
    handleSelectionChange (val) {
      this.selectTableData = val;
    },
    handleEdit () {
      this.tableEditStatus = true;
      this.backupData = window._.cloneDeep(this.tableListData)
    },
    handleCancel () {
      this.tableEditStatus = false;
      this.tableListData = window._.cloneDeep(this.backupData)
    },
    async handleSave () {
      try {
        this.cardLoading = true;
        const req = {
          saveList: this.tableListData,
        };
        const res = await saveAndUpdate(req);
        this.resultMessage(res, () => {
          this.handleCancel();
          this.getTableList();
        });
      } finally {
        this.cardLoading = false;
      }
    },
    async getTableList () {
      this.cardLoading = true;
      const searchItem = this.$parent.$children.filter(item => {
        return item.$attrs.name === 'theSearch';
      });
      const searchForm = searchItem[0].form;
      searchForm['purDateStart'] = searchForm.purDate ? searchForm.purDate[0] : null
      searchForm['purDateEnd'] = searchForm.purDate ? searchForm.purDate[1] : null
      try {
        const req = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          ...searchForm,
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
    handleOpenPage (row) {
      downloadFileByUrl(row.fileUrl);
    },
    async handleExport () {
      try {
        const searchItem = this.$parent.$children.filter(item => {
          return item.$attrs.name === 'theSearch';
        });
        const searchForm = searchItem[0].form;
        this.exportButtonLoading = true;
        handleExport({
          ids: this.selectTableData.map(item => item.id),
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          ...searchForm
        });
      } finally {
        this.exportButtonLoading = false;
      }
    },
    async handleDownloadTemplate () {
      let res
      try {
        this.downloadTemplateButtonLoading = true;
        res = await getTemplateUrl();
        if(res.code == "200" && res.result){
          downloadUdFile(res.data);
        }
      } catch {
        iMessage.error(res.desZh)
      } finally {
        // iMessage.success(res.desZh)
        this.downloadTemplateButtonLoading = false;
      }
    },
    async handleDelete () {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.language('QINGXUANZEXUYAOSHANCHUFUJIANDEPICI', '请选择需要删除附件的批次'));
      }
      if (this.selectTableData.find(item => !item.fileId)) {
        return iMessage.warn(this.language('WEIZHAODAODAISHANCHUFUJIAN', '未找到待删除附件'));
      }
      iMessageBox(
        this.language('SHIFOUSHANCHUSUOXUANPICIDEFUJIAN', '是否删除所选批次的附件？'),
        this.$t('LK_WENXINTISHI'),
        { confirmButtonText: this.language('SHI', '是'), cancelButtonText: this.language('FOU', '否') },
      ).then(async () => {
        const id = this.selectTableData.map(item => {
          return item.id;
        });
        const req = {
          id,
        };
        const res = await deleteAttach(req);
        this.resultMessage(res, () => {
          this.getTableList();
        }, () => {
          this.cardLoading = false;
        });
      });
    },
    clickUpload (type) {
      if (this.selectTableData.length != 1) {
        return iMessage.warn(this.language('QINGXUANZEDANGEPICIJINXINGFUJIANSHANGCHUAN', '请选择单个批次进行附件上传'));
      }
      if (type === this.ATTACHMENT) {
        console.log(this.$refs.uploadButtonAttachment)
        this.$refs.uploadButtonAttachment.$refs.upload.$refs['upload-inner'].handleClick();
      } else if (type === this.ORDER) {
        this.$refs.uploadButtonOrder.$refs.upload.$refs['upload-inner'].handleClick();
      }
    },
    async handleUpload (content, type) {
      try {
        this.cardLoading = true;
        const formData = new FormData();
        const preciousId = this.selectTableData.map(item => {
          return item.id;
        });
        formData.append('file', content.file);
        formData.append('userId', this.$store.state.permission.userInfo.id);
        let res = '';
        if (type === this.ATTACHMENT) {
          formData.append('preciousId', preciousId);
          res = await uploadAttach(formData);
        } else if (type === this.ORDER) {
          res = await uploadOrder(formData);
          if (res && res.data && res.data.length > 0) {
            this.orderDialogParams = {
              ...this.orderDialogParams,
              key: Math.random(),
              visible: true,
              data: res.data
            }
            return
          }
        }
        this.resultMessage(res, () => {
          this.getTableList();
        });
      } finally {
        this.cardLoading = false;
      }
    },
    // 关闭弹窗
    handleCloseDialog () {
      this.orderDialogParams.visible = false
    }
  },
};
</script>

<style scoped>
</style>
