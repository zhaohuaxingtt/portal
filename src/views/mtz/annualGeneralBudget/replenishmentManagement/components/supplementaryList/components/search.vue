<!--
 * @Author: tanmou
 * @Date: 2021-08-27 16:29:54
 * @LastEditTime: 2021-11-11 15:39:16
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\annualBudget\components\budget.vue
-->
<template>
  <div>
    <iDialog
             :title="dialogTitle"
             v-if="value"
             :visible.sync="value"
             width="85%"
             @close='closeDiolog'>
      <div class="searchBox">
        <iSearch @sure="handleSubmitSearch"
             @reset="handleSearchReset">
          <el-form :inline="true"
                 ref="searchForm"
                 :model="searchForm"
                 label-position="top"
                 class="demo-form-inline">
            <el-form-item style="marginRight:68px"
                          :label="language('CAIGOUKUANGJIA', '采购框架')"
                          class="formItem">
              <custom-select v-model="searchForm.saNos"
                            :user-options="getRawMaterialList"
                            clearable
                            multiple
                            :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                            display-member="message"
                            value-member="code"
                            value-key="code">
              </custom-select>
            </el-form-item>

            <el-form-item style="marginRight:68px"
                          :label="language('YICIJIANLINGJIANHAO', '一次件零件号')"
                          class="formItem">
              <custom-select v-model="searchForm.fpartNos"
                            :user-options="getOnePartList"
                            clearable
                            multiple
                            :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                            display-member="message"
                            value-member="code"
                            value-key="code">
              </custom-select>
            </el-form-item>

            <el-form-item style="marginRight:68px"
                          :label="language('ERCIJIANLINGJIANHAO', '二次件零件号')"
                          class="formItem">
              <custom-select v-model="searchForm.spartNos"
                            :user-options="getSecondPartList"
                            clearable
                            multiple
                            :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                            display-member="message"
                            value-member="code"
                            value-key="code">
              </custom-select>
            </el-form-item>

            <el-form-item style="marginRight:68px"
                          :label="language('ECJGYS', '二次件供应商')"
                          class="formItem">
              <custom-select v-model="searchForm.pieceSupplierSaps"
                            :user-options="getSecondSupplierList"
                            clearable
                            multiple
                            :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                            display-member="codeMessage"
                            value-member="code"
                            value-key="code">
              </custom-select>
            </el-form-item>

            <el-form-item style="marginRight:68px"
                          :label="language('BUCHASHIJIANDUAN', '补差时间段')"
                          class="formItem">
              <iDatePicker style="width: 220px;"
                          v-model="searchForm.dateTime"
                          type="monthrange">
              </iDatePicker>
            </el-form-item>

            <el-form-item style="marginRight:68px"
                          :label="language('CAILIAOZHONGLEI', '材料中类')"
                          class="formItem">
              <custom-select v-model="searchForm.categories"
                            :user-options="zhongleiList"
                            clearable
                            multiple
                            :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                            display-member="message"
                            value-member="code"
                            value-key="code">
              </custom-select>
            </el-form-item>

            <el-form-item style="marginRight:68px"
                          :label="language('SHIFOUGUIJINSHUYUANCAILIAO', '是否贵金属原材料')"
                          class="formItem">
              <custom-select v-model="searchForm.pgmFlag"
                :user-options="typesJS"
                clearable
                :placeholder="language('QINGSHURU', '请输入')"
                display-member="message"
                value-member="code"
                value-key="code">
              </custom-select>
            </el-form-item>
          </el-form>
        </iSearch>
      </div>
      <el-divider class="margin-top20"></el-divider>
      <div class="contentBox">
        <iTabsList v-model="tabsValue"
                   @tab-click="tableChange"
                   type="card"
                   slot="components"
                   calss="margin-top20 iTabsList">
          <el-tab-pane :name="1"
                        v-if="btnShow1"
                       :label="language('BUCHADIANHUIZONG','补差单汇总')"></el-tab-pane>
          <el-tab-pane :name="2"
                        v-if="btnShow2"
                       :label="language('BUCHADANMINGXI','补差单明细')"></el-tab-pane>
          <el-tab-pane :name="3"
                        v-if="btnShow3"
                       :label="language('BUCHADANMINGXIGUIJINSHU','补差单明细（贵金属）')"></el-tab-pane>
        </iTabsList>
        <tabs1
               :searchFormList="seachWather"
               :dataObject="detailObj"
               v-if="tabsValue == 1 && btnShow1"
               @componentHidden="btnHidden1"
               v-on:closeDiolog1="closeDiolog"></tabs1>
        <tabs2
               :searchFormList="seachWather"
               :dataObject="detailObj"
               v-show="tabsValue == 2 && btnShow2"
               @componentHidden="btnHidden2"
               v-on:closeDiolog2="closeDiolog"></tabs2>
        <tabs3
               :searchFormList="seachWather"
               :dataObject="detailObj"
               v-show="tabsValue == 3 && btnShow3"
               @componentHidden="btnHidden3"
               v-on:closeDiolog3="closeDiolog"></tabs3>
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iCard,iSearch, iSelect, iDatePicker, iMessage, iDialog, iButton, iTabs, iTabsList } from 'rise'
// import { getDeptData } from "@api/mtz/database/partsQuery";

import {
  getOnePartNo,
  getSecondPartNo,
  getSecondSupplier,
  getGroups,
  getSaNo
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/supplementary/details';
import { getMtzSupplierList } from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview'

import { deepClone } from "./util.js";

import tabs1 from './tabs1'
import tabs2 from './tabs2'
import tabs3 from './tabs3'

export default {
  components: {
    tabs1,
    tabs2,
    tabs3,
    iCard,
    iSelect,
    iDatePicker,
    iDialog,
    iButton,
    iTabs,
    iTabsList,
    iSearch
  },
  props: ["detailObj"],
  data () {
    return {
      typesJS: [
        {
          code: "1",
          message: "是"
        }, {
          code: "0",
          message: "否"
        }
      ],
      btnShow1:true,
      btnShow2:true,
      btnShow3:true,
      seachWather: {},
      searchForm: {},
      demandList: [],
      value: true,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      tabsValue: 1,

      getOnePartList: [],
      getSecondPartList: [],
      getSecondSupplierList: [],
      getRawMaterialList: [],
      zhongleiList: [],
      mtzDocId: "",
      dialogTitle: ""
    }
  },
  created () {
    this.mtzDocId = this.detailObj.id;
    this.dialogTitle = "补差单号-" + this.detailObj.bizNo;
    this.getDemandData()
  },
  mounted() {
    this.$nextTick(() => {
      this.$el.querySelector('.el-icon-arrow-up').click()
    });
  },
  methods: {
    tableChange (val) {
      if (val.name !== this.tabsValue) {
        this.tabsValue = val.name;
      }
    },
    // 获取用量版本
    getDemandData () {
      getOnePartNo({ mtzDocId: this.mtzDocId }).then(res => {
        this.getOnePartList = res.data;
      })
      getSecondPartNo({ mtzDocId: this.mtzDocId }).then(res => {
        this.getSecondPartList = res.data;
      })
      getMtzSupplierList({ mtzDocId: this.mtzDocId }).then(res => {
        this.getSecondSupplierList = res.data;
      })
      getSaNo({ mtzDocId: this.mtzDocId }).then(res => {
        this.getRawMaterialList = res.data;
      })
      getGroups({ mtzDocId: this.mtzDocId }).then(res => {
        this.zhongleiList = res.data;
      })
    },
    // 重置
    handleSearchReset (form) {
      this.searchForm = {};
      this.searchForm = {
        saNos:[],
        fpartNos:[],
        spartNos:[],
        pieceSupplierSaps:[],
        dateTime:[],
        categories:[],
        pgmFlag:"",
      }
      this.seachWather = {};
    },
    // 确定
    handleSubmitSearch () {
      let searchFictitious = deepClone(this.searchForm);
      if (this.searchForm.dateTime) {
        var tt = Object.keys(searchFictitious);
        for (var i = 0; i < tt.length; i++) {
          if (searchFictitious[tt[i]] == "") {
            delete searchFictitious[tt[i]];
          }
        }
        delete searchFictitious.dateTime;
        this.seachWather = {
          ...searchFictitious,
          mtzDocMonthBegin: this.searchForm.dateTime[0],
          mtzDocMonthEnd: this.searchForm.dateTime[1],
        };
      } else {
        var tt = Object.keys(searchFictitious);
        for (var i = 0; i < tt.length; i++) {
          if (searchFictitious[tt[i]] == "") {
            delete searchFictitious[tt[i]];
          }
        }
        this.seachWather = {
          ...searchFictitious
        }
      }
    },
    btnHidden1(){
      this.btnShow1 = false;
    },
    btnHidden2(){
      this.btnShow2 = false;
    },
    btnHidden3(){
      this.btnShow3 = false;
    },
    closeDiolog(){
      this.$emit('dialogShowFun', '');
      this.$parent.$children.forEach(item => {
        if (item.$options._componentTag === 'theTable') {
          item.getmakeUpPageList()
        }
      })
    },
  }
}
</script>

<style lang='scss' scoped>
$boxShadow: #e6e6e6;
$tabsInforHeight: 35px;

.searchBox {
  position: relative;
  display: flex;
  justify-content: space-between;
  .searchButton {
    position: absolute;
    right: 0;
    top: 50px;
    z-index: 100;
  }
}
.contentBox {
  margin-top: 20px;
  padding-bottom: 30px;
  .el-tabs--card {
    background-color: #ffffff;
  }
}
::v-deep .cardBody{
  margin:0!important;
  padding:0!important;
}
::v-deep .card{
  box-shadow: 0 0 0px rgb(27 29 33 / 0%)
}
</style>
