export const FILTER_FORM = {
  nameZh: '',
  code: '',
  nameDe: ''
}

export const DETAIL_FORM = {
  code: '',
  nameDe: '',
  nameEn: '',
  nameZh: ''
}

export const STATUS_OPTIONS = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '有效',
    value: true
  },
  {
    label: '失效',
    value: true
  }
]

export const MOULD_TABLE_COLUMNS = [
  {
    type: 'selection',
    width: '50px'
  },
  {
    label: '#',
    type: 'index',
    width: '55'
  },
  {
    prop: 'code',
    label: '模具材料组编号',
    i18n: '模具材料组编号',
    width: '150px',
    // openNewPage: true,
    emit: 'go-detail',
    customRender: (h, scope) => {
      return <span class="link-text">{scope.row.code}</span>
    }
  },
  {
    prop: 'nameZh',
    label: '模具材料组名称（中）',
    i18n: '模具材料组名称（中）'
  },
  {
    prop: 'nameDe',
    label: '模具材料组名称（德）',
    i18n: '模具材料组名称（德）'
  }
]

export const DETAIL_PARTS_GROUP_COLUMNS = [
  {
    type: 'selection',
    width: '50px'
  },
  {
    i18n: '序号',
    type: 'index',
    width: '55'
  },
  {
    prop: 'categoryCode',
    label: '零件材料组编号',
    i18n: '零件材料组编号',
    width: '140px',
    // openNewPage:true,
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
  // {
  //   prop: 'categoryMemo',
  //   label: '零件材料组说明',
  //   i18n: '零件材料组说明',
  //   minWidth: 150,
  //   tooltip: true
  // },
  {
    prop: 'deptCodes',
    label: '科室',
    i18n: '科室',
    minWidth: 200,
    tooltip: true
  }
]
