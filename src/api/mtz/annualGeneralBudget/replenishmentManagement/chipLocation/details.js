import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_MTZ + '/web/mtz')
const requestChip = axios(process.env.VUE_APP_MTZ + '/web/chip')
const req = axios(process.env.VUE_APP_APPROVAL + '/web')
const requestParts = axios(process.env.VUE_APP_PART)
const requestPartCode = axios(process.env.VUE_APP_MATERIEL)
const logisticpriceAPI = axios(process.env.VUE_APP_PRICELEDGER + '/web')
const supplier = axios(process.env.VUE_APP_SUPPLIER)
///查询台账信息
export function findByIdOfCostBook(parmars) {
  return logisticpriceAPI({
      url: '/costBook/findById',
      method: 'GET',
      params: parmars
  })
}
export function pageMtzNomi(parmars) {
  //mtz定点列表查询
  return request({
    url: '/mtzNomiList/pageMtzNomi',
    method: 'POST',
    data: parmars
  })
}

export function getRsBillStatusList(parmars) {
  //mtz定点RS单状态下拉
  return request({
    url: '/mtzNomiList/getRsBillStatusList',
    method: 'POST',
    data: parmars
  })
}

export function mtzFreeze(parmars) {
  //mtz定点冻结
  return request({
    url: '/mtzNomiList/mtzFreeze',
    method: 'POST',
    data: parmars
  })
}


export function mtzUnfreeze(parmars) {
  //mtz定点解冻
  return request({
    url: '/mtzNomiList/mtzUnfreeze',
    method: 'POST',
    data: parmars
  })
}

export function mtzNomi(parmars) {
  //mtz定点
  return request({
    url: '/mtzNomiList/mtzNomi',
    method: 'POST',
    data: parmars
  })
}

export function cancelMtzNomi(parmars) {
  //mtz取消定点
  return request({
    url: '/mtzNomiList/cancelMtzNomi',
    method: 'POST',
    data: parmars
  })
}

export function mtzMeetingOutFlow(parmars) {
  //mtz取消定点
  return request({
    url: '/mtzNomiList/mtzMeetingOutFlow',
    method: 'POST',
    data: parmars
  })
}

export function mtzRecall(parmars) {
  //mtz列表撤回
  return request({
    url: '/mtzNomiList/mtzRecall',
    method: 'POST',
    data: parmars
  })
}

export function mtzDel(parmars) {
  //mtz列表删除
  return request({
    url: '/mtzNomiList/mtzDel',
    method: 'POST',
    data: parmars
  })
}

export function getAppFormInfo(parmars) {
  //mtz申请单信息
  return request({
    url: '/mtzAppNomi/getAppFormInfo',
    method: 'POST',
    data: parmars
  })
}

export function modifyAppFormInfo(parmars) {
  //mtz申请单信息-编辑
  return request({
    url: '/mtzAppNomi/modifyAppFormInfo',
    method: 'POST',
    data: parmars
  })
}

export function pageAppRule(parmars) {
  //维护MTZ原材料规则-分页查询
  return request({
    url: '/mtzAppNomi/pageAppRule',
    method: 'POST',
    data: parmars
  })
}

export function pagePartMasterData(parmars) {
  //维护MTZ零件主数据-分页查询
  return request({
    url: '/mtzAppNomi/pagePartMasterData',
    method: 'POST',
    data: parmars
  })
}
// 决策资料-保存备注
export function fetchSaveCs1Remark(parmars) {
  return request({
    url: '/mtzAppNomi/saveCs1Remark',
    method: 'POST',
    data: parmars
  })
}
// 决策资料-会外流转单-查询部门
export function fetchSignPreviewDept(parmars) {
  return request({
    url: '/mtzAppNomiApprove/queryApprovalDepartment',
    method: 'POST',
    data: parmars
  })
}
// 决策资料-附件列表
export function fetchAppNomiDecisionDataPage(parmars) {
  return request({
    url: '/mtzAppNomiDecisionData/page',
    method: 'POST',
    data: parmars
  })
}
// 决策资料-附件上传
export function fetchAppNomiDecisionDataSave(parmars) {
  return request({
    url: '/mtzAppNomiDecisionData/save',
    method: 'POST',
    data: parmars
  })
}
// 决策资料-附件删除
export function fetchAppNomiDecisionDataDel(parmars) {
  return request({
    url: '/mtzAppNomiDecisionData/delete',
    method: 'POST',
    data: parmars
  })
}

export function modifyAppRule(parmars) {
  //维护MTZ原材料规则-编辑
  return request({
    url: '/mtzAppNomi/modifyAppRule',
    method: 'POST',
    data: parmars
  })
}

export function updateAppRule(parmars) {
  //维护MTZ原材料规则-单条修改
  return request({
    url: '/mtzAppNomi/updateAppRule',
    method: 'POST',
    data: parmars
  })
}

// export function pagePartNomiApp(parmars) {//零件定点申请-分页查询
//     return request({
//         url: '/mtzAppNomi/pagePartNomiApp',
//         method: 'POST',
//         data: parmars,
//     })
// }

export function deleteRejectReasonAttach(parmars) {
  //删除附件(软删除)
  return request({
    url: '/mtzBalance/deleteRejectReasonAttach',
    method: 'POST',
    data: parmars
  })
}

export function saveRejectReason(parmars) {
  //保存拒绝理由
  return request({
    url: '/mtzBalance/saveRejectReason',
    method: 'POST',
    data: parmars
  })
}

export function getRejectReasonAndFile(parmars) {
  //根据ID获取拒绝理由和附件列表
  return request({
    url: '/mtzBalance/getRejectReasonAndFile/' + parmars,
    method: 'GET'
  })
}

export function relation(parmars) {
  //关联
  return request({
    url: '/mtzAppNomi/relation',
    method: 'POST',
    data: parmars
  })
}

export function disassociate(parmars) {
  //取消关联
  return request({
    url: '/mtzAppNomi/disassociate',
    method: 'POST',
    data: parmars
  })
}

export function pageAppRuleHistory(parmars) {
  //维护MTZ原材料规则-沿用分页查询
  return request({
    url: '/mtzAppNomi/pageAppRuleHistory',
    method: 'POST',
    data: parmars
  })
}

export function getMtzMarketSourceList(params) {
  //获取MTZ市场价来源下拉框
  return request({
    url: '/commonDropDown/getMtzMarketSourceList',
    method: 'GET',
    params: params
  })
}

export function pageHistoryPartMasterData(params) {
  //维护MTZ零件主数据-历史数据
  return request({
    url: '/mtzAppNomi/pageHistoryPartMasterData',
    method: 'POST',
    data: params
  })
}

export function addAppRule(params) {
  //维护MTZ原材料规则-新增
  return request({
    url: '/mtzAppNomi/addAppRule',
    method: 'POST',
    data: params
  })
}

export function deleteAppRule(params) {
  //维护MTZ原材料规则-删除
  return request({
    url: '/mtzAppNomi/deleteAppRule',
    method: 'POST',
    data: params
  })
}

export function addBatchAppRule(params) {
  //维护MTZ原材料规则-批量新增
  return request({
    url: '/mtzAppNomi/addBatchAppRule',
    method: 'POST',
    data: params
  })
}

export function addBatchPartMasterData(params) {
  //维护MTZ零件主数据-新增多条
  return request({
    url: '/mtzAppNomi/addBatchPartMasterData',
    method: 'POST',
    data: params
  })
}

export function modifyPartMasterData(params) {
  //维护MTZ零件主数据-编辑多条
  return request({
    url: '/mtzAppNomi/modifyPartMasterData',
    method: 'POST',
    data: params
  })
}

export function addPartMasterData(params) {
  //维护MTZ零件主数据-新增
  return request({
    url: '/mtzAppNomi/addPartMasterData',
    method: 'POST',
    data: params
  })
}

export function deletePartMasterData(params) {
  //维护MTZ零件主数据-删除
  return request({
    url: '/mtzAppNomi/deletePartMasterData',
    method: 'POST',
    data: params
  })
}

export function mtzAppNomiSubmit(params) {
  //提交
  return request({
    url: '/mtzAppNomi/submit',
    method: 'POST',
    data: params
  })
}


export function getDeptLimitLevel(params) {
  //科室下拉选择
  return request({
    url: '/commonDropDown/getDeptLimitLevel',
    method: 'POST',
    data: params
  })
}

export function getCurrentUser(params) {
  //获取采购员
  return request({
    url: '/commonDropDown/getCurrentUser',
    method: 'POST',
    data: params
  })
}


export function getSupplierByUser(params) {
  //获取供应商下拉选择(当前用户权限)
  return request({
    url: '/commonDropDown/getSupplierByUser',
    method: 'POST',
    data: params
  })
}
export function getOneSecondPartNo(params) {
  //一次、二次零件号下拉选择
  return request({
    url: '/commonDropDown/getOneSecondPartNo',
    method: 'POST',
    data: params
  })
}
export function getDosageUnitList(params) {
  //用量单位下拉
  return request({
    url: '/mtzNomiList/getDosageUnitList',
    method: 'POST',
    data: params
  })
}

export function getMtzNomiRuleBuyer(parmars) {//mtz沿用规则采购员下拉
  return request({
    url: '/mtzNomiList/getMtzNomiRuleBuyer',
    method: 'POST',
    data: parmars
  })
}

// ================= chip ==================
// ================= chip ==================
// ================= chip ==================
// ================= chip ==================
// ================= chip ==================
// ================= chip ==================
// ================= chip ==================
// ================= chip ==================
// ================= chip ==================
// ================= chip ==================
// ================= chip ==================
// ================= chip ==================
// ================= chip ==================
// ================= chip ==================
// ================= chip ==================
// ================= chip ==================
// ================= chip ==================
// ================= chip ==================
// ================= chip ==================
// ================= chip ==================
// ================= chip ==================

// 根据零件号查询零件信息
export function validationPart(params) {
  return requestParts({
    url: `/part`,
    params,
  })
}

export function getFlowTypeList(parmars) {
  //mtz定点流程类型下拉
  return request({
    url: '/mtzNomiList/getFlowTypeList',
    method: 'POST',
    data: parmars
  })
}


// 查询
export function getAppList(data) {
  return requestChip({
    url: '/getAppList',
    method: 'POST',
    data
  })
}
// 获取单个定点申请单
export function getAppById(params) {
  return requestChip({
    url: '/getAppById',
    method: 'POST',
    params
  })
}
// 芯片补差新增，初始化
export function addAppInit(params) {
  return requestChip({
    url: '/addAppInit',
    method: 'POST',
    params
  })
}
// 冻结
export function freezeData(data) {
  return requestChip({
    url: '/freeze',
    method: 'POST',
    data
  })
}
// 解冻
export function unFreeze(data) {
  return requestChip({
    url: '/unFreeze',
    method: 'POST',
    data
  })
}
// 会外流转
export function meetingOutFlow(data) {
  return requestChip({
    url: '/meetingOutFlow',
    method: 'POST',
    data
  })
}
// 定点
export function nominateData(data) {
  return requestChip({
    url: '/nominate',
    method: 'POST',
    data
  })
}
// 取消定点
export function unNominate(data) {
  return requestChip({
    url: '/unNominate',
    method: 'POST',
    data
  })
}
// 撤回
export function recallData(data, params) {
  return requestChip({
    url: '/recall',
    method: 'POST',
    params,
    data
  })
}
// 退回
export function sendBack(data, params) {
  return requestChip({
    url: '/sendBack',
    method: 'POST',
    params,
    data
  })
}
// 删除
export function deleteData(data) {
  return requestChip({
    url: '/delete',
    method: 'POST',
    data
  })
}

// 更新保存申请单
export function updateApp(data) {
  return requestChip({
    url: '/updateApp',
    method: 'POST',
    data
  })
}

// 申请单新增规则校验
export function addAppDetailCheck(params) {
  return requestChip({
    url: '/addAppDetailCheck',
    method: 'POST',
    params
  })
}

// 申请单新增规则保存
export function addAppDetail(data, appId) {
  return requestChip({
    url: `/addAppDetail?appId=${appId}`,
    method: 'POST',
    data
  })
}

// 通过零件号获取零件Id
export function getPartCodeId(data) {
  return requestPartCode({
    url: "/web/part",
    method: "GET",
    params: data
  })
}

// 删除规则
export function deleteAppDetail(data) {
  return requestChip({
    url: "/deleteAppDetail",
    method: "POST",
    data
  })
}

// 申请单规则沿用查询
export function getAppRecordByCondition(data) {
  return requestChip({
    url: "/getAppRecordByCondition",
    method: "POST",
    data
  })
}

// 
// 新增申请单审批人初始化
export function syncAuther(params) {
  return requestChip({
    url: '/syncAuther',
    method: 'POST',
    params
  })
}

//审批⼈&审批记录-分页查询
export function pageApprove(params) {
  return requestChip({
    url: '/pageApprove',
    method: 'POST',
    params
  })
}

// 申请单审批人保存更新
export function modifyApprove(data, appId) {
  return requestChip({
    url: `/modifyApprove?appId=${appId}`,
    method: "POST",
    data
  })
}

//审批⼈&审批记录-删除
export function deleteApprove(data) {
  return requestChip({
    url: '/deleteApprove',
    method: 'POST',
    data
  })
}

// 提交申请单
export function submit(params) {
  return requestChip({
    url: '/submit',
    method: 'POST',
    params
  })
}

//保存会议
export function saveMeeting(data) {
  return requestChip({
    url: '/saveMeeting',
    method: 'POST',
    data
  })
}

// 申请单审批附件-查询
export function searchAtta(params) {
  return requestChip({
    url: '/searchAtta',
    method: 'POST',
    params
  })
}

// 申请单-查询附件
export function getAtta(params) {
  return requestChip({
    url: '/getAtta',
    method: 'POST',
    params
  })
}

// 申请单附件-保存
export function saveAtta(params) {
  return requestChip({
    url: '/saveAtta',
    method: 'POST',
    params
  })
}

// 申请单附件-删除
export function deleteAtta(data) {
  return requestChip({
    url: '/deleteAtta',
    method: 'POST',
    data
  })
}

// 申请单审批人-获取部门科室审批人下拉数据
export function selectDept(params) {
  return requestChip({
    url: '/selectDept',
    method: 'POST',
    params
  })
}

// 上传数据
export function uploadData(data, params) {
  return requestChip({
    url: '/uploadData',
    method: 'POST',
    data,
    params
  })
}

// 下载模板
export function downloadFile(params) {
  return requestChip({
    url: '/downloadFile',
    method: 'POST',
    params,
    responseType: 'blob'
  })
}

// 数据库生效,失效
export function partEnable(data, params) {
  return requestChip({
    url: '/partEnable',
    method: 'POST',
    params,
    data
  })
}

// 导出-数据库
export function exportAppRecordByCondition(data) {
  return requestChip({
    url: '/exportAppRecordByCondition',
    method: 'POST',
    data,
    responseType: 'blob'
  })
}

// 获取定点科室和采购员数据
export function getDeptAndBuyerByChipNom(params) {
  return requestChip({
    url: "/getDeptAndBuyerByChipNomi",
    method: "POST",
    params
  })
}

// 芯片定点决策资料-审批列表
export function approvalList(params) {
  //用量单位下拉
  return requestChip({
    url: '/approvalList',
    method: 'POST',
    params
  })
}

//审批记录
export function approvalRecordList(params) {
  return requestChip({
    url: '/approvalRecordList',
    method: 'POST',
    params
  })
}

// 通过供应商SAPCode,查询供应商信息
export function getSupplierInfoBySap(data) {
  return supplier({
    url: "/web/register/basic/supplierInfoQuery",
    method: "POST",
    data: data
  })
}

export function getLocationApplyStatus(parmars) {
  //mtz定点申请状态下拉
  return request({
    url: '/mtzNomiList/getLocationApplyStatus',
    method: 'POST',
    data: parmars
  })
}