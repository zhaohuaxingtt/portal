import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

//获取舆情拉取范围
export function getRange(params) {
    return requst({
        url: `/sentimentRange/getRange`,
        method: 'GET',
        params:params
    })
}

//修改舆情范围
export function updateRange(params) {
    return requst({
        url: `/sentimentRange/updateRange`,
        method: 'POST',
        data:params
    })
}

//舆情供应商分页查询接口
export function pageList(params) {
    return requst({
        url: `/sentimentSupplier/pageList`,
        method: 'POST',
        data:params
    })
}

