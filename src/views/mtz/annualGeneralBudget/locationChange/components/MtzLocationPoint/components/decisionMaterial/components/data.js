/*
 * @Author: youyuan
 * @Date: 2021-10-28 16:31:29
 * @LastEditTime: 2022-03-03 16:25:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\decisionMaterial\components\data.js
 */
// 导航
export const methodList=[
  { code: '1', name: '一次性补差',  },
  { code: '2', name: '变价单补差',  },
]
export const partBalanceCountTypeList=[
  { code: 'SYSTEM', name: '系统预读',  },
  { code: 'HANDWORK', name: '手工上传',  },
]
export const materialDoseSourceList=[
  { code: 'BLUEPRINT', name: '图纸',  },
  { code: 'WEIGH', name: '称重',  },
  { code: 'CONVENTION', name: '约定',  },
]
export const avgPeriodList = [
  { code: '1', name: '一月',  },
  { code: '2', name: '二月',  },
  { code: '3', name: '三月',  },
  { code: '4', name: '四月',  },
  { code: '6', name: '六月',  },
  { code: '12', name: '十二月',  },
  { code: '0', name: '补差时间段内均值',  },
]
export const offsetList = [
  { code: '1', name: '1个月',  },
  { code: '2', name: '2个月',  },
  { code: '3', name: '3个月',  },
  { code: '4', name: '4个月',  },
  { code: '5', name: '5个月',  },
  { code: '6', name: '6个月',  },
  { code: '7', name: '7个月',  },
  { code: '8', name: '8个月',  },
  { code: '9', name: '9个月',  },
  { code: '10', name: '10个月',  },
  { code: '11', name: '11个月',  },
  { code: '12', name: '12个月',  },
  { code: '0', name: '0个月',  },
  { code: '-1', name: '-1个月',  },
  { code: '-2', name: '-2个月',  },
  { code: '-3', name: '-3个月',  },
  { code: '-4', name: '-4个月',  },
  { code: '-5', name: '-5个月',  },
  { code: '-6', name: '-6个月',  },
  { code: '-7', name: '-7个月',  },
  { code: '-8', name: '-8个月',  },
  { code: '-9', name: '-9个月',  },
  { code: '-10', name: '-10个月',  },
  { code: '-11', name: '-11个月',  },
  { code: '-12', name: '-12个月',  },
]
export const tabRouterList = [
  {
    value: 1,
    name: 'MTZ',
    url: '',
    activePath: '',
    key: 'MTZ'
  },
  {
    value: 2,
    name: '附件上传',
    url: '',
    activePath: '',
    key: 'FUJIANSHANGCHUAN'
  }
]

// mtz-表单
export const formList = [
  {
    key: 'SHENQINGDANHAO',
    label: '申请单号',
    // prop: 'ttNominateAppId',
    prop: 'mtzAppId'
  },
  {
    key: 'SHENQINGDANMING',
    label: '申请单名',
    prop: 'appName'
  },
  {
    key: 'LINIE',
    label: 'Linie',
    prop: 'linieName'
  },
  {
    key: 'KESHI',
    label: '科室',
    prop: 'linieDeptName'
  },
  {
    key: 'SHENQINGDANLEIXING',
    label: '申请单类型',
    prop: 'flowTypeName'
  },
  {
    key: 'HUIYIMINGCHENG',
    label: '会议名称',
    prop: 'meetingName'
  },
  {
    key: 'SHENQINGZHUANGTAI',
    label: '申请状态',
    prop: 'appStatus'
  }
]
export const ruleTableTitle1_2 = [
  {
    props: 'platinumPrice',
    name: '铂基价Pt Base Price',
    key: '铂基价Pt Base Price',
  },
  {
    props: 'platinumDosage',
    name: '铂用量Pt Consumption',
    key: '铂用量Pt Consumption',
  },

  {
    props: 'palladiumPrice',
    name: '钯基价Pd Base Price',
    key: '钯基价Pd Base Price',
  },
  {
    props: 'palladiumDosage',
    name: '钯用量Pd Consumption',
    key: '钯用量Pd Consumption',
  },
  {
    props: 'rhodiumPrice',
    name: '铑基价Kr Base Price',
    key: '铑基价Kr Base Price',
  },
  {
    props: 'rhodiumDosage',
    name: '铑用量Kr Consumption',
    key: '铑用量Kr Consumption',
  },
  {
    props: 'preciousMetalDosageUnit',
    name: '贵金属用量&基价单位Precious Metal Consumption & Base Price Unit',
    key: '贵金属用量&基价单位Precious Metal Consumption & Base Price Unit',
    width:300
  },
  {
    props: 'substrateExw',
    name: '载体费用substrate Exw',
    key: '载体费用substrate Exw',
  },
  {
    props: 'substrateImpDuty',
    name: '载体税率(%)substrate ImpDuty',
    key: '载体税率(%)substrate ImpDuty',
    width:150
  },
  {
    props: 'substrateHandling',
    name: '载体管理费率(%)substrate Handling',
    key: '载体管理费率(%)substrate Handling',
    width:150

  },
  {
    props: 'pgmHandling',
    name: '贵金属管理费率(%)pgm Handling',
    key: '贵金属管理费率(%)pgm Handling',
    width:150

  },
  {
    props: 'manufacture',
    name: '制造费用manufacture',
    key: '制造费用manufacture',
  },
  {
    props: 'transport',
    name: '运输费用transport',
    key: '运输费用transport',
  },
  {
    props: 'ruleVersion',
    name: '版本version',
    key: '版本version',
  },
]

export const ruleTableTitle1_all = [
  //决策资料规则清单暂用
  {
    props: 'ruleNo',
    name: '规则编号Rule No.',
    key: '规则编号Rule No.',
    width: 70
  },
  {
    props: 'method',
    name: '规则类型Rule Type',
    key: '规则类型Rule Type',
    width: 70
  },
  {
    props: 'formalFlag',
    name: '是否新规则New Rule',
    key: '是否新规则New Rule',
    width: 80,
  },
  // {
  //   props: 'effectFlag',
  //   name: '是否生效',
  //   key: '是否生效',
  //   overlap: true,
  //   width: 70,
  //   overlapbottom: 'Effectiveness'
  // },
  {
    props: 'sapCode',
    name: '供应商Supplier',
    key: '供应商Supplier',
    tooltip: true,
    minWidth: 80
  },
  {
    props: 'materialCode',
    name: '原材料Material',
    key: '原材料Material',
    width: 85
  },
  {
    props: 'startDate',
    name: '有效期起Valid From',
    key: '有效期起Valid From',
    width: 80
  },
  {
    props: 'endDate',
    name: '有效期止Valid To',
    key: '有效期止Valid To',
    width: 80
  },
  {
    width: 120,
    props: 'partBalanceCountType',
    name: '零件结算数量Invoiced Part Source',
    key: '零件结算数量Invoiced Part Source',
    iconTextKey: '一般供应商：SAP系统读取；特殊供应商（VWPT等）：手工上传',
    typeIcon: 'num',
    num: '1'
  },
  {
    width: 100,
    props: 'source',
    name: '市场价来源Market',
    key: '市场价来源Market',
    iconTextKey: '贵金属：点价单非；贵金属：上海有色金属网',
    typeIcon: 'num',
    num: '2'
  },
  {
    props: 'avgPeriod',
    name: '均值计算周期',
    key: '均值计算周期',
    width: 110,
    icon: 'iconxinxitishi',
    iconTextKey: '全年原材料市场价按均值计算周期等分。例：均值计算周期为3个月时，1-3月市场价均为1-3月的市场价均值',
    // overlapbottom: 'Market'
  },
  {
    props: 'offsetMonth',
    name: '计算偏移量',
    width: 90,
    key: '计算偏移量',
    overlap: false,
    icon: 'iconxinxitishi',
    iconTextKey: '市场价取值与本月的偏移量，例：计算偏移量为-1，计算3月补差金额时取2月市场价',
    // overlapbottom: 'Market'
  },
  // {
  //   // props: 'materialGroup',
  //   props: 'materialGroupName',
  //   name: 'MTZ-材料组',
  //   key: 'MTZGANGCAILIAOZU',
  //   overlap: true,
  //   overlapbottom: 'MTZ group'
  // },
  // {
  //   props: 'carline',
  //   name: '车型',
  //   key: 'CHEXING',
  //   overlap: true,
  //   overlapbottom: 'Carline',
  //   minWidth: 50
  // },


  // {
  //   props: 'materialName',
  //   name: '中类名称',
  //   key: 'ZHONGLEIMINGCHENG',
  //   overlap: true,
  //   overlapbottom: 'Material Division',
  //   minWidth: 105
  // },
  {
    props: 'price',
    name: '基价Base price',
    key: '基价Base price',
    width: 60,
    iconTextKey: '与供应商约定的原材料基准价格',
    typeIcon: 'num',
    num: '3'
  },
  {
    props: 'tcCurrence',
    name: '货币Currency',
    key: '货币Currency',
    width: 60
  },
  {
    props: 'tcExchangeRate',
    name: '汇率Exchange Rate',
    key: '汇率Exchange Rate',
    width: 70,
    iconTextKey: '与供应商约定的原材料基准价格',
    typeIcon: 'num',
    num: '3'
  },
  {
    props: 'priceMeasureUnit',
    name: '基价计量单位Base price Unit',
    key: 'JIJIAJILIANGDANWEI',
    width: 100
  },

  {
    props: 'threshold',
    name: '阈值Forex',
    key: '阈值Forex',
    minWidth: 60,
    iconTextKey: '当市场价>（1+阈值）*基价或市场价<(1-阈值)*基价时，自动计算出补差结果；超额补差：只补超出阈值部分；全额补差：补市场价超出基价的部分',
    typeIcon: 'num',
    num: '4'
  },
  {
    props: 'thresholdCompensationLogic',
    name: '阈值补差逻辑Threhold',
    key: '阈值补差逻辑Threhold',
    width: 90
  },

  {
    props: 'compensationRatio',
    name: '补差系数Ratio',
    key: '补差系数Ratio',
    width: 80,
    overlap: false,
    iconTextKey: '补差计算中的比例系数',
    typeIcon: 'num',
    num: '6'
  },
  {
    props: 'compensationPeriod',
    name: '补差周期Compensation Cycle',
    key: '补差周期Compensation Cycle',
    width: 90
  },
  {
    props: 'platinumPrice',
    name: '铂基价Pt Base Price',
    key: '铂基价Pt Base Price',
  },
  {
    props: 'platinumDosage',
    name: '铂用量Pt Consumption',
    key: '铂用量Pt Consumption',
  },

  {
    props: 'palladiumPrice',
    name: '钯基价Pd Base Price',
    key: '钯基价Pd Base Price',
  },
  {
    props: 'palladiumDosage',
    name: '钯用量Pd Consumption',
    key: '钯用量Pd Consumption',
  },
  {
    props: 'rhodiumPrice',
    name: '铑基价Kr Base Price',
    key: '铑基价Kr Base Price',
  },
  {
    props: 'rhodiumDosage',
    name: '铑用量Kr Consumption',
    key: '铑用量Kr Consumption',
  },
  {
    props: 'preciousMetalDosageUnit',
    name: '贵金属用量&基价单位Precious Metal Consumption & Base Price Unit',
    key: '贵金属用量&基价单位Precious Metal Consumption & Base Price Unit',
    width:300
  },
  {
    props: 'substrateExw',
    name: '载体费用substrate Exw',
    key: '载体费用substrate Exw',
  },
  {
    props: 'substrateImpDuty',
    name: '载体税率(%)substrate ImpDuty',
    key: '载体税率(%)substrate ImpDuty',
    width:150
  },
  {
    props: 'substrateHandling',
    name: '载体管理费率(%)substrate Handling',
    key: '载体管理费率(%)substrate Handling',
    width:150

  },
  {
    props: 'pgmHandling',
    name: '贵金属管理费率(%)pgm Handling',
    key: '贵金属管理费率(%)pgm Handling',
    width:150

  },
  {
    props: 'manufacture',
    name: '制造费用manufacture',
    key: '制造费用manufacture',
  },
  {
    props: 'transport',
    name: '运输费用transport',
    key: '运输费用transport',
  },
  {
    props: 'ruleVersion',
    name: '版本version',
    key: '版本version',
    width: 70
  },


]
// MTZ-规则清单
export const ruleTableTitle1_1 = [
  //决策资料规则清单暂用
  {
    props: 'ruleNo',
    name: '规则编号Rule No.',
    key: '规则编号Rule No.',
    width: 70
  },
  {
    props: 'method',
    name: '规则类型Rule Type',
    key: '规则类型Rule Type',
    width: 70
  },
  {
    props: 'formalFlag',
    name: '是否新规则New Rule',
    key: '是否新规则New Rule',
    width: 80,
  },
  // {
  //   props: 'effectFlag',
  //   name: '是否生效',
  //   key: '是否生效',
  //   overlap: true,
  //   width: 70,
  //   overlapbottom: 'Effectiveness'
  // },
  {
    props: 'sapCode',
    name: '供应商Supplier',
    key: '供应商Supplier',
    tooltip: true,
    minWidth: 80
  },
  {
    props: 'materialCode',
    name: '原材料Material',
    key: '原材料Material',
    width: 85
  },
  {
    props: 'startDate',
    name: '有效期起Valid From',
    key: '有效期起Valid From',
    width: 80
  },
  {
    props: 'endDate',
    name: '有效期止Valid To',
    key: '有效期止Valid To',
    width: 80
  },
{
    width: 120,
    props: 'partBalanceCountType',
    name: '零件结算数量Invoiced Part Source',
    key: '零件结算数量Invoiced Part Source',
    iconTextKey: '一般供应商：SAP系统读取；特殊供应商（VWPT等）：手工上传',
    typeIcon: 'num',
    num: '1'
  },
  {
    width: 100,
    props: 'source',
    name: '市场价来源Market',
    key: '市场价来源Market',
    iconTextKey: '贵金属：点价单非；贵金属：上海有色金属网',
    typeIcon: 'num',
    num: '2'
  },
  {
    props: 'avgPeriod',
    name: '均值计算周期',
    key: '均值计算周期',
    width: 110,
    icon: 'iconxinxitishi',
    iconTextKey: '全年原材料市场价按均值计算周期等分。例：均值计算周期为3个月时，1-3月市场价均为1-3月的市场价均值',
    // overlapbottom: 'Market'
  },
  {
    props: 'offsetMonth',
    name: '计算偏移量',
    width: 90,
    key: '计算偏移量',
    overlap: false,
    icon: 'iconxinxitishi',
    iconTextKey: '市场价取值与本月的偏移量，例：计算偏移量为-1，计算3月补差金额时取2月市场价',
    // overlapbottom: 'Market'
  },
  // {
  //   // props: 'materialGroup',
  //   props: 'materialGroupName',
  //   name: 'MTZ-材料组',
  //   key: 'MTZGANGCAILIAOZU',
  //   overlap: true,
  //   overlapbottom: 'MTZ group'
  // },
  // {
  //   props: 'carline',
  //   name: '车型',
  //   key: 'CHEXING',
  //   overlap: true,
  //   overlapbottom: 'Carline',
  //   minWidth: 50
  // },


  // {
  //   props: 'materialName',
  //   name: '中类名称',
  //   key: 'ZHONGLEIMINGCHENG',
  //   overlap: true,
  //   overlapbottom: 'Material Division',
  //   minWidth: 105
  // },
  {
    props: 'price',
    name: '基价Base price',
    key: '基价Base price',
    width: 60,
    iconTextKey: '与供应商约定的原材料基准价格',
    typeIcon: 'num',
    num: '3'
  },
  {
    props: 'tcCurrence',
    name: '货币Currency',
    key: '货币Currency',
    width: 60
  },
  {
    props: 'tcExchangeRate',
    name: '汇率Exchange Rate',
    key: '汇率Exchange Rate',
    width: 70,
    iconTextKey: '与供应商约定的原材料基准价格',
    typeIcon: 'num',
    num: '3'
  },
  {
    props: 'priceMeasureUnit',
    name: '基价计量单位Base price Unit',
    key: 'JIJIAJILIANGDANWEI',
    width: 100
  },

  {
    props: 'threshold',
    name: '阈值Forex',
    key: '阈值Forex',
    minWidth: 60,
    iconTextKey: '当市场价>（1+阈值）*基价或市场价<(1-阈值)*基价时，自动计算出补差结果；超额补差：只补超出阈值部分；全额补差：补市场价超出基价的部分',
    typeIcon: 'num',
    num: '4'
  },
  {
    props: 'thresholdCompensationLogic',
    name: '阈值补差逻辑Threhold',
    key: '阈值补差逻辑Threhold',
    width: 90
  },

  {
    props: 'compensationRatio',
    name: '补差系数Ratio',
    key: '补差系数Ratio',
    width: 80,
    overlap: false,
    iconTextKey: '补差计算中的比例系数',
    typeIcon: 'num',
    num: '6'
  },
  {
    props: 'compensationPeriod',
    name: '补差周期Compensation Cycle',
    key: '补差周期Compensation Cycle',
    width: 90
  },

]
export const partTableTitle1_2 =[
  {
    props: 'tcExchangeRate',
    name: '汇率Exch. Rate',
    key: '汇率Exch. Rate',
  },
  {
    props: 'priceMeasureUnit',
    name: '基价计量单位Base price Unit',
    key: '基价计量单位Base price Unit',
  },
  {
    props: 'threshold',
    name: '阈值Threhold',
    key: '阈值Threhold',
  },
  {
    props: 'thresholdCompensationLogic',
    name: '阈值补差逻辑Threhold',
    key: '阈值补差逻辑Threhold',
  },


  {
    props: 'compensationRatio',
    name: '补差系数Ratio',
    key: '补差系数Ratio',
  },
  {
    props: 'partBalanceCountType',
    name: '零件结算数量类型part Balance Count Type',
    key: '零件结算数量类型part Balance Count Type',
    width:150
  },
  {
    props: 'priceSource',
    name: '市场价来源Market',
    key: '市场价来源Market',
  },
  {
    props: 'avgPeriod',
    name: '均值计算周期',
    key: '均值计算周期',
    // overlapbottom: 'Market'
  },
  {
    props: 'offsetMonth',
    name: '计算偏移量',
    key: '计算偏移量',
    // overlapbottom: 'Market'
  },

  {
    props: 'compensationPeriod',
    name: '补差周期Period',
    key: '补差周期Period',
  },
  {
    props: 'mark',
    name: '备注remark',
    key: '备注remark',
  },
  {
    props: 'ruleVersion',
    name: '版本version',
    key: '版本version',
  },


]
export const partTableTitle1_3 =[
 
  {
    props: 'platinumPrice',
    name: '铂基价Pt Base Price',
    key: '铂基价Pt Base Price',
  },
  {
    props: 'platinumDosage',
    name: '铂用量Pt Consumption',
    key: '铂用量Pt Consumption',
  },

  {
    props: 'palladiumPrice',
    name: '钯基价Pd Base Price',
    key: '钯基价Pd Base Price',
  },
  {
    props: 'palladiumDosage',
    name: '钯用量Pd Consumption',
    key: '钯用量Pd Consumption',
  },
  {
    props: 'rhodiumPrice',
    name: '铑基价Kr Base Price',
    key: '铑基价Kr Base Price',
  },
  {
    props: 'rhodiumDosage',
    name: '铑用量Kr Consumption',
    key: '铑用量Kr Consumption',
  },
  {
    props: 'preciousMetalDosageUnit',
    name: '贵金属用量&基价单位Precious Metal Consumption & Base Price Unit',
    key: '贵金属用量&基价单位Precious Metal Consumption & Base Price Unit',
    width:300,
  },
  {
    props: 'substrateExw',
    name: '载体费用substrate Exw',
    key: '载体费用substrate Exw',
    width:120,

  },
  {
    props: 'substrateImpDuty',
    name: '载体税率(%)substrate ImpDuty',
    key: '载体税率(%)substrate ImpDuty',
    width:150,

  },
  {
    props: 'substrateHandling',
    name: '载体管理费率(%)substrate Handling',
    key: '载体管理费率(%)substrate Handling',
    width:150,

  },
  {
    props: 'pgmHandling',
    name: '贵金属管理费率(%)pgm Handling',
    key: '贵金属管理费率(%)pgm Handling',
    width:150,

  },
  {
    props: 'manufacture',
    name: '制造费用manufacture',
    key: '制造费用manufacture',
  },
  {
    props: 'transport',
    name: '运输费用transport',
    key: '运输费用transport',
  },


]
export const partTableTitle1_all = [
  {
    props: 'assemblyPartnum',
    name: '零件号Part No.',
    key: '零件号Part No.',
    width: 110
  },
  {
    props: 'partName',
    name: '零件名称Part Name',
    key: '零件名称Part Name',
  },
  {
    props: 'sapCode',
    name: '供应商Supplier',
    key: '供应商Supplier',
    minWidth: 80
  },
  {
    props: 'partUnit',
    name: '零件数量单位Part Unit',
    key: '零件数量单位Part Unit',
    minWidth: 95
  },
  {
    props: 'priceUnit',
    name: '每 Per',
    key: '每 Per',
    minWidth: 30
  },


  {
    props: 'dosage',
    name: '用量Dosage',
    key: '用量Dosage',
    minWidth: 50,
    iconTextKey: '原材料在单位零件中的重量',
    typeIcon: 'num',
    num: '5'
  },
  {
    props: 'dosageMeasureUnit',
    name: '用量计量单位Dosage Unit',
    key: '用量计量单位Dosage Unit',
    minWidth: 90
  },
  {
    props: 'materialDoseSource',
    name: '原材料用量来源Raw Material Weight Source',
    key: '原材料用量来源Raw Material Weight Source',
    width: 150,

  },
  {
    props: 'startDate',
    name: '有效期起Valid From',
    key: '有效期起Valid From',
    minWidth: 75
  },
  {
    props: 'endDate',
    name: '有效期止Valid To',
    key: '有效期止Valid To',
    minWidth: 75
  },
  {
    props: 'ruleNo',
    name: '规则编号Rule No.',
    key: '规则编号Rule No.',
    minWidth: 90
  },
  {
    props: 'method',
    name: '规则类型Rule Type',
    key: '规则类型Rule Type',
    minWidth: 90
  },
  {
    props: 'materialCode',
    name: '原材料Material',
    key: '原材料Material',
    minWidth: 95
  },


  {
    props: 'price',
    name: '基价Base price',
    key: '基价Base price',
    width: 70
  },
  {
    props: 'tcCurrence',
    name: '货币Currency',
    key: '货币Currency',
    width: 60
  },
 

  {
    props: 'tcExchangeRate',
    name: '汇率Exch. Rate',
    key: '汇率Exch. Rate',
  },
  {
    props: 'priceMeasureUnit',
    name: '基价计量单位Base price Unit',
    key: '基价计量单位Base price Unit',
  },
  {
    props: 'threshold',
    name: '阈值Threhold',
    key: '阈值Threhold',
  },
  {
    props: 'thresholdCompensationLogic',
    name: '阈值补差逻辑Threhold',
    key: '阈值补差逻辑Threhold',
  },


  {
    props: 'compensationRatio',
    name: '补差系数Ratio',
    key: '补差系数Ratio',
  },
  {
    props: 'partBalanceCountType',
    name: '零件结算数量类型part Balance Count Type',
    key: '零件结算数量类型part Balance Count Type',
    width:150

  },
  {
    props: 'priceSource',
    name: '市场价来源Market',
    key: '市场价来源Market',
  },
  {
    props: 'avgPeriod',
    name: '均值计算周期',
    key: '均值计算周期',
    // overlapbottom: 'Market'
  },
  {
    props: 'offsetMonth',
    name: '计算偏移量',
    key: '计算偏移量',
    // overlapbottom: 'Market'
  },

  {
    props: 'compensationPeriod',
    name: '补差周期Period',
    key: '补差周期Period',
  },
  {
    props: 'mark',
    name: '备注remark',
    key: '备注remark',
  },
  {
    props: 'ruleVersion',
    name: '版本version',
    key: '版本version',
  },
  {
    props: 'platinumPrice',
    name: '铂基价Pt Base Price',
    key: '铂基价Pt Base Price',
  },
  {
    props: 'platinumDosage',
    name: '铂用量Pt Consumption',
    key: '铂用量Pt Consumption',
  },

  {
    props: 'palladiumPrice',
    name: '钯基价Pd Base Price',
    key: '钯基价Pd Base Price',
  },
  {
    props: 'palladiumDosage',
    name: '钯用量Pd Consumption',
    key: '钯用量Pd Consumption',
  },
  {
    props: 'rhodiumPrice',
    name: '铑基价Kr Base Price',
    key: '铑基价Kr Base Price',
  },
  {
    props: 'rhodiumDosage',
    name: '铑用量Kr Consumption',
    key: '铑用量Kr Consumption',
  },
  {
    props: 'preciousMetalDosageUnit',
    name: '贵金属用量&基价单位Precious Metal Consumption & Base Price Unit',
    key: '贵金属用量&基价单位Precious Metal Consumption & Base Price Unit',
    width:300,
  },
  {
    props: 'substrateExw',
    name: '载体费用substrate Exw',
    key: '载体费用substrate Exw',
    width:120,

  },
  {
    props: 'substrateImpDuty',
    name: '载体税率(%)substrate ImpDuty',
    key: '载体税率(%)substrate ImpDuty',
    width:150,

  },
  {
    props: 'substrateHandling',
    name: '载体管理费率(%)substrate Handling',
    key: '载体管理费率(%)substrate Handling',
    width:150,

  },
  {
    props: 'pgmHandling',
    name: '贵金属管理费率(%)pgm Handling',
    key: '贵金属管理费率(%)pgm Handling',
    width:150,

  },
  {
    props: 'manufacture',
    name: '制造费用manufacture',
    key: '制造费用manufacture',
  },
  {
    props: 'transport',
    name: '运输费用transport',
    key: '运输费用transport',
  },


]
// MTZ-零件清单
export const partTableTitle1_1 = [
  {
    props: 'assemblyPartnum',
    name: '零件号Part No.',
    key: '零件号Part No.',
    width: 110
  },
  {
    props: 'partName',
    name: '零件名称Part Name',
    key: '零件名称Part Name',
  },
  {
    props: 'sapCode',
    name: '供应商Supplier',
    key: '供应商Supplier',
    minWidth: 80
  },
  {
    props: 'partUnit',
    name: '零件数量单位Part Unit',
    key: '零件数量单位Part Unit',
    minWidth: 95
  },
  {
    props: 'priceUnit',
    name: '每 Per',
    key: '每 Per',
    minWidth: 30
  },


  {
    props: 'dosage',
    name: '用量Dosage',
    key: '用量Dosage',
    minWidth: 50,
    iconTextKey: '原材料在单位零件中的重量',
    typeIcon: 'num',
    num: '5'
  },
  {
    props: 'dosageMeasureUnit',
    name: '用量计量单位Dosage Unit',
    key: '用量计量单位Dosage Unit',
    minWidth: 90
  },
  {
    props: 'materialDoseSource',
    name: '原材料用量来源Raw Material Weight Source',
    key: '原材料用量来源Raw Material Weight Source',
    width: 150,

  },
  {
    props: 'startDate',
    name: '有效期起Valid From',
    key: '有效期起Valid From',
    minWidth: 75
  },
  {
    props: 'endDate',
    name: '有效期止Valid To',
    key: '有效期止Valid To',
    minWidth: 75
  },
  {
    props: 'ruleNo',
    name: '规则编号Rule No.',
    key: '规则编号Rule No.',
    minWidth: 90
  },
  {
    props: 'method',
    name: '规则类型Rule Type',
    key: '规则类型Rule Type',
    minWidth: 90
  },
  {
    props: 'materialCode',
    name: '原材料Material',
    key: '原材料Material',
    minWidth: 95
  },


  {
    props: 'price',
    name: '基价Base price',
    key: '基价Base price',
    width: 70
  },
  {
    props: 'tcCurrence',
    name: '货币Currency',
    key: '货币Currency',
    width: 60
  },
  // {
  //   props: 'priceMeasureUnit',
  //   name: '基价计量单位',
  //   key: 'JIJIAJILIANGDANWEI',
  //   overlap: true,
  //   overlapbottom: 'Base price Unit',
  //   minWidth: 110
  // },

  // {
  //   props: 'priceSource',
  //   name: '市场价来源',
  //   key: 'SHICHANGJIALAIYUAN',
  //   overlap: true,
  //   overlapbottom: 'Market',
  //   minWidth: 75
  // },
  // {
  //   props: 'compensationRatio',
  //   name: '补差系数',
  //   key: 'BUCHAXISHU',
  //   overlap: true,
  //   overlapbottom: 'Ratio',
  //   minWidth: 55
  // },
  // {
  //   props: 'threshold',
  //   name: '阈值',
  //   key: 'YUZHI',
  //   overlap: true,
  //   overlapbottom: 'Threhold',
  //   minWidth: 60
  // },
  // {
  //   props: 'compensationPeriod',
  //   name: '补差周期',
  //   key: 'BUCHAZHOUQI',
  //   overlap: true,
  //   overlapbottom: 'Period',
  //   minWidth: 60
  // },

]

// 附件上传
export const uploadTableTitle = [
  { props: 'fileName', name: '文件名', key: 'WENJIANMING', width: 600 },
  { props: 'createDate', name: '上传日期', key: 'SHANGCHUANRIQI' },
  { props: 'createByName', name: '上传人', key: 'SHANGCHUANREN' }
]

export const dateFilter = (val, format = "YYYY-MM-DD HH:mm:ss", sourceFormat) => {
  return typeof val === 'string' || typeof val === 'number' ? (val ? window.moment(val, sourceFormat).format(format) : '') : val
}