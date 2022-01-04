<template>
  <iPage>
    <div class="parts-tittle">
      <h3>查看一/二次零件关系</h3>
      <iButton @click="handleGoBack">返回</iButton>
    </div>
    <i-search @sure="sure"
              @reset="reset"
              class="margin-top20">
      <el-form>
        <el-form-item v-for="(x,index) in partsRelationship"
                      :key="index"
                      :label="x.name"
                      class="SearchOption">
          <i-input v-model="formData[x.props]"
                   :placeholder="language('QINGSHURU', '请输入')"></i-input>
        </el-form-item>
        <el-form-item label="导入时间"
                      class="SearchOption">
          <iDatePicker type="daterange"
                       v-model="importDateStart"
                       @change="importDateStartChange"
                       value-format="yyyy-MM-dd"
                       :placeholder="language('QINGXUANZE', '请选择')" />
        </el-form-item>
        <el-form-item label="开始时间"
                      class="SearchOption">
          <iDatePicker type="daterange"
                       v-model="startDateStart"
                       value-format="yyyy-MM-dd"
                       @change="startDateStartChange"
                       :placeholder="language('QINGXUANZE', '请选择')" />
        </el-form-item>
      </el-form>
    </i-search>
    <iCard class="OrganizationTable">
      <div class="export">
        <iButton @click="handleExportAll">下载</iButton>
      </div>
      <div>
        <!-- <iTableCustom
            ref="testTable"
            class="customClass"
            :loading="tableLoading"
            :data="tableListData"
            :columns="partsRelationshipTableSetting"
            @go-detail="handleSapPartNumber"
            @handle-selection-change="handleSelectChange"
          /> -->
        <tableList ref="commonTable"
                   :tableData="tableListData"
                   :tableTitle="partsRelationshipTableSetting"
                   :index="true"
                   openPageProps="partNum"
                   :openPageGetRowData="true"
                   @handleSelectionChange="handleSelectionChange"
                   @openPage="handleOpenPage" />
        <!-- 分页标签 -->
        <iPagination v-update
                     @size-change="handleSizeChange($event, sure)"
                     @current-change="handleCurrentChange($event, getList)"
                     background
                     :page-sizes="page.pageSizes"
                     :page-size="page.pageSize"
                     :layout="page.layout"
                     :current-page='page.currPage'
                     :total="page.totalCount" />
      </div>
    </iCard>

    <iDialog :visible.sync="isShow"
             v-if="isShow"
             :title="language('MINGXILIEBIAO', '明细列表')"
             width="80%">
      <Detail :bomInfo="bomInfo" />
    </iDialog>
  </iPage>
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
import iTableCustom from '@/components/iTableCustom'
import { pageMixins } from '@/utils/pageMixins'
import { tableSetting, exportTitle, partsRelationship, partsRelationshipTableSetting } from './data'
import Detail from './partsRelationshipDetail'
import { infoPage, infoExport } from '@/api/mtz/database/partsQuery'
import { downloadUdFile } from '@/api/file'
import tableList from '@/components/commonTable';
export default {
  components: {
    iSearch,
    iInput,
    iSelect,
    iPage,
    iCard,
    iButton,
    iTableCustom,
    iPagination,
    iFormItem,
    iDialog,
    iDatePicker,
    Detail,
    tableList
  },
  mixins: [pageMixins],
  data () {
    return {
      isShow: false,
      formData: {},//表单数据
      tableListData: [],//表格数据
      tableSetting,
      exportTitle,
      partsRelationship,
      partsRelationshipTableSetting,
      inputProps: [],
      importDateStart: null,
      startDateStart: null,
      bomInfo: {},
      selection: [],
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    handleGoBack () {
      this.$router.go(-1)
    },
    getList () {
      infoPage({ pageNo: this.page.currPage, pageSize: this.page.pageSize, ...this.formData }).then(res => {
        this.tableListData = res.data
        this.page.currPage = res.pageNum;
        this.page.pageSize = res.pageSize;
        this.page.totalCount = res.total || 0;
      })
    },
    importDateStartChange (e) {
      this.formData.importDateStart = e[0]
      this.formData.importDateEnd = e[1]
    },
    startDateStartChange (e) {
      this.formData.startDateStart = e[0]
      this.formData.startDateEnd = e[1]
    },
    sure () {
      this.page.currPage = 1
      this.getList()
    },
    reset () {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.formData = {}
      this.importDateStart = null
      this.startDateStart = null
      this.getList()
    },
    handleOpenPage (e) {
      this.bomInfo = e
      this.isShow = true
    },
    handleSelectionChange (val) {
      this.selection = val
    },
    handleExportAll () {
      // infoExport(this.formData)
      if (this.selection && this.selection.length != 1) {
        iMessage.warn(this.language('QINGXUANZEYITIAOSHUJUXIAZAI', '请选择一条数据进行下载'))
        return
      }
      const data = this.selection[0]
      if (!data.filePath) {
        iMessage.error(this.language('WENJIANXIXINBUCUNZAI', '文件信息不存在'))
        return
      }
      downloadUdFile(data.filePath).then(res => {

      })
      // // 创建a标签
      // const link = document.createElement('a')
      // // download属性
      // link.setAttribute('download', data.filePath)
      // // href链接
      // link.setAttribute('href', data.filePath)
      // // 自执行点击事件
      // link.click()
    },
  }
}
</script>

<style lang="scss" scoped>
// .routerpage{
//   overflow: hidden;
// }
.OrganizationTable {
  margin-top: 20px;
}
.export {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
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
.parts-tittle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-size: 20px;
  }
}
</style>