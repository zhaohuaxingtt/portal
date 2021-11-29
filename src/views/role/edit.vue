<!--
 * @Author: qyu
 * @Date: 2021-08-10 14:34:00
 * @LastEditTime: 2021-08-12 11:04:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\role\edit.vue
-->
<template>
  <iPage>
    <div v-loading="loading">
      <viewHeader
        :title="language('分配角色权限')"
        editable
        :active="activeTab"
        @toggle-tab="toggleTab"
      />
      <editFunction
        v-show="activeTab === 'function'"
        :detail="roleData"
        :full-menu="fullMenu"
        @save-success="saveFunctionSuccess"
      />
      <editData
        v-show="activeTab === 'data'"
        :detail="roleData"
        :full-menu="fullMenu"
      />
    </div>
  </iPage>
</template>

<script>
import { viewHeader, editFunction, editData } from './components'
import { iPage } from 'rise'
import { fetchRoleDetail } from '@/api/role/index'
import { fetchResource } from '@/api/role'
export default {
  name: 'roleView',
  components: {
    iPage,
    viewHeader,
    editFunction,
    editData
  },
  data() {
    return {
      activeTab: 'function',
      roleData: {
        id: '',
        code: '',
        fullNameZh: '',
        description: '',
        status: '',
        tagDTOList: [],
        scope: null,
        permissionList: []
      },
      loading: false,
      fullMenu: []
    }
  },
  created() {
    this.roleDetail()
    this.queryFullMenu()
  },
  methods: {
    toggleTab(val) {
      this.activeTab = val
    },
    roleDetail() {
      this.loading = true
      let param = { id: this.$route.params.id }
      fetchRoleDetail(param)
        .then((val) => {
          this.loading = false
          if (val.code == 200) {
            //头部信息
            const { data } = val
            this.roleData = data
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    async queryFullMenu() {
      // 查询所有菜单
      const { data } = await fetchResource({ type: 3 }).finally(
        () => (this.tableLoading = false)
      )
      this.fullMenu = data
    },
    saveFunctionSuccess() {
      this.roleDetail()
    }
  }
}
</script>

<style lang="scss" scoped></style>
