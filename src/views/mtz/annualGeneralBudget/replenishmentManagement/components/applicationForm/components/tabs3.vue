<template>
  <div v-loading="BoxLoading">
    <div class="tabsBoxInfor">
      <div :style="item.prop == 'actuallyTotalAmt' ? {fontWeight: 'bold'} : null"
           class="inforDiv"
           v-for="(item,index) in tabsInforList"
           :key="index">
        <span>{{item.name}}</span>
        <div class="inforText"
             v-if="item.prop == 'monthFromTo' && inforData['monthFromTo']">{{tranNumber(inforData['monthFromTo'],true)}}~{{tranNumber(inforData['monthFromTo'],false)}}</div>
        <div class="inforText"
             v-else>{{inforData[item.prop]}}</div>
      </div>
    </div>
    <div class="BtnTitle">
      <span>明细列表</span>
      <div>
        <!-- <iButton @click="uploadPZ" v-permission="PROTAL_MTZ_BUCHAGUANLI_BUCHALIEBIAO_DAOCHU">{{language('DAOCHU', '导出')}}</iButton>
        <iButton @click="upload" v-permission="PROTAL_MTZ_BUCHAGUANLI_BUCHALIEBIAO_PINGZHENGDAOCHU">{{language('PINGZHENGDAOCHU', '凭证导出')}}</iButton> -->
      </div>
    </div>
    <tableList class="margin-top20"
               :tableData="tableListData"
               :tableTitle="tableTitle"
               :tableLoading="loading"
                height="450px"
                fixed
               :index="true">
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
import { tableTitle3, tabs3InforList } from './data'
import tableList from '@/components/commonTable/index.vue'
import {
  compdocMetalDetailExport,
  getDifferenceInfor,
  compdocMetalDetailPage,
  mtzBalanceDetailsExport,
  compdocMetalDetailSum
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/supplementary/details';
import { getNowFormatDate } from "./util.js";
import { NewMessageBox,NewMessageBoxClose } from '@/components/newMessageBox/dialogReset.js'

export default {
  name: "tabs3",
  components: {
    tableList,
    iButton,
    iPagination
  },
  // props:["mtzDocId","searchFormList"],
  data () {
    return {
      page: {
        currPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50, 100],
        layout: "total, sizes, prev, pager, next, jumper",
        totalCount: 0
      },
      loading: false,
      tabsInforList: tabs3InforList,
      tableTitle: tableTitle3,
      tabsBoxList: [
        {
          id: 1,
          translate: "BUCHADIANHUIZONG",
          translateOld: "补差单汇总",
          name: "补差单汇总"
        }, {
          id: 2,
          translate: "BUCHADANMINGXI",
          translateOld: "补差单明细",
          name: "补差单明细"
        }, {
          id: 3,
          translate: "BUCHADANMINGXIGUIJINSHU",
          translateOld: "补差单明细（贵金属）",
          name: "补差单明细（贵金属）"
        },
      ],
      tableListData: [],
      inforData: {},
      BoxLoading: true,
    }
  },
  watch: {
    "searchFormList": {
      handler (x, y) {
        this.mtzDocId = this.$route.query.mtzDocId
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
    this.mtzDocId = this.$route.query.mtzDocId
    this.getData();
    // getDifferenceInfor(this.mtzDocId).then(res => {
    //   this.inforData = res.data;
    // })
    compdocMetalDetailSum({
      mtzDocId: this.mtzDocId,
      pgmFlag: 1
    }).then(res => {
      this.inforData = res.data;
    })
  },
  methods: {
    tranNumber (val, type) {
      if (type) {
        return val.substring(0, 6)
      } else {
        return val.substring(6, 12)
      }
    },
    getData () {
      compdocMetalDetailPage({
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        mtzDocId: this.mtzDocId,
        ...this.serchList
      }).then(res => {
        this.tableListData = res.data;
        this.page.totalCount = res.total;
      }).then(red => {
        this.BoxLoading = false;
        this.loading = false;
      })
    },
    uploadPZ () {
      NewMessageBox({
        title: this.language('LK_WENXINTISHI', '温馨提示'),
        Tips: this.language('SHIFOUDAOCHU', '是否导出？'),
        cancelButtonText: this.language('QUXIAO', '取消'),
        confirmButtonText: this.language('QUEREN', '确认'),
      }).then(() => {
        compdocMetalDetailExport({
          ...this.serchList,
          mtzDocId: this.mtzDocId
        }).then(res => {
          let blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
          let objectUrl = URL.createObjectURL(blob);
          let link = document.createElement("a");
          link.href = objectUrl;
          let fname = "补差单明细（贵金属）" + this.dataObject.bizNo + ".xlsx";
          // let fname = "MTZ补差单明细（贵金属）" + getNowFormatDate() + ".xlsx";
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
        mtzBalanceDetailsExport({ mtzDocId: this.mtzDocId }).then(res => {
          let blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
          let objectUrl = URL.createObjectURL(blob);
          let link = document.createElement("a");
          link.href = objectUrl;
          let fname = "MTZ补差单明细(贵金属)凭证" + getNowFormatDate() + ".pdf";
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
  },
  destroyed () {
    NewMessageBoxClose();
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