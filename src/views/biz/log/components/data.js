export const FILTER_FORM = {
  createDate_gt: '',
  createDate_le: '',
  adminType: '',
  content_like: '',
  userNum$creator_or: ''
}

export const FILTER_TYPES = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '新增',
    value: '新增'
  },
  {
    label: '修改',
    value: '修改'
  },
  {
    label: '删除',
    value: '删除'
  },
  {
    label: '导出',
    value: '导出'
  }
]

export const TABLE_COLUMS = [
  {
    i18n: '序号',
    type: 'index',
    width: '50px',
    label: '序号'
  },
  {
    prop: 'createBy',
    i18n: '用户ID'
  },
  {
    prop: 'creator',
    i18n: '用户名'
  },
  {
    prop: 'userRole',
    i18n: '用户类型'
  },
  {
    prop: 'adminTypeName',
    i18n: '操作类型'
  },
  {
    prop: 'content',
    i18n: '操作内容',
    minWidth: 250,
    tooltip: true
  },
  {
    prop: 'rqTime',
    i18n: '操作时间'
  }
]
