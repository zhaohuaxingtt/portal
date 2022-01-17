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
export function queryKnowledgeTypeList() {
    return procsRequest({
        url: '/knowledgeSection_mgr/list.json',
        method: 'get',
    })
}