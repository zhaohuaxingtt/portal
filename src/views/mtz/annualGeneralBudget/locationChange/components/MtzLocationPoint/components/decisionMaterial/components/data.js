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
    name: '铂基价',
    key: '铂基价',
    overlap: true,
    overlapbottom: 'Pt Base Price',
    width: 70
  },
  {
    props: 'platinumDosage',
    name: '铂用量',
    key: '铂用量',
    overlap: true,
    overlapbottom: 'Pt Consumption',
    width: 70
  },

  {
    props: 'palladiumPrice',
    name: '钯基价',
    key: '钯基价',
    overlap: true,
    overlapbottom: 'Pd Base Price',
    width: 70
  },
  {
    props: 'palladiumDosage',
    name: '钯用量',
    key: '钯用量',
    overlap: true,
    overlapbottom: 'Pd Consumption',
    width: 70
  },
  {
    props: 'rhodiumPrice',
    name: '铑基价',
    key: '铑基价',
    overlap: true,
    overlapbottom: 'Kr Base Price',
    width: 70
  },
  {
    props: 'rhodiumDosage',
    name: '铑用量',
    key: '铑用量',
    overlap: true,
    overlapbottom: 'Kr Consumption',
    width: 70
  },
  {
    props: 'preciousMetalDosageUnit',
    name: '贵金属用量&基价单位',
    key: '贵金属用量&基价单位',
    overlap: true,
    overlapbottom: 'Precious Metal Consumption & Base Price Unit',
    width: 140
  },
  {
    props: 'substrateExw',
    name: '载体费用',
    key: '载体费用',
    overlap: true,
    overlapbottom: 'substrate Exw',
    width: 100
  },
  {
    props: 'substrateImpDuty',
    name: '载体税率(%)',
    key: '载体税率(%)',
    overlap: true,
    overlapbottom: 'substrate ImpDuty',
    width: 100
  },
  {
    props: 'substrateHandling',
    name: '载体管理费率(%)',
    key: '载体管理费率(%)',
    overlap: true,
    overlapbottom: 'substrate Handling',
    width: 110
  },
  {
    props: 'pgmHandling',
    name: '贵金属管理费率(%)',
    key: '贵金属管理费率(%)',
    overlap: true,
    overlapbottom: 'pgm Handling',
    width: 110
  },
  {
    props: 'manufacture',
    name: '制造费用',
    key: '制造费用',
    overlap: true,
    overlapbottom: 'manufacture',
    width: 70
  },
  {
    props: 'transport',
    name: '运输费用',
    key: '运输费用',
    overlap: true,
    overlapbottom: 'transport',
    width: 70
  },
  {
    props: 'ruleVersion',
    name: '版本',
    key: '版本',
    overlap: true,
    overlapbottom: 'version',
    width: 70
  },
]

export const ruleTableTitle1_all = [
  //决策资料规则清单暂用
  {
    props: 'ruleNo',
    name: '规则编号',
    key: 'GUIZEBIANHAO',
    overlap: true,
    overlapbottom: 'Rule No.',
    width: 70
  },
  {
    props: 'method',
    name: '规则类型',
    key: '规则类型',
    overlap: true,
    overlapbottom: 'Rule Type',
    width: 70

  },
  {
    props: 'formalFlag',
    name: '是否新规则',
    key: '是否新规则',
    overlap: true,
    width: 80,
    overlapbottom: 'New Rule'
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
    name: '供应商',
    key: 'GONGYINGSHANG',
    overlap: true,
    overlapbottom: 'Supplier',
    tooltip: true,
    minWidth: 80
  },
  {
    props: 'materialCode',
    name: '原材料',
    key: '原材料',
    overlap: true,
    overlapbottom: 'Material',
    width: 85
  },
  {
    props: 'startDate',
    name: '有效期起',
    key: 'YOUXIAOQIQI',
    overlap: true,
    overlapbottom: 'Valid From',
    width: 80
  },
  {
    props: 'endDate',
    name: '有效期止',
    key: 'YOUXIAOQIZHI',
    overlap: true,
    overlapbottom: 'Valid To',
    width: 80
  },
  {
    width: 120,
    props: 'partBalanceCountType',
    name: '零件结算数量',
    key: '零件结算数量',
    overlapbottom: 'Invoiced Part Source',
    overlap: false,
    iconTextKey: '一般供应商：SAP系统读取；特殊供应商（VWPT等）：手工上传',
    typeIcon: 'num',
    num: '1'
  },
  {
    width: 100,

    props: 'source',
    name: '市场价来源',
    key: 'SHICHANGJIALAIYUAN',
    overlapbottom: 'Market',
    overlap: false,
    iconTextKey: '贵金属：点价单非；贵金属：上海有色金属网',
    typeIcon: 'num',
    num: '2'
  },
  {
    props: 'avgPeriod',
    name: '均值计算周期',
    key: '均值计算周期',
    width: 110,
    overlap: false,
    icon: 'iconxinxitishi',
    iconTextKey: '全年原材料市场价按均值计算周期等分。例：均值计算周期为3个月时，1-3月市场价均为1-3月的市场价均值',
    // overlapbottom: 'Market'
  },
  {
    props: 'offset',
    name: '计算偏移量',
    width: 90,
    key: '计算偏移量',
    overlap: false,
    icon: 'iconxinxitishi',
    iconTextKey: '市场价取值与本月的偏移量，例：计算偏移量为-1，计算3月补差金额时取2月市场价',
    // overlapbottom: 'Market'
  },

  {
    props: 'price',
    name: '基价',
    key: 'JIJIA',
    overlapbottom: 'Base price',
    width: 60,
    overlap: false,
    iconTextKey: '与供应商约定的原材料基准价格',
    typeIcon: 'num',
    num: '3'
  },
  {
    props: 'tcCurrence',
    name: '货币',
    key: 'HUOBI',
    overlap: true,
    overlapbottom: 'Currency',
    width: 60
  },
  {
    props: 'tcExchangeRate',
    name: '汇率',
    key: 'MTZHUILV',
    overlapbottom: 'Exchange Rate',
    width: 70,
    overlap: false,
    iconTextKey: '与供应商约定的原材料基准价格',
    typeIcon: 'num',
    num: '3'
  },
  {
    props: 'priceMeasureUnit',
    name: '基价计量单位',
    key: 'JIJIAJILIANGDANWEI',
    overlap: true,
    overlapbottom: 'Base price Unit',
    width: 100
  },

  {
    props: 'threshold',
    name: '阈值',
    key: 'YUZHI',
    overlapbottom: 'Forex',
    minWidth: 60,
    overlap: false,
    iconTextKey: '当市场价>（1+阈值）*基价或市场价<(1-阈值)*基价时，自动计算出补差结果；超额补差：只补超出阈值部分；全额补差：补市场价超出基价的部分',
    typeIcon: 'num',
    num: '4'
  },
  {
    props: 'thresholdCompensationLogic',
    name: '阈值补差逻辑',
    key: 'YUZHIBUCHALUOJI',
    overlap: true,
    overlapbottom: 'Threhold',
    minWidth: 60
  },

  {
    props: 'compensationRatio',
    name: '补差系数',
    key: 'BUCHAXISHU',
    overlap: true,
    overlapbottom: 'Ratio',
    width: 80,
    overlap: false,
    iconTextKey: '补差计算中的比例系数',
    typeIcon: 'num',
    num: '6'
  },
  {
    props: 'compensationPeriod',
    name: '补差周期',
    key: '补差周期',
    overlap: true,
    overlapbottom: 'Compensation Cycle',
    width: 80
  },
  {
    props: 'platinumPrice',
    name: '铂基价',
    key: '铂基价',
    overlap: true,
    overlapbottom: 'Pt Base Price',
    width: 70
  },
  {
    props: 'platinumDosage',
    name: '铂用量',
    key: '铂用量',
    overlap: true,
    overlapbottom: 'Pt Consumption',
    width: 70
  },

  {
    props: 'palladiumPrice',
    name: '钯基价',
    key: '钯基价',
    overlap: true,
    overlapbottom: 'Pd Base Price',
    width: 70
  },
  {
    props: 'palladiumDosage',
    name: '钯用量',
    key: '钯用量',
    overlap: true,
    overlapbottom: 'Pd Consumption',
    width: 70
  },
  {
    props: 'rhodiumPrice',
    name: '铑基价',
    key: '铑基价',
    overlap: true,
    overlapbottom: 'Kr Base Price',
    width: 70
  },
  {
    props: 'rhodiumDosage',
    name: '铑用量',
    key: '铑用量',
    overlap: true,
    overlapbottom: 'Kr Consumption',
    width: 70
  },
  {
    props: 'preciousMetalDosageUnit',
    name: '贵金属用量&基价单位',
    key: '贵金属用量&基价单位',
    overlap: true,
    overlapbottom: 'Precious Metal Consumption & Base Price Unit',
    width: 140
  },
  {
    props: 'substrateExw',
    name: '载体费用',
    key: '载体费用',
    overlap: true,
    overlapbottom: 'substrate Exw',
    width: 100
  },
  {
    props: 'substrateImpDuty',
    name: '载体税率(%)',
    key: '载体税率(%)',
    overlap: true,
    overlapbottom: 'substrate ImpDuty',
    width: 100
  },
  {
    props: 'substrateHandling',
    name: '载体管理费率(%)',
    key: '载体管理费率(%)',
    overlap: true,
    overlapbottom: 'substrate Handling',
    width: 110
  },
  {
    props: 'pgmHandling',
    name: '贵金属管理费率(%)',
    key: '贵金属管理费率(%)',
    overlap: true,
    overlapbottom: 'pgm Handling',
    width: 110
  },
  {
    props: 'manufacture',
    name: '制造费用',
    key: '制造费用',
    overlap: true,
    overlapbottom: 'manufacture',
    width: 70
  },
  {
    props: 'transport',
    name: '运输费用',
    key: '运输费用',
    overlap: true,
    overlapbottom: 'transport',
    width: 70
  },
  {
    props: 'ruleVersion',
    name: '版本',
    key: '版本',
    overlap: true,
    overlapbottom: 'version',
    width: 70
  },


]
// MTZ-规则清单
export const ruleTableTitle1_1 = [
  //决策资料规则清单暂用
  {
    props: 'ruleNo',
    name: '规则编号',
    key: 'GUIZEBIANHAO',
    overlap: true,
    overlapbottom: 'Rule No.',
    width: 70
  },
  {
    props: 'method',
    name: '规则类型',
    key: '规则类型',
    overlap: true,
    overlapbottom: 'Rule Type',
    width: 70

  },
  {
    props: 'formalFlag',
    name: '是否新规则',
    key: '是否新规则',
    overlap: true,
    width: 80,
    overlapbottom: 'New Rule'
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
    name: '供应商',
    key: 'GONGYINGSHANG',
    overlap: true,
    overlapbottom: 'Supplier',
    tooltip: true,
    minWidth: 80
  },
  {
    props: 'materialCode',
    name: '原材料',
    key: '原材料',
    overlap: true,
    overlapbottom: 'Material',
    width: 85
  },
  {
    props: 'startDate',
    name: '有效期起',
    key: 'YOUXIAOQIQI',
    overlap: true,
    overlapbottom: 'Valid From',
    width: 80
  },
  {
    props: 'endDate',
    name: '有效期止',
    key: 'YOUXIAOQIZHI',
    overlap: true,
    overlapbottom: 'Valid To',
    width: 80
  },
  {
    width: 120,
    props: 'partBalanceCountType',
    name: '零件结算数量',
    key: '零件结算数量',
    overlapbottom: 'Invoiced Part Source',
    overlap: false,
    iconTextKey: '一般供应商：SAP系统读取；特殊供应商（VWPT等）：手工上传',
    typeIcon: 'num',
    num: '1'
  },
  {
    width: 100,
    props: 'source',
    name: '市场价来源',
    key: 'SHICHANGJIALAIYUAN',
    overlapbottom: 'Market',
    overlap: false,
    iconTextKey: '贵金属：点价单非；贵金属：上海有色金属网',
    typeIcon: 'num',
    num: '2'
  },
  {
    props: 'avgPeriod',
    name: '均值计算周期',
    key: '均值计算周期',
    width: 110,
    overlap: false,
    icon: 'iconxinxitishi',
    iconTextKey: '全年原材料市场价按均值计算周期等分。例：均值计算周期为3个月时，1-3月市场价均为1-3月的市场价均值',
    // overlapbottom: 'Market'
  },
  {
    props: 'offset',
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
    name: '基价',
    key: 'JIJIA',
    overlapbottom: 'Base price',
    width: 60,
    overlap: false,
    iconTextKey: '与供应商约定的原材料基准价格',
    typeIcon: 'num',
    num: '3'
  },
  {
    props: 'tcCurrence',
    name: '货币',
    key: 'HUOBI',
    overlap: true,
    overlapbottom: 'Currency',
    width: 60
  },
  {
    props: 'tcExchangeRate',
    name: '汇率',
    key: 'MTZHUILV',
    overlapbottom: 'Exchange Rate',
    width: 70,
    overlap: false,
    iconTextKey: '与供应商约定的原材料基准价格',
    typeIcon: 'num',
    num: '3'
  },
  {
    props: 'priceMeasureUnit',
    name: '基价计量单位',
    key: 'JIJIAJILIANGDANWEI',
    overlap: true,
    overlapbottom: 'Base price Unit',
    width: 100
  },

  {
    props: 'threshold',
    name: '阈值',
    key: 'YUZHI',
    overlapbottom: 'Forex',
    minWidth: 60,
    overlap: false,
    iconTextKey: '当市场价>（1+阈值）*基价或市场价<(1-阈值)*基价时，自动计算出补差结果；超额补差：只补超出阈值部分；全额补差：补市场价超出基价的部分',
    typeIcon: 'num',
    num: '4'
  },
  {
    props: 'thresholdCompensationLogic',
    name: '阈值补差逻辑',
    key: 'YUZHIBUCHALUOJI',
    overlap: true,
    overlapbottom: 'Threhold',
    minWidth: 60
  },

  {
    props: 'compensationRatio',
    name: '补差系数',
    key: 'BUCHAXISHU',
    overlap: true,
    overlapbottom: 'Ratio',
    width: 80,
    overlap: false,
    iconTextKey: '补差计算中的比例系数',
    typeIcon: 'num',
    num: '6'
  },
  {
    props: 'compensationPeriod',
    name: '补差周期',
    key: '补差周期',
    overlap: true,
    overlapbottom: 'Compensation Cycle',
    width: 80
  },

]
export const partTableTitle1_2 =[
  {
    props: 'tcExchangeRate',
    name: '汇率',
    key: '汇率',
    overlap: true,
    overlapbottom: 'Exch. Rate',
    width: 60
  },
  {
    props: 'priceMeasureUnit',
    name: '基价计量单位',
    key: 'JIJIAJILIANGDANWEI',
    overlap: true,
    overlapbottom: 'Base price Unit',
    minWidth: 110
  },
  {
    props: 'threshold',
    name: '阈值',
    key: 'YUZHI',
    overlap: true,
    overlapbottom: 'Threhold',
    minWidth: 60
  },
  {
    props: 'thresholdCompensationLogic',
    name: '阈值补差逻辑',
    key: 'YUZHIBUCHALUOJI',
    overlap: true,
    overlapbottom: 'Threhold',
    minWidth: 100
  },


  {
    props: 'compensationRatio',
    name: '补差系数',
    key: 'BUCHAXISHU',
    overlap: true,
    overlapbottom: 'Ratio',
    minWidth: 80
  },
  {
    props: 'partBalanceCountType',
    name: '零件结算数量类型',
    key: '零件结算数量类型',
    overlap: true,
    overlapbottom: 'part Balance Count Type',
    minWidth: 100
  },
  {
    props: 'priceSource',
    name: '市场价来源',
    key: 'SHICHANGJIALAIYUAN',
    overlap: true,
    overlapbottom: 'Market',
    minWidth: 90
  },
  {
    props: 'avgPeriod',
    name: '均值计算周期',
    key: '均值计算周期',
    width: 110,
    overlap: true,
    // overlapbottom: 'Market'
  },
  {
    props: 'offset',
    name: '计算偏移量',
    width: 100,
    key: '计算偏移量',
    overlap: true,
    // overlapbottom: 'Market'
  },

  {
    props: 'compensationPeriod',
    name: '补差周期',
    key: 'BUCHAZHOUQI',
    overlap: true,
    overlapbottom: 'Period',
    minWidth: 80
  },
  {
    props: 'mark',
    name: '备注',
    key: '备注',
    overlap: true,
    overlapbottom: 'remark',
    width: 70
  },
  {
    props: 'ruleVersion',
    name: '版本',
    key: '版本',
    overlap: true,
    overlapbottom: 'version',
    width: 70
  },
{
    props: 'platinumPrice',
    name: '铂基价',
    key: '铂基价',
    overlap: true,
    overlapbottom: 'Pt Base Price',
    width: 70
  },
  {
    props: 'platinumDosage',
    name: '铂用量',
    key: '铂用量',
    overlap: true,
    overlapbottom: 'Pt Consumption',
    width: 70
  },

  {
    props: 'palladiumPrice',
    name: '钯基价',
    key: '钯基价',
    overlap: true,
    overlapbottom: 'Pd Base Price',
    width: 70
  },
  {
    props: 'palladiumDosage',
    name: '钯用量',
    key: '钯用量',
    overlap: true,
    overlapbottom: 'Pd Consumption',
    width: 70
  },
  {
    props: 'rhodiumPrice',
    name: '铑基价',
    key: '铑基价',
    overlap: true,
    overlapbottom: 'Kr Base Price',
    width: 70
  },
  {
    props: 'rhodiumDosage',
    name: '铑用量',
    key: '铑用量',
    overlap: true,
    overlapbottom: 'Kr Consumption',
    width: 70
  },
  {
    props: 'preciousMetalDosageUnit',
    name: '贵金属用量&基价单位',
    key: '贵金属用量&基价单位',
    overlap: true,
    overlapbottom: 'Precious Metal Consumption & Base Price Unit',
    width: 140
  },
  {
    props: 'substrateExw',
    name: '载体费用',
    key: '载体费用',
    overlap: true,
    overlapbottom: 'substrate Exw',
    width: 100
  },
  {
    props: 'substrateImpDuty',
    name: '载体税率(%)',
    key: '载体税率(%)',
    overlap: true,
    overlapbottom: 'substrate ImpDuty',
    width: 100
  },
  {
    props: 'substrateHandling',
    name: '载体管理费率(%)',
    key: '载体管理费率(%)',
    overlap: true,
    overlapbottom: 'substrate Handling',
    width: 110
  },
  {
    props: 'pgmHandling',
    name: '贵金属管理费率(%)',
    key: '贵金属管理费率(%)',
    overlap: true,
    overlapbottom: 'pgm Handling',
    width: 110
  },
  {
    props: 'manufacture',
    name: '制造费用',
    key: '制造费用',
    overlap: true,
    overlapbottom: 'manufacture',
    width: 70
  },
  {
    props: 'transport',
    name: '运输费用',
    key: '运输费用',
    overlap: true,
    overlapbottom: 'transport',
    width: 70
  },


]
export const partTableTitle1_all = [
  {
    props: 'assemblyPartnum',
    name: '零件号',
    key: 'LINGJIANHAO',
    overlap: true,
    overlapbottom: 'Part No.',
    width: 110
  },
  {
    props: 'partName',
    name: '零件名称',
    key: 'LINGJIANMINGCHENG',
    overlap: true,
    overlapbottom: 'Part Name'
  },
  {
    props: 'sapCode',
    name: '供应商',
    key: 'GONGYINGSHANG',
    overlap: true,
    overlapbottom: 'Supplier',
    minWidth: 80
  },
  {
    props: 'partUnit',
    name: '零件数量单位',
    key: 'LINGJIANSHULIANGDANWEI',
    overlap: true,
    overlapbottom: 'Part Unit',
    minWidth: 95
  },
  {
    props: 'priceUnit',
    name: '每',
    key: 'MEI',
    overlap: true,
    overlapbottom: 'Per',
    minWidth: 30
  },


  {
    props: 'dosage',
    name: '用量',
    key: 'YONGLIANG',
    overlapbottom: 'Dosage',
    minWidth: 60,
    overlap: false,
    iconTextKey: '原材料在单位零件中的重量',
    typeIcon: 'num',
    num: '5'
  },
  {
    props: 'dosageMeasureUnit',
    name: '用量计量单位',
    key: 'YONGLIANGJILIANGDANWEI',
    overlap: true,
    overlapbottom: 'Dosage Unit',
    minWidth: 100
  },
  {
    props: 'materialDoseSource',
    name: '原材料用量来源',
    key: '原材料用量来源',
    overlapbottom: 'Raw Material Weight Source',
    minWidth: 110,
    overlap: true,

  },
  {
    props: 'startDate',
    name: '有效期起',
    key: 'YOUXIAOQIQI',
    overlap: true,
    overlapbottom: 'Valid From',
    minWidth: 80
  },
  {
    props: 'endDate',
    name: '有效期止',
    key: 'YOUXIAOQIZHI',
    overlap: true,
    overlapbottom: 'Valid To',
    minWidth: 80
  },
  {
    props: 'ruleNo',
    name: '规则编号',
    key: 'GUIZEBIANHAO',
    overlap: true,
    overlapbottom: 'Rule No.',
    minWidth: 90
  },
  {
    props: 'method',
    name: '规则类型',
    key: '规则类型',
    overlap: true,
    overlapbottom: 'Rule Type',
    minWidth: 90
  },
  {
    props: 'materialCode',
    name: '原材料',
    key: 'YUANCAILIAO',
    overlap: true,
    overlapbottom: 'Material',
    minWidth: 95
  },


  {
    props: 'price',
    name: '基价',
    key: 'JIJIA',
    overlap: true,
    overlapbottom: 'Base price',
    minWidth: 70
  },
  {
    props: 'tcCurrence',
    name: '货币',
    key: 'HUOBI',
    overlap: true,
    overlapbottom: 'Currency',
    width: 60
  },

  {
    props: 'tcExchangeRate',
    name: '汇率',
    key: '汇率',
    overlap: true,
    overlapbottom: 'Exch. Rate',
    width: 60
  },
  {
    props: 'priceMeasureUnit',
    name: '基价计量单位',
    key: 'JIJIAJILIANGDANWEI',
    overlap: true,
    overlapbottom: 'Base price Unit',
    minWidth: 110
  },
  {
    props: 'threshold',
    name: '阈值',
    key: 'YUZHI',
    overlap: true,
    overlapbottom: 'Threhold',
    minWidth: 60
  },
  {
    props: 'thresholdCompensationLogic',
    name: '阈值补差逻辑',
    key: 'YUZHIBUCHALUOJI',
    overlap: true,
    overlapbottom: 'Threhold',
    minWidth: 100
  },


  {
    props: 'compensationRatio',
    name: '补差系数',
    key: 'BUCHAXISHU',
    overlap: true,
    overlapbottom: 'Ratio',
    minWidth: 80
  },
  {
    props: 'partBalanceCountType',
    name: '零件结算数量类型',
    key: '零件结算数量类型',
    overlap: true,
    overlapbottom: 'part Balance Count Type',
    minWidth: 100
  },
  {
    props: 'priceSource',
    name: '市场价来源',
    key: 'SHICHANGJIALAIYUAN',
    overlap: true,
    overlapbottom: 'Market',
    minWidth: 90
  },
  {
    props: 'avgPeriod',
    name: '均值计算周期',
    key: '均值计算周期',
    width: 110,
    overlap: true,
    // overlapbottom: 'Market'
  },
  {
    props: 'offset',
    name: '计算偏移量',
    width: 100,
    key: '计算偏移量',
    overlap: true,
    // overlapbottom: 'Market'
  },

  {
    props: 'compensationPeriod',
    name: '补差周期',
    key: 'BUCHAZHOUQI',
    overlap: true,
    overlapbottom: 'Period',
    minWidth: 80
  },
  {
    props: 'mark',
    name: '备注',
    key: '备注',
    overlap: true,
    overlapbottom: 'remark',
    width: 70
  },
  {
    props: 'ruleVersion',
    name: '版本',
    key: '版本',
    overlap: true,
    overlapbottom: 'version',
    width: 70
  },
{
    props: 'platinumPrice',
    name: '铂基价',
    key: '铂基价',
    overlap: true,
    overlapbottom: 'Pt Base Price',
    width: 70
  },
  {
    props: 'platinumDosage',
    name: '铂用量',
    key: '铂用量',
    overlap: true,
    overlapbottom: 'Pt Consumption',
    width: 70
  },

  {
    props: 'palladiumPrice',
    name: '钯基价',
    key: '钯基价',
    overlap: true,
    overlapbottom: 'Pd Base Price',
    width: 70
  },
  {
    props: 'palladiumDosage',
    name: '钯用量',
    key: '钯用量',
    overlap: true,
    overlapbottom: 'Pd Consumption',
    width: 70
  },
  {
    props: 'rhodiumPrice',
    name: '铑基价',
    key: '铑基价',
    overlap: true,
    overlapbottom: 'Kr Base Price',
    width: 70
  },
  {
    props: 'rhodiumDosage',
    name: '铑用量',
    key: '铑用量',
    overlap: true,
    overlapbottom: 'Kr Consumption',
    width: 70
  },
  {
    props: 'preciousMetalDosageUnit',
    name: '贵金属用量&基价单位',
    key: '贵金属用量&基价单位',
    overlap: true,
    overlapbottom: 'Precious Metal Consumption & Base Price Unit',
    width: 140
  },
  {
    props: 'substrateExw',
    name: '载体费用',
    key: '载体费用',
    overlap: true,
    overlapbottom: 'substrate Exw',
    width: 100
  },
  {
    props: 'substrateImpDuty',
    name: '载体税率(%)',
    key: '载体税率(%)',
    overlap: true,
    overlapbottom: 'substrate ImpDuty',
    width: 100
  },
  {
    props: 'substrateHandling',
    name: '载体管理费率(%)',
    key: '载体管理费率(%)',
    overlap: true,
    overlapbottom: 'substrate Handling',
    width: 110
  },
  {
    props: 'pgmHandling',
    name: '贵金属管理费率(%)',
    key: '贵金属管理费率(%)',
    overlap: true,
    overlapbottom: 'pgm Handling',
    width: 110
  },
  {
    props: 'manufacture',
    name: '制造费用',
    key: '制造费用',
    overlap: true,
    overlapbottom: 'manufacture',
    width: 70
  },
  {
    props: 'transport',
    name: '运输费用',
    key: '运输费用',
    overlap: true,
    overlapbottom: 'transport',
    width: 70
  },


]
// MTZ-零件清单
export const partTableTitle1_1 = [
  {
    props: 'assemblyPartnum',
    name: '零件号',
    key: 'LINGJIANHAO',
    overlap: true,
    overlapbottom: 'Part No.',
    width: 110
  },
  {
    props: 'partName',
    name: '零件名称',
    key: 'LINGJIANMINGCHENG',
    overlap: true,
    overlapbottom: 'Part Name'
  },
  {
    props: 'sapCode',
    name: '供应商',
    key: 'GONGYINGSHANG',
    overlap: true,
    overlapbottom: 'Supplier',
    minWidth: 80
  },
  {
    props: 'partUnit',
    name: '零件数量单位',
    key: 'LINGJIANSHULIANGDANWEI',
    overlap: true,
    overlapbottom: 'Part Unit',
    minWidth: 95
  },
  {
    props: 'priceUnit',
    name: '每',
    key: 'MEI',
    overlap: true,
    overlapbottom: 'Per',
    minWidth: 30
  },


  {
    props: 'dosage',
    name: '用量',
    key: 'YONGLIANG',
    overlapbottom: 'Dosage',
    minWidth: 50,
    overlap: false,
    iconTextKey: '原材料在单位零件中的重量',
    typeIcon: 'num',
    num: '5'
  },
  {
    props: 'dosageMeasureUnit',
    name: '用量计量单位',
    key: 'YONGLIANGJILIANGDANWEI',
    overlap: true,
    overlapbottom: 'Dosage Unit',
    minWidth: 90
  },
  {
    props: 'materialDoseSource',
    name: '原材料用量来源',
    key: '原材料用量来源',
    overlapbottom: 'Raw Material Weight Source',
    minWidth: 90,
    overlap: true,

  },
  {
    props: 'startDate',
    name: '有效期起',
    key: 'YOUXIAOQIQI',
    overlap: true,
    overlapbottom: 'Valid From',
    minWidth: 75
  },
  {
    props: 'endDate',
    name: '有效期止',
    key: 'YOUXIAOQIZHI',
    overlap: true,
    overlapbottom: 'Valid To',
    minWidth: 75
  },
  {
    props: 'ruleNo',
    name: '规则编号',
    key: 'GUIZEBIANHAO',
    overlap: true,
    overlapbottom: 'Rule No.',
    minWidth: 90
  },
  {
    props: 'method',
    name: '规则类型',
    key: '规则类型',
    overlap: true,
    overlapbottom: 'Rule Type',
    minWidth: 90
  },
  {
    props: 'materialCode',
    name: '原材料',
    key: 'YUANCAILIAO',
    overlap: true,
    overlapbottom: 'Material',
    minWidth: 95
  },


  {
    props: 'price',
    name: '基价',
    key: 'JIJIA',
    overlap: true,
    overlapbottom: 'Base price',
    width: 70
  },
  {
    props: 'tcCurrence',
    name: '货币',
    key: 'HUOBI',
    overlap: true,
    overlapbottom: 'Currency',
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