const typeColumn = [
  // {
  //     type: 'selection',
  //     width: 50
  // },
  {
    type: 'index',
    label: '序号',
    width: 100
  },
  {
    prop: 'name',
    label: '类型',
    align: 'center',
    sortable: true
  },
  {
    prop: 'createdAt',
    label: '添加日期',
    align: 'center',
    sortable: true
  },
  {
    prop: 'adminUsers',
    label: '管理人',
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
    label: '报表可见组织',
    align: 'center',
    width: 150,
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
    label: '报表可见人员',
    align: 'center',
    width: 150,
    customRender: (h, scope) => {
      const users = scope.row.users || []
      let new_users =
        users?.length > 0
          ? users
              .slice(0, 4)
              .map((item) => item.nameZh)
              .join(',')
          : ''
      let text =
        users?.length > 0
          ? users.length > 4
            ? `${new_users}等${users.length}人`
            : `${new_users}`
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
      const aValue = a?.users?.map((item) => item.nameZh).join(',')
      const bValue = b?.users?.map((item) => item.nameZh).join(',')
      return aValue > bValue ? 1 : -1
    }
  },
  {
    prop: 'isTop',
    label: '是否置顶',
    align: 'center',
    emit: 'topChang',
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
    label: '状态',
    align: 'center',
    emit: 'statusChang',
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
    label: '操作',
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
    label: '序号',
    width: 100
  },
  {
    prop: 'name',
    label: '类型',
    align: 'center'
  },
  {
    label: '操作',
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

export { typeColumn, addTypeColumn }
