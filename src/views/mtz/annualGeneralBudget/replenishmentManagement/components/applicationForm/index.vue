<!--
 * @Author: your name
 * @Date: 2021-11-03 14:28:17
 * @LastEditTime: 2021-11-16 20:04:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\applicationForm\index.vue
-->
<template>
  <div>
    <!-- <div class="flex title"
         style="width:100%">
      <span>请处理XXXX公司的补差申请</span>
      <div>
        <iButton>{{language('PIZHUN','批准')}}</iButton>
        <iButton>{{language('JUJUE','拒绝')}}</iButton>
        <iButton>{{language('BUCHONGCAILIAO','补充材料')}}</iButton>
      </div>
    </div> -->
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
      <iCard>
        <tabs1 :mtzDocId="mtzDocId"
               :searchFormList="seachWather"
               :dataObject="detailObj"
               v-if="tabsValue == 1"
               v-on:closeDiolog1="closeDiolog"></tabs1>
        <tabs2 :mtzDocId="mtzDocId"
               :searchFormList="seachWather"
               v-show="tabsValue == 2"
               v-on:closeDiolog2="closeDiolog"></tabs2>
        <tabs3 :mtzDocId="mtzDocId"
               :searchFormList="seachWather"
               v-show="tabsValue == 3"
               v-on:closeDiolog3="closeDiolog"></tabs3>
      </iCard>
    </div>

  </div>
</template>

<script>
import { iCard, iSelect, iDatePicker, iMessage, iDialog, iButton, iTabsList, iPage } from 'rise'
import {
  getOnePartNo,
  getSecondPartNo,
  getSecondSupplier,
  getGroups,
  getSaNo
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/supplementary/details';
// import { deepClone } from "./util.js";
import tabs1 from './components/tabs1'
import tabs2 from './components/tabs2'
import tabs3 from './components/tabs3'

export default {
  components: {
    tabs1,
    tabs2,
    tabs3,
    iTabsList,
    iCard,
    iPage,
    iButton
  },
  props: {
    // detailObj: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       applicantBy: "张琳",
    //       approvedAmt: "-56433947.71",
    //       bizNo: "MTZ20211005161",
    //       department: "CSM",
    //       fileList: null,
    //       id: "1000000139",
    //       mgroup: "01006:PGM (Pd)",
    //       monthFromTo: "201001-201012",
    //       paidAmt: "0.00",
    //       rejectReason: "",
    //       remark: "20110603 CFA02ZLH Approved",
    //       riseId: "1457382",
    //       sapPayBalanceNo: null,
    //       status: "审批中",
    //       supplier: "10986-上海佛吉亚红湖排气系统有限公司"
    //     }
    //   }
    // }
  },
  data () {
    return {
      seachWather: {},
      searchForm: {},
      demandList: [],
      value: true,
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
    this.mtzDocId = this.$route.query.id;
    // this.dialogTitle = "补差单号-" + this.detailObj.bizNo;
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
      this.seachWather = {};
    },
    // 确定
    handleSubmitSearch () {
      let searchFictitious = _.deepClone(this.searchForm);
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
    closeDiolog () {
      this.$emit('dialogShowFun', '');
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
}

.leftBox {
  margin-right: 200px;
}
.title {
  justify-content: space-between;
  font-size: 20px;
  font-weight: bold;
  line-height: 23px;
}
</style>