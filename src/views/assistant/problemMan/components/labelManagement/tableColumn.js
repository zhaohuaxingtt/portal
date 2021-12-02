export const tableColumn = (list) => {
  return [
    {
      type: 'selection',
      width: 50
    },
    {
      type:'index',
      label:'序号'
    },
    {
      prop: 'lableName',
      label: '标签内容',
      align: 'center',
    },
    {
      // prop: 'moduleId',
      label: '问题模块',
      i18n: '问题模块',
      align: 'center',
      customRender: (h, scope) => {
        return list[scope.row.moduleId] ? list[scope.row.moduleId].menuName : "";
      }
    },
    {
      prop: 'createByName',
      label: '添加人',
      width: '100px',
      align: 'center',
      tooltip: true
    },
    {
      prop: 'createDate',
      label: '添加日期',
      align: 'center',
      tooltip: true
    }
  ]
}
