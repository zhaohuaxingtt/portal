<template>
  <iPage class="template">
    <pageHeader>
      <span>待审批列表</span>
      <div slot="actions">
        <actionHeader :todo-total="todoTotal" :task-type="0" />
      </div>
    </pageHeader>
    <searchForm @search="search" />
    <iCard>
      <actionButtons
        :selected-row="selectTableData"
        :task-type="taskType"
        :category-list="form.categoryList"
        @complete="batchComplete"
        @export="exportTemplate"
      />
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
import { iCard, iMessage, iPage, iPagination } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import filters from '@/utils/filters'
import { MAP_APPROVAL_TYPE, BPM_SINGL_CATEGORY_LIST } from '@/constants'
import iTableCustom from '@/components/iTableCustom'
import pageHeader from '@/components/pageHeader'
import taskMixin from './taskMixin'
import { actionButtons, actionHeader, searchForm } from './components'
import { queryUndoApprovals } from '@/api/approval/myApproval'
import { completeApproval } from '@/api/approval/myApproval'
import { filterEmptyValue } from '@/utils'
export default {
  mixins: [pageMixins, filters, taskMixin],
  components: {
    iPage,
    iCard,
    iPagination,
    iTableCustom,
    pageHeader,
    searchForm,
    actionHeader,
    actionButtons
  },
  data() {
    return {
      taskType: 0,
      tableListData: [],
      tableExtraData: {
        taskType: 0,
        queryTable: this.getTableList,
        onComplete: this.onComplete
      },
      tableTitle: [
        {
          type: 'selection',
          width: 50
        },
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
          label: '单据类型',
          i18n: '单据类型',
          tooltip: true,
          minWidth: 130
        },
        {
          prop: 'processDefinitionName',
          label: '任务名称',
          i18n: '任务名称',
          tooltip: true,
          minWidth: 180
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
          width: 100,
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
          label: '申请人?',
          i18n: '申请人',
          tooltip: true,
          width: 150,
          customRender: (h, scope) => {
            const res = []
            if (scope.row.deptFullCode) {
              res.push(scope.row.deptFullCode)
            }
            if (scope.row.applyUserName) {
              res.push(scope.row.applyUserName)
            }
            return <span>{res.join(' ')}</span>
          }
        },
        {
          prop: 'applyUserOrg',
          label: '申请部门?',
          i18n: '申请部门',
          tooltip: true,
          width: 150
        },
        {
          prop: 'applyDate',
          label: '申请时间',
          i18n: '申请时间',
          tooltip: true,
          width: 100
        }
      ],
      selectTableData: [],
      form: {
        approvalName: '',
        applyUserName: '',
        categoryList: ''
      },
      agreeType: 1,
      dialogApprovalVisible: false,
      todoTotal: 0,
      approvalTypeMap: MAP_APPROVAL_TYPE,
      templates: []
    }
  },
  created() {
    if (this.$route.query.modelTemplate) {
      /* this.form.categoryList = JSON.parse(this.$route.query.modelTemplate)
      console.log('categoryList', this.form.categoryList) */
      const moduleTemplate = JSON.parse(this.$route.query.modelTemplate)
      if (
        moduleTemplate.length === 1 &&
        BPM_SINGL_CATEGORY_LIST.includes(moduleTemplate[0])
      ) {
        this.form.categoryList = moduleTemplate[0]
      } else {
        this.form.categoryList = JSON.parse(this.$route.query.modelTemplate)
      }
    }
    // this.getTableList()
  },
  methods: {
    //表格选中值集
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    //打开详情页
    handleTableClick(item) {
      this.goDetail(item, this.taskType)
    },
    // 查询
    search(val, templates) {
      this.form = { ...val }
      this.templates = templates
      this.page.currPage = 1
      this.getTableList()
    },
    getTableList() {
      this.loading = true
      const params = {
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      const searchData = filterEmptyValue(this.form)
      console.log('searchData', searchData)

      if (searchData.itemTypeList && searchData.itemTypeList.length === 0) {
        delete searchData.itemTypeList
      }
      if (searchData.categoryList && searchData.categoryList.length === 0) {
        delete searchData.categoryList
      }
      if (
        searchData.categoryList &&
        typeof searchData.categoryList === 'string'
      ) {
        searchData.categoryList = [searchData.categoryList]
      }
      if (
        !searchData.categoryList ||
        (searchData.categoryList.length === 1 &&
          searchData.categoryList[0] === '')
      ) {
        searchData.categoryList = this.templates
          .filter(e => !BPM_SINGL_CATEGORY_LIST.includes(e.name))
          .map(e => e.name)
      }
      const data = {
        taskType: this.taskType,
        userID: this.$store.state.permission.userInfo.id,
        ...searchData,
        isAeko: false
      }

      const result = queryUndoApprovals(params, data)

      result
        .then(res => {
          this.loading = false
          const { current, size, total, records } = res.data
          this.page.currPage = current
          this.page.pageSize = size
          this.page.totalCount = total || 0
          this.tableListData = records
          this.$store.dispatch('setApprovalTodoNum', this.page.totalCount)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async batchComplete(type) {
      if (type === MAP_APPROVAL_TYPE.AGREE) {
        this.loading = true
        const errorMsgs = []
        for (let i = 0; i < this.selectTableData.length; i++) {
          const element = this.selectTableData[i]
          const data = {
            agree: type,
            taskAssignee: this.$store.state.permission.userInfo.id,
            taskId: element.taskId,
            variables: {},
            comment: '【同意】'
          }

          const res = await completeApproval(data).catch(() => {
            this.loading = false
          })
          if (!(res.result && res.data)) {
            const errorMsg = res.desZh || this.$t('APPROVAL.OPERATION_FAILED')
            errorMsgs.push(
              `● ${element.itemName}${this.$t(
                'APPROVAL.APPROVAL_FAILED'
              )}:${errorMsg}。`
            )
          }
        }
        if (errorMsgs.length > 0) {
          this.$message({
            type: 'error',
            dangerouslyUseHTMLString: true,
            message: errorMsgs.join('<br/>'),
            duration: 10000,
            showClose: true
          })
        } else {
          iMessage.success(this.$t('APPROVAL.APPROVAL_SUCCESS'))
        }
        this.getTableList()

        this.loading = false
      } else {
        this.goDetail(this.selectTableData[0], this.taskType)
      }
    },
    onComplete(row, type) {
      this.complete(row, type, this.getTableList)
    },
    approvelSuccess() {
      this.dialogApprovalVisible = false
      this.getTableList()
    }
  }
}
</script>

<style lang="scss" scoped></style>
