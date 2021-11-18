<template>
  <el-card>
    <div class="flex flex-row justify-end mt20 mb20">
      <iButton @click="editHandler">{{ language('编辑') }}</iButton>
    </div>
    <iTableCustom
      ref="testTable"
      :loading="tableLoading"
      :data="tableListData"
      :columns="tableSetting"
      @go-detail="handleGoDetail"
      @handle-selection-change="handleSelectionChange"
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
import {iPagination,iTableCustom,iButton} from 'rise';
import {tableColumn} from './tableColumn';
import { pageMixins } from '@/utils/pageMixins'
export default {
  mixins: [pageMixins],
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      tableLoading: true,
      exportLoading: false,
      tableListData: [
        {
          id: 1,
          account:1234,
        }
      ],
      tableSetting:tableColumn(this),
    }
  },
  methods: {
    handleGoDetail() {},
    handleSelectionChange() {},
    editHandler() {},
  },
  mounted() {
    console.log(this.type);
    setTimeout(() => {
      this.tableLoading= false;
    },1000);
  },
  components: {
    iPagination,
    iTableCustom,
    iButton
  }
}
</script>

<style lang="scss" scoped>
@import '../../../comon.scss';
</style>