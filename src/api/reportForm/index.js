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
        url: `/report_content/contentList.json`,
        method: 'post',
        data
    })
}
// 改变最新状态
export function updateIsNew(id) {
    return requst({
        url: `/report_content/${id}/isNew.json`,
        method: 'put'
    })
}

// 报表内容上下架
export function publishedContentById(id,data) {
    return requst({
        url: `/report_content/${id}/published.json`,
        method: 'put',
        data,
        formData: true
    })
}

// 报表内容是否通知
export function sendContentById(id,data) {
    return requst({
        url: `/report_content/${id}/isSendMessage.json`,
        method: 'put',
        data,
        formData: true
    })
}

// 添加报表内容
export function addReportContent(data) {
    return requst({
        url: `/report_content/create.json`,
        method: 'post',
        data
    })
}

// 获取报表内容详情
export function reportContentDetailById(id) {
    return requst({
        url: `/report_content/${id}/detail.json`,
        method: 'get'
    })
}

// 修改报表内容
export function updateReportContent(data) {
    return requst({
        url: `/report_content/update.json`,
        method: 'put',
        data
    })
}

// 删除一条报表内容
export function deleteContent(id) {
    return requst({
        url: `/report_content/${id}.json`,
        method: 'delete'
    })
}

// 添加报告时获取二级分类
export function getCategoryById(id) {
    return requst({
        url: `/report_mgr/${id}/findSectionByParent.json`,
        method: 'get'
    })
}

/**  类型管理 */

// 添加报告类型
export function addReportType(data) {
    return requst({
        url: `/report_mgr/create.json`,
        method: 'post',
        data
        // formData: true
    })
}

// 获取报告类型详情
export function reportTypeDetailById(id) {
    return requst({
        url: `/report_mgr/${id}/detail.json`,
        method: 'get'
    })
}

// 修改报告类型
export function modifyReportType(data) {
    return requst({
        url: `/report_mgr/update.json`,
        method: 'put',
        data
        // formData: true
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

// 新增内容时 查询类型接口
export function queryCurrTypeList() {
    return requst({
        url: `/report_mgr/findSection.json`,
        method: 'get'
    })
}


// 类型是否置顶
export function topType(id, data) {
    return requst({
        url: `/report_mgr/${id}/isTop.json`,
        method: 'put',
        data,
        formData: true
    })
}

// 报表类型上下架
export function publishedTypeById(id, data) {
    return requst({
        url: `/report_mgr/${id}/published.json`,
        method: 'put',
        data,
        formData: true
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

// 获取一条详情
export function detailData(id) {
    return requst({
        url: `/reportSection_mgr/${id}/detail.json`,
        method: 'get',
        // params: data
    })
}

//  用户相关
//获取用户
export function userListData(data) {
    return requst({
        url: `/master/users`,
        method: 'get',
        params: data
    })
}

// 获取组织
export function organizationsListData(data) {
    return requst({
        url: `/master/organizations.json`,
        method: 'get',
        params: data
    })
}
