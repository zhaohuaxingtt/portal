<template>
  <iCard class="view-user">
    <div class="flex flex-end-center margin-bottom20">
      <iButton :loading="exportLoading" @click="exportUsers">
        {{ language('导出') }}
      </iButton>
    </div>
    <div class="view-user-content">
      <i-table-custom :data="data" :columns="columns" />
      <iPagination
        v-update
        @size-change="handleSizeChange($event, query)"
        @current-change="handleCurrentChange($event, query)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
        class="pages"
      />
    </div>
  </iCard>
</template>

<script>
import { iCard, iPagination, iButton } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { pageMixins } from '@/utils/pageMixins'
import { usersListOfRole, downloadRoleUsers } from '@/api/role/index'
export default {
  name: 'dataPosition',
  components: { iTableCustom, iCard, iPagination, iButton },
  mixins: [pageMixins],
  data() {
    return {
      columns: [
        {
          type: 'index',
          label: '编号'
        },
        {
          prop: 'userNum',
          label: '员工号'
        },
        {
          prop: 'nameZh',
          label: '姓名'
        },
        {
          prop: 'department',
          label: '所属部门'
        },
        {
          prop: 'mobile',
          label: '手机'
        },
        {
          prop: 'phone',
          label: '电话'
        }
      ],
      data: [],
      exportLoading: false
    }
  },
  props: {
    roldID: {
      type: String,
      default: ''
    }
  },
  created() {
    this.query()
  },
  methods: {
    search() {
      this.page.currPage = 1
      this.page.totalCount = 0
      this.query()
    },
    exportUsers() {
      this.exportLoading = true
      downloadRoleUsers({ roleId: this.roldID }).finally(
        () => (this.exportLoading = false)
      )
    },
    query() {
      let param = {
        roleId: this.roldID,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      usersListOfRole(param)
        .then((val) => {
          if (val.code == 200) {
            //
            this.data = val.data
            this.page.totalCount = val.total
          }
        })
        .catch(() => {
          //
        })
    },
    //表格选中值集
    handleSelectionChange(val) {
      this.selectedRows = val
    },
    handleGoDetail(val) {
      this.$router.push({
        name: 'templateDetail',
        params: {
          id: val.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.view-user-content {
  min-height: calc(100vh - 320px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.pages {
  ::v-deep .page-info {
    padding-top: 15px;
  }
}
</style>
