/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-09-08 18:58:00
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
 */
export const TABLE_COLUMNS = [
  {
    type: 'selection',
    width: 50
  },
  {
    prop: 'name',
    label: '任务名称',
    i18n: 'APPROVAL.TASK_NAME',
    emit: 'go-detail',
    openNewPage: true,
    // minWidth:'150px',
    tooltip: true,
    customRender: (h, scope) => {
      return <span class="link-text">{scope.row.name}</span>
    }
  },
  {
    prop: 'content',
    label: '任务描述',
    i18n: 'APPROVAL.TASK_DESC'
  },
  {
    prop: 'initiationDate',
    label: '发起时间',
    i18n: 'APPROVAL.THE_START_TIME'
  },
  {
    prop: 'deadlineDate',
    label: '截止时间',
    i18n: 'APPROVAL.DEADLINE_TIME'
  },
  {
    prop: 'processingStatusName',
    label: '任务状态',
    i18n: 'APPROVAL.TASK_STATUS'
  }
]
export const SEARCH_DATA = {
  name: '',
  processingStatus: '',
  timeRanges: []
}
