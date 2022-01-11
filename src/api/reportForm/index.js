import axios from '@/utils/axios'

// 供应商管理网络请求模块
const requst = axios(process.env.VUE_APP_ADMIN_PROCS)

export function listReports(id) {
    return requst({
        url: `/report/${id}/listReports.json`,
        method: 'get'
    })
}
/**  内容管理 */
//报表内容列表查询
export function queryReportContentList(data) {
    return requst({
        url: `/report_mgr/list.json`,
        method: 'get',
        params:data
    })
}
// 添加报表内容
export function addReportContent(data) {
    return requst({
        url: `/report_mgr/create.json`,
        method: 'post',
        data
    })
}

// 编辑报表内容
export function updateReportContent(id,data) {
    return requst({
        url: `/report_mgr/${id}/update.json`,
        method: 'put',
        data
    })
}