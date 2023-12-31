/*
 * @Author: your name
 * @Date: 2021-10-26 20:16:30
 * @LastEditTime: 2023-02-23 11:36:59
 * @LastEditors: YoHo && 917955345@qq.com
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
    prop: 'method',
    label: '补差方式',
    minWidth: 120,
    tooltip: true,
    customRender:(h, scope, c, extraData)=>{
      return <span>{ scope.row.method == '1' ? extraData.language('一次性补差') : scope.row.method == '2' ?extraData.language('变价单补差') : '' }</span>
    }
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
