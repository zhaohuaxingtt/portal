/*补差单号
 * @Author: your name
 * @Date: 2021-10-09 15:06:29
 * @LastEditTime: 2023-01-18 09:40:11
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\chipSupplementaryList\components\data.js
 */
import popover from "./popover.vue";

// 首页查询条件
export const queryFormData = [
  { props: 'balanceNo', name: '补差单号', key: '补差单号', type: 'input' },
  { props: 'balanceId', name: '凭证Id', key: '凭证Id', type: 'input' },
  {
    props: 'primarySupplier', name: '一次件供应商', key: '一次件供应商', type: 'select', selectOption: 'fsupplierList', optionLabel: 'message',
    optionValue: 'code', clearable: true, showAll: true
  },
  {
    props: 'secondSupplier', name: '二次件供应商', key: 'ECJGYS', type: 'select', selectOption: 'ssupplierList', optionLabel: 'message',
    optionValue: 'code', clearable: true, showAll: true
  },
  {
    props: 'status', name: '单据状态', key: '单据状态', type: 'select', selectOption: 'approvalStatus', optionLabel: 'message',
    optionValue: 'code', clearable: true, showAll: true
  },
  { props: 'agreementNo', name: '采购框架号', key: '采购框架号', type: 'input' },

  { props: 'compDate', name: '补差时间段', key: 'BUCHASHIJIANDUAN', type: 'daterange', clearable: true, },
  {
    props: 'departmentCode', name: '科室', key: 'KESHI', type: 'select', selectOption: 'departmentDropDownData', optionLabel: 'message',
    optionValue: 'code'
  },
  {
    props: 'buyerName', name: '采购员', key: 'CAIGOUYUAN', type: 'select', selectOption: 'linieDropDownData', optionLabel: 'message',
    optionValue: 'message'
  },
  { props: 'primaryPartNum', name: '一次件零件号', key: 'YICIJIANLINGJIANHAO', type: 'iMultiLineInput' },
  { props: 'secondPartNum', name: '二次件零件号', key: 'ERCIJIANLINGJIANHAO', type: 'iMultiLineInput' },
]

// 一次件供应商
export const tableTitle = [
  {
    type: 'selection',
    label: '#'
  },
  {
    type: 'index',
    label: '#',
  }, {
    prop: 'balanceNo',
    label: '补差单号',
    i18n: 'BUCHADANHAO',
    align: 'center',
    minWidth: 150,
    emit: 'openPage',
    customRender: (h, scope) => {
      return <span class="link">{scope.row.balanceNo}</span>
    }
  }, {
    prop: 'id',
    label: '凭证ID',
    i18n: 'PINGZHENGID',
    align: 'center',
    minWidth: 120,
  }, {
    prop: 'supplierName',
    label: '一次件供应商',
    i18n: 'YICIJIANGONGYINGSHANG',
    align: 'center',
    minWidth: 150,
    customRender: (h, scope) => {
      return <span>{scope.row.supplierSapCode + '-' + scope.row.supplierName}</span>
    }
  }, {
    prop: 'departmentCode',
    label: '科室',
    i18n: 'KESHI',
    align: 'center',
    minWidth: 150,
  }, {
    prop: 'buyerName',
    label: '采购员',
    i18n: 'CAIGOUYUAN',
    align: 'center',
    minWidth: 150
  }, {
    prop: 'monthFromTo',
    label: '补差时间段',
    i18n: '补差时间段',
    align: 'center',
    tooltip: true,
    minWidth: 150,
    customRender: (h, scope) => {
      return (
        <div>
          <span>{window.moment(scope.row.startFrom).format('YYYY-MM-DD') || '-'}</span>
          <br />
          <span>{window.moment(scope.row.endTo).format('YYYY-MM-DD') || '-'}</span>
        </div>
      )
    }
  },
  {
    prop: 'actualMakeAmount',
    label: '实际补差金额',
    i18n: '实际补差金额',
    align: 'center',
    minWidth: 150,
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.actualMakeAmount)}</span>
    }
  },
  {
    prop: 'statusName',
    label: '单据状态',
    i18n: 'DANJUZHUANGTAI',
    align: 'center',
    tooltip: true,
    minWidth: 150,
    customRender: (h, scope, c, e) => {
      console.log(scope.row);
      if (['审批中', '审批通过', '审批不通过', '审批退回-补充材料', 'EPMS审批中', 'EPMS审批不通过', 'EPMS审批通过', 'EPMS审批退回-补充材料'].includes(scope.row.statusName)) {
        return <popover instanceId={scope.row.workflowId} epmsId={scope.row.id} statusName={scope.row.statusName}></popover>
      } else {
        return <span> {scope.row.statusName}</span>
      }
    }
  },
]
// 补差单明细信息
export const tabsInforList = [
  {
    name: '凭证ID',
    key: 'PINGZHENGID',
    prop: 'id'
  },
  {
    name: '供应商',
    key: 'GONGYINGSHANG',
    prop: 'supplierName'
  },
  {
    name: '补差时间段',
    key: 'BUCHASHIJIANDUAN',
    prop: 'startFrom'
  },
  {
    name: '科室',
    key: 'KESHI',
    prop: 'departmentCode'
  },
  {
    name: '采购员',
    key: 'CAIGOUYUAN',
    prop: 'buyerName'
  },
  {
    name: '申请日期',
    key: 'SHENQINGRIQI',
    prop: 'createDate'
  },
  {
    name: '应补总额 (RMB)',
    key: 'YINGBUZONGE',
    prop: 'requestAmount'
  },
  {
    name: '实补总额 (RMB)',
    key: 'SHIBUZONGE',
    prop: 'actualMakeAmount'
  }
]
// 补差单汇总TAB
export const tableTitleOverview = [
  { props: 'agreementNo', name: '采购框架', key: 'CAIGOUKUANGJIA' },
  { props: 'agreementItemNo', name: '项目', key: 'XIANGMU' },
  { props: 'partNum', name: '零件号', key: 'LINGJIANHAO' },
  { props: 'invoiceQuantity', name: '零件数量', key: 'LINGJIANSHULIANG' },
  { props: 'makeAmount', name: '补差金额', key: '补差金额' },
  { props: 'requestAmount', name: '应补总额', key: '应补总额' },
  { props: 'actualMakeAmount', name: '实际补差总额', key: '实际补差总额' },
]
// 补差单明细TAB
export const tableTitleDetail = [
  { props: 'primaryPartNum', name: '一次件零件号', key: 'YCJLJH', width: 120 },
  {
    props: 'primarySupplierName',
    name: '一次件供应商',
    key: 'YICIJIANGONGYINGSHANG',
    align: 'center',
    minWidth: 220,
  }, {
    //   props: 'materialGroup',
    //   name: '材料组',
    //   key: 'CAILIAOZU',
    //   align: 'center',
    //   minWidth: 100,
    // }, {
    props: 'materialName',
    name: '原材料描述',
    key: '原材料描述',
    align: 'center',
    width: 120
  },
  { props: 'secondPartNum', name: '二次件零件号', key: 'ECJLJH', width: 120 },
  {
    props: 'secondSupplierName',
    name: '二次件供应商',
    key: 'ERCIJIANGONGYINGSHANG',
    minWidth: 200
  },
  {
    props: 'secondPrimaryRatio',
    name: '二次件与一次件比例',
    width: '100px',
    align: 'center',
    key: '二次件与一次件比例',
    width: 150
  }, {
    props: 'ruleNo',
    name: '规则编号',
    key: 'GUIZEBIANHAO',
    align: 'center',
    width: 150
  }, {
    props: 'agreementNo',
    name: '采购框架',
    key: '采购框架',
    align: 'center',
    width: 150
  },
  { props: 'agreementItemNo', name: '项目号', key: 'XIANGMUHAO', width: 70 },
  {
    props: 'makeAmount',
    name: '补差金额',
    width: '100px',
    align: 'center',
    key: '补差金额',
    width: 120
  },
  { props: 'receiveQuantity', name: '结算数量', key: '结算数量', width: 120 },
  { props: 'requestAmount', name: '应补总额', key: '应补总额', width: 120 },
  { props: 'actualMakeAmount', name: '实补总额', key: '实补总额', width: 120 },
  // { props: 'approvedAmount', name: '审批总额', key: '审批总额', width: 120 },
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
  }, {
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
  }, {
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
// 弹窗查询条件
export const searchFormData = [
  {
    props: 'agreementNo', name: '采购框架', key: 'CAIGOUKUANGJIA', type: 'input'
  },
  {
    props: 'primaryPartNum', name: '一次件零件号', key: 'YICIJIANLINGJIANHAO', type: 'input'
  },
  { props: 'secondPartNum', name: '二次件零件号', key: 'ERCIJIANLINGJIANHAO', type: 'input' },
  {
    props: 'secondSupplierSapCode', name: '二次件供应商', key: 'ECJGYS', type: 'select', selectOption: 'secondSupplierList', clearable: true, showAll: true, optionLabel: 'message',
    optionValue: 'code',
    optionLabelEn: 'message'
  },
  { props: 'dateTime', name: '补差时间段', key: 'BUCHASHIJIANDUAN', type: 'daterange' },
]