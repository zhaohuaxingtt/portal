export { default as Search } from './theOfflineDownloadSearch.vue'
export { default as TableList } from './theOfficeDownloadTableList.vue'

export const TABLE_COLUMNS = [
  {
    type: 'selection'
  },
  {
    i18n: '序号',
    type: 'index'
  },
  {
    i18n: '任务编号',
    prop: 'taskCode',
    sortable: true
  },
  {
    i18n: '任务名称',
    prop: 'name',
    sortable: true
  },
  {
    i18n: '执行时间',
    prop: 'startTime',
    sortable: true
  },
  {
    i18n: '结束时间',
    prop: 'endTime',
    sortable: true
  },
  {
    i18n: '状态',
    prop: 'status',
    customRender: (h, scope) => {
      if (scope.row.status == 'INPROCESS') {
        return '执行中'
      } else if (scope.row.status == 'SUCCESS') {
        return '成功'
      } else if (scope.row.status == 'FAIL') {
        return '失败'
      } else {
        return ''
      }
    },
    sortable: true
  },
  {
    i18n: '操作人',
    prop: 'userName',
    sortable: true
  }
]

export const SEARCH_FORM_CONTENT = {
  taskCode: '',
  taskName: '',
  userName: '',
  status: '',
  time: ''
}
