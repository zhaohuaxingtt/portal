<template>
  <iPage>
    <pageHeader class="margin-bottom20">
      <span>{{language('岗位代理')}}</span>
      <div slot="actions">
        <actionButtons
          :selected-rows="selectedRows"
          @add="handleAdd"
          @edit="handleEdit"
          @delete="handleDelete"
          @handle-setting="$refs.agentTable.openSetting()"
        />
      </div>
    </pageHeader>
    <iCard>
      <i-table-custom
        :loading="loading"
        :data="tableData"
        :columns="tableColumns"
        :extra-data="tableExtraData"
        permission-key="CF_PRO_CS_POSITION_AGENT"
        @handle-selection-change="handleSelectionChange"
        @go-detail="handleTableClick"
        ref="agentTable"
      />
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableData)"
        @current-change="handleCurrentChange($event, getTableData)"
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
// 代理岗位，代理开始时间，结束时间，代理时长，创建人，创建时间，状态
import { iCard, iPage, iPagination, iMessage } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { pageMixins } from '@/utils/pageMixins'
import pageHeader from '@/components/pageHeader'
import { actionButtons } from './components'
import { deletePosition, fetchPositionList } from '@/api/position/agent'
import deleteMixin from '@/mixins/deleteMixin'
export default {
  name: 'PositionAgent',
  components: {
    iTableCustom,
    iCard,
    iPage,
    iPagination,
    pageHeader,
    actionButtons
  },
  mixins: [pageMixins, deleteMixin],
  data() {
    return {
      tableColumns: [
        {
          type: 'selection',
          width: '60'
        },
        {
          prop: 'businessId',
          i18n: '代理申请号',
          width: 140
        },
        {
          prop: 'applyUserName',
          i18n: '员工姓名',
          width: 150
        },
        {
          prop: 'fullNameZh',
          i18n: '代理岗位',
          width: 180
        },
        {
          prop: 'startDate',
          i18n: '代理开始日期',
          width: 120,
          customRender: (h, scope) => {
            return scope.row.startDate && scope.row.startDate.substr(0, 10)
          }
        },
        {
          prop: 'endDate',
          i18n: '代理结束日期',
          width: 120,
          customRender: (h, scope) => {
            return scope.row.startDate && scope.row.endDate.substr(0, 10)
          }
        },
        {
          prop: 'durationDays',
          i18n: '时长',
          width: 120,
          customRender: (h, scope) => {
            return scope.row.durationDays + '天'
          }
        },
        {
          prop: 'description',
          i18n: '代理原因'
        },
        {
          prop: 'createDate',
          i18n: '创建时间',
          width: 180
        },
        {
          prop: 'status',
          i18n: '状态',
          width: 100,
          customRender: (h, scope) => {
            return this.agenStatus(scope.row.status)
          }
        }
      ],
      tableData: [],
      loading: false,
      tableExtraData: {},
      selectedRows: [],
      isMock: false
    }
  },
  created() {
    this.getTableData()
    window.addEventListener('message', this.handleRefresh)
  },
  methods: {
    handleRefresh(e) {
      if (e.data === 'refresh') {
        this.getTableData()
      }
    },
    handleSelectionChange(val) {
      this.selectedRows = val
    },
    handleTableClick(val) {},
    getTableData() {
      this.loading = true

      let param = {
        type: 3,
        size: this.page.pageSize,
        current: this.page.currPage
      }
      fetchPositionList(param)
        .then((value) => {
          if (value.code === '200') {
            this.tableData = value.data
            this.loading = false
            this.page.totalCount = value.total
          }
        })
        .catch((val) => {})
    },
    handleAdd() {
      /* this.$router.push({
        name: 'CFPositionAgentApply',
        params: {
          id: '0',
          operation: 'create'
        }
      }) */
      window.open(`/portal/#/cf-position/agent/apply/0/create`)
    },
    handleEdit() {
      let selectID = this.selectedRows[0].id
      /* console.log('===', selectID)
      this.$router.push({
        name: 'CFPositionAgentApply',
        params: {
          id: selectID,
          operation: 'edit'
        }
      }) */
      window.open(`/portal/#/cf-position/agent/apply/${selectID}/create`)
    },
    handleDelete() {
      if (this.selectedRows.filter((e) => e.status == 2).length > 0) {
        iMessage.error('审批中的轮岗不允许删除')
        return
      }
      this.onDelete().then(() => {
        //删除选中代理岗位
        let param = this.selectedRows.map((value) => {
          return value.id
        })
        deletePosition(param)
          .then((value) => {
            if (value.code === '200') {
              //重新获取数据
              this.getTableData()
            }
          })
          .catch((val) => {
            //异常处理
          })
      })
    },
    agenStatus(val) {
      const statusMap = {
        1: '草稿',
        2: '审批中',
        3: '同意',
        4: '拒绝',
        5: '撤回'
      }
      return statusMap[val.toString()]
    }
  },
  destroyed() {
    window.removeEventListener('message', this.handleRefresh)
  }
}
</script>

<style lang="scss" scoped></style>
