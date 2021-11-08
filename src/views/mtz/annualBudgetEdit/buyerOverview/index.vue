<!--
 * @Author: youyuan
 * @Date: 2021-09-03 16:33:28
 * @LastEditTime: 2021-11-01 20:35:59
 * @LastEditors: Please set LastEditors
 * @Description: 年度预算编辑-采购员总览
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\annualBudgetEdit\buyerOverview\index.vue
-->
<template>
  <div>
    <iSearch @reset="handleSearchReset" @sure="handleSubmitSearch">
      <el-form :model="searchForm">
        <el-form-item 
        v-for="(item,index) in search"
        :label="item.key ? language(item.key, item.name) : item.name" 
        :key="index">
          <iInput v-if="item.type == 'input'" class="margin-top6" v-model="searchForm[item.props]" :placeholder="language('QINGSHURU', '请输入')"></iInput>
          <!-- <iSelect 
          v-if="item.type == 'selectMultiple' && item.props == 'buyerName'" 
          v-model="searchForm[item.props]" 
          class="margin-top6" 
          filterable
          remote
          multiple
          collapse-tags
          :remote-method="remoteGetBuyer"
          :loading="buyerLoading"
          :placeholder="language('QINGXUANZE', '请选择')">
            <el-option v-for="(item, index) in buyerList" :key="index" :value="item.linieId" :label="item.linieName"></el-option>
          </iSelect> -->
          <custom-select 
          v-if="item.type == 'selectMultiple' && item.props == 'buyerName'" 
          v-model="searchForm[item.props]"
          :user-options="buyerList"
          multiple
          filterable
          collapse-tags
          :placeholder="language('QINGXUANZE', '请选择')"
          display-member="linieName"
          value-member="linieId"
          value-key="linieId" />
          
          <!-- <iSelect 
          v-if="item.type == 'selectMultiple' && item.props == 'mtzMaterialNumber'" 
          v-model="searchForm[item.props]" 
          class="margin-top6" 
          filterable
          remote
          multiple
          collapse-tags
          :remote-method="remoteGetMtzCategory"
          :loading="mtzCategoryLoading"
          :placeholder="language('QINGXUANZE', '请选择')">
            <el-option v-for="(item, index) in mtzCategoryList" :key="item.materialGroupCode" :value="item.materialGroupCode" :label="item.materialGroupNameZh"></el-option>
          </iSelect> -->
          <custom-select 
          v-if="item.type == 'selectMultiple' && item.props == 'mtzMaterialNumber'" 
          v-model="searchForm[item.props]"
          :user-options="mtzCategoryList"
          multiple
          filterable
          collapse-tags
          :placeholder="language('QINGXUANZE', '请选择')"
          display-member="materialGroupNameZh"
          value-member="materialGroupCode"
          value-key="materialGroupCode" />
          
          <!-- <iSelect 
          v-if="item.type == 'selectMultiple' && item.props == 'rawMaterialCodeList'" 
          v-model="searchForm[item.props]" 
          class="margin-top6" 
          filterable
          remote
          multiple
          collapse-tags
          :remote-method="remoteGetRawMaterial"
          :loading="rawMaterialCodeLoading"
          :placeholder="language('QINGXUANZE', '请选择')">
            <el-option v-for="(item, index) in  rawMaterialCodeList" :key="item.code" :value="item.code" :label="item.message"></el-option>
          </iSelect> -->
          <custom-select 
          v-if="item.type == 'selectMultiple' && item.props == 'rawMaterialCodeList'" 
          v-model="searchForm[item.props]"
          :user-options="rawMaterialCodeList"
          multiple
          filterable
          collapse-tags
          :placeholder="language('QINGXUANZE', '请选择')"
          display-member="message"
          value-member="code"
          value-key="code" />
         
          <!-- <iSelect 
          v-model="searchForm[item.props]" 
          v-if="item.type == 'selectMultiple' && item.props == 'departNumber' && deptList.length > 0 " 
          class="margin-top6" 
          multiple
          collapse-tags
          :placeholder="language('QINGXUANZE', '请选择')">
            <el-option v-for="(dept, index) in deptList" :key="dept.index" :label="dept.departNameEn" :value="dept.departId"></el-option>
          </iSelect> -->
          <custom-select 
          v-if="item.type == 'selectMultiple' && item.props == 'departNumber' && deptList.length > 0" 
          v-model="searchForm[item.props]"
          :user-options="deptList"
          multiple
          filterable
          collapse-tags
          :placeholder="language('QINGXUANZE', '请选择')"
          display-member="departNameEn"
          value-member="departId"
          value-key="departId" />
          
          <!-- <iSelect v-if="item.type == 'select' " class="margin-top6" v-model="searchForm[item.props]" :placeholder="language('QINGXUANZE', '请选择')">
            <el-option value="" :label="language('QUANBU','全部')"></el-option>
            <el-option v-if="item.props == 'confirmStatus'" value="4" :label="language('WEITONGZHI','未通知')"></el-option>
            <el-option v-if="item.props == 'confirmStatus'" value="1" :label="language('DAIQUEREN','待确认')"></el-option>
            <el-option v-if="item.props == 'confirmStatus'" value="3" :label="language('YIQUEREN','已确认')"></el-option>
            <el-option v-if="item.props == 'confirmStatus'" value="2" :label="language('REVIEW','review')"></el-option>
          </iSelect> -->

          <custom-select 
          v-if="item.type == 'select'" 
          v-model="searchForm[item.props]"
          :user-options="statusDropDownList"
          :placeholder="language('QINGXUANZE', '请选择')"
          display-member="message"
          value-member="code"
          value-key="code" />
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20">
      <div slot="header" class="tableOptionBox">
        <p class="tableTitle">{{language('CSYSZJEBWMH', '初始预算总金额（百万元）：')}} {{money(params.initPrice)}} </p>
        <p class="tableTitle">{{language('XISHUMAOHAO', '系数：')}} {{ratio(money(params.initPrice), money(params.totalPrice))}} </p>
        <p class="tableTitle">{{language('ZZYSZJEBWMH', '最终预算总金额（百万元）：')}} {{money(params.totalPrice)}} </p>
        <span class="buttonBox">
          <iButton @click="handleClickLinie">{{language('TONGZHILINIE', '通知Linie')}}</iButton>
          <iButton @click="handleClickExport">{{language('DAOCHUDANGYE', '导出当页')}}</iButton>
        </span>
      </div>
      <div>
        <tableList
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          :index="true"
          @handleSelectionChange="handleSelectionChange">
          <template #initPrTotal="scope">
            <el-tooltip :content="moneyInfo(scope.row['initPrTotal'])" placement="top" effect="light">
              <p>{{money(scope.row['initPrTotal'])}}</p>
            </el-tooltip>
          </template>
          <template #prTotal="scope">
            <el-tooltip :content="moneyInfo(scope.row['prTotal'])" placement="top" effect="light">
              <p>{{money(scope.row['prTotal'])}}</p>
            </el-tooltip>
          </template>
          <template #option="scope">
            <p class="openPage" @click="handleClickOption(scope.row)">{{language('BIANJI', '编辑')}}</p>
          </template>
        </tableList>
        <iPagination
          v-update
          @size-change="handleSizeChange($event, handleSubmitSearch)"
          @current-change="handleCurrentChange($event, getTableData)"
          background 
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page='page.currPage'
          :total="page.totalCount"/>
      </div>
    </iCard>
    <linie :key="linieModalParams.key" v-model="linieModalParams.visible" @closeDiolog="closeDiolog" @handleSubmitLinie="handleSubmitLinie"/>
    <editDetail v-if="editModalParams.visible" :key="editModalParams.key" :forecastId="forecastId" :forecastTime="forecastTime" :params="params" :editData="editData" v-model="editModalParams.visible" @closeDiolog="closeDiolog"/>
  </div>
</template>

<script>
import {iCard, iButton, iSearch, iInput, iSelect, iMessage, iPagination} from 'rise'
import { search, tableTitle } from './components/data'
import { pageMixins } from '@/utils/pageMixins'
import tableList from '@/components/commonTable/index.vue'
import linie from '@/views/mtz/annualGeneralBudget/annualBudget/components/linie.vue'
import editDetail from './components/editDetail'
import { excelExport } from "@/utils/filedowLoad"
import { fetchBuyerDataPage, fetchNoticeLinie, fetchRemoteMtzMaterial, fetchBuyerList, fetchGroups } from '@/api/mtz/annualGeneralBudget/annualBudgetEdit'
import { fetchRemoteDept } from '@/api/mtz/annualGeneralBudget/annualBudgetEdit'
import { getMoney, getMoneyInfo, getRatio } from '@/views/mtz/moneyComputation'
import { debounce } from '@/views/mtz/debounce.js'
import { getDeptData } from '@/api/kpiChart/index'

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    iSearch,
    iSelect,
    iInput,
    iPagination,
    tableList,
    linie,
    editDetail
  },
  data () {
    return {
      search,
      tableTitle,
      searchForm: {
      },
      params: {},
      tableListData: [],
      selection: [],
      loading: false,
      linieModalParams: {
        key: 0,
        visible: false
      },
      editModalParams: {
        key: 0,
        visible: false
      },
      editData: null,
      deptList: [],
      mtzCategoryLoading: false,
      mtzCategoryList: [],
      buyerLoading: false,
      buyerList: [],
      rawMaterialCodeLoading: false,
      rawMaterialCodeList: [],
      forecastId: this.$route.query.forecastId,
      forecastTime: this.$route.query.forecastTime,
      statusDropDownList: []
    }
  },
  created() {
    this.initSearchData()
    this.getTableData()
    this.getDeptList()
    this.remoteGetBuyer()
    this.remoteGetMtzCategory()
    this.remoteGetRawMaterial()
  },
  computed: {
    money() {
      return function(val) {
        let res = ''
        if(val) {
          res = getMoney(val)
        }
        return res
      }
    },
    moneyInfo() {
      return function(val) {
        let res = ''
        if(val) {
          res = getMoneyInfo(val)
        }
        return res
      }
    },
    ratio() {
      return function(initPrice, totalPrice) {
        let res = ''
        if(initPrice && Number(initPrice)) {
          res = getRatio(initPrice, totalPrice)
        }
        return res
      }
    }
  },
  methods: {
    // 初始化检索条件
    initSearchData() {
      this.searchForm = {
        ...this.searchForm,
        departNumber: [],
        buyerName: [],
        mtzMaterialNumber: [],
        rawMaterialCodeList: [],
        confirmStatus:"",
      }
      this.statusDropDownList = [
        {code: '', message: this.language('QUANBU','全部')},
        {code: '4', message: this.language('WEITONGZHI','未通知')},
        {code: '1', message: this.language('DAIQUEREN','待确认')},
        {code: '3', message: this.language('YIQUEREN','已确认')},
        {code: '2', message: this.language('REVIEW','review')},
      ]
    },
    // 获取数据
    getTableData() {
      this.loading = true
      const params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        forecastId: this.forecastId,
        userIds: this.searchForm.buyerName && this.searchForm.buyerName.length > 0 ? this.searchForm.buyerName : null,
        mtzMaterialList: this.searchForm.mtzMaterialNumber && this.searchForm.mtzMaterialNumber.length > 0 ? this.searchForm.mtzMaterialNumber : null,
        departNumberList: this.searchForm.departNumber && this.searchForm.departNumber.length > 0 ? this.searchForm.departNumber : null,
        rawMaterialCodeList: this.searchForm.rawMaterialCodeList && this.searchForm.rawMaterialCodeList.length > 0 ? this.searchForm.rawMaterialCodeList : null,
        confirmStatus: this.searchForm.confirmStatus || null,
      }
      fetchBuyerDataPage(params).then(res => {
        this.loading = false
        if(res && res.code == 200) {
          this.params = {
            ...res.data
          }
          this.tableListData = res.data.forecastDataPageVOIPage.records
          this.page.totalCount = res.data.forecastDataPageVOIPage.total
        } else iMessage.error(res.desZh) 
      })
    },
    // 选中项改变
    handleSelectionChange(val) {
      this.selection = val
    },
    // 获取部门数据
    getDeptList() {
      fetchRemoteDept({}).then(res => {
        if(res && res.code == 200) {
          this.deptList = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 远程搜索MTZ材料组数据
    remoteGetMtzCategory(query) {
      this.mtzCategoryLoading = true
      debounce(fetchRemoteMtzMaterial({
        keyWord: query
      }).then(res => {
        this.mtzCategoryLoading = false
        if(res && res.code == 200) {
          this.mtzCategoryList = res.data
        } else iMessage.error(res.desZh)
      }))
    },
    // 远程搜索材料中类
    remoteGetRawMaterial(query) {
      this.rawMaterialCodeLoading = true
      debounce(fetchGroups({
        keyWords: query
      }).then(res => {
        this.rawMaterialCodeLoading = false
        if(res && res.code == 200) {
          this.rawMaterialCodeList = res.data
        } else iMessage.error(res.desZh)
      }))
    },
    // 远程搜索采购员数据
    remoteGetBuyer(query) {
      this.buyerLoading = true
      debounce(fetchBuyerList({
        keyWord: query
      }).then(res => {
        this.buyerLoading = false
        if(res && res.code == 200) {
          this.buyerList = res.data
        } else iMessage.error(res.desZh)
      }))
    },
    // 编辑
    handleClickOption(data) {
      this.editData = data
      this.editModalParams = {
        ...this.editModalParams,
        key: Math.random(),
        visible: true
      }
    },
    // 通知linie
    handleClickLinie() {
      if(this.selection.length == 0) {
        iMessage.error(this.language('QINGXUANZHONGYAOCAOZUODESHUJU','请选中要操作的数据'))
        return
      }
      this.linieModalParams = {
        ...this.linieModalParams,
        key: Math.random(),
        visible: true
      }
    },
    // 提交linie数据
    handleSubmitLinie(data) {
      const listConfirm = this.selection.map(item => {
        return {
          optId: item.buyerId,
          forecastId: this.forecastId
        }
      })
      const params = {
        listConfirm: listConfirm,
        requireTime: data.date
      }
      fetchNoticeLinie(params).then(res => {
        if(res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableData()
        } else iMessage.error(res.desZh)
      })
      this.linieModalParams.visible = false
    },
    // 导出当前
    handleClickExport() {
      const titleArr = window._.cloneDeep(this.tableTitle)
      const index = titleArr.findIndex(item => item.props == 'option')
      titleArr.splice(index, index + 1)
      excelExport(this.tableListData, titleArr, '采购员预算总览')
    },
    // 关闭弹窗
    closeDiolog() {
      this.getTableData()
      this.linieModalParams.visible = false
      this.editModalParams.visible = false
    },
    // 点击确定查询
    handleSubmitSearch(val) {
      this.page.currPage = 1
      this.getTableData().then(res => {
        if (!res.data || res.data.length == 0) {
          iMessage.error(this.language('BQWFCXDJGSRCWHBCZQQRHCXSR', '抱歉，无法查询到结果（输入错误或不存在），请确认后重新输入'));
        }
      })
    },
    // 点击重置查询
    handleSearchReset() {
      this.initSearchData()
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableData()
    },
  }
}
</script>

<style lang='scss' scoped>
.tableOptionBox {
  width: 100%;
  .tableTitle {
      margin: 0 10px;
      display: inline-block;
      font-weight: bold;
      font-family: Arial;
      color: #000000;
      opacity: 1;
      font-size: 18px;
  }
  button {
    float: right;
    z-index: 100;
    margin: 0 0px 20px 20px;
  }
}
.openPage {
  position: relative;
  color: $color-blue;
  font-size: 14px;
  cursor: pointer;
}
 
</style>
