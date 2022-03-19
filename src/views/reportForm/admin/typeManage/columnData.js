const userList = [
  { nameZh: '全体用户', id: 0 },
  { nameZh: '全体采购员工用户', id: 1 }, 
  { nameZh: '全体内部员工用户', id: 2 }, 
  { nameZh: '全体供应商用户', id: 3 }, 
  { nameZh: '全体供应商主联系人用户', id: 4 },
  { nameZh: '全体生产采购供应商用户', id: 5 },
  { nameZh: '全体生产采购供应商主联系人用户', id: 6 }, 
  { nameZh: '全体生产采购正式供应商用户', id: 7 }, 
  { nameZh: '全体生产采购正式供应商主联系人用户', id: 8 }, 
  { nameZh: '全体一般采购供应商用户', id: 9 }, 
  { nameZh: '全体一般采购供应商主联系人用户', id: 10 },
  { nameZh: '全体一般采购正式供应商用户', id: 11 }, 
  { nameZh: '全体一般采购正式供应商主联系人用户', id: 12 }, 
  { nameZh: '全体N_Tier供应商用户', id: 13 }, 
  { nameZh: '全体N_Tier供应商主联系人用户', id: 14 },
  { nameZh: '自定义', id: 15 },
]
let userListKV = {}
userList.forEach(e => {
  userListKV[e.id] = e
})
const typeColumn = [
  // {
  //     type: 'selection',
  //     width: 50
  // },
  {
    type: 'index',
    i18n: '序号',
    width: 100,

  },
  {
    prop: 'name',
    i18n: '类型',
    align: 'center',
    sortable: true
  },
  {
    prop: 'createdAt',
    i18n: '添加日期',
    align: 'center',
    sortable: true,
    width: 160,
  },
  {
    prop: 'adminUsers',
    i18n: '管理人',
    align: 'center',
    width: 150,
    customRender: (h, scope) => {
      const adminUsers = scope.row.adminUsers || []
      let new_adminUsers =
        adminUsers?.length > 0
          ? adminUsers
              .slice(0, 4)
              .map((item) => item.nameZh)
              .join(',')
          : ''
      let text =
        adminUsers?.length > 0
          ? adminUsers.length > 4
            ? `${new_adminUsers}等${adminUsers.length}人`
            : `${new_adminUsers}`
          : ''
      return (
        <div
          style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
          title={text}
        >
          {text}
        </div>
      )
    },
    sortable: true,
    sortMethod: (a, b) => {
      const aValue = a?.adminUsers?.map((item) => item.nameZh).join(',')
      const bValue = b?.adminUsers?.map((item) => item.nameZh).join(',')
      return aValue > bValue ? 1 : -1
    }
  },
  {
    prop: 'organizations',
    i18n: '报表可见组织',
    align: 'center',
    width: 200,
    customRender: (h, scope) => {
      const organizations = scope.row.organizations || []
      let new_organizations =
        organizations?.length > 0
          ? organizations
              .slice(0, 4)
              .map((item) => item.name)
              .join(',')
          : ''
      let text =
        organizations?.length > 0
          ? organizations.length > 4
            ? `${new_organizations}等${organizations.length}人`
            : `${new_organizations}`
          : ''
      return (
        <div
          style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
          title={text}
        >
          {text}
        </div>
      )
    },
    sortable: true,
    sortMethod: (a, b) => {
      const aValue = a?.organizations?.map((item) => item.nameZh).join(',')
      const bValue = b?.organizations?.map((item) => item.nameZh).join(',')
      return aValue > bValue ? 1 : -1
    }
  },
  {
    prop: 'users',
    i18n: '报表可见人员',
    align: 'center',
    width: 200,
    customRender: (h, scope) => {
      // const userRange = scope.row.userRange || 0
      const users = scope.row.users || []
      // let showText = null
      // if (users.length === 0) {
      //   showText = userList[userRange].nameZh
      // } else {
        let new_users =
        users?.length > 0
          ? users
              .slice(0, 4)
              .map((item) => item.nameZh)
              .join(',')
          : ''
      let text = ""
          if(scope.row.userRange == 15){
            text =  users?.length > 0
            ? users.length > 4
              ? `${new_users}等${users.length}人`
              : `${new_users}`
            : ''
          }else{
            text = userListKV[scope.row.userRange].nameZh
          }
      return (
        <span>
          <div
            style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
            title={text}
          >
            {text}
          </div>
        </span>
      )
      // }
    },
    sortable: true,
    sortMethod: (a, b) => {
      const aValue = a?.users?.map((item) => item.nameZh).join(',')
      const bValue = b?.users?.map((item) => item.nameZh).join(',')
      return aValue > bValue ? 1 : -1
    }
  },
  {
    prop: 'isTop',
    i18n: '是否置顶',
    align: 'center',
    emit: 'topChang',
    width: 100,
    customRender: (h, scope) => {
      return (
        <el-switch
          value={scope.row.isTop}
          active-text="是"
          inactive-text="否"
        ></el-switch>
      )
    },
    sortable: true
  },
  {
    prop: 'published',
    i18n: '状态',
    align: 'center',
    emit: 'statusChang',
    width: 140,
    customRender: (h, scope) => {
      return (
        <el-switch
          value={scope.row.published}
          active-text="上架"
          inactive-text="下架"
        ></el-switch>
      )
    },
    sortable: true
  },
  {
    i18n: '操作',
    align: 'center',
    width: 200,
    customRender: (h, { row }, col, { operate }) => {
      return (
        <span>
          <iButton type="text" on-click={() => operate('modify', row)}>
            修改
          </iButton>
          <iButton type="text" on-click={() => operate('del', row)}>
            删除
          </iButton>
          <iButton type="text" on-click={() => operate('add', row)}>
            添加报告分类
          </iButton>
        </span>
      )
    }
  }
]

const addTypeColumn = [
  {
    type: 'selection',
    width: 50
  },
  {
    type: 'index',
    i18n: '序号',
    width: 100
  },
  {
    prop: 'name',
    i18n: '类型',
    align: 'center'
  },
  {
    i18n: '操作',
    align: 'center',
    width: 200,
    customRender: (h, { row }, col, { del }) => {
      return (
        <span>
          <iButton type="text" on-click={() => del(row)}>
            删除
          </iButton>
        </span>
      )
    }
  }
]



export { typeColumn, addTypeColumn, userList }
