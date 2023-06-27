import { desensitizationPhone, desensitizationEmail } from "@/utils";
//转派采购员
export const staffTableSetting = [
  {
    type: 'selection',
    width: 50
  },
  {
    type: 'index',
    // prop: 'shortCode',
    label: '#',
    align: 'left'
    // i18n: 'DISTRIBUTION.ODD_NUMBERS',
  },
  {
    prop: 'purchaserNum',
    label: '员工号',
    i18n: 'DISTRIBUTION.EMPLOYEE_NUMBER',
    align: 'left'
    // type: 'expanded',
  },
  {
    prop: 'purchaserName',
    label: '员工姓名',
    align: 'center',
    i18n: 'DISTRIBUTION.EMPLOYEE_NAME'
  },
  {
    prop: 'belongToOrgCode',
    label: '所属股别',
    align: 'center',
    i18n: 'DISTRIBUTION.BELONGING_SHARES'
  },
  {
    prop: 'email',
    label: '邮箱',
    align: 'center',
    i18n: 'DISTRIBUTION.EMAIL'
  }
]

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
    tooltip: true,
    sortable: true
  },
  {
    prop: 'account',
    label: '登录账号',
    i18n: '登录账号',
    align: 'center',
    sortable: true
  },
  {
    prop: 'nameZh',
    label: '姓名',
    width: '100px',
    align: 'center',
    i18n: '中文名',
    tooltip: true,
    sortable: true
  },
  {
    prop: 'nameEn',
    label: '英文名',
    align: 'center',
    i18n: 'staffManagement.ENGLISHNAME',
    tooltip: true,
    sortable: true
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
    },
    sortable: true,
    sortMethod: (a, b) => {
      const aValue = ['male', '1'].includes(a.gender) ? '男' : '女'
      const bValue = ['male', '1'].includes(b.gender) ? '男' : '女'
      if (aValue === bValue) {
        return 0
      }
      return aValue > bValue ? 1 : -1
    }
  },
  {
    prop: 'deptNumList',
    label: '所属部门',
    align: 'center',
    i18n: 'staffManagement.DEPARTMENT',
    tooltip: true,
    sortable: true
  },
  {
    prop: 'positionList',
    label: '岗位',
    align: 'center',
    i18n: 'staffManagement.JOBS',
    tooltip: true,
    sortable: true
  },
  {
    prop: 'status',
    label: '员工状态',
    align: 'center',
    i18n: 'staffManagement.STATEEMPLOYEES',
    tooltip: true,
    sortable: true
  },
  {
    prop: 'email',
    label: '邮箱',
    align: 'center',
    i18n: 'staffManagement.EMAIL',
    tooltip: true,
    sortable: true,
    customRender: (h, scope) => {
      return desensitizationEmail(scope.row.email)
    }
  },
  {
    prop: 'mobile',
    label: '手机',
    align: 'center',
    i18n: 'staffManagement.MOBILEPHONE',
    tooltip: true,
    sortable: true,
    customRender: (h, scope) => {
      return desensitizationPhone(scope.row.mobile)
    }
  },
  {
    prop: 'phone',
    label: '电话',
    align: 'center',
    i18n: 'staffManagement.PHONE',
    tooltip: true,
    sortable: true,
    customRender: (h, scope) => {
      return desensitizationPhone(scope.row.phone)
    }
  },
  {
    prop: 'lastLoginDate',
    label: '最近登录',
    align: 'center',
    i18n: 'staffManagement.RECENTLYTHELOGIN',
    tooltip: true,
    width: '150',
    sortable: true
  }
]