export const TABLE_KEYWORDS_COLUMNS = [
  {
    type: 'selection'
  },
  {
    type: 'index',
    label: '#'
  },
  {
    label: '关键词',
    i18n: '关键词',
    prop: 'keyWord',
    sortable: true
  },
  {
    label: '添加时间',
    i18n: '添加时间',
    prop: 'createDate',
    sortable: true
    // customRender: (h, scope) => {
    //     return <span>{scope.row.createDate | }</span>
    // }
  }
]
