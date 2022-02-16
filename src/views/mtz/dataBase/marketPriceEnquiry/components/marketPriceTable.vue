<template>
  <div class='mtz-select'>
    <i-search @sure="sure"
              @reset="reset">
      <el-form>
        <el-form-item v-for="(x,index) in ruleQueryFormData"
                      :key="index"
                      :label="language(x.key,x.name)"
                      class="SearchOption">
          <i-input v-if="x.type == 'input'"
                   v-model="formData[x.props]"
                   :placeholder="$t('staffManagement.INPUT_PLACEHOLDER')"></i-input>
          <iDatePicker v-if="x.type == 'datepicker'"
                       v-model="formData[x.props]"
                       type="month"
                       valueFormat="yyyy-MM" />
          <!-- <i-select
                  v-if="x.type == 'select' && x.props == 'source'"
                  v-model="formData[x.props]"
                  :placeholder="$t('staffManagement.SELECT_PLACEHOLDER')">
                    <el-option 
                    v-for="(item,itemIndex) in MarketSourceDropDown" 
                    :key="itemIndex"
                    :label="item.message"
                    :value="item.code">
                    </el-option>
                  </i-select> -->
          <custom-select v-if="x.type == 'select' && x.props == 'source'"
                         v-model="formData[x.props]"
                         :user-options="MarketSourceDropDown"
                         :placeholder="language('QINGXUANZE', '请选择')"
                         display-member="message"
                         value-member="code"
                         value-key="code" />
          <!-- <i-select
                  v-if="x.type == 'select' && x.props == 'marketType'"
                  v-model="formData[x.props]"
                  :placeholder="$t('staffManagement.SELECT_PLACEHOLDER')">
                    <el-option 
                    v-for="(item,itemIndex) in getMtzMarketTypeListDopDown" 
                    :key="itemIndex"
                    :label="item.message"
                    :value="item.code">
                    </el-option>
                  </i-select> -->
          <custom-select v-if="x.type == 'select' && x.props == 'marketType'"
                         v-model="formData[x.props]"
                         :user-options="getMtzMarketTypeListDopDown"
                         :placeholder="language('QINGXUANZE', '请选择')"
                         display-member="message"
                         value-member="code"
                         value-key="code" />
        </el-form-item>
      </el-form>
    </i-search>

    <iCard class="OrganizationTable">
      <div class="export">
        <div class="tt">{{language('SHICHANGJIAXIANGQING','市场价详情')}}</div>
        <div>
          <template v-if="!isEdit">
            <iButton @click="handlePartNumberDetail"
                     v-permission="PORTAL_MTZ_SEARCH_MTZSHICHANGJIACHAXUN_XZMB">{{language('XIAZAIMOBAN','下载模板')}}</iButton>
            <uploadButton style="marginLeft: 10px;"
                          ref="uploadButton"
                          v-permission="PORTAL_MTZ_SEARCH_MTZSHICHANGJIACHAXUN_SCSCJ"
                          :buttonText="language('上传市场价', '上传市场价')"
                          :uploadByBusiness="true"
                          :hideButton="true"
                          :accept="'.xlsx'"
                          @uploadedCallback="handleUpload($event)" />
            <iButton @click="handleUploadMtzPrice"
                     v-permission="PORTAL_MTZ_SEARCH_MTZSHICHANGJIACHAXUN_SCSCJ">{{language('SHANGCHUANGSHICHANGJIA','上传市场价')}}</iButton>
            <iButton @click="handleEdit"
                     v-permission="PORTAL_MTZ_SEARCH_MTZSHICHANGJIACHAXUN_BIANJI">{{language('BIANJI','编辑')}}</iButton>
            <iButton @click="handleExport"
                     v-permission="PORTAL_MTZ_SEARCH_MTZSHICHANGJIACHAXUN_DAOCHU">{{language('DAOCHU','导出')}}</iButton>
          </template>
          <template v-if="isEdit">
            <iButton @click="handleEditSave">{{language('BAOCUN','保存')}}</iButton>
            <iButton @click="handleCancelEditSave">{{language('QUXIAO','取消')}}</iButton>
          </template>
        </div>
      </div>
      <div>
        <tableList ref="commonTable"
                   :tableData="pageData"
                   :tableTitle="tableSetting"
                   :index="true"
                   openPageProps="fileName"
                   :openPageGetRowData="true"
                   @handleSelectionChange="handleSelectionChange"
                   @openPage="handleOpenPage">
          <template #eprice="scope">
            <iInput v-float.expression="6"
                    v-if="isEdit"
                    v-model="scope.row.eprice"></iInput>
            <p v-else>{{scope.row.eprice}}</p>
          </template>
        </tableList>
        <!-- 分页标签 -->
        <iPagination v-update
                     @size-change="handleSizeChange($event, sure)"
                     @current-change="handleCurrentChange($event, getMtzPage)"
                     background
                     :page-sizes="page.pageSizes"
                     :page-size="page.pageSize"
                     :layout="page.layout"
                     :current-page='page.currPage'
                     :total="page.totalCount" />
      </div>
    </iCard>
    <!-- 下载模板 -->
    <downloadDialog :key="key"
                    v-model="isShow"
                    @handleDownloadTemplate="handleDownloadTemplate"
                    @handleClose="handleClose" />
    <uploadInfoDialog v-model="uploadDialogParams.visible"
                      :index="false"
                      :key="uploadDialogParams.key"
                      :data="uploadDialogParams.data"
                      :tableTitle="uploadInfoTableTitle"
                      @handleCloseDialog="handleCloseDialog" />
  </div>
</template>

<script>
import {
  iSearch,
  iInput,
  iSelect,
  iPage,
  iCard,
  iButton,
  iPagination,
  iFormItem,
  iDialog,
  iDatePicker,
  iMessage
} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { tableSetting, ruleQueryFormData } from './data'
import {
  getMtzPage,
  getMtzMarketSourceList,
  getMtzMarketTypeList,
  downloadTemplate,
  uploadMtzPrice,
  updateBatch,
  exportapi
} from '@/api/mtz/database/marketPriceEnquiry'
import tableList from '@/components/commonTable';
import downloadDialog from './downloadDialog'
import uploadButton from '@/components/uploadButton';
import uploadInfoDialog from '@/views/mtz/dataBase/marketPriceEnquiry/components/uploadInfoDialog'
import { uploadInfoTableTitle } from './data'
export default {
  components: {
    iSearch,
    iInput,
    iSelect,
    iPage,
    iCard,
    iButton,
    // iTableCustom,
    iPagination,
    iFormItem,
    iDialog,
    iDatePicker,
    tableList,
    downloadDialog,
    uploadButton,
    uploadInfoDialog
  },
  mixins: [pageMixins],
  data () {
    return {
      isShow: false,
      key: 0,
      formData: {},
      tableSetting,
      ruleQueryFormData,
      pageData: [],
      backupData: [],
      MarketSourceDropDown: [],
      getMtzMarketTypeListDopDown: [],
      downTemplate: {},
      isEdit: false,
      uploadDialogParams: {
        key: 0,
        visible: false,
        data: []
      },
      selection: [],
      uploadInfoTableTitle
    }
  },
  mounted () {
    this.getMtzPage()
    this.getMtzMarketSourceList()
    this.getMtzMarketTypeList()
  },
  methods: {
    // 选中事件
    handleSelectionChange (val) {
      this.selection = val
    },
    handlePartNumberDetail () {
      this.isShow = true
      this.key = Math.random()
    },
    getMtzPage () {
      getMtzPage({ pageNo: this.page.currPage, pageSize: this.page.pageSize, ...this.formData }).then(res => {
        this.pageData = res.data.map(pro => { return { ...pro, isEditStatus: false } })
        this.page.currPage = res.pageNum;
        this.page.pageSize = res.pageSize;
        this.page.totalCount = res.total || 0;
      })
    },
    getMtzMarketSourceList () {
      getMtzMarketSourceList().then(res => {
        if (res.result) {
          this.MarketSourceDropDown = res.data
        }
      })
    },
    getMtzMarketTypeList () {
      getMtzMarketTypeList().then(res => {
        if (res.result) {
          this.getMtzMarketTypeListDopDown = res.data
        }
      })
    },
    sure () {
      this.page.currPage = 1;
      this.getMtzPage()
    },
    reset () {
      this.page.currPage = 1;
      this.page.pageSize = 10;
      this.formData = {}
      this.getMtzPage()
    },
    // 下载模板
    handleDownloadTemplate (data) {
      downloadTemplate(data).then(res => {
        if (res && res.code != 200) {
          iMessage.error(res.desZh)
        } else {
          this.isShow = false
          iMessage.success(this.language('CAOZUOCHENGGONG', '操作成功'))
        }
      })
    },
    // 关闭弹窗
    handleClose () {
      this.isShow = false
    },
    // 生效区间
    handleTime (x) {
      this.downTemplate.periodStart = x[0]
      this.downTemplate.periodEnd = x[1]
    },
    handleUploadMtzPrice () {
      this.$refs.uploadButton.$refs.upload.$refs['upload-inner'].handleClick();
    },
    handleUpload (content) {
      let formdata = new FormData()
      formdata.append('file', content.file)
      formdata.append('userId', this.$store.state.permission.userInfo.id)
      formdata.append('isCover', "")
      uploadMtzPrice(formdata).then(res => {
        if (res && res.code == 200) {
          if (res.data && res.data.length > 0) {
            this.uploadDialogParams = {
              ...this.uploadDialogParams,
              key: Math.random(),
              visible: true,
              data: res.data
            }
          } else {
            this.getMtzPage()
            iMessage.success(res.desZh)
          }
        } else iMessage.error(res.desZh)
      })
    },
    // 关闭弹窗
    handleCloseDialog () {
      this.uploadDialogParams.visible = false
    },
    handleEdit () {
      this.isEdit = true
      this.backupData = window._.cloneDeep(this.pageData)
    },
    handleCancelEditSave () {
      this.isEdit = false
      this.pageData = window._.cloneDeep(this.backupData)
    },
    handleExport () {
      exportapi(this.formData).then(res => {
        if (res && res.code != 200) {
          iMessage.error(this.language('CAOZUOSHIBAI', '操作失败'))
        } else {
          iMessage.success(this.language('CAOZUOCHENGGONG', '操作成功'))
        }
      })
    },
    handleEditSave () {
      if (this.pageData.find(item => !item.eprice)) {
        return iMessage.error('SHICHANGJIABUNENGWEIKONG', '市场价不能为空')
      }
      this.isEdit = false
      updateBatch(this.pageData).then(res => {
        iMessage.success(res.desZh)
        this.getMtzPage()
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.routerpage {
  overflow: hidden;
}
.OrganizationTable {
  margin-top: 20px;
}
.export {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .tt {
    font-size: 18px;
    font-weight: bold;
  }
}
.SearchOption {
  margin-bottom: 20px !important;
}
.open-link-text {
  text-decoration: underline;
}
.mtz-select {
  margin-top: 25px;
}
::v-deep.customClass {
  .open-link-text {
    text-decoration: underline;
  }
}
::v-deep.SearchOption {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
.dialogOk {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 20px;
}
</style>