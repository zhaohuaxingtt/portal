<!--
/**
 * 可以sort的table 只简单说明sort相关用法(具体用法同element-ui中的el-table)
 * @param   {Function(a, b)}                              sortMethod       ——                         指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推                    ——
 * @param   {String/Array/Function(row, index)}           sortBy           ——                         对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效，需返回一个数字，和 Array.sort 表现一致                                                                                        ——
 * @param   {boolean, string}                             sortable         true, false, 'custom'      对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件                                                                                                默认：false
 * @events  handle-sort-change         后台sort的全局监听 当需要排序的列中sortable: 'custom'时，tabel需要全局监听handle-sort-change，该方法中可以获取到排序方式，并根据排序方式调api重新渲染table
 */
 -->
<template>
  <iPage>
    <iCard>
      <div class="margin-bottom20">
        <el-button type="primary" @click="handleChangeHeader"> 配置 </el-button>
      </div>
      <iTableCustom
        :ref="'filterTable'"
        :loading="tableLoading"
        :data="tableData"
        :columns="tableSetting"
        tooltipWidth="400px"
        permissionKey="ROLE_TABLE"
        @handle-sort-change="handleSortChange"
      >
      </iTableCustom>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getList)"
        @current-change="handleCurrentChange($event, getList)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
      <!-- <iTableHeaderSorter
      :data="tableSetting"
      :show.sync="show"
      :value="'value'"
      :label="'label'"
      :visiableKey="'hidden'"
      @callback="handleSaveCallback"
    /> -->
    </iCard>
  </iPage>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
// import { iTableCustom } from 'rise'
import { iPage, iPagination, iCard } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { fetchRoles } from '@/api/role'
export default {
  components: {
    iPage,
    iPagination,
    iTableCustom,
    iCard
  },
  mixins: [pageMixins],
  mounted() {
    this.getList()
    // this.getTableHeader()
  },
  data() {
    return {
      show: false,
      tableLoading: false,
      tableData: [],
      query: {
        current: 1,
        size: 10
      },
      tableSetting: [
        {
          type: 'index',
          label: '序号',
          width: 80
        },
        {
          prop: 'id',
          label: '角色ID',
          tooltip: false,
          align: 'center',
          sortable: true,
          sortBy: 'id'
        },
        {
          prop: 'code',
          label: '角色代码',
          align: 'center',
          tooltip: false,
          emit: 'go-detail',
          sortMethod: function (a, b) {
            const a_swname = a['code']?.toLowerCase()
            const b_swname = b['code']?.toLowerCase()
            if (a_swname < b_swname) return -1
            if (a_swname > b_swname) return 1
            return 0
          },
          sortable: true
        },
        {
          prop: 'fullNameZh',
          label: '角色名称',
          sortable: 'custom',
          align: 'center',
          tooltip: false
        },
        {
          prop: 'description',
          label: '角色描述',
          align: 'center',
          tooltip: true,
          customRender: (h, scope) => {
            if (scope.$index === 0) {
              return '太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长太长'
            }
            return scope.row.description
          }
        }
      ]
    }
  },
  methods: {
    handleChangeHeader() {
      this.$refs.filterTable.openSetting()
    },
    handleSaveCallback(val) {
      // 更新表头并刷新table
      console.log('此处做table刷新', val)
    },
    handleSortChange(val) {
      // 后台sort
      console.log('val', val)
      console.log('此处用于重新获取tableData')
    },
    async getList() {
      this.tableLoading = true
      this.query.current = this.page.currPage
      const res = await fetchRoles(this.query)
      this.tableLoading = false
      if (res.code === '200' && res?.data) {
        this.tableData = res.data
        this.page.totalCount = res.total
        this.page.pageSize = res.pageSize
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
