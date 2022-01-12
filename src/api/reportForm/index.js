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

// 查询报告类型列表
export function queryTypeList(data) {
    return requst({
        url: `/report_mgr/sectionMgrList.json`,
        method: 'post',
        data
    })
}

// 删除类型
export function deleteType(id) {
    return requst({
        url: `/reportSection_mgr/${id}.json`,
        method: 'delete'
    })
}

// 查询当前类型的二级分类
export function queryCurrCategory(id, data) {
    return requst({
        url: `/reportSection_mgr/${data.page}/${data.size}/${id}/${data.name}/getCategory.json`,
        method: 'get'
    })
}

// 添加当前类型的二级分类
export function createCurrCategory(id, data) {
    return requst({
        url: `/reportSection_mgr/${id}/addCategory.json`,
        method: 'post',
        data,
        formData: true
    })
}

// 删除当前类型的二级分类
export function deleteCurrCategory(id) {
    return requst({
        url: `/reportSection_mgr/${id}/deleteCategory.json`,
        method: 'delete'
    })
}

//   web 端

//  获取首页内容 一级内容
export function getSectionList(data) {
    return requst({
        url: `/report/getListSection.json`,
        method: 'get',
        params: data
    })
}
