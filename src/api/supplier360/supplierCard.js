/*
 * @Author: your name
 * @Date: 2021-11-10 11:10:50
 * @LastEditTime: 2021-11-10 11:33:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\api\supplier360\supplierCard.js
 */
// * @Author: caopeng
// * @Description: 供应商360卡片
// */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
//卡片
export function supplierRatingCard(params) {
    return requst({
      url: `/supplierRatingRecord/supplierRatingCard/`+params,
      method: 'GET',
  
    })
  }