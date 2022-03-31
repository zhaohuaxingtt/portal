import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
import store from '@/store'

// 材料组分页查询
export function gpProcureRelList(parmars) {
    return requst({
        url: `/gpProcureRelList`,
        method: 'POST',
        data: {
            ...parmars,
            supplierToken: store.state.home.valiCode
        }
    })
}