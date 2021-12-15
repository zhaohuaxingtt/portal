<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditors: zbin
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ws3\generalPage\mainSubSuppliersAndProductNames\index.vue
-->
<template>
  <i-card collapse :title="language('LIANXIREN', '联系人')">
    <table-list
      ref="commonTable"
      :tableData="tableListData"
      :tableTitle="tableTitle"
      :tableLoading="tableLoading"
      @handleSelectionChange="handleSelectionChange"
      :input-props="[
        'name',
        'position',
        'dept',
        'telephoneAreaCode',
        'telephoneM',
        'email'
      ]"
      :index="true"
    >
    </table-list>
  </i-card>
</template>

<script>
import { iCard, iButton } from 'rise'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import { supplierDirectoryTableTitle } from './data'
export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    tableList
  },
  props: {
    tableListData: {
      type: Object,
      default: () => []
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableTitle: supplierDirectoryTableTitle,
      tableLoading: false,
      selectTableData: []
    }
  }
}
</script>

<style scoped></style>
