<template>
  <iCard>
    <div class="flex-end-center margin-bottom20">
      <iButton @click="add">
        {{ language('新建') }}
      </iButton>
      <iButton @click="changeStatus" :disabled="selectedRows.length === 0">
        {{ language('失效') }}
      </iButton>
      <!-- <iButton :loading="downloadTemplateLoading" @click="downloadTemplate">
        {{ language('下载车型产量计划模版') }}
      </iButton> -->
      <button-download :download-method="downloadTemplate">
        {{ language('下载车型产量计划模版') }}
      </button-download>
      <el-upload
        action="1"
        :show-file-list="false"
        with-credentials
        :http-request="importData"
        accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      >
        <iButton
          type="default"
          :loading="uploadLoading"
          size="small"
          class="btn-upload"
        >
          <span>
            {{ language('导入车型产量计划') }}
          </span>
        </iButton>
      </el-upload>

      <button-download :download-method="exportExcel" />
    </div>

    <i-table-custom
      :loading="tableLoading"
      :data="tableData"
      :columns="tableColumns"
      min-height="328px"
      @go-detail="handleGoDetail"
      @handle-selection-change="handleSelectionChange"
    />

    <iPagination
      v-update
      @size-change="handleSizeChange($event, query)"
      @current-change="handleCurrentChange($event, query)"
      background
      :current-page="page.currPage"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :total="page.totalCount"
    />
  </iCard>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import { iCard, iPagination, iButton, iMessage } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { CAR_COLUMNS } from './data'
import {
  fetchCarList,
  exportCarPlanTemplate,
  exportCarList,
  uploadCarPlan,
  batchUpdate
} from '@/api/mainData/car'
import { openUrl, filterEmptyValue } from '@/utils'

export default {
  name: 'datatable',
  components: { iTableCustom, iCard, iPagination, iButton },
  mixins: [pageMixins],
  props: {
    filterForm: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  watch: {
    filterForm() {
      this.search()
    }
  },
  data() {
    return {
      tableData: [],
      tableLoading: false,
      tableColumns: CAR_COLUMNS,
      selectedRows: [],
      importLoading: false,
      uploadLoading: false
    }
  },
  created() {
    this.page.pageSizes = [10, 20, 50, 100, 200, 300]
    this.query()
  },
  methods: {
    add() {
      openUrl('/main-data/car/detail')
    },
    changeStatus() {
      this.$confirm('是否确认失效此项', '注意', {
        confirmButtonText: this.language('APPROVAL.OK'),
        cancelButtonText: this.language('APPROVAL.CANCEL'),
        type: 'warning'
      }).then(() => {
        const reqData = []
        this.selectedRows.forEach(e => {
          reqData.push({
            cartypeId: e.id,
            valid: false
          })
        })
        batchUpdate(reqData)
          .then(res => {
            if (res.result) {
              this.query()
              iMessage.success('设置成功')
            } else {
              iMessage.error('设置失败')
            }
          })
          .catch(() => {
            iMessage.error('设置失败')
          })
      })
    },
    importData(content) {
      this.uploadLoading = true
      let formData = new FormData()
      formData.append('file', content.file)
      formData.append('currentUserId', this.$store.state.permission.userInfo.id)
      uploadCarPlan(formData)
        .then(res => {
          if (res.result) {
            iMessage.success(res.desZh || '导入成功')
          } else {
            iMessage.error(res.desZh || '导入失败')
          }
        })
        .catch(err => {
          console.log(err)
          iMessage.error(err.desZh || this.language('LK_SHANGCHUANSHIBAI'))
        })
        .finally(() => {
          this.uploadLoading = false
        })
    },
    exportExcel() {
      this.exportLoading = true
      const reqData = filterEmptyValue(this.filterForm)
      return exportCarList(reqData)
    },
    search() {
      this.page.currPage = 1
      this.page.totalCount = 0
      this.query()
    },
    async query() {
      const requestData = {
        ...this.filterForm,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      this.tableLoading = true
      const res = await fetchCarList(requestData).finally(
        () => (this.tableLoading = false)
      )
      this.tableData = res.data || []
      this.page.totalCount = res.total
      this.page.pageSize = res.pageSize
    },
    //表格选中值集
    handleSelectionChange(val) {
      this.selectedRows = val
    },
    handleGoDetail(row) {
      openUrl('/main-data/car/detail?id=' + row.id)
    },
    // 下载模板
    downloadTemplate() {
      return exportCarPlanTemplate()
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-upload {
  margin: 0px 10px;
}
</style>
