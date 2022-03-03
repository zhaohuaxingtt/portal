<!--
 * @Author: moxuan
 * @Date: 2021-04-14 17:30:36
 * @LastEditors: Please set LastEditors
 * @Description: 财务数据页面
-->
<template>
  <div>
    <base-info-card v-if="this.supplierType > 3" />
    <financialSearch class="margin-top20"
                     v-if="this.supplierType === 4"
                     @getTableList="getTableList"></financialSearch>
    <i-card :title="$t('SUPPLIER_CAIWUSHUJU')"
            class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <!-- v-if="isSupplierDetail" -->
          <!-- <i-button @click="pullLevel">{{language("DIAOQUWAIBUPINGJI","调取外部评级")}}</i-button> -->
          <!-- 调取外部评级 -->
          <i-button @click="handleRatings" v-permission="SUPPLIER_FINANCIALDATA_TABLE_DIAOYONGWAIBUPINGJI">{{ $t('SPR_FRM_XGYSPJ_DQWBPJ') }}</i-button>
          <!-- <i-button v-if="
              $route.path === '/supplier/frmrating/newsupplierrating/rating1'
            "
                    @click="handleRatings">{{ $t('SPR_FRM_XGYSPJ_DQWBPJ') }}
          </i-button> -->
          <i-button v-if="isSupplierDetail"
                    v-permission="SUPPLIER_FINANCIALDATA_TABLE_ADD"
                    @click="addTableItem">{{
            $t('LK_XINZENG')
          }}</i-button>
          <i-button v-if="$route.path === '/supplier/view-suppliers'"
                    v-permission="SUPPLIER_FINANCIALDATA_TABLE_ADD"
                    @click="addTableItem">
            {{ $t('LK_XINZENG') }}
          </i-button>
          <i-button v-if="isSupplierDetail"
                    v-permission="SUPPLIER_FINANCIALDATA_TABLE_DELETE"
                    @click="deleteItem('ids', deleteFinance)">{{ $t('LK_SHANCHU') }}</i-button>
          <i-button v-permission="SUPPLIER_FINANCIALDATA_TABLE_DELETE"
                    v-else-if="$route.path === '/supplier/view-suppliers'"
                    @click="deleteItem('ids', deleteFinance)">
            {{ $t('LK_SHANCHU') }}

          </i-button>
          <i-button v-permission="SUPPLIER_FINANCIALDATA_TABLE_DATACOMPARISON"
                    @click="openDataComparison"
                    v-if="isSupplierDetail">{{ $t('SUPPLIER_SHUJUDUIBI') }}</i-button>
          <i-button v-permission="SUPPLIER_FINANCIALDATA_TABLE_DATACOMPARISON"
                    v-else-if="$route.path === '/supplier/view-suppliers'"
                    @click="openDataComparison">{{ $t('SUPPLIER_SHUJUDUIBI') }}</i-button>
          <i-button v-permission="SUPPLIER_FINANCIALDATA_TABLE_EXPORT"
                    @click="exportsTable"
                    v-if="showExportsButton && isSupplierDetail">{{ $t('LK_DAOCHU') }}</i-button>
          <i-button v-permission="SUPPLIER_FINANCIALDATA_TABLE_EXPORT"
                    @click="exportsTable"
                    v-else-if="
              showExportsButton && $route.path === '/supplier/view-suppliers'
            ">{{ $t('LK_DAOCHU') }}
          </i-button>
          <i-button v-permission="SUPPLIER_FINANCIALDATA_TABLE_SAVE"
                    v-if="$route.path === '/supplier/view-suppliers'"
                    @click="saveInfos('submit')">{{ $t('LK_BAOCUN') }}
          </i-button>
          <i-button v-if="
              $route.path === '/supplier/frmrating/newsupplierrating/rating1'
            "
                    @click="handleExportEarnings"
                    v-permission="SUPPLIER_FINANCIALDATA_TABLE_DAOCHUCAIBAO"
                    >{{ $t('SPR_FRM_XGYSPJ_DCCB') }}
          </i-button>
        </div>
      </div>
      <!-- v-permission="SUPPLIER_FINANCIALDATA_TABLE" -->
      <tableList ref="commonTable"
                 :tableData="tableListData"
                 :tableTitle="tableTitle"
                 :tableLoading="tableLoading"
                 @handleSelectionChange="handleSelectionChange"
                 :input-props="inputProps"
                 :index="true"
                 :select-props="selectProps"
                 :select-props-options-object="selectPropsOptionsObject">
        <template #dataChannelName="scope">
          <span class="openLinkText cursor"
                @click="handleEdit(scope.row)">
            {{ scope.row.dataChannelName }}
          </span>
        </template>
        <template v-slot:currency="scope">
          <iSelect v-model="scope.row['currency']">
            <el-option v-for="item in currencyList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.code">
            </el-option>
          </iSelect>
        </template>
        <template #operation="scope">
          <uploadButton :showText="true"
                        @uploadedCallback="handleUploadedCallback($event, scope.row)"
                        button-text="LK_SHANGCHUAN"
                        v-if="scope.row.dataChannelName==='供应商数据'" />
          <el-popover placement="bottom"
                      width="400"
                      trigger="click"
                      v-if="scope.row.dataChannelName==='供应商数据'">
            <table-list :selection="false"
                        :index="true"
                        :tableData="scope.row.attachList"
                        :tableTitle="[
                {
                  props: 'fileName',
                  name: '文件名称',
                  key: 'LK_WENJIANMINGCHENG'
                },
                { props: 'operation', name: '操作', key: 'SUPPLIER_CAOZUO' }
              ]">
              <template #operation="scope">
                <template slot="header">
                  <el-tooltip effect="light"
                              :content="$t('SUPPLIER_EXAMPLEDSEC')"
                              placement="top-start">
                    <icon symbol
                          name="iconxinxitishi"
                          class="exampleFileIconStle" />
                  </el-tooltip>
                </template>
                <span class="openLinkText cursor"
                      @click="handleExampleDownload(scope.row)">{{ $t('LK_XIAZAI') }}</span>
              </template>
            </table-list>
            <span class="openLinkText cursor"
                  slot="reference">
              {{ $t('LK_XIAZAI') }}
            </span>
          </el-popover>
          <span class="openLinkText cursor"
                @click="hanldeDownload(scope.row)"
                v-else-if="scope.row.dataChannelName==='资信报告'&&scope.row.reportUrlPdf">
            {{ $t('LK_XIAZAI') }}
          </span>
        </template>
        <template #year="scope">
          <iDatePicker v-model="scope.row.year"
                       value-format="yyyy"
                       type="year"
                       :placeholder="$t('LK_QINGXUANZE')"></iDatePicker>
        </template>
        <template #startAccountCycle="scope">
          <iDatePicker style="width: 100%"
                       v-model="scope.row.startAccountCycle"
                       value-format="yyyy-MM-dd"
                       type="date"
                       :placeholder="$t('LK_QINGXUANZE')"></iDatePicker>
        </template>
        <template #endAccountCycle="scope">
          <iDatePicker style="width: 100%"
                       v-model="scope.row.endAccountCycle"
                       value-format="yyyy-MM-dd"
                       type="date"
                       :placeholder="$t('LK_QINGXUANZE')"></iDatePicker>
        </template>
      </tableList>
    </i-card>
    <financialRemark v-if="this.supplierType === 4"
                     class="margin-top20" />
    <dataComparison :comparisonTableData="comparisonTableData"
                    v-model="dataComparisonDialog" />
    <fetchExternalRatingsDialog v-model="ratingsDialog"
                                @refreshTable="refreshTable" />
  </div>
</template>

<script>
import tableList from '@/components/commonTable'
import financialSearch from './components/financialSearch'
import baseInfoCard from '@/views/generalPage/components/baseInfoCard'
import { iCard, iButton, iMessage, iDatePicker, iSelect, iInput } from 'rise'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import { tableTitle } from './components/data'
import financialRemark from './components/financialRemark'
import dataComparison from './components/dataComparison'
import uploadButton from '@/components/uploadButton'
import { supplierDetail } from "@/api/register/baseInfo";
import {
  supplierComplete
} from "@/views/generalPage/baseInfo/components/data";
import {
  deleteFinance,
  saveFinance,
  selectFinance,
  getRatingList
} from '../../../api/register/financialData'
import { downloadUdFile } from '@/api/file'
import fetchExternalRatingsDialog from './components/fetchExternalRatingsDialog.vue'
import { exportFinanceReport } from '@/api/frmRating/frmIntegratedManagement.js'
import { getDictByCode } from '@/api/dictionary'

export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    financialRemark,
    dataComparison,
    baseInfoCard,
    financialSearch,
    tableList,
    uploadButton,
    iDatePicker,
    fetchExternalRatingsDialog,
    iSelect,
    iInput
  },
  data () {
    return {
      selectPropsOptionsObject: {
        isAudit: [
          {
            code: true,
            name: '是'
          },
          {
            code: false,
            name: '否'
          }
        ],
        isMergeReport: [
          {
            code: true,
            name: '是'
          },
          {
            code: false,
            name: '否'
          }
        ]
      },
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: [],
      dataComparisonDialog: false,
      ratingsDialog: false,
      comparisonTableData: [],
      inputProps: [],
      selectProps: [],
      supplierComplete,
      currencyList: []
    }
  },
  created () {
    if (this.$route.path !== '/supplier/frmrating/newsupplierrating/rating1') {
      this.inputProps = ['auditUnit', 'currencyUnit']
      this.selectProps = ['isAudit', 'isMergeReport']
    }
    this.getDictByCode()
    this.supplierDetail()
    this.getTableList()
  },
  methods: {
    // pullLevel(){

    // },
    refreshTable () {
      this.getTableList();
      this.$emit("submitCalculateRefresh", "view")
    },
    async getDictByCode () {
      let res = await getDictByCode('PP_CSTMGMT_CURRENCY')
      this.currencyList = res.data[0].subDictResultVo
    },
    supplierDetail () {
      supplierDetail(this.supplierType).then(res => {
        if (res.data) {
          //初始数据很多为null 需要重置为“” 不然会触发表单验证
          let baseInfo = this.reView(res.data)
          baseInfo.supplierInfoVo.isListing = baseInfo.supplierInfoVo.isListing.toString()
          if (baseInfo.gpSupplierInfoVO) this.supplierComplete.gpSupplierDTO = baseInfo
            .gpSupplierInfoVO
          if (baseInfo.ppSupplierInfoVo) {
            baseInfo.ppSupplierInfoVo.isSign = baseInfo.ppSupplierInfoVo.isSign ? '1' : '0'
            this.supplierComplete.ppSupplierDTO = baseInfo.ppSupplierInfoVo
          }
          if (baseInfo.settlementBankVo) this.supplierComplete.settlementBankDTO = baseInfo
            .settlementBankVo
          if (baseInfo.supplierInfoVo) this.supplierComplete.supplierDTO = baseInfo.supplierInfoVo
          this.$store.dispatch('setBaseInfo', this.supplierComplete)
        }
      })
    },
    // 调整详情数据
    reView (data) {
      for (let i in data) {
        if (data[i]) {
          for (let k in data[i]) {
            if (data[i][k] == null || k == 'createDate' || k == 'updateDate') {
              data[i][k] = ""
            }
            if (k == 'registeredCapital') {
              data[i][k] = data[i][k] + ""
            }
          }
        }
      }
      return data
    },
    async handleExportEarnings () {
      const pms = {
        supplierId: this.$route.query.supplierId,
        yearList: []
      }
      this.tableListData.forEach((item) => {
        pms.yearList.push(item.year)
      })
      await exportFinanceReport(pms)
    },
    handleRatings () {
      this.ratingsDialog = true
    },
    handleEdit (data) {
      this.comparisonTableData = [data]
      this.dataComparisonDialog = true
    },
    openDataComparison () {
      if (this.selectTableData.length < 1) {
        iMessage.warn('至少选择2条数据')
        return
      }
      this.comparisonTableData = this.selectTableData
      this.dataComparisonDialog = true
    },
    async handleExampleDownload (row) {
      // const req = {
      //   applicationName: 'rise',
      //   fileList: [row.id]
      // }
      await downloadUdFile(row.filePath)
    },
    async hanldeDownload (val) {
      // if(!val.reportUrlPdf) 
      await downloadUdFile(val.reportUrlPdf)
    },
    // 上传接口
    async handleUploadedCallback (evnet, row) {
      delete evnet.uploadTime
      const req = {
        step: 'tempStore'
      }
      if (row.time) {
        this.tableListData.map((item) => {
          if (item.time === row.time) {
            if (!item.attachList) {
              item.attachList = []
            }
            return Object.assign(item, {
              dataTime: evnet.createDate,
              attachList: [
                ...item.attachList,
                {
                  ...evnet,
                  financeId: row.id,
                  filePath: evnet.id,
                  fileName: evnet.name,
                  fileSize: evnet.size,
                  step: req.step
                }
              ]
            })
            // return item.attachList.push({
            //   ...evnet,
            //   financeId: row.id,
            //   step: req.step
            // })
          }
        })
      }
      if (row.id || row.id === null) {
        this.tableListData.map((item) => {
          console.log(item.id, '==111=', row.id)
          if (item.id === row.id) {
            return Object.assign(item, {
              dataTime: evnet.createDate,
              attachList: [
                ...item.attachList,
                {
                  ...evnet,
                  financeId: row.id,
                  filePath: evnet.id,
                  fileName: evnet.name,
                  fileSize: evnet.size,
                  step: req.step
                }
              ]
            })
            // return item.attachList.push({
            //   ...evnet,
            //   financeId: row.id,f
            //   filePath: evnet.id,
            //   step: req.step
            // })
          }
        })
      }
      this.saveInfos(req.step)
    },
    async getTableList (form) {
      this.tableLoading = true
      try {
        const pms = {
          step: 'tempStore',
          pageNo: 1,
          pageSize: 9999,
          ...form
        }
        var res = []
        if (
          this.$route.path === '/supplier/frmrating/newsupplierrating/rating1'
        ) {
          pms['ratingSupplierId'] = this.$route.query.supplierId
          res = await getRatingList(pms, this.supplierType)
        } else {
          res = await selectFinance(pms, this.supplierType)
        }
        if (res.result) {
          this.tableListData = (res.data && res.data.list) || []
        }
        this.tableLoading = false
      } catch {
        this.tableLoading = false
      }
      // map():item.time=》 用来判断
      // this.tableListData.map((item, index) => {
      //   if (!item.id) {
      //     return item.time = new Date().getTime() + index
      //   }
      // })
    },
    handleSelectionChange (e) {
      this.selectTableData = e
    },
    async saveInfos (step = '') {
      this.$refs.commonTable.$refs.commonTableForm.validate(async (vaild) => {
        if (vaild) {
          let flag = false
          console.log(this.tableListData, '?!111')
          this.tableListData.forEach((item) => {
            const startAccountCycle = item.startAccountCycle.replace(/-/g, '')
            const endAccountCycle = item.endAccountCycle.replace(/-/g, '')
            if (startAccountCycle > endAccountCycle) {
              this.$message.error('开始时间不能大于结束时间')
              flag = true
              return false
            }
            // 校验开始时间要小于结束时间
            item.attachList &&
              item.attachList.forEach((val) => {
                delete val.uploadTime
              })
            delete item.updateDate
            delete item.createDate
          })
          const pms = {
            list: this.tableListData,
            step: 'tempStore'
          }
          if (step !== '') {
            pms.step = step
          }
          if (!flag) {
            const res = await saveFinance(pms, this.supplierType)
            this.resultMessage(
              res,
              () => {
                this.getTableList()
                this.nextStep = true
              },
              () => {
                this.tableLoading = false
                this.nextStep = false
              }
            )
          }
        }
      })
    },
    async handleNextStep () {
      await this.saveInfos()
      return this.nextStep
    },
    deleteFinance
  }
}
</script>

<style lang="scss" scoped>
.openLinkText {
  color: $color-blue;
}
::v-deep .el-table th > .cell {
  display: flex;
  justify-content: center;
}
.el-table .el-table__row .el-input {
  width: 100% !important;
}
</style>
