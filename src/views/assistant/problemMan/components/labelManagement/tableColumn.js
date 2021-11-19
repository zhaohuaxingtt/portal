export const tableColumn = (e) => {
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
      prop: 'userNum',
      label: '标签内容',
      align: 'center',
    },
    {
      prop: 'account',
      label: '问题模块',
      i18n: '问题模块',
      align: 'center'
    },
    {
      prop: 'nameZh',
      label: '通知人',
      width: '100px',
      align: 'center',
      tooltip: true
    },
    {
      prop: 'nameEn',
      label: '添加日期',
      align: 'center',
      tooltip: true
    }
  ]
}
