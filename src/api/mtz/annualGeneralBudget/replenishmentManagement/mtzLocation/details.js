import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_MTZ + '/web/mtz')

export function pageMtzNomi(parmars) {//mtz定点列表查询
    return request({
        url: '/mtzNomiList/pageMtzNomi',
        method: 'POST',
        data: parmars,
    })
}

export function getFlowTypeList(parmars) {//mtz定点流程类型下拉
    return request({
        url: '/mtzNomiList/getFlowTypeList',
        method: 'POST',
        data: parmars,
    })
}

export function getLocationApplyStatus(parmars) {//mtz定点申请状态下拉
    return request({
        url: '/mtzNomiList/getLocationApplyStatus',
        method: 'POST',
        data: parmars,
    })
}

export function getRsBillStatusList(parmars) {//mtz定点RS单状态下拉
    return request({
        url: '/mtzNomiList/getRsBillStatusList',
        method: 'POST',
        data: parmars,
    })
}

export function mtzFreeze(parmars) {//mtz定点冻结
    return request({
        url: '/mtzNomiList/mtzFreeze',
        method: 'POST',
        data: parmars,
    })
}

export function mtzUnfreeze(parmars) {//mtz定点解冻
    return request({
        url: '/mtzNomiList/mtzUnfreeze',
        method: 'POST',
        data: parmars,
    })
}

export function mtzNomi(parmars) {//mtz定点
    return request({
        url: '/mtzNomiList/mtzNomi',
        method: 'POST',
        data: parmars,
    })
}

export function cancelMtzNomi(parmars) {//mtz取消定点
    return request({
        url: '/mtzNomiList/cancelMtzNomi',
        method: 'POST',
        data: parmars,
    })
}

export function mtzMeetingOutFlow(parmars) {//mtz取消定点
  return request({
      url: '/mtzNomiList/mtzMeetingOutFlow',
      method: 'POST',
      data: parmars,
  })
}

export function mtzRecall(parmars) {//mtz列表撤回
    return request({
        url: '/mtzNomiList/mtzRecall',
        method: 'POST',
        data: parmars,
    })
}

export function mtzDel(parmars) {//mtz列表删除
    return request({
        url: '/mtzNomiList/mtzDel',
        method: 'POST',
        data: parmars,
    })
}

export function getAppFormInfo(parmars) {//mtz申请单信息
    return request({
        url: '/mtzAppNomi/getAppFormInfo',
        method: 'POST',
        data: parmars,
    })
}

export function modifyAppFormInfo(parmars) {//mtz申请单信息-编辑
    return request({
        url: '/mtzAppNomi/modifyAppFormInfo',
        method: 'POST',
        data: parmars,
    })
}

export function pageAppRule(parmars) {//维护MTZ原材料规则-分页查询
    return request({
        url: '/mtzAppNomi/pageAppRule',
        method: 'POST',
        data: parmars,
    })
}

export function pagePartMasterData(parmars) {//维护MTZ零件主数据-分页查询
    return request({
        url: '/mtzAppNomi/pagePartMasterData',
        method: 'POST',
        data: parmars,
    })
}
// 决策资料-保存备注
export function fetchSaveCs1Remark(parmars) {
  return request({
      url: '/mtzAppNomi/saveCs1Remark',
      method: 'POST',
      data: parmars,
  })
}
// 决策资料-会外流转单-查询部门
export function fetchSignPreviewDept(parmars) {
  return request({
      url: '/mtzAppNomiApprove/queryApprovalDepartment',
      method: 'POST',
      data: parmars,
  })
}
// 决策资料-附件列表
export function fetchAppNomiDecisionDataPage(parmars) {
  return request({
      url: '/mtzAppNomiDecisionData/page',
      method: 'POST',
      data: parmars,
  })
}
// 决策资料-附件上传
export function fetchAppNomiDecisionDataSave(parmars) {
  return request({
      url: '/mtzAppNomiDecisionData/save',
      method: 'POST',
      data: parmars,
  })
}
// 决策资料-附件删除
export function fetchAppNomiDecisionDataDel(parmars) {
  return request({
      url: '/mtzAppNomiDecisionData/delete',
      method: 'POST',
      data: parmars,
  })
}

export function modifyAppRule(parmars) {//维护MTZ原材料规则-编辑
    return request({
        url: '/mtzAppNomi/modifyAppRule',
        method: 'POST',
        data: parmars,
    })
}

export function updateAppRule(parmars) {//维护MTZ原材料规则-单条修改
    return request({
        url: '/mtzAppNomi/updateAppRule',
        method: 'POST',
        data: parmars,
    })
}

// export function pagePartNomiApp(parmars) {//零件定点申请-分页查询
//     return request({
//         url: '/mtzAppNomi/pagePartNomiApp',
//         method: 'POST',
//         data: parmars,
//     })
// }

export function deleteRejectReasonAttach(parmars) {//删除附件(软删除)
    return request({
        url: '/mtzBalance/deleteRejectReasonAttach',
        method: 'POST',
        data:parmars
    })
}

export function saveRejectReason(parmars) {//保存拒绝理由
    return request({
        url: '/mtzBalance/saveRejectReason',
        method: 'POST',
        data:parmars
    })
}

export function getRejectReasonAndFile(parmars) {//根据ID获取拒绝理由和附件列表
    return request({
        url: '/mtzBalance/getRejectReasonAndFile/'+ parmars,
        method: 'GET',
    })
}

export function relation(parmars) {//关联
    return request({
        url: '/mtzAppNomi/relation',
        method: 'POST',
        data: parmars,
    })
}

export function disassociate(parmars) {//取消关联
    return request({
        url: '/mtzAppNomi/disassociate',
        method: 'POST',
        data: parmars,
    })
}

export function pageAppRuleHistory(parmars) {//维护MTZ原材料规则-沿用分页查询
    return request({
        url: '/mtzAppNomi/pageAppRuleHistory',
        method: 'POST',
        data: parmars,
    })
}

export function getMtzMarketSourceList(params) {//获取MTZ市场价来源下拉框
    return request({
        url: '/commonDropDown/getMtzMarketSourceList',
        method: 'GET',
        params: params,
    })
}

export function pageHistoryPartMasterData(params) {//维护MTZ零件主数据-历史数据
    return request({
        url: '/mtzAppNomi/pageHistoryPartMasterData',
        method: 'POST',
        data: params,
    })
}

export function addAppRule(params) {//维护MTZ原材料规则-新增
    return request({
        url: '/mtzAppNomi/addAppRule',
        method: 'POST',
        data: params,
    })
}

export function deleteAppRule(params) {//维护MTZ原材料规则-删除
    return request({
        url: '/mtzAppNomi/deleteAppRule',
        method: 'POST',
        data: params,
    })
}

export function addBatchAppRule(params) {//维护MTZ原材料规则-批量新增
    return request({
        url: '/mtzAppNomi/addBatchAppRule',
        method: 'POST',
        data: params,
    })
}

export function addBatchPartMasterData(params) {//维护MTZ零件主数据-新增多条
    return request({
        url: '/mtzAppNomi/addBatchPartMasterData',
        method: 'POST',
        data: params,
    })
}

export function modifyPartMasterData(params) {//维护MTZ零件主数据-编辑多条
    return request({
        url: '/mtzAppNomi/modifyPartMasterData',
        method: 'POST',
        data: params,
    })
}

export function addPartMasterData(params) {//维护MTZ零件主数据-新增
    return request({
        url: '/mtzAppNomi/addPartMasterData',
        method: 'POST',
        data: params,
    })
}

export function deletePartMasterData(params) {//维护MTZ零件主数据-删除
    return request({
        url: '/mtzAppNomi/deletePartMasterData',
        method: 'POST',
        data: params,
    })
}
