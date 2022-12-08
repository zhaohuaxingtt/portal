import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
const requstDownload = axiosDownload(process.env.VUE_APP_SUPPLIER + '/web')

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

//舆情供应商导入模板
export function getTemplate(params) {
    return requstDownload({
        url: `/sentimentSupplier/getTemplate`,
        method: 'GET',
        params:params
    })
}

//excel模板文件导入
export function sentimentSupplierImport(params) {
    return requst({
        url: `/sentimentSupplier/import`,
        method: 'POST',
        data:params
    })
}

//导出舆情供应商信息
export function sentimentSupplierExport(params) {
    return requstDownload({
        url: `/sentimentSupplier/export`,
        method: 'POST',
        data:params
    })
}

//删除舆情供应商
export function deleteByIds(params) {
    return requst({
        url: `/sentimentSupplier/deleteByIds`,
        method: 'POST',
        data:params
    })
}

//舆情用户供应商分页查询接口
export function sentimentUserSupplierPageList(params) {
    return requst({
        url: `/sentimentUserSupplier/pageList`,
        method: 'POST',
        data:params
    })
}

//订阅取消订阅接口
export function updateSubscribe(params) {
    return requst({
        url: `/sentimentUserSupplier/updateSubscribe`,
        method: 'POST',
        data:params
    })
}

//获取添加供应商关注弹窗
export function getSentimentSupplierList(params) {
    return requst({
        url: `/sentimentUserSupplier/getSentimentSupplierList`,
        method: 'POST',
        data:params
    })
}

//添加关注
export function addFollow(params) {
    return requst({
        url: `/sentimentUserSupplier/addFollow`,
        method: 'POST',
        data:params
    })
}

//移除用户供应商信息
export function deleteUserSupplier(params) {
    return requst({
        url: `/sentimentUserSupplier/deleteUserSupplier`,
        method: 'POST',
        data:params
    })
}