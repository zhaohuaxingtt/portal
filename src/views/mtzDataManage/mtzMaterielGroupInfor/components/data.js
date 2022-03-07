export const FILTER_FORM = {
  materialGroupCode: '', // MTZ材料组编号
  generalCategoryCode: '', // 大类编号
  dept: '', //科室
  materialGroupNameZh: '', //MTZ材料组名称(中)
  rawMaterialCode: '', // 材料中类编号
  status: '', // 状态
  materialGroupNameEn: '', //MTZ材料组名称(英)
  rawMaterialName: '' // 材料中类名称-中文
}
export const STATUS_OPTIONS = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '有效',
    value: '1'
  },
  {
    label: '失效',
    value: '0'
  }
]

export const DETAIL_FORM = {
  materialGroupCode: '', // MTZ材料组编号
  materialGroupNameZh: '',
  materialGroupNameEn: '',
  simpleDeptInfos: '',
  rawMaterialCodes: '',
  remark: '',
  depts: ''
}

export const GROUP_TABLE_COLUMNS = [
  {
    type: 'selection',
    width: '50px'
  },
  {
    label: '#',
    type: 'index',
    width: '50px'
  },
  {
    prop: 'materialGroupCode',
    label: 'MTZ材料组编号',
    i18n: 'MTZ材料组编号',
    width: '150',
    // openNewPage:true,
    tooltip: true,
    emit: 'go-detail',
    customRender: (h, scope) => {
      return <span class="link-text">{scope.row.materialGroupCode}</span>
    }
  },
  {
    prop: 'materialGroupNameZh',
    label: 'MTZ材料组名称(中)',
    i18n: 'MTZ材料组名称(中)',
    minWidth: '150px',
    tooltip: true
  },
  {
    prop: 'materialGroupNameEn',
    label: 'MTZ材料组名称(英)',
    i18n: 'MTZ材料组名称(英)',
    minWidth: '150',
    tooltip: true
  },
  {
    prop: 'generalCategoryCode',
    label: '大类编号/名称',
    i18n: '大类编号/名称',
    minWidth: '150',
    tooltip: true
  },
  {
    prop: 'rawMaterialCode',
    label: '材料中类',
    i18n: '材料中类',
    minWidth: '150',
    tooltip: true
  },
  {
    prop: 'rawMaterialName',
    label: '中类描述',
    i18n: '中类描述',
    minWidth: '150',
    tooltip: true
  },
  {
    prop: 'deptCodes',
    label: '科室',
    i18n: '科室',
    minWidth: '150',
    tooltip: true
    /* customRender: (h, scope) => {
      if (scope.row.simpleDeptInfos) {
        return scope.row.simpleDeptInfos.map(e => e.deptName).join(',')
      }
      return ''
    } */
  },
  {
    prop: 'remark',
    label: '备注',
    i18n: '备注',
    minWidth: '150',
    tooltip: true
  },
  {
    prop: 'statusDesc',
    label: '状态',
    i18n: '状态'
  }
]

export const DETAIL_PARTS_GROUP_COLUMNS = [
  {
    type: 'selection',
    width: '50px',
    fixed: true
  },
  {
    i18n: '序号',
    type: 'index',
    width: '55',
    fixed: true
  },
  {
    prop: 'categoryCode',
    label: '零件材料组编号',
    i18n: '零件材料组编号',
    fixed: true,
    minWidth: 150,
    // openNewPage: true,
    tooltip: true,
    emit: 'to-detail',
    customRender: (h, scope) => {
      return <span class="link-text">{scope.row.categoryCode}</span>
    }
  },
  {
    prop: 'categoryNameZh',
    label: '零件材料组名称',
    i18n: '零件材料组名称',
    minWidth: 150,
    tooltip: true
  },
  {
    prop: 'categoryNameDe',
    label: '材料组名称(德)',
    i18n: '材料组名称(德)',
    minWidth: 150,
    tooltip: true
  },
  {
    prop: 'categoryMemo',
    label: '零件材料组说明',
    i18n: '零件材料组说明',
    minWidth: 150,
    tooltip: true
  },
  {
    prop: 'deptCodes',
    label: '科室',
    i18n: '科室',
    minWidth: 200,
    tooltip: true
  }
]

export const DETAIL_PARTS_SIX_NO_COLUMNS = [
  {
    type: 'selection',
    width: '50px',
    fixed: true
  },
  {
    i18n: '序号',
    type: 'index',
    width: '55',
    fixed: true
  },
  {
    prop: 'sixPartCode',
    i18n: '零件6位号',
    minWidth: '100',
    fixed: true
  },
  {
    prop: 'categoryCode',
    label: '',
    i18n: '零件材料组编号',
    fixed: true,
    minWidth: 150
  },
  {
    prop: 'categoryName',
    i18n: '零件材料组名称',
    minWidth: 150
  },
  {
    prop: 'partNameZh',
    i18n: '零件名称(中)',
    minWidth: 150
  },
  {
    prop: 'partNameDe',
    i18n: '零件名称(德)',
    minWidth: 150
  },
  {
    prop: 'partNameEn',
    i18n: '零件名称(英)',
    minWidth: 150
  }
]

// 关联关系列表
export const RELATION_FILTER_FORM = {
  materialGroupCode: '', // MTZ材料组编号
  materialGroupName: '', // MTZ材料组名称
  categoryCode: '', // 零件材料组编号
  categoryName: '', // 零件材料组名称
  sixPartCode: '', // 零件六位号
  deptCode: '' // 科室
}

export const RELATION_GROUP_COLUMNS = [
  {
    i18n: '序号',
    prop: 'materialGroupIndex'
  },
  {
    prop: 'materialGroupCode',
    i18n: 'MTZ材料组编号'
  },
  {
    prop: 'materialGroupNameZh',
    i18n: 'MTZ材料组名称'
  },
  {
    prop: 'materialGroupDeptCodes',
    i18n: '科室'
  },
  {
    prop: 'categoryIndex',
    i18n: '序号'
  },
  {
    prop: 'categoryCode',
    i18n: '零件材料组编号'
  },
  {
    prop: 'categoryName',
    i18n: '零件材料组名称'
  },
  {
    prop: 'categoryDeptCodes',
    i18n: '科室',
    width: 150,
    tooltip: true
  }
]

export const RELATION_SIX_NO_COLUMNS = [
  {
    i18n: '序号',
    prop: 'materialGroupIndex'
  },
  {
    prop: 'materialGroupCode',
    i18n: 'MTZ材料组编号'
  },
  {
    prop: 'materialGroupNameZh',
    i18n: 'MTZ材料组名称'
  },
  {
    prop: 'materialGroupDeptCodes',
    i18n: '科室'
  },
  {
    prop: 'categoryIndex',
    i18n: '序号'
  },
  {
    prop: 'sixPartCode',
    i18n: '零件六位号'
  },
  {
    prop: 'categoryCode',
    i18n: '零件材料组编号'
  },
  {
    prop: 'categoryName',
    i18n: '零件材料组名称'
  },
  {
    prop: 'categoryDeptCodes',
    i18n: '科室',
    width: 150,
    tooltip: true
  }
]
