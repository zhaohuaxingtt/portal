<template>
  <div>
    <search
      :searchFormData="searchFormData"
      :searchForm="searchForm"
      :options="options"
      @sure="sure"
      @reset="reset"
    >
    </search>

    <iCard class="margin-top20">
      <template slot="header-control">
        <!-- v-permission="SUPPLIER_DISPERSEDSUPPLIER_ADD_GP" -->
        <i-button @click="exportsTableAdd">{{ $t('LK_XINZENG') }}</i-button>
        <i-button @click="exportsTableEdit">{{ $t('LK_BIANJI') }}</i-button>
        <el-upload
          class="upload"
          action="1"
          :accept="'.xlsx,.xls'"
          :show-file-list="false"
          :http-request="httpUpload"
          :disabled="importLoading"
        >
          <iButton :loading="uploading">{{ language('批量上传', '批量上传') }} </iButton>
        </el-upload>
        <i-button @click="synchro" :loading="sapLoading">{{
          language('TONGBUSAP', '同步SAP')
        }}</i-button>
        <i-button @click="exportExcel" :loading="exportLoading">{{ language('导出', '导出') }}</i-button>
      </template>

      <tableList
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :openPageProps="'nameZh'"
        @openPage="openPage"
        border
        :fixed="true"
        :index="true"
        :openPageGetRowData="true"
        :highlightCurrentRow="true"
      >
        <template #supplierTagNameList="scope">
          <i-button type="text" @click="handleTagsList(scope.row)">{{
            scope.row.supplierTagNameList.length > 0
              ? scope.row.supplierTagNameList.join(',')
              : ''
          }}</i-button>
        </template>
        <template #supplierType="scope">
          <span>{{scope.row.supplierType==='PP'?'生产供应商':scope.row.supplierType==='GP'?'一般供应商':scope.row.supplierType==='PD'?'共用供应商':''}} </span>
        </template>
      </tableList>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </iCard>

    <!-- 标签设置 -->
    <setTagdilog
      @closeDiolog="closeDiolog"
      v-model="isSetTag"
      :selectTableData="listData"
      v-if="isSetTag"
    >
    </setTagdilog>
    <setTagList
      @closeDiolog="closeDiolog"
      v-model="issetTagList"
      :rowList="rowList"
      v-if="issetTagList"
    >
    </setTagList>
  </div>
</template>

<script>
import tableList from '@/components/commonTable'
import {
  iSearch,
  iSelect,
  iInput,
  iCard,
  iButton,
  iPagination,
  iMessage
} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import setTagdilog from '../supplier360/list/components/setTag'
import search from './components/search'
import setTagList from '@/views/supplierManagement/supplier360/list/components/setTagList'
import { dropDownTagName } from '@/api/supplierManagement/supplierTag/index'
import {
  getPage,
  exportData,
  importData,
  synchronizationSap
} from '@/api/supplierManagement/supplierListIndirect/index'
import { searchFormData, tableTitle } from './data'

export default {
  name: '',
  mixins: [pageMixins],
  components: {
    iSearch,
    iSelect,
    iInput,
    iCard,
    iButton,
    tableList,
    iPagination,
    search,
    setTagdilog,
    setTagList
  },
  data() {
    return {
      searchFormData,
      searchForm: {
        supplierName: '',
        svwTempCode: '',
        svwCode: '',
        vwCode: '',
        sapCode: '',
        tagNameList: []
      },
      options: {
        tagdropDownList: []
      },
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      uploading: false,
      sapLoading: false,
      exportLoading: false,
      listData: [],
      isSetTag: false,
      rowList: {},
      issetTagList: false //标签列表
    }
  },
  created() {
    this.changTag()
    this.getTableList()
  },
  methods: {
    //标签列表弹窗
    handleTagsList(row) {
      this.rowList = row
      this.issetTagList = true
    },
    closeDiolog(v) {
      if (v == 1) {
        this.sure()
      }
      this.isSetTag = false
      this.issetTagList = false
    },
    // 编辑
    exportsTableEdit() {
      if (this.listData.length == 1) {
        this.$router.push({
          path: '/supplier/supplierListIndirect/details',
          query: {
            supplierType: 'GP',
            subSupplierType: 'GP',
            subSupplierId: this.listData[0].subSupplierId || '',
            supplierToken: this.listData[0].supplierToken || ''
          }
        })
      } else {
        iMessage.warn('请选择数据')
      }
    },
    // 新增
    exportsTableAdd() {
      this.$router.push({
        path: '/supplier/supplierListIndirect/details',
        query: {
          subSupplierType: 'GP'
        }
      })
    },
    // 上传
    async httpUpload(content){
        this.uploading = true
        let formData = new FormData();
        formData.append("file",content.file);
        let res = await importData(formData);
        this.uploading = false
        if(res?.code==200){
          this.$message.success("上传成功")
          this.getTableList()
        }
    },
    // 同步SAP
    synchro() {
      if (this.listData.length === 0) {
        return iMessage.error(this.language('QINGXUANZESHUJU', '请选择数据'))
      }
      if (this.listData.length > 1) {
        return iMessage.error(
          this.language('ZHINENGXUANZEYITIAO', '只能选择一条')
        )
      }
      this.sapLoading = true
      synchronizationSap({
        supplierId: this.listData[0].subSupplierId
      })
        .then((res) => {
          if (res?.code === '200') {
            iMessage.success(res.desZh)
          } else {
            iMessage.error(res.desZh)
          }
        })
        .finally(() => {
          this.sapLoading = false
        })
    },
    // 导出
    exportExcel() {
      var data = {
        ...this.searchForm,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize
      }
      this.exportLoading = true
      exportData(data).then((res) => {
        console.log(res)
      }).finally(()=>{
        this.exportLoading = false
      })
    },
    // 跳转详情页
    openPage(params) {
      let routeData = this.$router.resolve({
        path: '/supplier/supplierListIndirect/supplierDetails',
        query: {
          supplierType: 'GP',
          type: 'LR',
          subSupplierId: params.subSupplierId || '',
          isShowAll: true
        }
      })
      window.open(routeData.href)
    },
    // 复选
    handleSelectionChange(e) {
      this.listData = e
    },
    //获取标签列表
    changTag() {
      this.searchForm.tagNameList = []
      dropDownTagName({
        isMeRelated: 0,
        type: [
          '/supplier/supplierListGP',
          '/supplier/supplierListDis',
          '/supplier/supplierListIndirect'
        ].includes(this.$route.path)
          ? 2
          : ''
      }).then((res) => {
        if (res && res.code == 200) {
          this.options.tagdropDownList = res.data.map((item) => {
            return {
              label: item.message,
              value: item.code
            }
          })
        }
      })
    },
    // 获取表格数据
    getTableList() {
      this.tableLoading = true
      var data = {
        ...this.searchForm,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize
      }
      getPage(data).then((res) => {
        if (res.result) {
          this.tableListData = res.data.list
          this.page.currPage = res.data.current
          this.page.pageSize = res.data.size
          this.page.totalCount = res.data.total
        } else {
        }
        this.tableLoading = false
      })
    },
    // 查询
    sure() {
      this.page.currPage = 1
      this.getTableList()
    },
    // 重置
    reset() {
      this.searchForm = {
        socialcreditNo: '',
        svwTempCode: '',
        vwCode: '',
        svwCode: '',
        sapCode: '',
        tagNameList: []
      }
      this.sure()
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  margin: 0 10px;
  display: inline-block;
}
</style>