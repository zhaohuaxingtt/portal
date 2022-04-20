<!--
 * @Author: moxuan
 * @Date: 2021-04-14 17:30:36
 * @LastEditors: YoHo
 * @Description: 财务大数
-->
<template>
  <div>
    <base-info-card v-if="this.supplierType > 3" />
    <i-card class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright" v-if="$route.query.subSupplierType!=='GP'">
          <i-button v-if="isSupplierDetail"
                    @click="addTableItem">{{$t('LK_XINZENG')}}</i-button>
          <i-button v-permission="SUPPLIER_KEYFINANCIALFIGURE_TABLE_ADD"
                    v-else
                    @click="addTableItem">{{$t('LK_XINZENG')}}</i-button>
          <i-button v-if="isSupplierDetail"
                    @click="deleteItem('ids',deleteFinancialBig)">{{$t('LK_SHANCHU')}}</i-button>
          <i-button v-permission="SUPPLIER_KEYFINANCIALFIGURE_TABLE_DELETE"
                    v-else
                    @click="deleteItem('ids',deleteFinancialBig)">{{$t('LK_SHANCHU')}}</i-button>
          <i-button @click="exportsTable"
                    v-if="showExportsButton && isSupplierDetail">{{ $t('LK_DAOCHU') }}</i-button>
          <i-button v-permission="SUPPLIER_KEYFINANCIALFIGURE_TABLE_EXPORT"
                    @click="exportsTable"
                    v-else-if="showExportsButton">{{ $t('LK_DAOCHU') }}</i-button>
          <i-button @click="saveTable" v-permission="SUPPLIER_KEYFINANCIALFIGURE_TABLE_SAVE">{{language('BAOCUN','保存')}}</i-button>
        </div>
        <div class="floatright" v-if="$route.query.subSupplierType=='GP'">
          <i-button v-permission="SUPPLIER_KEYFINANCIALFIGURE_TABLE_ADD_GP"
                    @click="addTableItem">{{$t('LK_XINZENG')}}</i-button>
          <i-button v-permission="SUPPLIER_KEYFINANCIALFIGURE_TABLE_DELETE_GP"
                    @click="deleteItem('ids',deleteFinancialBig)">{{$t('LK_SHANCHU')}}</i-button>
          <i-button v-permission="SUPPLIER_KEYFINANCIALFIGURE_TABLE_EXPORT_GP"
                    @click="exportsTable">{{ $t('LK_DAOCHU') }}</i-button>
          <i-button @click="saveTable" v-permission="SUPPLIER_KEYFINANCIALFIGURE_TABLE_SAVE_GP">{{language('BAOCUN','保存')}}</i-button>
        </div>
      </div>
      <table-list :tableData="tableListData"
                  :tableTitle="tableTitle"
                  :tableLoading="tableLoading"
                  @handleSelectionChange="handleSelectionChange"
                  :row-class-name="handleTableRow"
                  :input-props="['year','receivables','inventory','advancePayment','otherReceivables','rollingAssetsTotal','totalCurrentLab','totalLab','paidInCapital','totalOwnersEquity','assetsTotal','taking','cost','totalProfit','retainedProfits','debtRatio']"
                  :index="true"
                  border>
        <template v-slot:currency="scope">
          <iSelect v-model="scope.row['currency']">
            <el-option v-for="item in currencyList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.code">
            </el-option>
          </iSelect>
        </template>
      </table-list>
    </i-card>
  </div>
</template>

<script>
import baseInfoCard from '@/views/generalPage/components/baseInfoCard'
import { iCard, iButton, iMessage, iMessageBox, iSelect } from "rise";
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import { tableTitle1,tableTitleGP1,tableTitleGP2 } from './components/data'
import { deleteFinancialBig, saveFinancialBig, selectFinancialBig } from "../../../api/register/financialBigNumbers";
import { getDictByCode } from '@/api/dictionary'


export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    tableList,
    baseInfoCard,
    iSelect
  },
  data () {
    return {
      tableListData: [],
      tableTitle:[],
      tableTitle1,
      tableTitleGP1,
      tableTitleGP2,
      tableLoading: false,
      selectTableData: [],
      currencyList: []
    }
  },
  computed: {
    baseMsg () {
      return this.$store.state.baseInfo.baseMsg
    },
  },
  created () {
    console.log(this.baseMsg.gpSupplierDetails)
    if(this.$route.query.subSupplierType=="GP"){
      let number = 0;
      this.baseMsg.gpSupplierDetails.forEach(e=>{
        if(e.businessType == 1 && e.industryPosition == "Y"){
          number++;
        }
      })
      setTimeout(() => {
        if(number>0){
          this.tableTitle = this.tableTitleGP1;
        }else{
          this.tableTitle = this.tableTitleGP2;
        }
      }, 0);
    }else{
      this.tableTitle = this.tableTitle1;
    }

    this.getDictByCode()
    this.getTableList()
  },
  methods: {
    async getDictByCode () {
      let res = await getDictByCode('PP_CSTMGMT_CURRENCY')
      this.currencyList = res.data[0].subDictResultVo
    },
    async getTableList () {
      this.tableLoading = true
      const pms = {
        "step": "register",
        pageNo: 1,
        pageSize: 9999
      }
      if (this.supplierType > 3) {
        pms.step = 'tempStore'
      }
      const res = await selectFinancialBig(pms, this.supplierType)
      this.tableListData = res.data && res.data.list
      this.tableLoading = false
    },
    async saveInfos (step = '') {
      if (!this.tableListData.length) {
        return
      }
      const flag = this.checkTableRequiredProps(this.tableListData, this.tableTitle)
      if (flag) {
        const pms = {
          list: this.tableListData,
          "step": "register"
        }
        if (this.supplierType > 3) {
          pms.step = 'submit'
        }
        if (step !== '') {
          pms.step = step
        }
        const res = await saveFinancialBig(pms, this.supplierType)
        this.resultMessage(res, () => {
          this.getTableList()
          this.nextStep = true
        }, () => {
          this.tableLoading = false
          this.nextStep = false
        })
      }
    },
    resultMessage (res, successCallback, errorCallback) {
      const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
      if (res.result) {
        if (res.code === '200' && res.data !== 'WARNING') {
          iMessage.success(result)
          if (successCallback) {
            successCallback()
          }
        } else if (res.data === 'WARNING') {
          iMessage.warn(result)
          if (successCallback) {
            successCallback()
          }
        }
      } else {
        iMessage.error(result)
        if (errorCallback) {
          errorCallback()
        }
      }
    },
    async handleNextStep () {
      await this.saveInfos()
      return this.nextStep
    },
    handleTableRow (row) {
      row.row.index = row.rowIndex
    },
    saveTable () {

      this.saveInfos()
    },
    deleteFinancialBig
  }
}
</script>

<style scoped>
</style>