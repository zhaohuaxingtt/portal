export const tableColumnSetting = [
  {
    type: 'selection',
    width: 50
  },
  {
    prop: 'nameZh',
    label: '联系人姓名',
    align: 'center',
    customRender: (h, scope) => {
      if (scope.row.isMainContact) {
        return (
          <span>
            <icon symbol name="iconsheweizhuyonghu1" />
            {scope.row.nameZh}
          </span>
        )
      } else {
        return scope.row.nameZh
      }
    }
  },
  {
    prop: 'userName',
    label: '用户登录名',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'opcsCompanyNameZh',
    label: '供应商中文名',
    align: 'center',
    tooltip: true,
    width: '150'
  },
  {
    prop: 'opcsCompanyNameEn',
    label: '供应商英文名',
    align: 'center',
    width: '150',
    tooltip: true
  },
  {
    prop: 'isMainContact',
    label: '主联系人',
    align: 'center',
    customRender: (h, scope) => {
      if (scope.row.isMainContact) {
        return '是'
      } else {
        return '否'
      }
    }
  },
  {
    prop: 'temporaryNum',
    label: '临时号',
    align: 'center'
  },
  {
    prop: 'svwCode',
    label: '正式/SVW号',
    align: 'center'
  },
  {
    prop: 'sapNum',
    label: 'SAP号',
    align: 'center'
  },
  {
    prop: 'status',
    label: '是否有效',
    align: 'center',
    customRender: (h, scope) => {
      // 1正常2冻结
      if (scope.row.status == '1') {
        return '是'
      } else if (scope.row.status == '2') {
        return '否'
      }
      return ''
    }
  },
  {
    prop: 'email',
    label: '邮箱',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'telephoneO',
    label: '联系电话',
    align: 'center',
    tooltip: true
    // customRender:(h,scope) =>{
    //   let tele = []
    //   if(scope.row.telephoneM){
    //     tele.push(scope.row.telephoneM)
    //   }
    //   if(scope.row.telephoneO){
    //     tele.push(scope.row.telephoneO)
    //   }
    //   let teleStr = tele.join("/")
    //   return teleStr
    // }
  },
  {
    prop: 'isValid',
    label: '是否超期',
    align: 'center',
    customRender: (h, scope) => {
      if (scope.row.isValid) {
        return '否'
      } else {
        return '是'
      }
    }
  },
  {
    prop: 'expireDate',
    label: '超期时间',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'lastLoginDate',
    label: '最近登录时间',
    align: 'center',
    tooltip: true
  }
]

export const defalutValue = {
  email: '', //邮箱
  isMainContact: null, //是否主联系人 false：否，true：是
  isValid: null, //有效 true：有效 false：无效
  lastLoginDate: null, //最近登陆
  nameZh: '', //联系人姓名
  opcsCompanyNameZh: '', //供应商中文名
  status: '', //状态 1.正常 2.冻结
  telephoneM: '', //手机
  telephoneO: '', //座机
  userName: '', //用户登录名
  sapNum: '', //SAP号
  temporaryNum: '' //临时号
}
