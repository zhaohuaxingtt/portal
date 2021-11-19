export const tableColumn = () => {
  return [
    {
      type: 'selection',
      width: 50
    },
    {
      type: 'index',
      width: 50,
      label: '序号'
    },
    {
      prop: 'userNum',
      label: '负责模块',
      i18n: 'staffManagement.EMPLOYEENUMBER',
      align: 'center',
      emit: 'go-detail'
    },
    {
      prop: 'account',
      label: '姓名',
      align: 'center'
    },
    {
      prop: 'positionList',
      label: '更新时间',
      align: 'center',
      i18n: 'staffManagement.JOBS',
      tooltip: true
    }
  ]
}
