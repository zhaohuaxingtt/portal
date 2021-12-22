/*
 * @Author: moxuan
 * @Date: 2021-04-19 17:50:00
 * @Description: FRM管理
 */
import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
const requstDownload = axiosDownload(process.env.VUE_APP_SUPPLIER + '/web')

//FRM综合分页查询
export function getFrmList(params) {
  return requst({
    url: `/initialCommentModel/frmList`,
    method: 'POST',
    data: {
      ...params
    }
  })
}

//修改深评原因
export function updateDeepCommentReason(params) {
  return requst({
    url: `/depSupplier/addDeepComment`,
    method: 'POST',
    data: {
      ...params
    }
  })
}

//分页查询初评模型列表
export function getInitialCommentModelList(params) {
  return requst({
    url: `/initialCommentModel/list`,
    method: 'POST',
    data: {
      ...params
    }
  })
}

//excel模板文件上传
export function uploadInitialCommentModelExcel(params) {
  return requst({
    url: `/initialCommentModel/excel`,
    method: 'POST',
    data: params
  })
}

// 保存初评模型

export function saveInitialCommentModel(params) {
  return requst({
    url: `/initialCommentModel/save`,
    method: 'POST',
    data: params
  })
}

// 删除初评模型
export function deleteInitialCommentModel(params) {
  return requst({
    url: `/initialCommentModel/infos`,
    method: 'DELETE',
    data: params
  })
}

//分页查询初评待确认清单
export function getInitialCommentConfirmedList(params) {
  return requst({
    url: `/initialCommentConfirmedList/list`,
    method: 'POST',
    data: params
  })
}

//查询模型名称
export function getSelectModalList(params) {
  return requst({
    url: `/initialCommentModel/selectModel`,
    method: 'POST',
    data: params
  })
}

//初评待确认退回
export function handleInitialCommentConfirmedListBack(params) {
  return requst({
    url: `/initialCommentConfirmedList/back`,
    method: 'POST',
    data: params
  })
}

//初评自动添加时间
export function saveTimeAuto(params) {
  return requst({
    url: `/initialCommentAddTimeAuto/saveTimeAuto`,
    method: 'POST',
    data: params
  })
}

//导入供应商
export function importConfirmedListExcel(params) {
  return requst({
    url: `/initialCommentConfirmedList/excel`,
    method: 'POST',
    data: params
  })
}

//分页查询手动添加初评列表
export function getHandlList(params) {
  return requst({
    url: `/initialCommentConfirmedList/handList`,
    method: 'POST',
    data: params
  })
}

//手动添加初步评级删除
export function handleInitialCommentDelete(params) {
  return requst({
    url: `/initialCommentConfirmedList/initialCommentDelete`,
    method: 'POST',
    data: params
  })
}

//初评待确认清单提交
export function handleConfirmedListSubmit(params) {
  return requst({
    url: `/initialCommentConfirmedList/confirmedListSubmit`,
    method: 'POST',
    data: params
  })
}

//发起初步评级提交
export function handleInitialCommentsubmit(params) {
  return requst({
    url: `/initialCommentConfirmedList/submit`,
    method: 'POST',
    data: params
  })
}

//导出财报
export function exportFinanceReport(params) {
  return requstDownload({
    url: `/initialCommentModel/exportFinanceReport`,
    method: 'POST',
    data: params
  })
}

//保存VWAG评级
export function saveVwag(params) {
  return requst({
    url: `/vwag/saveVwag`,
    method: 'POST',
    data: params
  })
}

//分页查询手动添加至初评
export function getCommentConfirmedListPage(params) {
  return requst({
    url: `/initialCommentConfirmedList/handListPage`,
    method: 'POST',
    data: params
  })
}

//查询手动添加列表
export function getCommentConfirmedHandListPage(params) {
  return requst({
    url: `/initialCommentConfirmedList/handList`,
    method: 'POST',
    data: params
  })
}

//导出供应商模板
export function exportInitialCommentConfirmedList(params) {
  return requst({
    url: `/initialCommentConfirmedList/export`,
    method: 'POST',
    data: params
  })
}
