<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <i-button @click="exportsTable" v-permission="SUPPLIER_GOVERNANCE_TABLE_EXPORT">{{ $t('LK_DAOCHU') }}</i-button>
      </div>
    </div>
    <!-- v-permission="SUPPLIER_GOVERNANCE_TABLE" -->
    <table-list
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :index="true"
    />
  </iCard>
</template>

<script>
import {iCard, iButton} from "rise";
import tableList from '@/components/commonTable';
import {staffTableTitle} from './data';
import {generalPageMixins} from '@/views/generalPage/commonFunMixins';
import {getMainManagerListView} from '../../../../api/supplier360/governance'

export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    tableList
  },
  data() {
    return {
      tableListData: [],
      tableTitle: staffTableTitle,
      tableLoading: false,
      selectTableData: []
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    async getTableList() {
      this.tableLoading = true
      try {
        const req = {
          pageNo: 1,
          pageSize: 9999
        }
        const res = await getMainManagerListView(req)
        this.tableListData = res.data
        this.tableLoading = false
      } catch {
        this.tableLoading = false
      }
    }
  }
}
</script>

<style scoped>

</style>