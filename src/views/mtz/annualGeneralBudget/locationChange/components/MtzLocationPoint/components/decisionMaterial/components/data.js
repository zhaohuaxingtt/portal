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
    key: 'LINIEXIAOXIE',
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
  { props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI', width: 150 }
]
export const ruleTableTitle2 = [
  { props: 'ruleNo', name: '规则编号', key: 'GUIZEBIANHAO', width: 60 },
  { props: 'materialGroup', name: 'MTZ-材料组', key: 'MTZGANGCAILIAOZU' },
  { props: 'carline', name: '车型', key: 'CHEXING', width: 40 },
  { props: 'supplierId', name: '供应商编号', key: 'GONGYINGSHANGBIANHAO' },
  { props: 'supplierName', name: '供应商名称', key: 'GONGYINGSHANGMINGCHENG' },
  { props: 'materialCode', name: '原材料编号', key: 'YUANCAILIAOBIANHAO' },
  { props: 'materialName', name: '中类名称', key: 'ZHONGLEIMINGCHENG' },
  { props: 'price', name: '基价', key: 'JIJIA', width: 50 },
  {
    props: 'priceMeasureUnit',
    name: '基价计量单位',
    key: 'JIJIAJILIANGDANWEI',
    width: 90
  },
  { props: 'tcCurrence', name: '货币', key: 'HUOBI', width: 40 },
  { props: 'tcExchangeRate', name: '汇率', key: 'MTZHUILV', width: 50 },
  { props: 'source', name: '市场价来源', key: 'SHICHANGJIALAIYUAN' },
  {
    props: 'compensationRatio',
    name: '补差系数',
    key: 'BUCHAXISHU',
    width: 60
  },
  {
    props: 'compensationPeriod',
    name: '补差周期',
    key: 'BUCHAZHOUQI',
    width: 60
  },
  { props: 'threshold', name: '阈值', key: 'YUZHI', width: 40 },
  {
    props: 'thresholdCompensationLogic',
    name: '阈值补差逻辑',
    key: 'YUZHIBUCHALUOJI',
    width: 90
  },
  { props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI', width: 60 },
  { props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI' }
]
// export const ruleTableTitle3 = [
//   {props: 'ruleNo', name: '规则编号', key: 'GUIZEBIANHAO'},
//   {props: 'materialGroup', name: 'MTZ-材料组', key: 'MTZGANGCAILIAOZU'},
//   {props: 'carline', name: '车型', key: 'CHEXING'},
//   {props: 'supplierId', name: '供应商编号', key: 'GONGYINGSHANGBIANHAO'},
//   {props: 'supplierName', name: '供应商名称', key: 'GONGYINGSHANGMINGCHENG'},
//   {props: 'materialCode', name: '原材料编号', key: 'YUANCAILIAOBIANHAO'},
//   {props: 'materialName', name: '中类名称', key: 'ZHONGLEIMINGCHENG'},
//   {props: 'price', name: '基价', key: 'JIJIA'},
//   {props: 'priceMeasureUnit', name: '基价计量单位', key: 'JIJIAJILIANGDANWEI'},

// ]
// export const ruleTableTitle4 = [

//   {props: 'tcCurrence', name: '货币', key: 'HUOBI'},
//   {props: 'tcExchangeRate', name: '汇率', key: 'MTZHUILV'},
//   {props: 'source', name: '市场价来源', key: 'SHICHANGJIALAIYUAN'},
//   {props: 'compensationRatio', name: '补差系数', key: 'BUCHAXISHU',},
//   {props: 'compensationPeriod', name: '补差周期', key: 'BUCHAZHOUQI'},
//   {props: 'threshold', name: '阈值', key: 'YUZHI'},
//   {props: 'thresholdCompensationLogic', name: '阈值补差逻辑', key: 'YUZHIBUCHALUOJI'},
//   {props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI'},
//   {props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI'},
// ]
// MTZ-零件清单
export const partTableTitle1 = [
  { props: 'assemblyPartnum', name: '零件号', key: 'LINGJIANHAO', width: 150 },
  { props: 'partName', name: '零件名称', key: 'LINGJIANMINGCHENG', width: 150 },
  { props: 'sapCode', name: '供应商编号/名称', key: 'GYSBHMC', width: 150 },
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
  }
]
export const partTableTitle2 = [
  { props: 'assemblyPartnum', name: '零件号', key: 'LINGJIANHAO', width: 45 },
  { props: 'partName', name: '零件名称', key: 'LINGJIANMINGCHENG', width: 62 },
  { props: 'sapCode', name: '供应商编号/名称', key: 'GYSBHMC', width: 100 },
  { props: 'ruleNo', name: '规则编号', key: 'GUIZEBIANHAO', width: 58 },
  { props: 'priceUnit', name: '每', key: 'MEI', width: 20 },
  {
    props: 'partUnit',
    name: '零件数量单位',
    key: 'LINGJIANSHULIANGDANWEI',
    width: 85
  },
  { props: 'dosage', name: '用量', key: 'YONGLIANG', width: 35 },
  {
    props: 'dosageMeasureUnit',
    name: '用量计量单位',
    key: 'YONGLIANGJILIANGDANWEI',
    width: 65
  },
  { props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI', width: 57 },
  { props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI', width: 58 },
  { props: 'mark', name: '备注', key: 'BEIZHU', width: 35 },
  {
    props: 'materialCode',
    name: '原材料编号',
    key: 'YUANCAILIAOBIANHAO',
    width: 70
  },
  { props: 'materialName', name: '原材料', key: 'YUANCAILIAO', width: 45 },
  { props: 'price', name: '基价', key: 'JIJIA', width: 32 },
  {
    props: 'priceMeasureUnit',
    name: '基价计量单位',
    key: 'JIJIAJILIANGDANWEI'
  },
  {
    props: 'priceSource',
    name: '市场价来源',
    key: 'SHICHANGJIALAIYUAN',
    width: 75
  },
  { props: 'tcCurrence', name: '货币', key: 'HUOBI', width: 40 },
  { props: 'tcExchangeRate', name: '汇率', key: 'MTZHUILV', width: 32 },
  {
    props: 'compensationPeriod',
    name: '补差周期',
    key: 'BUCHAZHOUQI',
    width: 60
  },
  {
    props: 'compensationRatio',
    name: '补差系数',
    key: 'BUCHAXISHU',
    width: 55
  },
  { props: 'threshold', name: '阈值', key: 'YUZHI', width: 30 },
  {
    props: 'thresholdCompensationLogic',
    name: '阈值补差逻辑',
    key: 'YUZHIBUCHALUOJI'
  }
]
// export const partTableTitle3 = [
//     {props: 'assemblyPartnum', name: '零件号', key: 'LINGJIANHAO'},
//     {props: 'partName', name: '零件名称', key: 'LINGJIANMINGCHENG'},
//     {props: 'sapCode', name: '供应商编号/名称', key: 'GYSBHMC'},
//     {props: 'ruleNo', name: '规则编号', key: 'GUIZEBIANHAO'},
//     {props: 'priceUnit', name: '每', key: 'MEI'},
//     {props: 'partUnit', name: '零件数量单位', key: 'LINGJIANSHULIANGDANWEI'},
//     {props: 'dosage', name: '用量', key: 'YONGLIANG'},
//     {props: 'dosageMeasureUnit', name: '用量计量单位', key: 'YONGLIANGJILIANGDANWEI'},
//     {props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI'},
//     {props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI'},

//   ]
//   export const partTableTitle4 = [

//     {props: 'mark', name: '备注', key: 'BEIZHU'},
//     {props: 'materialCode', name: '原材料编号', key: 'YUANCAILIAOBIANHAO'},
//     {props: 'materialName', name: '原材料', key: 'YUANCAILIAO'},
//     {props: 'price', name: '基价', key: 'JIJIA'},
//     {props: 'priceMeasureUnit', name: '基价计量单位', key: 'JIJIAJILIANGDANWEI'},
//     {props: 'priceSource', name: '市场价来源', key: 'SHICHANGJIALAIYUAN'},
//     {props: 'tcCurrence', name: '货币', key: 'HUOBI'},
//     {props: 'tcExchangeRate', name: '汇率', key: 'MTZHUILV'},
//     {props: 'compensationPeriod', name: '补差周期', key: 'BUCHAZHOUQI'},
//     {props: 'compensationRatio', name: '补差系数', key: 'BUCHAXISHU'},
//     {props: 'threshold', name: '阈值', key: 'YUZHI'},
//     {props: 'thresholdCompensationLogic', name: '阈值补差逻辑', key: 'YUZHIBUCHALUOJI'},
//   ]
// 附件上传
export const uploadTableTitle = [
  { props: 'fileName', name: '文件名', key: 'WENJIANMING' },
  { props: 'createDate', name: '上传日期', key: 'SHANGCHUANRIQI' },
  { props: 'createBy', name: '上传人', key: 'SHANGCHUANREN' }
]
