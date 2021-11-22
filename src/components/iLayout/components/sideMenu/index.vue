<template>
  <ul class="side-menus">
    <li
      class="item"
      v-for="(item, index) in menus"
      :key="index"
      :class="{ item: true, active: item.active }"
      :parent-urls="parentUrls"
    >
      <item-link
        :item="item"
        :menu-relation="menuRelation"
        :isActive="getActive(item.url)"
        @hide-side-menu="$emit('hide-side-menu')"
      />
    </li>
  </ul>
</template>

<script>
import ItemLink from './ItemLink'
export default {
  name: 'SideMenu',
  components: { ItemLink },
  props: {
    sideMenus: {
      type: Array,
      default: () => []
    },
    menuRelation: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {
    menus() {
      return this.sideMenus.filter((e) => !e.hidden)
    }
  },
  watch: {
    '$route.path'() {
      this.getParentUrl()
    }
  },
  data() {
    return {
      parentUrls: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getParentUrl()
    })
  },
  methods: {
    // 获取上级url列表
    getParentUrl() {
      const locationHref = window.location.href // 浏览器url
      const locationUrl = locationHref.replace(process.env.VUE_APP_HOST, '') // 去除host的浏览器url
      this.parentUrls = this.menuRelation[locationUrl] || [locationUrl]
    },
    getActive(url) {
      url = url || ''
      const pureUrl = url.replace(process.env.VUE_APP_HOST, '')
      return this.parentUrls.includes(pureUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
.side-menus {
  height: calc(100% - 60px);
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0px;
  padding: 0px;

  .active {
    background: #1660f1;
    span {
      color: white;
    }
    &:hover {
      span {
        color: white;
      }
    }
  }
}
</style>
