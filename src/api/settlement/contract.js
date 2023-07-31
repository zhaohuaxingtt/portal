import axios from '@/utils/axios';

const request = axios(process.env.VUE_APP_GP_RFQ);

// 待支付合同列表查询
export function getUnpaidContractList(params) {
  return request({
    url: '/web/unpaidContract/getUnpaidContractList',
    method: 'POST',
    data: params
  });
}
