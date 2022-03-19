<template>
  <pageHeader>
    {{language('设置')}}
    <div class="flex-end-center" slot="actions">
      <iTabBadge>
        <iTabBadgeItem
          v-for="item in tabList"
          :key="item.value"
          :name="item.label"
          :active="item.value === activeTab"
          :active-border="false"
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
  name: 'settingHeader',
  components: { pageHeader, iTabBadge, iTabBadgeItem },
  props: {
    active: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tabList: [
        {
          label: 'Top 5 Task',
          value: 'task'
        },
        {
          label: 'Top 5 iAgree',
          value: 'iAgree'
        },
        {
          label: 'My Favourites',
          value: 'favourites'
        }
      ],
      activeTab: 'task'
    }
  },
  watch: {
    active(val) {
      if (val && val !== this.activeTab) {
        this.activeTab = val
      }
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
      this.$emit('update:active', val)
    }
  }
}
</script>

<style lang="scss" scoped></style>
