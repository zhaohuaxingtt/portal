<!--
 * @Author: your name
 * @Date: 2021-10-08 14:25:34
 * @LastEditTime: 2022-05-06 19:30:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\mtzReplenishmentOverview\components\search.vue
-->
<template>
  <div>
    <iDialog :visible.sync="dialogVisible"
             :title="
        flag
          ? language('CHUANGJIANBUCHADAN', '创建补差单')
          : language('BIANJIBUCHADAN', '编辑补差单')
      "
             @close="handleClose"
             top="2%"
             width="90%">
      <el-form :inline="true"
               :model="searchForm"
               label-position="top"
               class="searchForm">
        <el-row style="border-bottom: 1px solid #ccc">
          <el-col :span="24">
            <el-form-item v-if="!flag"
                          label="补差单号"
                          class="searchFormItem">
              <el-input :disabled="editDisabled"
                        v-model="searchForm.mtzDocId"
                        placeholder="MTZ-YYYY/MM/DD"></el-input>
            </el-form-item>
            <el-form-item label="一次件供应商"
                          class="searchFormItem">
              <el-input v-model="searchForm.firstSupplierName"
                        :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="补差时间段"
                          class="searchFormItem">
              <el-date-picker v-model="value"
                              :disabled="editDisabled"
                              @change="handleChange"
                              type="daterange"
                              style="width: 100%"
                              format="yyyyMM"
                              value-format="yyyyMM"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="二次件供应商"
                          class="searchFormItem">
              <el-input v-model="searchForm.secondSupplierList"
                        :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="材料中类"
                          class="searchFormItem">
              <el-input v-model="searchForm.materialKindList"
                        :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="原材料编号"
                          class="searchFormItem">
              <el-input v-model="searchForm.materialCode"
                        :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="SAP订单号"
                          class="searchFormItem">
              <el-input :disabled="editDisabled"
                        v-model="searchForm.sapOrderNo"></el-input>
            </el-form-item>
            <!-- <el-form-item label="凭证类型"
                          class="searchFormItem">
            </el-form-item> -->
            <el-form-item label="采购组"
                          class="searchFormItem">
              <el-input v-model="searchForm.ekGroupList"
                        :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="一次零件号"
                          class="searchFormItem">
              <el-input :disabled="editDisabled"
                        v-model="searchForm.fpartNo"></el-input>
            </el-form-item>
            <el-form-item label="二次零件号"
                          class="searchFormItem">
              <el-input :disabled="editDisabled"
                        v-model="searchForm.spartNo"></el-input>
            </el-form-item>

            <el-form-item label="是否取市场价均值"
                          class="searchFormItem">
              <el-input v-model="searchForm.isEffAvg"
                        :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="市场价偏移区间"
                          class="searchFormItem">
              <el-date-picker v-model="value1"
                              :disabled="editDisabled"
                              @change="handleChangeDate"
                              type="monthrange"
                              style="width: 100%"
                              format="yyyy-MM"
                              value-format="yyyy-MM"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="3">
            <div class="flex">
              <iButton v-if="flag"
                       class="margin-top45"
                       style="float:right"
                       @click="search">{{language('CHAXUN','查询')}}</iButton>
              <iButton v-if="flag"
                       class="margin-top45"
                       style="float:right"
                       @click="search">{{language('CHONGZHI','重置')}}</iButton>
            </div>
          </el-col> -->
        </el-row>
        <el-row style="border-bottom: 1px solid #ccc; width: 100%">
          <el-col :span="21"> </el-col>
          <el-col v-if="flag"
                  :span="3">
            <iButton class="margin-top45"
                     style="float: right"
                     @click="calcuLate">{{ language('JISUAN', '计算') }}</iButton>
          </el-col>
        </el-row>
      </el-form>
      <div class="table">
        <div class="header flex">
          <div class="flex"
               style="align-items: center">
            <div class="margin-right20">
              <label for=""
                     class="label margin-right10">{{
                language('DAIFAQIPINZHENG', '待发起凭证')
              }}</label>
              <!-- <el-input v-model="trueCompMoney"
                      style="margin-right:20px;width:200px"
                      :disabled="true"></el-input> -->
              <el-input-number v-model="waitCompDocMoney"
                               :precision="2"
                               :disabled="true"
                               :controls="false"></el-input-number>
            </div>
            <div>
              <label for="">{{
                language('SHIJIBUCHAJINE', '实际补差金额')
              }}</label>
              <el-tooltip class="item margin-right10"
                          effect="light"
                          content="可修改，但小于或等于待发起凭证总额；实际补差 金额修改后，变化量将平均打散到每条行项次"
                          placement="top">
                <i class="el-icon-warning-outline margin-left10"
                   style="color: blue"></i>
              </el-tooltip>
              <el-input v-model="trueCompMoney"
                        class="wait_input"
                        @change="waitChange"
                        @input="waitInput"
                        type="number"></el-input>
              <!-- <el-input v-model="waitCompDocMoney"
                        style="margin-left:20px;width:200px"></el-input> -->
            </div>
          </div>
          <div class="flex">
            <el-tooltip class="item margin-right10"
                        effect="light"
                        :content="
                language(
                  'CHEHUIHOUJIANGCONGBUCHASHENQINGZHONGQUXIAORENKEZAIBUCHAZONGLANZHONGCAOZUO',
                  '撤回后将从补差申请中取消，仍可在补差总览中操作'
                )
              "
                        placement="top">
              <iButton @click="recall">{{
                language('CHEHUI', '撤回')
              }}</iButton>
            </el-tooltip>
            <el-tooltip class="item margin-right10"
                        effect="light"
                        :content="
                language(
                  'CHONGXIAOHOUJIANGCONGBUCHASHENQINGZHONGQUXIAOBUNENGZHIJIEZAIBUCHAZONGLANZHONGCAOZUOXUSHOUGONGCHUANGJIANBUCHAXINXI',
                  '冲销后将从补差申请中取消，不能直接在补差总览中操作，需手工创建补差信息'
                )
              "
                        placement="top">
              <iButton @click="offset"
                       :loading="offsetLoading">{{
                language('CHONGXIAO', '冲销')
              }}</iButton>
            </el-tooltip>
            <iButton v-if="flag"
                     @click="submit"
                     :loading="subLoading">{{
              language('TIJIAO', '提交')
            }}</iButton>
            <iButton v-if="!flag"
                     @click="submit"
                     :loading="subLoading">{{
              language('BAOCUN', '保存')
            }}</iButton>
          </div>
        </div>
        <div>
          <i-table-custom :loading="tableLoading"
                          :data="tableData"
                          :columns="tableColumns"
                          min-height="328px"
                          ref="multipleTable"
                          @handle-selection-change="handleSelectionChange" />
          <!-- <iPagination v-update
                       @size-change="handleSizeChange($event, query)"
                       @current-change="handleCurrentChange($event, query)"
                       background
                       :current-page="page.currPage"
                       :page-sizes="page.pageSizes"
                       :page-size="page.pageSize"
                       :layout="page.layout"
                       :total="page.totalCount" /> -->
        </div>
      </div>
      <div slot="footer"></div>
    </iDialog>
  </div>
</template>

<script>
import { iCard, iButton, iMessage, iDialog, iSelectCustom } from 'rise'
// import comboBox from './comboBox'
import iTableCustom from '@/components/iTableCustom'
import { pageMixins } from '@/utils/pageMixins'
import { TABLE_COLUMS } from './data'
import {
  balanceCalcuLate,
  chargeAgainstMTZComp,
  fetchQueryComp,
  fetchSaveComp,
  getDataList,
  mtzEditRecall
} from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview'

export default {
  name: 'Search',
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    iDialog,
    iTableCustom,
    iSelectCustom
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    selectData: {
      type: Array,
      default: () => {
        return []
      }
    },
    flag: {
      type: Boolean
    }
  },
  watch: {
    selectData: {
      handler (val) {
        if (val && val.length !== 0) {
          this.dataAll = val
          this.getDataFunc(val)
        }
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      dataAll: [],
      searchForm: {
        mtzDocId: '',
        compTimeStart: '',
        compTimeEnd: '',
        ekGroupList: [],
        effPriceFrom: '',
        effPriceTo: '',
        fpartNo: '',
        firstSupplier: '',
        isEffAvg: '',
        materialCode: '',
        materialKindList: '',
        saType: '',
        sapOrderNo: '',
        spartNo: '',
        secondSupplierList: []
      },
      muiltSelectList: [],
      waitCompDocMoney: '',
      trueCompMoney: '',
      name: '默认空，“计算”后显示',
      tableLoading: false,
      subLoading: false,
      offsetLoading: false,
      tableColumns: TABLE_COLUMS,
      tableData: [],
      combobox: [],
      value1: [],
      value: [],
      // addmode
      addMode: 'add',
      // editmode
      editMode: 'edit',
      actAmtList: [],
      mgroup: '',
      searchFlag: false,
      dataListPush: [],
      selectDataList: [],
      mtzId: ''
    }
  },
  computed: {
    editDisabled () {
      return !this.flag ? true : false
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$nextTick(() => {
        this.query()
      })
    },
    getDataFunc (val) {
      const data = val[0]
      this.mtzId = data.id
      this.searchForm.mtzDocId = data.bizNo
      getDataList(data.id).then((res) => {
        this.searchForm.firstSupplierName =
          res.data.supplierSapNo + '-' + res.data.supplierName //一次件供应商
        this.searchForm.secondSupplierList = res.data.sSupplier //二次件供应商
        this.searchForm.materialKindList = res.data.mgroup //材料中类
        this.searchForm.sapOrderNo = res.data.purchaseNo //sap订单号
        this.searchForm.materialCode = res.data.material //原材料编号
        this.searchForm.ekGroupList = res.data.purchaseGroup //采购组
        this.searchForm.fpartNo = res.data.fPart //一次件零件号
        this.searchForm.spartNo = res.data.sPart //二次件零件号
        this.searchForm.isEffAvg = res.data.isEffAvg || '' //是否取市场均值
        if (res.data.offsetFrom && res.data.offsetTo)
          this.searchForm.value1 = [
            res.data.offsetFrom.substring(0, 4) +
            '-' +
            res.data.offsetFrom.substring(4, 6),
            res.data.offsetTo.substring(0, 4) +
            '-' +
            res.data.offsetTo.substring(4, 6)
          ] //市场价偏移区间
        // this.value = [res.data.monthFrom.substring(0, 4) + "-" + res.data.monthFrom.substring(4, 6) + "-00", res.data.monthTo.substring(0, 4) + "-" + res.data.monthTo.substring(4, 6) + "-00"]
        this.value = [res.data.monthFrom, res.data.monthTo]
        this.waitCompDocMoney = res.data.invoiceAmt
        this.trueCompMoney = res.data.approvedAmt
      })
    },
    handleClose () {
      this.$emit('close', false)
    },
    handleChange (val) {
      this.searchForm.compTimeStart = val[0]
      this.searchForm.compTimeEnd = val[1]
    },
    handleChangeDate (val) {
      this.searchForm.effPriceFrom = val[0]
      this.searchForm.effPriceTo = val[1]
    },
    query () {
      this.tableLoading = true
      this.actAmtList = []
      fetchQueryComp({
        mtzDocId: this.mtzId
      }).then((res) => {
        if (res.data) {
          this.dataListPush = res.data.map((item) => item.id)
          this.tableData = res.data
          this.tableData.forEach((item) => {
            this.actAmtList.push(item.actAmt)
          })
          // this.trueCompMoney = _.sum(this.actAmtList.map(parseFloat))
          // this.waitCompDocMoney = this.trueCompMoney
          this.tableLoading = false
        }
      })
    },
    handleSelectionChange (val) {
      // console.log(val);
      this.muiltSelectList = val
    },
    recall () {
      // console.log(this.muiltSelectList.length)
      if (this.muiltSelectList.length < 1) {
        return iMessage.error(this.language('QINGXUANESHUJU', '请选择数据'))
      }
      // this.actAmtList = []
      // this.muiltSelectList.forEach((val) => {
      //   this.tableData.forEach((v, i) => {
      //     if (val.id === v.id) {
      //       this.waitCompDocMoney = (Number(this.waitCompDocMoney) - Number(v.actAmt)).toFixed(2);
      //       this.trueCompMoney = (Number(this.trueCompMoney) - Number(v.appAmt)).toFixed(2)
      //       this.tableData.splice(i, 1)
      //       this.selectDataList.push(val)
      //     }
      //   })
      // })
      // this.tableData.forEach(item => {
      //   this.actAmtList.push(item.actAmt)
      // })
      // // this.trueCompMoney = _.sum(this.actAmtList.map(parseFloat))
      // // this.waitCompDocMoney = this.trueCompMoney
      // this.$refs.multipleTable.clearSelection();
      // iMessage.success("撤回成功！")

      let params = []
      this.muiltSelectList.forEach((item) => {
        params.push(item.id)
      })
      mtzEditRecall(params).then((res) => {
        if (res.code === '200') {
          iMessage.success(res.desZh)
          this.getDataFunc(this.dataAll)
          this.query()
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    offset () {
      if (this.muiltSelectList.length === 0) {
        iMessage.error(this.language('QINGXUANESHUJU', '请选择数据'))
        return
      }
      this.offsetLoading = true
      let params = []
      this.muiltSelectList.forEach((item) => {
        params.push(item.id)
      })
      chargeAgainstMTZComp(params).then((res) => {
        if (res.code === '200') {
          iMessage.success(res.desZh)
          this.getDataFunc(this.dataAll)
          this.query()
          this.offsetLoading = false
        } else {
          iMessage.error(res.desZh)
          this.offsetLoading = false
        }
      })
    },
    submit () {
      let withdrawIds = this.dataListPush.filter((item) => {
        return !this.selectDataList.map((item) => item.id).includes(item)
      })

      fetchSaveComp({
        mtzDocId: this.mtzId,
        itemIds: withdrawIds,
        withdrawIds: this.selectDataList.map((item) => item.id),
        waitCompMoney: Number(this.waitCompDocMoney),
        trueCompMoney: this.trueCompMoney
      })
        .then((res) => {
          if (res && res.code == 200) {
            iMessage.success(res.desZh)
            this.subLoading = false
          } else iMessage.error(res.desZh)
        })
        .then((red) => {
          this.getDataFunc(this.dataAll)
          this.query()
        })
    },
    search () {
      this.searchFlag = true
      this.query()
    },
    reset () {
      this.searchFlag = true
      this.searchForm = {}
      this.query()
    },
    calcuLate () {
      let params = {}
      balanceCalcuLate().then((res) => { })
    },
    waitChange (val) {
      if (Math.abs(Number(val)) > Math.abs(Number(this.waitCompDocMoney))) {
        // iMessage.error(language("","实际补差金额需小于待发起凭证金额"))
        iMessage.error('实际补差金额绝对值需小于待发起凭证金额绝对值')
        this.trueCompMoney = this.waitCompDocMoney
      } else {
        this.trueCompMoney = val
      }
    },
    waitInput (val) { }
  }
}
</script>

<style lang="scss" scoped>
.searchForm {
  display: flex;
  flex-wrap: wrap;
  .searchFormItem {
    width: 240px;
    margin-right: 40px;
  }
}
.table {
  margin-top: 20px;
  .header {
    justify-content: space-between;
    margin-bottom: 20px;
    label {
      width: 90px;
    }
  }
}

.dropDown {
  height: 200px;
}

::v-deep .el-form-item__content {
  line-height: 20px;
}
::v-deep .el-date-editor .el-range__close-icon {
  width: 10px;
}
::v-deep .el-date-editor .el-range-separator {
  width: 10%;
  line-height: 26px;
}
::v-deep .el-select {
  width: 100%;
}
.wait_input {
  width: 160px;
  ::v-deep .el-input__inner {
    text-align: center;
  }
}
</style>
