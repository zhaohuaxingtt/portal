<template>
  <el-card class="mt20">
    <div class="flex flex-row justify-end mt20 mb20">
      <iButton @click="exportExcelHandler">{{ language('导出') }}</iButton>
    </div>
    <iTableCustom
      ref="testTable"
      :loading="tableLoading"
      :data="tableListData"
      :columns="tableSetting"
    />
    <iPagination
      v-update
      @size-change="handleSizeChange($event, getTableList)"
      @current-change="handleCurrentChange($event, getTableList)"
      background
      :current-page="page.currPage"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :total="page.totalCount"
    />
  </el-card>
</template>

<script>
import {iButton,iPagination,iTableCustom} from 'rise';
import {tableColumn} from './tableColumn';
import { pageMixins } from '@/utils/pageMixins'
export default {
  mixins: [pageMixins],
  data () {
    return {
      tableLoading: false,
      exportLoading: false,
      tableListData: [
        {
          id: 1,
          account:1234,
        }
      ],
      tableSetting:tableColumn,
    }
  },
  methods: {
    exportExcelHandler() {},
    handleSelectionChange() {
      console.log('11');
    },
    handleGoDetail() {},
  },
  components: {
    iButton,
    iPagination,
    iTableCustom
  }
}
</script>

<style lang="scss" scoped>
@import '../../../comon.scss';
</style>