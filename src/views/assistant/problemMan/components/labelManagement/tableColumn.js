export const tableColumn = (e) => {
  return [
    {
      type: 'selection',
      width: 50
    },
    {
      prop: 'userNum',
      label: '标签内容',
      i18n: 'staffManagement.EMPLOYEENUMBER',
      align: 'center',
      emit: 'go-detail'
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
      i18n: '中文名',
      tooltip: true
    },
    {
      prop: 'nameEn',
      label: '添加日期',
      align: 'center',
      i18n: 'staffManagement.ENGLISHNAME',
      tooltip: true
    }
  ]
}
