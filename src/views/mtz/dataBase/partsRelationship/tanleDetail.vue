<template>
  <div class="partNumberPage">
    <div class="export"><iButton @click="exportAll">导出</iButton></div>
    <tableList
      ref="commonTable"
      :tableData="tableInfo"
      :tableTitle="tableTitle"
      :index="true"
    />
  </div>
</template>

<script>
import { iInput, iButton, iPagination } from 'rise'
import { tableDetail } from './data'
import { excelExport } from '@/utils/filedowLoad'
import tableList from '@/components/commonTable'
export default {
  components: {
    iInput,
    iButton,
    iPagination,
    tableList
  },
  props: {
    tableInfo: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableTitle:tableDetail,
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      console.log(this.tableInfo)
    },
    exportAll() {
      excelExport(this.tableInfo, this.tableTitle,'错误列表')
    }
  }
}
</script>

<style lang="scss" scoped>
.partNumberPage {
  padding-bottom: 20px;
  .export {
    margin-bottom: 20px;
    padding-top: 20px;
    border-top: 1px solid #e3e3e3;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
