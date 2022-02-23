<template>
  <iCard :title="language('供应商通讯录')" collapse>
    <div class="actions" slot="header-control">
      <iButton @click="handleSave">
        {{ language('保存') }}
      </iButton>
      <iButton
        :loading="delLoading"
        :disabled="!selectedRows.length"
        @click="handleDelete"
      >
        {{ language('删除') }}
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
  watch: {
    contacts() {
      // if(this.dicts){
      this.init()
      // }
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
      if (this.contacts) {
        this.contacts.forEach((item) => {
          // console.log(this.dicts.SUPPLIER_CODE_TYPE,'=======')
          this.dicts.SUPPLIER_CODE_TYPE.forEach((e) => {
            if (e.code == item.contactType) {
              item.contactType = e.name
            }
          })
        })
      }
      this.tableData = _.cloneDeep(this.contacts)
      this.fillTable()
    },
    // 填充表格
    fillTable() {
      const contactTypes = this.tableData.map((e) => e.contactType)
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
      const reg =
        /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      for (let i = 0; i < this.tableData.length; i++) {
        const element = this.tableData[i]
        if (element.contactType === '商务联系人' && !element.nameZh) {
          iMessage.error(`【${element.contactType}】 联系人，联系电话必填`)
          return false
        }
        if (element.nameZh && !element.telephone) {
          iMessage.error(`【${element.contactType}】 联系人，联系电话必填`)
          return false
        }
        if (element.email && !reg.test(element.email)) {
          iMessage.error(`【${element.contactType}】 联系人,邮箱格式不正确`)
          return false
        }
      }
      return true
    },
    handleSave() {
      if (this.saveValidate()) {
        const data = this.tableData.map((e) => {
          let type = ''
          this.dicts.SUPPLIER_CODE_TYPE.forEach((item) => {
            if (e.contactType == item.name) {
              type = item.code
            }
          })
          const singleData = {
            contactType: type,
            dept: e.dept,
            designation: e.designation,
            email: e.email,
            id: e.id,
            telephoneAreaCode: e.telephoneAreaCode,
            nameZh: e.nameZh,
            phoneH: e.phoneH,
            remark: e.remark,
            telephone: e.telephone
          }
          return singleData

          // return {
          //   contactType,
          //   dept,
          //   designation,
          //   email,
          //   id,
          //   telephoneAreaCode,
          //   nameZh,
          //   phoneH,
          //   remark
          // }
        })
        updateBantchSupplierContact({ supplierId: this.supplierId }, data)
          .then((res) => {
            if (res && res.result) {
              iMessage.success(res.dscZh || '保存成功')
              let data = res.data
              data.forEach((e) => {
                this.dicts.SUPPLIER_CODE_TYPE.forEach((item) => {
                  if (e.contactType == item.code) {
                    e.contactType = item.name
                  }
                })
              })
              this.tableData = data
            } else {
              iMessage.error(res.desZh || '保存失败')
            }
          })
          .catch((err) => {
            console.log('save err', err)
            iMessage.error(err.dscZh || '保存失败')
          })
          .finally(() => (this.loading = false))
      }
    },
    handleDelete() {
      this.onDelete().then(() => {
        const hasIdItems = this.selectedRows.filter((e) => e.id)
        const ids = hasIdItems.map((e) => e.id).join(',')
        const params = {
          supplierId: this.supplierId,
          contactIds: ids
        }
        if (hasIdItems.length) {
          this.delLoading = true
          deleteSupplierContact(params)
            .then((res) => {
              if (res.result) {
                iMessage.success(res.dscZh || '删除成功')
                this.tableData = this.tableData.filter(
                  (e) => !ids.includes(e.id)
                )
                this.fillTable()
              } else {
                iMessage.error(res.dscZh || '删除失败')
              }
            })
            .catch((err) => {
              iMessage.error(err.dscZh || '删除失败')
            })
            .finally(() => (this.delLoading = false))
        } else {
          iMessage.success('删除成功')
        }

        this.selectedRows.forEach((e) => {
          e.dept = ''
          e.designation = ''
          e.email = ''
          e.nameZh = ''
          e.phoneH = ''
          e.remark = ''
          e.telephone = ''
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
