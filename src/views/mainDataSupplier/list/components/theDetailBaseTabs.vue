<template>
  <div>
    <div class="tabs">
      <div
        class="tab"
        :class="{ active: activeName === 'product' }"
        @click="activeName = 'product'"
      >
        主要产品
      </div>
      <span class="divider">|</span>
      <div
        class="tab"
        :class="{ active: activeName === 'company' }"
        @click="activeName = 'company'"
      >
        关联公司
      </div>
      <span class="divider">|</span>
      <div
        class="tab"
        :class="{ active: activeName === 'corp' }"
        @click="activeName = 'corp'"
      >
        关联集团
      </div>
    </div>
    <i-table-custom
      v-show="activeName === 'product'"
      :loading="productLoading"
      :data="supplierProductVos"
      :columns="tableColumnsProduct"
    />
    <i-table-custom
      v-show="activeName === 'company'"
      :loading="companyLoading"
      :data="assCompanyVos"
      :columns="tableColumnsCompany"
    />
    <i-table-custom
      v-show="activeName === 'corp'"
      :loading="companyLoading"
      :data="supplierCorpVo"
      :columns="tableColumnsCorp"
    />
  </div>
</template>

<script>
import {
  BASE_PRODUCT_TABLE_COLUMNS,
  BASE_COMPANY_TABLE_COLUMNS,
  BASE_CORP_TABLE_COLUMNS
} from './data'
import iTableCustom from '@/components/iTableCustom'
export default {
  name: 'TheDetailBaseTabs',
  components: { iTableCustom },
  props: {
    assCompanyVos: {
      type: Array,
      default: function() {
        return []
      }
    },
    supplierProductVos: {
      type: Array,
      default: function() {
        return []
      }
    },
    supplierCorpVo: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      activeName: 'product',
      tableColumnsProduct: BASE_PRODUCT_TABLE_COLUMNS,
      tableColumnsCompany: BASE_COMPANY_TABLE_COLUMNS,
      tableColumnsCorp: BASE_CORP_TABLE_COLUMNS,
      productLoading: false,
      companyLoading: false
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .tab {
    font-weight: 400;
    color: #4b4b4c;
    &.active {
      color: #000;
      font-weight: bold;
    }
    cursor: pointer;
  }
  .divider {
    margin: 0px 15px;
    color: #707070;
    font-size: 16px;
  }
}
</style>
