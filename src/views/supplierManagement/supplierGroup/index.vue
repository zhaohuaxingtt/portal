<template>
  <div>
    <iSearch @sure="sure" @reset="reset">
      <el-form class="search">
        <template v-for="item in searchList">
          <el-form-item
            :label="item.label"
            :prop="item.props"
            :key="item.props"
          >
            <iInput
              v-if="item.type == 'input'"
              v-model="search[item.props]"
              :placeholder="language('请输入')"
            ></iInput>
            <iSelect
              v-if="item.type == 'select'"
              v-model="search[item.props]"
              :placeholder="language('请选择')"
              :multiple="item.multiple"
              :collapse-tags="item.collapse"
              :clearable="item.clearable"
              :filterable="item.filterable"
            >
              <el-option
                :value="child.code"
                :label="child.message"
                v-for="child in selectOptions[item.selectOption] || []"
                :key="child.code"
              ></el-option>
            </iSelect>
          </el-form-item>
        </template>
      </el-form>
    </iSearch>
    <iCard class="margin-top20">
      <div class="margin-bottom10 clearFloat">
        <div class="floatright btn-box">
          <i-button
            v-permission="SUPPLIER_GROUP_MANAGEMENT_ADD_ZIDINGYIZU"
            @click="addData"
            >{{ language('TIANJIAZIDINGYIZU', '添加自定义组') }}</i-button
          >
          <i-button
            v-permission="SUPPLIER_GROUP_MANAGEMENT_DELETE_ZIDINGYIZU"
            @click="deleteData"
            >{{ language('SHANCHU', '删除') }}</i-button
          >
          <i-button
            v-permission="SUPPLIER_GROUP_MANAGEMENT_EXPORT_ZIDINGYIZU"
            @click="exportExcel"
            >{{ language('DAOCHU', '导出') }}</i-button
          >
        </div>
      </div>
      <tableList
        v-loading="tableLoading"
        :tableData="tableData"
        :tableTitle="tableTitle"
        @handleSelectionChange="handleSelectionChange"
      >
        <template #nameZh="scope">
          <div class="link" @click="openPage(scope.row)">{{scope.row.nameZh}}</div>
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
  </div>
</template>

<script>
import {
  iSearch,
  iCard,
  iInput,
  iSelect,
  iPagination,
  iButton,
  iMessage,
  iMessageBox
} from 'rise'
import tableList from '@/components/commonTable'
import { tableTitle, searchList } from './data.js'
import { pageMixins } from '@/utils/pageMixins'
import { getDeptData as getDeptDropDownList } from '@/api/kpiChart/index.js'
import {
  findGroupByPage,
  deleteGroup,
  queryGroupZhList,
  queryGroupEnList,
  groupExport,
  querySupplierZhList,
  querySupplierEnList,
  queryGroupLabelDown
} from '@/api/supplier360/supplierGroup.js'
export default {
  mixins: [pageMixins],
  components: {
    iSearch,
    iCard,
    iInput,
    iSelect,
    iPagination,
    iButton,
    tableList
  },
  data() {
    return {
      tableLoading: false,
      search: {
        nameZh: [],
        nameEn: [],
        supplierNameZh: '',
        supplierNameEn: '',
        supplierTempCode: '',
        supplierSvwCode: '',
        supplierSapCode: '',
        labelNames: []
      },
      tableData: [
          ],
      tableTitle,
      searchList,
      selectOptions: {
        zhName: [],
        enName: [],
        labelNames: [],
        nameZh: [],
        nameEn: [],
      },
      multipleSelection: []
    }
  },
  created() {
    this.sure()
    this.queryGroupZhList()
    this.queryGroupEnList()
    this.getDeptDropDownList()
    this.querySupplier();
  },
  methods: {

    querySupplier(){
      Promise.all([querySupplierZhList({}), querySupplierEnList({}), queryGroupLabelDown({})]).then(res => {
        this.selectOptions.nameZh = res[0].data;
        this.selectOptions.nameEn = res[1].data;
        this.selectOptions.labelNames = res[2].data;
      })
    },

    getDeptDropDownList(){
      getDeptDropDownList().then(res=>{
        console.log(res);
      })
    },
    queryGroupZhList() {
      queryGroupZhList({}).then((res) => {
        if (res?.code == '200') {
          this.selectOptions.zhName = res.data
        }

        console.log('selectOptionsselectOptions', this.selectOptions);
      })
    },
    queryGroupEnList() {
      queryGroupEnList({}).then((res) => {
        if (res?.code == '200') {
          this.selectOptions.enName = res.data
        }
      })
    },
    sure() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableList()
    },
    reset() {
      Object.keys(this.search).forEach((key) => {
        if(key === 'supplierNameZh' || key === 'supplierNameEn'){
          this.search[key] = []
        }else{
          this.search[key] = ''
        }
        
      })
      this.sure();
    },
    getTableList() {
      this.tableLoading = true;
      let params = {
        ...this.search,
        pageSize: this.page.pageSize,
        currPage: this.page.currPage
      }
      findGroupByPage(params)
        .then((res) => {
          if (res?.code == '200') {
            this.page.totalCount = res.total
            this.tableData = res.data
          }

          this.tableLoading = false;
        })
        .catch(() => {
          // let data = [
          //   { zhong: '1' },
          //   { zhong: '2' },
          //   { zhong: '3' },
          //   { zhong: '4' },
          //   { zhong: '5' },
          //   { zhong: '6' },
          //   { zhong: '7' },
          //   { zhong: '8' },
          //   { zhong: '9' },
          //   { zhong: '10' },
          //   { zhong: '11' }
          // ]
          // this.page.totalCount = 32
          // this.tableData = data;
          this.tableLoading = false;
        })
    },
    openPage(row) {
      let routeData = this.$router.resolve({
        path: '/supplier/suppliergroupmanagementdetail',
        query: {
          status: 'detail',
          id: row.id
        }
      })
      window.open(routeData.href)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    addData() {
      let routeData = this.$router.resolve({
        path: '/supplier/suppliergroupmanagementdetail',
        query: {
          status: 'add'
        }
      })
      window.open(routeData.href)
    },
    deleteData() {
      if (!this.multipleSelection.length) return iMessage.warn('请选择需要删除的数据')
      iMessageBox('确认删除供应商组？', this.$t('LK_WENXINTISHI'), {
        confirmButtonText: this.language('QUEREN', '确认'),
        cancelButtonText: this.language('QUXIAO', '取消')
      }).then(() => {
        deleteGroup(this.multipleSelection.map(item => item.id)).then((res) => {
          console.log(res)
          if(res?.code=='200'){
            this.getTableList()
          }
        })
      })
    },
    exportExcel() {
      groupExport({}).then(res => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .search {
  margin-right: 200px !important;
}
.link{
  font-size: 14px;
  color: #1763F7;
  text-decoration: underline;
  cursor: pointer;
}
</style>