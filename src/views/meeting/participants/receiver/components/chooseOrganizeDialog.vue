<template>
  <iDialog
    :title="$t('MT_XUANZEZUZHI')"
    :visible.sync="openOrganizeDialog"
    width="54.875rem"
    :close-on-click-modal="false"
    @close="close"
  >
    <div class="searchReceiver">{{ $t('MT_SOUSUOZUZHI') }}</div>
    <iInput suffix-icon="el-icon-search" v-model="search" @change="change">
    </iInput>
    <div class="receiver">{{ $t('MT_ZUZHI') }}</div>
    <i-table-custom
      :loading="!tableLoading"
      :data="tableData"
      :columns="chooseOrganizeTableColumns"
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
      :prev-text="$t('MT_SHANGYIYE')"
      :next-text="$t('MT_XIAYIYE')"
    />
    <div class="button-list">
      <iButton @click="close" plain class="cancel">{{
        $t('MT_QUXIAO')
      }}</iButton>
      <iButton
        @click="$emit('handleChoose', selectedTableData, status)"
        plain
        :disabled="selectedTableData.length == 0"
        >{{ $t('MT_QUEREN') }}</iButton
      >
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iPagination, iButton, iInput } from 'rise'
// import { getUsers } from "@/api/meeting/type";
import { getPageListByParams } from '@/api/usercenter'
import { chooseOrganizeTableColumns } from './data'
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
    openOrganizeDialog: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    status: {
      type: String,
      default: () => {
        return 'add'
      }
    }
  },
  data() {
    return {
      tableLoading: false,
      chooseOrganizeTableColumns,
      search: '',
      selectedTableData: [],
      // data: this.tableData,
      tableData: [],
      tableDataAll: []
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
      this.$emit('closeChooseDialog', false, this.status)
    },
    // 表格选中值集
    handleSelectionChange(val) {
      this.selectedTableData = val.map((item) => {
        return {
          ...item,
          isDept: true
        }
      })
    },
    query(val) {
      let data = {}
      if (val) {
        data = {
          current: this.page.currPage,
          size: this.page.pageSize,
          deptInfo: val
        }
      } else {
        data = {
          current: this.page.currPage,
          size: this.page.pageSize
        }
      }

      getPageListByParams(data)
        .then((res) => {
          const { data, pageNum, pageSize, total, pages } = res
          this.page.currPage = pageNum
          this.page.pageSize = pageSize
          this.page.totalCount = total
          this.page.pages = pages
          this.tableData = [...data]
          this.tableDataAll = [...data]
          this.tableLoading = true
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
