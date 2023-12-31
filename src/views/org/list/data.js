// 组织列表Table配置

//orgId  orgName  orgShortName  orgShortShortNickName  orgOwner orgMark
export const tableSetting = [
  {
    type: 'customSelection',
    width: 50
  },
  {
    prop: 'nameZh',
    label: '组织机构名称（中）',
    i18n: '组织机构名称(中)',
    align: 'left',
    headerAlign: 'left',
    type: 'expanded',
    minWidth: '200',
    sortable: true
  },
  {
    prop: 'nameEn',
    label: '组织机构名称（英）',
    i18n: '组织机构名称(英)',
    align: 'center',
    headerAlign: 'center',
    sortable: true
    // customRender: (h, scope) => {
    //   return <span class="open-link-text">{scope.row.nameEn}</span>
    // }
  },
  {
    prop: 'fullCode',
    label: '组织机构编码',
    align: 'center',
    headerAlign: 'center',
    i18n: '组织机构编码',
    sortable: true
  },
  {
    prop: 'level',
    label: '组织级别',
    align: 'center',
    headerAlign: 'center',
    width: '120px',
    i18n: '组织级别',
    sortable: true
  },
  // {
  //   prop: 'shortCode',
  //   label: '组织结构简码',
  //   align: 'left',
  //   headerAlign: 'left',
  //   i18n: '组织机构简码'
  // },
  // {
  //   prop: 'shortName',
  //   label: '组织机构简称',
  //   align: 'left',
  //   headerAlign: 'left',
  //   i18n: '组织机构简称'
  // },
  {
    prop: 'leadUserName',
    label: '负责人',
    align: 'center',
    headerAlign: 'center',
    i18n: '负责人',
    customRender: (h, scope) => {
      const positions = scope.row.positionList || []
      let leaders = positions.filter((val) => {
        return val.isDeptLead
      })
      let leaderStr = ''
      let userNames = []
      if (leaders) {
        leaders.forEach((val) => {
          let users = val.userDTOList
          if (users) {
            let nameList = users.map((element) => {
              return element.nameZh
            })
            userNames.push(...nameList)
          }
        })
      }
      leaderStr = userNames.join(',')
      return leaderStr
    },
    sortable: true
  },
  {
    prop: 'remark',
    label: '备注',
    align: 'center',
    headerAlign: 'center',
    i18n: '备注',
    sortable: true
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
