<!--
* @author:shujie
* @Date: 2021-4-13 17:23:55
* @Description: 主要业务及产品
 -->
<template>
  <div>
    <base-info-card/>
    <iCard class="margin-top20" :title="$t('SUPPLIER_ZHUYAOYEWUJICHANPIN')" tabCard>
      <template slot="header-control">
        <iButton @click="addTableItem"  v-permission="SUPPLIER_MAINPRODUCT_TABLE_ADD">
          {{ $t('LK_XINZENG') }}
        </iButton>
        <iButton @click="deleteItem('idList', deleteSupplierProduct)" v-permission="SUPPLIER_MAINPRODUCT_TABLE_DELETE">
          {{ $t('delete') }}
        </iButton>
        <iButton @click="handleNextStep" v-permission="SUPPLIER_MAINPRODUCT_TABLE_EXPORT_SAVE">
          {{ $t('LK_BAOCUN') }}
        </iButton>
        <iButton @click="exportsTable"  v-permission="SUPPLIER_MAINPRODUCT_TABLE_EXPORT">
          {{ $t('LK_DAOCHU') }}
        </iButton>
      </template>
      <!-- v-permission="SUPPLIER_MAINPRODUCT_TABLE" -->
      <table-list
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
          :input-props="inputProps"
          :index="true"
          ref="commonTable"
          border
      >
        <template #deliveryStartDate="scope">
          <iDatePicker
              style="width:100%!important"
              value-format="yyyy-MM-dd"
              type="date"
              :placeholder="$t('SUPPLIER_XUANZERQI')"
              v-model="scope.row.deliveryStartDate"/>
        </template>
        <template #deliveryYear="scope">
          <iDatePicker
              style="width:100%!important"
              value-format="yyyy"
              type="year"
              :placeholder="$t('SUPPLIER_XUANZENIANFEN')"
              v-model="scope.row.deliveryYear"/>
        </template>
      </table-list>
    </iCard>
  </div>
</template>

<script>
import {iCard, iButton,iDatePicker} from "rise";
import {generalPageMixins} from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import {tableTitle1,tableTitleGP1,tableTitleGP2} from './data'
import {
  getSupplierProduct,
  saveSupplierProduct,
  deleteSupplierProduct
} from '../../../api/register/businessProducts'
import baseInfoCard from '@/views/generalPage/components/baseInfoCard'


export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    tableList,
    baseInfoCard,
    iDatePicker
  },
  data() {
    return {
      tableListData: [],
      tableTitle:[],
      tableTitle1,
      tableTitleGP1,
      tableTitleGP2,
      tableLoading: false,
      selectTableData: [],
      inputProps: []
    }
  },
  computed: {
    baseMsg () {
      return this.$store.state.baseInfo.baseMsg
    },
  },
  created() {
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
    setTimeout(() => {
      this.setInputProps()
      this.getTableList()
    }, 0);
  },
  methods: {
    deleteSupplierProduct,
    setInputProps() {
      this.inputProps = []
      const dateProps = ['deliveryStartDate', 'deliveryYear']
      this.tableTitle.map(item => {
        if (!dateProps.includes(item.props)) {
          this.inputProps.push(item.props)
        }
      })
    },
    async getTableList() {
      this.tableLoading = true
      try {
        const req = {
          pageNo: 1,
          pageSize: 9999,
          step: 'submit'
        }
        const res = await getSupplierProduct(req)
        this.tableListData = res.data
        this.tableLoading = false
      } catch {
        this.tableLoading = false
      }
    },
    async saveInfos(step = '') {
      const flag = this.checkTableRequiredProps(this.tableListData, this.tableTitle)
      if(flag){
        return new Promise((resolve, reject) => {
          this.$refs.commonTable.$refs.commonTableForm.validate(async (valid) => {
            if (valid) {
              this.tableLoading = true
              const req = {
                dtoList: this.tableListData,
                step: 'submit'
              }
              if (step !== '') {
                req.step = step
              }
              const res = await saveSupplierProduct(req)
              this.resultMessage(res, () => {
                this.getTableList()
                resolve(true)
              }, () => {
                this.tableLoading = false
                reject(false)
              })
            } else {
              return false
            }
          })
        })
      }
    },
    async handleNextStep() {
      return await this.saveInfos()
    }
  }
}
</script>

<style scoped>

</style>
