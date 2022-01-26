import axios from '@/utils/axios'
const procsRequest = axios(process.env.VUE_APP_ADMIN_PROCS)

// 词条列表查询
export function glossaryList(keyword) {
    return procsRequest({
        url: '/terms/listTerms.json',
        method: 'get',
        params:{keyword}
    })
}
// 词条详情查询
export function queryGlossaryDetail(id) {
    return procsRequest({
        url: `/terms/${id}/getDeatil.json`,
        method: 'get',
    })
}


// 知识列表查询
export function queryKnowledgeTypeList(data) {
    return procsRequest({
        url: '/knowledge/listSection.json',
        method: 'get',
        params:data
    })
}
//   web知识查询子项
export function queryKnowledgeTwoLevelCard(id,data) {
    return procsRequest({
        url: `/knowledge/${id}/listBySection.json`,
        method: 'post',
        data,
        formData: true
    })
}
//   web知识管理 - 知识分类查询
export function listCategoryBySection(id) {
    return procsRequest({
        url: `/knowledge/${id}/listCategoryBySection.json`,
        method: 'get'
    })
}
//   web知识管理 - 科室查询
export function queryKnowledgeDepartment() {
    return procsRequest({
        url: `/knowledge_mgr/findAllDepartment.json`,
        method: 'get'
    })
}

// 流程列表查询
export function queryWorkFlow() {
    return procsRequest({
        url: `/workFlow/list.json`,
        method: 'get'
    })
}

/**
 * 查询我收藏的问题
 */
export function queryMyCollect(data) {
    return procsRequest({
        url: `/workflow_issue/myCollect.json`,
        method: 'get',
        params: data
    })
}

/**
 * 最热词条
 */
export function queryHotTerms(data) {
    return procsRequest({
        url: `/terms/hotTerms.json`,
        method: 'get',
        params: data
    })
}

/**
 * 常用附件
 */
export function querySample() {
    return procsRequest({
        url: `workflow_file/commonSample.json`,
        method: 'get'
    })
}