/*
 * @Author: your name
 * @Date: 2021-09-13 16:56:57
 * @LastEditTime: 2021-12-03 15:17:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\dataBase\rulesQuery\components\data.js
 */
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

// 员工列表Table配置
export const tableSetting = [
  { type: 'selection', width: 50 },
  { type: 'index', label: '#', i18n: '#', width: 50 },
  {
    prop: 'ruleNo',
    label: '规则编号',
    i18n: '规则编号',
    align: 'center',
    width: 150
  },
  {
    prop: 'sapCode',
    label: '供应商编号',
    i18n: '供应商编号',
    align: 'center',
    width: 150
  },
  {
    prop: 'supplierName',
    label: '供应商名称',
    width: '100px',
    align: 'center',
    i18n: '供应商名称',
    width: 150
  },
  {
    prop: 'materialCode',
    label: '原材料牌号',
    align: 'center',
    i18n: '原材料牌号',
    width: 150
  },
  // {prop: 'materialCategory',label: '中类名称',i18n: '中类名称',align: 'center',width: 150},
  {
    prop: 'materialName',
    label: '原材料名称',
    i18n: '原材料名称',
    align: 'center',
    width: 150
  },
  {
    prop: 'offsetMonth',
    tooltip: true,
    align: 'center',
    label: '计算偏移(月)',
    i18n: '计算偏移(月)',
    width: 120
  },
  {
    prop: 'avgPeriod',
    tooltip: true,
    align: 'center',
    label: '均值计算周期(月)',
    i18n: '均值计算周期(月)',
    width: 140
  },
  { prop: 'price', label: '基价', align: 'center', i18n: '基价', width: 150 },
  {
    prop: 'priceMeasureUnit',
    label: '基价计量单位',
    align: 'center',
    i18n: '基价计量单位',
    width: 150
  },
  {
    prop: 'tcCurrence',
    label: '货币',
    align: 'center',
    i18n: '货币',
    width: 150
  },
  { prop: 'tcExchangeRate', label: '汇率', align: 'center', i18n: '汇率' },
  {
    prop: 'marketSource',
    label: '市场价来源',
    align: 'center',
    i18n: '市场价来源',
    width: 150
  },
  {
    prop: 'compensationRatio',
    label: '补差系数',
    align: 'center',
    i18n: '补差系数',
    width: 150
  },
  { prop: 'threshold', label: '阈值', align: 'center', i18n: '阈值' },
  {
    prop: 'thresholdCompensationLogic',
    label: '阈值补差逻辑',
    align: 'center',
    i18n: '阈值补差逻辑',
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
    prop: 'buyerName',
    label: 'MTZ定点采购员',
    align: 'center',
    i18n: 'MTZ定点采购员',
    width: 180
  },
  {
    prop: 'buyerDeptName',
    label: 'MTZ定点采购员科室',
    align: 'center',
    i18n: 'MTZ定点采购员科室',
    width: 200
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
    prop: 'sourceCode',
    label: '来源',
    align: 'center',
    i18n: '来源',
    width: 150,
    emit: 'go-detail',
    customRender: (h, scope) => {
      if(scope.row.sourceCode == "初始化"){
        return <span>{scope.row?.sourceCode}</span>
      }else{
        return <span class="link-text">{scope.row?.sourceCode}</span>
      }
    }
  },
  {
    prop: 'effectFlag',
    label: '是否生效',
    align: 'center',
    i18n: '是否生效',
    width: 150
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
  },{
    prop: 'preciousMetalDosageUnit',
    label: '贵金属用量&基价单位',
    align: 'center',
    i18n: '贵金属用量&基价单位',
    width: 200
  },
  {
    prop: 'substrateExw',
    label: '载体费用',
    align: 'center',
    i18n: '载体费用',
    width: 150
  },{
    prop: 'substrateImpDuty',
    label: '载体税率(%)',
    align: 'center',
    i18n: '载体税率(%)',
    width: 150
  },{
    prop: 'substrateHandling',
    label: '载体管理费率(%)',
    align: 'center',
    i18n: '载体管理费率(%)',
    width: 150
  },{
    prop: 'pgmHandling',
    label: '贵金属管理费率(%)',
    align: 'center',
    i18n: '贵金属管理费率(%)',
    width: 150
  },{
    prop: 'manufacture',
    label: '制造费用',
    align: 'center',
    i18n: '制造费用',
    width: 150
  },{
    prop: 'transport',
    label: '运输费用',
    align: 'center',
    i18n: '运输费用',
    width: 150
  },
]

export const ruleQueryFormData = [
  { props: 'ruleNo', name: '规则编号', key: 'GUIZHEBIANHAO' },
  { props: 'materialName', name: '原材料名称', key: 'YUANCAILIAOMINGCHENG' },
  { props: 'materialCode', name: '原材料牌号', key: 'YUANCAILIAOPAIHAO' },
  { props: 'sapCode', name: '供应商SAP号', key: 'GONGYINGSHANGSAPHAO' },
  { props: 'supplierName', name: '供应商名称', key: 'GONGYINGSHANGMINGCHENG' },
  { props: 'buyerName', name: '采购员', key: 'CAIGOUYUAN' }
]
