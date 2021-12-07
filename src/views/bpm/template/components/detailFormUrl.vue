<template>
  <iDialog
    title="选择表单地址"
    :visible.sync="dialogFormVisible"
    @close="onClose"
  >
    <div class="select-table">
      <i-table-custom
        :loading="tableLoading"
        :data="formUrlData"
        :columns="formUrlColumns"
        @handle-selection-change="handleSelectionChange"
        @handle-select-url="handleSelectUrl"
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
    </div>
    <!-- 
    <div slot="footer" class="dialog-footer">
      <iButton type="info" @click="onClose">
        {{ language('取消') }}
      </iButton>
      <iButton type="primary" @click="recall">
        {{ language('确定') }}
      </iButton>
    </div> -->
  </iDialog>
</template>

<script>
import { iDialog } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { formUrlColumns } from './data'
import { pageMixins } from '@/utils/pageMixins'
import { queryFormUrls } from '@/api/approval'
export default {
  name: 'recallDialog',
  components: { iDialog, iTableCustom },
  mixins: [pageMixins],
  props: {
    instanceId: {
      type: String,
      require: true
    },
    visible: {
      type: Boolean,
      default: false,
      require: true
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      formUrlColumns,
      formUrlData: [],
      tableLoading: false,
      loading: false
    }
  },
  created() {
    this.dialogFormVisible = this.visible
    this.getTableList()
  },
  methods: {
    //表格选中值集
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    //打开详情页
    handleTableClick(item) {
      this.$router.push({
        name: 'myApprovalDetail',
        params: {
          instanceId: item.instanceId,
          pageType: 'approval',
          taskId: item.taskId
        }
      })
    },
    getTableList() {
      this.loading = true
      const data = {
        ...this.form,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        taskId: 'formUrl'
      }
      queryFormUrls(data)
        .then((res) => {
          this.formUrlData = res.data
          this.page.currPage = res.pageNum
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleSelectUrl(val) {
      console.log('handleSelectUrl', val)
      this.$emit('handle-select-url', val)
    },
    onSelect() {
      this.$emit('success')
    },
    onClose() {
      this.$emit('close')
    }
  },
  watch: {
    visible(val) {
      this.dialogFormVisible = val
    }
  }
}
</script>

<style lang="scss" scoped>
.select-table {
  padding-bottom: 30px;
}
</style>
