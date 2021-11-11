<template>
  <div class="main-data-supplier-detail-header">
    <pageHeader>
      供应商信息
      <div slot="actions">
        <iTabBadge>
          <iTabBadgeItem
            v-for="item in tabs"
            :key="item.value"
            :active="tabActive === item.value"
            :name="item.label"
            :active-border="false"
            @click="toggleTabs(item)"
          />
        </iTabBadge>
      </div>
    </pageHeader>
  </div>
</template>

<script>
import pageHeader from '@/components/pageHeader'
import { iTabBadge, iTabBadgeItem } from '@/components/iTabBadge'
export default {
  name: 'MainDataSupplierDetailHeader',
  components: { pageHeader, iTabBadge, iTabBadgeItem },
  data() {
    return {
      tabActive: 'base',
      tabs: [
        {
          label: this.$t('基本信息'),
          value: 'base',
          target: 'targetBase'
        },
        {
          label: this.$t('供应商状态'),
          value: 'state',
          target: 'targetState'
        },
        {
          label: this.$t('工厂信息'),
          value: 'factory',
          target: 'targetFactory'
        },
        {
          label: this.$t('银行信息'),
          value: 'bank',
          target: 'targetBank'
        },
        {
          label: this.$t('供应商用户'),
          value: 'user',
          target: 'targetUser'
        },
        {
          label: this.$t('供应商通讯录'),
          value: 'contact',
          target: 'targetContact'
        }
      ]
    }
  },
  methods: {
    toggleTabs(item) {
      this.tabActive = item.value
      this.$emit('scroll-to', item.target)
    }
  }
}
</script>

<style lang="scss" scoped>
.main-data-supplier-detail-header {
  position: fixed;
  width: calc(100% - 160px);
  top: 60px;
  padding-top: 20px;
  padding-bottom: 20px;
  background: $color-background;
  z-index: 9;
}
</style>
