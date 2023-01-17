<!--
 * @Author: youyuan
 * @Date: 2021-10-14 14:44:54
 * @LastEditTime: 2023-01-17 16:40:57
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\chipSupplementaryList\components\detailDialog.vue
-->
<template>
  <iDialog
    class="dialog"
    :title="params.name"
    :visible.sync="value"
    width="85%"
    @close="closeDiolog"
  >
    <div class="searchBox">
        <search
          :searchForm="detailInfo"
          :searchFormData="infoFormData"
          :hiddenRight="true"
        />
    </div>
    <iCard :collapse="true" class="margin-top20">
      <div class="contentBox">
        <div class="tableOptionBox">
          <iButton
            @click="handleExportCurrent"
            v-permission="MTZ_REPORT_BUCHAGUANLI_MTZBUCHAZONGLAN_DAOCHUDANGYE"
            >{{ language('DAOCHU', '导出') }}</iButton
          >
        </div>
      <iTableCustom
        :data="tableData"
        :columns="tableTitleRule"
        :tableLoading="loading"
      />
      <iPagination
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :current-page="page.currPage"
        :total="page.totalCount"
        :layout="page.layout"
      >
      </iPagination>
    </div>
    </iCard>
    <iTabsList
      v-model="tabsValue"
      @tab-click="tableChange"
      type="card"
      class="iTabsList margin-top20"
    >
      <el-tab-pane name="1" :label="language('待发起凭证', '待发起凭证')"></el-tab-pane>
      <el-tab-pane name="2" :label="language('已发起凭证', '已发起凭证')"></el-tab-pane>
    </iTabsList>
    
    <iCard :collapse="true">
      <div class="searchBox">
          <search
            @sure="handleSubmitSearch"
            @reset="handleSearchReset"
            :searchForm="searchForm"
            :searchFormData="searchFormData"
            :options="options"
          />
      </div>
      <div class="contentBox">
        <div class="tableOptionBox">
          <iButton
            @click="handleExportCurrent"
            v-permission="MTZ_REPORT_BUCHAGUANLI_MTZBUCHAZONGLAN_DAOCHUDANGYE"
            >{{ language('DAOCHU', '导出') }}</iButton
          >
        </div>
      <iTableCustom
        :data="tableData"
        :columns="tableTitle"
        :tableLoading="loading"
      />
      <iPagination
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :current-page="page.currPage"
        :total="page.totalCount"
        :layout="page.layout"
      >
      </iPagination>
    </div>
    </iCard>
  </iDialog>
</template>

<script>
import {
  iMessage,
  iDialog,
  iSelect,
  iButton,
  iDatePicker,
  iPagination,
  iTabsList,
  iCard,
  iTableCustom,
  iMessageBox
} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import tableList from '@/components/commonTable/index.vue'
import search from '../../components/search.vue'
import {
  tableTitleRule,
  tableTitleBE,
  searchFormData1,
} from './data'
import {
  fetchTableData,
  fetchCurrentUser,
  pageMtzDetailExport
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzReplenishmentOverview/detail'
import { queryDeptSectionForCompItem } from '@/api/mtz/annualGeneralBudget/annualBudgetEdit'
import { getMtzSupplierList } from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview'
export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iSelect,
    iButton,
    iDatePicker,
    iPagination,
    tableList,
    iTabsList,
    iCard,
    iTableCustom,
    search
  },
  props: {
    value: {
      type: Boolean,
      default: true
    },
    params: {
      type: Object,
      default: () => {}
    },
    supplierType: {
      type: String,
      default: '一次件供应商'
    }
  },
  data() {
    return {
      detailInfo:{},
      infoFormData:[],
      tabsValue: '1',
      type: 1,
      searchForm: {},
      searchFormData:[],
      tableTitleRule,
      tableTitleBE,
      options: {
        sSupplierDropDownData: [], //二次件供应商编号
        departmentDropDownData: [], //科室
        linieDropDownData: [] //采购员
      },
      loading: false,
      tableTitle:[],
      tableListData: [],
      selection: []
    }
  },
  watch:{
    tabsValue:{
      handler(val){
        if(val==1){ // 总览
          this.searchFormData = searchFormData1
          this.tableTitle = this.supplierType == '一次件供应商' ? tableTitleBE : tableTitableTitleBEtle1
        }else{  // 明细
          this.tableTitle = tableTitleBE
          this.searchFormData = this.supplierType == '一次件供应商' ? searchFormData1 : searchFormData1
        }
        this.getTableData()
      },
      immediate:true
    }
  },
  created() {
    this.$nextTick((_) => {
      this.getDeptList()
      this.getSecondSupplier()
      this.initSeachData()
      this.getTableData()
      this.getCurrentUser()
    })
  },
  methods: {
    tableChange(val) {
      if (val.name !== this.tabsValue) {
        this.tabsValue = val.name
      }
    },
    // 初始化检索条件
    initSeachData(val) {
      for (let key in this.searchForm) {
        this.searchForm[key] = []
      }
      if (val == 'clear') {
        this.$set(this.searchForm, 'compDate', [])
      } else if (this.params.time && this.params.time.length !== 0) {
        this.params.time[0] = this.params.time[0].split(' ')[0]
        this.params.time[1] = this.params.time[1].split(' ')[0]
        this.$set(this.searchForm, 'compDate', this.params.time)
      }
      this.$set(this.searchForm, 'isSeeMe', true)
      this.$set(this.searchForm, 'compStartDate', '')
      this.$set(this.searchForm, 'compEndDate', '')
    },
    // 获取列表数据
    getTableData() {
      // this.loading = true
      console.log(this.searchForm);
      // fetchTableData({
      //   ...this.searchForm,
      //   pageNo: this.page.currPage,
      //   pageSize: this.page.pageSize,
      //   fsupplier: this.params.firstSupplierId || null,
      //   compStartDate: this.searchForm.compDate
      //     ? this.searchForm.compDate[0]
      //     : null,
      //   compEndDate: this.searchForm.compDate
      //     ? this.searchForm.compDate[1]
      //     : null
      // }).then((res) => {
      //   console.log('res', res)
      //   if (res && res.code == 200) {
      //     this.loading = false
      //     this.page.totalCount = res.total
      //     this.tableListData = res.data
      //   } else iMessage.error(res.desZh)
      // })
    },
    // 获取二次件供应商编号-名称
    getSecondSupplier() {
      getMtzSupplierList({}).then((res) => {
        if (res && res.code == 200) {
          this.options.sSupplierDropDownData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 获取部门数据
    getDeptList() {
      queryDeptSectionForCompItem({}).then((res) => {
        if (res && res.code == 200) {
          this.options.departmentDropDownData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 获取采购员
    getCurrentUser() {
      fetchCurrentUser({}).then((res) => {
        if (res && res.code == 200) {
          this.options.linieDropDownData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 查询
    handleSubmitSearch() {
      this.page.currPage = 1
      this.getTableData()
    },
    // 重置
    handleSearchReset() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.initSeachData('clear')
      this.getTableData()
    },
    // 选中项改变
    handleSelectionChange(val) {
      this.selection = val
    },
    // 关闭弹窗
    closeDiolog() {
      this.$emit('handleCloseDialog')
    },
    lookUs() {
      this.handleSubmitSearch()
    },
    // 导出当页
    handleExportCurrent() {
    }
  }
}
</script>

<style lang='scss' scoped>
.searchBox {
  position: relative;
  .searchButton {
    position: absolute;
    right: 0;
    top: 50px;
    z-index: 100;
  }
}
.contentBox {
  margin-top: 48px;
  padding-bottom: 30px;
  .tableOptionBox {
    .tableTitle {
      display: inline;
      font-weight: bold;
      font-size: 16px;
      color: #000;
      margin: 0 10px;
    }
    button {
      float: right;
      z-index: 100;
      margin-bottom: 20px;
      margin-left: 10px;
    }
  }
}
.leftBox {
  margin-right: 200px;
}
.iTabsList {
  background: #fff;
}
</style>
