<!--
* @author:moxuan
* @Date: 2021-4-21 17:23:55
* @Description: 主要客户
 -->
<template>
  <div>
    <base-info-card/>
    <iCard class="margin-top20" :title="$t('SUPPLIER_ZHUYAOKEHU')" tabCard>
      <template slot="header-control" v-if="$route.query.subSupplierType!=='GP'">
        <iButton @click="addTableItem"  v-permission="SUPPLIER_NAMEOFCUSTOMERS_ADD">{{ $t('LK_XINZENG') }}
        </iButton>
        <iButton @click="deleteItem('ids', deleteMainCustomer)" v-permission="SUPPLIER_NAMEOFCUSTOMERS_DELETE">
          {{ $t('delete') }}
        </iButton>
        <iButton @click="exportsTable"  v-permission="SUPPLIER_NAMEOFCUSTOMERS_EXPORT">
          {{ $t('LK_DAOCHU') }}
        </iButton>
      </template>
      <template slot="header-control" v-if="$route.query.subSupplierType=='GP'">
        <iButton @click="addTableItem"  v-permission="SUPPLIER_NAMEOFCUSTOMERS_ADD_GP">{{ $t('LK_XINZENG') }}
        </iButton>
        <iButton @click="deleteItem('ids', deleteMainCustomer)" v-permission="SUPPLIER_NAMEOFCUSTOMERS_DELETE_GP">
          {{ $t('delete') }}
        </iButton>
        <iButton @click="saveTable"  v-permission="SUPPLIER_NAMEOFCUSTOMERS_SAVE_GP">{{ $t('LK_BAOCUN') }}
        </iButton>
        <iButton @click="exportsTable"  v-permission="SUPPLIER_NAMEOFCUSTOMERS_EXPORT_GP">
          {{ $t('LK_DAOCHU') }}
        </iButton>
      </template>
      <!-- v-permission="SUPPLIER_NAMEOFCUSTOMERS_TABLE" -->
      <table-list
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
          :input-props="inputProps"
          :index="true"
          ref="commonTable"
          border
      />
    </iCard>
    <remark-content
        class="margin-top20"
    />
  </div>
</template>

<script>
import {iCard, iButton} from "rise";
import {generalPageMixins} from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import {tableTitle} from './data'
import {getMainCustomer, saveMainCustomer, deleteMainCustomer} from '@/api/register/customer'
import baseInfoCard from '@/views/generalPage/components/baseInfoCard'
import remarkContent from './remarkContent'


export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    tableList,
    baseInfoCard,
    remarkContent
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
    saveTable(){
      this.saveInfos()
    },
    deleteMainCustomer,
    setInputProps() {
      this.inputProps = this.tableTitle.map(item => {
        return item.props
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
        const res = await getMainCustomer(req)
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
              mainCustomerDTOList: this.tableListData,
              step: 'submit'
            }
            if (step !== '') {
              req.step = step
            }
            const res = await saveMainCustomer(req)
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
