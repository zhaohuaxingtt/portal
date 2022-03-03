<template>
  <pageHeader class="margin-bottom20">
    {{ title }}
    <div class="flex-end-center" slot="actions">
      <iTabBadge>
        <iTabBadgeItem
          v-for="item in tabList"
          :key="item.value"
          :name="item.label"
          :active="item.value === activeTab"
          @click="toggleTab(item.value)"
        />
      </iTabBadge>
    </div>
  </pageHeader>
</template>

<script>
import pageHeader from '@/components/pageHeader'
import { iTabBadge, iTabBadgeItem } from '@/components/iTabBadge'
export default {
  name: 'roleViewHeader',
  components: {
    pageHeader,
    iTabBadge,
    iTabBadgeItem
  },
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    active: {
      type: String,
      default: ''
    }
  },
  computed: {
    tabList() {
      if (this.editable) {
        return this.tabs.filter((e) => e.editable)
      }
      return this.tabs
    }
  },
  watch: {
    active(val) {
      if (val !== this.activeTab) {
        this.activeTab = val
      }
    }
  },
  data() {
    return {
      activeTab: 'base',
      tabs: [
        {
          label: '基本信息',
          value: 'base',
          editable: false
        },
        {
          label: '角色功能权限',
          value: 'function',
          editable: true
        },
        {
          label: '角色数据权限',
          value: 'data',
          editable: true
        },
        {
          label: '使用该角色的岗位',
          value: 'position',
          editable: false
        },
        {
          label: '使用该角色的用户',
          value: 'user',
          editable: false
        }
      ]
    }
  },
  created() {
    if (this.active) {
      this.activeTab = this.active
    }
  },
  methods: {
    toggleTab(val) {
      this.activeTab = val
      this.$emit('toggle-tab', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.margin-bottom20 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
