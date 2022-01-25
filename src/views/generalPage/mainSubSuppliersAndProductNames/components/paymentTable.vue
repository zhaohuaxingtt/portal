<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2021-04-13 17:30:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ws3\generalPage\mainSubSuppliersAndProductNames\index.vue
-->
<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ $t('SUPPLIER_FUKUANQINGKUANG') }}</span>
      <div class="floatright">
        <i-button @click="addTableItem" v-permission="SUPPLIER_SUBSUPPLIERANDPRODUCT_PAY_TABLE_ADD">{{
            $t('LK_XINZENG')
          }}
        </i-button>
        <i-button @click="deleteItem('ids', deleteSupplierPay)"
                  v-permission="SUPPLIER_SUBSUPPLIERANDPRODUCT_PAY_TABLE_DELETE">{{ $t('delete') }}
        </i-button>
        <i-button @click="exportsTable" v-permission="SUPPLIER_SUBSUPPLIERANDPRODUCT_PAY_TABLE_EXPORT">{{
            $t('LK_DAOCHU')
          }}
        </i-button>
      </div>
    </div>
    <!-- v-permission="SUPPLIER_SUBSUPPLIERANDPRODUCT_PAY_TABLE" -->
    <table-list
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :input-props="inputProps"
        :index="true"
    />
  </i-card>
</template>

<script>
import { iCard, iButton } from 'rise'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import { paymentTableTitle } from './data'
import {
  getSupplierPay,
  saveSupplierPay,
  deleteSupplierPay
} from '../../../../api/register/mainSubSuppliersAndProductNames'

export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    tableList
  },
  data () {
    return {
      tableListData: [],
      tableTitle: paymentTableTitle,
      tableLoading: false,
      selectTableData: [],
      inputProps: []
    }
  },
  created () {
    this.setInputProps()
    this.getTableList()
  },
  methods: {
    deleteSupplierPay,
    setInputProps () {
      this.inputProps = this.tableTitle.map(item => {
        return item.props
      })
    },
    async getTableList () {
      this.tableLoading = true
      try {
        const req = {
          pageNo: 1,
          pageSize: 9999,
          step: 'submit'
        }
        const res = await getSupplierPay(req)
        this.tableListData = res.data
        this.tableLoading = false
      } catch {
        this.tableLoading = false
      }
    },
    async saveInfos (step = '') {
      this.tableLoading = true
      const req = {
        list: this.tableListData,
        step: 'submit'
      }
      if (step !== '') {
        req.step = step
      }
      const res = await saveSupplierPay(req)
      res.moduleName = this.$t('SUPPLIER_FUKUANQINGKUANG')
      this.resultMessage(res, () => {
        this.nextStep = true
        this.getTableList()
      }, () => {
        this.tableLoading = false
      })
    },
    async handleNextStep () {
      await this.saveInfos()
      return this.nextStep
    }
  }
}
</script>

<style scoped>

</style>
