<template>
  <iDialog
    :title="$t('选择收件人')"
    :visible.sync="openReceiverDialog"
    width="54.875rem"
    :close-on-click-modal="false"
    @close="close"
  >
    <div class="searchReceiver">{{ $t('搜索收件人') }}</div>
    <iInput suffix-icon="el-icon-search" v-model="search" @change="change">
    </iInput>
    <div class="receiver">{{ $t('收件人') }}</div>
    <i-table-custom
      @editReceiver="editReceiver"
      :data="tableData"
      :columns="chooseReceiverTableColumns"
      @handle-selection-change="handleSelectionChange"
    />
    <iPagination
      v-update
      @size-change="handleSizeChange($event, query)"
      @current-change="handleCurrentChange($event, query)"
      :current-page="page.currPage"
      :page-sizes="page.pages"
      :page-size="page.pageSize"
      layout="prev, pager, next, jumper"
      :total="page.totalCount"
      pager-count="3"
      background
      :prev-text="$t('上一页')"
      :next-text="$t('下一页')"
    />
    <div class="button-list">
      <iButton @click="close" plain class="cancel">{{ $t('取消') }}</iButton>
      <iButton
        @click="$emit('handleChooseReceiver', selectedTableData)"
        plain
        :disabled="selectedTableData.length == 0"
        >{{ $t('确认') }}</iButton
      >
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iPagination, iButton, iInput } from 'rise'
// import { getUsers } from "@/api/meeting/type";
import { getPageListByParam } from '@/api/usercenter/receiver.js'
import { chooseReceiverTableColumns } from './data'
import { pageMixins } from '@/utils/pageMixins'
import iTableCustom from '@/components/iTableCustom'
export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iPagination,
    iButton,
    iTableCustom,
    iInput
  },
  props: {
    loading: { type: Boolean, default: false },
    openReceiverDialog: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      chooseReceiverTableColumns,
      search: '',
      selectedTableData: [],
      // data: this.tableData,
      tableData: '',
      tableDataAll: ''
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    handleSizeChange(e, q) {
      console.log(e, q)
    },
    handleCurrentChange(e) {
      this.page.currPage = e
      this.query(this.search)
    },
    change(val) {
      this.search = val
      this.page.currPage = 1
      this.query(val)
    },

    close() {
      this.$emit('closeChooseDialog', false)
    },
    // 表格选中值集
    handleSelectionChange(val) {
      this.selectedTableData = val
    },
    query(val) {
      let data = {}
      if (val) {
        data = {
          current: this.page.currPage,
          size: this.page.pageSize,
          nameZh: val
        }
      } else {
        data = {
          current: this.page.currPage,
          size: this.page.pageSize
        }
      }

      getPageListByParam(data)
        .then((res) => {
          const { data, pageNum, pageSize, total, pages } = res
          this.page.currPage = pageNum
          this.page.pageSize = pageSize
          this.page.totalCount = total
          this.page.pages = pages
          this.tableData = [...data]
          this.tableDataAll = [...data]
        })
        .catch(() => {
          this.tableLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.button-list {
  display: flex;
  height: 60px;
  justify-content: flex-end;
  align-items: center;
  .el-form-item {
    margin-bottom: 15px;
    .el-button {
      height: 35px;
      width: 100px;
    }
    .cancel {
      margin-left: 20px;
    }
  }
}
.searchReceiver {
  margin-bottom: 10px;
}
.receiver {
  margin-top: 20px;
  margin-bottom: 10px;
}
::v-deep .el-pagination {
  white-space: wrap !important;
}
</style>
