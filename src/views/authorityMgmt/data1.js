// 员工列表Table配置
export const tableSetting = [
  {
    type: 'selection',
    width: 50
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
    tooltip: true,
    customRender: (h, scope) => {
      if (['male', '1'].includes(scope.row.gender)) {
        return '男'
      }
      if (['female', '2'].includes(scope.row.gender)) {
        return '女'
      }
      return scope.row.gender
    }
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
  },
  {
    prop: 'status',
    label: '员工状态',
    align: 'center',
    i18n: 'staffManagement.STATEEMPLOYEES',
    tooltip: true
  },
  {
    prop: 'email',
    label: '邮箱',
    align: 'center',
    i18n: 'staffManagement.EMAIL',
    tooltip: true
  },
  {
    prop: 'mobile',
    label: '手机',
    align: 'center',
    i18n: 'staffManagement.MOBILEPHONE',
    tooltip: true
  },
  {
    prop: 'phone',
    label: '电话',
    align: 'center',
    i18n: 'staffManagement.PHONE',
    tooltip: true
  },
  {
    prop: 'updateDate',
    label: '最近登录',
    align: 'center',
    i18n: 'staffManagement.RECENTLYTHELOGIN',
    tooltip: true
  }
]

export const exportTableSetting = [
  {
    props: 'userNum',
    name: '员工号'
  },
  {
    props: 'nameZh',
    name: '姓名'
  },
  {
    props: 'nameEn',
    name: '英文名'
  },
  {
    props: 'gender',
    name: '性别',
    customRender: (h, scope) => {
      if (scope.row.gender === '1') {
        return '男'
      }
      if (scope.row.gender === '2') {
        return '女'
      }
      return scope.row.gender
    }
  },
  {
    props: 'deptList',
    name: '所属部门'
  },
  {
    props: 'positionList',
    name: '岗位'
  },
  {
    props: 'status',
    name: '员工状态'
  },
  {
    props: 'email',
    name: '邮箱'
  },
  {
    props: 'mobile',
    name: '手机'
  },
  {
    props: 'phone',
    name: '电话'
  },
  {
    props: 'remark',
    name: '最近登录'
  }
]
