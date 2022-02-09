export const ROLE_COLUMNS = [
  {
    type: 'customSelection',
    width: 50
  },
  {
    type: 'index',
    width: 50,
    label: '#'
  },
  {
    prop: 'id',
    label: '角色ID',
    i18n: '角色ID',
    sortable: true
  },
  {
    prop: 'code',
    label: '角色代码',
    i18n: '角色代码',
    emit: 'go-detail',
    tooltip: true,
    // openNewPage: true,
    customRender: (h, scope) => {
      return <span class="open-link-text">{scope.row.code}</span>
    },
    sortable: true
  },
  {
    prop: 'fullNameZh',
    label: '角色名称',
    i18n: '角色名称',
    sortable: true
  },
  {
    prop: 'description',
    label: '描述',
    i18n: '描述',
    sortable: true
  },
  {
    prop: 'status',
    label: '角色状态',
    i18n: '角色状态',
    sortable: true,
    customRender: (h, scope) => {
      return scope.row.status ? '有效' : '失效'
    }
  }
]

export const COLUMNS_DATA_MENU = [
  {
    type: 'fullIndex',
    width: '80',
    align: 'left'
  },
  {
    prop: 'name',
    label: '名称',
    i18n: '名称',
    type: 'expanded',
    align: 'left',
    emit: 'row-click'
  }
]

// 行权限部门
export const ROW_PERMISSIONS = [
  {
    label: '本岗位',
    value: 1
  },
  {
    label: '本部门',
    value: 2
  },
  {
    label: '所有',
    value: 3
  },
  {
    label: '自定义',
    value: 4
  }
]
// 行权限属性权限
export const ROW_PROPERTITIE_PRODUCE = [
  {
    label: '材料',
    value: '材料'
  },
  {
    label: '车型',
    value: '车型'
  },
  {
    label: '项目',
    value: '项目'
  }
]
// 行权限属性筛选
export const ROW_PROPERTITIE_GENERAL = [
  {
    label: '采购品类（大类）',
    value: '采购品类（大类）'
  },
  {
    label: '采购品类（小类）',
    value: '采购品类（小类）'
  }
]

// 功能权限资源表头
export const COLUMNS_FUNCTION_RESOURCE = [
  {
    type: 'fullIndex',
    width: '100',
    align: 'left'
  },
  {
    prop: 'permissionKey',
    label: '资源编码',
    i18n: '资源编码',
    minWidth: 300,
    align: 'left',
    headerAlign: 'left'
  },
  {
    prop: 'name',
    label: '资源名称',
    i18n: '资源名称',
    type: 'expanded',
    align: 'left',
    headerAlign: 'left',
    minWidth: 300
  },
  {
    prop: 'nameEn',
    label: '资源名称(英)',
    i18n: '资源名称(英)',
    minWidth: 200
  },
  {
    prop: 'remark',
    label: '类型',
    i18n: '类型'
  },
  {
    prop: 'remark',
    label: '备注',
    i18n: '备注'
  }
]
// 功能权限菜单表头
export const COLUMNS_FUNCTION_MENU = [
  {
    type: 'fullIndex',
    width: 80,
    align: 'left'
  },
  {
    prop: 'name',
    label: '资源名称',
    i18n: '资源名称',
    type: 'expanded',
    minWidth: 200,
    align: 'left'
  },
  {
    prop: 'permissionKey',
    label: '菜单编码',
    i18n: '菜单编码',
    minWidth: 200,
    align: 'left'
  }
]
