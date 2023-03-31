<!--
 * @Author: your name
 * @Date: 2021-10-08 14:25:34
 * @LastEditTime: 2022-12-06 14:59:24
 * @LastEditors: 余继鹏 917955345@qq.com
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
             v-loading="onLoding"
             top="2%"
             width="90%">
      <!-- <iSearch>
      </iSearch> -->
      <el-form :inline="true"
               ref="formList"
               :rules="rules"
               :model="searchForm"
               label-position="top"
               class="searchForm">
        <el-row style="border-bottom: 1px solid #ccc">
          <el-col :span="21">
            <el-form-item label="一次件供应商"
                          class="searchFormItem">
              <iInput v-model="searchForm.firstSupplierName"
                      :disabled="true"></iInput>
            </el-form-item>
            <el-form-item label="补差时间段"
                          prop="value"
                          class="searchFormItem">
              <iDatePicker v-model="searchForm.value"
                           :disabled="editDisabled"
                           @change="handleChange"
                           type="monthrange"
                           style="width: 100%"
                           format="yyyy-MM"
                           value-format="yyyy-MM-dd"
                           range-separator="至"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期">
              </iDatePicker>
            </el-form-item>
            <el-form-item label="二次件供应商"
                          class="searchFormItem">
              <iSelect filterable clearable multiple v-model="searchForm.secondSupplierList" :placeholder="language('QINGXUANZESHURU', '请选择/输入')">
                  <el-option
                      v-for="(item,index) in ssupplierList"
                      :key="index"
                      :label="item.codeMessage"
                      :value="item.code">
                  </el-option>
              </iSelect>
              <!-- <custom-select v-model="searchForm.secondSupplierList"
                             :user-options="ssupplierList"
                             multiple
                             clearable
                             :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                             display-member="codeMessage"
                             value-member="code"
                             value-key="code">
              </custom-select> -->
            </el-form-item>
            <el-form-item label="材料中类"
                          class="searchFormItem"
                          prop="materialKindList">
              <iSelect filterable clearable multiple v-model="searchForm.materialKindList" :placeholder="language('QINGXUANZESHURU', '请选择/输入')">
                  <el-option
                      v-for="(item,index) in Mgroups"
                      :key="index"
                      :label="item.message"
                      :value="item.code">
                  </el-option>
              </iSelect>
              <!-- <custom-select v-model="searchForm.materialKindList"
                             :user-options="Mgroups"
                             multiple
                             clearable
                             :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                             display-member="message"
                             value-member="code"
                             value-key="code">
              </custom-select> -->
            </el-form-item>
            <el-form-item label="SAP订单号"
                          class="searchFormItem">
              <comboBox v-model="searchForm.sapOrderNo"
                        :editPlaceholder="language('QINGSHURU', '请输入')"
                        :placeholder="language('QINGSHURU', '请输入')">
              </comboBox>
            </el-form-item>
            <el-form-item label="原材料编号"
                          prop="materialCode"
                          class="searchFormItem">
              <iSelect filterable clearable multiple v-model="searchForm.materialCode" :placeholder="language('QINGXUANZESHURU', '请选择/输入')" @change="handleMaterialCode">
                  <el-option
                      v-for="(item,index) in RawMaterialNos"
                      :key="index"
                      :label="item.codeMessage"
                      :value="item.code">
                  </el-option>
              </iSelect>
              <!-- <custom-select v-model="searchForm.materialCode"
                             :user-options="RawMaterialNos"
                             multiple
                             clearable
                             @change="handleMaterialCode"
                             :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                             display-member="codeMessage"
                             value-member="code"
                             value-key="code">
              </custom-select> -->
            </el-form-item>

            <el-form-item label="采购组"
                          class="searchFormItem">
              <iSelect filterable clearable multiple v-model="searchForm.ekGroupList" :placeholder="language('QINGXUANZESHURU', '请选择/输入')" @change="handleMaterialCode">
                  <el-option
                      v-for="(item,index) in UserSubPurchaseGroup"
                      :key="index"
                      :label="item.message"
                      :value="item.code">
                  </el-option>
              </iSelect>
              <!-- <custom-select v-model="searchForm.ekGroupList"
                             :user-options="UserSubPurchaseGroup"
                             multiple
                             clearable
                             @change="handleMaterialCode"
                             :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                             display-member="message"
                             value-member="code"
                             value-key="code">
              </custom-select> -->
            </el-form-item>
            <el-form-item label="一次零件号"
                          prop="fpartNo"
                          class="searchFormItem">
              <comboBox v-model="searchForm.fpartNo"
                        :editPlaceholder="language('QINGSHURU', '请输入')"
                        :placeholder="language('QINGSHURU', '请输入')">
              </comboBox>
            </el-form-item>
            <el-form-item label="二次零件号"
                          class="searchFormItem">
              <comboBox v-model="searchForm.spartNo"
                        :editPlaceholder="language('QINGSHURU', '请输入')"
                        :placeholder="language('QINGSHURU', '请输入')">
              </comboBox>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <div class="flex">
              <!-- v-loading="tableLoading" -->
              <iButton v-if="flag"
                      
                       class="margin-top45"
                       style="float: right"
                       @click="search">{{ language('CHAXUN', '查询') }}</iButton>
              <iButton v-if="flag"
                       class="margin-top45"
                       style="float: right"
                       @click="reset">{{ language('CHONGZHI', '重置') }}</iButton>
            </div>
          </el-col>
        </el-row>
        <!-- <el-row style="border-bottom: 1px solid #ccc; width: 100%">
          <el-col :span="21">
            <el-form-item label="市场价偏移区间"
                          class="searchFormItem">
              <iDatePicker v-model="value1"
                           :disabled="editDisabled"
                           @change="handleChangeDate"
                           @focus="handleFocus"
                           :picker-options="pickerOptions"
                           type="monthrange"
                           style="width: 100%"
                           format="yyyy-MM"
                           value-format="yyyy-MM-dd"
                           range-separator="至"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期">
              </iDatePicker>
            </el-form-item>
            <el-form-item label="是否取市场价均值"
                          class="searchFormItem">
              <iSelect v-model="searchForm.isEffAvg"
                       :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                       @change="handleMaterialCode"
                       class="operate-select">
                <el-option :value="item.value"
                           :label="item.label"
                           v-for="(item, index) in isEffAvgList"
                           :key="index"></el-option>
              </iSelect>
            </el-form-item>
          </el-col>
          <el-col v-if="flag"
                  :span="3">
            <iButton class="margin-top45"
                     style="float: right"
                     @click="calcuLate">{{ language('JISUAN', '计算') }}</iButton>
          </el-col>
        </el-row> -->
      </el-form>
      <div class="table">
        <div class="header ">
          <div class="flex headerForm" 
               style="align-items: center">
            <div class="margin-right20">
              <label for=""
                     class="label margin-right10">{{
                $t('补差金额(结算数量计算结果)')
              }}</label>
              <el-input-number v-model="priceList.total"
                               :precision="2"
                               :disabled="true"
                               :controls="false"></el-input-number>
            </div>
            <div class="margin-right20">
              <label for=""
                     class="label margin-right10">{{
                $t('已发起凭证')
              }}</label>
              <el-input-number v-model="priceList.initiatedSum"
                               :precision="2"
                               :disabled="true"
                               :controls="false"></el-input-number>
            </div>
            <div class="margin-right20">
              <label for=""
                     class="label margin-right10">{{
                language('DAIFAQIPINZHENG', '待发起凭证')
              }}</label>
              <el-input-number v-model="priceList.noInitiatedSum"
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
              <el-input-number v-model="trueCompMoney"
                               :precision="2"
                               @change="changeNum"
                               :controls="false"></el-input-number>
            </div>
          </div>
          <iButton @click="calcuLate">{{ language('JISUAN', '计算') }}</iButton>
        </div>
        <div>
          <div class="headerBtn">
            <iTabsList  @tab-click="changeNav" v-model="activeName" type="card" slot="components" class="margin-top20">
              <el-tab-pane :label="$t('待发起凭证')" name="wait"> </el-tab-pane>
              <el-tab-pane :label="$t('已发起凭证')" name="history"> </el-tab-pane>
           </iTabsList>
            <div >
              <iButton @click="exportFiles"
                        >{{
                  language('LK_DAOCHU', '导出')
                }}</iButton>
              <el-tooltip class="item margin-right10"
                          effect="light"
                          :content="
                  language(
                    'CHEHUIHOUJIANGCONGBUCHASHENQINGZHONGQUXIAORENKEZAIBUCHAZONGLANZHONGCAOZUO',
                    '撤回后将从补差申请中取消，仍可在补差总览中操作'
                  )
                "
                          placement="top">
                <iButton v-if="activeName=='wait'" @click="recall">{{
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
                <iButton v-if="activeName=='wait'" @click="offset"
                        :loading="offsetLoading">{{
                  language('CHONGXIAO', '冲销')
                }}</iButton>
              </el-tooltip>
              <iButton v-if="flag&&activeName=='wait'"
                      @click="submit"
                      :loading="subLoading">{{
                language('TIJIAO', '提交')
              }}</iButton>
              <iButton v-if="!flag&&activeName=='wait'"
                      @click="submit"
                      :loading="subLoading">{{
                language('BAOCUN', '保存')
              }}</iButton>
            </div>
          </div>
          <i-table-custom :loading="tableLoading"
                          :data="tableData"
                          :columns="tableColumns"
                          min-height="328px"
                          height="400px"
                          ref="iTable"
                          @handle-selection-change="handleSelectionChange" />
          <iPagination v-update
                       @size-change="handleSizeChange($event, query)"
                       @current-change="handleCurrentChange($event, query)"
                       background
                       :current-page="page.currPage"
                       :page-sizes="page.pageSizes"
                       :page-size="page.pageSize"
                       :layout="page.layout"
                       :total="page.totalCount" />
        </div>
      </div>
      <div slot="footer"></div>
    </iDialog>
  </div>
</template>

<script>
import {
  iPagination,
  iCard,
  iButton,
  iMessage,
  iMessageBox,
  iDialog,
  iSelectCustom,
  iInput,
  iDatePicker,
  iSelect,
  iTabsList
} from 'rise'
import comboBox from './comboBox'
import iTableCustom from '@/components/iTableCustom'
import { pageMixins } from '@/utils/pageMixins'
import { TABLE_COLUMS } from './data'

import { NewMessageBox, NewMessageBoxClose } from '@/components/newMessageBox/dialogReset.js'

import {
  getMtzSupplierList,
  balanceCalcuLate,
  sumAmount,
  compdocIExport
} from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview'
import {
  pageMTZCompByComputer,
  getMtzGroups,
  getRawMaterialNos,
  getUserSubPurchaseGroup,
  chargeAgainstMTZComp,
  submitMTZComp,
  fetchQueryComp,
  fetchSaveComp,
  voucherInitiatedPageList
} from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview'

import {
    changeAll,
} from '@/api/mtz/mtzCalculationTask'
export default {
  name: 'Search',
  mixins: [pageMixins],
  components: {
    iPagination,
    iTabsList,
    iCard,
    iButton,
    iDialog,
    iTableCustom,
    iSelectCustom,
    iInput,
    comboBox,
    iDatePicker,
    iSelect
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
    dateSearch: {
      type: String,
      default: ''
    },
    flag: {
      type: Boolean
    },
    materialCodes: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    // materialCodes: {
    //   handler (val) {
    //     this.$nextTick(() => {
    //       this.$set(this.searchForm, "secondSupplierList", val)
    //     });
    //   },
    //   deep: true,
    //   immediate: true
    // },
    minDate (val) {
      this.pickerOptions = {
        onPick: ({ minDate }) => {
          this.minDate = minDate

        },
        disabledDate: (time) => {
          var newTime = new Date(val.getTime() + this.differenceTime)
          if (
            val.getMonth() == time.getMonth() &&
            val.getFullYear() == time.getFullYear()
          ) {
            return false
          }
          if (
            time.getMonth() == newTime.getMonth() &&
            time.getFullYear() == newTime.getFullYear()
          ) {
            return false
          }
          return true
        }
      }
    },
    tableData: {
      handler (data) {
        if (data) {
          this.tableLoading = false
          // this.tableListData = data
          this.tableDataList = data.slice(0, 1000)
        } else {
          this.tableLoading = true
          setTimeout(() => {
            this.tableLoading = false
          }, 10000)
        }
      },
      deep: true
    }
  },
  data () {
    return {
      delList:[],
      priceList:{},
      tableDataList2:[],
      activeName:'wait',
      searchForm: {
        firstSupplierName: '',
        mtzDocId: '',
        compTimeStart: '',
        compTimeEnd: '',
        ekGroupList: [],
        effPriceFrom: '',
        effPriceTo: '',
        fpartNo: [],
        firstSupplier: '',
        isEffAvg: false,
        materialCode: [],
        materialKindList: [],
        sapOrderNo: [],
        spartNo: [],
        value: '',
        secondSupplierList: []
      },
      muiltSelectList: [],
      ssupplierList: [],
      UserSubPurchaseGroup: [],
      Mgroups: [],
      isEffAvgList: [
        { label: '是', value: true },
        { label: '否', value: false }
      ],
      RawMaterialNos: [],
      waitCompDocMoney: 0,
      trueCompMoney: 0,
      name: '默认空，“计算”后显示',
      tableLoading: false,
      subLoading: false,
      tableColumns: TABLE_COLUMS,
      tableData: [],
      combobox: [],
      value1: [],
      value: [],
      actAmtList: [],
      mgroup: [],
      searchFlag: false,
      minDate: '',
      firstSupplierName: '',
      onLoding: false,
      offsetLoading: false,
      firstSupplier: '',
      tableDataList: [],
      times: 0,
      rules: {
        value: [
          {
            required: true,
            message: this.language(
              'QINGXUANZEBUCHASHIJIANDUAN',
              '请选择不差时间段'
            ),
            trigger: 'blur'
          }
        ],
        materialKindList: [
          {
            type: 'array',
            required: true,
            message: this.language(
              'QINGSHURUYICILINGJIANHAO',
              '请选择材料中类'
            ),
            trigger: 'blur'
          }
        ]
      },
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.minDate = minDate
        }
      }
    }
  },
  computed: {
    editDisabled () {
      return !this.flag ? true : false
    },
    differenceTime () {
      let startTME = this.searchForm.compTimeStart
      let endTME = this.searchForm.compTimeEnd
      startTME = window.moment(startTME).format('yyyy-MM-DD')
      endTME = window.moment(endTME).format('yyyy-MM-DD')
      let stratTime = new Date(startTME.replace(/-/g, '/'))
      let endTime = new Date(endTME.replace(/-/g, '/'))
      let diffTime = endTime.getTime() - stratTime.getTime()
      return diffTime
    }
  },
  created () {
    this.page.pageSizes = [10, 50, 100, 300, 500, 1000]
    if (this.selectData && this.selectData.length !== 0) {
      if(this.selectData[0].echoShow){
        let obj = JSON.parse(this.selectData[0].params)
        console.log(obj);
        this.searchForm.compTimeEnd = obj.balanceEndDate;
        this.searchForm.compTimeStart = obj.balanceStartDate;
        this.searchForm.effPriceTo = obj.effPriceEndDate;
        this.searchForm.effPriceFrom = obj.effPriceStartDate;
        this.searchForm.secondSupplierList = obj.sSupplierCodeList;
        this.$set(this.searchForm,"materialKindList",obj.materialKindList)
        this.searchForm.sapOrderNo = obj.sapOrderNoList;
        this.searchForm.materialCode = obj.materialCodeList;
        this.searchForm.ekGroupList = obj.purchaseGroupList;
        this.searchForm.fpartNo = obj.fPartNoList;
        this.searchForm.spartNo = obj.sPartNoList;
        this.searchForm.isEffAvg = obj.isEffAvg

        if(obj.effPriceStartDate && obj.effPriceEndDate){
          this.value1 = [obj.effPriceStartDate,obj.effPriceEndDate];
        }else{
          this.value1 = [];
        }
      }
      this.firstSupplierName = this.selectData[0].firstSupplierName
      this.firstSupplier = this.selectData[0].firstSupplierId
      this.searchForm.firstSupplier = this.selectData[0].firstSupplierId
      this.searchForm.firstSupplierName = this.selectData[0].firstSupplierName
      if (!this.flag) {
        const data = this.selectData[0]
        this.searchForm.mtzDocId = data.id
      }
      console.log(this.searchForm)
    }
    this.searchForm.value = this.dateSearch
    if (this.searchForm.value !== '') {
      this.searchForm.compTimeStart = window
        .moment(this.searchForm.value[0])
        .format('yyyy-MM-DD')
      this.searchForm.compTimeEnd = window
        .moment(this.searchForm.value[1])
        .format('yyyy-MM-DD')
    }
    console.log("000")

    // return;
    this.init()

  },
  mounted () {
    this.$nextTick(() => {
      let dom = this.$refs.iTable.$refs.theCustomTable.bodyWrapper
      dom.addEventListener('scroll', (res) => {
        // const scrollDistance = dom.scrollHeight - dom.scrollTop - dom.clientHeight;
        // if (this.tableData.length > 10) {
        //   // this.tableData = []
        //   // this.tableData = this.tableListData.slice(0, 10)
        //   if (scrollDistance <= 0) {//等于0证明已经到底，可以请求接口
        //     // setTimeout(function () {
        //     //   for (let i = 11; i < this.tableListData.length; i++) {
        //     //     this.tableData.push(this.tableListData[i])
        //     //   }
        //     // })
        //   }
        // } else {
        //   this.tableData = this.tableListData
        // }

        const height = res.target
        const clientHeight = height.clientHeight // 表格视窗高度 即wraper
        const scrollTop = height.scrollTop // 表格内容已滚动的高度
        const scrollHeight = height.scrollHeight // 表格内容撑起的高度

        if (clientHeight + scrollTop + 10 >= scrollHeight) {
          // 表格滚动已经触底 更新表格数据
          this.times++
          const length =
            500 * this.times > this.tableData.length
              ? this.tableData.length
              : 500 * this.times

          this.tableDataList = this.tableData.slice(0, length)

        }
      })
    })

  },
  methods: {
    changeNav(){
        this.query()
    },
    getAllPrice(){
      const req={
        initiated:this.activeName=='wait'?0:1,
        recallIdList:this.delList,
        ...this.searchForm
      }
      sumAmount(req).then(res=>{
        if (res.code === '200') {
          this.priceList = res.data
          this.trueCompMoney=res.data.realitySum
          this.waitCompDocMoney=res.data.noInitiatedSum
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    async init () {
      await this.getMgroups()

      await this.getRawMaterialNos()

      await this.getUserSubPurchaseGroup()
  
      this.$nextTick(() => {
        this.query()
      })
      getMtzSupplierList({}).then((res) => {
        if (res.code === '200') {
          this.ssupplierList = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },

    handleMaterial (val) {
      this.Mgroups.forEach((item) => {
        val.forEach((i) => {
          if (item.code === i) {
            this.mgroup.push(item.message)
          }
        })
      })
    },
    getMgroups (key) {
      getMtzGroups({
        keyWords: key || ''
      }).then((res) => {
        if (res.code === '200') {
          this.Mgroups = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    getRawMaterialNos (key) {
      getRawMaterialNos({
        keyWords: key || ''
      }).then((res) => {
        if (res.code === '200') {
          this.RawMaterialNos = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    getUserSubPurchaseGroup (key) {
      getUserSubPurchaseGroup({
        keyWords: key || ''
      }).then((res) => {
        if (res.code === '200') {
          this.UserSubPurchaseGroup = res.data.filter((item) => item)
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    handleClose () {
      this.$emit('close', false)
    },
    handleChange (val) {
      console.log(val)
      this.searchForm.compTimeStart = val[0]
      // 结束时间选择当月最后一天
      this.searchForm.compTimeEnd = window.moment(val[1]).endOf('month').format('YYYY-MM-DD')
    },
    handleChangeDate (val) {
      console.log(val)
      this.searchForm.effPriceFrom = val[0]
      this.searchForm.effPriceTo = val[1]
    },
    handleFocus () {
      this.pickerOptions.disabledDate = () => false
    },
    query () {
      if (this.flag) {
        this.actAmtList = []
        if (this.searchFlag) {
          // delete this.searchForm.isEffAvg
          delete this.searchForm.effPriceFrom
          delete this.searchForm.effPriceTo
        }

        let params = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          recallIdList:this.delList,
          ...this.searchForm
        }
        if(!this.searchForm.compTimeEnd||!this.searchForm.compTimeStart){
         iMessage.warn('请选择补差时间段和材料中类')
         return false
        }
        console.log(!this.searchForm.materialKindList)
        if(this.searchForm?.materialKindList.length==0){
          iMessage.warn('请选择补差时间段和材料中类')
          return false
        }
        console.log(this.searchForm)
        this.tableLoading = true

        console.log(params, "searchForm")
        if(this.activeName=='wait'){
          pageMTZCompByComputer(params).then((res) => {
          if (res?.code === '200') {
            this.tableData = res.data
            this.tableData.forEach((item) => {
              this.actAmtList.push(item.actAmt)
            })
            this.getAllPrice()
            this.page.totalCount = res.total
            // this.waitCompDocMoney = _.sum(this.actAmtList.map(parseFloat))
            // this.trueCompMoney = this.waitCompDocMoney
            this.tableLoading = false
            this.searchFlag = false
          }
        })
        }else{
          voucherInitiatedPageList(params).then(res=>{
            if(res.code==200){
              this.tableData = res.data
              this.tableData.forEach((item) => {
                this.actAmtList.push(item.actAmt)
              })
              this.getAllPrice()
              this.page.totalCount = res.total

              // this.waitCompDocMoney = _.sum(this.actAmtList.map(parseFloat))
              // this.trueCompMoney = this.waitCompDocMoney
              this.tableLoading = false
              this.searchFlag = false
            }else iMessage.error(res.desZh)
          })
        }
  
      } else {
        this.tableLoading = true
        this.actAmtList = []
        let params = {
          pageNo: 1,
          pageSize: 100000,
          ...this.searchForm
        }
        fetchQueryComp(params).then((res) => {
          if (res?.code === '200') {
            this.tableData = res.data
            this.tableData.forEach((item) => {
              this.actAmtList.push(item.actAmt)
            })
            this.getAllPrice()
            // this.waitCompDocMoney = _.sum(this.actAmtList.map(parseFloat))
            // this.trueCompMoney = this.waitCompDocMoney
            this.tableLoading = false
          }
        })
      }
    },
    handleSelectionChange (val) {
      this.muiltSelectList = val
      this.tableData.filter((item) => { })
    },
    recall () {
      if (this.muiltSelectList.length === 0) {
        iMessage.error(this.language('QINGXUANESHUJU', '请选择数据'))
        return false
      }
      // this.actAmtList = []
      // let delList=[]
      this.muiltSelectList.forEach((val) => {
        this.priceList.noInitiatedIdList.forEach((v, i) => {
          if (val.id === v) {
            // this.tableData.splice(i, 1)
            this.delList.push(val.id)
          }
        })
      })
      console.log(this.delList)
      // this.tableData.forEach((item) => {
      //   this.actAmtList.push(item.actAmt)
      // })

      this.$nextTick(() => {
        this.query()

        // this.waitCompDocMoney = _.sum(this.actAmtList.map(parseFloat))
        // this.trueCompMoney = this.waitCompDocMoney
      })

      // this.$refs.iTable.clearSelection()
    },
    offset () {
      if(this.tableData.length > 0){
        if (this.muiltSelectList.length === 0) {
          NewMessageBox({
            title: this.language('LK_WENXINTISHI', '温馨提示'),
            Tips: this.$t("SFCXGSSTJXSYSJ"),
            cancelButtonText: this.language('QUXIAO', '取消'),
            confirmButtonText: this.language('QUEREN', '确认'),
          }).then(()=>{
            this.tableLoading = true
            this.offsetLoading = true
            if (this.searchFlag) {
              delete this.searchForm.effPriceFrom
              delete this.searchForm.effPriceTo
            }

            let params = {
              pageNo: 1,
              pageSize: 100000,
              ...this.searchForm
            }
            changeAll(params).then(res=>{
              if(res?.result){
                this.offsetLoading = false
                this.tableLoading = false;
                iMessage.success(res.desZh)
                this.query()
              }else{
                this.offsetLoading = false
                this.tableLoading = false;
                iMessage.error(res.desZh)
              }
            })
          })
        }else{
          this.offsetLoading = true
          let params = []
          this.muiltSelectList.forEach((item) => {
            params.push(item.id)
          })
          chargeAgainstMTZComp(params).then((res) => {
            if (res?.code === '200') {
              this.offsetLoading = false
              iMessage.success(res.desZh)
              this.query()
            } else {
              this.offsetLoading = false
              iMessage.error(res.desZh)
            }
          })
        }
      }else{
        iMessage.error(this.language('暂无数据，无法冲销'))
      }




      // if (this.muiltSelectList.length === 0) {
      //   iMessage.error(this.language('QINGXUANESHUJU', '请选择数据'))
      //   return
      // }
      // this.offsetLoading = true
      // let params = []
      // this.muiltSelectList.forEach((item) => {
      //   params.push(item.id)
      // })
      // chargeAgainstMTZComp(params).then((res) => {
      //   if (res?.code === '200') {
      //     this.offsetLoading = false
      //     iMessage.success(res.desZh)
      //     this.query()
      //   } else {
      //     this.offsetLoading = false
      //     iMessage.error(res.desZh)
      //   }
      // })
    },
    submit () {
      if (this.flag) {
        this.subLoading = true
        let params = {
          firstSupplier: this.searchForm.firstSupplier || '',
          compTimeStart: this.searchForm.compTimeStart,
          compTimeEnd: this.searchForm.compTimeEnd,
          mgroup: this.searchForm.materialKindList,
          ekGroupList: this.searchForm.ekGroupList,
          fpartNo: this.searchForm.fpartNo,
          isEffAvg: this.searchForm.isEffAvg,
          materialCode: this.searchForm.materialCode,
          sapOrderNo: this.searchForm.sapOrderNo,
          secondSupplierList: this.searchForm.secondSupplierList,
          spartNo: this.searchForm.spartNo,
          // mgroupId: this.searchForm.materialKindList,
          effPriceFrom: this.searchForm.effPriceFrom,
          effPriceTo: this.searchForm.effPriceTo,
          waitCompMoney: this.waitCompDocMoney,
          trueCompMoney: this.trueCompMoney,
          itemIds: this.priceList.noInitiatedIdList
        }
        submitMTZComp(params).then((res) => {
          if (res.code === '200') {
            iMessage.success(res.desZh)
            this.query()
            let routeData = this.$router.resolve({
              path: '/mtz/annualGeneralBudget/replenishmentManagement/supplementaryList'
            })
            window.open(routeData.href, '_blank')
            this.subLoading = false
          } else {
            iMessage.error(res.desZh)
            this.subLoading = false
          }
        })
      } else {
        fetchSaveComp({
          ...this.searchForm,
          waitCompMoney: this.waitCompMoney,
          trueCompMoney: this.trueCompMoney,
          itemIds: this.tableData.map((item) => item.id)
        }).then((res) => {
          if (res && res.code == '200') {
            iMessage.success(res.desZh)
            this.query()
            this.subLoading = false
          } else iMessage.error(res.desZh)
        })
      }
    },
    search () {
      this.page.currPage = 1

      this.searchFlag = true
      this.query()
    },
    reset () {
      this.searchFlag = true
      this.searchForm = {
        firstSupplierName: this.firstSupplierName,
        compTimeStart: '',
        compTimeEnd: '',
        ekGroupList: [],
        effPriceFrom: '',
        effPriceTo: '',
        fpartNo: [],
        firstSupplier: this.firstSupplier,
        isEffAvg: false,
        materialCode: [],
        materialKindList: [],
        sapOrderNo: [],
        spartNo: [],
        value: '',
        secondSupplierList: []
      }

      this.value1 = ''
      this.query()
    },
    calcuLate () {
      this.onLoding = true
      if (this.searchForm.isEffAvg === ''){
        this.onLoding = false
        return iMessage.error(
          this.language('SHIFOUQUSHICHANGJIAJUNZHI', '是否取市场价均值')
        )
      }
        
      let params = {
        balanceEndDate: this.searchForm.compTimeEnd,
        balanceStartDate: this.searchForm.compTimeStart,
        // compNo: this.searchForm.mtzDocId,
        effPriceEndDate: this.searchForm.effPriceTo,
        effPriceStartDate: this.searchForm.effPriceFrom,
        fpartNoList: this.searchForm.fpartNo,
        // fsupplierCode: "11111",
        fsupplierId: this.searchForm.firstSupplier,
        isEffAvg: this.searchForm.isEffAvg,
        isManual: true,
        materialCodeList: this.searchForm.materialCode,
        materialKindList: this.searchForm.materialKindList,
        purchaseGroupList: this.searchForm.ekGroupList,
        sapOrderNoList: this.searchForm.sapOrderNo,
        spartNoList: this.searchForm.spartNo,
        ssupplierCodeList: this.searchForm.secondSupplierList,
        fsupplierName:this.searchForm.firstSupplierName,
      }
      this.$refs['formList'].validate((valid) => {
        if (valid) {
          balanceCalcuLate(params).then((res) => {
            if (res.code == '200') {
              this.onLoding = false
              iMessage.success(res.desZh)
              this.query()
              // this.tableData = res.data
              // if (this.tableData.length !== 0) {
              //   this.tableData.forEach((item) => {
              //     this.actAmtList.push(item.actAmt)
              //   })
              //   this.waitCompDocMoney = _.sum(this.actAmtList.map(parseFloat))
              //   this.trueCompMoney = this.waitCompDocMoney
              // } else {
              //   this.waitCompDocMoney = 0
              //   this.trueCompMoney = this.waitCompDocMoney
              // }
            } else {
              this.onLoding = false
              iMessage.error(res.desZh)
            }
          }).catch(res=>{
            this.onLoding = false
          })
        } else {
          this.onLoding = false
          return false
        }
      })
    },
    changeNum (val) {
      let trueMoney = Math.abs(val)
      let waitMoney = Math.abs(this.waitCompDocMoney)
      if (trueMoney > waitMoney) {
        iMessage.error('实际补差金额要小于待发起凭证金额')
        this.$nextTick(() => {
          this.getAllPrice()
          // this.trueCompMoney = this.waitCompDocMoney
        })
      }
    },
    exportFiles(){
    console.log(1111)
    if(!this.searchForm.compTimeEnd||!this.searchForm.compTimeStart){
         iMessage.warn('请选择补差时间段和材料中类')
         return false
        }
        if(!this.searchForm.materialKindList){
          iMessage.warn('请选择补差时间段和材料中类')
          return false
    }
    const req={
      recallIdList:this.delList,

      ...this.searchForm,
      initiated:this.activeName=='wait'?0:1
    }
    compdocIExport(req)
  },
  },

  destroyed () {
    NewMessageBoxClose();
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
.headerBtn{
  display:flex;
    align-items:center;
    justify-content: space-between;
}
.table {
  margin-top: 20px;
  .header {
    display:flex;
    align-items:center;
    justify-content: space-between;
    margin-bottom: 20px;
    .headerForm{
      width:70%;
    }
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
::v-deep .el-form--label-top .el-form-item__label {
  padding: 0;
}
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
::v-deep.el-tabs--card{
      background-color:white;
    }
</style>
