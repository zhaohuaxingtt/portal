/*
 * @Author: youyuan
 * @Date: 2021-10-28 16:31:29
 * @LastEditTime: 2021-11-03 14:48:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\decisionMaterial\components\data.js
 */
// 导航
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

// MTZ-规则清单
export const ruleTableTitle1_new = [
  { props: 'ruleNo', name: '规则编号', key: 'GUIZEBIANHAO',
    overlap:true,overlapbottom:"Rule No.",
    width: 150,
  },
  {
    props: 'materialGroup',
    name: 'MTZ-材料组',
    key: 'MTZGANGCAILIAOZU',
    overlap:true,
    overlapbottom:"MTZ group",
    width: 150,
  },
  { props: 'carline', name: '车型', key: 'CHEXING',
    overlap:true,overlapbottom:"Carline",
    width: 150,
  },
  {
    props: 'supplierId',
    name: '供应商编号/简称',
    key: 'GYSBHJC',
    // width:110,
    overlap:true,
    overlapbottom:"Supplier",
    width: 150,
  },
  {
    props: 'materialCode',
    name: '原材料编号',
    key: 'YUANCAILIAOBIANHAO',
    overlap:true,
    overlapbottom:"Material Code",
    width: 150,
  },
  {
    props: 'materialName',
    name: '中类名称',
    key: 'ZHONGLEIMINGCHENG',
    overlap:true,
    overlapbottom:"Material Division",
    width: 150,
  },
  { props: 'price', name: '基价', key: 'JIJIA',
    overlap:true,
    overlapbottom:"Base price",
    width: 150,
  },







  {
    props: 'priceMeasureUnit',
    name: '基价计量单位',
    key: 'JIJIAJILIANGDANWEI',
    overlap:true,
    overlapbottom:"Base price Unit",
    width: 150,
  },
  { props: 'tcCurrence', name: '货币', key: 'HUOBI',
    overlap:true,
    overlapbottom:"Currency",
    width: 150,
  },
  { props: 'tcExchangeRate', name: '汇率', key: 'MTZHUILV',
    overlap:true,
    overlapbottom:"Exchange Rate",
    width: 150,
  },
  {
    props: 'source',
    name: '市场价来源',
    key: 'SHICHANGJIALAIYUAN',
    overlap:true,
    overlapbottom:"Market",
    width: 150,
  },
  {
    props: 'compensationPeriod',
    name: '补差周期',
    key: 'BUCHAZHOUQI',
    overlap:true,
    overlapbottom:"Period",
    width: 150,
  },
  { props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI',
    overlap:true,
    overlapbottom:"Valid From",
    width: 150,
  },
  { props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI',
    overlap:true,
    overlapbottom:"Valid To",
    width: 150,
  },
]
export const ruleTableTitle1 = [
  { props: 'ruleNo', name: '规则编号', key: 'GUIZEBIANHAO', width: 150 },
  {
    props: 'materialGroup',
    name: 'MTZ-材料组',
    key: 'MTZGANGCAILIAOZU',
    width: 150
  },
  { props: 'carline', name: '车型', key: 'CHEXING', width: 150 },
  {
    props: 'supplierId',
    name: '供应商编号',
    key: 'GONGYINGSHANGBIANHAO',
    width: 150
  },
  {
    props: 'supplierName',
    name: '供应商名称',
    key: 'GONGYINGSHANGMINGCHENG',
    width: 150
  },
  {
    props: 'materialCode',
    name: '原材料编号',
    key: 'YUANCAILIAOBIANHAO',
    width: 150
  },
  {
    props: 'materialName',
    name: '中类名称',
    key: 'ZHONGLEIMINGCHENG',
    width: 150
  },
  { props: 'price', name: '基价', key: 'JIJIA', width: 150 },
  {
    props: 'priceMeasureUnit',
    name: '基价计量单位',
    key: 'JIJIAJILIANGDANWEI',
    width: 150
  },
  { props: 'tcCurrence', name: '货币', key: 'HUOBI', width: 150 },
  { props: 'tcExchangeRate', name: '汇率', key: 'MTZHUILV', width: 150 },
  {
    props: 'source',
    name: '市场价来源',
    key: 'SHICHANGJIALAIYUAN',
    width: 150
  },
  {
    props: 'compensationRatio',
    name: '补差系数',
    key: 'BUCHAXISHU',
    width: 150
  },
  {
    props: 'compensationPeriod',
    name: '补差周期',
    key: 'BUCHAZHOUQI',
    width: 150
  },
  { props: 'threshold', name: '阈值', key: 'YUZHI', width: 150 },
  {
    props: 'thresholdCompensationLogic',
    name: '阈值补差逻辑',
    key: 'YUZHIBUCHALUOJI',
    width: 150
  },
  { props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI', width: 150 },
  { props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI', width: 150 },

  { props: 'platinumPrice', name: '铂基价', key: 'BOJIJIA', width: 150,icon:"iconxinxitishi",iconTextKey:"M01006002-Pt",iconText:"M01006002-Pt" },
  { props: 'platinumDosage', name: '铂用量', key: 'BOYONGLIANG', width: 150,icon:"iconxinxitishi",iconTextKey:"M01006002-Pt",iconText:"M01006002-Pt"},
  { props: 'palladiumPrice', name: '钯基价', key: 'BAJIJIA', width: 150,icon:"iconxinxitishi",iconTextKey:"M01006001-Pd",iconText:"M01006001-Pd" },
  { props: 'palladiumDosage', name: '钯用量', key: 'BAYONGLIANG', width: 150,icon:"iconxinxitishi",iconTextKey:"M01006002-Pd",iconText:"M01006001-Pd" },
  { props: 'rhodiumPrice', name: '铑基价', key: 'LAOJIJIA', width: 150,icon:"iconxinxitishi",iconTextKey:"M01006002-Rh",iconText:"M01006002-Rh" },
  { props: 'rhodiumDosage', name: '铑用量', key: 'LAOYONGLIANG', width: 150,icon:"iconxinxitishi",iconTextKey:"M01006002-Rh",iconText:"M01006002-Rh" },
  { props: 'preciousMetalDosageUnit', name: '贵金属用量&基价单位', key: 'GUIJINSHUYONGLIANGJIJIADANWEI', width: 180 },
]
export const ruleTableTitle1_1 = [//决策资料规则清单暂用
  { props: 'ruleNo', name: '规则编号', key: 'GUIZEBIANHAO',
    overlap:true,overlapbottom:"Rule No.",
    minWidth:102
  },
  {
    props: 'materialGroup',
    name: 'MTZ-材料组',
    key: 'MTZGANGCAILIAOZU',
    overlap:true,
    overlapbottom:"MTZ group",
    width:75
  },
  { props: 'carline', name: '车型', key: 'CHEXING',overlap:true,overlapbottom:"Carline",
    width:50,
  },
  {
    props: 'supplierId',
    name: '供应商',
    key: 'GONGYINGSHANG',
    overlap:true,
    overlapbottom:"Supplier",
    minWidth:80,
  },
  {
    props: 'materialCode',
    name: '原材料编号',
    key: 'YUANCAILIAOBIANHAO',
    overlap:true,
    overlapbottom:"Material Code",
    width:90,
  },
  {
    props: 'materialName',
    name: '中类名称',
    key: 'ZHONGLEIMINGCHENG',
    overlap:true,
    overlapbottom:"Material Division",
    minWidth:105,
  },
  { props: 'price', name: '基价', key: 'JIJIA',
    overlap:true,
    overlapbottom:"Base price",
    width:70,
  },







  {
    props: 'priceMeasureUnit',
    name: '基价计量单位',
    key: 'JIJIAJILIANGDANWEI',
    overlap:true,
    overlapbottom:"Base price Unit",
    width:100,
  },
  { props: 'tcCurrence', name: '货币', key: 'HUOBI',
    overlap:true,
    overlapbottom:"Currency",
    width:70,
  },
  { props: 'tcExchangeRate', name: '汇率', key: 'MTZHUILV',
    overlap:true,
    overlapbottom:"Exchange Rate",
    width:90,
  },
  {
    props: 'source',
    name: '市场价来源',
    key: 'SHICHANGJIALAIYUAN',
    overlap:true,
    overlapbottom:"Market",
    width:95,
  },
  {
    props: 'compensationPeriod',
    name: '补差周期',
    key: 'BUCHAZHOUQI',
    overlap:true,
    overlapbottom:"Period",
    width:80,
  },
  { props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI',
    overlap:true,
    overlapbottom:"Valid From",
    width:90,
  },
  { props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI',
    overlap:true,
    overlapbottom:"Valid To",
    width:90,
  },
]
export const ruleTableTitle1_2 = [
  { props: 'ruleNo', name: '规则编号', key: 'GUIZEBIANHAO',width:150,
    overlap:true,
    overlapbottom:"Rule No."
  },
  {
    props: 'priceMeasureUnit',
    name: '基价计量单位',
    key: 'JIJIAJILIANGDANWEI',
    overlap:true,
    overlapbottom:"Base price Unit"
  },
  { props: 'tcCurrence', name: '货币', key: 'HUOBI',
    overlap:true,
    overlapbottom:"Currency"
  },
  { props: 'tcExchangeRate', name: '汇率', key: 'MTZHUILV',
    overlap:true,
    overlapbottom:"Exchange Rate"
  },
  {
    props: 'source',
    name: '市场价来源',
    key: 'SHICHANGJIALAIYUAN',
    overlap:true,
    overlapbottom:"Market"
  },
  {
    props: 'compensationPeriod',
    name: '补差周期',
    key: 'BUCHAZHOUQI',
    overlap:true,
    overlapbottom:"Period"
  },
  { props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI',
    overlap:true,
    overlapbottom:"Valid From"
  },
  { props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI',
    overlap:true,
    overlapbottom:"Valid To"
  },
  // {
  //   props: 'supplierName',
  //   name: '供应商名称',
  //   key: 'GONGYINGSHANGMINGCHENG',
  // },
  // {
  //   props: 'compensationRatio',
  //   name: '补差系数',
  //   key: 'BUCHAXISHU',
  // },
  // { props: 'threshold', name: '阈值', key: 'YUZHI'},
  // {
  //   props: 'thresholdCompensationLogic',
  //   name: '阈值补差逻辑',
  //   key: 'YUZHIBUCHALUOJI',
  //   width:120
  // },
  // { props: 'platinumPrice', name: '铂基价', key: 'BOJIJIA'},
  // { props: 'platinumDosage', name: '铂用量', key: 'BOYONGLIANG'},
  // { props: 'palladiumPrice', name: '钯基价', key: 'BAJIJIA'},
  // { props: 'palladiumDosage', name: '钯用量', key: 'BAYONGLIANG'},
  // { props: 'rhodiumPrice', name: '铑基价', key: 'LAOJIJIA'},
  // { props: 'rhodiumDosage', name: '铑用量', key: 'LAOYONGLIANG'},
  // { props: 'preciousMetalDosageUnit', name: '贵金属用量&基价单位', key: 'GUIJINSHUYONGLIANGJIJIADANWEI', width: 180 },
]

export const ruleTableTitle2_1 = [
  { props: 'ruleNo', name: '规则编号', key: 'GUIZEBIANHAO',width:150 },
  {
    props: 'materialGroup',
    name: 'MTZ-材料组',
    key: 'MTZGANGCAILIAOZU',
  },
  { props: 'carline', name: '车型', key: 'CHEXING' },
  {
    props: 'supplierId',
    name: '供应商编号/名称',
    key: 'GYSBHMC',
  },
  {
    props: 'supplierName',
    name: '供应商名称',
    key: 'GONGYINGSHANGMINGCHENG',
  },
  {
    props: 'materialCode',
    name: '原材料编号',
    key: 'YUANCAILIAOBIANHAO',
  },
  {
    props: 'materialName',
    name: '中类名称',
    key: 'ZHONGLEIMINGCHENG',
  },
  { props: 'price', name: '基价', key: 'JIJIA'},
  {
    props: 'priceMeasureUnit',
    name: '基价计量单位',
    key: 'JIJIAJILIANGDANWEI',
    width:120
  },
]
export const ruleTableTitle2_2 = [
  { props: 'tcCurrence', name: '货币', key: 'HUOBI'},
  { props: 'tcExchangeRate', name: '汇率', key: 'MTZHUILV'},
  {
    props: 'source',
    name: '市场价来源',
    key: 'SHICHANGJIALAIYUAN',
  },
  {
    props: 'compensationRatio',
    name: '补差系数',
    key: 'BUCHAXISHU',
  },
  { props: 'ruleNo', name: '规则编号', key: 'GUIZEBIANHAO',width:150 },
  
  {
    props: 'compensationPeriod',
    name: '补差周期',
    key: 'BUCHAZHOUQI',
  },
  { props: 'threshold', name: '阈值', key: 'YUZHI'},
  {
    props: 'thresholdCompensationLogic',
    name: '阈值补差逻辑',
    key: 'YUZHIBUCHALUOJI',
    width:120
  },
  { props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI',width:120 },
  { props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI',width:120},
  // { props: 'platinumPrice', name: '铂基价', key: 'BOJIJIA'},
  // { props: 'platinumDosage', name: '铂用量', key: 'BOYONGLIANG'},
  // { props: 'palladiumPrice', name: '钯基价', key: 'BAJIJIA'},
  // { props: 'palladiumDosage', name: '钯用量', key: 'BAYONGLIANG'},
  // { props: 'rhodiumPrice', name: '铑基价', key: 'LAOJIJIA'},
  // { props: 'rhodiumDosage', name: '铑用量', key: 'LAOYONGLIANG'},
  // { props: 'preciousMetalDosageUnit', name: '贵金属用量&基价单位', key: 'GUIJINSHUYONGLIANGJIJIADANWEI', width: 160 },
]


// MTZ-零件清单
export const partTableTitle1_new = [
  { props: 'assemblyPartnum', name: '零件号', key: 'LINGJIANHAO',
    width: 105,
    overlap:true,
    overlapbottom:"Part No."
  },
  { props: 'partName', name: '零件名称', key: 'LINGJIANMINGCHENG',
    width: 150,
    overlap:true,
    overlapbottom:"Part Name"
  },
  { props: 'ruleNo', name: '规则编号', key: 'GUIZEBIANHAO',
    overlap:true,
    overlapbottom:"Rule No.",
    width: 150,
  },
  {
    props: 'materialCode',
    name: '原材料编号',
    key: 'YUANCAILIAOBIANHAO',
    overlap:true,
    overlapbottom:"Material Code",
    width: 150,
  },
  { props: 'materialName', name: '原材料', key: 'YUANCAILIAO',
    overlap:true,
    overlapbottom:"Material ",
    width: 150,
  },
  { props: 'supplierId', name: '供应商编号/简称', key: 'GYSBHJC',
    // width:200,
    overlap:true,
    overlapbottom:"Supplier",
    width: 150,
  },
  { props: 'price', name: '基价', key: 'JIJIA',
    overlap:true,
    overlapbottom:"Base price",
    width: 150,
  },
  {
    props: 'priceMeasureUnit',
    name: '基价计量单位',
    key: 'JIJIAJILIANGDANWEI',
    overlap:true,
    overlapbottom:"Base price Unit",
    width: 150,
  },
  { props: 'priceUnit', name: '每', key: 'MEI',
    overlap:true,
    overlapbottom:"Per",
    width: 150,
  },









  {
    props: 'partUnit',
    name: '零件数量单位',
    key: 'LINGJIANSHULIANGDANWEI',
    overlap:true,
    overlapbottom:"Part Unit",
    width: 150,
  },
  { props: 'dosage', name: '用量', key: 'YONGLIANG',
    overlap:true,
    overlapbottom:"Dosage",
    width: 150,
  },
  {
    props: 'dosageMeasureUnit',
    name: '用量计量单位',
    key: 'YONGLIANGJILIANGDANWEI',
    overlap:true,
    overlapbottom:"Dosage Unit",
    width: 150,
  },
  {
    props: 'priceSource',
    name: '市场价来源',
    key: 'SHICHANGJIALAIYUAN',
    overlap:true,
    overlapbottom:"Market",
    width: 150,
  },
  {
    props: 'compensationRatio',
    name: '补差系数',
    key: 'BUCHAXISHU',
    overlap:true,
    overlapbottom:"Ratio",
    width: 150,
  },
  { props: 'threshold', name: '阈值', key: 'YUZHI',
    overlap:true,
    overlapbottom:"Threhold",
    width: 150,
  },
  {
    props: 'compensationPeriod',
    name: '补差周期',
    key: 'BUCHAZHOUQI',
    overlap:true,
    overlapbottom:"Period",
    width: 150,
  },
  { props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI',
    overlap:true,
    overlapbottom:"Valid From",
    width: 150,
  },
  { props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI',
    overlap:true,
    overlapbottom:"Valid To",
    width: 150,
  },
]
export const partTableTitle1 = [
  { props: 'assemblyPartnum', name: '零件号', key: 'LINGJIANHAO', width: 150 },
  { props: 'partName', name: '零件名称', key: 'LINGJIANMINGCHENG', width: 150 },
  { props: 'supplierId', name: '供应商编号/名称', key: 'GYSBHMC', width: 150,tooltip: true },
  { props: 'ruleNo', name: '规则编号', key: 'GUIZEBIANHAO', width: 150 },
  { props: 'priceUnit', name: '每', key: 'MEI', width: 150 },
  {
    props: 'partUnit',
    name: '零件数量单位',
    key: 'LINGJIANSHULIANGDANWEI',
    width: 150
  },
  { props: 'dosage', name: '用量', key: 'YONGLIANG', width: 150 },
  {
    props: 'dosageMeasureUnit',
    name: '用量计量单位',
    key: 'YONGLIANGJILIANGDANWEI',
    width: 150
  },
  { props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI', width: 150 },
  { props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI', width: 150 },
  { props: 'mark', name: '备注', key: 'BEIZHU', width: 150 },
  {
    props: 'materialCode',
    name: '原材料编号',
    key: 'YUANCAILIAOBIANHAO',
    width: 150
  },
  { props: 'materialName', name: '原材料', key: 'YUANCAILIAO', width: 150 },
  { props: 'price', name: '基价', key: 'JIJIA', width: 150 },
  {
    props: 'priceMeasureUnit',
    name: '基价计量单位',
    key: 'JIJIAJILIANGDANWEI',
    width: 150
  },
  {
    props: 'priceSource',
    name: '市场价来源',
    key: 'SHICHANGJIALAIYUAN',
    width: 150
  },
  { props: 'tcCurrence', name: '货币', key: 'HUOBI', width: 150 },
  { props: 'tcExchangeRate', name: '汇率', key: 'MTZHUILV', width: 150 },
  {
    props: 'compensationPeriod',
    name: '补差周期',
    key: 'BUCHAZHOUQI',
    width: 150
  },
  {
    props: 'compensationRatio',
    name: '补差系数',
    key: 'BUCHAXISHU',
    width: 150
  },
  { props: 'threshold', name: '阈值', key: 'YUZHI', width: 150 },
  {
    props: 'thresholdCompensationLogic',
    name: '阈值补差逻辑',
    key: 'YUZHIBUCHALUOJI',
    width: 150
  },

  { props: 'platinumPrice', name: '铂基价', key: 'BOJIJIA', width: 150,icon:"iconxinxitishi",iconTextKey:"M01006002-Pt",iconText:"M01006002-Pt" },
  { props: 'platinumDosage', name: '铂用量', key: 'BOYONGLIANG', width: 150,icon:"iconxinxitishi",iconTextKey:"M01006002-Pt",iconText:"M01006002-Pt"},
  { props: 'palladiumPrice', name: '钯基价', key: 'BAJIJIA', width: 150,icon:"iconxinxitishi",iconTextKey:"M01006002-Pd",iconText:"M01006001-Pd" },
  { props: 'palladiumDosage', name: '钯用量', key: 'BAYONGLIANG', width: 150,icon:"iconxinxitishi",iconTextKey:"M01006002-Pd",iconText:"M01006001-Pd" },
  { props: 'rhodiumPrice', name: '铑基价', key: 'LAOJIJIA', width: 150,icon:"iconxinxitishi",iconTextKey:"M01006002-Rh",iconText:"M01006002-Rh" },
  { props: 'rhodiumDosage', name: '铑用量', key: 'LAOYONGLIANG', width: 150,icon:"iconxinxitishi",iconTextKey:"M01006002-Rh",iconText:"M01006002-Rh" },
  { props: 'preciousMetalDosageUnit', name: '贵金属用量&基价单位', key: 'GUIJINSHUYONGLIANGJIJIADANWEI', width: 180 },
]
export const partTableTitle1_1 = [
  { props: 'assemblyPartnum', name: '零件号', key: 'LINGJIANHAO',
    overlap:true,
    overlapbottom:"Part No.",
    minWidth: 90,
  },
  { props: 'partName', name: '零件名称', key: 'LINGJIANMINGCHENG',
    overlap:true,
    overlapbottom:"Part Name",
    width: 65,
  },
  { props: 'ruleNo', name: '规则编号', key: 'GUIZEBIANHAO',
    overlap:true,
    overlapbottom:"Rule No.",
    width: 90,
  },
  {
    props: 'materialCode',
    name: '原材料编号',
    key: 'YUANCAILIAOBIANHAO',
    overlap:true,
    overlapbottom:"Material Code",
    width: 80,
  },
  { props: 'materialName', name: '原材料', key: 'YUANCAILIAO',
    overlap:true,
    overlapbottom:"Material",
    minWidth: 60,
  },
  { props: 'supplierId', name: '供应商', key: 'GONGYINGSHANG',
    overlap:true,
    overlapbottom:"Supplier",
    minWidth: 80,
  },
  { props: 'price', name: '基价', key: 'JIJIA',
    overlap:true,
    overlapbottom:"Base price",
    width: 60,
  },
  {
    props: 'priceMeasureUnit',
    name: '基价计量单位',
    key: 'JIJIAJILIANGDANWEI',
    overlap:true,
    overlapbottom:"Base price Unit",
    width: 100,
  },
  { props: 'priceUnit', name: '每', key: 'MEI',
    overlap:true,
    overlapbottom:"Per",
    width: 30,
  },









  {
    props: 'partUnit',
    name: '零件数量单位',
    key: 'LINGJIANSHULIANGDANWEI',
    overlap:true,
    overlapbottom:"Part Unit",
    width: 80,
  },
  { props: 'dosage', name: '用量', key: 'YONGLIANG',
    overlap:true,
    overlapbottom:"Dosage",
    width: 45,
  },
  {
    props: 'dosageMeasureUnit',
    name: '用量计量单位',
    key: 'YONGLIANGJILIANGDANWEI',
    overlap:true,
    overlapbottom:"Dosage Unit",
    width: 80,
  },
  {
    props: 'priceSource',
    name: '市场价来源',
    key: 'SHICHANGJIALAIYUAN',
    overlap:true,
    overlapbottom:"Market",
    minWidth: 75,
  },
  {
    props: 'compensationRatio',
    name: '补差系数',
    key: 'BUCHAXISHU',
    overlap:true,
    overlapbottom:"Ratio",
    width: 50,
  },
  { props: 'threshold', name: '阈值', key: 'YUZHI',
    overlap:true,
    overlapbottom:"Threhold",
    width: 55,
  },
  {
    props: 'compensationPeriod',
    name: '补差周期',
    key: 'BUCHAZHOUQI',
    overlap:true,
    overlapbottom:"Period",
    width: 60,
  },
  { props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI',
    overlap:true,
    overlapbottom:"Valid From",
    width: 75,
  },
  { props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI',
    overlap:true,
    overlapbottom:"Valid To",
    width: 75,
  },
]
export const partTableTitle1_2 = [
  { props: 'assemblyPartnum', name: '零件号', key: 'LINGJIANHAO',
    width:150,
    overlap:true,
    overlapbottom:"Part No."
  },
  {
    props: 'partUnit',
    name: '零件数量单位',
    key: 'LINGJIANSHULIANGDANWEI',
    overlap:true,
    overlapbottom:"Part Unit"
  },
  { props: 'dosage', name: '用量', key: 'YONGLIANG',
    overlap:true,
    overlapbottom:"Dosage"
  },
  {
    props: 'dosageMeasureUnit',
    name: '用量计量单位',
    key: 'YONGLIANGJILIANGDANWEI',
    overlap:true,
    overlapbottom:"Dosage Unit"
  },
  {
    props: 'priceSource',
    name: '市场价来源',
    key: 'SHICHANGJIALAIYUAN',
    overlap:true,
    overlapbottom:"Market"
  },
  {
    props: 'compensationRatio',
    name: '补差系数',
    key: 'BUCHAXISHU',
    overlap:true,
    overlapbottom:"Ratio"
  },
  { props: 'threshold', name: '阈值', key: 'YUZHI',
    overlap:true,
    overlapbottom:"Threhold"
  },
  {
    props: 'compensationPeriod',
    name: '补差周期',
    key: 'BUCHAZHOUQI',
    overlap:true,
    overlapbottom:"Period"
  },
  { props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI',
    overlap:true,
    overlapbottom:"Valid From"
  },
  { props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI',
    overlap:true,
    overlapbottom:"Valid To"
  },
]
// export const partTableTitle1_3 = [
//   // { props: 'assemblyPartnum', name: '零件号', key: 'LINGJIANHAO',width:150},
//   // { props: 'tcCurrence', name: '货币', key: 'HUOBI',},
//   // { props: 'tcExchangeRate', name: '汇率', key: 'MTZHUILV'},
//   // { props: 'mark', name: '备注', key: 'BEIZHU',width:180},
//   // {
//   //   props: 'thresholdCompensationLogic',
//   //   name: '阈值补差逻辑',
//   //   key: 'YUZHIBUCHALUOJI',
//   // },
//   // { props: 'platinumPrice', name: '铂基价', key: 'BOJIJIA'},
//   // { props: 'platinumDosage', name: '铂用量', key: 'BOYONGLIANG'},
//   // { props: 'palladiumPrice', name: '钯基价', key: 'BAJIJIA'},
//   // { props: 'palladiumDosage', name: '钯用量', key: 'BAYONGLIANG'},
//   // { props: 'rhodiumPrice', name: '铑基价', key: 'LAOJIJIA'},
//   // { props: 'rhodiumDosage', name: '铑用量', key: 'LAOYONGLIANG'},
//   // { props: 'preciousMetalDosageUnit', name: '贵金属用量&基价单位', key: 'GUIJINSHUYONGLIANGJIJIADANWEI', width: 180 },
// ]

export const partTableTitle2_1 = [
  { props: 'assemblyPartnum', name: '零件号', key: 'LINGJIANHAO', width: 150 },
  { props: 'partName', name: '零件名称', key: 'LINGJIANMINGCHENG'},
  { props: 'supplierId', name: '供应商编号/名称', key: 'GYSBHMC',width:160},
  { props: 'ruleNo', name: '规则编号', key: 'GUIZEBIANHAO' },
  { props: 'priceUnit', name: '每', key: 'MEI',width:80},
  {
    props: 'partUnit',
    name: '零件数量单位',
    key: 'LINGJIANSHULIANGDANWEI',
  },
  { props: 'dosage', name: '用量', key: 'YONGLIANG' },
  {
    props: 'dosageMeasureUnit',
    name: '用量计量单位',
    key: 'YONGLIANGJILIANGDANWEI',
  },
  { props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI'},
  { props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI'},
  { props: 'mark', name: '备注', key: 'BEIZHU',width:160},
]
export const partTableTitle2_2 = [
  { props: 'assemblyPartnum', name: '零件号', key: 'LINGJIANHAO',width:150},
  {
    props: 'materialCode',
    name: '原材料编号',
    key: 'YUANCAILIAOBIANHAO',
  },
  { props: 'materialName', name: '原材料', key: 'YUANCAILIAO'},
  { props: 'price', name: '基价', key: 'JIJIA'},
  {
    props: 'priceMeasureUnit',
    name: '基价计量单位',
    key: 'JIJIAJILIANGDANWEI',
  },
  {
    props: 'priceSource',
    name: '市场价来源',
    key: 'SHICHANGJIALAIYUAN',
  },
  { props: 'tcCurrence', name: '货币', key: 'HUOBI',},
  { props: 'tcExchangeRate', name: '汇率', key: 'MTZHUILV'},
  {
    props: 'compensationPeriod',
    name: '补差周期',
    key: 'BUCHAZHOUQI',
  },
  {
    props: 'compensationRatio',
    name: '补差系数',
    key: 'BUCHAXISHU',
  },
  { props: 'threshold', name: '阈值', key: 'YUZHI',},
  {
    props: 'thresholdCompensationLogic',
    name: '阈值补差逻辑',
    key: 'YUZHIBUCHALUOJI',
  },
]

// 附件上传
export const uploadTableTitle = [
  { props: 'fileName', name: '文件名', key: 'WENJIANMING' },
  { props: 'createDate', name: '上传日期', key: 'SHANGCHUANRIQI' },
  { props: 'createByName', name: '上传人', key: 'SHANGCHUANREN' }
]
