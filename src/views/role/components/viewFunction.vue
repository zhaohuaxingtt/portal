<template>
  <div class="view-function">
    <div class="menu">
      <iCard :title="resourceTitle">
        <functionMenu
          :default-selected-rows="detail.menuList"
          @set-resource-parent="setResourceParent"
        />
      </iCard>
    </div>
    <div class="content">
      <iCard :title="resourceTitle">
        <functionResource
          :default-selected-rows="detail.resourceList"
          :parent-id="resourceParent.id"
        />
      </iCard>
    </div>
  </div>
</template>

<script>
import { iCard } from 'rise'
import functionMenu from './functionMenu'
import functionResource from './functionResource'
export default {
  name: 'viewFunction',
  components: { iCard, functionMenu, functionResource },
  props: {
    detail: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {
    resourceTitle() {
      if (this.resourceParent.name) {
        return `【${this.resourceParent.name}】${this.language('页面控件')}`
      }
      return this.language('页面控件')
    }
  },
  data() {
    return {
      resourceParent: {}
    }
  },
  methods: {
    setResourceParent(row) {
      this.resourceParent = row
    }
  }
}
</script>

<style lang="scss" scoped>
.view-function {
  display: flex;
  justify-content: space-between;
  height: 100%;
  .menu {
    width: 490px;
    height: 100%;
  }
  .content {
    width: calc(100% - 510px);
    height: 100%;
    display: flex;
    flex-direction: column;
    .content-item {
      flex-grow: 1;
    }
  }
}
</style>
