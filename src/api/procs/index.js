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
 * 查询我收藏的问题的详情
 * 
 */
 export function getProcessFAQ(id) {
    return procsRequest({
        url: `/workflow_issue/${id}/issueDetail.json`,
        method: 'get'
    })
}
/**
 * 查询流程所有问题列表
 * 
 */
 export function queryProcessAllQA(id) {
    return procsRequest({
        url: `/workflow_issue/${id}/issueList`,
        method: 'get'
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
        url: `/workflow_file/commonSample.json`,
        method: 'get'
    })
}

/**
 * 查询我的流程
 */
export function queryMyWorkFlow() {
    return procsRequest({
        url: `/workFlow/myFlow.json`,
        method: 'get'
    })
}
/**
 * 查询流程详情
 */
export function getWorkFlow(id) {
    return procsRequest({
        url: `/workFlow/${id}/detail.json`,
        method: 'get'
    })
}
/**
 * 查询流程详情 附件
 */
export function queryPageSample(id) {
    return procsRequest({
        url: `/workflow_file/${id}/pageList.json`,
        method: 'post'
    })
}
/**
 * 流程页面详情
 */
export function getWorkFlowPage(id) {
    return procsRequest({
        url: `/workflow_page/${id}/pageDetail.json`,
        method: 'get'
    })
}

/**
 * 流程目录
 */
export function getProcessCatalog(id) {
    return procsRequest({
        url: `/catalog/${id}/getCatalog.json`,
        method: 'get'
    })
}
/**
 * 流程页面问题
 */
export function queryPageFAQ(id) {
    return procsRequest({
        url: `/workflow_issue/${id}/pageList.json`,
        method: 'post'
    })
}


/**
 * 主流程图
 */
export function getMainFlowchart() {
    return procsRequest({
        url: `/flowchart/main/flowchart.json`,
        method: 'get'
    })
}

/**
 * 添加 问题答案的反馈
 */
export function addAnswerFeedBack(id, data) {
    return procsRequest({
        url: `/workflow_issue/${id}/addAnswerFeedback.json`,
        method: 'post',
        data,
        formData: true
    })
}

/**
 * 收藏问题
 */
export function collectFAQ(id) {
    return procsRequest({
        url: `/collect/${id}/collect.json`,
        method: 'get'
    })
}

/**
 * 取消收藏问题
 */
 export function unCollectFAQ(id) {
    return procsRequest({
        url: `/collect/${id}/cancelCollect.json`,
        method: 'get'
    })
}