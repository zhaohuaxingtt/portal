// 查看一二次零件部分form表单
export const partsRelationship = [
  // { props: 'partNum', name: 'SAP零件号', key: 'SAPLINGJIANHAO' },
  { props: 'partNameZh', name: '零件名(中)', key: 'LK_LINGJIANMINGZHONG' },
  { props: 'partNameDe', name: '零件名(德)', key: 'LK_LINGJIANMINGDE' },
  { props: 'carType', name: '车  型', key: 'CHEXING' }
]
export const tableDetail = [
  { props: 'firPartNo', name: '一次件', key: '一次件' },
  { props: 'firSupSapCode', name: '一次件供应商', key: '一次件供应商' },
  { props: 'secPartNo', name: '二次件', key: '二次件' },
  { props: 'secSupSapCode', name: '二次件供应商', key: '二次件供应商' },
  { props: 'dosage', name: '用量', key: '用量' },
  { props: 'unit', name: '单位', key: '单位' },
  { props: 'scale', name: '比例', key: '比例' },
  { props: 'msg', name: '错误信息', key: '错误信息'},
]

// 查看一二次零件表头
export const partsRelationshipTableSetting = [
  { type: 'selection', width: 50 },
  { type: 'index', label: '#', i18n: '#', width: 50 },
  {
    prop: 'partNum',
    label: 'SAP零件号',
    i18n: 'SAPLINGJIANHAO',
    tooltip: true,
    emit: 'go-detail',
    customRender: (h, scope) => {
      return <pre class="open-link-text">{scope.row.partNum}</pre>
    }
  },
  {
    prop: 'partNameZh',
    label: '零件名（中）',
    i18n: 'LK_LINGJIANMINGZHONG',
    tooltip: true
  },
  {
    prop: 'partNameDe',
    label: '零件名（德）',
    tooltip: true,
    i18n: 'LK_LINGJIANMINGDE'
  },
  { prop: 'carType', label: '车型', tooltip: true, i18n: 'CHEXING' },
  {
    prop: 'importDate',
    label: '导入时间',
    tooltip: true,
    i18n: 'DAORUSHIJIAN'
  },
  {
    prop: 'startDate',
    label: '开始时间',
    tooltip: true,
    i18n: 'KAISHISHIJIAN'
  },
  { prop: 'version', label: '版本', tooltip: true, i18n: 'BANBEN' }
]

//  查看一二次零件详情
export const partsRelationshipDetailTableSetting = [
  { props: 'partNum', name: '零件号', key: 'LINGJIANHAO', tooltip: true },
  {
    props: 'partNameZh',
    name: '零件名（中）',
    key: 'LK_LINGJIANMINGZHONG',
    tooltip: true
  },
  {
    props: 'partNameDe',
    name: '零件名（德）',
    tooltip: true,
    key: 'LK_LINGJIANMINGDE'
  },
  { props: 'lcOrCkd', name: 'Bezug类型', key: 'BEZUGLEIXING', tooltip: true },
  { props: 'dosage', name: '用量', tooltip: true, key: 'YONGLIANG' },
  { props: 'scale', name: '比例', key: '比例', tooltip: true },
]

// 查看一二次零件-sap号详情
export const partsRelationshipDetailFormData = [
  { props: 'partNum', name: '总成编号' },
  { props: 'partNameZh', name: '零件名(中)' },
  { props: 'partNameDe', name: '零件名(德)' },
  // { props: 'carType', name: '车型' },
  { props: 'startDate', name: '开始时间' },
  { props: 'importDate', name: '导入时间' }
]
