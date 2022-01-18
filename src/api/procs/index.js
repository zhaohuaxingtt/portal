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
// 知识列表查询
export function queryKnowledgeTypeList(data) {
    return procsRequest({
        url: '/knowledge/listSection.json',
        method: 'get',
        params:data
    })
}