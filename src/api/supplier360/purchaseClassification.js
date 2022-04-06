import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
import store from '@/store'

// 材料组分页查询
export function gpProcureRelList(parmars) {
    return requst({
        url: `/gpProcureRelList?gpSupplierId=${parmars}`,
        method: 'GET',
        // data: {
        //     ...parmars,
        //     supplierToken: store.state.home.valiCode
        // }
    })
}

// 小类下拉
export function getProcureCategory(parmars) {
    return requst({
        url: `/getProcureCategory`,
        method: 'GET',
        // data: {
        //     ...parmars,
        //     supplierToken: store.state.home.valiCode
        // }
    })
}

// 保存
export function gpProcureRelSaveOrUpdate(parmars) {
    return requst({
        url: `/gpProcureRelSaveOrUpdate`,
        method: 'POST',
        data: parmars
    })
}

export function gpProcureRelDelete(parmars) {
    return requst({
        url: `/gpProcureRelDelete`,
        method: 'DELETE',
        data: parmars
    })
}