<template>
  <iPage class="template">
    <pageHeader>
      <span>{{ language('已审批列表') }}</span>
<!--      <div slot="actions">-->
<!--        <actionHeader-->
<!--          :todo-total="todoTotal"-->
<!--          :task-type="1"-->
<!--          :search-form="form"-->
<!--        />-->
<!--      </div>-->
    </pageHeader>
    <searchForm is-finished :isSourceFindingPoint="true" @search="search" />
    <iCard>
      <div class="operation-btn">
        <iButton @click="exportTemplate">
          {{ language('LK_DAOCHU') }}
        </iButton>
      </div>
      <div class="cus-action-header">
        <actionHeader
          :todo-total="todoTotal"
          :task-type="1"
          :search-form="form"
        />
      </div>
      <i-table-custom
        :loading="loading"
        :data="tableListData"
        :columns="tableTitle"
        :extra-data="tableExtraData"
        @handle-selection-change="handleSelectionChange"
        @go-detail="handleTableClick"
        ref="approvalTable"
      />
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
    </iCard>
  </iPage>
</template>

<script>
import { iCard, iPage, iPagination, iButton } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import filters from '@/utils/filters'
import { BPM_SINGL_CATEGORY_LIST, MAP_APPROVAL_TYPE } from '@/constants'
import iTableCustom from '@/components/iTableCustom'
import pageHeader from '@/components/pageHeader'
import taskMixin from './taskMixin'

import { queryFinishedApprovals } from '@/api/approval/myApproval'
import { actionHeader, searchForm } from './components'
import { filterEmptyValue } from '@/utils'
import { excelExport } from '@/utils/filedowLoad'

export default {
  mixins: [pageMixins, filters, taskMixin],
  components: {
    iPage,
    iCard,
    iPagination,
    iTableCustom,
    iButton,
    pageHeader,
    searchForm,
    actionHeader
  },
  data() {
    return {
      taskType: 0,
      tableListData: [],
      tableExtraData: {
        taskType: 0
      },
      tableTitle: [
        {
          prop: 'businessId',
          label: '单据编号',
          i18n: '单据编号',
          tooltip: true,
          width: 130,
          emit: 'go-detail',
          customRender: (h, scope) => {
            if (scope.row.taskType !== '我的任务') {
              return (
                <span class="open-link-text">
                  <Icon symbol name="iconsheweizhuyonghu1" />{' '}
                  {scope.row.businessId}
                </span>
              )
            }
            return <span class="open-link-text">{scope.row.businessId}</span>
          }
        },
        {
          prop: 'itemType',
          label: '业务模块',
          i18n: '业务模块',
          tooltip: true,
          Width: 130
        },
        {
          prop: 'processDefinitionName',
          label: '任务名称',
          i18n: '任务名称',
          tooltip: true,
          Width: 180
        },
        {
          prop: 'itemEvent',
          label: '审批事项',
          i18n: '审批事项',
          tooltip: true,
          minWidth: 200,
          align: 'left',
          headerAlign: 'center',
          customRender: (h, scope) => {
            return <span>{scope.row.itemEvent || ''}</span>
          }
        },

        {
          prop: 'createDate',
          label: '任务开始时间?',
          i18n: '任务开始时间',
          tooltip: true,
          width: 120,
          customRender: (h, scope) => {
            if (scope.row.createDate) {
              // eslint-disable-next-line no-undef
              return moment(scope.row.createDate).format('YYYY-MM-DD')
            }
            return <span>{scope.row.createDate}</span>
          }
        },
        {
          prop: 'applyUserName',
          label: '申请人',
          i18n: '申请人',
          tooltip: true,
          width: 100,
          customRender: (h, scope) => {
            // const res = []
            /* if (scope.row.deptFullCode) {
              res.push(scope.row.deptFullCode)
            }
            if (scope.row.applyUserName) {
              res.push(scope.row.applyUserName)
            }
            return <span>{res.join(' ')}</span> */
            return scope.row.applyUserName
          }
        },
        {
          prop: 'deptFullCode',
          label: '申请部门',
          i18n: '申请部门',
          tooltip: true,
          width: 100
        },
        {
          prop: 'applyDate',
          label: '申请时间',
          i18n: '申请时间',
          tooltip: true,
          width: 140
        }
      ],
      selectTableData: [],
      form: {},
      agreeType: 1,
      dialogApprovalVisible: false,
      todoTotal: 0,
      approvalTypeMap: MAP_APPROVAL_TYPE,
      templates: [],
      modelTemplate: []
    }
  },
  created() {
    const queryForm = JSON.parse(
      decodeURIComponent(this.$route.query.todoQueryStr)
    )
    if (queryForm.categoryList) {
      let modelTemplate = []
      const { categoryList } = queryForm
      if (categoryList) {
        if (_.isArray(categoryList)) {
          modelTemplate = JSON.stringify(categoryList)
        } else {
          modelTemplate = JSON.stringify([categoryList])
        }
      }
      this.modelTemplate = modelTemplate
    }
  },
  methods: {
    //打开详情页
    handleTableClick(item) {
      this.goDetail(item, 1, this.genQueryData())
    },
    // 查询
    search(val, templates) {
      this.form = { ...val }
      this.templates = templates
      this.page.currPage = 1
      this.getTableList()
    },
    toggleTaskType(taskType) {
      this.taskType = taskType
      Vue.set(this.tableExtraData, 'taskType', taskType)
      this.page.currPage = 1
      this.form = {}
      this.getTableList()
    },
    genQueryData: function() {
      const searchData = filterEmptyValue(this.form)
      console.log(searchData)

      if (searchData.itemTypeList && (searchData.itemTypeList.length === 0 || (searchData.itemTypeList.length === 1 && searchData.itemTypeList[0] == -1))) {
        delete searchData.itemTypeList
      }
      if (searchData.categoryList && (searchData.categoryList.length === 0 || (searchData.categoryList.length === 1 && searchData.categoryList[0] == ''))) {
        delete searchData.categoryList
      }
      if (searchData.categoryList && _.isArray(searchData.categoryList)) {
        if (
          searchData.categoryList.length === 0 ||
          (searchData.categoryList.length === 1 &&
            searchData.categoryList[0] === '')
        ) {
          delete searchData.categoryList
        }
      }
      if (
        searchData.categoryList &&
        typeof searchData.categoryList === 'string'
      ) {
        searchData.categoryList = [searchData.categoryList]
      }

      const data = {
        taskType: this.taskType,
        userID: this.$store.state.permission.userInfo.id,
        ...searchData,
        isAeko: false
      }
      return data
    },
    getTableList() {
      this.loading = true
      const params = {
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      const data = this.genQueryData()
      const result = queryFinishedApprovals(params, data)

      result
        .then((res) => {
          this.loading = false
          const { current, size, total, records } = res.data
          this.page.currPage = current
          this.page.pageSize = size
          this.page.totalCount = total || 0
          this.tableListData = records
        })
        .finally(() => {
          this.loading = false
        })
    },
    //导出
    exportTemplate() {
      excelExport(
        this.tableListData,
        this.tableTitle,
        this.language('已审批列表')
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.operation-btn {
  float: right;
  display: flex;
  margin-bottom: 22px;
  text-align: right;
}
.cus-action-header {
  display: inline;
  ::v-deep .types {
    display: inline-flex;
  }
  ::v-deep .tab:first-child {
    margin-left: 0 !important;
  }
}
</style>
