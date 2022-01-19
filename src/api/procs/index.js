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