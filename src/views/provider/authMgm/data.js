export const tableSetting = [
  {
    type: 'selection',
    width: 50
  },
  {
    type: 'index',
    width: 50
  },
  {
    prop: 'nameZh',
    label: '联系人姓名',
    //   i18n:"",
    align: 'center',
    emit: 'goEdit',
    customRender: (h, scope) => {
      if (scope.row.isMainContact) {
        return (
          <span class="link-text">
            <icon symbol name="iconsheweizhuyonghu1" />
            {scope.row.nameZh}
          </span>
        )
      } else {
        return <span class="link-text">{scope.row.nameZh}</span>
      }
    }
  },
  {
    prop: 'userName',
    label: '用户登录名',
    width: '150px',
    align: 'center'
  },
  {
    prop: 'opcsCompanyNameZh',
    label: '供应商中文名',
    align: 'center',
    width: '150',
    tooltip: true
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
    label: '是否主联系人',
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
    i18n: '正式/SVW号',
    prop: 'svwCode'
  },
  {
    i18n: 'SAP号',
    prop: 'sapNum'
  },
  {
    prop: 'telephoneO',
    label: '联系电话',
    align: 'center',
    width: '100px',
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
    prop: 'email',
    label: '邮箱',
    align: 'center',
    width: '100px',
    tooltip: true
  }
]

export const EditTableSetting = [
  {
    type: 'selection',
    width: 50
  },
  {
    type: 'index',
    width: 50
  },
  {
    prop: 'appNameCn',
    label: '中文名称',
    align: 'center',
    emit: 'edit',
    customRender: (h, scope) => {
      return <span class="link-text">{scope.row.appNameCn}</span>
    }
  },
  {
    prop: 'appNameEn',
    label: '英文名称',
    align: 'center'
  },
  {
    prop: 'description',
    label: '系统功能说明',
    align: 'center'
  }
]
export const ReadTableSetting = [
  {
    type: 'index',
    width: 50
  },
  {
    prop: 'appNameCn',
    label: '中文名称',
    align: 'center',
    emit: 'edit',
    customRender: (h, scope) => {
      return <span class="link-text">{scope.row.appNameCn}</span>
    }
  },
  {
    prop: 'appNameEn',
    label: '英文名称',
    align: 'center'
  },
  {
    prop: 'appNameEn',
    label: '系统类型',
    align: 'center',
    customRender: (h, scope) => {
      if (scope.row.systemType) {
        if (scope.row.systemType == '1') {
          return '系统'
        }
        return 'Scenario'
      }
      return ''
    }
  },
  {
    prop: 'description',
    label: '系统功能说明',
    align: 'center'
  }
]
export const defaultValueAuth = {
  isMainContact: null, //是否主联系人 false：否，true：是
  nameZh: '', //联系人姓名
  opcsCompanyNameZh: '', //供应商中文名
  telephoneM: '', //手机
  telephoneO: '', //座机
  position: '',
  department: ''
}
export const defaultValueEdit = {
  contactName: '',
  userLoginName: '',
  supChina: '',
  temporaryNumber: '',
  position: '',
  department: '',
  areaCode: '',
  Landline: '',
  phoneCode: '',
  email: ''
}

export const defaultValueEditAuth = {
  chName: '',
  enName: '',
  userGroup: '',
  Ladp: '',
  funcType: '',
  funcInstruction: ''
}
