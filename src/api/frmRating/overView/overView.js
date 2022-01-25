/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-27 15:58:15
 * @LastEditors: YoHo
 * @LastEditTime: 2022-01-25 20:20:55
 * @Descripttion: 概览
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

//查询
export function getInitOverView(parmars) {
  return requst({
    url: `/supplier360View/frm/profile/${parmars.subSupplierId}/${parmars.supplierType}`,
    method: 'GET'
  })
}
//发起初步评级按钮
export function addInitial(parmars) {
  return requst({
    url: `/supplier360View/add/addInitial`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}


// /web/attachment/purchase/terms/{id}
// 采购条款维护-预览
export function purchaseTermsOverView(id) {
  return requst({
    url: `/attachment/purchase/terms/${id}`,
    method: 'POST',
  })
}
// 采购条款维护-已发布
export function purchaseTerms(data) {
  return requst({
    url: `/attachment/purchase/terms`,
    method: 'POST',
    data: data
  })
}

// 采购条款维护-未发布
export function purchaseTermsById({ supplierId, termsCode }) {
  return requst({
    url: `/attachment/purchase/terms/${supplierId}/${termsCode}`,
    method: 'POST',
  })
}

// 其它采购条款上传
export function termsUpload(data) {
  return requst({
    url: `/attachment/purchase/terms/other/upload`,
    method: 'POST',
    data: data
  })
}

// 删除条款
export function deleteTerms(data) {
  return requst({
    url: `/attachment/delete/terms/`,
    method: 'POST',
    data
  })
}


// 采购条款类型下拉框 supplierId=-1 查询所有
export function termsTypeById(supplierId=-1) {
  return requst({
    url: `/attachment/purchase/terms/selector/${supplierId}`,
    method: 'POST',
  })
}

// 采购条款状态下拉框
export function termsState() {
  return requst({
    url: `/attachment/purchase/terms/state/selector`,
    method: 'POST',
  })
}
// 签署方式下拉框
export function signWaySelector() {
  return requst({
    url: `/attachment/sign/way/selector`,
    method: 'POST',
  })
}

// 保存采购条款
export function saveTerms(data) {
  return requst({
    url: `/attachment/save/terms/supplier`,
    method: 'POST',
    data
  })
}

// 采购条款确认签署
export function confirmSign(id) {
  return requst({
    url: `/attachment/confirm/sign/terms/${id}`,
    method: 'POST',
  })
}

// 采购条款撤回签署
export function cancelApprove(id) {
  return requst({
    url: `/attachment/cancel/approve/terms/${id}`,
    method: 'POST',
  })
}

// 采购条款发起审批
export function approveTerms(data) {
  return requst({
    url: `/attachment/approve/terms/supplier`,
    method: 'POST',
    data
  })
}

// 删除相关附件(软删除)
export function deleteAttach(data) {
  return requst({
    url: `/attachment/deleteAttach`,
    method: 'POST',
    data
  })
}

// 采购条款同步供应商
export function syncSupplierById({ supplierId, termsCode, signWay, userId }) {
  return requst({
    url: `/attachment/sync/terms/supplier/${supplierId}/${termsCode}/${signWay}/${userId}`,
    method: 'POST',
  })
}

// 审批附件列表
export function attachList(data) {
  return requst({
    url: `/attachment/attachList`,
    method: 'POST',
    data
  })
}

// 归档线下签署条款
export function offLineUploadAttach(data) {
  return requst({
    url: `/attachment/off/line/uploadAttach`,
    method: 'POST',
    data
  })
}

// 上传审批附件
export function uploadAttach(data) {
  return requst({
    url: `/attachment/uploadAttach`,
    method: 'POST',
    data
  })
}

// 电子签章认证
export function certificate(data) {
  return requst({
    url: `/supplier/api/certificate/auth/supplier`,
    method: 'POST',
    params:data
  })
}

// 删除相关附件
export function deleteAttachment(data) {
  return requst({
    url: `/attachment`,
    method: 'DELETE',
    data
  })
}

// 档案管理
export function pagePurchaseTerms(data) {
  return requst({
    url: `/attachment/page/purchase/terms`,
    method: 'POST',
    data
  })
}

// 确认归档
export function confirmTerms(id) {
  return requst({
    url: `/attachment/confirm/file/terms/${id}`,
    method: 'POST',
  })
}

// 撤回归档
export function cancelTerms(id) {
  return requst({
    url: `/attachment/cancel/file/terms/${id}`,
    method: 'POST',
  })
}
