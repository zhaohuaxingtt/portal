import axios from '@/utils/axios'
const procsRequest = axios(process.env.VUE_APP_ADMIN_PROCS)

// 新增词条
export function createGlossary(data) {
    return procsRequest({
       url: '/terms_mgr/create.json',
       method: 'POST',
       data
    })
}
// 词条列表
export function glossaryListByPage(data) {
    return procsRequest({
       url: '/terms_mgr/list.json',
       method: 'get',
       data:data
    })
}
// 删除词条
export function delGlossaryById(id) {
    return procsRequest({
       url: `/terms_mgr/${id}.json`,
       method: 'delete'
    })
}