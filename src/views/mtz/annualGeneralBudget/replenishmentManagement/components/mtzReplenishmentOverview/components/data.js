/*
 * @Author: your name
 * @Date: 2021-10-09 15:06:29
 * @LastEditTime: 2023-04-19 17:53:13
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\mtzReplenishmentOverview\components\data.js
 */
import language from "@/utils/language";
import tooltip from "./tooltip";
import tableTooltip from "./tableTooltip";
export const avgPeriodList = [
  { code: '1', name: '一月' },
  { code: '2', name: '二月' },
  { code: '3', name: '三月' },
  { code: '4', name: '四月' },
  { code: '6', name: '六月' },
  { code: '12', name: '十二月' },
  { code: '0', name: '补差时间段内均值' }
]
export const offsetList = [
  { code: '1', name: '1个月' },
  { code: '2', name: '2个月' },
  { code: '3', name: '3个月' },
  { code: '4', name: '4个月' },
  { code: '5', name: '5个月' },
  { code: '6', name: '6个月' },
  { code: '7', name: '7个月' },
  { code: '8', name: '8个月' },
  { code: '9', name: '9个月' },
  { code: '10', name: '10个月' },
  { code: '11', name: '11个月' },
  { code: '12', name: '12个月' },
  { code: '0', name: '0个月' },
  { code: '-1', name: '-1个月' },
  { code: '-2', name: '-2个月' },
  { code: '-3', name: '-3个月' },
  { code: '-4', name: '-4个月' },
  { code: '-5', name: '-5个月' },
  { code: '-6', name: '-6个月' },
  { code: '-7', name: '-7个月' },
  { code: '-8', name: '-8个月' },
  { code: '-9', name: '-9个月' },
  { code: '-10', name: '-10个月' },
  { code: '-11', name: '-11个月' },
  { code: '-12', name: '-12个月' }
]
export const TABLE_COLUMS = [
  {
    type: 'selection',
    width: '60px'
  },
  {
    type: 'index',
    width: '60px',
    label: '#',
    fixed: true,
  },
  {
    prop: 'saNo',
    label: '采购框架',
    minWidth: 120,
    fixed: true,
  },
  {
    prop: 'saItemNo',
    label: '项目号',
    minWidth: 120,
    fixed: true,
  },
  {
    prop: 'mtzDocId',
    label: '凭证号',
    minWidth: 120,
    fixed: true,
  },
  {
    prop: 'mtzDocMonth',
    label: '补差期间',
    minWidth: 120,
    fixed: true,
  },
  {
    prop: 'fpartNo',
    label: '零件号',
    minWidth: 120,
    fixed: true,
  },
  {
    prop: 'materialNo',
    label: '原材料牌号',
    minWidth: 120,
    fixed: true,
  },
  {
    prop: 'materialName',
    label: '原材料名称',
    minWidth: 120,
    fixed: true,
  },
  {
    prop: 'materialCategory',
    label: '材料中类',
    minWidth: 200,
    fixed: true,
    customRender: (h, scope) => {
      return (
        <span>
          {scope.row.materialCategoryCode}-{scope.row.materialCategory}
        </span>
      )
    }
  },
  {
    prop: 'offsetMonth',
    label: '计算偏移(月)',
    minWidth: 120,
    customRender: (h, scope) => {
      return   <span>{ scope.row.offsetMonth||scope.row.offsetMonth=='0' ? offsetList.find(val => val.code == scope.row.offsetMonth).name : '' }</span>
    }
  },
  {
    prop: 'avgPeriod',
    label: '均值计算周期(月)',
    minWidth: 140,
    customRender: (h, scope) => {
      return   <span> {scope.row.avgPeriod||scope.row.avgPeriod=='0' ? avgPeriodList.find(val => val.code == scope.row.avgPeriod).name : ''} </span>
    }
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
    prop: 'basePriceUnit',
    label: '市场价单位',
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
    prop: 'calUnit',
    label: '零件数量单位',
    minWidth: 120
  },
  {
    prop: 'actAmt',
    label: '补差额',
    minWidth: 120
  },
  {
    prop: 'appAmt',
    label: '实际补差额',
    minWidth: 120
  },
  {
    
    prop: 'spartNo',
    label: '二次件零件号',
    minWidth: 120
  },
  {
    prop: 'secondSupplierId',
    label: '二次件供应商',
    minWidth: 140,
    customRender: (h, scope) => {
      return (
        <span>
          {scope.row.secondSupplierSap}-{scope.row.secondSupplierName}
        </span>
      )
    }
  },
  {
    prop: 'factor',
    label: '一二次件比例',
    minWidth: 120
  }
]

export const TABLE_COLUMS_TIPS = [
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
    prop: 'fPartNo',
    label: '一次件零件号',
    minWidth: 100
  },
  {
    prop: 'fSupplierName',
    label: '一次件供应商',
    minWidth: 140,
    customRender: (h, scope) => {
      return <tableTooltip content={(scope.row.fSupplierSapNo||'')+'-'+(scope.row.fSupplierName||'') }></tableTooltip>
    }
  },
  {
    prop: 'sPartNo',
    label: '二次件零件号',
    minWidth: 100,
    customRender: (h, scope) => {
      return (
        <span>
          {scope.row.sPartNo || '-' }
        </span>
      )
    }
  },
  {
    prop: 'sSupplierName',
    label: '二次件供应商',
    minWidth: 140,
    customRender: (h, scope) => {
      return <tableTooltip content={(scope.row.sSupplierSapNo||'')+'-'+(scope.row.sSupplierName||'') }></tableTooltip>
    }
  },
  {
    prop: 'materialCode',
    label: '原材料编号',
    width: 100
  },
  {
    prop: 'mtzDocMonth',
    label: '年月',
    width: 100
  },
  {
    prop: 'receiveNum',
    label: '收货数量',
    width: 120,
    headerRender: (h) => {
      return <tooltip effect="light" placement="top" content={language('收货数量', '收货数量')} tip={language(
        '“0”：没有收获数量，请确认收货数量',
        '“0”：没有收获数量，请确认收货数量'
      )}></tooltip>
    },
  },
  {
    prop: 'invoiceNum',
    label: '发票数量',
    width: 120,
    headerRender: (h) => {
      return <tooltip effect="light" placement="top" content={language('发票数量', '发票数量')} tip={language(
        '“0”：没有发票数量，请确认发票数量',
        '“0”：没有发票数量，请确认发票数量'
      )}></tooltip>
    },
  },
  {
    prop: 'hasBasePrice',
    label: '基价状态',
    width: 110,
    headerRender: (h) => {
      return <tooltip effect="light" placement="top" content={language('基价状态', '基价状态')} tip={language(
        '“无”：输入的零件号无基价，“失效”：此零件号基价全部“失效”，请确认零件号和基价的生效状态',
        '“无”：输入的零件号无基价，“失效”：此零件号基价全部“失效”，请确认零件号和基价的生效状态'
      )}></tooltip>
    },
  },
  {
    prop: 'hasEffPrice',
    label: '市场价状态',
    width: 120,
    headerRender: (h) => {
      return <tooltip effect="light" placement="top" content={language('市场价状态', '市场价状态')} tip={language(
        '“无”：原材料无市场价（贵金属无点价单），请确认市场价',
        '“无”：原材料无市场价（贵金属无点价单），请确认市场价'
      )}></tooltip>
    },
  },
  {
    prop: 'hasOutCond',
    label: '是否超过阈值',
    width: 140,
    headerRender: (h) => {
      return <tooltip effect="light" placement="top" content={language('是否超过阈值', '是否超过阈值')} tip={language(
        '“未超过”：I市场价-基价I＜I基价*阈值I，不计算补差',
        '“未超过”：I市场价-基价I＜I基价*阈值I，不计算补差'
      )}></tooltip>
    },
  },
]

export const tableTitle = [
  { props: 'assemblyPartnum', name: '一次件零件号', key: 'YCJLJH', width: 150, fixed: true },
  {
    props: 'assemblyPartName',
    name: '一次件零件名称',
    key: 'YCJLJMC',
    width: 150, fixed: true
  },
  { props: 'qty', name: '一次件结算数量', key: 'YCJJSSL', width: 150 },
  { props: 'departmentName', name: '科室', key: 'KESHI', width: 150 },
  { props: 'ekName', name: '采购员', key: 'CAIGOUYUAN', width: 150 },
  { props: 'piecePartnum', name: '二次件零件号', key: 'ECJLJH', width: 150 },
  {
    props: 'piecePartName',
    name: '二次件零件名称',
    key: 'ECJLJMC',
    width: 150
  },
  { props: 'factor', name: '一二次件用量', key: 'YECJYL', width: 150 },
  { props: 'sty', name: '二次件结算数量', key: 'ECJJSSL', width: 150 },
  {
    props: 'ssupplier',
    name: '二次件供应商',
    key: 'ERCIJIANGONGYINGSHANG',
    width: 220
  },
  { props: 'compMoney1', name: '补差金额（收货）', key: 'BCJESH', width: 150 },
  { props: 'compMoney2', name: '补差金额（结算）', key: 'BCJEJS', width: 150 },
  {
    props: 'waitLaunchedDocMoney',
    name: '待发起凭证',
    key: 'DFQPZ',
    width: 150
  },
  {
    props: 'hasLaunchedDocMoney',
    name: '已发起凭证',
    key: 'YFQPZ',
    width: 150
  },
  { props: 'trueCompMoney', name: '实际补差金额', key: 'SJBCJE', width: 150 },
  { props: 'waitVerifyMoney', name: '待确认金额', key: 'DQRJE', width: 150 },
  { props: 'hasVerifyMoney', name: '已确认金额', key: 'YQRJE', width: 150 },
  { props: 'hasRatifyMoney', name: '已批准金额', key: 'YPZJE', width: 150 },
  { props: 'hasPayMoney', name: '已支付金额', key: 'YZFJE', width: 150 },
  { props: 'ruleNo', name: '规则编号', key: 'GZBH', width: 150 },
  { props: 'materialCode', name: '原材料牌号', key: 'YCLPH', width: 150 },
  { props: 'material', name: '原材料', key: 'YCL', width: 150 },
  { props: 'price', name: '基价', key: 'JIJIA', width: 150 },
  { props: 'countUnit', name: '每', key: 'MEI', width: 150 },
  { props: 'dosage', name: '用量', key: 'YONGLIANG', width: 150 },
  {
    props: 'dosageMeasureUnit',
    name: '用量计量单位',
    key: 'YONGLIANGJILIANGDANWEI',
    width: 150
  },
  { props: 'marketSource', name: '市场价来源', key: 'SCJLY', width: 150 },
  { props: 'compensationRatio', name: '补差系数', key: 'BCXS', width: 150 },
  { props: 'compensationPeriod', name: '补差周期', key: 'BCZQ', width: 150 },
  { props: 'threshold', name: '阈值', key: 'YUZHI', width: 150 },
  {
    props: 'thresholdCompensationLogic',
    name: '阈值补差逻辑',
    key: 'YZBCLJ',
    width: 150
  },
  { props: 'startDate', name: '有效期起', key: 'YXQQ', width: 150 },
  { props: 'endDate', name: '有效期止', key: 'YXQZ', width: 150 },
  { props: 'updateDate', name: '更新时间', key: 'GENGXINSHIJIAN', width: 150 }
]
export const tableTitle2 = [
  { props: 'assemblyPartnum', name: '一次件零件号', key: 'YCJLJH', width: 150 },
  {
    props: 'assemblyPartName',
    name: '一次件零件名称',
    key: 'YCJLJMC',
    width: 150
  },
  { props: 'qty', name: '一次件结算数量', key: 'YCJJSSL', width: 150 },
  { props: 'departmentName', name: '科室', key: 'KESHI', width: 150 },
  { props: 'ekName', name: '采购员', key: 'CAIGOUYUAN', width: 150 },
  { props: 'piecePartnum', name: '二次件零件号', key: 'ECJLJH', width: 150 },
  {
    props: 'piecePartName',
    name: '二次件零件名称',
    key: 'ECJLJMC',
    width: 150
  },
  { props: 'factor', name: '一二次件用量', key: 'YECJYL', width: 150 },
  { props: 'sty', name: '二次件结算数量', key: 'ECJJSSL', width: 150 },
  {
    props: 'ssupplier',
    name: '二次件供应商',
    key: 'ERCIJIANGONGYINGSHANG',
    width: 220
  },
  { props: 'compMoney1', name: '补差金额（收货）', key: 'BCJESH', width: 150 },
  { props: 'compMoney2', name: '补差金额（结算）', key: 'BCJEJS', width: 150 },
  {
    props: 'waitLaunchedDocMoney',
    name: '待发起凭证',
    key: 'DFQPZ',
    width: 150
  },
  {
    props: 'hasLaunchedDocMoney',
    name: '已发起凭证',
    key: 'YFQPZ',
    width: 150
  },
  { props: 'trueCompMoney', name: '实际补差金额', key: 'SJBCJE', width: 150 },
  { props: 'waitVerifyMoney', name: '待确认金额', key: 'DQRJE', width: 150 },
  { props: 'hasVerifyMoney', name: '已确认金额', key: 'YQRJE', width: 150 },
  { props: 'hasRatifyMoney', name: '已批准金额', key: 'YPZJE', width: 150 },
  { props: 'hasPayMoney', name: '已支付金额', key: 'YZFJE', width: 150 },
  { props: 'ruleNo', name: '规则编号', key: 'GZBH', width: 150 },
  { props: 'materialCode', name: '原材料牌号', key: 'YCLPH', width: 150 },
  { props: 'material', name: '原材料', key: 'YCL', width: 150 },
  { props: 'price', name: '基价', key: 'JIJIA', width: 150 },
  { props: 'countUnit', name: '每', key: 'MEI', width: 150 },
  { props: 'dosage', name: '用量', key: 'YONGLIANG', width: 150 },
  {
    props: 'dosageMeasureUnit',
    name: '用量计量单位',
    key: 'YONGLIANGJILIANGDANWEI',
    width: 150
  },
  { props: 'marketSource', name: '市场价来源', key: 'SCJLY', width: 150 },
  { props: 'compensationRatio', name: '补差系数', key: 'BCXS', width: 150 },
  { props: 'compensationPeriod', name: '补差周期', key: 'BCZQ', width: 150 },
  { props: 'threshold', name: '阈值', key: 'YUZHI', width: 150 },
  {
    props: 'thresholdCompensationLogic',
    name: '阈值补差逻辑',
    key: 'YZBCLJ',
    width: 150
  },
  { props: 'startDate', name: '有效期起', key: 'YXQQ', width: 150 },
  { props: 'endDate', name: '有效期止', key: 'YXQZ', width: 150 },
  { props: 'updateDate', name: '更新时间', key: 'GENGXINSHIJIAN', width: 150 }
]
