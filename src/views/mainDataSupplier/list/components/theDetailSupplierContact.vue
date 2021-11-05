<template>
  <iCard :title="$t('供应商通讯录')" collapse>
    <div class="actions" slot="header-control">
      <iButton @click="handleSave">
        {{ $t('保存') }}
      </iButton>
      <iButton
        :loading="delLoading"
        :disabled="!selectedRows.length"
        @click="handleDelete"
      >
        {{ $t('删除') }}
      </iButton>
    </div>

    <i-table-custom
      :loading="loading"
      :data="tableData"
      :columns="tableColumns"
      :extra-data="tableExtraData"
      @handle-selection-change="handleSelectionChange"
    />
  </iCard>
</template>

<script>
import { iCard, iButton, iMessage } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { SUPPLIER_CONTACT_COLUMNS, DEFAULT_CONTACT } from './data'
import {
  deleteSupplierContact,
  updateBantchSupplierContact
} from '@/api/mainDataSupplier/list/contacts'
import deleteMixin from '@/mixins/deleteMixin'
export default {
  name: 'theDetailSupplierConcat',
  mixins: [deleteMixin],
  components: {
    iCard,
    iButton,
    iTableCustom
  },
  props: {
    contacts: {
      type: Array,
      default: function() {
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
  watch: {
    contacts() {
      this.init()
    }
  },
  data() {
    return {
      loading: false,
      tableColumns: SUPPLIER_CONTACT_COLUMNS,
      selectedRows: [],
      tableData: [],
      detail: {},
      dialogVisible: false,
      delLoading: false,
      tableExtraData: {
        dicts: this.dicts
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 这里主要是为了补全5种类型联系人
    init() {
      this.tableData = _.cloneDeep(this.contacts)
      this.fillTable()
    },
    // 填充表格
    fillTable() {
      const contactTypes = this.tableData.map(e => e.contactType)
      const types = [
        '财务联系人',
        '物流联系人',
        '质量联系人',
        '技术联系人',
        '商务联系人'
      ]
      for (let i = 0; i < types.length; i++) {
        const type = types[i]

        if (!contactTypes.includes(type)) {
          this.tableData.push({ ...DEFAULT_CONTACT, contactType: type })
        }
      }
    },
    handleSelectionChange(val) {
      this.selectedRows = val
    },
    saveValidate() {
      console.log(this.tableData)
      for (let i = 0; i < this.tableData.length; i++) {
        const element = this.tableData[i]
        if (element.contactType === '商务联系人' && !element.nameZh) {
          iMessage.error(`【${element.contactType}】 联系人，联系电话必填`)
          return false
        }
        if (element.nameZh && !element.phoneH) {
          iMessage.error(`【${element.contactType}】 联系人，联系电话必填`)
          return false
        }
      }
      return true
    },
    handleSave() {
      if (this.saveValidate()) {
        const data = this.tableData.map(e => {
          const {
            contactType,
            dept,
            designation,
            email,
            id,
            nameZh,
            phoneH,
            remark
          } = e
          return {
            contactType,
            dept,
            designation,
            email,
            id,
            nameZh,
            phoneH,
            remark
          }
        })
        updateBantchSupplierContact({ supplierId: this.supplierId }, data)
          .then(res => {
            if (res && res.result) {
              iMessage.success(res.dscZh || '保存成功')
              this.tableData = res.data
            } else {
              iMessage.error(res.desZh || '保存失败')
            }
          })
          .catch(err => {
            console.log('save err', err)
            iMessage.error(err.dscZh || '保存失败')
          })
          .finally(() => (this.loading = false))
      }
    },
    handleDelete() {
      this.onDelete().then(() => {
        const hasIdItems = this.selectedRows.filter(e => e.id)
        const ids = hasIdItems.map(e => e.id).join(',')
        const params = {
          supplierId: this.supplierId,
          contactIds: ids
        }
        if (hasIdItems.length) {
          this.delLoading = true
          deleteSupplierContact(params)
            .then(res => {
              if (res.result) {
                iMessage.success(res.dscZh || '删除成功')
                this.tableData = this.tableData.filter(e => !ids.includes(e.id))
                this.fillTable()
              } else {
                iMessage.error(res.dscZh || '删除失败')
              }
            })
            .catch(err => {
              iMessage.error(err.dscZh || '删除失败')
            })
            .finally(() => (this.delLoading = false))
        } else {
          iMessage.success('删除成功')
        }

        this.selectedRows.forEach(e => {
          e.dept = ''
          e.designation = ''
          e.email = ''
          e.nameZh = ''
          e.phoneH = ''
          e.remark = ''
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
