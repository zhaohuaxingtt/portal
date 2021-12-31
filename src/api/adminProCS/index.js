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