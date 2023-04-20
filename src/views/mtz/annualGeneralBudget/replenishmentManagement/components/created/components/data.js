/*
 * @Author: YoHo
 * @Date: 2023-01-12 14:37:57
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\created\components\data.js
 */

export const tableTitle = [
  {
    type: 'index',
    label: '#',
  }, {
    prop: 'ruleNo',
    label: '规则编号',
    i18n: 'GUIZEBIANHAO',
    align: 'center',
    width: 140
  }, {
    prop: 'method',
    label: '补差方式',
    i18n: '补差方式',
    align: 'center',
    width: 120,
    customRender: (h, scope) => {
      return <span>{scope.row.method == '1' ? '一次性补差' : '变价单补差'}</span>
    }
  }, {
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
    width: 120
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
    prop: 'deptCode',
    label: '科室',
    width: '100px',
    align: 'center',
    i18n: 'KESHI',
    width: 100
  },
  {
    prop: 'buyerName',
    label: '采购员',
    width: '100px',
    align: 'center',
    i18n: 'CAIGOUYUAN',
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
    width: 120
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
    align: 'center',
    i18n: '二次件与一次件比例',
    width: 170
  },
  {
    prop: 'amount',
    label: '补差金额',
    width: '100px',
    align: 'right',
    headerAlign: 'center',
    i18n: '补差金额',
    width: 120,
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.amount)}</span>
    }
  },
  {
    prop: 'currency',
    label: '货币',
    align: 'center',
    i18n: 'HUOBI',
  },
  { prop: 'exchangeRate', label: '汇率', align: 'center', i18n: 'HUILV' },
  {
    prop: 'startDate',
    label: '有效期起',
    align: 'center',
    i18n: 'YOUXIAOQIQI',
    tooltip: true,
    width: 180
  },
  {
    prop: 'endDate',
    label: '有效期止',
    align: 'center',
    i18n: 'YOUXIAOQIZHI',
    tooltip: true,
    width: 180
  },
  {
    prop: 'effectFlag',
    label: '是否生效',
    align: 'center',
    i18n: 'SHIFOUSHENGXIAO',
    width: 120,
    customRender: (h, scope) => {
      return <span>{scope.row.effectFlag ? '是' : '否'}</span>
    }
  },
  {
    prop: 'updateDate',
    label: '更新时间',
    align: 'center',
    i18n: '更新时间',
    width: 180,
    tooltip: true,
  },
  {
    prop: 'sourceCode',
    label: '补差来源',
    align: 'center',
    i18n: '补差来源',
    width: 150,
    emit: 'gotoSource',
    customRender: (h, scope) => {
      if (scope.row.sourceCode == "初始化") {
        return <span>{scope.row?.sourceCode}</span>
      } else {
        return <span class="link-text">{scope.row?.sourceCode}</span>
      }
    }
  },
]

// 沿用补差规则查询
export const QueryFormData = [
  { props: 'ruleNo', name: '规则编号', key: 'GUIZHEBIANHAO' },
  { props: 'method', name: '补差方式', key: '补差方式', type: 'select', selectOption: 'methodList', disabled: true },
  // { props: 'materialGroup', name: '材料组', key: 'LK_CAILIAOZHU' },
  { props: 'partNum', name: '零件号', key: 'LK_LINGJIANHAO', type: "iMultiLineInput" },
  { props: 'partName', name: '零件名称', key: 'LK_LINGJIANMINGCHENG' },
  { props: 'sapCode', name: '供应商SAP号', key: 'GONGYINGSHANGSAPHAO', disabled: true },
  { props: 'supplierName', name: '供应商名称', key: 'GONGYINGSHANGMINGCHENG', disabled: true },
  { props: 'deptCode', name: '科室', key: '科室', type: 'select', selectOption: 'deptList', multiple: true },
  { props: 'buyerName', name: '采购员', key: 'CAIGOUYUAN' },
  { props: 'effectFlag', name: '是否生效', key: 'SHIFOUSHENGXIAO', type: 'select', selectOption: 'effectFlagList' },
  { props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI', type: 'date', disabled: true },
  { props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI', type: 'date', disabled: true },
]

// 沿用表格
export const continueBox = [
  {
    props: 'ruleNo',
    name: '规则编号',
    key: 'GUIZEBIANHAO',
    align: 'center',
    width: 150
  }, {
    props: 'method',
    name: '补差方式',
    key: '补差方式',
    align: 'center',
    width: 150,
    customRender: (h, scope) => {
      return <span>{scope.row.method == '1' ? '一次性补差' : '变价单补差'}</span>
    }
  }, {
    props: 'materialName',
    name: '原材料描述',
    key: '原材料描述',
    align: 'center',
    width: 150
  }, {
    props: 'partNum',
    name: '一次零件号',
    key: '一次零件号',
    align: 'center',
    width: 150
  }, {
    props: 'partName',
    name: '一次零件名称',
    key: '一次零件名称',
    align: 'center',
    tooltip: true,
    width: 150
  },
  {
    props: 'sapCode',
    name: '一次件供应商编号',
    key: '一次件供应商编号',
    align: 'center',
    width: 150
  },
  {
    props: 'supplierName',
    name: '一次件供应商名称',
    width: '100px',
    align: 'center',
    key: '一次件供应商名称',
    tooltip: true,
    width: 150
  },
  {
    props: 'deptCode',
    name: '科室',
    width: '100px',
    align: 'center',
    key: 'KESHI',
    width: 100
  }, 
  {
    props: 'buyerName',
    name: '采购员',
    width: '100px',
    align: 'center',
    key: 'CAIGOUYUAN',
    width: 100
  },{
    props: 'partNameSec',
    name: '二次零件号',
    key: '二次零件号',
    align: 'center',
    width: 150
  }, {
    props: 'partNumSec',
    name: '二次零件名称',
    key: '二次零件名称',
    align: 'center',
    tooltip: true,
    width: 150
  },
  {
    props: 'sapCodeSec',
    name: '二次件供应商编号',
    key: '二次件供应商编号',
    align: 'center',
    width: 150
  },
  {
    props: 'supplierNameSec',
    name: '二次件供应商名称',
    width: '100px',
    align: 'center',
    key: '二次件供应商名称',
    tooltip: true,
    width: 150
  },
  {
    props: 'secondPrimaryRatio',
    name: '二次件与一次件比例',
    width: '100px',
    align: 'center',
    key: '二次件与一次件比例',
    width: 150
  },
  {
    props: 'amount',
    name: '补差金额',
    width: '100px',
    align: 'right',
    headerAlign: 'center',
    key: '补差金额',
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.amount)}</span>
    }
  },
  {
    props: 'currency',
    name: '货币',
    align: 'center',
    key: 'HUOBI',
    width: 150
  },
  { props: 'exchangeRate', name: '汇率', align: 'center', key: 'HUILV' },
  {
    props: 'startDate',
    name: '有效期起',
    align: 'center',
    key: 'YOUXIAOQIQI',
    tooltip: true,
    width: 180
  },
  {
    props: 'endDate',
    name: '有效期止',
    align: 'center',
    key: 'YOUXIAOQIZHI',
    tooltip: true,
    width: 180
  },
  {
    props: 'effectFlag',
    name: '是否生效',
    align: 'center',
    key: 'SHIFOUSHENGXIAO',
    width: 120,
    customRender: (h, scope) => {
      return <span>{scope.row.effectFlag ? '是' : '否'}</span>
    }
  },
  {
    props: 'updateDate',
    name: '更新时间',
    align: 'center',
    key: '更新时间',
    width: 180,
    tooltip: true,
  },
  {
    props: 'sourceCode',
    name: '补差来源',
    align: 'center',
    key: '补差来源',
    width: 150,
    emit: 'gotoSource',
    customRender: (h, scope) => {
      if (scope.row.sourceCode == "初始化") {
        return <span>{scope.row?.sourceCode}</span>
      } else {
        return <span class="link-text">{scope.row?.sourceCode}</span>
      }
    }
  },
]

// 计算弹窗查询
export const infoFormData = [
  {
    props: 'supplier', name: '供应商', key: 'GONGYINGSHANG', type: 'input', disabled: true
  },
  {
    props: 'dateRange', name: '补差时间段', key: '补差时间段', type: 'daterange', disabled: true
  },
  { props: 'taskStatusName', name: '状态', key: '状态', type: 'input', disabled: true },
  { props: 'balanceNo', name: '补差单编号', key: '补差单编号', type: 'input', disabled: true },
  { props: 'totalAmount', name: '补差金额（总计）', key: '补差金额（总计）', type: 'thousands', disabled: true },
  { props: 'submittedAmount', name: '已发起凭证', key: '已发起凭证', type: 'thousands', disabled: true },
  { props: 'toBeSubmitAmount', name: '待发起凭证', key: '待发起凭证', type: 'thousands', disabled: true },
  { props: 'actualMakeAmount', name: '实补金额', key: '实补金额', type: 'thousands', required: true },
]

export const computedFormData = [
  { props: 'primaryPartNum', name: '一次零件号', key: '一次零件号', type: 'iMultiLineInput' },
  { props: 'secondPartNum', name: '二次零件号', key: '二次零件号', type: 'iMultiLineInput' },
  {
    props: 'secondSupplierSapCode', name: '二次件供应商', key: '二次件供应商', type: 'select', selectOption: 'sSupplierDropDownData', optionLabel: 'code', optionSubLabel: 'message',
    optionValue: 'code',
    clearable: true,
  },
]

// 一次件计算弹窗待发起凭证
export const tableTitleBE1 = [
  {
    type: 'selection',
  }, {
    type: 'index',
    label: '#',
  }, {
    prop: 'itemNo',
    label: '项次',
    i18n: '项次',
    align: 'center',
    width: 80
  }, {
    prop: 'primaryPartNum',
    label: '一次零件号',
    i18n: '一次零件号',
    align: 'center',
    width: 150
  }, {
    prop: 'primaryPartName',
    label: '一次零件名称',
    i18n: '一次零件名称',
    align: 'center',
    width: 150
  },
  {
    prop: 'primarySupplierName',
    label: '一次件供应商名称',
    width: '100px',
    align: 'center',
    i18n: '一次件供应商名称',
    tooltip: true,
    width: 150,
    customRender: (h, scope) => {
      if(scope.row.primarySupplierSapCode)
      return <span>{scope.row.primarySupplierSapCode + '-' + scope.row.primarySupplierName}</span>
      return ''
    }
  },
  {
    prop: 'materialName',
    label: '原材料描述',
    i18n: '原材料描述',
    align: 'center',
    width: 150
  }, {
    prop: 'secondPartNum',
    label: '二次零件号',
    i18n: '二次零件号',
    align: 'center',
    width: 150
  }, {
    prop: 'secondPartName',
    label: '二次零件名称',
    i18n: '二次零件名称',
    align: 'center',
    width: 150
  },
  {
    prop: 'secondSupplierName',
    label: '二次件供应商名称',
    width: '100px',
    align: 'center',
    i18n: '二次件供应商名称',
    tooltip: true,
    width: 150,
    customRender: (h, scope) => {
      if(scope.row.secondSupplierSapCode)
      return <span>{scope.row.secondSupplierSapCode + '-' + scope.row.secondSupplierName}</span>
      return ''
    }
  },
  {
    prop: 'secondPrimaryRatio',
    label: '二次件与一次件比例',
    width: '100px',
    align: 'center',
    i18n: '二次件与一次件比例',
    width: 180
  }, {
    prop: 'ruleNo',
    label: '规则编号',
    i18n: 'GUIZEBIANHAO',
    align: 'center',
    width: 150
  }, {
    prop: 'agreementNo',
    label: '采购框架',
    i18n: '采购框架',
    align: 'center',
    width: 150
  },
  {
    prop: 'makeAmount',
    label: '补差金额',
    width: '100px',
    align: 'right',
    headerAlign: 'center',
    i18n: '补差金额',
    width: 150,
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.makeAmount)}</span>
    }
  },
  {
    prop: 'currency',
    label: '货币',
    align: 'center',
    i18n: 'HUOBI',
    width: 100
  },
  { prop: 'exchangeRate', label: '汇率', align: 'center', i18n: 'HUILV' },

  { prop: 'receiveQuantity', label: '结算数量', i18n: '结算数量', width: 120 },
  {
    prop: 'requestAmount', label: '应补金额', i18n: '应补金额', width: 120,
    align: 'right',
    headerAlign: 'center',
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.requestAmount)}</span>
    }
  },
  {
    prop: 'actualMakeAmount', label: '实补金额', i18n: '实补金额', width: 120,
    align: 'right',
    headerAlign: 'center',
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.actualMakeAmount)}</span>
    }
  },
  {
    prop: 'departmentCode',
    label: '科室',
    width: '100px',
    align: 'center',
    i18n: 'KESHI',
    width: 100
  },
  {
    prop: 'buyerName',
    label: '采购员',
    width: '100px',
    align: 'center',
    i18n: 'CAIGOUYUAN',
    width: 100
  }
]

// 一次件计算弹窗已发起凭证
export const tableTitleComplete1 = [
  {
    type: 'index',
    label: '#',
  }, {
    prop: 'primaryPartNum',
    label: '一次零件号',
    i18n: '一次零件号',
    align: 'center',
    width: 150
  }, {
    prop: 'primaryPartName',
    label: '一次零件名称',
    i18n: '一次零件名称',
    align: 'center',
    width: 150
  },
  {
    prop: 'primarySupplierName',
    label: '一次件供应商名称',
    width: '100px',
    align: 'center',
    i18n: '一次件供应商名称',
    tooltip: true,
    width: 150,
    customRender: (h, scope) => {
      if(scope.row.primarySupplierSapCode){
        return <span>{scope.row.primarySupplierSapCode + '-' + scope.row.primarySupplierName}</span>
      }
      return ''
    }
  },
  {
    prop: 'materialName',
    label: '原材料描述',
    i18n: '原材料描述',
    align: 'center',
    width: 150
  }, {
    prop: 'secondPartNum',
    label: '二次零件号',
    i18n: '二次零件号',
    align: 'center',
    width: 150
  }, {
    prop: 'secondPartName',
    label: '二次零件名称',
    i18n: '二次零件名称',
    align: 'center',
    width: 150
  },
  {
    prop: 'secondSupplierName',
    label: '二次件供应商名称',
    width: '100px',
    align: 'center',
    i18n: '二次件供应商名称',
    tooltip: true,
    width: 150,
    customRender: (h, scope) => {
      if(scope.row.secondSupplierSapCode){
        return <span>{scope.row.secondSupplierSapCode + '-' + scope.row.secondSupplierName}</span>
      }
      return ''
    }
  },
  {
    prop: 'secondPrimaryRatio',
    label: '二次件与一次件比例',
    width: '100px',
    align: 'center',
    i18n: '二次件与一次件比例',
    width: 180
  }, {
    prop: 'ruleNo',
    label: '规则编号',
    i18n: 'GUIZEBIANHAO',
    align: 'center',
    width: 150
  }, {
    prop: 'agreementNo',
    label: '采购框架',
    i18n: '采购框架',
    align: 'center',
    width: 150
  },
  {
    prop: 'makeAmount',
    label: '补差金额',
    width: '100px',
    align: 'right',
    headerAlign: 'center',
    i18n: '补差金额',
    width: 150,
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.makeAmount)}</span>
    }
  },
  {
    prop: 'currency',
    label: '货币',
    align: 'center',
    i18n: 'HUOBI',
    width: 100
  },
  { prop: 'exchangeRate', label: '汇率', align: 'center', i18n: 'HUILV' },

  { prop: 'receiveQuantity', label: '结算数量', i18n: '结算数量', width: 120 },
  {
    prop: 'requestAmount', label: '应补金额', i18n: '应补金额', width: 120,
    align: 'right',
    headerAlign: 'center',
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.requestAmount)}</span>
    }
  },
  {
    prop: 'actualMakeAmount', label: '实补金额', i18n: '实补金额', width: 120,
    align: 'right',
    headerAlign: 'center',
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.actualMakeAmount)}</span>
    }
  },
  {
    prop: 'balanceNo',
    label: '补差单编号',
    align: 'center',
    i18n: '补差单编号',
    width: 150,
  },
  {
    prop: 'departmentCode',
    label: '科室',
    width: '100px',
    align: 'center',
    i18n: 'KESHI',
    width: 100
  },
  {
    prop: 'buyerName',
    label: '采购员',
    width: '100px',
    align: 'center',
    i18n: 'CAIGOUYUAN',
    width: 100
  }
]

// 散次件计算弹窗待发起凭证
export const tableTitleBE2 = [
  {
    type: 'selection',
  }, {
    type: 'index',
    label: '#',
  }, {
    prop: 'itemNo',
    label: '项次',
    i18n: '项次',
    align: 'center',
    width: 80
  }, {
    prop: 'primaryPartNum',
    label: '一次零件号',
    i18n: '一次零件号',
    align: 'center',
    width: 150
  }, {
    prop: 'primaryPartName',
    label: '一次零件名称',
    i18n: '一次零件名称',
    align: 'center',
    width: 150
  },
  {
    prop: 'primarySupplierName',
    label: '一次件供应商名称',
    width: '100px',
    align: 'center',
    i18n: '一次件供应商名称',
    tooltip: true,
    width: 150,
    customRender: (h, scope) => {
      if(scope.row.primarySupplierSapCode)
      return <span>{scope.row.primarySupplierSapCode + '-' + scope.row.primarySupplierName}</span>
      return ''
    }
  },
  {
    prop: 'materialName',
    label: '原材料描述',
    i18n: '原材料描述',
    align: 'center',
    width: 150
  }, {
    prop: 'secondPartNum',
    label: '二次零件号',
    i18n: '二次零件号',
    align: 'center',
    width: 150
  }, {
    prop: 'secondPartName',
    label: '二次零件名称',
    i18n: '二次零件名称',
    align: 'center',
    width: 150
  },
  {
    prop: 'secondSupplierName',
    label: '二次件供应商名称',
    width: '100px',
    align: 'center',
    i18n: '二次件供应商名称',
    tooltip: true,
    width: 150,
    customRender: (h, scope) => {
      if(scope.row.secondSupplierSapCode)
      return <span>{scope.row.secondSupplierSapCode + '-' + scope.row.secondSupplierName}</span>
      return ''
    }
  },
  {
    prop: 'secondPrimaryRatio',
    label: '二次件与一次件比例',
    width: '100px',
    align: 'center',
    i18n: '二次件与一次件比例',
    width: 180
  }, {
    prop: 'ruleNo',
    label: '规则编号',
    i18n: 'GUIZEBIANHAO',
    align: 'center',
    width: 150
  }, {
    prop: 'agreementNo',
    label: '采购框架',
    i18n: '采购框架',
    align: 'center',
    width: 150
  }, {
    prop: 'agreementPrice',
    label: '框架价格',
    i18n: '框架价格',
    align: 'right',
    headerAlign: 'center',
    width: 150,
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.agreementPrice)}</span>
    }
  },
  {
    prop: 'makeAmount',
    label: '补差金额',
    width: '100px',
    align: 'right',
    headerAlign: 'center',
    i18n: '补差金额',
    width: 150,
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.makeAmount)}</span>
    }
  },
  {
    prop: 'currency',
    label: '货币',
    align: 'center',
    i18n: 'HUOBI',
    width: 100
  },
  { prop: 'exchangeRate', label: '汇率', align: 'center', i18n: 'HUILV' },

  { prop: 'receiveQuantity', label: '结算数量', i18n: '结算数量', width: 120 },
  {
    prop: 'requestAmount', label: '应补金额', i18n: '应补金额', width: 120,
    align: 'right',
    headerAlign: 'center',
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.requestAmount)}</span>
    }
  },
  {
    prop: 'actualMakeAmount', label: '实补金额', i18n: '实补金额', width: 120,
    align: 'right',
    headerAlign: 'center',
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.actualMakeAmount)}</span>
    }
  },
  {
    prop: 'departmentCode',
    label: '科室',
    width: '100px',
    align: 'center',
    i18n: 'KESHI',
    width: 100
  },
  {
    prop: 'buyerName',
    label: '采购员',
    width: '100px',
    align: 'center',
    i18n: 'CAIGOUYUAN',
    width: 100
  }
]