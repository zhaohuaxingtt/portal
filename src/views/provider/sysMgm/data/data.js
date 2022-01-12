import riseLogo from '@/assets/images/rise.png'
export const tableColumnSetting = [
  {
    type: 'selection',
    width: 50
  },
  {
    label: '',
    align: 'center',
    width: 60,
    customRender: (h, scope) => {
      let type = scope.row.systemType
      if (type == '1') {
        return scope.$index + 1
      }
      return (
        <div style="position:relative;">
          {scope.$index + 1}
          <img
            src={riseLogo}
            style="position:absolute;top:0px;right: -5px;zoom:0.8; width:20px;height:10px;"
          />
        </div>
      )
    }
  },
  {
    prop: 'appNameCn',
    label: '中文名称',
    align: 'center',
    emit: 'open-detail',
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
    prop: 'systemType',
    label: '系统类型',
    align: 'center',
    customRender: (h, scope) => {
      let type = scope.row.systemType
      if (type == '1') {
        return '系统'
      }
      return 'Scenario'
    }
  },
  {
    prop: 'supplierType',
    label: '系统标签',
    align: 'center',
    customRender: (h, scope) => {
      let type = scope.row.supplierType
      let sysTags = [
        {
          id: '3',
          label: 'N-Tier'
        },
        {
          id: '1',
          label: '生产采购'
        },
        {
          id: '2',
          label: '一般采购'
        }
      ]
      let array = type ? type.split(',') : []
      let strArray = []
      if (array.length > 0) {
        sysTags.forEach((val) => {
          if (array.indexOf(val.id) >= 0) {
            strArray.push(val.label)
          }
        })
      }
      return strArray.join(',')
    }
  },
  // {
  //     prop:"",
  //     label:"门户用户组",
  //     align:"center"
  // },
  // {
  //     prop:"",
  //     label:"安全中心LDAP属性",
  //     align:"center"
  // },
  // {
  //     prop:"",
  //     label:"功能类型",
  //     align:"center"
  // },
  {
    prop: 'description',
    label: '系统功能说明',
    align: 'center'
  }
]
