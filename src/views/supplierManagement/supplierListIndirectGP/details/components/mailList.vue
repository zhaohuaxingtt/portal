<template>
  <iCard :title="$t('联系人')">
    <template slot="header-control">
      <iButton :loading="loading" v-permission="SUPPLIER_INDIRECT_BASEINFO_MAIL_EXPORT" v-if="this.$route.query.subSupplierId" @click="exportsTable">
        {{ $t('LK_DAOCHU') }}
      </iButton>
    </template>
    <table-list
      :tableData="tableListData"
      :tableTitle="tableTitle"
      :tableLoading="tableLoading"
      @handleSelectionChange="handleSelectionChange"
      :index="true"
      ref="commonTable"
      border
    >
      <template slot="nameZh" slot-scope="scope">
        <iInput :disabled="!canEdit"
          :placeholder="$t('LK_QINGSHURU')"
          v-model="scope.row.nameZh"
        ></iInput>
      </template>
      <template slot="designation" slot-scope="scope">
        <iInput :disabled="!canEdit"
          :placeholder="$t('LK_QINGSHURU')"
          v-model="scope.row.designation"
        ></iInput>
      </template>
      <template slot="dept" slot-scope="scope">
        <iInput :disabled="!canEdit"
          :placeholder="$t('LK_QINGSHURU')"
          v-model="scope.row.dept"
        ></iInput>
      </template>
      <template slot="telephoneAreaCode" slot-scope="scope">
        <iInput :disabled="!canEdit"
          :placeholder="$t('LK_QINGSHURU')"
          v-model="scope.row.telephoneAreaCode"
        ></iInput>
      </template>
      <template slot="telephone" slot-scope="scope">
        <iInput :disabled="!canEdit"
          :placeholder="$t('LK_QINGSHURU')"
          v-model="scope.row.telephone"
        ></iInput>
      </template>
      <template slot="email" slot-scope="scope">
        <iInput :disabled="!canEdit"
          :placeholder="$t('LK_QINGSHURU')"
          v-model="scope.row.email"
        ></iInput>
      </template>
      <template slot="remark" slot-scope="scope">
        <iInput :disabled="!canEdit"
          :placeholder="$t('LK_QINGSHURU')"
          v-model="scope.row.remark"
        ></iInput>
      </template>
    </table-list>
  </iCard>
</template>

<script>
import { iButton, iCard, iInput, iMessage } from 'rise'
import { tableTitle } from './data'
import tableList from '@/components/commonTable'
import { exportSupplierUser } from '@/api/supplierManagement/supplierListIndirect/index'

export default {
  props: {
    mailListData: {
      type: Object,
      default: () => []
    },
    supplierData: {
      type: Object,
      default: () => {}
    },
    canNotEdit: {
      type: Boolean,
      default: false
    },
  },
  components: {
    iCard,
    iButton,
    tableList,
    iInput
  },
  data() {
    return {
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectData: [],
      loading:false,
    }
  },
  watch: {
    mailListData: {
      handler(val) {
        this.tableListData = val || []
      },
      deep: true,
      immediate: true
    }
  },
  computed:{
    // 注册时可以编辑
    canEdit(){
      // 注册状态，不是gp供应商时，可以编辑用户信息
      let hasGpDetails = this.supplierData.gpSupplierDetails && this.supplierData.gpSupplierDetails.length==1
      if(this.$route.query.supplierToken){
        let isPD = this.supplierData.supplierDTO.supplierType == 'PD'
        if(isPD && hasGpDetails && this.supplierData.gpSupplierDetails[0].businessType==4){
          return true
        }
        return !this.canNotEdit
      }else{
        let isGP = this.supplierData.supplierDTO.supplierType == 'GP'
        if(isGP && hasGpDetails){
          return false
        }else{
          return true
        }
      }
    }
  },
  methods: {
    // 新增
    add() {
      this.tableListData.push({})
    },
    // 删除
    del() {
      if (!this.selectData.length) return iMessage.warn('请选择需要删除的数据')
      let tableData = []
      let indexList = this.selectData.map((item) => item.index)
      this.tableListData.forEach((item, index) => {
        if (!indexList.includes(index)) {
          tableData.push(item)
        }
      })
      this.tableListData = tableData
    },
    // 导出
    exportsTable() {
        this.loading = true
        exportSupplierUser(this.$route.query.subSupplierId).then(res=>{

        }).finally(()=>{
            this.loading = false
        })
    },
    // 选中
    handleSelectionChange(val) {
      this.selectData = val
    }
  }
}
</script>

<style>
</style>