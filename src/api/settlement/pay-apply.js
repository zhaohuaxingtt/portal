/*
 * @Author: 吴昶
 * @Date: 2022-12-26 14:13:34
 * @Description: 电子支付申请
 * @FilePath: \front-supplier\src\api\settlement\electronicPayment.js
 */
import axios from '@/utils/axios';

const request = axios(process.env.VUE_APP_SETTLEMENT);
const baseinfo = axios(process.env.VUE_APP_BASE_INFO);

// 状态字典
export function getDicResource(code) {
  return baseinfo({
    url: `/web/dict?code=${code}`,
    method: 'GET'
  });
}

// 支付申请列表查询
export function pagePayApplyList(params) {
  return request({
    url: '/web/pay-apply',
    method: 'get',
    params: params
  });
}

// 根据支付申请号查询支付申请
export function getPayApplyInfo(id) {
  return request({
    url: `/web/pay-apply/${id}`,
    method: 'get'
  });
}

// 根据合同编号查创建支付申请
export function createPayApply(data) {
  return request({
    url: '/web/pay-apply',
    method: 'post',
    data: data
  });
}

// 保存电子支付申请
export function savePayApply(id, data) {
  return request({
    url: `/web/pay-apply/${id}`,
    method: 'put',
    data: data
  });
}

// 删除电子支付申请
export function deletePayApply(id) {
  return request({
    url: `/web/pay-apply/${id}`,
    method: 'delete'
  });
}

// 提交电子支付申请
export function submitPayApply(id) {
  return request({
    url: `/web/pay-apply/${id}/submit`,
    method: 'post'
  });
}

// 电子支付申请操作
export function checkPayApply(id) {
  return request({
    url: `/web/pay-apply/${id}/check`,
    method: 'post'
  });
}

// 电子支付申请操作
export function cancelPayApply(id) {
  return request({
    url: `/web/pay-apply/${id}/cancel`,
    method: 'post'
  });
}
