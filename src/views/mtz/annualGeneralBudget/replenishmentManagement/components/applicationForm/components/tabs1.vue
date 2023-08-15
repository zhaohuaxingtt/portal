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
        <!-- <div class="inforText" v-if="item.prop == 'monthFromTo'">{{inforData["monthFrom"]}}~{{inforData["monthTo"]}}</div> -->
        <div class="inforText"
             v-else>{{inforData[item.prop]}}</div>
      </div>
    </div>
    <el-input type="textarea"
              :rows="2"
              placeholder="请输入备注"
              v-model="textarea"></el-input>
    <div class="BtnTitle">
      <span>汇总列表</span>
    </div>
    <tableList class="margin-top20"
                height="400px"
               :tableData="tableListData"
               :tableTitle="tableTitle"
               :tableLoading="loading"
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
    <iDialog title="拒绝原因"
             :visible.sync="closeValue"
             v-if="closeValue"
             width="85%"
             @close='closeDiologBtn'
             append-to-body>
      <negative :mtzDocId="mtzDocId"
                v-on:closeTc="closeTcBox"></negative>
    </iDialog>
  </div>
</template>

<script>
import { iButton, iMessage, iPagination, iDialog, iMessageBox } from 'rise'
import { tableTitle, tabsInforList } from './data'
import negative from './negative.vue'
import tableList from '@/components/commonTable/index.vue'
import {
  compdocMetalDetailSum,
  compdocMetalDetailSumItem,
  saveRemark,
  mtzCompDetailOverviewExport,
  supplierConfirmation
} from "@/api/mtz/annualGeneralBudget/replenishmentManagement/supplementary/details"
import { deepClone, getNowFormatDate } from "./util.js";

export default {
  name: "tabs1",
  components: {
    tableList,
    iButton,
    iPagination,
    iDialog,
    negative
  },

  data () {
    return {
      loading: false,
      tabsInforList,
      tableTitle,
      textarea: "",
      tableListData: [],
      inforData: {},
      BoxLoading: true,
      page: {
        currPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50, 100],
        layout: "sizes, prev, pager, next, jumper",
        totalCount: 0
      },
      serchList: {},
      closeValue: false,
    }
  },
  created () {
    this.mtzDocId = this.$route.query.mtzDocId
    console.log(this.mtzDocId)
    this.getData();
  },
  methods: {
    tranNumber (val, type) {
      if (type) {
        return val.substring(0, 6)
      } else {
        return val.substring(6, 12)
      }
    },
    bingo () {
      var that = this;
      iMessageBox(`是否提交确认？`).then(() => {
        supplierConfirmation({ id: that.mtzDocId }).then(res => {
          iMessage.success('提交确认成功！')
          that.$emit("closeDiolog1", "")
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    refer () {//提交

    },
    getData () {
      compdocMetalDetailSum({ mtzDocId: this.mtzDocId }).then(res => {
        this.inforData = deepClone(res.data);
        this.textarea = res.data.remark;
      }).then(red => {
        this.BoxLoading = false;
      })
    },
    getList () {
      compdocMetalDetailSumItem({
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
    save () {
      saveRemark({
        remark: this.textarea,
        mtzDocId: this.mtzDocId
      }).then(res => {
        iMessage.success(res.data)
      }).catch(res => {
        iMessage.error(res.data)
      })
    },
    tableChange (val) {
      if (val !== this.tabsValue) {
        this.tabsValue = val;
      }
    },
    refuse () {//拒绝
      this.closeValue = true;
    },
    closeDiologBtn () {//关闭按钮
      this.closeValue = false;
    },
    closeTcBox () {
      this.closeValue = false;
    },
    upload () {
      iMessageBox(`是否导出？`).then(() => {
        mtzCompDetailOverviewExport({}).then(res => {
          console.log(res)
          // let blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
          // let objectUrl = URL.createObjectURL(blob);
          // let link = document.createElement("a");
          // link.href = objectUrl;
          // let fname = "MTZ补差单汇总" + getNowFormatDate() + ".xlsx";
          // link.setAttribute("download", fname);
          // document.body.appendChild(link);
          // link.click();
          // link.parentNode.removeChild(link);
          // iMessage.success("链接成功！")
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    handleSizeChange (val) {//每页 ${val} 条
      this.loading = true;
      this.page.pageSize = val;
      this.page.currPage = 1;
      this.getList();
    },
    handleCurrentChange (val) {//当前页: ${val}`
      this.loading = true;
      this.page.currPage = val;
      this.getList();
    },
  }
}
</script>

<style lang="scss" scoped>
$tabsInforHeight: 35px;

.BtnTitle {
  margin-top: 30px;
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