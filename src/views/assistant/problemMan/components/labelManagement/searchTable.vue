<template>
  <el-card class="mt20">
    <div class="flex flex-row justify-end mt20 mb20 flex-end-center">
      <iButton @click="addHandler">{{ language('新建标签') }}</iButton>
      <iButton @click="delHandler" :disabled="selectedItems.length == 0">{{
        language('删除')
      }}</iButton>
      <button-table-setting @click="$refs.testTable.openSetting()" />
    </div>

    <iTableCustom
      ref="testTable"
      :loading="tableLoading"
      :data="tableListData"
      :columns="tableSetting"
      :pemission-key="'ADMIN_PROCS_PROB_labelManagement_' + type"
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
    <addLabelDialog
      :moduleList="moduleList"
      v-if="showDialog"
      :show.sync="showDialog"
      @refresh="getTableList"
      :type="type"
    />
  </el-card>
</template>

<script>
import { iButton, iPagination, iTableCustom } from 'rise'
import { tableColumn } from './tableColumn'
import { pageMixins } from '@/utils/pageMixins'
import AddLabelDialog from './addLabelDialog'
import {
  removeLabel,
  queryLabelByPage,
  queryProCsUserList
} from '@/api/assistant'

export default {
  components: {
    iButton,
    iPagination,
    iTableCustom,
    AddLabelDialog
  },
  mixins: [pageMixins],
  props: {
    type: {
      type: String,
      default: ''
    },
    moduleList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableLoading: false,
      exportLoading: false,
      tableListData: [],
      tableSetting: [],
      showDialog: false,
      selectedItems: [],
      searchContent: {},
      userList: {}
    }
  },
  async mounted() {
    this.getTableList()
    let { data } = await queryProCsUserList()
    data.forEach((e) => {
      this.userList[e.id] = e
    })
  },
  watch: {
    moduleList(n) {
      let m = {}
      n.forEach((e) => {
        m[e.id] = e
      })
      this.tableSetting = tableColumn(m)
    }
  },
  methods: {
    queryUsers() {},
    handleSelectionChange(val) {
      this.selectedItems = val
    },
    addHandler() {
      this.showDialog = true
    },
    delHandler() {
      this.$confirm('是否删除已选中选项', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let ids = this.selectedItems.map((e) => e.id)
          await removeLabel(ids)
          this.getTableList()
        })
        .catch(() => {
          this.$refs.testTable.clearSelection()
        })
    },
    async getTableList() {
      this.tableLoading = true
      try {
        let data = {
          ...this.searchContent,
          pageNum: this.page.currPage,
          pageSize: this.page.pageSize,
          source: this.type
        }
        let res = await queryLabelByPage(data)
        if (res.code == 200) {
          this.tableListData = res.data.records || []
          this.page.totalCount = res.data.total
        }
      } finally {
        this.tableLoading = false
      }
    },
    search(val) {
      this.page.currPage = 1
      this.page.totalCount = 0
      this.searchContent = val
      this.getTableList()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../comon.scss';
</style>
