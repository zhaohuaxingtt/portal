<template>
  <div class="table-box">
    <iTableCustom
      :loading="tableLoading"
      :data="queryFlag ? queryList : tableListData"
      :columns="tableSetting"
      :height="tableHeight"
      highlight-current-row
      virtual-list
      @handle-current-change="handleCurrentChange"
      :tree-expand="
        queryFlag ? {} : { expandKey: 'nameZh', childrenKey: 'supDeptList' }
      "
      @go-detail="handleGoDetail"
      ref="orgTable"
    >
    </iTableCustom>
  </div>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
export default {
  components: {
    iTableCustom
  },
  data() {
    const _self = this
    return {
      flag: false,
      // currentRow: null,
      // tableLoading: false,
      tableSetting: [
        // {
        //   align: 'left',
        //   width: 80,
        //   customRender: (h, scope) => {
        //     if (scope.row.id === _self.currentRow?.id) {
        //       return (
        //         <div class="org-select selected">
        //           <i class="el-icon-check"></i>
        //         </div>
        //       )
        //     } else {
        //       return <div class="org-select"></div>
        //     }
        //   }
        // },
        {
          prop: 'nameZh',
          label: '组织机构名称',
          i18n:'组织机构名称',
          // width: 200,
          key: '',
          tooltip: false,
          align: 'center',
          emit: 'go-detail',
          type: 'expanded',
          customRender: (h, scope) => {
            return <span>{scope.row.nameZh}</span>
          }
        },
        {
          prop: 'fullCode',
          label: '组织机构编号',
          i18n:'组织机构编号',
          key: '',
          width: 120,
          tooltip: false,
          align: 'left'
        },
        {
          prop: 'posCount',
          label: '岗位数量',
          i18n:'岗位数量',
          width: 100,
          align: 'center',
          key: '',
          tooltip: false,
          customRender: (h, scope) => {
            return (
              <span>
                {(scope.row.positionList && scope.row.positionList.length) || 0}
              </span>
            )
          }
        },
        {
          prop: 'userCount',
          label: '用户数量',
          i18n:'用户数量',
          align: 'center',
          width: 100,
          key: '',
          tooltip: false
        }
      ]
    }
  },
  async mounted() {
    this.deptId = this.$route.query.deptId || ''
    // this.$refs.orgTable.$refs.theCustomTable.setCurrentRow(
    //   this.tableListData[this.index]
    // )
    this.$store.dispatch('GetOrgList', '')
  },
  computed: {
    tableLoading() {
      return this.$store.state.position.org.loading
    },
    queryList() {
      return this.$store.state.position.org.arrayList
    },
    tableListData() {
      return this.$store.state.position.org.list
    },
    queryFlag() {
      return this.$store.state.position.org.queryFlag
    },
    currentRow: {
      get() {
        return this.$store.state.position.org.currentRow
      },
      set(val) {
        this.$store.commit('SET_ORG_CURRENT_ROW', val)
      }
    },
    tableHeight() {
      const bodyHeight = document.body.clientHeight
      if (bodyHeight) {
        return bodyHeight - 220 + 'px'
      }
      return '500px'
    }
  },
  methods: {
    handleGoDetail() {},
    handleCurrentChange(data) {
      const params = {
        type: 'pos',
        params: this.$store.state.position.pos.query
      }
      this.currentRow = data
      this.$store.commit('SET_CURRENT_ORG', data)
      this.$store.dispatch('GetPositionList', params)
    }
  }
}
</script>
