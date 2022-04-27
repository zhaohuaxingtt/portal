<!--
* @author:shujie
* @Date: 2021-4-13 17:23:55
* @Description: 授信银行信息
 -->
<template>
  <div>
    <baseInfo ref="basic" class="margin-bottom20"></baseInfo>
    <iCard :title="$t('SHOUQUANYINHANGXINXI')" tabCard>
      <template slot="header-control">
        <template v-if="supplierType<4">
          <iButton v-permission="SUPPLIER_BAKN_TABLE_ADD" @click="addTableItem">{{ $t('LK_XINZENG') }}</iButton>
          <iButton v-permission="SUPPLIER_BAKN_TABLE_DELETE" @click="deleteItem('ids', deleteSupplierBank)">
            {{ $t('delete') }}
          </iButton>
        </template>
        <iButton v-permission="SUPPLIER_BAKN_TABLE_EXPORT" @click="exportsTable" v-if="showExportsButton && $route.query.subSupplierType!=='GP'">{{ $t('LK_DAOCHU') }}</iButton>
        <iButton v-permission="SUPPLIER_BAKN_TABLE_EXPORT_GP" @click="exportsTable" v-if="$route.query.subSupplierType=='GP'">{{ $t('LK_DAOCHU') }}</iButton>
      </template>
<!--      v-permission="SUPPLIER_BAKN_TABLE"-->
      <table-list :tableData="tableListData" :tableTitle="tableTitle"
                  :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" :input-props="inputProps"
                  :index="true"
                  ref="commonTable"
                  border
      >
        <template #creditDateStart="scope">
          <iDatePicker value-format="yyyy-MM-dd" type="date" :placeholder="$t('SUPPLIER_XUANZERQI')"
                       v-model="scope.row.creditDateStart"></iDatePicker>
        </template>
        <template #creditDateEnd="scope">
          <iDatePicker value-format="yyyy-MM-dd" type="date" :placeholder="$t('SUPPLIER_XUANZERQI')"
                       v-model="scope.row.creditDateEnd"></iDatePicker>
        </template>
      </table-list>
    </iCard>
    <notes></notes>
  </div>
</template>
<script>
import {iCard, iButton, iDatePicker} from "rise";
import {generalPageMixins} from '@/views/generalPage/commonFunMixins';
import tableList from '@/components/commonTable';
import {tableTitle} from './components/data';
import {getSupplierBank, saveSupplierBank, deleteSupplierBank} from '@/api/register/bank';
import baseInfo from "../components/baseInfoCard";
import notes from "./components/notes"

export default {
  mixins: [generalPageMixins],
  components: {
    iCard, iButton, tableList, notes, iDatePicker, baseInfo
  },
  data() {
    return {
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: [],
      inputProps: [],
      selectProps: ['creditDateStart', 'creditDateEnd']
    }
  },
  created() {
    this.setInputProps()
    this.getTableList()

  },
  methods: {
    deleteSupplierBank,
    setInputProps() {
      this.inputProps = []
      this.tableTitle.map(item => {
        if (!this.selectProps.includes(item.props)) {
          this.inputProps.push(item.props)
        }
      })
    },
    getTableList() {
      this.tableLoading = true
      const req = {
        step: 'register'
      }
      if (this.supplierType > 3) {
        req.step = 'submit'
      }
      getSupplierBank(req, this.supplierType).then(res => {
        if (res.data) {
          this.tableListData = res.data
        }
        this.tableLoading = false
      })

    },
    async saveInfos(step = '') {
      return new Promise((resolve, reject) => {
        this.$refs.commonTable.$refs.commonTableForm.validate(async (valid) => {
          if (valid) {
            this.tableLoading = true
            const req = {
              bankInfoSaveDTOList: this.tableListData,
              step: 'register'
            }
            if (this.supplierType > 3) {
              req.step = 'submit'
            }
            if (step !== '') {
              req.step = step
            }
            const res = await saveSupplierBank(req, this.supplierType)
            this.resultMessage(res, () => {
              this.tableLoading = false
              this.nextStep = true
              resolve(true)
            }, () => {
              this.tableLoading = false
              this.nextStep = false
              reject(false)
            })
          } else {
            this.tableLoading = false
            return false
          }
        })
      })
    },
    async handleNextStep() {
      await this.saveInfos()
      return this.nextStep
    }
  }
}
</script>

<style scoped>

</style>