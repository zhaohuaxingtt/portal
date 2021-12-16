<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditors: zbin
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ws3\generalPage\mainSubSuppliersAndProductNames\index.vue
-->
<template>
  <i-card collapse :title="language('LIANXIREN', '联系人')">
    <div v-if="editable" class="full-table-form">
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
    </div>

    <iTableCustom
      v-else
      :data="tableListData"
      :columns="contactsViewSettings"
    />
  </i-card>
</template>

<script>
import { iCard } from 'rise'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import { supplierDirectoryTableTitle, CONTACTS_VIEW_SETTINGS } from './data'
import iTableCustom from '@/components/iTableCustom'
export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    tableList,
    iTableCustom
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
      selectTableData: [],
      contactsViewSettings: CONTACTS_VIEW_SETTINGS
    }
  }
}
</script>

<style scoped></style>
