<!--
 * @Author: youyuan
 * @Date: 2021-10-14 14:44:54
 * @LastEditTime: 2022-03-09 16:27:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\mtzReplenishmentOverview\components\detailDialog.vue
-->
<template>
  <div>
    <iDialog :title="params.name"
             :visible.sync="value"
             width="85%"
             @close='closeDiolog'>
      <div class="searchBox">
        <el-form :inline="true"
                 :model="searchForm"
                 label-position="top"
                 class="demo-form-inline leftBox">
          <el-form-item style="marginRight:68px"
                        :label="language('YICIJIANLINGJIANHAO', '一次件零件号')">
            <custom-select v-model="searchForm['fpartNumList']"
                           :user-options="fPartNumDropDownData"
                           clearable
                           multiple
                           :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                           display-member="message"
                           value-member="code"
                           value-key="code">
            </custom-select>
            <!-- <iSelect v-model="searchForm['fPartNumList']"
                     multiple
                     collapse-tags
                     :placeholder="language('QINGSHURUXUANZE','请输入/选择')">
              <el-option v-for="(item, index) in fPartNumDropDownData"
                         :key="index"
                         :value="item.code"
                         :label="item.message"></el-option>
            </iSelect> -->
          </el-form-item>
          <el-form-item style="marginRight:68px"
                        :label="language('ERCIJIANLINGJIANHAO', '二次件零件号')">
            <custom-select v-model="searchForm['spartNumList']"
                           :user-options="sPartNumDropDownData"
                           clearable
                           multiple
                           :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                           display-member="message"
                           value-member="code"
                           value-key="code">
            </custom-select>
            <!-- <iSelect v-model="searchForm['sPartNumList']"
                     multiple
                     collapse-tags
                     :placeholder="language('QINGSHURUXUANZE','请输入/选择')">
              <el-option v-for="(item, index) in sPartNumDropDownData"
                         :key="index"
                         :value="item!== null?item.code:'null'"
                         :label="item!== null?item.message:'null'"></el-option>
            </iSelect> -->
          </el-form-item>
          <el-form-item style="marginRight:68px"
                        :label="language('ERCIJIANGONGYINGSHANG', '二次件供应商')">
            <custom-select v-model="searchForm['ssupplierList']"
                           :user-options="sSupplierDropDownData"
                           clearable
                           multiple
                           :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                           display-member="codeMessage"
                           value-member="code"
                           value-key="code">
            </custom-select>
            <!-- <iSelect v-model="searchForm['sSupplierList']"
                     multiple
                     collapse-tags
                     :placeholder="language('QINGSHURUXUANZE','请输入/选择')">
              <el-option v-for="(item, index) in sSupplierDropDownData"
                         :key="index"
                         :value="item.code"
                         :label="item.message"></el-option>
            </iSelect> -->
          </el-form-item>
          <el-form-item style="marginRight:68px"
                        :label="language('YUANCAILIAOPAIHAO', '原材料牌号')">
            <custom-select v-model="searchForm['materialBrandList']"
                           :user-options="materialBrandDropDownData"
                           clearable
                           multiple
                           :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                           display-member="codeMessage"
                           value-member="code"
                           value-key="code">
            </custom-select>
            <!-- <iSelect v-model="searchForm['materialBrandList']"
                     multiple
                     collapse-tags
                     :placeholder="language('QINGSHURUXUANZE','请输入/选择')">
              <el-option v-for="(item, index) in materialBrandDropDownData"
                         :key="index"
                         :value="item.code"
                         :label="item.message"></el-option>
            </iSelect> -->
          </el-form-item>
          <el-form-item style="marginRight:68px"
                        :label="language('BUCHASHIJIANDUAN', '补差时间段')">
            <iDatePicker style="width:200px"
                         v-model="searchForm['compDate']"
                         type="daterange"
                         value-format="yyyy-MM-dd"
                         format="yyyy-MM-dd"
                         @change="changeYear"
                         range-separator="至"
                         start-placeholder="开始日期"
                         end-placeholder="结束日期">
            </iDatePicker>
            <!-- <iDatePicker v-model="searchForm['compDate']"
                         valueFormat="yyyy-MM-dd"
                         type="daterange"
                         @change="changeYear"></iDatePicker> -->
          </el-form-item>
          <el-form-item style="marginRight:68px"
                        :label="language('KESHI', '科室')">
            <custom-select v-model="searchForm['department']"
                           :user-options="departmentDropDownData"
                           clearable
                           multiple
                           :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                           display-member="departNameEn"
                           value-member="departId"
                           value-key="departId">
            </custom-select>
            <!-- <iSelect v-model="searchForm['department']"
                     multiple
                     collapse-tags
                     :placeholder="language('QINGSHURUXUANZE','请输入/选择')">
              <el-option v-for="(dept, index) in departmentDropDownData"
                         :key="index"
                         :label="dept.existShareNum"
                         :value="dept.existShareId"></el-option>
            </iSelect> -->
          </el-form-item>
          <el-form-item style="marginRight:68px"
                        :label="language('CAIGOUYUAN', '采购员')">
            <custom-select v-model="searchForm['linieList']"
                           :user-options="linieDropDownData"
                           clearable
                           multiple
                           :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                           display-member="message"
                           value-member="code"
                           value-key="code">
            </custom-select>
            <!-- <iSelect v-model="searchForm['linieList']"
                     multiple
                     collapse-tags
                     :placeholder="language('QINGSHURUXUANZE','请输入/选择')">
              <el-option v-for="(item, index) in linieDropDownData"
                         :key="index"
                         :value="item.code"
                         :label="item.message"></el-option>
            </iSelect> -->
          </el-form-item>
          <el-form-item class="searchButton">
            <iButton @click="handleSubmitSearch">{{language('CX', '查询')}}</iButton>
            <iButton @click="handleSearchReset">{{language('CZ', '重置')}}</iButton>
          </el-form-item>
        </el-form>
      </div>
      <el-divider ></el-divider>
      <div class="contentBox">
        <div class="tableOptionBox">
          <div class="tableTitle">
            <iTabsList  @tab-click="changeNav" v-model="activeName" type="card" slot="components" class="margin-top20">
              <el-tab-pane :label="$t('总览')" name="all"> </el-tab-pane>
              <el-tab-pane :label="$t('已发起凭证')" name="history"> </el-tab-pane>
          </iTabsList>
            <div>
              <iButton @click="handleExportCurrent"
                      v-permission="MTZ_REPORT_BUCHAGUANLI_MTZBUCHAZONGLAN_DAOCHUDANGYE">{{language('LK_DAOCHU', '导出')}}</iButton>
              <iButton @click="handleRedeploy"
              v-if="activeName=='all'"
                    v-permission="MTZ_REPORT_BUCHAGUANLI_MTZBUCHAZONGLAN_ZHUANPAI">{{language('ZHUANGPAI', '转派')}}</iButton>
              </div>
            </div>
         
        </div>
        <div v-show="activeName=='all'">
          <span  class="margin-right10">只看自己</span>
            <el-switch v-model="searchForm.isSeeMe"
                       @change="lookUs"
                       :active-value="true"
                       :inactive-value="false" />
        </div>
        <tableList 
                 v-show="activeName=='all'"
                    v-update
                     class="margin-top20"
                   :tableData="tableListData"
                   :tableTitle="tableTitle"
                   :tableLoading="loading"
                   :index="true"
                   @handleSelectionChange="handleSelectionChange">

                   <template slot-scope="scope" slot="avgPeriod">
              <span>{{ scope.row.avgPeriod ? avgPeriodList.find(val => val.code == scope.row.avgPeriod).name : '' }}</span>
            </template>
            <template slot-scope="scope" slot="offsetMonth">
              <span>{{ scope.row.offsetMonth ? offsetList.find(val => val.code == scope.row.offsetMonth).name : '' }}</span>
            </template> 

        </tableList>
        <i-table-custom
          v-show="activeName=='history'"
          :loading="loading"
          :data="tableListData2"  
          :columns="tableTitle2"
          ref="iTable"
          @handle-selection-change="handleSelectionChange" />
        <iPagination v-update
                     @size-change="handleSizeChange($event, handleSubmitSearch)"
                     @current-change="handleCurrentChange($event, getTableData)"
                     background
                     :page-sizes="page.pageSizes"
                     :page-size="page.pageSize"
                     :layout="page.layout"
                     :current-page='page.currPage'
                     :total="page.totalCount" />
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iTabsList,iMessage, iDialog, iSelect, iButton, iDatePicker, iPagination, iMessageBox } from 'rise'
import { pageMixins } from '@/utils/pageMixins';
import tableList from '@/components/commonTable/index.vue'
import { tableTitle,tableTitle2,TABLE_COLUMS,offsetList,avgPeriodList } from './data'
import { excelExport } from './util'
import iTableCustom from '@/components/iTableCustom'
import {
  voucherInitiatedPageList
} from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview'
import { fetchTableData, fetchOnePartNo, fetchSecondPartNo, fetchSecondSupplier, fetchRawMaterialCode, fetchCurrentUser, pageMtzDetailExport } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzReplenishmentOverview/detail'
import { queryDeptSectionForCompItem } from '@/api/mtz/annualGeneralBudget/annualBudgetEdit'
import { getDeptData } from '@/api/kpiChart/index'
import { getMtzSupplierList,  compdocIExport} from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview'
import { getNowFormatDate } from "./util";
export default {
  mixins: [pageMixins],
  components: {
    iTableCustom,
    iDialog,
    iSelect,
    iButton,
    iDatePicker,
    iPagination,
    tableList,
    iTabsList
  },
  data () {
    return {
      tableTitle2:TABLE_COLUMS,
      tableListData2: [],
      searchForm: {},
      tableTitle,
      loading: false,
      tableListData: [],
      selection: [],
      activeName:'all',
      fPartNumDropDownData: [], //一次零件号
      sPartNumDropDownData: [], //二次零件号
      sSupplierDropDownData: [], //二次件供应商编号
      materialBrandDropDownData: [], //原材料牌号
      departmentDropDownData: [],//科室
      linieDropDownData: [],//采购员
    }
  },
  props: {
    value: {
      type: Boolean,
      default: true
    },
    params: {
      type: Object,
      default: () => { }
    },
  },
  created () {
    this.page.pageSizes = [10, 20, 50, 100, 200, 300]
    this.$nextTick(_ => {
      this.getDeptList()
      this.getOnePartNo()
      this.getSecondPartNo()
      this.getSecondSupplier()
      this.initSeachData()
      this.getTableData()
      this.getRawMaterialCode()
      this.getCurrentUser()
    })
  },
  methods: {
    changeNav(){
        this.getTableData()
    },
    // getTime () {
    //   var date = new Date();
    //   var year = date.getFullYear();
    //   // return [year + "-01-01 00:00:00", getNowFormatDate() + " 00:00:00"];
    //   return [year + "-01-01", getNowFormatDate()];
    // },
    // 初始化检索条件
    initSeachData (val) {
      for (let key in this.searchForm) {
        this.searchForm[key] = []
      }
      if (val == "clear") {
        this.$set(this.searchForm, 'compDate', [])
      } else if (this.params.time && this.params.time.length !== 0) {
        this.params.time[0] = this.params.time[0].split(" ")[0]
        this.params.time[1] = this.params.time[1].split(" ")[0]
        this.$set(this.searchForm, 'compDate', this.params.time)
      }
      this.$set(this.searchForm, 'isSeeMe', true)
      this.$set(this.searchForm, 'compStartDate', '')
      this.$set(this.searchForm, 'compEndDate', '')
    },
    // 获取列表数据
    getTableData () {
      this.loading = true
      if(this.activeName=='all'){
        fetchTableData({
        ...this.searchForm,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        fsupplier: this.params.firstSupplierId || null,
        compStartDate: this.searchForm.compDate ? this.searchForm.compDate[0] : null,
        compEndDate: this.searchForm.compDate ? this.searchForm.compDate[1] : null,
      }).then(res => {
        console.log('res', res);
        if (res && res.code == 200) {
          this.loading = false
          this.page.totalCount = res.total
          this.tableListData = res.data
        } else iMessage.error(res.desZh)
      })
      }else{
        voucherInitiatedPageList({
          ...this.searchForm,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        firstSupplierName:this.params.name || null,
        firstSupplier: this.params.firstSupplierId || null,
        compTimeStart: this.searchForm.compDate ? this.searchForm.compDate[0] : null,
        compTimeEnd: this.searchForm.compDate ? this.searchForm.compDate[1] : null,
        }).then(res=>{
            if(res.code==200){
              this.tableListData2 = res.data
              this.page.totalCount = res.total
              this.loading = false
            }else iMessage.error(res.desZh)
          })
      }

    },
    // 获取一次件零件号下拉数据
    getOnePartNo () {
      fetchOnePartNo({
        fsupplierId: this.params.firstSupplierId || null
      }).then(res => {
        if (res && res.code == 200) {
          console.log('获取一次件零件号下拉数据', res);
          this.fPartNumDropDownData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 获取二次零件号下拉选择
    getSecondPartNo () {
      fetchSecondPartNo({
        fsupplierId: this.params.firstSupplierId || null
      }).then(res => {
        if (res && res.code == 200) {
          console.log('获取二次零件号下拉选择', res);
          this.sPartNumDropDownData = res.data

        } else iMessage.error(res.desZh)
      })
    },
    // 获取二次零件号编号-名称
    getSecondSupplier () {
      getMtzSupplierList({}).then(res => {
        if (res && res.code == 200) {
          this.sSupplierDropDownData = res.data
          // this.sSupplierDropDownData = this.sSupplierDropDownData.filter(item => item)
        } else iMessage.error(res.desZh)
      })
    },
    // 获取部门数据
    getDeptList () {
      queryDeptSectionForCompItem({}).then(res => {
        if (res && res.code == 200) {
          this.departmentDropDownData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 获取原材料牌号
    getRawMaterialCode () {
      fetchRawMaterialCode({
        fsupplierId: this.params.firstSupplierId || null
      }).then(res => {
        if (res && res.code == 200) {
          this.materialBrandDropDownData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 获取采购员
    getCurrentUser () {
      fetchCurrentUser({}).then(res => {
        if (res && res.code == 200) {
          this.linieDropDownData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 查询
    handleSubmitSearch () {
      this.page.currPage = 1
      this.getTableData()
    },
    // 重置
    handleSearchReset () {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.initSeachData("clear")
      this.getTableData()
    },
    // 选中项改变
    handleSelectionChange (val) {
      this.selection = val
    },
    // 关闭弹窗
    closeDiolog () {
      this.$emit('handleCloseDialog')
    },
    lookUs () {
      this.handleSubmitSearch();
    },
    // 转派
    handleRedeploy () {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      var choiseList = [];
      this.selection.forEach(e => {
        choiseList.push({
          firstPartNo: e.assemblyPartnum,
          materialCode: e.materialCode,
          firstSupplierId: this.params.firstSupplierId
        })
      })
      this.$emit('handleRedeploy', choiseList)
    },
    // 导出当页
    handleExportCurrent () {
      if(this.activeName=='all'){
        pageMtzDetailExport({
        ...this.searchForm,
        fsupplier: this.params.firstSupplierId || null,
        compStartDate: this.searchForm.compDate ? this.searchForm.compDate[0] : null,
        compEndDate: this.searchForm.compDate ? this.searchForm.compDate[1] : null,
      }).then(res => {
        let blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
        let objectUrl = URL.createObjectURL(blob);
        let link = document.createElement("a");
        link.href = objectUrl;
        let fname = this.params.name + getNowFormatDate() + ".xlsx";
        link.setAttribute("download", fname);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        iMessage.success("链接成功！")
      })
      }else{
        compdocIExport({
          initiated:1,
          ...this.searchForm,
          firstSupplierName:this.params.name || null,
          firstSupplier: this.params.firstSupplierId || null,
          compTimeStart: this.searchForm.compDate ? this.searchForm.compDate[0] : null,
        compTimeEnd: this.searchForm.compDate ? this.searchForm.compDate[1] : null,
        }).then(res=>{
          iMessage.success("链接成功！")

        })

      }

      // excelExport(this.params.name, this.tableListData, this.tableTitle)
    }
  }
}
</script>

<style lang='scss' scoped>
.approvaltitle {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-weight: bold;
    font-size: 20px;
  }
  span {
    font-weight: 400;
    font-size: 16px;
    display: inline-block;
    margin-right: 30px;
  }
}
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
  padding-bottom: 30px;
  .tableOptionBox {
    // display:flex;
    .tableTitle {
     justify-content:space-between;
      align-items:center;
      display: flex;
      font-weight: bold;
      font-size: 16px;
      color: #000;
      margin: 0 10px;
    }
    ::v-deep.el-tabs--card{
      background-color:white;
    }
    button {
      // float: right;
      // z-index: 100;
      // margin-bottom: 20px;
      margin-left: 10px;
    }
  }
}
.leftBox {
  margin-right: 200px;
}
</style>
