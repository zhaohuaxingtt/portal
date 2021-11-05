export const tableMe = [
  {
    prop: 'id',
    label: '序号',
    key: '',
    width: '100px',
    tooltip: false,
    align: 'center'
  },
  {
    prop: 'dimession',
    label: '维度',
    key: '',
    width: '100px',
    tooltip: false,
    align: 'center'
  },
  {
    prop: 'content',
    label: '内容',
    key: '',
    tooltip: false,
    align: 'center'
  }
]

export const tableSetting = [
  {
    prop: 'roleNumber',
    label: '编号',
    key: '',
    width: '100px',
    tooltip: false,
    align: 'center'
  },
  {
    prop: 'roleCode',
    label: '角色代码',
    align: 'center',
    color: '#1763f7',
    key: '',
    tooltip: false,
    customRender: (h, scope) => {
      return <u class="open-link-text">{scope.row.roleCode}</u>
    }
  },
  {
    prop: 'roleName',
    label: '角色名称',
    align: 'center',
    key: '',
    tooltip: false
  },
  {
    prop: 'roleDescribe',
    label: '描述',
    align: 'center',
    key: '',
    tooltip: false
  }
]
