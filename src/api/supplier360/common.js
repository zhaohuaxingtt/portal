/*
 * @author:shujie
 * @Date: 2021-4-22 16:14:04
 * @Description: 股东 集团 与 关联公司
 */
import axios from '@/utils/axios'
import store from '@/store'
const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

//提交转正申请
export function submitRegularInfo() {
  return requst({
    url: '/regular/info',
    method: 'POST',
    data: {
      supplierToken: store.state.home.valiCode
    }
  })
}
