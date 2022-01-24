<template>
  <iCard>
    <div class="flex-end-center margin-bottom20">
      <iButton @click="add" xxx-permission="'BUTTON_MAIN_DATA_CAR_PROJECT_ADD'">
        {{ language('新建') }}
      </iButton>
      <iButton
        @click="changeStatus"
        :disabled="selectedRows.length === 0"
        xxx-permission="'BUTTON_MAIN_DATA_CAR_PROJECT_CHANGE_STATUS'"
      >
        {{ language('失效') }}
      </iButton>

      <button-download
        :download-method="downloadTemplate"
        xxx-permission="'BUTTON_MAIN_DATA_CAR_PROJECT_DOWNLOAD_PRODUCTION_PLAN_TEMPLATE'"
      >
        {{ language('下载产量计划模板') }}
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
          xxx-permission="'BUTTON_MAIN_DATA_CAR_PROJECT_PRODUCTION_PLAN_IMPORT'"
        >
          <span>
            {{ language('导入产量计划') }}
          </span>
        </iButton>
      </el-upload>
      <button-download
        :download-method="exportExcel"
        xxx-permission="'BUTTON_MAIN_DATA_CAR_PROJECT_EXPORT'"
      />
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
import { CAR_PROJECT_COLUMNS } from './data'
import {
  carProjectList,
  carProjectSetValidStatus,
  downloadCarProjectExcelTemplate,
  carProjectImport,
  carProjectListExport
} from '@/api/mainData/carProject'
import { openUrl } from '@/utils'
export default {
  name: 'datatable',
  components: { iTableCustom, iCard, iPagination, iButton },
  mixins: [pageMixins],
  props: {
    filterForm: {
      type: Object,
      default: function () {
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
      tableColumns: CAR_PROJECT_COLUMNS,
      selectedRows: [],
      exportLoading: false
    }
  },
  created() {
    this.page.pageSizes = [10, 20, 50, 100, 200, 300]
    this.query()
  },
  methods: {
    add() {
      openUrl('/main-data/carproject/add')
      // this.$router.push({ name: 'MainDataCarProjectAdd' })
    },
    search() {
      this.page.currPage = 1
      this.page.totalCount = 0
      this.query()
    },
    changeStatus() {
      this.$confirm('是否确认失效此项', '注意', {
        confirmButtonText: this.language('确定'),
        cancelButtonText: this.language('取消'),
        type: 'warning'
      }).then(() => {
        const reqData = []
        this.selectedRows.forEach((e) => {
          reqData.push({
            carTypeProId: e.id,
            valid: false
          })
        })
        carProjectSetValidStatus(reqData)
          .then((res) => {
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
    downloadTemplate() {
      //下载产量计划模板
      return downloadCarProjectExcelTemplate()
    },
    importData(content) {
      this.uploadLoading = true
      let formData = new FormData()
      formData.append('file', content.file)
      formData.append('currentUserId', this.$store.state.permission.userInfo.id)
      carProjectImport(formData)
        .then((res) => {
          if (res.result) {
            iMessage.success(res.desZh || '导入成功')
          } else {
            iMessage.error(res.desZh || '导入失败')
          }
        })
        .catch((err) => {
          console.log(err)
          iMessage.error(err.desZh || this.$t('LK_SHANGCHUANSHIBAI'))
        })
        .finally(() => {
          this.uploadLoading = false
        })
    },
    exportExcel() {
      let param = { ...this.filterForm }
      return carProjectListExport(param)
    },
    async query() {
      const requestData = {
        ...this.filterForm,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      this.tableLoading = true
      carProjectList(requestData)
        .then((val) => {
          if (val.code == 200) {
            this.tableData = val.data
            this.page.totalCount = val.total
          } else {
            iMessage.error(val.desZh || '获取数据失败')
          }
        })
        .catch(() => {
          iMessage.error('获取数据失败')
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    //表格选中值集
    handleSelectionChange(val) {
      this.selectedRows = val
    },
    handleGoDetail(row) {
      openUrl('/main-data/carproject/add?id=' + row.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-upload {
  margin: 0px 10px;
}
</style>
