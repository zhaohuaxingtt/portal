/*
 * @Author: your name
 * @Date: 2021-10-09 15:06:29
 * @LastEditTime: 2021-10-21 15:22:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\mtzReplenishmentOverview\components\data.js
 */
export const tabs3InforList = [
  {
    name: '凭证号',
    prop: 'id'
  },
  {
    name: '供应商',
    prop: 'supplierName'
  },
  {
    name: '补差时间段',
    prop: 'time'
  },
  {
    name: '材料中类',
    prop: 'mgroupName'
  }
]
export const tabs2InforList = [
  {
    name: '凭证号',
    prop: 'id'
  },
  {
    name: '供应商',
    prop: 'supplierName'
  },
  {
    name: '补差时间段',
    prop: 'time'
  },
  {
    name: '材料中类',
    prop: 'mgroupName'
  }
]
export const tabsInforList = [
  {
    name: '凭证号',
    prop: 'id'
  },
  {
    name: '供应商',
    prop: 'supplier'
  },
  {
    name: '补差时间段',
    prop: 'monthFromTo'
  },
  {
    name: '科室',
    prop: 'department'
  },
  {
    name: '申请人',
    prop: 'applicantByName'
  },
  {
    name: '申请日期',
    prop: 'createDate'
  },
  {
    name: '材料中类',
    prop: 'mgroup'
  },
  {
    name: '总金额 (RMB)',
    prop: 'totalAmt'
  },
  {
    name: '实补 (RMB)',
    prop: 'actuallyTotalAmt'
  }
]
export const TABLE_COLUMS = [
  {
    type: 'selection',
    width: '60px',
    label: '#'
  },
  {
    type: 'index',
    width: '60px',
    label: '#'
  },
  {
    prop: 'saNo',
    label: '采购框架',
    minWidth: 120
  },
  {
    prop: 'saItemNo',
    label: '项目号',
    minWidth: 120
  },
  {
    prop: 'mtzDocMonth',
    label: '补差期间',
    minWidth: 120
  },
  {
    prop: 'logType',
    label: '零件号',
    minWidth: 120
  },
  {
    prop: 'materialNo',
    label: '原材料牌号',
    minWidth: 120
  },
  {
    prop: 'materialName',
    label: '原材料名称',
    minWidth: 120
  },
  {
    prop: 'materialCategory',
    label: '材料中类',
    minWidth: 120
  },
  {
    prop: 'basePrice',
    label: '原材料基价',
    minWidth: 120
  },
  {
    prop: 'basePriceUnit',
    label: '单位',
    minWidth: 120
  },
  {
    prop: 'bexchangeRate',
    label: '基价汇率',
    minWidth: 120
  },
  {
    prop: 'calUsg',
    label: '原材料用量',
    minWidth: 120
  },
  {
    prop: 'cond',
    label: '阈值',
    minWidth: 120
  },
  {
    prop: 'thresholdCompensationLogic',
    label: '阈值补差逻辑',
    minWidth: 120
  },
  {
    prop: 'rate',
    label: '补差系数',
    minWidth: 120
  },
  {
    prop: 'effPrice',
    label: '原材料市场价',
    minWidth: 120
  },
  {
    prop: 'effExchangeRate',
    label: '市场价汇率',
    minWidth: 120
  },
  {
    prop: 'priceNo',
    label: '零件数量',
    minWidth: 120
  },
  {
    prop: 'actAmt',
    label: '补差额',
    minWidth: 120
  },
  {
    prop: 'rqTime',
    label: '二次件零件号',
    minWidth: 120
  },
  {
    prop: 'rqTime',
    label: '二次件供应商编号',
    minWidth: 140
  },
  {
    prop: 'rqTime',
    label: '一二次件比例',
    minWidth: 120
  },
  {
    prop: 'isEffAvg',
    label: '是否取市场价均值',
    minWidth: 140
  },
  {
    prop: 'effPriceFrom' + 'effPriceTo',
    label: '市场价偏移区间',
    minWidth: 140
  }
]

export const tableTitle = [
  { props: 'saNo', name: '采购框架', key: 'CAIGOUKUANGJIA' },
  { props: 'saItemNo', name: '项目', key: 'XIANGMU' },
  { props: 'firstPartNo', name: '零件号', key: 'LINGJIANHAO' },
  { props: 'price', name: '零件价格（RMB）', key: 'LINGJIANJIAGE' },
  { props: 'actAmt', name: '零件实价（RMB）', key: 'LINGJIANSHIJIA' },
  { props: 'priceUnit', name: '价格单位', key: 'JIAGEDANWEI' },
  { props: 'shippedQty', name: '零件数量', key: 'LINGJIANSHULIANG' },
  { props: 'appAmt', name: '补差额（RMB）', key: 'BUCHAE' }
]
export const tableTitle2 = [
  { props: 'saNo', name: '采购框架', key: 'CAIGOUKUANGJIA', width: 150 },
  { props: 'saItemNo', name: '项目号', key: 'XIANGMUHAO', width: 150 },
  { props: 'mtzDocMonth', name: '补差期间', key: 'BUCHAQIJIAN', width: 150 },
  { props: 'fPartNo', name: '零件号', key: 'LINGJIANHAO', width: 150 },
  {
    props: 'materialCode',
    name: '原材料牌号',
    key: 'YUANCAILIAOPAIHAO',
    width: 150
  },
  {
    props: 'material',
    name: '原材料名称',
    key: 'YUANCAILIAOMINGCHENG',
    width: 150
  },
  {
    props: 'categoryName',
    name: '材料中类',
    key: 'CAILIAOZHONGLEI',
    width: 150
  },
  {
    props: 'basePrice',
    name: '原材料基价',
    key: 'YUANCAILIAOJIJIA',
    width: 150
  },
  { props: 'basePriceUnit', name: '单位', key: 'DANWEI', width: 150 },
  { props: 'bExchangeRate', name: '基价汇率', key: 'JIJIAHUILV', width: 150 },
  {
    props: 'calUsg',
    name: '原材料用量',
    key: 'YUANCAILIAOYONGLIANG',
    width: 150
  },
  { props: 'cond', name: '阈值', key: 'YUZHI', width: 150 },
  {
    props: 'thresholdCompensationLogic',
    name: '阈值补差逻辑',
    key: 'YUZHIBUCHALUOJI',
    width: 150
  },
  { props: 'rate', name: '补差系数', key: 'BUCHAXISHU', width: 150 },
  {
    props: 'effPrice',
    name: '原材料市场价',
    key: 'YUANCAILIAOSHICHANGJIA',
    width: 150
  },
  {
    props: 'effExchangeRate',
    name: '市场价汇率',
    key: 'SHICHANGJIAHUILV',
    width: 150
  },
  { props: 'qty', name: '零件数量', key: 'LINGJIANSHULIANG', width: 150 },
  { props: 'appAmt', name: '补差额', key: 'BUCHAE', width: 150 },
  {
    props: 'sPartNo',
    name: '二次件零件号',
    key: 'ERCIJIANLINGJIANHAO',
    width: 150
  },
  {
    props: 'pieceSupplierSap',
    name: '二次件供应商编号',
    key: 'ERCIJIANGONGYINGSHANGBIANHAO',
    width: 170
  },
  { props: 'factor', name: '一二次件比例', key: 'YIERCIJIANBILI', width: 150 },
  {
    props: 'isEffAvg',
    name: '是否取市场价均值',
    key: 'SHIFOUQUSHICHANGJIAJUNZHI',
    width: 170
  },
  {
    props: 'pianyiqujian',
    name: '市场价偏移区间',
    key: 'SHICHANGJIAPIANYIQUJIAN',
    width: 150
  }
]

export const tableTitle3 = [
  { props: 'saNo', name: '采购框架', key: 'CAIGOUKUANGJIA', width: 150 },
  { props: 'saItemNo', name: '项目号', key: 'XIANGMUHAO', width: 150 },
  { props: 'mtzDocMonth', name: '补差期间', key: 'BUCHAQIJIAN', width: 150 },
  { props: 'fPartNo', name: '零件号', key: 'LINGJIANHAO', width: 150 },
  { props: 'batchNo', name: '批次号', key: 'PICIHAO', width: 150 },
  { props: 'pgmNo', name: '贵金属编号', key: 'GUIJINSHUBIANHAO', width: 150 },
  {
    props: 'pieceSupplierSap',
    name: '二次件供应商编号',
    key: 'ERCIJIANGONGYINGSHANGBIANHAO',
    width: 170
  },
  { props: 'factor', name: '一二次件比例', key: 'YIERCIJIANBILI', width: 150 },
  {
    props: 'material',
    name: '原材料名称',
    key: 'YUANCAILIAOMINGCHENG',
    width: 150
  },
  { props: 'basePrice', name: '基价', key: 'JIJIA', width: 150 },
  { props: 'basePriceUnit', name: '基价单位', key: 'JIJIADANWEI', width: 150 },
  { props: 'bExchangeRate', name: '基价汇率', key: 'JIJIAHUILV', width: 150 },
  {
    props: 'dosage',
    name: '原材料用量',
    key: 'YUANCAILIAOYONGLIANG',
    width: 150
  },
  { props: 'threshold', name: '阈值', key: 'YUZHI', width: 150 },
  {
    props: 'thresholdCompensationLogic',
    name: '阈值补差逻辑',
    key: 'YUZHIBUCHALUOJI',
    width: 150
  },
  { props: 'balance', name: '补差系数', key: 'BUCHAXISHU', width: 150 },
  { props: 'price', name: '购买价', key: 'GOUMAIJIA', width: 150 },
  {
    props: 'exchangeRate',
    name: '购买价汇率',
    key: 'GOUMAIJIAHUILV',
    width: 150
  },
  { props: 'partNumber', name: '购买数量', key: 'GOUMAISHULIANG', width: 150 },
  {
    props: 'bulkPartsConsume',
    name: '消耗数量',
    key: 'XIAOHAOSHULIANG',
    width: 150
  },
  { props: 'balance', name: '余数', key: 'YUSHU', width: 150 },
  { props: 'appAmt', name: '补差额', key: 'BUCHAE', width: 150 }
]

export const tableTitleNegative = [
  { props: 'fileName', name: '文件名称', key: 'WENJIANMINGCHENG' },
  { props: 'fileSize', name: '大小（MB）', key: 'DAXIAO' },
  { props: 'uploadDate', name: '上传日期', key: 'SHANGCHUANRIQI' },
  { props: 'uploadUser', name: '上传人', key: 'SHANGCHUANREN' }
]
