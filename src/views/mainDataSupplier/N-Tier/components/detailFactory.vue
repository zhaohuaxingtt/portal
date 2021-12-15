<template>
  <iCard collapse :title="language('基础信息')">
    <div slot="header-control">
      <iButton v-show="!editable" @click="editable = true">
        {{ language('编辑') }}
      </iButton>
      <iButton v-show="editable" :loading="loading" @click="handleAdd">
        {{ language('新增') }}
      </iButton>
      <iButton v-show="editable" :loading="loading" @click="handleRemove">
        {{ language('删除') }}
      </iButton>
      <iButton v-show="editable" :loading="loading" @click="handleSave">
        {{ language('保存') }}
      </iButton>
      <iButton v-show="editable" @click="editable = false">
        {{ language('取消') }}
      </iButton>
    </div>
    <i-table-custom
      :loading="tableLoading"
      :data="factoryList"
      :columns="tableColumns"
      max-height="340px"
      @go-detail="handleGoDetail"
      @handle-selection-change="handleSelectionChange"
    />
  </iCard>
</template>

<script>
import { iCard, iButton } from 'rise'
import { saveFactoryById } from '@/api/mainDataSupplier/N-Tier'
import { N_TIER_DETAIL_FACTORY_COLUMNS } from './data'
import iTableCustom from '@/components/iTableCustom'
export default {
  name: 'detailFactory',
  components: { iTableCustom, iCard, iButton },
  props: {
    factoryList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      tableLoading: false,
      tableData: [],
      tableColumns: N_TIER_DETAIL_FACTORY_COLUMNS,
      selectedRows: [],
      editable: false
    }
  },
  created() {},
  methods: {
    handleGoDetail(row) {
      /* this.detail = _.cloneDeep(row)
      if (!this.detail.addressInfoVo) {
        this.detail.addressInfoVo = { ...this.defaultAddressInfoVo }
      }
      this.dialogVisible = true */
    },
    handleSelectionChange(val) {
      this.selectedRows = val
    },
    handleAdd() {},
    handleRemove() {},
    handleSave() {}
  }
}
</script>

<style lang="scss" scoped></style>
