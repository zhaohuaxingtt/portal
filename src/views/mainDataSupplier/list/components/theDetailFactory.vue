<template>
  <iCard :title="language('工厂信息')" collapse>
    <div class="actions" slot="header-control">
      <iButton
        :disabled="!selectedRows.length"
        :loading="delLoading"
        @click="handleDelete"
      >
        {{ language('删除') }}
      </iButton>
      <iButton :disabled="selectedRows.length !== 1" @click="handleEdit">
        {{ language('编辑') }}
      </iButton>
    </div>
    <i-table-custom
      :loading="loading"
      :data="supplierPlantVo"
      :columns="tableColumns"
      @go-detail="handleGoDetail"
      @handle-selection-change="handleSelectionChange"
    />

    <theDetailFactoryModify
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
import theDetailFactoryModify from './theDetailFactoryModify'
import { FACTORY_TABLE_COLUMNS } from './data'
import { deleteFactory } from '@/api/mainDataSupplier/list/factory'
import deleteMixin from '@/mixins/deleteMixin'
export default {
  name: 'theDetailFactory',
  mixins: [deleteMixin],
  components: {
    iCard,
    iButton,
    iTableCustom,
    theDetailFactoryModify
  },
  props: {
    supplierId: {
      type: String,
      default: ''
    },
    dicts: {
      type: Object,
      default: () => {
        return {}
      }
    },
    supplierPlantVo: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      loading: false,
      tableColumns: FACTORY_TABLE_COLUMNS,
      selectedRows: [],
      detail: {},
      dialogVisible: false,
      delLoading: false,
      defaultAddressInfoVo: {
        address: '',
        city: '',
        cityCode: '',
        country: '',
        countryCode: '',
        createDate: '',
        isDelete: true,
        latitude: 0,
        longitude: 0,
        postCode: '',
        province: '',
        provinceCode: '',
        updateDate: ''
      }
    }
  },
  methods: {
    handleGoDetail(row) {
      this.detail = _.cloneDeep(row)
      if (!this.detail.addressInfoVo) {
        this.detail.addressInfoVo = { ...this.defaultAddressInfoVo }
      }
      this.dialogVisible = true
    },
    handleSelectionChange(val) {
      this.selectedRows = val
    },
    handleEdit() {
      this.detail = _.cloneDeep(this.selectedRows[0])
      if (!this.detail.addressInfoVo) {
        this.detail.addressInfoVo = { ...this.defaultAddressInfoVo }
      }
      this.dialogVisible = true
    },
    handleDelete() {
      this.onDelete().then(() => {
        const params = {
          supplierId: this.supplierId,
          plantIds: this.selectedRows.map((e) => e.id).join(',')
        }
        this.delLoading = true
        deleteFactory(params)
          .then((res) => {
            if (res.result) {
              iMessage.success(res.dscZh || '删除成功')
              this.$emit('delete-factory-success')
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
      console.log('saveSuccess', data)
      const items = this.supplierPlantVo.filter((e) => e.id === data.id)
      if (items.length > 0) {
        items[0].factoryCode = data.factoryCode
        items[0].factoryName = data.factoryName
        items[0].factoryAbbrName = data.factoryAbbrName
        items[0].addressInfoVo = data.addressInfoVo
        items[0].dunsCode = data.dunsCode
        items[0].vwCode = data.vwCode
        items[0].isNominate = data.isNominate
        items[0].effectFlag = data.effectFlag
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
