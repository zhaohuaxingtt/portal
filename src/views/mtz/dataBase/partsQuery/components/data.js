const renderIcon = (h, column, type) => {
  let content = ``
  switch (type) {
    case 1:
      content = `M01006002-Pt`
      break
    case 2:
      content = `M01006001-Pd`
      break
    case 3:
      content = `M01006003-Rh`
      break
  }
  return h('div', [
    h('span', column.label),
    h(
      'el-tooltip',
      {
        props: {
          effect: 'light',
          content: content,
          placement: 'right'
        }
      },
      [
        h('i', {
          class: 'el-icon-warning-outline',
          style:
            'color: #A0BFFC; font-size: 16px; margin-top: 2px; margin-left: 10px;'
        })
      ]
    )
  ])
}

export const tableSetting = [
  { type: 'selection', width: 50 },
  { type: 'index', label: '#', i18n: '#', width: 50 },
  {
    prop: 'assemblyPartnum',
    label: '',
    i18n: '一次件零件号',
    tooltip: true,
    align: 'center',
    width: 150,
    emit: 'go-partNumber',
    customRender: (h, scope) => {
      return <pre class="open-link-text">{scope.row.assemblyPartnum}</pre>
    }
  },
  {
    prop: 'assemblySupplierSap',
    label: '一次件供应商SAP号',
    i18n: '一次件供应商SAP号',
    align: 'center',
    tooltip: true,
    width: 180
  },
  {
    prop: 'assemblySupplierName',
    label: '一次件供应商',
    align: 'center',
    i18n: '一次件供应商',
    tooltip: true,
    width: 150
  },
  {
    prop: 'assemblyPartName',
    label: '一次件零件名',
    align: 'center',
    i18n: '一次件零件名',
    tooltip: true,
    width: 150
  },
  {
    prop: 'buyerName',
    label: '采购员',
    i18n: '采购员',
    align: 'center',
    tooltip: true,
    width: 150
  },
  {
    prop: 'buyerDeptName',
    label: '科室',
    align: 'center',
    i18n: '科室',
    tooltip: true,
    width: 150
  },
  {
    prop: 'piecePartnum',
    label: '二次件零件号',
    align: 'center',
    tooltip: true,
    i18n: '二次件零件号',
    width: 150,
    emit: 'go-partNumber',
    customRender: (h, scope) => {
      return <span class="open-link-text">{scope.row.piecePartnum}</span>
    }
  },
  {
    prop: 'piecePartName',
    label: '二次件零件名',
    align: 'center',
    i18n: '二次件零件名',
    tooltip: true,
    width: 150
  },
  {
    prop: 'pieceSupplierSap',
    label: '二次件供应商SAP号',
    align: 'center',
    i18n: '二次件供应商SAP号',
    tooltip: true,
    width: 180
  },
  {
    prop: 'pieceSupplierName',
    label: '二次件供应商',
    align: 'center',
    i18n: '二次件供应商',
    tooltip: true,
    width: 150
  },
  {
    prop: 'proportion',
    label: '二次件与一次件比例',
    align: 'center',
    i18n: '二次件与一次件比例',
    tooltip: true,
    width: 200
  },
  {
    prop: 'ruleNo',
    label: '规则编号',
    align: 'center',
    i18n: '规则编号',
    tooltip: true,
    width: 150
  },
  {
    prop: 'materialCode',
    label: '原材料牌号',
    align: 'center',
    i18n: '原材料牌号',
    tooltip: true,
    width: 150
  },
  {
    prop: 'material',
    label: '原材料名称',
    align: 'center',
    i18n: '原材料名称',
    tooltip: true,
    width: 150
  },
  {
    prop: 'price',
    label: '基价',
    align: 'center',
    i18n: '基价',
    tooltip: true,
    width: 150
  },
  {
    prop: 'priceCountUnit',
    label: '基价计量单位',
    align: 'center',
    i18n: '基价计量单位',
    tooltip: true,
    width: 150
  },
  {
    prop: 'priceUnit',
    label: '每',
    align: 'center',
    i18n: '每',
    tooltip: true,
    width: 150
  },
  {
    prop: 'countUnit',
    label: '零件数量单位',
    align: 'center',
    i18n: '零件数量单位',
    tooltip: true,
    width: 150
  },
  {
    prop: 'dosage',
    label: '用量',
    align: 'center',
    i18n: '用量',
    tooltip: true,
    width: 150
  },
  {
    prop: 'dosageMeasureUnit',
    label: '用量计量单位',
    align: 'center',
    i18n: '用量计量单位',
    tooltip: true,
    width: 150
  },
  {
    prop: 'marketSource',
    label: '市场价来源',
    align: 'center',
    i18n: '市场价来源',
    tooltip: true,
    width: 150
  },
  {
    prop: 'thresholdCompensationLogic',
    label: '阈值补差逻辑',
    align: 'center',
    i18n: '阈值补差逻辑',
    tooltip: true,
    width: 150
  },
  {
    prop: 'tcCurrence',
    label: '货币',
    align: 'center',
    i18n: '货币',
    tooltip: true,
    width: 150
  },
  {
    prop: 'tcExchangeRate',
    label: '汇率',
    align: 'center',
    i18n: '汇率',
    width: 150
  },
  {
    prop: 'compensationRatio',
    label: '补差系数',
    align: 'center',
    i18n: '补差系数',
    tooltip: true,
    width: 150
  },
  {
    prop: 'threshold',
    label: '阈值',
    align: 'center',
    i18n: '阈值',
    tooltip: true,
    width: 150
  },
  {
    prop: 'compensationPeriod',
    label: '补差周期',
    align: 'center',
    i18n: '补差周期',
    tooltip: true,
    width: 150
  },
  {
    prop: 'startDate',
    label: '有效期起',
    align: 'center',
    i18n: '有效期起',
    tooltip: true,
    width: 150
  },
  {
    prop: 'endDate',
    label: '有效期止',
    align: 'center',
    i18n: '有效期止',
    tooltip: true,
    width: 150
  },
  {
    prop: 'effectFlag',
    label: '是否生效',
    align: 'center',
    i18n: '是否生效',
    tooltip: true,
    width: 150
  },
  {
    prop: 'updateDate',
    label: '更新时间',
    align: 'center',
    i18n: '更新时间',
    tooltip: true,
    width: 150
  },
  {
    prop: 'source',
    label: '来源',
    align: 'center',
    i18n: '来源',
    emit: 'go-source',
    tooltip: true,
    customRender: (h, scope) => {
      return <span class="open-link-text">{scope.row.sourceCode}</span>
    }
  },
  {
    prop: 'platinumPrice',
    label: '铂基价',
    align: 'center',
    i18n: '铂基价',
    tooltip: true,
    width: 100,
    headerRender: (h, { column }) => renderIcon(h, column, 1)
  },
  {
    prop: 'platinumDosage',
    label: '铂用量',
    align: 'center',
    i18n: '铂用量',
    tooltip: true,
    width: 100,
    headerRender: (h, { column }) => renderIcon(h, column, 1)
  },
  {
    prop: 'palladiumPrice',
    label: '钯基价',
    align: 'center',
    i18n: '钯基价',
    tooltip: true,
    width: 100,
    headerRender: (h, { column }) => renderIcon(h, column, 2)
  },
  {
    prop: 'palladiumDosage',
    label: '钯用量',
    align: 'center',
    i18n: '钯用量',
    tooltip: true,
    width: 100,
    headerRender: (h, { column }) => renderIcon(h, column, 2)
  },
  {
    prop: 'rhodiumPrice',
    label: '铑基价',
    align: 'center',
    i18n: '铑基价',
    tooltip: true,
    width: 100,
    headerRender: (h, { column }) => renderIcon(h, column, 3)
  },
  {
    prop: 'rhodiumDosage',
    label: '铑用量',
    align: 'center',
    i18n: '铑用量',
    tooltip: true,
    width: 100,
    headerRender: (h, { column }) => renderIcon(h, column, 3)
  },
  {
    prop: 'preciousMetalDosageUnit',
    label: '贵金属用量&基价单位',
    align: 'center',
    i18n: '贵金属用量&基价单位',
    width: 200
  }
]

// 一二次零件号
export const partNumber = [
  { type: 'selection', width: 50 },
  { type: 'index', label: '#', i18n: '#', width: 50 },
  {
    prop: 'assemblyPartnum',
    label: '',
    i18n: '一次件零件号',
    align: 'center',
    width: 150,
    customRender: (h, scope) => {
      return <pre>{scope.row.assemblyPartnum}</pre>
    }
  },
  {
    prop: 'assemblySupplierSap',
    label: '一次件供应商SAP号',
    i18n: '一次件供应商SAP号',
    align: 'center',
    width: 180
  },
  {
    prop: 'assemblySupplierName',
    label: '一次件供应商',
    width: '100px',
    align: 'center',
    i18n: '一次件供应商',
    width: 150
  },
  {
    prop: 'assemblyPartName',
    label: '一次件零件名',
    align: 'center',
    i18n: '一次件零件名',
    width: 150
  },
  {
    prop: 'buyerName',
    label: '采购员',
    i18n: '采购员',
    align: 'center',
    width: 150
  },
  {
    prop: 'buyerDeptName',
    label: '科室',
    width: '100px',
    align: 'center',
    i18n: '科室',
    width: 150
  },
  {
    prop: 'piecePartnum',
    label: '二次件零件号',
    align: 'center',
    i18n: '二次件零件号',
    width: 150
  },
  {
    prop: 'piecePartName',
    label: '二次件零件名',
    align: 'center',
    i18n: '二次件零件名',
    width: 150
  },
  {
    prop: 'pieceSupplierSap',
    label: '二次件供应商SAP号',
    align: 'center',
    i18n: '二次件供应商SAP号',
    width: 180
  },
  {
    prop: 'pieceSupplierName',
    label: '二次件供应商',
    align: 'center',
    i18n: '二次件供应商',
    width: 150
  },
  {
    prop: 'proportion',
    label: '二次件与一次件比例',
    align: 'center',
    i18n: '二次件与一次件比例',
    width: 200
  },
  {
    prop: 'ruleNo',
    label: '规则编号',
    align: 'center',
    i18n: '规则编号',
    width: 150
  },
  {
    prop: 'materialCode',
    label: '原材料牌号',
    align: 'center',
    i18n: '原材料牌号',
    width: 150
  },
  {
    prop: 'material',
    label: '原材料名称',
    align: 'center',
    i18n: '原材料名称',
    width: 150
  },
  { prop: 'price', label: '基价', align: 'center', i18n: '基价', width: 150 },
  {
    prop: 'priceCountUnit',
    label: '基价计量单位',
    align: 'center',
    i18n: '基价计量单位',
    width: 150
  },
  { prop: 'priceUnit', label: '每', align: 'center', i18n: '每', width: 150 },
  {
    prop: 'countUnit',
    label: '零件数量单位',
    align: 'center',
    i18n: '零件数量单位',
    width: 150
  },
  { prop: 'dosage', label: '用量', align: 'center', i18n: '用量', width: 150 },
  {
    prop: 'dosageMeasureUnit',
    label: '用量计量单位',
    align: 'center',
    i18n: '用量计量单位',
    width: 150
  },
  {
    prop: 'marketSource',
    label: '市场价来源',
    align: 'center',
    i18n: '市场价来源',
    width: 150
  },
  {
    prop: 'thresholdCompensationLogic',
    label: '阈值补差逻辑',
    align: 'center',
    i18n: '阈值补差逻辑',
    width: 150
  },
  {
    prop: 'tcCurrence',
    label: '货币',
    align: 'center',
    i18n: '货币',
    width: 150
  },
  {
    prop: 'tcExchangeRate',
    label: '汇率',
    align: 'center',
    i18n: '汇率',
    width: 150
  },
  {
    prop: 'compensationRatio',
    label: '补差系数',
    align: 'center',
    i18n: '补差系数',
    width: 150
  },
  {
    prop: 'threshold',
    label: '阈值',
    align: 'center',
    i18n: '阈值',
    width: 150
  },
  {
    prop: 'compensationPeriod',
    label: '补差周期',
    align: 'center',
    i18n: '补差周期',
    width: 150
  },
  {
    prop: 'startDate',
    label: '有效期起',
    align: 'center',
    i18n: '有效期起',
    width: 150
  },
  {
    prop: 'endDate',
    label: '有效期止',
    align: 'center',
    i18n: '有效期止',
    width: 150
  },
  {
    prop: 'effectFlag',
    label: '是否生效',
    align: 'center',
    i18n: '是否生效',
    width: 150
  },
  {
    prop: 'updateDate',
    label: '更新时间',
    align: 'center',
    i18n: '更新时间',
    width: 150
  },
  {
    prop: 'source',
    label: '来源',
    align: 'center',
    i18n: '来源',
    emit: 'go-detail',
    customRender: (h, scope) => {
      return <span class="open-link-text">{scope.row.sourceCode}</span>
    }
  },
  { prop: 'versionNum', label: '版本', align: 'center', i18n: '版本' },
  { prop: 'attr', label: '备注', align: 'center', i18n: '备注' },
  {
    prop: 'platinumPrice',
    label: '铂基价',
    align: 'center',
    i18n: '铂基价',
    tooltip: true,
    width: 100,
    headerRender: (h, { column }) => renderIcon(h, column, 1)
  },
  {
    prop: 'platinumDosage',
    label: '铂用量',
    align: 'center',
    i18n: '铂用量',
    tooltip: true,
    width: 100,
    headerRender: (h, { column }) => renderIcon(h, column, 1)
  },
  {
    prop: 'palladiumPrice',
    label: '钯基价',
    align: 'center',
    i18n: '钯基价',
    tooltip: true,
    width: 100,
    headerRender: (h, { column }) => renderIcon(h, column, 2)
  },
  {
    prop: 'palladiumDosage',
    label: '钯用量',
    align: 'center',
    i18n: '钯用量',
    tooltip: true,
    width: 100,
    headerRender: (h, { column }) => renderIcon(h, column, 2)
  },
  {
    prop: 'rhodiumPrice',
    label: '铑基价',
    align: 'center',
    i18n: '铑基价',
    tooltip: true,
    width: 100,
    headerRender: (h, { column }) => renderIcon(h, column, 3)
  },
  {
    prop: 'rhodiumDosage',
    label: '铑用量',
    align: 'center',
    i18n: '铑用量',
    tooltip: true,
    width: 100,
    headerRender: (h, { column }) => renderIcon(h, column, 3)
  },
  {
    prop: 'preciousMetalDosageUnit',
    label: '贵金属用量&基价单位',
    align: 'center',
    i18n: '贵金属用量&基价单位',
    width: 200
  }
]
export const exportTitle = [
  {
    props: 'partsCode',
    name: 'clnr',
    key: 'clnr'
  },
  {
    props: 'supplierCode',
    name: '供应商编号',
    key: 'GONGYINSHANGBIANHAO'
  },
  {
    props: 'supplierName',
    name: '供应商名称',
    key: 'GONGYINGSHANGMINGCHENG'
  },
  {
    props: 'partNum',
    name: '零件号',
    key: 'LINGJIANHAO'
  },
  {
    props: 'partName',
    name: '零件名-英文/德文',
    key: 'LINGJIANMING'
  },
  {
    props: 'factoryNum',
    name: '工厂编号',
    key: 'GONGCHANGBIANHAO'
  },
  {
    props: 'warehouseNum',
    name: '仓库编号',
    key: 'CHANGKUBIANHAO'
  },
  {
    props: 'qty',
    name: '数量',
    key: 'SHULAING'
  },
  {
    props: 'unit',
    name: '单位',
    key: 'DANWEI'
  },
  {
    props: 'storageDate',
    name: '入库时间',
    key: 'RUKUSHIJIAN'
  },
  {
    props: 'scrapeNum',
    name: '报废单号',
    key: 'BAOFEIDANHAO'
  },
  {
    props: 'createDate',
    name: '导入时间',
    key: 'DAORUSHIJIAN'
  },
  {
    props: 'status',
    name: '状态',
    key: 'ZHUANTAI'
  },
  {
    props: 'sapOrderNum',
    name: 'SAP订单号',
    key: 'SAPDINGDAN'
  },
  {
    props: 'sapReturnNum',
    name: 'SAP退货单号',
    key: 'SAPTUIHUODINGDAN'
  },
  {
    props: 'receiptUser',
    name: '签收采购员',
    key: 'QIANSHOUCAIGOUYUAN'
  }
]

export const formJSON = [
  { props: 'partnum', name: '零件号' },
  { props: 'partName', name: '零件名' },
  { props: 'supplierSap', name: '供应商SAP号' },
  { props: 'supplierName', name: '供应商名称' },
  { props: 'ruleNo', name: '规则编号' },
  { props: 'materialCode', name: '原材料牌号' },
  { props: 'buyerName', name: '采购员' }
]

export const oneTwoPartNumber = [
  { props: 'assemblyPartnum', name: '一次件零件号' },
  { props: 'assemblySupplierName', name: '一次件供应商' },
  { props: 'piecePartnum', name: '二次件零件号' },
  { props: 'pieceSupplierName', name: '二次件供应商' },
  { props: 'material', name: 'MTZ原材料' },
  { props: 'materialCode', name: '原材料牌号' },
  { props: 'buyerDeptName', name: '科室' },
  { props: 'createByName', name: '创建人' },
  { props: 'updateDate', name: '更新时间' }
]

// 查看一二次零件form表单
export const partsRelationship = [
  { props: 'partNum', name: 'SAP零件号', key: 'SAPLINGJIANHAO' },
  { props: 'partNameZh', name: '零件名(中)', key: 'LINGJIANMINGZHONG' },
  { props: 'partNameDe', name: '零件名(德)', key: 'LINGJIANMINGDE' },
  { props: 'carType', name: '车  型', key: 'CHEXING' }
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
    i18n: 'LINGJIANMINGZHONG',
    tooltip: true
  },
  {
    prop: 'partNameDe',
    label: '零件名（德）',
    tooltip: true,
    i18n: 'LINGJIANMINGDE'
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
    key: 'LINGJIANMINGZHONG',
    tooltip: true
  },
  {
    props: 'partNameDe',
    name: '零件名（德）',
    tooltip: true,
    key: 'LINGJIANMINGDE'
  },
  { props: 'lcOrCkd', name: 'Bezug类型', key: 'BEZUGLEIXING', tooltip: true },
  { props: 'dosage', name: '用量', tooltip: true, key: 'YONGLIANG' }
]

export const partsRelationshipDetailFormData = [
  { props: 'partNum', name: '总成编号' },
  { props: 'partNameZh', name: '零件名(中)' },
  { props: 'partNameDe', name: '零件名(德)' },
  // { props: 'carType', name: '车型' },
  { props: 'startDate', name: '开始时间' },
  { props: 'importDate', name: '导入时间' }
]

// 来源
export const sourceData = [
  { type: 'selection', width: 50 },
  { prop: 'receiptUser', label: '新零件号', align: 'center', i18n: '新零件号' },
  { prop: 'receiptUser', label: '老零件号', align: 'center', i18n: '老零件号' },
  {
    prop: 'receiptUser',
    label: '供应商SAP号',
    align: 'center',
    i18n: '供应商SAP号'
  },
  {
    prop: 'receiptUser',
    label: '供应商名称',
    align: 'center',
    i18n: '供应商名称'
  },
  {
    prop: 'receiptUser',
    label: '原材料名称',
    align: 'center',
    i18n: '原材料名称'
  },
  {
    prop: 'receiptUser',
    label: '原材料牌号',
    align: 'center',
    i18n: '原材料牌号'
  },
  { prop: 'receiptUser', label: '基价', align: 'center', i18n: '基价' },
  { prop: 'receiptUser', label: '每', align: 'center', i18n: '每' },
  {
    prop: 'receiptUser',
    label: '基价计量单位',
    align: 'center',
    i18n: '基价计量单位'
  },
  { prop: 'receiptUser', label: '原用量', align: 'center', i18n: '原用量' },
  { prop: 'receiptUser', label: '用量变化', align: 'center', i18n: '用量变化' },
  { prop: 'receiptUser', label: '新用量', align: 'center', i18n: '新用量' },
  {
    prop: 'receiptUser',
    label: '用量计量单位',
    align: 'center',
    i18n: '用量计量单位'
  },
  {
    prop: 'receiptUser',
    label: '市场价来源',
    align: 'center',
    i18n: '市场价来源'
  },
  {
    prop: 'receiptUser',
    label: '阈值补差逻辑',
    align: 'center',
    i18n: '阈值补差逻辑'
  }
]

// 一二次关系有效性上传
export const relationalValidityFormData = [
  { props: 'assemblyPartNum', name: '一次件零件号' },
  { props: 'piecePartNum', name: '二次件零件号' },
  { props: 'assemblySupplierName', name: '一次件供应商' },
  { props: 'pieceSupplierName', name: '二次件供应商' }
]
export const relationalValidityTableSetting = [
  {
    prop: 'assemblyPartNum',
    label: '一次件零件号',
    align: 'center',
    i18n: '一次件零件号'
  },
  {
    prop: 'assemblyPartNameZh',
    label: '一次件零件名称',
    align: 'center',
    i18n: '一次件零件名称'
  },
  {
    prop: 'assemblySupplierName',
    label: '一次件供应商',
    align: 'center',
    i18n: '一次件供应商'
  },
  {
    prop: 'piecePartNum',
    label: '二次件零件号',
    align: 'center',
    i18n: '二次件零件号'
  },
  {
    prop: 'piecePartNameZh',
    label: '二次件零件名称',
    align: 'center',
    i18n: '二次件零件名称'
  },
  {
    prop: 'pieceSupplierName',
    label: '二次件供应商',
    align: 'center',
    i18n: '二次件供应商'
  },
  { prop: 'dosage', label: '用量', align: 'center', i18n: '用量' },
  { prop: 'createDate', label: '上传时间', align: 'center', i18n: '上传时间' },
  { prop: 'isValid', label: '是否生效', align: 'center', i18n: '是否生效' }
]
