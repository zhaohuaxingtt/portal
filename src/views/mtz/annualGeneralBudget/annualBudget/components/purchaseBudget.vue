<!--
 * @Author: youyuan
 * @Date: 2021-08-31 15:34:13
 * @LastEditTime: 2022-12-26 18:24:48
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: 采购员预算总览
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\annualBudget\components\purchaseBudget.vue
-->
<template>
  <div>
    <iDialog :visible.sync="value" width="80%" @close='closeDialog'>
      <div class="dialogTitle" slot="title">
        {{language('CAIGOUYUANYUSUANZONGLAN','采购员预算总览')}}
        <el-tooltip :content="language('RXTZQLXNDYSFZR', '如需调整，请联系年度预算负责人')" placement="top" effect="light">
          <i class="el-icon-warning-outline titleIcon"></i>
        </el-tooltip>
      </div>
      <div class="dialogBox">
        <div class="searchBox">
          <el-form :inline="true" :model="searchForm" label-position="top" class="demo-form-inline">
            <el-form-item style="marginRight:68px;width: 200px;" :label="language('CAIGOUYUAN', '采购员')">
              <iInput v-model="searchForm['buyerName']" :placeholder="language('QINGSHURU','请输入')"></iInput>
            </el-form-item>
            <el-form-item style="marginRight:68px" :label="language('MTZCAILIAOZU', 'MTZ材料组')">
              <iInput v-model="searchForm['mtzMaterialNumber']" :placeholder="language('QINGSHURU','请输入')"></iInput>
            </el-form-item>
            <el-form-item style="marginRight:68px" :label="language('KESHI', '科室')">
              <!-- <iSelect v-model="searchForm['departNumber']" :placeholder="language('QINGSHURU','请输入')">
                <el-option value="" :label="language('QUANBU','全部')"></el-option>
                <el-option v-for="(item, index) in deptList" :key="index" :label="item.existShareNum" :value="item.existShareId"></el-option>
              </iSelect> -->
              <custom-select 
              v-model="searchForm['departNumber']"
              :user-options="deptList"
              :placeholder="language('QINGXUANZE', '请选择')"
              display-member="existShareNum"
              value-member="existShareId"
              value-key="existShareId" />
            </el-form-item>
            <el-form-item style="marginRight:68px" :label="language('ZHUANGTAI', '状态')">
              <!-- <iSelect v-model="searchForm['confirmStatus']" :placeholder="language('QINGSHURU','请输入')">
                <el-option value="" :label="language('QUANBU','全部')"></el-option>
                <el-option value="4" :label="language('WEITONGZHI','未通知')"></el-option>
                <el-option value="1" :label="language('DAIQUEREN','待确认')"></el-option>
                <el-option value="2" :label="language('REVIEW','review')"></el-option>
                <el-option value="3" :label="language('YIQUEREN','已确认')"></el-option>
              </iSelect> -->
              <custom-select 
              v-model="searchForm['confirmStatus']"
              :user-options="statusDropDownList"
              :placeholder="language('QINGXUANZE', '请选择')"
              display-member="message"
              value-member="code"
              value-key="code" />
            </el-form-item>
            <el-form-item class="searchButton">
              <iButton @click="handleSubmitSearch">{{language('CX', '查询')}}</iButton>
              <iButton @click="handleSearchReset">{{language('CZ', '重置')}}</iButton>
            </el-form-item>
          </el-form>
        </div>
        <el-divider class="margin-top20"></el-divider>
        <div class="contentBox">
          <div class="tableOptionBox">
            <p class="tableTitle">{{language('CSYSZJEBWMH', '初始预算总金额（百万元）：')}} {{moneyInfo(money(params.initPrice))}} </p>
            <p class="tableTitle">{{language('ZZYSZJEBWMH', '最终预算总金额（百万元）：')}} {{moneyInfo(money(params.totalPrice))}} </p>
            <iButton @click="handleExportCurrent">{{language('DAOCHUDANGYE', '导出当页')}}</iButton>
          </div>
          <tableList
            class="margin-top20"
            :tableData="tableListData"
            :tableTitle="purchaseBudgetTitle"
            :tableLoading="loading"
            :index="true">
            <template #initPrTotal="scope">
              <el-tooltip :content="moneyInfo(scope.row['initPrTotal'])" placement="top" effect="light">
                <p>{{moneyInfo(money(scope.row['initPrTotal']))}}</p>
              </el-tooltip>
            </template>
            <template #prTotal="scope">
              <el-tooltip :content="moneyInfo(scope.row['prTotal'])" placement="top" effect="light">
                <p>{{moneyInfo(money(scope.row['prTotal']))}}</p>
              </el-tooltip>
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
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iDialog, iInput, iSelect, iButton, iPagination, iMessage } from 'rise'
import { pageMixins } from '@/utils/pageMixins';
import { purchaseBudgetTitle } from './data'
import tableList from '@/components/commonTable/index.vue'
import { getDeptData } from '@/api/kpiChart/index.js'
import { excelExport } from "@/utils/filedowLoad";
import { money, moneyInfo } from '@/views/mtz/moneyComputation'
import { fetchPurchaseBudget } from '@/api/mtz/annualGeneralBudget/annualBudget.js'
import { fetchBuyerDataPage } from '@/api/mtz/annualGeneralBudget/annualBudgetEdit'
export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iInput,
    iSelect,
    iButton,
    iPagination,
    tableList
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    forecastId: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      searchForm: {},
      purchaseBudgetTitle,
      tableListData: [],
      loading: false,
      params: {},
      deptList: []
    }
  },
  // computed: {
  //   money() {
  //     return function(val) {
  //       let res = ''
  //       if(val) {
  //         // res = Number(val/1000000).toFixed(2)
  //         res = getMoney(val)
  //       }
  //       return res
  //     }
  //   },
  //   moneyInfo() {
  //     return function(val) {
  //       let res = ''
  //       if(val) {
  //         res = getMoneyInfo(val)
  //       }
  //       return res
  //     }
  //   }
  // },
  created() {
    this.initSearchData()
    this.getTableData()
    this.getDeptList()
  },
  methods: {
    // 截取金额数据，不四舍五入
    money,
    // 千分位展示
    moneyInfo,
    // 初始化检索条件
    initSearchData() {
      this.searchForm = {
        ...this.searchForm,
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
      return new Promise(resolve => {
        this.loading = true
        const params = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          forecastId: this.forecastId,
          buyerName: this.searchForm.buyerName || null,
          mtzMaterialNumber: this.searchForm.mtzMaterialNumber || null,
          departNumber: this.searchForm.departNumber || null,
          confirmStatus: this.searchForm.confirmStatus || null,
        }
        fetchBuyerDataPage(params).then(res => {
          if(res && res.code == 200) {
            this.params = {
              ...res.data
            }
            this.loading = false
            this.tableListData = res.data.forecastDataPageVOIPage.records
            this.page.totalCount = res.data.forecastDataPageVOIPage.total
            resolve(res)
          } else iMessage.error(res.desZh)
        })
      })
    },
    // 获取部门数据
    getDeptList() {
      getDeptData().then(res => {
        if(res && res.code == 200) {
          this.deptList = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 导出当前页
    handleExportCurrent() {
      this.purchaseBudgetTitle.forEach(item => {
        // if(item.name.indexOf('（百万）')) 
        item.name = window._.replace(item.name, '（百万）', '')
        console.log('item', item);
      })
      excelExport(this.tableListData, this.purchaseBudgetTitle, this.language('CAIGOUYUANYUSUANZONGLAN', '采购员预算总览'))
    },
    // 点击确定查询
    handleSubmitSearch() {
      this.page.currPage = 1
      // this.page.pageSize = 10
      this.getTableData().then(res => {
        if (!res.data || res.data.length == 0) {
          iMessage.error(this.language('BQWFCXDJGSRCWHBCZQQRHCXSR', '抱歉，无法查询到结果（输入错误或不存在），请确认后重新输入'));
        }
      })
    },
    // 点击重置查询
    handleSearchReset() {
      this.page.currPage = 1
      this.page.pageSize = 10
      for(const key in this.searchForm) {
        this.searchForm[key] = null
      }
      this.getTableData()
    },
    // 关闭弹窗
    closeDialog() {
      this.$emit('handleCloseDialog')
    }
  }
}
</script>

<style lang='scss' scoped>
.searchBox {
  .searchButton {
    margin-top: 50px;
    float: right;
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
    }
  }
}
.dialogTitle {
  display: inline-block;
  font-weight: bold;
  font-family: Arial;
  color: #000000;
  opacity: 1;
  font-size: 18px;
  .titleIcon {
    transform: rotate(180deg);
    color: #A0BFFC;
    margin-left: 20px;
    font-size: 24px;
  }
}
 
</style>
