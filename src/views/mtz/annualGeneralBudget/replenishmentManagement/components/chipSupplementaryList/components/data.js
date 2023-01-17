/*
 * @Author: your name
 * @Date: 2021-10-09 15:06:29
 * @LastEditTime: 2023-01-17 16:40:46
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\chipSupplementaryList\components\data.js
 */
export const tabs3InforList = [
  {
    name: '凭证ID',
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
    name: '总金额 (RMB)',
    prop: 'totalAmt'
  },
  {
    name: '实补 (RMB)',
    prop: 'actuallyTotalAmt'
  }
]
export const tabs2InforList = [
  {
    name: '凭证ID',
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
    name: '总金额 (RMB)',
    prop: 'totalAmt'
  },
  {
    name: '实补 (RMB)',
    prop: 'actuallyTotalAmt'
  }
]
export const tabsInforList = [
  {
    name: '凭证ID',
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
  { props: 'saNo', name: '采购框架', key: 'CAIGOUKUANGJIA', width: 140 },
  { props: 'saItemNo', name: '项目', key: 'XIANGMU', width: 70 },
  { props: 'firstPartNo', name: '零件号', key: 'LINGJIANHAO', width: 140 },
  // { props: 'price', name: '零件价格（RMB）', key: 'LINGJIANJIAGE' },
  // { props: 'actAmt', name: '零件实价（RMB）', key: 'LINGJIANSHIJIA' },
  { props: 'priceUnit', name: '价格单位', key: 'JIAGEDANWEI' },
  { props: 'shippedQty', name: '零件数量', key: 'LINGJIANSHULIANG' },
  { props: 'appAmt', name: '补差额（RMB）', key: 'BUCHAE' }
]
export const tableTitle2 = [
  { props: 'saNo', name: '采购框架', key: 'CAIGOUKUANGJIA', width: 140 },
  { props: 'saItemNo', name: '项目号', key: 'XIANGMUHAO', width: 70 },
  { props: 'mtzDocMonth', name: '补差期间', key: 'BUCHAQIJIAN', width: 140 },
  { props: 'fPartNo', name: '零件号', key: 'LINGJIANHAO', width: 140 },
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
    width: 120
  },
  {
    props: 'categoryName',
    name: '材料中类',
    key: 'CAILIAOZHONGLEI',
    width: 120
  },
  {
    props: 'basePrice',
    name: '原材料基价',
    key: 'YUANCAILIAOJIJIA',
    width: 120
  },
  { props: 'basePriceUnit', name: '单位', key: 'DANWEI', width: 100 },
  { props: 'bExchangeRate', name: '基价汇率', key: 'JIJIAHUILV', width: 100 },
  {
    props: 'calUsg',
    name: '原材料用量',
    key: 'YUANCAILIAOYONGLIANG',
    width: 100
  },
  { props: 'cond', name: '阈值', key: 'YUZHI', width: 100 },
  {
    props: 'thresholdCompensationLogic',
    name: '阈值补差逻辑',
    key: 'YUZHIBUCHALUOJI',
    width: 150
  },
  { props: 'rate', name: '补差系数', key: 'BUCHAXISHU', width: 100 },
  {
    props: 'effPrice',
    name: '原材料市场价',
    key: 'YUANCAILIAOSHICHANGJIA',
    width: 120
  },
  {
    props: 'effExchangeRate',
    name: '市场价汇率',
    key: 'SHICHANGJIAHUILV',
    width: 120
  },
  { props: 'qty', name: '零件数量', key: 'LINGJIANSHULIANG', width: 100 },
  { props: 'appAmt', name: '补差额', key: 'BUCHAE', width: 100 },
  {
    props: 'sPartNo',
    name: '二次件零件号',
    key: 'ERCIJIANLINGJIANHAO',
    width: 150
  },
  {
    props: 'pieceSupplierSap',
    name: '二次件供应商',
    key: 'ERCIJIANGONGYINGSHANG',
    width: 250,
    tooltip: true
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
    name: '二次件供应商',
    key: 'ERCIJIANGONGYINGSHANG',
    width: 250,
    tooltip: true
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
  { props: 'rate', name: '补差系数', key: 'BUCHAXISHU', width: 150 },
  { props: 'price', name: '购买价', key: 'GOUMAIJIA', width: 150 },
  {
    props: 'exchangeRate',
    name: '购买价汇率',
    key: 'GOUMAIJIAHUILV',
    width: 150
  },
  { props: 'partNumber', name: '购买数量', key: 'GOUMAISHULIANG', width: 150 },
  {
    props: 'balance',
    name: '消耗数量',
    key: 'XIAOHAOSHULIANG',
    width: 150
  },
  { props: 'bulkPartsConsume', name: '余数', key: 'YUSHU', width: 150 },
  { props: 'appAmt', name: '补差额', key: 'BUCHAE', width: 150 }
]

export const tableTitleNegative = [
  { props: 'fileName', name: '文件名称', key: 'WENJIANMINGCHENG' },
  { props: 'fileSize', name: '大小（MB）', key: 'DAXIAO' },
  { props: 'uploadDate', name: '上传日期', key: 'SHANGCHUANRIQI' },
  { props: 'uploadUser', name: '上传人', key: 'SHANGCHUANREN' }
]


// 计算弹窗补差规则列表
export const tableTitleRule = [
  {
      type: 'index',
      label: '#',
  }, {
      prop: 'ruleNo',
      label: '规则编号',
      i18n: 'GUIZEBIANHAO',
      align: 'center',
      width: 150
  }, {
      prop: 'method',
      label: '补差方式',
      i18n: '补差方式',
      align: 'center',
      width: 150,
      customRender: (h, scope) => {
          return <span>{scope.row.method == '1' ? '一次性补差' : '变价单补差'}</span>
      }
  }, {
      //   prop: 'materialGroup',
      //   label: '材料组',
      //   i18n: '材料组',
      //   align: 'center',
      //   width: 150
      // }, {
      prop: 'materialName',
      label: '原材料描述',
      i18n: '原材料描述',
      align: 'center',
      width: 150
  }, {
      prop: 'partNum',
      label: '一次零件号',
      i18n: '一次零件号',
      align: 'center',
      width: 150
  }, {
      prop: 'partName',
      label: '一次零件名称',
      i18n: '一次零件名称',
      align: 'center',
      tooltip: true,
      width: 150
  },
  {
      prop: 'sapCode',
      label: '一次件供应商编号',
      i18n: '一次件供应商编号',
      align: 'center',
      width: 150
  },
  {
      prop: 'supplierName',
      label: '一次件供应商名称',
      width: '100px',
      align: 'center',
      i18n: '一次件供应商名称',
      tooltip: true,
      width: 150
  },
  {
      prop: 'buyerName',
      label: '采购员',
      width: '100px',
      align: 'center',
      i18n: 'CAIGOUYUAN',
      width: 100
  },
  {
      prop: 'deptCode',
      label: '科室',
      width: '100px',
      align: 'center',
      i18n: 'KESHI',
      width: 100
  }, {
      prop: 'partNameSec',
      label: '二次零件号',
      i18n: '二次零件号',
      align: 'center',
      width: 150
  }, {
      prop: 'partNumSec',
      label: '二次零件名称',
      i18n: '二次零件名称',
      align: 'center',
      tooltip: true,
      width: 150
  },
  {
      prop: 'sapCodeSec',
      label: '二次件供应商编号',
      i18n: '二次件供应商编号',
      align: 'center',
      width: 150
  },
  {
      prop: 'supplierNameSec',
      label: '二次件供应商名称',
      width: '100px',
      align: 'center',
      i18n: '二次件供应商名称',
      tooltip: true,
      width: 150
  },
  {
      prop: 'secondPrimaryRatio',
      label: '二次件与一次件比例',
      width: '100px',
      align: 'center',
      i18n: '二次件与一次件比例',
      width: 150
  },
  {
      prop: 'amount',
      label: '补差金额',
      width: '100px',
      align: 'center',
      i18n: '补差金额',
      width: 150
  },
  {
      prop: 'currency',
      label: '货币',
      align: 'center',
      i18n: 'HUOBI',
      width: 150
  },
  { prop: 'exchangeRate', label: '汇率', align: 'center', i18n: 'HUILV' },
  {
      prop: 'startDate',
      label: '有效期起',
      align: 'center',
      i18n: 'YOUXIAOQIQI',
      tooltip: true,
      width: 150
  },
  {
      prop: 'endDate',
      label: '有效期止',
      align: 'center',
      i18n: 'YOUXIAOQIZHI',
      tooltip: true,
      width: 150
  },
  {
      prop: 'effectFlag',
      label: '是否生效',
      align: 'center',
      i18n: 'SHIFOUSHENGXIAO',
      width: 150,
      customRender: (h, scope) => {
          return <span>{scope.row.effectFlag ? '是' : '否'}</span>
      }
  },
  {
      prop: 'updateDate',
      label: '更新时间',
      align: 'center',
      i18n: '更新时间',
      width: 150,
      tooltip: true,
  },
  {
      prop: 'sourceCode',
      label: '补差来源',
      align: 'center',
      i18n: '补差来源',
      width: 150,
      emit: 'go-detail',
      customRender: (h, scope) => {
          if (scope.row.sourceCode == "初始化") {
              return <span>{scope.row?.sourceCode}</span>
          } else {
              return <span class="link-text">{scope.row?.sourceCode}</span>
          }
      }
  },
]

// 计算弹窗补差规则列表
export const tableTitleBE = [
  {
      type: 'selection',
  }, {
      type: 'index',
      label: '#',
  }, {
      prop: 'partNum',
      label: '一次零件号',
      i18n: '一次零件号',
      align: 'center',
      width: 150
  }, 
  {
      prop: 'supplierName',
      label: '一次件供应商名称',
      width: '100px',
      align: 'center',
      i18n: '一次件供应商名称',
      tooltip: true,
      width: 150
  },
  {
        prop: 'materialGroup',
        label: '材料组',
        i18n: '材料组',
        align: 'center',
        width: 150
      }, {
      prop: 'materialName',
      label: '原材料描述',
      i18n: '原材料描述',
      align: 'center',
      width: 150
  }, {
      prop: 'partNameSec',
      label: '二次零件号',
      i18n: '二次零件号',
      align: 'center',
      width: 150
  },
  {
      prop: 'supplierNameSec',
      label: '二次件供应商名称',
      width: '100px',
      align: 'center',
      i18n: '二次件供应商名称',
      tooltip: true,
      width: 150
  },
  {
      prop: 'secondPrimaryRatio',
      label: '二次件与一次件比例',
      width: '100px',
      align: 'center',
      i18n: '二次件与一次件比例',
      width: 150
  }, {
      prop: 'ruleNo',
      label: '规则编号',
      i18n: 'GUIZEBIANHAO',
      align: 'center',
      width: 150
  },  {
      prop: 'method',
      label: '补差方式',
      i18n: '补差方式',
      align: 'center',
      width: 150,
      customRender: (h, scope) => {
          return <span>{scope.row.method == '1' ? '一次性补差' : '变价单补差'}</span>
      }
  },
  {
      prop: 'amount',
      label: '补差金额',
      width: '100px',
      align: 'center',
      i18n: '补差金额',
      width: 150
  },
  {
      prop: 'currency',
      label: '货币',
      align: 'center',
      i18n: 'HUOBI',
      width: 150
  },
  { prop: 'exchangeRate', label: '汇率', align: 'center', i18n: 'HUILV' },
  
  {
      prop: 'sourceCode',
      label: '补差单编号',
      align: 'center',
      i18n: '补差单编号',
      width: 150,
  },{
      prop: 'buyerName',
      label: '采购员',
      width: '100px',
      align: 'center',
      i18n: 'CAIGOUYUAN',
      width: 100
  },
  {
      prop: 'deptCode',
      label: '科室',
      width: '100px',
      align: 'center',
      i18n: 'KESHI',
      width: 100
  }
]