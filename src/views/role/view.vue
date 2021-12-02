<template>
  <iPage>
    <viewHeader :title="language('角色名称')" @toggle-tab="toggleTab" />
    <viewBase v-show="activeTab === 'base'" :form="roleData" />
    <viewFunction v-show="activeTab === 'function'" :detail="roleData" />
    <viewData
      v-show="activeTab === 'data'"
      :full-menu="fullMenu"
      :detail="roleData"
    />
    <viewPosition v-show="activeTab === 'position'" :roldID="roleID" />
    <viewUser v-show="activeTab === 'user'" :roldID="roleID" />
  </iPage>
</template>

<script>
import {
  viewHeader,
  viewBase,
  viewFunction,
  viewData,
  viewPosition,
  viewUser
} from './components'
import { iPage } from 'rise'
import { fetchRoleDetail, fetchResource } from '@/api/role/index'
export default {
  name: 'roleView',
  components: {
    iPage,
    viewHeader,
    viewBase,
    viewFunction,
    viewData,
    viewPosition,
    viewUser
  },
  data() {
    return {
      activeTab: 'base',
      roleID: this.$route.params.id,
      roleData: {
        id: '',
        code: '',
        fullNameZh: '',
        description: '',
        status: '',
        tagDTOList: []
      },
      fullMenu: []
    }
  },
  created() {
    this.queryFullMenu()
    this.roleDetail()
  },
  methods: {
    toggleTab(val) {
      this.activeTab = val
    },
    roleDetail() {
      let param = { id: this.$route.params.id }
      fetchRoleDetail(param)
        .then((val) => {
          if (val.code == 200) {
            //头部信息
            const { data } = val
            this.roleData = data
          }
        })
        .catch(() => {})
    },
    async queryFullMenu() {
      // 查询所有菜单
      const { data } = await fetchResource({ type: 3 }).finally(
        () => (this.tableLoading = false)
      )
      this.fullMenu = data
    }
  }
}
</script>

<style lang="scss" scoped></style>
