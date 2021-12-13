// 员工列表Table配置
export const tableSetting = [
  {
    prop: 'level',
    label: '',
    i18n: '',
    align: 'center',
    width: '50px'
  },
  {
    prop: 'userNum',
    label: '员工号',
    i18n: 'staffManagement.EMPLOYEENUMBER',
    align: 'center'
  },

  {
    prop: 'nameZh',
    label: '姓名',
    width: '100px',
    align: 'center',
    i18n: 'staffManagement.CHINESENAME'
  },
  {
    prop: 'nameEn',
    label: '英文名',
    align: 'center',
    i18n: 'staffManagement.ENGLISHNAME'
  },
  {
    prop: 'gender',
    label: '性别',
    align: 'center',
    i18n: 'staffManagement.SEX',
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
    prop: 'department',
    label: '所属部门',
    align: 'center',
    i18n: 'staffManagement.DEPARTMENT'
  },
  {
    prop: 'gw',
    label: '岗位',
    align: 'center',
    i18n: 'staffManagement.JOBS'
  },
  {
    prop: 'status',
    label: '员工状态',
    align: 'center',
    i18n: 'staffManagement.STATEEMPLOYEES'
  },
  {
    prop: 'email',
    label: '邮箱',
    align: 'center',
    i18n: 'staffManagement.EMAIL'
  },
  {
    prop: 'mobile',
    label: '手机',
    align: 'center',
    i18n: 'staffManagement.MOBILEPHONE'
  },
  {
    prop: 'phone',
    label: '电话',
    align: 'center',
    i18n: 'staffManagement.PHONE'
  },
  {
    prop: 'nation',
    label: '国籍',
    align: 'center',
    i18n: 'staffManagement.NATIONALITY'
  },
  {
    prop: 'updateDate',
    label: '最近登录',
    align: 'center',
    i18n: 'staffManagement.RECENTLYTHELOGIN'
  },
  {
    prop: 'property',
    label: '属性',
    align: 'center',
    i18n: 'staffManagement.ATTRIBUTE'
  }
]

export const levelSetting = [
  {
    prop: 'levelName',
    label: '',
    i18n: '',
    align: 'center',
    width: '50px'
  },
  {
    prop: 'userNum',
    label: '员工号',
    i18n: 'staffManagement.EMPLOYEENUMBER',
    align: 'center'
  },
  {
    prop: 'nameZh',
    label: '姓名',
    width: '100px',
    align: 'center',
    i18n: 'staffManagement.CHINESENAME'
  },
  {
    prop: 'nameEn',
    label: '英文名',
    align: 'center',
    i18n: 'staffManagement.ENGLISHNAME'
  },
  {
    prop: 'gender',
    label: '性别',
    align: 'center',
    i18n: 'staffManagement.SEX',
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
    prop: 'department',
    label: '所属部门',
    align: 'center',
    i18n: 'staffManagement.DEPARTMENT'
  },
  {
    prop: 'position',
    label: '岗位',
    align: 'center',
    i18n: 'staffManagement.JOBS',
    customRender: (h, scope) => {
      return scope.row?.positionDTO?.fullNameZh || ''
      /* const res = []
      console.log('111111111111', scope.row)
      if (scope.row.subUserList) {
        console.log('22222222222222222222')
        scope.row.subUserList.forEach((subUser) => {
          console.log('333333')
          if (subUser.positionDTO && subUser.positionDTO.fullNameZh) {
            console.log('55555555555555555')
            res.push(subUser.positionDTO.fullNameZh)
          }
        })
      }
      return res.join(',') */
    }
  },
  {
    prop: 'status',
    label: '员工状态',
    align: 'center',
    i18n: 'staffManagement.STATEEMPLOYEES'
  },
  {
    prop: 'email',
    label: '邮箱',
    align: 'center',
    i18n: 'staffManagement.EMAIL'
  },
  {
    prop: 'mobile',
    label: '手机',
    align: 'center',
    i18n: 'staffManagement.MOBILEPHONE'
  },
  {
    prop: 'phone',
    label: '电话',
    align: 'center',
    i18n: 'staffManagement.PHONE'
  },
  {
    prop: 'nation',
    label: '国籍',
    align: 'center',
    i18n: 'staffManagement.NATIONALITY'
  },
  {
    prop: 'updateDate',
    label: '最近登录',
    align: 'center',
    i18n: 'staffManagement.RECENTLYTHELOGIN'
  }
]

export const roleTableSetting = [
  {
    prop: 'roleName',
    label: '',
    align: 'center',
    i18n: '',
    width: '50px'
  },
  {
    prop: 'id',
    label: '角色ID',
    align: 'center',
    i18n: '角色ID'
  },
  {
    prop: 'code',
    label: '角色代码',
    align: 'center',
    i18n: '角色代码'
  },
  {
    prop: 'fullNameZh',
    label: '角色名称',
    align: 'center',
    i18n: '角色名称'
  },
  {
    prop: 'description',
    label: '描述',
    align: 'center',
    i18n: '描述'
  }
]

// 采购组
export const tempPurchaseGroupSet = [
  {
    prop: 'id',
    label: '',
    align: 'center',
    i18n: '',
    type: 'index',
    width: '50px'
  },
  {
    prop: 'id',
    label: '序号',
    align: 'center',
    i18n: 'staffManagement.THESERIALNUMBER'
  },
  {
    prop: 'purchaseGroupCode',
    label: '采购组',
    align: 'center',
    i18n: 'staffManagement.PURCHASINGGROUP'
  },
  {
    prop: 'provisionalPriceZh',
    label: '生产暂作价合同',
    align: 'center',
    i18n: 'staffManagement.TEMPORARYPRICECONTRACTFORPRODUCTION'
  },
  {
    prop: 'description',
    label: '描述',
    align: 'center',
    i18n: 'staffManagement.DESCRIBE'
  },
  {
    prop: 'remark',
    label: '备注',
    align: 'center',
    i18n: 'staffManagement.NOTE'
  }
]
