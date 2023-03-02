<!--
 * @Author: tanmou
 * @Date: 2021-08-27 16:29:54
 * @LastEditTime: 2023-02-22 11:20:25
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: 
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\chipSupplementaryList\components\search.vue
-->
<template>
  <div>
    <iDialog
      :title="dialogTitle"
      v-if="value"
      :visible.sync="value"
      width="85%"
      @close="closeDiolog"
    >
      <search
        @sure="getInforData"
        @reset="handleSearchReset"
        :searchForm="searchForm"
        :searchFormData="searchFormData"
        :options="options"
      />
      <el-divider class="margin-top20"></el-divider>
      <!-- <div class="contentBox"> -->
      <iTabsList
        v-model="tabsValue"
        @tab-click="tableChange"
        type="card"
        class="margin-top20 iTabsList"
      >
        <el-tab-pane
          :name="1"
          :label="language('BUCHADIANHUIZONG', '补差单汇总')"
        ></el-tab-pane>
        <el-tab-pane
          :name="2"
          :label="language('BUCHADANMINGXI', '补差单明细')"
        ></el-tab-pane>
      </iTabsList>

      <div class="tabsBoxInfor">
        <div
          :style="
            item.prop == 'actuallyTotalAmt' ? { fontWeight: 'bold' } : null
          "
          class="inforDiv"
          v-for="(item, index) in tabsInforList"
          :key="index"
        >
          <span>{{ item.name }}</span>

          <div class="inforText">
            <!-- 补差时间段 -->
            <template v-if="item.prop == 'startFrom'">
              {{ formatDate(inforData['startFrom']) }}
              ~
              {{ formatDate(inforData['endTo']) }}
            </template>
            <!-- 供应商 -->
            <template v-else-if="item.prop == 'supplierName'">
              {{ inforData['supplierSapCode'] }}
              -
              {{ inforData['supplierName'] }}
            </template>
            <!-- 应补总额 -->
            <template v-else-if="item.prop == 'invoiceAmount'">
              {{ formatterNumber(inforData['invoiceAmount']) }}
            </template>
            <!-- 实补总额 -->
            <template v-else-if="item.prop == 'approvedAmount'">
              {{ formatterNumber(inforData['approvedAmount']) }}
            </template>
            <template v-else>{{ inforData[item.prop] }}</template>
          </div>
        </div>
      </div>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入备注"
        v-model="inforData.remark"
        :disabled="disablied"
      ></el-input>

      <el-divider class="margin-top20"></el-divider>
      <div class="BtnTitle">
        <span>{{ tabsValue == 1 ? '汇总列表' : '明细列表' }}</span>
        <div>
          <iButton
            @click="supplierConfirm"
            v-if="tabsValue == 1 && inforData.status == 'SUPPLIER_CONFIRMING'"
            v-permission="
              PROTAL_MTZ_BUCHAGUANLI_BUCHALIEBIAO_DAIGONGYINGSHANGQUEREN
            "
            >{{ language('GONGYINGSHANGQUEREN', '代供应商确认') }}</iButton
          >
          <iButton
            @click="updateBalance"
            v-permission="PROTAL_MTZ_BUCHAGUANLI_BUCHALIEBIAO_DAOCHUBEIZHU"
            >{{ language('BAOCUNBEIZHU', '保存备注') }}</iButton
          >
          <iButton
            @click="balanceDetailPdfExport"
            v-permission="PROTAL_MTZ_BUCHAGUANLI_BUCHALIEBIAO_PINGZHENGDAOCHU"
            >{{ language('PINGZHENGDAOCHU', '凭证导出') }}</iButton
          >
          <iButton
            @click="exportSupplierBalance"
            v-permission="PROTAL_MTZ_BUCHAGUANLI_BUCHALIEBIAO_DAOCHU"
            >{{ language('DAOCHU', '导出') }}</iButton
          >
        </div>
      </div>
      <tabs1
        :tableListData="agreementSummaryList"
        v-if="tabsValue == 1"
        ref="tabs"
      ></tabs1>
      <tabs2
        :tableListData="detailTableData"
        v-if="tabsValue == 2"
        ref="tabs"
      ></tabs2>
      <!-- </div> -->
    </iDialog>
  </div>
</template>

<script>
import {
  iCard,
  iSearch,
  iSelect,
  iDatePicker,
  iMessage,
  iDialog,
  iButton,
  iTabs,
  iTabsList
} from 'rise'
import search from '@/views/mtz/annualGeneralBudget/locationChange/components/components/search.vue'
import { searchFormData, tabsInforList } from './data.js'
import {
  findBalanceById,
  supplierConfirm,
  exportSupplierBalanceSummary,
  exportSupplierBalanceSummaryDetail,
  updateBalance,
  getTaskSecondSupplierList,
  balanceDetailPdfExport,
  balanceDetailExport,
} from '@/api/mtz/annualGeneralBudget/chipReplenishment'
import tabs1 from './tabs1'
import tabs2 from './tabs2'
import {
  NewMessageBox,
  NewMessageBoxClose
} from '@/components/newMessageBox/dialogReset.js'

export default {
  components: {
    search,
    tabs1,
    tabs2,
    iCard,
    iSelect,
    iDatePicker,
    iDialog,
    iButton,
    iTabs,
    iTabsList,
    iSearch
  },
  props: ['detailObj'],
  data() {
    return {
      detail:{},
      inforData: {},
      typesJS: [
        {
          code: '1',
          message: '是'
        },
        {
          code: '0',
          message: '否'
        }
      ],
      tabsInforList,
      searchForm: {},
      searchFormData,
      options: {
        secondSupplierList: []
      },
      value: true,
      tabsValue: 1,
      balanceId: '',
      dialogTitle: '',
      detailTableData: [],
      agreementSummaryList: []
    }
  },
  watch: {
    'searchForm.dateTime': {
      handler(val) {
        if (Array.isArray(val) && val.length) {
          this.searchForm.makeStartDate = this.formatDate(
            this.searchForm.dateTime[0],
            'YYYY-MM-DD 00:00:00'
          )
          this.searchForm.makeEndDate = this.formatDate(
            this.searchForm.dateTime[1],
            'YYYY-MM-DD 23:59:59'
          )
        } else {
          this.searchForm.makeStartDate = ''
          this.searchForm.makeEndDate = ''
        }
      }
    }
  },
  computed:{
    disablied(){
      return !['草稿','待供应商确认','供应商确认','审批不通过','供应商拒绝','审批退回'].includes(this.inforData.statusName)
    }
  },
  created() {
    this.balanceId = this.detailObj?.id || ''
    this.dialogTitle = '补差单号-' + this.detailObj.balanceNo
    this.getTaskSecondSupplierList()
    this.getInforData()
  },
  methods: {
    formatDate(date, format = 'YYYY-MM-DD') {
      return window.moment(date).format(format)
    },
    // 获取明细
    getInforData() {
      this.BoxLoading = true
      findBalanceById({ balanceId: this.detailObj.id, ...this.searchForm })
        .then((res) => {
          if (res?.code == '200') {
            this.detail = res.data
            this.inforData = _.cloneDeep(res.data.balanceBase)
            this.detailTableData = res.data.balanceItemList || []
            this.agreementSummaryList = res.data.agreementSummaryList || []
          } else {
            this.inforData = {}
          }
        })
        .finally((red) => {
          this.BoxLoading = false
        })
    },
    formatterNumber(cellValue) {
      return VueUtil.formatNumber(cellValue)
    },
    tableChange(val) {
      if (val.name !== this.tabsValue) {
        this.tabsValue = val.name
      }
    },
    // 获取二次件供应商
    getTaskSecondSupplierList() {
      getTaskSecondSupplierList().then((res) => {
        this.options.secondSupplierList = res.data
      })
    },
    // 重置
    handleSearchReset() {
      this.searchForm = {}
      this.searchFormData.forEach(item=>{
        if(item.showAll) this.searchForm[item.props] = ''
      })
    },
    // 代供应商确认
    supplierConfirm() {
      var that = this
      NewMessageBox({
        title: this.language('LK_WENXINTISHI', '温馨提示'),
        Tips: this.language('SHIROUQUERENTIJIAO', '是否确认提交？'),
        cancelButtonText: this.language('QUXIAO', '取消'),
        confirmButtonText: this.language('QUEREN', '确认')
      })
        .then(() => {
          let data = [that.balanceId]
          // 代供应商确认:采购员只能同意,不能拒绝
          supplierConfirm({ approveFlag: true }, data).then((res) => {
            iMessage.success('提交确认成功！')
            that.closeDiolog()
            that.$emit('getmakeUpPageList')
          })
        })
        .catch((err) => {
          // console.log(err)
        })
    },
    // 保存备注
    updateBalance(){
      updateBalance({
            ...this.detail,
            balanceBase:this.inforData
          }).then(res=>{
        if(res?.code=='200'){
          this.getInforData()
        }
      })
    },
    // 导出凭证
    balanceDetailPdfExport() {
      NewMessageBox({
        title: this.language('LK_WENXINTISHI', '温馨提示'),
        Tips: this.language('SHIFOUDAOCHU', '是否导出？'),
        cancelButtonText: this.language('QUXIAO', '取消'),
        confirmButtonText: this.language('QUEREN', '确认')
      })
        .then(() => {
          balanceDetailPdfExport({
            balanceId: this.balanceId
          }).then((res) => {
            console.log(res);
            if (res.type === 'application/json') {
              iMessage.error(this.language('LK_ZANWUSHUJU', '暂无数据'))
            } else {
              let blob = new Blob([res], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
              })
              let objectUrl = URL.createObjectURL(blob)
              let link = document.createElement('a')
              link.href = objectUrl
              let fname = 'MTZ补差单汇总凭证' + this.detailObj.bizNo + '.pdf'
              link.setAttribute('download', fname)
              document.body.appendChild(link)
              link.click()
              link.parentNode.removeChild(link)
              iMessage.success('链接成功！')
            }
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    exportSupplierBalance() {
      NewMessageBox({
        title: this.language('LK_WENXINTISHI', '温馨提示'),
        Tips: this.language('SHIFOUDAOCHU', '是否导出？'),
        cancelButtonText: this.language('QUXIAO', '取消'),
        confirmButtonText: this.language('QUEREN', '确认')
      })
        .then(() => {
          let exportFun = this.tabsValue == 1 ? exportSupplierBalanceSummary : balanceDetailExport
          let params = this.tabsValue == 1 ? {
            ...this.detailObj,
            ...this.searchForm,
            isPrimary:this.detailObj.balanceType=='1',
            isOnlyMyself:true,
            makeEndDate:this.detailObj.endTo,
            makeStartDate:this.detailObj.startFrom,
            currentPage:this.$refs.tabs.page.currPage,
            pageSize:this.$refs.tabs.page.pageSize,
            balanceSapCode:this.detailObj.id,
            balanceId:this.balanceId,
            agreementNo:this.agreementSummaryList[0].agreementNo,
          } : {
            balanceId:this.balanceId,
          }
          exportFun(params).then((res) => {
            console.log(res)
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    closeDiolog() {
      this.$emit('dialogShowFun', '')
      this.$parent.$children.forEach((item) => {
        if (item.$options._componentTag === 'theTable') {
          item.getmakeUpPageList()
        }
      })
    }
  },
  destroyed() {
    NewMessageBoxClose();
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
.iTabsList {
  background-color: #ffffff;
}

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
</style>
