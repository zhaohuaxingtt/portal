<template>
  <iCard :title="$t('供应商用户')" collapse>
    <div class="actions" slot="header-control">
      <!-- <iButton @click="query">
        ReQuery
      </iButton> -->
      <iButton
        :loading="freeLoading"
        :disabled="!selectedRows.length"
        @click="handleUnFreeBatch()"
      >
        {{ $t('解冻') }}
      </iButton>
      <iButton
        :loading="freeLoading"
        :disabled="!selectedRows.length"
        @click="handleFreeBatch()"
      >
        {{ $t('冻结') }}
      </iButton>
      <iButton @click="handleAdd">{{ $t('新增') }} </iButton>
      <iButton
        :disabled="selectedRows.length !== 1"
        @click="handleUpdateMainContact"
      >
        {{ $t('设为主用户') }}
      </iButton>
      <iButton :disabled="!selectedRows.length" @click="handleDelete">
        {{ $t('删除') }}
      </iButton>
      <iButton :disabled="selectedRows.length !== 1" @click="handleEdit">
        {{ $t('编辑') }}
      </iButton>
    </div>
    <i-table-custom
      :loading="tableLoading"
      :data="tableData"
      :columns="tableColumns"
      max-height="340px"
      @go-detail="handleGoDetail"
      @handle-selection-change="handleSelectionChange"
    />

    <theDetailSupplierUserModify
      :visible.sync="dialogVisible"
      :detail="detail"
      :ruleCode="ruleCode"
      @save-success="handleSaveSuccess"
    />
  </iCard>
</template>

<script>
import { iCard, iButton, iMessage } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import theDetailSupplierUserModify from './theDetailSupplierUserModify'
import { SUPPLIER_USER_COLUMNS, SUPPLIER_USER_FORM } from './data'
import {
  fetchSupplierUsers,
  supplierUserFreeBatch,
  supplierUserUnFreeBatch,
  deleteSupplierUser,
  updateSupplierUser
} from '@/api/mainDataSupplier/list/user'
import deleteMixin from '@/mixins/deleteMixin'
import { pageMixins } from '@/utils/pageMixins'
export default {
  name: 'theDetailSupplierUser',
  mixins: [pageMixins, deleteMixin],
  components: {
    iCard,
    iButton,
    iTableCustom,
    theDetailSupplierUserModify
  },
  props: {
    supplierId: {
      type: String,
      default: ''
    },
    supplierType: {
      type: String,
      default: ''
    },
    ruleCode: {
      type: String,
      default: ''
    },
    baseInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      tableLoading: false,
      tableData: [],
      tableColumns: SUPPLIER_USER_COLUMNS,
      selectedRows: [],
      detail: {},
      dialogVisible: false
    }
  },
  watch: {
    supplierId(val) {
      if (val) {
        this.query()
      }
    }
  },
  created() {
    if (this.supplierId) {
      this.query()
    }
  },
  methods: {
    handleGoDetail(row) {
      this.dialogVisible = true
      this.detail = { ...row }
    },
    handleSelectionChange(val) {
      this.selectedRows = val
    },
    handleEdit() {
      this.detail = {
        ...this.selectedRows[0],
        opcsCompanyNameEn:
          this.selectedRows[0].opcsCompanyNameEn || this.baseInfo.nameEn,
        opcsCompanyNameZh:
          this.selectedRows[0].opcsCompanyNameZh || this.baseInfo.nameZh
      }
      this.dialogVisible = true
    },
    handleAdd() {
      let type = 1
      if (this.supplierType === 'GP') {
        type = 2
      }
      this.detail = {
        ...SUPPLIER_USER_FORM,
        supplierId: this.supplierId,
        type,
        opcsCompanyNameEn: this.baseInfo.nameEn,
        opcsCompanyNameZh: this.baseInfo.nameZh
      }
      this.dialogVisible = true
    },
    handleFreeBatch() {
      this.$confirm(`是否要冻结此用户`, '确认操作', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.freeLoading = true
        const data = _.cloneDeep(this.selectedRows)
        data.forEach((e) => (e.status = 2))
        supplierUserFreeBatch(data)
          .then((res) => {
            if (res.result) {
              iMessage.success(res.dscZh || '操作成功')
              this.query()
            } else {
              iMessage.error(res.dscZh || '操作失败')
            }
          })
          .catch((err) => {
            iMessage.error(err.dscZh || '操作失败')
          })
          .finally(() => (this.freeLoading = false))
      })
    },
    handleUnFreeBatch() {
      this.freeLoading = true
      const data = _.cloneDeep(this.selectedRows)
      data.forEach((e) => (e.status = 1))
      supplierUserUnFreeBatch(data)
        .then((res) => {
          if (res.result) {
            iMessage.success(res.dscZh || '操作成功')
            this.query()
          } else {
            iMessage.error(res.dscZh || '操作失败')
          }
        })
        .catch((err) => {
          iMessage.error(err.dscZh || '操作失败')
        })
        .finally(() => (this.freeLoading = false))
    },
    handleDelete() {
      this.onDelete().then(() => {
        deleteSupplierUser(this.selectedRows)
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
    handleSaveSuccess() {
      this.query()
    },
    handleUpdateMainContact() {
      const data = { ...this.selectedRows[0] }
      data.isMainContact = true
      updateSupplierUser([data])
        .then((res) => {
          if (res.result) {
            iMessage.success(res.dscZh || '设置成功')
            this.query()
          } else {
            iMessage.error(res.dscZh || '设置失败')
          }
        })
        .catch((err) => {
          iMessage.error(err.dscZh || '设置失败')
        })
    },
    async query() {
      const requestData = {
        supplierId: this.supplierId,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      this.tableLoading = true
      const res = await fetchSupplierUsers(requestData).finally(
        () => (this.tableLoading = false)
      )
      this.tableData = res.data || []
      this.page.totalCount = res.total
    }
  }
}
</script>

<style lang="scss" scoped></style>
