<template>
  <iCard :title="$t('联系人')">
    <template slot="header-control">
      <iButton @click="add">
        {{ $t('新增') }}
      </iButton>
      <iButton @click="del">
        {{ $t('删除') }}
      </iButton>
      <iButton :loading="loading" v-if="this.$route.query.subSupplierId" @click="exportsTable">
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
      <template #contactTypeDesc="scope">
        <div>
          {{ scope.row.contactTypeDesc
          }}<span
            v-if="scope.row.contactTypeDesc == '商务联系人'"
            style="color: red"
            >*</span
          >
        </div>
      </template>
      <template slot="nameZh" slot-scope="scope">
        <iInput
          :placeholder="$t('LK_QINGSHURU')"
          v-model="scope.row.nameZh"
        ></iInput>
      </template>
      <template slot="designation" slot-scope="scope">
        <iInput
          :placeholder="$t('LK_QINGSHURU')"
          v-model="scope.row.designation"
        ></iInput>
      </template>
      <template slot="dept" slot-scope="scope">
        <iInput
          :placeholder="$t('LK_QINGSHURU')"
          v-model="scope.row.dept"
        ></iInput>
      </template>
      <template slot="telephoneAreaCode" slot-scope="scope">
        <iInput
          :placeholder="$t('LK_QINGSHURU')"
          v-model="scope.row.telephoneAreaCode"
        ></iInput>
      </template>
      <template slot="telephone" slot-scope="scope">
        <iInput
          :placeholder="$t('LK_QINGSHURU')"
          v-model="scope.row.telephone"
        ></iInput>
      </template>
      <template slot="email" slot-scope="scope">
        <iInput
          :placeholder="$t('LK_QINGSHURU')"
          v-model="scope.row.email"
        ></iInput>
      </template>
      <template slot="remark" slot-scope="scope">
        <iInput
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
import { contactExport } from "@/api/mainDataSupplier/list/contacts.js"

export default {
  props: {
    supplierData: {
      type: Object,
      default: () => []
    }
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
    supplierData: {
      handler(val) {
        this.tableListData = val || []
      },
      deep: true,
      immediate: true
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
        contactExport(this.$route.query.subSupplierId).then(res=>{

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