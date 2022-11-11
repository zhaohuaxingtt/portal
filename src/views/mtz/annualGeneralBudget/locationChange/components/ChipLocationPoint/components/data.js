/*
 * @Author: your name
 * @Date: 2022-02-07 10:34:32
 * @LastEditTime: 2022-03-02 17:01:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\data.js
 */

export const searchFormData = [
  { props: 'appNo', name: '申请单号', key: 'SHENQINGDANHAO' },
  { props: 'workflowType', name: '流程类型', key: 'LIUCHENGLEIXING', type: 'select', selectOption: 'flowTypeList', multiple: true },
  { props: 'status', name: '申请状态', key: 'SHENQINGZHUANGTAI', type: 'select', selectOption: 'locationApplyStatus', multiple: true },
  { props: 'partNum', name: '零件号', key: 'LINGJIANHAO', type: "iMultiLineInput" },
  { props: 'deptName', name: '科室', key: 'KESHI', type: 'select', selectOption: 'deptList', multiple: true },
  { props: 'linieName', name: '采购员', key: 'CAIGOUYUAN', type: 'select', selectOption: 'linieList', multiple: true },
  { props: 'nominateDate', name: '定点时间', key: '定点时间', type: 'daterange' }
]

export const tableTitle = [
  { props: 'appNo', name: '申请单号', key: 'SHENQINGDANHAO', width: 120 },
  {
    props: 'appName',
    name: '申请单名称',
    key: 'SHENQINGDANMINGCHENG',
    width: 300,
    tooltip: true
  },
  {
    props: 'type',
    name: '流程类型',
    key: 'LIUCHENGLEIXING',
    width: 100
  },
  {
    props: 'status',
    name: '申请状态',
    key: 'SHENQINGZHUANGTAI',
    width: 100
  },
  {
    props: 'meetingName',
    name: '会议',
    key: 'HUIYI',
    width: 300,
    tooltip: true
  },
  {
    props: 'freezeDate',
    name: '冻结时间',
    key: 'DONGJIESHIJIAN',
    width: 125
  },
  {
    props: 'nominateDate',
    name: '定点时间',
    key: 'DINGDIANSHIJIAN',
    width: 125
  },
  { props: 'linieName', name: '采购员', key: 'CAIGOUYUAN' },
  { props: 'depteCode', name: '科室', key: 'KESHI' }
]

export const tableTitleCp = [
  { props: 'name', name: '会议名称', key: 'HUIYIMINGCHENG' },
  { props: 'meetingTypeName', name: '会议类型', key: 'HUIYILEIXING' },
  { props: 'startDate', name: '开始日期', key: 'KAISHIRIQI' },
  { props: 'startTime', name: '开始时间', key: 'KAISHISHIJIAN' },
  { props: 'meetingPlace', name: '会议地点', key: 'HUIYIDIDIAN' }
]

// 步骤条
export const topImgList = [
  {
    id: 1,
    name: '芯片补差申请单详情',
    key: '芯片补差申请单详情',
    url: '/mtz/annualGeneralBudget/locationChange/chipLocationPoint/overflow/applyInfor'
  },
  {
    id: 2,
    name: '审批人&审批记录',
    key: 'SHENGPIRENSHENGPIJILU',
    url: '/mtz/annualGeneralBudget/locationChange/chipLocationPoint/overflow/approverRecord'
  },
  {
    id: 3,
    name: '决策资料',
    key: 'JUECEZILIAO',
    url: '/mtz/annualGeneralBudget/locationChange/chipLocationPoint/overflow/decisionMaterial'
  }
]

// 申请单状态
export const appStatus = [
  {
    "code": "NEW",
    "message": "草稿",
    "codeMessage": null
  },
  {
    "code": "SUBMIT",
    "message": "已提交",
    "codeMessage": null
  },
  {
    "code": "APPROVAL_LOADING",
    "message": "审批中",
    "codeMessage": null
  },
  {
    "code": "NOTPASS",
    "message": "未通过",
    "codeMessage": null
  },
  {
    "code": "PASS",
    "message": "通过",
    "codeMessage": null
  },
  {
    "code": "WAIT_APPROVAL",
    "message": "等待审批",
    "codeMessage": null
  },
  {
    "code": "APPROVED",
    "message": "审批通过",
    "codeMessage": null
  },
  {
    "code": "REJECT_APPROVALED",
    "message": "审批拒绝",
    "codeMessage": null
  },
  {
    "code": "CHECK_INPROCESS",
    "message": "复核中",
    "codeMessage": null
  },
  {
    "code": "CHECK_PASS",
    "message": "复核通过",
    "codeMessage": null
  },
  {
    "code": "CHECK_FAIL",
    "message": "复核未通过",
    "codeMessage": null
  },
  {
    "code": "FREERE",
    "message": "冻结",
    "codeMessage": null
  },
  {
    "code": "UNFREEZE",
    "message": "解冻",
    "codeMessage": null
  },
  {
    "code": "M_CHECK_INPROCESS",
    "message": "M审批中",
    "codeMessage": null
  },
  {
    "code": "M_CHECK_FAIL",
    "message": "M退回",
    "codeMessage": null
  },
  {
    "code": "M_CHECK_PASS",
    "message": "M审批通过",
    "codeMessage": null
  },
  {
    "code": "NOMINATE",
    "message": "定点",
    "codeMessage": null
  },
  {
    "code": "ONFLOW",
    "message": "流转中",
    "codeMessage": null
  },
  {
    "code": "FLOWED",
    "message": "流转完成",
    "codeMessage": null
  },
  {
    "code": "FLOWED_FAIL",
    "message": "流转不通过",
    "codeMessage": null
  }
]
