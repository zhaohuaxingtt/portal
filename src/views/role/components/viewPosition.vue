<template>
  <iCard class="view-position">
    <div class="view-position-content">
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
import { iCard, iPagination } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { pageMixins } from '@/utils/pageMixins'
import { positionListOfRole } from '@/api/role/index'
export default {
  name: 'dataPosition',
  components: { iTableCustom, iCard, iPagination },
  mixins: [pageMixins],
  data() {
    return {
      columns: [
        {
          type: 'index',
          label: '编号'
        },
        {
          prop: 'code',
          label: '岗位编码'
        },
        {
          prop: 'fullNameZh',
          label: '岗位全称'
        }
      ],
      data: []
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
    query() {
      let param = {
        roleId: this.roldID,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      positionListOfRole(param)
        .then(val => {
          if (val.code == 200) {
            //
            this.page.totalCount = val.total
            this.data = val.data
          }
        })
        .catch(() => {})
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
.view-position-content {
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
