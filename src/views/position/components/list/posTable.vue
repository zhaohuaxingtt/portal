<template>
  <div class="table-box">
    <btnBox
      :operations="operations"
      :showBtns="showBtns"
      @handle-setting="$refs.positoinTable.openSetting()"
    />
    <iTableCustom
      ref="positoinTable"
      :loading="tableLoading"
      :data="tableListData"
      :columns="tableSetting"
      :height="tableHeight"
      permission-key="ADMIN_PRO_CS_POSITION_VIEW"
      @handle-selection-change="handleSelectionChange"
      @go-detail="handleGoDetail"
    >
    </iTableCustom>
    <!-- 分页标签 -->
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
      :pager-count="5"
    >
    </iPagination>
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
  props: {
    showBtns: {
      type: Boolean,
      default: true
    }
  },
  created() {
    if (this.$route.fullPath.includes('cf-position')) {
      this.tableSetting.shift()
    }
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
          i18n: '岗位编码',
          tooltip: false,
          sortable: true,
          width: '120px'
        },
        {
          prop: 'fullNameZh',
          label: '岗位全称',
          i18n: '岗位全称',
          tooltip: true,
          // align: 'left',
          emit: 'go-detail',
          // openNewPage: true,
          customRender: (h, scope) => {
            return <span class="open-link-text">{scope.row.fullNameZh}</span>
          },
          sortable: true
        },
        {
          prop: 'isDeptLead',
          label: '组织领导',
          align: 'center',
          i18n: '组织领导',
          width: 120,
          tooltip: false,
          customRender: (h, scope) => {
            const isLeader = scope.row.isDeptLead ? '是' : '否'
            return <span>{isLeader}</span>
          },
          sortable: true
        },
        {
          prop: 'memberCount',
          label: '用户数量',
          i18n: '用户数量',
          align: 'center',
          width: 120,
          tooltip: false,
          customRender: (h, scope) => {
            return (
              <span>
                {scope.row.userDTOList ? scope.row.userDTOList.length : 0}
              </span>
            )
          },
          sortable: true,
          sortMethod: (a, b) => {
            const aLen = a?.userDTOList?.length || 0
            const bLen = b?.userDTOList?.length || 0
            return aLen - bLen
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
        return bodyHeight - 470 + 'px'
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
      openUrl(
        `/position/operate/detail?id=${val.id}&deptId=${deptId}&editable=${
          this.showBtns ? 1 : 2
        }`
      )
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
