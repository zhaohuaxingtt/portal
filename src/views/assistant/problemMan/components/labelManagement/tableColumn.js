export const tableColumn = (list) => {
  return [
    {
      type: 'selection',
      width: 50
    },
    {
      type: 'index',
      label: '#',
      width: 100
    },
    {
      prop: 'lableName',
      label: '标签内容',
      i18n: '标签内容',
      align: 'center',
      sortable: true
    },
    {
      // prop: 'moduleId',
      label: '问题模块',
      i18n: '问题模块',
      align: 'center',
      customRender: (h, scope) => {
        return list[scope.row.moduleId] ? list[scope.row.moduleId].menuName : ''
      },
      sortable: true
    },
    {
      prop: 'createByName',
      label: '添加人',
      i18n: '添加人',
      align: 'center',
      tooltip: true,
      sortable: true
    },
    {
      prop: 'createDate',
      label: '添加日期',
      i18n: '添加日期',
      align: 'center',
      tooltip: true,
      sortable: true
    }
  ]
}
