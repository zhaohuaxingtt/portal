<template>
  <div v-loading="BoxLoading">
    <div class="tabsBoxInfor">
      <div :style="item.prop == 'actuallyTotalAmt' ? {fontWeight: 'bold'} : null"
           class="inforDiv"
           v-for="(item,index) in tabs2InforList"
           :key="index">
        <span>{{item.name}}</span>
        <div class="inforText"
             v-if="item.prop == 'monthFromTo' && inforData['monthFromTo']">{{tranNumber(inforData['monthFromTo'],true)}}~{{tranNumber(inforData['monthFromTo'],false)}}</div>
        <!-- <div class="inforText" v-if="item.prop == 'monthFromTo'">{{inforData["monthFrom"]}}~{{inforData["monthTo"]}}</div> -->
        <div class="inforText"
             v-else>{{inforData[item.prop]}}</div>
      </div>
    </div>
    <div class="BtnTitle">
      <span>明细列表</span>
      <div>
        <iButton @click="uploadPZ">{{language('DAOCHU', '导出')}}</iButton>
        <iButton @click="upload">{{language('PINGZHENGDAOCHU', '凭证导出')}}</iButton>
      </div>
    </div>
    <tableList class="margin-top20"
               :selection="false"
               :tableData="tableListData"
               :tableTitle="tableTitle"
               :tableLoading="loading"
               :index="true">
      <template slot="pianyiqujian"
                slot-scope="scope">
        <span v-if="!scope.row.offsetFlag == '否'">{{scope.row.effPriceFrom}}~{{scope.row.effPriceTo}}</span>
      </template>
      <template #pieceSupplierSap="scope">
        {{scope.row.pieceSupplierSap}} - {{scope.row.pieceSupplierName}}
      </template>
    </tableList>
    <iPagination v-update
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 background
                 :current-page="page.currPage"
                 :page-sizes="page.pageSizes"
                 :page-size="page.pageSize"
                 :layout="page.layout"
                 :total="page.totalCount">
    </iPagination>
  </div>
</template>

<script>
import { iButton, iPagination, iMessageBox, iMessage } from 'rise'
import { tableTitle2, tabs2InforList } from './data'
import tableList from '@/components/commonTable/index.vue'
import {
  getDetailed,
  // getDifferenceInfor,
  compdocDetailExport,
  mtzBalanceDetailsExport,
  compdocMetalDetailSum
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/supplementary/details';
import { getNowFormatDate } from "./util.js";
import NewMessageBox from '@/components/newMessageBox/dialogReset.js'

export default {
  name: "tabs2",
  components: {
    tableList,
    iButton,
    iPagination
  },
  props: ["searchFormList", "dataObject"],
  data () {
    return {
      page: {
        currPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50, 100],
        layout: "sizes, prev, pager, next, jumper",
        totalCount: 0
      },
      loading: false,
      tabs2InforList: tabs2InforList,
      tableTitle: tableTitle2,
      tableListData: [],
      inforData: {},
      BoxLoading: true,
    }
  },
  watch: {
    "searchFormList": {
      handler (x, y) {
        this.BoxLoading = true;
        this.serchList = x;
        this.page.currPage = 1;
        this.page.pageSize = 10;
        this.getData();
      },
      immediate: true
    }
  },
  created () {
    compdocMetalDetailSum({
      mtzDocId: this.dataObject.id,
      pgmFlag: 0
    }).then(res => {
      this.inforData = res.data;
    })
    // getDifferenceInfor(this.dataObject.id).then(res=>{
    //     this.inforData = res.data;
    // })
  },
  methods: {
    tranNumber (val, type) {
      if (type) {
        return val.substring(0, 6)
      } else {
        return val.substring(6, 12)
      }
    },
    uploadPZ () {
      NewMessageBox({
        title: this.language('LK_WENXINTISHI', '温馨提示'),
        Tips: this.language('SHIFOUDAOCHU', '是否导出？'),
        cancelButtonText: this.language('QUXIAO', '取消'),
        confirmButtonText: this.language('QUEREN', '确认'),
      }).then(() => {
        compdocDetailExport({
          ...this.serchList,
          mtzDocId: this.dataObject.id
        }).then(res => {
          let blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
          let objectUrl = URL.createObjectURL(blob);
          let link = document.createElement("a");
          link.href = objectUrl;
          let fname = "补差单明细-" + this.detailObj.bizNo + ".xlsx";
          // let fname = "MTZ补差单明细" + getNowFormatDate() + ".xlsx";
          link.setAttribute("download", fname);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          iMessage.success("链接成功！")
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    upload () {
      NewMessageBox({
        title: this.language('LK_WENXINTISHI', '温馨提示'),
        Tips: this.language('SHIFOUDAOCHU', '是否导出？'),
        cancelButtonText: this.language('QUXIAO', '取消'),
        confirmButtonText: this.language('QUEREN', '确认'),
      }).then(() => {
        mtzBalanceDetailsExport({ mtzDocId: this.dataObject.id }).then(res => {
          let blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
          let objectUrl = URL.createObjectURL(blob);
          let link = document.createElement("a");
          link.href = objectUrl;
          let fname = "MTZ补差单明细凭证" + getNowFormatDate() + ".pdf";
          link.setAttribute("download", fname);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          this.$message({
            type: "success",
            message: "链接成功!"
          });
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    getData () {
      getDetailed({
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        mtzDocId: this.dataObject.id,
        ...this.serchList
      }).then(res => {
        if (res.data.length < 1) {
          this.$emit("componentHidden", "")
        }
        this.tableListData = res.data;
        this.page.totalCount = res.total;
      }).then(red => {
        this.loading = false;
        this.BoxLoading = false;
      })
    },
    handleSizeChange (val) {//每页 ${val} 条
      this.loading = true;
      this.page.pageSize = val;
      this.page.currPage = 1;
      this.getData();
    },
    handleCurrentChange (val) {//当前页: ${val}`
      this.loading = true;
      this.page.currPage = val;
      this.getData();
    },
  }
}
</script>

<style lang="scss" scoped>
$tabsInforHeight: 35px;

.BtnTitle {
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > span {
    font-size: 18px;
    font-weight: bold;
  }
}
.tabsBoxInfor {
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  flex-flow: wrap;
  .inforDiv:nth-child(3n + 2) {
    span {
      margin-left: 15%;
    }
  }
  .inforDiv:nth-child(3n + 3) {
    span {
      margin-left: 15%;
    }
  }
  .inforDiv {
    width: 33.3%;
    height: $tabsInforHeight;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 8px;
    span {
    }
    .inforText {
      width: 60%;
      background: #f8f8fa;
      text-align: center;
      height: $tabsInforHeight;
      line-height: $tabsInforHeight;
    }
  }
}
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
</style>