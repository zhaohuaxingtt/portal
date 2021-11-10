/*
 * @author:shujie
 * @Date: 2021-4-22 16:14:04
 * @Description: 历史沿革
 */
import axios from '@/utils/axios'
import store from '@/store'
const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

//分页查询历史沿革信息列表
export function getHistory(parmars) {
  return requst({
    url: `/history/list`,
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}
