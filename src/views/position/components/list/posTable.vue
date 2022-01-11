<template>
  <div class="table-box">
    <btnBox :operations="operations" />
    <iTableCustom
      :loading="tableLoading"
      :data="tableListData"
      :columns="tableSetting"
      :height="tableHeight"
      @handle-selection-change="handleSelectionChange"
      @go-detail="handleGoDetail"
    >
    </iTableCustom>
    <!-- 分页标签 -->
    <div class="pagination-box">
      <iPagination
        v-update
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="posPage.currPage"
        :page-sizes="posPage.pageSizes"
        :page-size="posPage.pageSize"
        :layout="posPage.layout"
        :total="posPage.totalCount"
      >
      </iPagination>
    </div>
  </div>
</template>

<script>
import { iPagination } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import btnBox from './btnBox.vue'
import { openUrl } from '@/utils'
export default {
  components: {
    iTableCustom,
    iPagination,
    btnBox
  },
  mounted() {
    const data = { type: this.type, params: this.query }
    this.$store.commit('SET_LIST_QUERY', data)
  },
  data() {
    return {
      operations: [
        {
          label: '新建岗位',
          value: 'add'
        },
        {
          label: '编辑',
          value: 'edit'
        },
        {
          label: '删除',
          value: 'del'
        },
        {
          label: '导出',
          value: 'export'
        }
      ],
      // tableLoading: false,
      tableSetting: [
        {
          type: 'selection',
          width: 80
        },
        {
          prop: 'code',
          label: '岗位编码',
          tooltip: false
          // align: 'left',
          // width:'200px'
        },
        {
          prop: 'fullNameZh',
          label: '岗位全称',
          tooltip: true,
          // align: 'left',
          emit: 'go-detail',
          // openNewPage: true,
          customRender: (h, scope) => {
            return <span class="open-link-text">{scope.row.fullNameZh}</span>
          }
        },
        {
          prop: 'isDeptLead',
          label: '组织领导',
          align: 'center',
          width: 80,
          tooltip: false,
          customRender: (h, scope) => {
            const isLeader = scope.row.isDeptLead ? '是' : '否'
            return <span>{isLeader}</span>
          }
        },
        {
          prop: 'memberCount',
          label: '用户数量',
          align: 'center',
          width: 80,
          tooltip: false,
          customRender: (h, scope) => {
            return (
              <span>
                {scope.row.userDTOList ? scope.row.userDTOList.length : 0}
              </span>
            )
          }
        }
      ]
    }
  },
  computed: {
    tableLoading() {
      return this.$store.state.position.pos.loading
    },
    tableListData() {
      return this.$store.state.position.pos.list
    },
    posPage() {
      return this.$store.state.position.pos.page
    },
    orgSelected() {
      return this.$store.state.position.org.itemSelected
    },
    tableHeight() {
      const bodyHeight = document.body.clientHeight
      if (bodyHeight) {
        return bodyHeight - 300 + 'px'
      }
      return '500px'
    }
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.posPage.pageSize = val
      this.$store.dispatch('SET_PAGE', this.posPage)
      const params = {
        type: 'pos',
        params: this.$store.state.position.pos.query
      }
      this.$store.dispatch('GetPositionList', params)
    },
    handleCurrentChange(val) {
      this.posPage.currPage = val
      console.log(`当前页: ${val}`)
      this.$store.dispatch('SET_PAGE', this.posPage)
      const params = {
        type: 'pos',
        params: this.$store.state.position.pos.query
      }
      this.$store.dispatch('GetPositionList', params)
    },
    handleGoDetail(val) {
      const deptId = this.orgSelected.id || val.deptId
      openUrl(`/position/operate/detail?id=${val.id}&deptId=${deptId}`)
      // this.$router.push({
      //   path: '/position/operate/detail',
      //   query: {
      //     id: val.id,
      //     deptId: this.orgSelected.id,
      //     menuType: this.$route.query.menuType
      //   }
      // })
    },
    handleSelectionChange(val) {
      this.$store.commit('SET_SELECTED_LIST_POS', val)
    }
  }
}
</script>
