import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_MTZ + '/web/mtz')
const req = axios(process.env.VUE_APP_APPROVAL + '/web')

export function pageMtzNomi(parmars) {
  //mtz定点列表查询
  return request({
    url: '/mtzNomiList/pageMtzNomi',
    method: 'POST',
    data: parmars
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

export function getLocationApplyStatus(parmars) {
  //mtz定点申请状态下拉
  return request({
    url: '/mtzNomiList/getLocationApplyStatus',
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

export function getPartBalanceCountType(parmars) {
  //零件数量类型
  return request({
    url: '/mtzAppNomi/getPartBalanceCountType?sapCode='+parmars,
    method: 'GET',
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
export function getFirstRuleByNos(data) {
  //根据规则编号查询版本为1的规则信息
  return request({
    url: '/mtzAppNomi/getFirstRuleByNos',
    method: 'POST',
    data
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
export function upAppRule(params) {
  //维护MTZ原材料规则-批量升版
  return request({
    url: '/mtzAppNomi/upAppRule',
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

export function mtzConfirm(params) {
  //mtz列表确认
  return request({
    url: '/mtzNomiList/mtzConfirm',
    method: 'POST',
    data: params
  })
}

export function saveMeeting(params) {
  //保存会议
  return request({
    url: '/mtzAppNomi/saveMeeting',
    method: 'POST',
    data: params
  })
}

export function listPartNumSupplierIdData(params) {
  //查询跳转后零件主数据展示
  return request({
    url: '/mtzAppNomi/listPartNumSupplierIdData',
    method: 'POST',
    data: params
  })
}

export function checkPreciousMetal(params) {
  //判断是否为贵金属
  return request({
    url: '/common/checkPreciousMetal',
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

export function getMtzGenericAppId(params) {
  //获取MTZ申请单号
  return request({
    url: '/commonDropDown/getMtzGenericAppId',
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

export function queryMaterialList(params) {
  //获取基价计量单位
  return request({
    url: '/common/queryMaterialList',
    method: 'POST',
    data: params
  })
}

export function getRawMaterial(params) {
  //原材料牌号下拉选择(材料小类)
  return request({
    url: '/commonDropDown/getRawMaterial',
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

export function getMtzRuleCode(params) {
  //获取MTZ规则编号
  return request({
    url: '/commonDropDown/getMtzRuleCode',
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

export function getMtzAppCheckVO(params) {
  //获取值
  return request({
    url: '/mtzAppNomi/getMtzAppCheckVO',
    method: 'POST',
    data: params
  })
}

export function setMtzAppCheckVO(params) {
  //设置值
  return request({
    url: '/mtzAppNomi/setMtzAppCheckVO',
    method: 'POST',
    data: params
  })
}

export function removePartMasterData(params) {
  //清空维护mtz零件主数据
  return request({
    url: '/mtzAppNomi/removePartMasterData',
    method: 'POST',
    data: params
  })
}

export function downloadFile(params) {//下载
  return request({
    url: '/mtzAppNomi/downloadFile',
    method: 'POST',
    data: params,
    responseType: 'blob',
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
// export function panorama(params) {
//   //用量单位下拉
//   return req({
//     url: '/preview/panorama/' + params,
//     method: 'GET',
//     data: params
//   })
// }
export function approvalList(params) {
  //用量单位下拉
  return request({
    url: '/mtzAppNomiDecisionData/approvalList',
    method: 'POST',
    data: params
  })
}

export function getPreciousMetalDosageUnit(params) {//贵金属单位下拉
  return request({
    url: '/mtzNomiList/getPreciousMetalDosageUnit',
    method: 'POST',
    data: params
  })
}

export function downloadError(params) {//导出错误信息
  return request({
    url: '/mtzAppNomi/downloadError',
    method: 'POST',
    responseType: 'blob',
    data: params
  })
}

export function transferNomi(parmars) {
  //mtz转派
  return request({
    url: '/mtzNomiList/transferNomi',
    method: 'POST',
    data: parmars
  })
}
export function getNominateAppIdList(parmars) {//关联单号下拉
  return request({
    url: '/mtzNomiList/getNominateAppIdList',
    method: 'POST',
    data: parmars
  })
}

export function getMtzNomiRuleBuyer(parmars) {//mtz沿用规则采购员下拉
  return request({
    url: '/mtzNomiList/getMtzNomiRuleBuyer',
    method: 'POST',
    data: parmars
  })
}