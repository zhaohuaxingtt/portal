/*
 * @Author: your name
 * @Date: 2021-10-26 20:16:30
 * @LastEditTime: 2022-03-09 10:51:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationChange\newMtzlocationChange\components\data.js
 */
export const TABLE_COLUMNS = [
  {
    type: 'selection',
    width: '60px'
  },
  {
    type: 'index',
    width: '60px',
    label: '#'
  },
  {
    prop: 'assemblyPartnum',
    label: '一次件零件号',
    emit: 'go-detail',
    // customRender: (h, scope) => {
    //   return <span class="open-link-text">{scope.row.assemblyPartnum}</span>
    // },
    minWidth: 120,
    tooltip: true
  },
  {
    prop: 'assemblySupplierSap',
    label: '一次件供应商SAP号',
    minWidth: 180,
    tooltip: true
  },
  {
    prop: 'assemblySupplierName',
    label: '一次件供应商',
    minWidth: 160,
    tooltip: true
  },
  {
    prop: 'assemblyPartName',
    label: '一次件零件名',
    minWidth: 180,
    tooltip: true
  },
  {
    prop: 'buyerName',
    label: '采购员',
    minWidth: 120,
    tooltip: true
  },
  {
    // prop: 'buyerDeptNum',
    prop: 'buyerDeptNum',
    label: '科室',
    minWidth: 120,
    tooltip: true
  },
  {
    prop: 'piecePartnum',
    label: '二次件零件号',
    minWidth: 120,
    tooltip: true
  },
  {
    prop: 'piecePartName',
    label: '二次件零件名',
    minWidth: 140,
    tooltip: true
  },
  {
    prop: 'pieceSupplierSap',
    label: '二次件供应商SAP号',
    minWidth: 160,
    tooltip: true
  },
  {
    prop: 'pieceSupplierName',
    label: '二次件供应商',
    minWidth: 120,
    tooltip: true
  },
  {
    prop: 'proportion',
    label: '二次件与一次件比例',
    minWidth: 160,
    tooltip: true
  },
  {
    prop: 'ruleNo',
    label: '规则编号',
    minWidth: 120,
    tooltip: true
  },
  {
    prop: 'materialCode',
    label: '原材料牌号',
    minWidth: 160,
    tooltip: true
  },
  {
    prop: 'material',
    label: '原材料名称',
    minWidth: 120,
    tooltip: true
  },
  {
    prop: 'price',
    label: '基价',
    minWidth: 120,
    tooltip: true
  },
  {
    prop: 'priceCountUnit',
    label: '基价计量单位',
    minWidth: 120,
    tooltip: true
  },
  {
    prop: 'priceUnit',
    label: '每',
    minWidth: 120,
    tooltip: true
  },
  {
    prop: 'countUnit',
    label: '零件数量',
    minWidth: 120,
    tooltip: true,
    customRender: (h) => {
      return ''
    }
  },
  {
    prop: 'dosage',
    label: '用量',
    minWidth: 120,
    tooltip: true
  },
  {
    prop: 'dosageMeasureUnit',
    label: '用量计量单位',
    minWidth: 140,
    tooltip: true
  },
  {
    prop: 'marketSource',
    label: '市场价来源',
    minWidth: 120,
    tooltip: true
  },
  {
    prop: 'thresholdCompensationLogic',
    label: '阈值补差逻辑',
    minWidth: 120,
    tooltip: true
  },
  {
    prop: 'tcCurrence',
    label: '货币',
    minWidth: 120,
    tooltip: true
  },
  {
    prop: 'tcExchangeRate',
    label: '汇率',
    minWidth: 120,
    tooltip: true
  },
  {
    prop: 'compensationRatio',
    label: '补差系数',
    minWidth: 120,
    tooltip: true
  },
  {
    prop: 'threshold',
    label: '阈值',
    minWidth: 120,
    tooltip: true
  },
  {
    prop: 'compensationPeriod',
    label: '补差周期',
    minWidth: 120,
    tooltip: true
  },
  {
    prop: 'startDate',
    label: '有效期起',
    minWidth: 120,
    tooltip: true
  },
  {
    prop: 'endDate',
    label: '有效期止',
    minWidth: 120,
    tooltip: true
  },
  {
    prop: 'effectFlag',
    label: '是否生效',
    minWidth: 120,
    tooltip: true
  },
  {
    prop: 'updateDate',
    label: '更新时间',
    minWidth: 120,
    tooltip: true
  },
  {
    prop: 'source',
    label: '来源',
    minWidth: 120,
    tooltip: true
  }
]

export const tableList = [
  {
    assemblyPartnum: '11111',
    assemblySupplierSap: '111111'
  }
]
// 沿用补差规则查询
export const QueryFormData = [
  { props: 'ruleNo', name: '规则编号', key: 'GUIZHEBIANHAO' },
  { props: 'method', name: '补差方式', key: '补差方式', type: 'select', selectOption: 'methodList' },
  { props: 'materialGroup', name: '材料组', key: 'LK_CAILIAOZHU' },
  { props: 'partNum', name: '零件号', key: 'LK_LINGJIANHAO', type: "iMultiLineInput" },
  { props: 'partName', name: '零件名称', key: 'LK_LINGJIANMINGCHENG' },
  { props: 'sapCode', name: '供应商SAP号', key: 'GONGYINGSHANGSAPHAO' },
  { props: 'supplierName', name: '供应商名称', key: 'GONGYINGSHANGMINGCHENG' },
  { props: 'deptCode', name: '科室', key: '科室', type: 'select', selectOption: 'deptList' },
  { props: 'buyerName', name: '采购员', key: 'CAIGOUYUAN' },
  { props: 'effectFlag', name: '是否生效', key: 'SHIFOUSHENGXIAO', type: 'select', selectOption: 'effectFlagList' },
  { props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI', type: 'date' },
  { props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI', type: 'date' },
]

export const tableTitle = [
  {
    props: 'ruleNo',
    name: '规则编号',
    key: 'GUIZEBIANHAO',
    align: 'center',
    width: 150
  }, {
    props: 'method',
    name: '补差方式',
    key: '补差方式',
    align: 'center',
    width: 150
  }, {
    props: 'materialGroup',
    name: '材料组',
    key: '材料组',
    align: 'center',
    width: 150
  }, {
    props: 'materialName',
    name: '原材料描述',
    key: '原材料描述',
    align: 'center',
    width: 150
  }, {
    props: 'oncePartNum',
    name: '一次零件号',
    key: '一次零件号',
    align: 'center',
    width: 150
  }, {
    props: 'oncePartName',
    name: '一次零件名称',
    key: '一次零件名称',
    align: 'center',
    width: 150
  },
  {
    props: 'onceSapCode',
    name: '一次件供应商编号',
    key: '一次件供应商编号',
    align: 'center',
    width: 150
  },
  {
    props: 'onceSupplierName',
    name: '一次件供应商名称',
    width: '100px',
    align: 'center',
    key: '一次件供应商名称',
    width: 150
  },
  {
    props: 'buyer',
    name: '采购员',
    width: '100px',
    align: 'center',
    key: '采购员',
    width: 100
  },
  {
    props: 'dept',
    name: '科室',
    width: '100px',
    align: 'center',
    key: '科室',
    width: 100
  }, {
    props: 'secondPartNum',
    name: '二次零件号',
    key: '二次零件号',
    align: 'center',
    width: 150
  }, {
    props: 'secondPartName',
    name: '二次零件名称',
    key: '二次零件名称',
    align: 'center',
    width: 150
  },
  {
    props: 'secondSapCode',
    name: '二次件供应商编号',
    key: '二次件供应商编号',
    align: 'center',
    width: 150
  },
  {
    props: 'secondSupplierName',
    name: '二次件供应商名称',
    align: 'center',
    key: '二次件供应商名称',
    width: 150
  },
  {
    props: 'proportion',
    name: '二次件与一次件比例',
    align: 'center',
    key: '二次件与一次件比例',
    width: 150
  },
  {
    props: 'amount',
    name: '补差金额',
    width: '100px',
    align: 'center',
    key: '补差金额',
    width: 150
  },
  {
    props: 'tcCurrence',
    name: '货币',
    align: 'center',
    key: 'HUOBI',
    width: 150
  },
  { props: 'tcExchangeRate', name: '汇率', align: 'center', key: 'HUILV' },
  {
    props: 'startDate',
    name: '有效期起',
    align: 'center',
    key: 'YOUXIAOQIQI',
    width: 150
  },
  {
    props: 'endDate',
    name: '有效期止',
    align: 'center',
    key: 'YOUXIAOQIZHI',
    width: 150
  },
  {
    props: 'effectFlag',
    name: '是否生效',
    align: 'center',
    key: 'SHIFOUSHENGXIAO',
    width: 150
  },
  {
    props: 'updateDate',
    name: '更新时间',
    align: 'center',
    key: '更新时间',
    width: 150
  },
  {
    props: 'sourceCode',
    name: '补差来源',
    align: 'center',
    key: '补差来源',
    width: 150,
  }
]