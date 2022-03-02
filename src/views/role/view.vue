<template>
  <iPage>
    <div v-loading="loading">
      <viewHeader :title="roleTitle" @toggle-tab="toggleTab" />
      <viewBase v-show="activeTab === 'base'" :form="roleData" />
      <viewFunction v-show="activeTab === 'function'" :detail="roleData" />
      <viewData
        v-show="activeTab === 'data'"
        :full-menu="fullMenu"
        :detail="roleData"
      />
      <viewPosition v-show="activeTab === 'position'" :roldID="roleID" />
      <viewUser v-show="activeTab === 'user'" :roldID="roleID" />
    </div>
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
import { iPage, iMessage } from 'rise'
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
  computed: {
    roleTitle() {
      const { shortNameZh, shortNameEn } = this.roleData
      if (this.$i18n.locale === 'zh') {
        return shortNameZh || shortNameEn
      }
      return shortNameEn || shortNameZh
    }
  },
  data() {
    return {
      activeTab: 'base',
      roleID: this.$route.params.id,
      title: '',
      roleData: {
        id: '',
        code: '',
        fullNameZh: '',
        description: '',
        status: '',
        tagDTOList: []
      },
      fullMenu: [],
      loading: false
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
      this.loading = true
      fetchRoleDetail(param)
        .then((val) => {
          if (val.code == 200) {
            //头部信息
            const { data } = val
            this.roleData = data
            this.title = val.data.shortNameZh
          } else {
            iMessage.error(val.desZh || '获取角色信息失败')
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh || '获取角色信息失败')
        })
        .finally(() => (this.loading = false))
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
