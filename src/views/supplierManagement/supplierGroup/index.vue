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
            @click="setTags"
            >{{ language('BIAOQIANSHEZHI', '标签设置') }}</i-button
          >
          <i-button
            v-permission="SUPPLIER_GROUP_MANAGEMENT_ADD_ZIDINGYIZU"
            @click="addData"
            >{{ language('TIANJIAGONGYINGSHANGZU', '添加供应商组') }}</i-button
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
          
      <!-- 标签设置 -->

      <setTagdilog @closeDiolog="closeDiolog"
                   v-model="isSetTag"
                   :selectTableData="multipleSelection"
                   v-if="isSetTag">
      </setTagdilog>
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
import setTagdilog from './components/setTag'
import { tableTitle, searchList } from './data.js'
import { pageMixins } from '@/utils/pageMixins'
import {
  findGroupByPage,
  deleteGroup,
  queryGroupZhList,
  queryGroupEnList,
  groupExport,
  queryGroupLabelDown,
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
    tableList,
    setTagdilog
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
      multipleSelection: [],
      isSetTag:false
    }
  },
  created() {
    this.sure()
    this.queryGroupZhList()
    this.queryGroupEnList()
    this.queryGroupLabelDown();
  },
  methods: {
  //标签设置弹窗
    setTags(){
      if (this.multipleSelection.length == 0) {
        iMessage.warn(this.$t('SUPPLIER_ZHISHAOXUANZHEYITIAOJILU'))
      } else this.isSetTag = true
    },
    closeDiolog(){
      this.isSetTag = false
      this.getTableList()
      this.queryGroupLabelDown()
    },
    queryGroupLabelDown(){
      queryGroupLabelDown({}).then(res => {
        this.selectOptions.labelNames = res.data;
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
        if(key === 'nameZh' || key === 'nameEn' || key === 'labelNames'){
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
        pageNo: this.page.currPage
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
          if(res?.code=='200'){
            this.getTableList()
            this.queryGroupZhList()
            this.queryGroupEnList()
            this.queryGroupLabelDown();
          }
        })
      })
    },
    exportExcel() {
      groupExport({})
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