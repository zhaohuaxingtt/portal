/*
 * @Author: youyuan
 * @Date: 2021-10-28 16:31:29
 * @LastEditTime: 2022-03-03 16:25:20
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
export const ruleTableTitle1_1 = [
  //决策资料规则清单暂用
  {
    props: 'ruleNo',
    name: '规则编号',
    key: 'GUIZEBIANHAO',
    overlap: true,
    overlapbottom: 'Rule No.'
  },
  {
    // props: 'materialGroup',
    props: 'materialGroupName',
    name: 'MTZ-材料组',
    key: 'MTZGANGCAILIAOZU',
    overlap: true,
    overlapbottom: 'MTZ group'
  },
  {
    props: 'carline',
    name: '车型',
    key: 'CHEXING',
    overlap: true,
    overlapbottom: 'Carline',
    minWidth: 50
  },
  {
    props: 'supplierId',
    name: '供应商',
    key: 'GONGYINGSHANG',
    overlap: true,
    overlapbottom: 'Supplier',
    tooltip: true,
    minWidth: 80
  },
  {
    props: 'materialCode',
    name: '原材料编号',
    key: 'YUANCAILIAOBIANHAO',
    overlap: true,
    overlapbottom: 'Material Code',
    minWidth: 95
  },
  {
    props: 'materialName',
    name: '中类名称',
    key: 'ZHONGLEIMINGCHENG',
    overlap: true,
    overlapbottom: 'Material Division',
    minWidth: 105
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
    props: 'priceMeasureUnit',
    name: '基价计量单位',
    key: 'JIJIAJILIANGDANWEI',
    overlap: true,
    overlapbottom: 'Base price Unit',
    width: 120
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
    overlap: true,
    overlapbottom: 'Exchange Rate',
    width: 110
  },
  {
    props: 'source',
    name: '市场价来源',
    key: 'SHICHANGJIALAIYUAN',
    overlap: true,
    overlapbottom: 'Market'
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
    props: 'startDate',
    name: '有效期起',
    key: 'YOUXIAOQIQI',
    overlap: true,
    overlapbottom: 'Valid From',
    width: 110
  },
  {
    props: 'endDate',
    name: '有效期止',
    key: 'YOUXIAOQIZHI',
    overlap: true,
    overlapbottom: 'Valid To',
    width: 110
  }
]

// MTZ-零件清单
export const partTableTitle1_1 = [
  {
    props: 'assemblyPartnum',
    name: '零件号',
    key: 'LINGJIANHAO',
    overlap: true,
    overlapbottom: 'Part No.',
    minWidth: 120
  },
  {
    props: 'partName',
    name: '零件名称',
    key: 'LINGJIANMINGCHENG',
    overlap: true,
    overlapbottom: 'Part Name'
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
    props: 'materialCode',
    name: '原材料编号',
    key: 'YUANCAILIAOBIANHAO',
    overlap: true,
    overlapbottom: 'Material Code',
    minWidth: 95
  },
  {
    props: 'materialName',
    name: '原材料',
    key: 'YUANCAILIAO',
    overlap: true,
    overlapbottom: 'Material',
    minWidth: 60
  },
  {
    props: 'supplierId',
    name: '供应商',
    key: 'GONGYINGSHANG',
    overlap: true,
    overlapbottom: 'Supplier',
    minWidth: 80
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
    props: 'priceMeasureUnit',
    name: '基价计量单位',
    key: 'JIJIAJILIANGDANWEI',
    overlap: true,
    overlapbottom: 'Base price Unit',
    minWidth: 110
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
    props: 'partUnit',
    name: '零件数量单位',
    key: 'LINGJIANSHULIANGDANWEI',
    overlap: true,
    overlapbottom: 'Part Unit',
    minWidth: 95
  },
  {
    props: 'dosage',
    name: '用量',
    key: 'YONGLIANG',
    overlap: true,
    overlapbottom: 'Dosage',
    minWidth: 50
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
    props: 'priceSource',
    name: '市场价来源',
    key: 'SHICHANGJIALAIYUAN',
    overlap: true,
    overlapbottom: 'Market',
    minWidth: 75
  },
  {
    props: 'compensationRatio',
    name: '补差系数',
    key: 'BUCHAXISHU',
    overlap: true,
    overlapbottom: 'Ratio',
    minWidth: 55
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
    props: 'compensationPeriod',
    name: '补差周期',
    key: 'BUCHAZHOUQI',
    overlap: true,
    overlapbottom: 'Period',
    minWidth: 60
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
  }
]

// 附件上传
export const uploadTableTitle = [
  { props: 'fileName', name: '文件名', key: 'WENJIANMING', width: 600 },
  { props: 'createDate', name: '上传日期', key: 'SHANGCHUANRIQI' },
  { props: 'createByName', name: '上传人', key: 'SHANGCHUANREN' }
]
