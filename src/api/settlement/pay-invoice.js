/*
 * @Author: dengqi
 * @Date: 2022-12-26 14:13:34
 * @Description: 发票
 * @FilePath: \front-supplier\src\api\settlement\electronicPayInvoice.js
 */
import axios from '@/utils/axios';
import store from '@/store';
import { serialize } from '@/utils';

const request = axios(process.env.VUE_APP_SETTLEMENT);
const fileRequst = axios(process.env.VUE_APP_FILEAPI);
const baseinfo = axios(process.env.VUE_APP_BASE_INFO);


export function attPay() {
  return request({
    url: '/web/pay-apply/invoice/emial',
    method: 'GET'
  });
}


// 发票列表查询
export function payInvoicePages(params) {
  return request({
    url: '/web/pay-apply/invoice',
    method: 'GET',
    params: params
  });
}

// 根据id删除发票记录
export function deleteInvoice(params) {
  return request({
    url: '/web/pay-apply/invoice/deleteInvoice',
    method: 'POST',
    data: params
  });
}

// 问题发票信息
export function queryIsInvoice(id) {
  return request({
    url: '/tt-pay-issue-invoice/get/isSueInvoice/' + id,
    method: 'GET'
  });
}


// 提交发票信息
export function submintInvoice(params) {
  return request({
    url: '/web/pay-apply/submitInvoice',
    method: 'POST',
    data: params
  });
}

// 调用ORC识别接口
export function invokeOrc(params) {
  return request({
    url: '/web/pay-apply/invoice/ocrFromScreen',
    method: 'POST',
    data: params
  });
}


// 调用ORC识别接口
export function invokeOrcFile(params) {
  return request({
    url: '/web/pay-apply/invoice/ocrFromScreenFile',
    method: 'POST',
    dataType:"json",
    data: params
  });
}

// 调用发票效验接口
export function invoiceValidity(params) {
  return request({
    url: '/web/pay-apply/invoice/validity',
    method: 'POST',
    data: params
  });
}

// 发票编辑
export function updateInvoice(params) {
  return request({
    url: '/web/pay-apply/invoice/updateInvoice',
    method: 'POST',
    data: params
  });
}

//财务发票校验信息
export function getInvoiceEccs(params) {
  return request({
    url: `/web/pay-apply/invoice/getInvoiceEccs/${params}`,
    method: 'get'
  });
}

// 提交发票（提交电子支付申请）
export function submitPayApply(parem) {
  return request({
    url: '/web/pay-apply/updateInvoiceByApp',
    method: 'POST',
    data: parem
  });
}

// 审批列表信息查询
export function savePayApplyNote(id, data) {
  return request({
    url: `/web/pay-apply/vetting/${id}/note`,
    method: 'post',
    data: data
  });
}

// 查询审批备注信息
export function getApplyNote(id) {
  return request({
    url: `/web/pay-apply/vetting/${id}/note`,
    method: 'get'
  });
}



// 审批列表信息查询
export function vettingList(id) {
  return request({
    url: `/web/pay-apply/vetting/${id}`,
    method: 'get'
  });
}

// 上传 统一使用该接口
export function uploadUdFile(params) {
  const formData = new FormData();
  formData.append('applicationName', params.applicationName || 'rise'); // 桶名，默认固定rise
  formData.append('businessId', params.businessId || 8025); // 业务id，默认固定8025
  formData.append('currentUser', store.state.permission.userInfo.id); // 用户id
  formData.append('type', params.type || 1); // 文件类型 1:OBS 2:NFS，默认1
  formData.append('multifile', params.multifile || []); // 文件
  return fileRequst({
    url: `/fileud/udMutilfilesController`,
    method: 'POST',
    data: formData
  });
}

// 文件删除
export function downloadFileByIds(data) {
  return fileRequst({
    url: '/fileud/udDown',
    method: 'POST',
    params: data
  });
}

//通过文件 ID 下载文件, 返回字节流
export function getFileId(fileId) {
  return fileRequst({
    url: `/fileud/udDown?fileIds=${fileId}`,
    method: 'GET',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/pdf; charset=UTF-8'
    }
  });
}

// 文件删除
export function downloadUdFile(params) {
  return fileRequst({
    url: `/fileud/udDel?${
      Array.isArray(params)
        ? serialize(
            params.map(id => ({ fileIds: id })),
            Array
          )
        : 'fileIds=' + params
    }`,
    method: 'POST'
  });
}

// 概述页支付申请信息统计
export function overview(data) {
  return request({
    url: '/web/pay-apply/overview',
    method: 'post',
    data: data
  });
}

//支付申请打印接口
export function prints(code) {
  return request({
    url: '/tt_pay_invoice_info/payInvoicePdf/' + code,
    method: 'GET',
    responseType: 'blob', //设置响应格式
    headers: {
      'Content-Type': 'application/pdf; charset=UTF-8'
    }
  });
}

// 数据字典
export function getDictByCode(code) {
  return baseinfo({
    url: `/web/dict?code=${code}`,
    method: 'GET',
  });
}

// 供应商查询
export function getPayApplyTmCompanyByCode(data) {
  return baseinfo({
    url: `/web/queryCompanyByCondition`,
    method: 'POST',
    data: data
  });
}
