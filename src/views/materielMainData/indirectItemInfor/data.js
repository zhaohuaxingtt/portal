export const columns = [
  {
    type: 'index',
    width: '50'
  },
  {
    prop: 'materialNo',
    i18n: '物料号',
    emit: 'goDetail',
    tooltip: true,
    width: '170px',
    customRender: (h, scope) => {
      return <span class="link-text">{scope.row.materialNo}</span>
    }
  },
  {
    prop: 'materialNameZh',
    i18n: '物料名称中文名',
    tooltip: true
  },
  {
    prop: 'materialNameDe',
    i18n: '物料名称德文名',
    tooltip: true
  },
  {
    prop: 'manufacturer',
    i18n: '制造商',
    tooltip: true
  },
  {
    prop: 'model',
    i18n: '规格型号',
    tooltip: true,
  },
  {
    prop: 'unitId',
    i18n: '单位',
    tooltip: true,
    width: 80,
    customRender: (h, scope, c, {unitoptions}) => {
        let unitName = unitoptions
          .filter((item) => scope.row.unitId == item.id)
          .map((item) => {
            return item.name
          })
      return <span>{unitName}</span>
    }
  },
  {
    prop: 'brand',
    i18n: '品牌',
    tooltip: true
  }
]

export const searchFormData = [
  { prop: 'materialNo', label: '物料号', key: '物料号' },
  { prop: 'materialNameZh', label: '物料名称中文名', key: '物料名称中文名' },
  { prop: 'materialNameDe', label: '物料名称德文名', key: '物料名称德文名' },
  { prop: 'manufacturer', label: '制造商', key: '制造商' },
  { prop: 'model', label: '规格型号', key: '规格型号' },
  { prop: 'brand', label: '品牌', key: '品牌' },
]