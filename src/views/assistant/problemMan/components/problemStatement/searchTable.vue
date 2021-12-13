<template>
  <el-card class="mt20">
    <div class="flex flex-row justify-end mt20 mb20">
      <iButton @click="exportExcelHandler">{{ language('导出') }}</iButton>
    </div>
    <iTableCustom ref="testTable" :loading="tableLoading" :data="tableListData" :columns="tableSetting" @quesDetail="quesDetail" @mauDetail="mauDetail" />
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :current-page="page.currPage" :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :total="page.totalCount" />
  </el-card>
</template>

<script>
import { iButton, iPagination, iTableCustom } from 'rise';
import { tableColumn, manualTableColumn } from './tableColumn';
import { pageMixins } from '@/utils/pageMixins';
import { openUrl } from '@/utils'

export default {
  mixins: [pageMixins],
  props: {
    tableListData:{
      type:Array,
      default:() => [],
    },
    total: {
      type:Number,
      default:0,
    },
    userType: {
      type: String,
      default:() => '',
    }
  },
  data () {
    return {
      tableLoading: false,
      exportLoading: false,
      tableSetting: this.userType === 'supplier' ? tableColumn(this): manualTableColumn(this)
    }
  },
  created() {
    this.page.totalCount = this.total;
  },
  methods: {
    getTableList (pages) { 
      this.$emit('changePage',pages);
    },
    handleSizeChange(val, callback) {
      console.log(val, callback)
      if (typeof callback != 'function')
        return console.warn(
          'function handleSizeChange parmars must be a function!'
        )
      this.page.pageSize = val;
      this.page.currPage = 1;
      callback(this.page)
    },
    handleCurrentChange(val, callback) {
      if (typeof callback != 'function')
        return console.warn(
          'function handleCurrentChange parmars must be a function!'
        )
      this.page.currPage = val
      callback(this.page)
    },
    // 导出
    exportExcelHandler() {
      this.$emit('exportHandler');
    },
    // 点击去问题详情
    quesDetail(val) {
      console.log(val, "000")
      openUrl(`/assistant/helpCenter?module=problem&currentMoudleId=${val.questionModuleId}&currMoudleName=${val.questionModuleName}&labelIdx=${val.questionLableId}&id=${val.id}`)
    },
    mauDetail(val) {
      console.log(val, "000")
      openUrl(`/assistant/problemMan?module=problemHandler&questionStatus=${val.questionStatus}&questionTitle=${val.questionTitle}&source=${val.source}`)
    }
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


<style lang="scss">
.table-icon {
  display: flex;
  flex-direction: row;
  .icon {
    margin-right: 20px;
    width: 36px;
    height: 36px;
    background-size: contain;
    background-repeat: no-repeat;
    &.first {
      background-image: url('~@/assets/images/icon/first.png');
    }
    &.second {
      background-image: url('~@/assets/images/icon/second.png');
    }
    &.third {
      background-image: url('~@/assets/images/icon/third.png');
    }
  }
}
.question-title {
  color: #1660F1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.handlerUserName {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>