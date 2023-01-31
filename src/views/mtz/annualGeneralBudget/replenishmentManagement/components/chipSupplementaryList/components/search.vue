<!--
 * @Author: tanmou
 * @Date: 2021-08-27 16:29:54
 * @LastEditTime: 2023-01-31 12:18:57
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
        @sure="handleSubmitSearch"
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
      ></el-input>

      <el-divider class="margin-top20"></el-divider>
      <div class="BtnTitle">
        <span>{{ tabsValue == 1 ? '汇总列表' : '明细列表' }}</span>
        <div>
          <!-- v-if="detailObj.status == '供应商确认中'" -->
          <iButton
            @click="supplierConfirm"
            v-if="tabsValue == 1"
            v-permission="
              PROTAL_MTZ_BUCHAGUANLI_BUCHALIEBIAO_DAIGONGYINGSHANGQUEREN
            "
            >{{ language('GONGYINGSHANGQUEREN', '代供应商确认') }}</iButton
          >
          <iButton
            @click="save"
            v-permission="PROTAL_MTZ_BUCHAGUANLI_BUCHALIEBIAO_DAOCHUBEIZHU"
            >{{ language('BAOCUNBEIZHU', '保存备注') }}</iButton
          >
          <iButton
            @click="uploadPZ"
            v-permission="PROTAL_MTZ_BUCHAGUANLI_BUCHALIEBIAO_PINGZHENGDAOCHU"
            >{{ language('PINGZHENGDAOCHU', '凭证导出') }}</iButton
          >
          <iButton
            @click="upload"
            v-permission="PROTAL_MTZ_BUCHAGUANLI_BUCHALIEBIAO_DAOCHU"
            >{{ language('DAOCHU', '导出') }}</iButton
          >
        </div>
      </div>
      <tabs1
        :searchFormList="seachWather"
        :dataObject="detailObj"
        :tableListData="detailTableData"
        v-if="tabsValue == 1"
        @componentHidden="btnHidden1"
      ></tabs1>
      <tabs2
        :searchFormList="seachWather"
        :dataObject="detailObj"
        :tableListData="detailTableData"
        v-show="tabsValue == 2"
        @componentHidden="btnHidden2"
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
import { getMtzSupplierList } from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview'
import search from '@/views/mtz/annualGeneralBudget/locationChange/components/components/search.vue'
import { searchFormData, tabsInforList } from './data.js'
import {
  compdocMetalDetailSum,
  compdocMetalDetailSumItem,
  saveRemark,
  mtzCompDetailOverviewExport,
  mtzBalanceDetailsExport,
  supplierConfirmation
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/supplementary/details'
import {
  findBalanceById,
  supplierConfirm
} from '@/api/mtz/annualGeneralBudget/chipReplenishment'
import tabs1 from './tabs1'
import tabs2 from './tabs2'
import { NewMessageBox, NewMessageBoxClose } from '@/components/newMessageBox/dialogReset.js'

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
      btnShow1: true,
      btnShow2: true,
      seachWather: {},
      searchForm: {},
      searchFormData,
      options: {
        secondSupplierList: []
      },
      value: true,
      tabsValue: 1,
      balanceId: '',
      dialogTitle: '',
      detailTableData: []
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
  created() {
    this.balanceId = this.detailObj?.id || ''
    this.dialogTitle = '补差单号-' + this.detailObj.balanceNo
    this.getDemandData()
    this.getInforData()
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.$el.querySelector('.el-icon-arrow-up').click()
    // })
  },
  methods: {
    formatDate(date, format = 'YYYY-MM-DD') {
      return window.moment(date).format(format)
    },
    // 获取明细
    getInforData() {
      this.BoxLoading = true
      findBalanceById({ balanceId: this.detailObj.id })
        .then((res) => {
          if (res?.code == '200') {
            this.inforData = _.cloneDeep(res.data.balanceBase)
            this.detailTableData = res.data.balanceItemList || []
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
    // 获取用量版本
    getDemandData() {
      getMtzSupplierList({ balanceId: this.balanceId }).then((res) => {
        this.options.secondSupplierList = res.data
      })
    },
    // 重置
    handleSearchReset(form) {
      this.searchForm = {}
      this.searchForm = {}
      this.seachWather = {}
    },
    // 确定
    handleSubmitSearch() {
      let searchFictitious = _.cloneDeep(this.searchForm)
      if (this.searchForm.dateTime) {
        var tt = Object.keys(searchFictitious)
        for (var i = 0; i < tt.length; i++) {
          if (searchFictitious[tt[i]] == '') {
            delete searchFictitious[tt[i]]
          }
        }
        delete searchFictitious.dateTime
        this.seachWather = {
          ...searchFictitious,
          mtzDocMonthBegin: this.searchForm.dateTime[0],
          mtzDocMonthEnd: this.searchForm.dateTime[1]
        }
      } else {
        var tt = Object.keys(searchFictitious)
        for (var i = 0; i < tt.length; i++) {
          if (searchFictitious[tt[i]] == '') {
            delete searchFictitious[tt[i]]
          }
        }
        this.seachWather = {
          ...searchFictitious
        }
      }
    },
    btnHidden1(val) {
      this.btnShow1 = val
    },
    btnHidden2(val) {
      this.btnShow2 = val
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
          supplierConfirm({ approveFlag:true }, data).then((res) => {
            iMessage.success('提交确认成功！')
            that.$emit('closeDiolog1', '')
          })
        })
        .catch((err) => {
          // console.log(err)
        })
    },
    // 导出凭证
    uploadPZ() {
      NewMessageBox({
        title: this.language('LK_WENXINTISHI', '温馨提示'),
        Tips: this.language('SHIFOUDAOCHU', '是否导出？'),
        cancelButtonText: this.language('QUXIAO', '取消'),
        confirmButtonText: this.language('QUEREN', '确认')
      })
        .then(() => {
          mtzBalanceDetailsExport({
            balanceId: this.balanceId
          }).then((res) => {
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
    upload() {
      NewMessageBox({
        title: this.language('LK_WENXINTISHI', '温馨提示'),
        Tips: this.language('SHIFOUDAOCHU', '是否导出？'),
        cancelButtonText: this.language('QUXIAO', '取消'),
        confirmButtonText: this.language('QUEREN', '确认')
      })
        .then(() => {
          mtzCompDetailOverviewExport({
            ...this.serchList,
            balanceId: this.balanceId
          }).then((res) => {
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
  destroyed () {
    // NewMessageBoxClose();
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
::v-deep .cardBody {
  margin: 0 !important;
  padding: 0 !important;
}
::v-deep .card {
  box-shadow: 0 0 0px rgb(27 29 33 / 0%);
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
