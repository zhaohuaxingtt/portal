/*
 * @Author: zbin
 * @Date: 2021-05-21 10:39:35
 * @Descripttion: your project
 */
export const tableTitle = [
  { props: 'dataCategory', name: '数据类别', key: 'SPR_FRM_XGYSPJ_SSLB', },
  {
    props: 'dataValue', name: '数据值', key: 'SPR_FRM_XGYSPJ_SJZ', width: 120,
    rule: [{
      pattern: /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,9})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/,
      message: '请输入正确的格式',
      trigger: 'blur'
    }],
  },
  { props: 'calculateValue', name: '计算值', key: 'SPR_FRM_XGYSPJ_JSZ', },
  { props: 'description', name: '说明', key: 'SPR_FRM_XGYSPJ_SM', },
]
// 股东信息
export const shareholderInformationTitle = [
  { props: 'name', name: '股东名称', key: 'SPR_FRM_XGYSPJ_GDMC' },
  { props: 'nation	', name: '国家/地区', key: 'SPR_FRM_XGYSPJ_GJDQ' },
  { props: 'shareholderContribution', name: '出资额', key: 'SPR_FRM_XGYSPJ_CZE' },
  { props: 'currency', name: '币种', key: 'SPR_FRM_XGYSPJ_BZ' },
  { props: 'proportion', name: '持股比例（%）', key: 'SPR_FRM_XGYSPJ_CGBL', width: 130 },
  { props: 'mainBusiness', name: '主营业务', key: 'SPR_FRM_XGYSPJ_ZYYW' },
  { props: 'industryBelongs', name: '行业归属', key: 'HANGYEGUISHU' },
  { props: 'principal', name: '负责人', key: 'LK_FUZEREN' },
  { props: 'shareholderSupport', name: '股东对公司的支持情况', key: 'SPR_FRM_XGYSPJ_GDDGSDZCQK', width: 150 },
  { props: 'idNum', name: '股东证照/证件号码', key: 'SPR_FRM_XGYSPJ_GDZZZJHM', width: 150 },
  { props: 'investorType', name: '股东类型', key: 'SPR_FRM_XGYSPJ_DGLX' },
]
export const financialOverviewTitle = [
  { props: 'beforeFilling', name: '填补前（元）', key: 'SPR_FRM_XGYSPJ_TBQ' },
  { props: 'firstValue', name: '', },
  { props: 'secondValue', name: '', },
  { props: 'thirdValue', name: '', },
  { props: 'description', name: '说明', key: 'SPR_FRM_XGYSPJ_SM' },
]
export const pkpiTitle1 = [
  { props: 'scoreIndex', name: '指标', key: 'SPR_FRM_XGYSPJ_ZB' },
  { props: 'value', name: '计算值', key: 'SPR_FRM_XGYSPJ_JSZ' },
  { props: 'score', name: '得分', key: 'SPR_FRM_XGYSPJ_DF' },
  { props: 'weight', name: '权重', key: 'SPR_FRM_XGYSPJ_QZ' },
  { props: 'result', name: '得分*权重', key: 'SPR_FRM_XGYSPJ_DFQZ' },
  { props: 'tips', name: '风险关注点提示', key: 'SPR_FRM_XGYSPJ_FXGZTS' },
]
export const pkpiTitle2 = [
  { props: 'scoreIndex', name: '指标', key: 'SPR_FRM_XGYSPJ_ZB', tooltip: true },
  {
    props: 'description', name: '说明', key: 'SPR_FRM_XGYSPJ_SM', icon: 'iconxinxitishi',
  },
  {
    props: 'result', name: '得分', key: 'SPR_FRM_XGYSPJ_DF',
    rule: [{
      pattern: /^-?(0|\d+)(\.(\d){0,2})?$/,
      message: '请输入正确数值，并且保留两位小数',
      trigger: 'change'
    }],
  },
  { props: 'tips', name: '预警：文字说明', key: 'SPR_FRM_XGYSPJ_YJWZSM', tooltip: true },
]
export const pkpiTitle3 = [
  { props: 'preAdjustedScore', name: '调整前分数', key: 'SPR_FRM_XGYSPJ_TZQFS' },
  { props: 'preAdjustedLevel', name: '调整前级别', key: 'SPR_FRM_XGYSPJ_TZQJB' },
  { props: 'specialMinus', name: '特殊加减分', key: 'SPR_FRM_XGYSPJ_TSJJF' },
  { props: 'afterAdjustedScore', name: '调整后分数', key: 'SPR_FRM_XGYSPJ_TZHFS' },
  { props: 'afterAdjustedLevel', name: '调整后级别', key: 'SPR_FRM_XGYSPJ_TZHJB' },
  { props: 'ratingResult', name: '是否通过评估', key: 'SPR_FRM_XGYSPJ_SFTGPG' },
]
export const riskEarlyWarningTitle = [
  { props: 'warningIndex', name: '预警指标', key: 'SPR_FRM_XGYSPJ_YJZB' },
  { props: 'warningFormula', name: '指标公式', key: 'SPR_FRM_XGYSPJ_ZBGS' },
  { props: 'result', name: '结果', key: 'SPR_FRM_XGYSPJ_JG' },
  { props: 'warningScope', name: '预警范围', key: 'SPR_FRM_XGYSPJ_YJFW' },
  { props: 'isWarning', name: '是否预警', key: 'SPR_FRM_XGYSPJ_SFYJ' },
  { props: 'warningTips', name: '预警提示', key: 'SPR_FRM_XGYSPJ_YJTS' },
]
export const getFinancialOverviewTitle = (data) => {
  financialOverviewTitle.map(item => {
    if (item.props === 'firstValue') {
      return item.name = data[0]
    } else if (item.props === 'secondValue') {
      return item.name = data[1]
    } else if (item.props === 'thirdValue') {
      return item.name = data[2]
    }
  })
}
