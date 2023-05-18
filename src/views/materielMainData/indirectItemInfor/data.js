export const columns = [
  {
    type: 'index',
    width: '50'
  },
  {
    prop: 'partNum',
    i18n: '物料号',
    emit: 'goDetail',
    tooltip: true,
    width: '170px',
    customRender: (h, scope) => {
      return <span class="link-text">{scope.row.partNum}</span>
    }
  },
  {
    prop: 'partNameZh',
    i18n: '物料名称中文名',
    tooltip: true
  },
  {
    prop: 'partNameDe',
    i18n: '物料名称德文名',
    tooltip: true
  },
  {
    prop: 'sourceDesc',
    i18n: '制造商',
    tooltip: true
  },
  {
    prop: 'partStatusDesc',
    i18n: '规格型号',
    tooltip: true,
    width: 90
  },
  {
    prop: 'updateDate',
    i18n: '单位',
    tooltip: true
  },
  {
    prop: 'updateDate',
    i18n: '品牌',
    tooltip: true
  }
]

export const searchFormData = [
  { prop: 'materialNo', label: '物料号', key: '物料号' },
  { prop: 'materialNameZh', label: '物料名称中文名', key: '物料名称中文名' },
  { prop: 'materialNameDe', label: '物料名称英文名', key: '物料名称英文名' },
  { prop: 'manufacturer', label: '制造商', key: '制造商' },
  { prop: 'model', label: '规格型号', key: '规格型号' },
  { prop: 'brand', label: '品牌', key: '品牌' },
]