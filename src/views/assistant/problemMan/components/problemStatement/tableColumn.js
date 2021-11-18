export const tableColumn = (e) => {
  return [
    {
      type: 'index',
      label: '序号',
      width: 50,
      customRender: (h, scope) => {
        console.log(scope.row, '====', e)
        return <span class="open-link-text">{scope.row.index}===</span>
      }
    },
    {
      prop: 'userNum',
      label: '员工号',
      i18n: 'staffManagement.EMPLOYEENUMBER',
      align: 'center',
      emit: 'go-detail',
      customRender: (h, scope) => {
        return <span class="open-link-text">{scope.row.userNum}</span>
      },
      tooltip: true
    },
    {
      prop: 'account',
      label: '登录账号',
      i18n: '登录账号',
      align: 'center'
    },
    {
      prop: 'nameZh',
      label: '姓名',
      width: '100px',
      align: 'center',
      i18n: '中文名',
      tooltip: true
    },
    {
      prop: 'nameEn',
      label: '英文名',
      align: 'center',
      i18n: 'staffManagement.ENGLISHNAME',
      tooltip: true
    },
    {
      prop: 'gender',
      label: '性别',
      align: 'center',
      i18n: 'staffManagement.SEX',
      tooltip: true
    },
    {
      prop: 'deptList',
      label: '所属部门',
      align: 'center',
      i18n: 'staffManagement.DEPARTMENT',
      tooltip: true
    },
    {
      prop: 'positionList',
      label: '岗位',
      align: 'center',
      i18n: 'staffManagement.JOBS',
      tooltip: true
    }
  ]
}
