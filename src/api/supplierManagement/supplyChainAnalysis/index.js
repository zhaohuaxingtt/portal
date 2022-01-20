/*
 * @Date: 2022-01-20 14:14:02
 * @LastEditors: caopeng
 * @LastEditTime: 2022-01-20 14:22:25
 * @FilePath: \front-portal-new\src\api\supplierManagement\supplyChainAnalysis\index.js
 */
// 概览api
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_NTIER + '/web/ntier')
export function getLoosePartsPbi() {
    return requst({
      url: '/pbiReport/getLoosePartsPbi',
      method: 'GET'
    })
  }
  