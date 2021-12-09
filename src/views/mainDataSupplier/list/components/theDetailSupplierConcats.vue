<template>
  <iCard :title="language('供应商通讯录')" collapse>
    <div class="actions" slot="header-control">
      <iButton
        :loading="delLoading"
        :disabled="!selectedRows.length"
        @click="handleDelete"
      >
        {{ language('删除') }}
      </iButton>
      <iButton :disabled="!selectedRows.length" @click="handleEdit">
        {{ language('编辑') }}
      </iButton>
    </div>
    <i-table-custom
      :loading="loading"
      :data="contacts"
      :columns="tableColumns"
      @go-detail="handleGoDetail"
      @handle-selection-change="handleSelectionChange"
    />

    <theDetailSupplierContactsModify
      :visible.sync="dialogVisible"
      :detail="detail"
      :supplierId="supplierId"
      :dicts="dicts"
      @save-success="saveSuccess"
    />
  </iCard>
</template>

<script>
import { iCard, iButton, iMessage } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import theDetailSupplierContactsModify from './theDetailSupplierContactsModify'
import { SUPPLIER_CONTACTS_COLUMNS } from './data'
import { deleteSupplierContact } from '@/api/mainDataSupplier/list/contacts'
import deleteMixin from '@/mixins/deleteMixin'
export default {
  name: 'theDetailSupplierConcats',
  mixins: [deleteMixin],
  components: {
    iCard,
    iButton,
    iTableCustom,
    theDetailSupplierContactsModify
  },
  props: {
    contacts: {
      type: Array,
      default: function () {
        return []
      }
    },
    supplierId: {
      type: String,
      default: ''
    },
    dicts: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false,
      tableColumns: SUPPLIER_CONTACTS_COLUMNS,
      selectedRows: [],
      detail: {},
      dialogVisible: false,
      delLoading: false
    }
  },
  methods: {
    handleGoDetail(row) {
      const item = _.cloneDeep(row)
      if (item.contactType) {
        item.contactType = item.contactType.split(',')
      }
      this.detail = item
      this.dialogVisible = true
    },
    handleSelectionChange(val) {
      this.selectedRows = val
    },
    handleEdit() {
      const item = _.cloneDeep(this.selectedRows[0])
      if (item.contactType) {
        item.contactType = item.contactType.split(',')
      }
      this.detail = item
      this.dialogVisible = true
    },
    handleDelete() {
      this.onDelete().then(() => {
        const params = {
          supplierId: this.supplierId,
          contactIds: this.selectedRows.map((e) => e.id).join(',')
        }
        this.delLoading = true
        deleteSupplierContact(params)
          .then((res) => {
            if (res.result) {
              iMessage.success(res.dscZh || '删除成功')
              this.$emit('delete-contact-success')
            } else {
              iMessage.error(res.dscZh || '删除失败')
            }
          })
          .catch((err) => {
            iMessage.error(err.dscZh || '删除失败')
          })
          .finally(() => (this.delLoading = false))
      })
    },
    saveSuccess(data) {
      const items = this.contacts.filter((e) => e.id === data.id)
      if (items.length > 0) {
        items[0].contactType = data.contactType
        items[0].dept = data.dept
        items[0].designation = data.designation
        items[0].email = data.email
        items[0].nameZh = data.nameZh
        items[0].phoneH = data.phoneH
        items[0].remark = data.remark
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
