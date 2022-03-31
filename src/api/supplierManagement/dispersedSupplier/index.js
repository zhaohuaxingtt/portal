import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

//城市信息查询
export function saveInner(params) {
    return requst({
        url: `/gpSupplier/saveInner`,
        method: 'POST',
        data:params
    })
}