// 组织列表Table配置

//orgId  orgName  orgShortName  orgShortShortNickName  orgOwner orgMark
export const tableSetting = [
  {
    type: 'selection',
    width: 50
  },
  {
    prop: 'bussinessAreaName',
    label: '组织机构名称（中）',
    i18n: 'ORGANIZATION_MANAGERMENT.ORG_LIST.TABLE_ORG_CNNAME',
    align: 'left',
    headerAlign: 'left',
    type: 'expanded',
    minWidth: '200',
    customRender: (h, scope) => {
      return scope.row.nameZh
    }
  },
  {
    prop: 'nameEn',
    label: '组织机构名称（英）',
    i18n: 'ORGANIZATION_MANAGERMENT.ORG_LIST.TABLE_ORG_ENNAME',
    align: 'center',
    headerAlign: 'center'
    // customRender: (h, scope) => {
    //   return <span class="open-link-text">{scope.row.nameEn}</span>
    // }
  },
  {
    prop: 'fullCode',
    label: '组织机构编码',
    align: 'center',
    headerAlign: 'center',
    i18n: 'ORGANIZATION_MANAGERMENT.ORG_LIST.TABLE_ORG_CODE'
  },
  {
    prop: 'level',
    label: '组织级别',
    align: 'center',
    headerAlign: 'center',
    width: '100px',
    i18n: 'ORGANIZATION_MANAGERMENT.ORG_LIST.TABLE_ORG_LEVEL'
  },
  // {
  //   prop: 'shortCode',
  //   label: '组织结构简码',
  //   align: 'left',
  //   headerAlign: 'left',
  //   i18n: 'ORGANIZATION_MANAGERMENT.ORG_LIST.TABLE_ORG_SHORT_CODE'
  // },
  // {
  //   prop: 'shortName',
  //   label: '组织机构简称',
  //   align: 'left',
  //   headerAlign: 'left',
  //   i18n: 'ORGANIZATION_MANAGERMENT.ORG_LIST.TABLE_ORG_SHORT_NAME'
  // },
  {
    prop: 'leadUserName',
    label: '负责人',
    align: 'center',
    headerAlign: 'center',
    i18n: 'ORGANIZATION_MANAGERMENT.ORG_LIST.TABLE_ORG_OWNER',
    customRender: (h, scope) => {
      let leaders = scope.row.positionList.filter(val => {
        return val.isDeptLead
      })
      let leaderStr = ''
      let userNames = []
      if (leaders) {
        leaders.forEach(val => {
          let users = val.userDTOList
          if (users) {
            let nameList = users.map(element => {
              return element.nameZh
            })
            userNames.push(...nameList)
          }
        })
      }
      leaderStr = userNames.join(',')
      return leaderStr
    }
  },
  {
    prop: 'remark',
    label: '备注',
    align: 'center',
    headerAlign: 'center',
    i18n: 'ORGANIZATION_MANAGERMENT.ORG_LIST.TABLE_ORG_DESC'
  }
]

export const exportTableSetting = [
  {
    props: 'nameZh',
    name: '组织结构名称'
  },
  {
    props: 'fullCode',
    name: '组织机构编号'
  },
  {
    props: 'shortCode',
    name: '组织结构简码'
  },
  {
    props: 'nameZh',
    name: '组织机构简称'
  },
  {
    props: 'leadUserName',
    name: '负责人'
  },
  {
    props: 'remark',
    name: '备注'
  }
]
