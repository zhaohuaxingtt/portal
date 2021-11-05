<!--
 * @Author: tanmou
 * @Date: 2021-08-27 16:29:54
 * @LastEditTime: 2021-10-09 18:29:05
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\annualBudget\components\budget.vue
-->
<template>
  <div>
    <iDialog :modal-append-to-body='false'
             append-to-body
             :title="dialogTitle"
             v-if="value"
             :visible.sync="value"
             width="85%"
             @close='closeDiolog'>
      <div class="searchBox">
        <el-form :inline="true"
                 ref="searchForm"
                 :model="searchForm"
                 label-position="top"
                 class="demo-form-inline leftBox">

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
                        :label="language('ECJGYSBHMC', '二次件供应商编号-名称')"
                        class="formItem">
            <custom-select v-model="searchForm.pieceSupplierSaps"
                           :user-options="getSecondSupplierList"
                           clearable
                           multiple
                           :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                           display-member="message"
                           value-member="code"
                           value-key="code">
            </custom-select>
          </el-form-item>

          <el-form-item style="marginRight:68px"
                        :label="language('BUCHASHIJIANDUAN', '补差时间段')"
                        class="formItem">
            <iDatePicker style="width: 180px;"
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
        <div class="searchButton">
          <iButton @click="handleSubmitSearch">{{language('CX', '查询')}}</iButton>
          <iButton @click="handleSearchReset('searchForm')">{{language('CZ', '重置')}}</iButton>
        </div>
      </div>
      <el-divider class="margin-top20"></el-divider>
      <div class="contentBox">
        <iTabsList v-model="tabsValue"
                   @tab-click="tableChange"
                   type="card"
                   slot="components"
                   calss="margin-top20 iTabsList">
          <el-tab-pane :name="1"
                       :label="language('BUCHADIANHUIZONG','补差单汇总')"></el-tab-pane>
          <el-tab-pane :name="2"
                       :label="language('BUCHADANMINGXI','补差单明细')"></el-tab-pane>
          <el-tab-pane :name="3"
                       :label="language('BUCHADANMINGXIGUIJINSHU','补差单明细（贵金属）')"></el-tab-pane>
        </iTabsList>
        <tabs1 :mtzDocId="mtzDocId"
               :searchFormList="seachWather"
               :dataObject="detailObj"
               v-if="tabsValue == 1"
               v-on:closeDiolog1="closeDiolog"></tabs1>
        <tabs2 :mtzDocId="mtzDocId"
               :searchFormList="seachWather"
               :dataObject="detailObj"
               v-show="tabsValue == 2"
               v-on:closeDiolog2="closeDiolog"></tabs2>
        <tabs3 :mtzDocId="mtzDocId"
               :searchFormList="seachWather"
               :dataObject="detailObj"
               v-show="tabsValue == 3"
               v-on:closeDiolog3="closeDiolog"></tabs3>
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iCard, iSelect, iDatePicker, iMessage, iDialog, iButton, iTabs, iTabsList } from 'rise'
// import { getDeptData } from "@api/mtz/database/partsQuery";

import {
  getOnePartNo,
  getSecondPartNo,
  getSecondSupplier,
  getGroups,
  getSaNo
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/supplementary/details';
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
    iTabsList
  },
  props: ["detailObj"],
  data () {
    return {
      typesJS: [
        {
          code: "Y",
          message: "是"
        }, {
          code: "N",
          message: "否"
        }
      ],
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
    console.log(this.detailObj)
    this.mtzDocId = this.detailObj.id;
    this.dialogTitle = "补差单号-" + this.detailObj.bizNo;
    this.getDemandData()
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
      getSecondSupplier({ mtzDocId: this.mtzDocId }).then(res => {
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

.leftBox {
  margin-right: 200px;
}
</style>
