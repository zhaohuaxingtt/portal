<template>
  <iPage>
    <pageHeader>
      <span>轮岗</span>
      <div slot="actions">
        <actionButtons
          :selected-rows="selectedRows"
          @add="handleAdd"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </div>
    </pageHeader>
    <iCard>
      <i-table-custom
        :loading="loading"
        :data="tableData"
        :columns="tableColumns"
        :extra-data="tableExtraData"
        @handle-selection-change="handleSelectionChange"
        @go-detail="handleTableClick"
        ref="approvalTable"
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
// 轮岗，轮岗开始时间，结束时间，代理时长，创建人，创建时间，状态
import { iCard, iPage, iPagination, iMessage } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { pageMixins } from '@/utils/pageMixins'
import pageHeader from '@/components/pageHeader'
import { actionButtons } from './components'
import { fetchPositionList, deletePosition } from '@/api/position/agent'
import deleteMixin from '@/mixins/deleteMixin'
import { openUrl } from '@/utils'
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
          label: '轮岗申请号',
          width: 160
        },
        {
          prop: 'applyUserName',
          label: '员工姓名',
          minWidth: 180
        },
        {
          prop: 'sourceName',
          minWidth: 180,
          label: '原岗位'
        },
        {
          prop: 'fullNameZh',
          label: '目标岗位'
        },
        {
          prop: 'startDate',
          label: '交接开始日期',
          width: 120,
          customRender: (h, scope) => {
            return scope.row.startDate && scope.row.startDate.substr(0, 10)
          }
        },
        {
          prop: 'endDate',
          label: '交接结束日期',
          width: 120,
          customRender: (h, scope) => {
            return scope.row.endDate && scope.row.endDate.substr(0, 10)
          }
        },
        {
          prop: 'durationDays',
          label: '时长',
          width: 120,
          customRender: (h, scope) => {
            return scope.row.durationDays + '天'
          }
        },
        {
          prop: 'createDate',
          label: '创建时间',
          width: 150
        },
        {
          prop: 'status',
          label: '状态',
          width: 100,
          customRender: (h, scope) => {
            return this.agenStatus(scope.row.status)
            // return <span class="open-link-text">{scope.row.nameZh}</span>;
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
      console.log('getList')
      this.loading = true

      let param = {
        type: 2,
        size: this.page.pageSize,
        current: this.page.currPage
      }
      fetchPositionList(param)
        .then((value) => {
          if (value.code == 200) {
            this.tableData = value.data
            this.page.totalCount = value.total
          }
        })
        .catch((val) => {
          iMessage.error(val.desZh || '获取失败')
        })
        .finally(() => (this.loading = false))
    },
    handleAdd() {
      window.open(`/portal/#/cf-position/transfer/apply/0/create`)
      // this.$router.push({
      //   name: 'CFPositionTransferApply',
      //   params: {
      //     id: '0',
      //     operation: 'create'
      //   }
      // })
    },
    handleEdit() {
      let selectID = this.selectedRows[0].id
      /* this.$router.push({
        name: 'CFPositionTransferApply',
        params: {
          id: selectID,
          operation: 'edit'
        }
      }) */
      window.open(`/portal/#/cf-position/transfer/apply/${selectID}/edit`)
    },
    handleDelete() {
      if (this.selectedRows.filter((e) => e.status == 2).length > 0) {
        iMessage.error('审批中的轮岗不允许删除')
        return
      }
      this.onDelete().then(() => {
        //删除选中轮岗位
        let ids = this.selectedRows.map((value) => {
          return value.id
        })
        let param = ids
        deletePosition(param)
          .then((value) => {
            if (value.code == 200) {
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
      if (val == '1') {
        return '草稿'
      } else if (val == '2') {
        return '审批中'
      } else if (val == '3') {
        return '同意'
      } else {
        return '拒绝'
      }
    }
  },
  destroyed() {
    window.removeEventListener('message', this.handleRefresh)
  }
}
</script>

<style lang="scss" scoped></style>
