<!--
 * @Author: your name
 * @Date: 2021-10-08 14:25:34
 * @LastEditTime: 2022-03-10 12:00:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\mtzReplenishmentOverview\components\search.vue
-->
<template>
  <div>
    <iDialog :visible.sync="dialogVisible"
             :title="flag ? language('CHUANGJIANBUCHADAN','创建补差单') : language('BIANJIBUCHADAN','编辑补差单')"
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
        <el-row style="border-bottom:1px solid #ccc">
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
                           style="width:100%"
                           format="yyyy-MM"
                           value-format="yyyy-MM-dd"
                           range-separator="至"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期">
              </iDatePicker>
            </el-form-item>
            <el-form-item label="二次件供应商"
                          class="searchFormItem">
              <custom-select v-model="searchForm.secondSupplierList"
                             :user-options="ssupplierList"
                             multiple
                             clearable
                             :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                             display-member="codeMessage"
                             value-member="code"
                             value-key="code">
              </custom-select>

            </el-form-item>
            <el-form-item label="材料中类"
                          class="searchFormItem"
                          prop="materialKindList">
              <custom-select v-model="searchForm.materialKindList"
                             :user-options="Mgroups"
                             multiple
                             clearable
                             :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                             display-member="message"
                             value-member="code"
                             value-key="code">
              </custom-select>
            </el-form-item>
            <el-form-item label="SAP订单号"
                          class="searchFormItem">
              <comboBox v-model="searchForm.sapOrderNo"
                        :editPlaceholder="language('QINGSHURU','请输入')"
                        :placeholder="language('QINGSHURU','请输入')"> </comboBox>

            </el-form-item>
            <el-form-item label="原材料编号"
                          prop="materialCode"
                          class="searchFormItem">
              <custom-select v-model="searchForm.materialCode"
                             :user-options="RawMaterialNos"
                             multiple
                             clearable
                             @change="handleMaterialCode"
                             :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                             display-member="codeMessage"
                             value-member="code"
                             value-key="code">
              </custom-select>

            </el-form-item>

            <el-form-item label="采购组"
                          class="searchFormItem">
              <custom-select v-model="searchForm.ekGroupList"
                             :user-options="UserSubPurchaseGroup"
                             multiple
                             clearable
                             @change="handleMaterialCode"
                             :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                             display-member="message"
                             value-member="code"
                             value-key="code">

              </custom-select>

            </el-form-item>
            <el-form-item label="一次零件号"
                          prop="fpartNo"
                          class="searchFormItem">
              <comboBox v-model="searchForm.fpartNo"
                        :editPlaceholder="language('QINGSHURU','请输入')"
                        :placeholder="language('QINGSHURU','请输入')"> </comboBox>
            </el-form-item>
            <el-form-item label="二次零件号"
                          class="searchFormItem">
              <comboBox v-model="searchForm.spartNo"
                        :editPlaceholder="language('QINGSHURU','请输入')"
                        :placeholder="language('QINGSHURU','请输入')"> </comboBox>

            </el-form-item>
          </el-col>
          <el-col :span="3">
            <div class="flex">
              <iButton v-if="flag"
                       class="margin-top45"
                       style="float:right"
                       @click="search">{{language('CHAXUN','查询')}}</iButton>
              <iButton v-if="flag"
                       class="margin-top45"
                       style="float:right"
                       @click="reset">{{language('CHONGZHI','重置')}}</iButton>
            </div>
          </el-col>
        </el-row>
        <el-row style="border-bottom:1px solid #ccc;width:100%">
          <el-col :span="21">
            <el-form-item label="市场价偏移区间"
                          class="searchFormItem">
              <iDatePicker v-model="value1"
                           :disabled="editDisabled"
                           @change="handleChangeDate"
                           @focus="handleFocus"
                           :picker-options="pickerOptions"
                           type="monthrange"
                           style="width:100%"
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
                     style="float:right"
                     @click="calcuLate">{{language('JISUAN','计算')}}</iButton>
          </el-col>
        </el-row>
      </el-form>
      <div class="table">
        <div class="header flex">
          <div class="flex"
               style="align-items:center">
            <div class="margin-right20">
              <label for=""
                     class="label margin-right10">{{language('DAIFAQIPINZHENG','待发起凭证')}}</label>
              <el-input-number v-model="waitCompDocMoney"
                               :precision="2"
                               :disabled="true"
                               :controls="false"></el-input-number>
            </div>
            <div>
              <label for="">{{language('SHIJIBUCHAJINE','实际补差金额')}}</label>
              <el-tooltip class="item margin-right10"
                          effect="light"
                          content="可修改，但小于或等于待发起凭证总额；实际补差 金额修改后，变化量将平均打散到每条行项次"
                          placement="top">
                <i class="el-icon-warning-outline margin-left10"
                   style="color:blue"></i>
              </el-tooltip>
              <el-input-number v-model="trueCompMoney"
                               :precision="2"
                               @change="changeNum"
                               :controls="false"></el-input-number>
            </div>
          </div>
          <div class="flex">
            <el-tooltip class="item margin-right10"
                        effect="light"
                        :content="language('CHEHUIHOUJIANGCONGBUCHASHENQINGZHONGQUXIAORENKEZAIBUCHAZONGLANZHONGCAOZUO','撤回后将从补差申请中取消，仍可在补差总览中操作')"
                        placement="top">
              <iButton @click="recall">{{language('CHEHUI','撤回')}}</iButton>
            </el-tooltip>
            <el-tooltip class="item margin-right10"
                        effect="light"
                        :content="language('CHONGXIAOHOUJIANGCONGBUCHASHENQINGZHONGQUXIAOBUNENGZHIJIEZAIBUCHAZONGLANZHONGCAOZUOXUSHOUGONGCHUANGJIANBUCHAXINXI','冲销后将从补差申请中取消，不能直接在补差总览中操作，需手工创建补差信息')"
                        placement="top">
              <iButton @click="offset">{{language('CHONGXIAO','冲销')}}</iButton>
            </el-tooltip>
            <iButton v-if="flag"
                     @click="submit"
                     :loading="subLoading">{{language('TIJIAO','提交')}}</iButton>
            <iButton v-if="!flag"
                     @click="submit"
                     :loading="subLoading">{{language('BAOCUN','保存')}}</iButton>
          </div>
        </div>
        <div>
          <i-table-custom :loading="tableLoading"
                          :data="tableData"
                          :columns="tableColumns"
                          min-height="328px"
                          height="600px"
                          ref="iTable"
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
      <div slot="footer">
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iCard, iButton, iMessage, iDialog, iSelectCustom, iInput, iDatePicker, iSelect } from 'rise'
import comboBox from './comboBox'
import iTableCustom from '@/components/iTableCustom'
import { pageMixins } from "@/utils/pageMixins"
import { TABLE_COLUMS } from './data'
import { getMtzSupplierList, balanceCalcuLate } from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview'
import { pageMTZCompByComputer, getMtzGroups, getRawMaterialNos, getUserSubPurchaseGroup, chargeAgainstMTZComp, submitMTZComp, fetchQueryComp, fetchSaveComp } from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview'
export default {
  name: "Search",
  mixins: [pageMixins],
  components: {
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
      default: ""
    },
    flag: {
      type: Boolean
    }
  },
  watch: {
    minDate (val) {
      this.pickerOptions = {
        onPick: ({ minDate }) => {
          this.minDate = minDate
          console.log(this.minDate)
        },
        disabledDate: time => {
          var newTime = new Date(val.getTime() + this.differenceTime);
          if (val.getMonth() == time.getMonth() && val.getFullYear() == time.getFullYear()) {
            return false;
          }
          if (time.getMonth() == newTime.getMonth() && time.getFullYear() == newTime.getFullYear()) {
            return false;
          }
          return true;
        }
      }
    },
    selectData: {
      handler (val) {
        console.log(val, "val")
        if (val && val.length !== 0) {
          this.firstSupplierName = val[0].firstSupplierName
          this.firstSupplier = val[0].firstSupplierId
          this.searchForm.firstSupplier = val[0].firstSupplierId
          this.searchForm.firstSupplierName = val[0].firstSupplierName
          if (!this.flag) {
            const data = val[0]
            this.searchForm.mtzDocId = data.id
          }
        }
      },
      deep: true,
      immediate: true
    },
    tableData: {
      handler () {
      },
      deep: true
    }
  },
  data () {
    return {
      searchForm: {
        firstSupplierName: "",
        mtzDocId: "",
        compTimeStart: "",
        compTimeEnd: "",
        ekGroupList: [],
        effPriceFrom: "",
        effPriceTo: "",
        fpartNo: [],
        firstSupplier: "",
        isEffAvg: false,
        materialCode: [],
        materialKindList: [],
        sapOrderNo: [],
        spartNo: [],
        value: "",
        secondSupplierList: []
      },
      muiltSelectList: [],
      ssupplierList: [],
      UserSubPurchaseGroup: [],
      Mgroups: [],
      isEffAvgList: [
        { label: "是", value: true },
        { label: "否", value: false },
      ],
      RawMaterialNos: [],
      waitCompDocMoney: 0,
      trueCompMoney: 0,
      name: "默认空，“计算”后显示",
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
      minDate: "",
      firstSupplierName: "",
      onLoding: false,
      firstSupplier: "",
      rules: {
        value: [
          { required: true, message: this.language('QINGXUANZEBUCHASHIJIANDUAN', '请选择不差时间段'), trigger: 'blur' },
        ],
        materialKindList: [
          { type: "array", required: true, message: this.language('QINGSHURUYICILINGJIANHAO', '请选择材料中类'), trigger: 'blur' },
        ],
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
    this.searchForm.value = this.dateSearch
    if (this.searchForm.value !== "") {
      this.searchForm.compTimeStart = window.moment(this.searchForm.value[0]).format('yyyy-MM-DD')
      this.searchForm.compTimeEnd = window.moment(this.searchForm.value[1]).format('yyyy-MM-DD')
    }
    this.init()
  },
  methods: {
    async init () {
      await this.getMgroups()
      await this.getRawMaterialNos()
      await this.getUserSubPurchaseGroup()
      this.$nextTick(() => {
        this.query()
      });
      getMtzSupplierList({}).then(res => {
        if (res.code === '200') {
          this.ssupplierList = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },

    handleMaterial (val) {
      this.Mgroups.forEach(item => {
        val.forEach(i => {
          if (item.code === i) {
            this.mgroup.push(item.message)
          }
        })
      })
    },
    getMgroups (key) {
      getMtzGroups({
        keyWords: key || ""
      }).then(res => {
        if (res.code === '200') {
          this.Mgroups = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    getRawMaterialNos (key) {
      getRawMaterialNos({
        keyWords: key || ""
      }).then(res => {
        if (res.code === '200') {
          this.RawMaterialNos = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    getUserSubPurchaseGroup (key) {
      getUserSubPurchaseGroup({
        keyWords: key || ""
      }).then(res => {
        if (res.code === '200') {

          this.UserSubPurchaseGroup = res.data.filter(item => item)
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    handleClose () {
      this.$emit('close', false);
    },
    handleChange (val) {
      this.searchForm.compTimeStart = val[0]
      this.searchForm.compTimeEnd = val[1]
    },
    handleChangeDate (val) {
      this.searchForm.effPriceFrom = val[0]
      this.searchForm.effPriceTo = val[1]
    },
    handleFocus () {
      this.pickerOptions.disabledDate = () => false
    },
    query () {
      console.log(this.searchForm)
      if (this.flag) {
        this.tableLoading = true
        this.actAmtList = []
        if (this.searchFlag) {
          // delete this.searchForm.isEffAvg
          delete this.searchForm.effPriceFrom
          delete this.searchForm.effPriceTo
        }
        let params = {
          pageNo: 1,
          pageSize: 400,
          ...this.searchForm
        }
        pageMTZCompByComputer(params).then(res => {
          if (res?.code === '200') {
            this.tableData = res.data
            this.tableData.forEach(item => {
              this.actAmtList.push(item.actAmt)
            })
            this.waitCompDocMoney = _.sum(this.actAmtList.map(parseFloat))
            this.trueCompMoney = this.waitCompDocMoney
            this.tableLoading = false
            this.searchFlag = false
          }
        })
      } else {
        this.tableLoading = true
        this.actAmtList = []
        let params = {
          pageNo: 1,
          pageSize: 400,
          ...this.searchForm
        }
        fetchQueryComp(params).then(res => {
          if (res?.code === '200') {
            this.tableData = res.data
            this.tableData.forEach(item => {
              this.actAmtList.push(item.actAmt)
            })
            this.waitCompDocMoney = _.sum(this.actAmtList.map(parseFloat))
            this.trueCompMoney = this.waitCompDocMoney
            this.tableLoading = false
          }
        })
      }
    },
    handleSelectionChange (val) {
      this.muiltSelectList = val
      this.tableData.filter(item => {
      })
    },
    recall () {
      if (this.muiltSelectList.length === 0) {
        iMessage.error(this.language('QINGXUANESHUJU', '请选择数据'))
      }
      this.actAmtList = []
      this.muiltSelectList.forEach((val) => {
        this.tableData.forEach((v, i) => {
          if (val.id === v.id) {
            this.tableData.splice(i, 1)
          }
        })
      })
      this.tableData.forEach(item => {
        this.actAmtList.push(item.actAmt)
      })

      this.$nextTick(() => {
        this.waitCompDocMoney = _.sum(this.actAmtList.map(parseFloat))
        this.trueCompMoney = this.waitCompDocMoney
      });

      this.$refs.iTable.clearSelection()
    },
    offset () {
      if (this.muiltSelectList.length === 0) {
        iMessage.error(this.language('QINGXUANESHUJU', '请选择数据'))
        return
      }
      let params = []
      this.muiltSelectList.forEach(item => {
        params.push(item.id)
      })
      chargeAgainstMTZComp(params).then(res => {
        if (res?.code === '200') {
          iMessage.success(res.desZh)
          this.query()
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    submit () {
      if (this.flag) {
        this.subLoading = true
        let params = {
          firstSupplier: this.searchForm.firstSupplier || "",
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
          itemIds: this.tableData.map(item => item.id)
        }
        submitMTZComp(params).then(res => {
          if (res.code === '200') {
            iMessage.success(res.desZh)
            this.query()
            let routeData = this.$router.resolve({
              path: "/mtz/annualGeneralBudget/replenishmentManagement/supplementaryList"
            });
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
          itemIds: this.tableData.map(item => item.id)
        }).then(res => {
          if (res && res.code == '200') {
            iMessage.success(res.desZh)
            this.query()
            this.subLoading = false
          } else iMessage.error(res.desZh)
        })
      }
    },
    search () {
      this.searchFlag = true
      this.query()
    },
    reset () {
      this.searchFlag = true
      this.searchForm = {
        firstSupplierName: this.firstSupplierName,
        compTimeStart: "",
        compTimeEnd: "",
        ekGroupList: [],
        effPriceFrom: "",
        effPriceTo: "",
        fpartNo: [],
        firstSupplier: this.firstSupplier,
        isEffAvg: false,
        materialCode: [],
        materialKindList: [],
        sapOrderNo: [],
        spartNo: [],
        value: "",
        secondSupplierList: []
      }
      console.log(this.searchForm, "searchForm")
      this.value1 = ""
      this.query()
    },
    calcuLate () {
      if (this.searchForm.isEffAvg === '') return iMessage.error(this.language('SHIFOUQUSHICHANGJIAJUNZHI', '是否取市场价均值'))
      this.onLoding = true
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
        ssupplierCodeList: this.searchForm.secondSupplierList
      }
      this.$refs['formList'].validate((valid) => {
        if (valid) {
          balanceCalcuLate(params).then(res => {
            if (res.code === '200') {
              this.onLoding = false
              this.tableData = res.data
              if (this.tableData.length !== 0) {
                this.tableData.forEach(item => {
                  this.actAmtList.push(item.actAmt)
                })
                this.waitCompDocMoney = _.sum(this.actAmtList.map(parseFloat))
                this.trueCompMoney = this.waitCompDocMoney
              } else {
                this.waitCompDocMoney = 0
                this.trueCompMoney = this.waitCompDocMoney
              }

              iMessage.success(res.desZh)
            } else {
              this.onLoding = false
              iMessage.error(res.desZh)
            }

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    changeNum (val) {
      let trueMoney = Math.abs(val);
      let waitMoney = Math.abs(this.waitCompDocMoney);
      if (trueMoney > waitMoney) {
        iMessage.error('实际补差金额要小于待发起凭证金额')
        this.$nextTick(() => {
          this.trueCompMoney = this.waitCompDocMoney
        });
      }
    }
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
::v-deep .el-form--label-top .el-form-item__label {
  padding: 0;
}
</style>
