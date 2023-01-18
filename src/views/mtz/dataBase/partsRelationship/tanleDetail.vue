<template>
  <div class="partNumberPage">
    <div class="export"><iButton @click="exportAll">导出</iButton></div>
    <tableList
      ref="commonTable"
      :tableData="tableInfo"
      :tableTitle="tableDetail"
      :index="true"
    />
  </div>
</template>

<script>
import { iInput, iButton, iPagination } from 'rise'
import { tableDetail } from './data'

import {
  partsRelationshipDetailFormData,
  partsRelationshipDetailTableSetting
} from './data'
import { pageMixins } from '@/utils/pageMixins'
import { excelExport } from '@/utils/filedowLoad'
import {
  partPageByBomInfoId,
  partExportByBomInfoId
} from '@/api/mtz/database/partsQuery'
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
      type: Object
    }
  },
  mixins: [pageMixins],
  data() {
    return {

    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
    },
    exportAll() {
      excelExport(this.tableInfo, '错误列表')
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
