<!--
* @author:shujie
* @Date: 2021-4-13 17:23:55
* @Description: 主要业务及产品
 -->
<template>
  <div>
    <base-info-card/>
    <iCard class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <iButton @click="addTableItem"  v-permission="SUPPLIER_MAINPRODUCT_TABLE_ADD">
            {{ $t('LK_XINZENG') }}
          </iButton>
          <iButton @click="deleteItem('idList', deleteSupplierProduct)" v-permission="SUPPLIER_MAINPRODUCT_TABLE_DELETE">
            {{ $t('delete') }}
          </iButton>
          <iButton @click="exportsTable"  v-permission="SUPPLIER_MAINPRODUCT_TABLE_EXPORT">
            {{ $t('LK_DAOCHU') }}
          </iButton>
        </div>
      </div>
      <table-list
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
          :input-props="inputProps"
          :index="true"
          v-permission="SUPPLIER_MAINPRODUCT_TABLE"
          ref="commonTable"
      >
        <template #deliveryStartDate="scope">
          <iDatePicker
              value-format="yyyy-MM-dd"
              type="date"
              :placeholder="$t('SUPPLIER_XUANZERQI')"
              v-model="scope.row.deliveryStartDate"/>
        </template>
        <template #deliveryYear="scope">
          <iDatePicker
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
import {tableTitle} from './data'
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
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: [],
      inputProps: []
    }
  },
  created() {
    this.setInputProps()
    this.getTableList()
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
    },
    async handleNextStep() {
      return await this.saveInfos()
    }
  }
}
</script>

<style scoped>

</style>
