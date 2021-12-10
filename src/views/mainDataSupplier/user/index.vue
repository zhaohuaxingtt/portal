<template>
  <div class="main">
    <iSearch @reset="handleReset" @sure="handleSearch">
      <el-form class="search-form">
        <el-row :gutter="24">
          <el-col :span="8">
            <iFormItem :label="searchLabel.contactName">
              <iInput
                :placeholder="language('请输入')"
                v-model="searchContent.nameZh"
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="searchLabel.supplierNameZh">
              <iInput
                :placeholder="language('请输入')"
                v-model="searchContent.opcsCompanyNameZh"
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="searchLabel.staff">
              <iInput
                :placeholder="language('请输入')"
                v-model="searchContent.position"
              />
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="language('临时号')">
              <iInput
                :placeholder="language('请输入')"
                v-model="searchContent.temporaryNum"
              />
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="language('正式/SVW号')">
              <iInput
                :placeholder="language('请输入')"
                v-model="searchContent.svwCode"
              />
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="language('SAP号')">
              <iInput
                :placeholder="language('请输入')"
                v-model="searchContent.sapNum"
              />
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="searchLabel.department">
              <iInput
                :placeholder="language('请输入')"
                v-model="searchContent.department"
              />
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="language('登录名')">
              <iInput
                :placeholder="language('请输入')"
                v-model="searchContent.userName"
              />
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="language('邮箱')">
              <iInput
                :placeholder="language('请输入')"
                v-model="searchContent.email"
              />
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="language('电话')">
              <iInput
                :placeholder="language('请输入')"
                v-model="searchContent.telephoneO"
              />
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="language('起始时间')">
              <iDatePicker
                :placeholder="language('请选择')"
                v-model="searchContent.startDate"
                style="width: 100%"
                value-format="yyyy-MM-dd"
              />
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="language('截止时间')">
              <iDatePicker
                :placeholder="language('请选择')"
                v-model="searchContent.endDate"
                style="width: 100%"
                value-format="yyyy-MM-dd"
              />
            </iFormItem>
          </el-col>
        </el-row>
      </el-form>
    </iSearch>

    <div class="user-table">
      <iCard>
        <div class="btn-list">
          <iButton
            @click="handleDelete"
            :disabled="this.selectedItems.length == 0"
          >
            删除
          </iButton>
          <iButton
            @click="handleEdit"
            :disabled="this.selectedItems.length !== 1"
          >
            编辑
          </iButton>
          <button-download :download-method="handleExportExcel" />
        </div>
        <div class="tableContent">
          <iTableCustom
            ref="tableCustomRef"
            :loading="loading"
            :columns="tabelSetting"
            :data="tableData"
            :extra-data="extraData"
            @to-detail="toDetail"
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
        </div>
      </iCard>
    </div>
    <userDialog
      v-if="showDialog"
      :visible.sync="showDialog"
      :detail="detail"
      @save-success="query"
    />
  </div>
</template>

<script>
import {
  iButton,
  iSearch,
  iFormItem,
  iPagination,
  iInput,
  iCard,
  iMessage,
  iDatePicker
} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import iTableCustom from '@/components/iTableCustom'
import { USER_TABLE_COLUMNS } from './data'
import userDialog from './userDialog'
import {
  fetchSupplierUserByPage,
  deleteSupplierUser,
  exportSupplierUser
} from '@/api/mainDataSupplier/list/user'
import deleteMixin from '@/mixins/deleteMixin'
export default {
  name: 'suplierUser',
  components: {
    iButton,
    iSearch,
    iFormItem,
    iPagination,
    iInput,
    iCard,
    iTableCustom,
    userDialog,
    iDatePicker
  },
  mixins: [pageMixins, deleteMixin],
  data() {
    return {
      laoding: false,
      showDialog: false,
      searchLabel: {
        contactName: '联系人姓名',
        supplierNameZh: '供应商中文名称',
        staff: '职务',
        department: '部门'
      },
      searchContent: {
        nameZh: '',
        opcsCompanyNameZh: '',
        position: '',
        department: '',
        sapNum: '',
        svwCode: '',
        temporaryNum: '',
        userName: '',
        email: '',
        telephoneO: '',
        startDate: '',
        endDate: ''
      },
      tableData: [],
      departmentOptions: [],
      tabelSetting: USER_TABLE_COLUMNS,
      selectedItems: [],
      detail: {}
    }
  },
  created() {
    this.query()
  },
  methods: {
    async query() {
      const requestData = {
        ...this.searchContent,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      if (requestData.startDate) {
        requestData.startDate = requestData.startDate + ' 00:00:00'
      }
      if (requestData.endDate) {
        requestData.endDate = requestData.endDate + ' 23:59:59'
      }
      this.loading = true
      const res = await fetchSupplierUserByPage(requestData).finally(
        () => (this.loading = false)
      )
      this.tableData = res.data || []
      this.page.totalCount = res.total
    },
    toDetail(row) {
      this.detail = { ...row }
      this.showDialog = true
    },
    handleDelete() {
      this.onDelete().then(() => {
        deleteSupplierUser(this.selectedItems)
          .then((res) => {
            if (res.result) {
              iMessage.success(res.dscZh || '删除成功')
              this.query()
            } else {
              iMessage.error(res.dscZh || '删除失败')
            }
          })
          .catch((err) => {
            iMessage.error(err.dscZh || '删除失败')
          })
      })
    },
    handleSearch() {
      this.page.currPage = 1
      this.query()
    },
    handleReset() {
      this.searchContent = {
        nameZh: '',
        opcsCompanyNameZh: '',
        position: '',
        department: ''
      }
      this.handleSearch()
    },
    handleSelectionChange(val) {
      this.selectedItems = val
    },
    handleEdit() {
      this.detail = { ...this.selectedItems[0] }
      this.showDialog = true
    },
    handleExportExcel() {
      const requestData = {
        ...this.searchContent
      }
      if (requestData.startDate) {
        requestData.startDate = requestData.startDate + ' 00:00:00'
      }
      if (requestData.endDate) {
        requestData.endDate = requestData.endDate + ' 23:59:59'
      }
      return exportSupplierUser({ ...this.searchContent, exportType: 3 })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-table,
.tableContent {
  margin-top: 20px;
}
.btn-list {
  display: flex;
  justify-content: flex-end;
}
</style>
