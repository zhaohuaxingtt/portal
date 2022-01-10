import axios from '@/utils/axios'
const procsRequest = axios(process.env.VUE_APP_ADMIN_PROCS)

// 新增词条
export function createGlossary(data) {
    return procsRequest({
       url: '/terms_mgr/create.json',
       method: 'POST',
       data,
       formData: true
    })
}

// 词条列表
export function glossaryListByPage(data) {
    return procsRequest({
       url: '/terms_mgr/list.json',
       method: 'get',
       params: data
    })
}

// 删除词条
export function delGlossaryById(id) {
    return procsRequest({
       url: `/terms_mgr/${id}.json`,
       method: 'delete'
    })
}

// 修改词条
export function modifyGlossaryById(id, data) {
    return procsRequest({
        url: `/terms_mgr/${id}/update.json`,
        method: 'put',
        data,
        formData: true
     })
}

// 上传词条封面
export function uploadImage(id, data) {
    return procsRequest({
        url: `/terms_mgr/${id}/uploadImage.json`,
        method: 'post',
        data,
        formData: true
     })
}

// 删除词条封面
export function deleteImage(id) {
    return procsRequest({
        url: `/terms_mgr/${id}/deleteImage.json`,
        method: 'delete',
    })
}

/**
 * 新增知识类型
*/
export function createKnowledgeType(data) {
    return procsRequest({
        url: `/knowledgeSection_mgr/create.json`,
        method: 'POST',
        data,
        formData: true
     })
}

// 查询知识类型列表
export function queryKnowledgeTypeList(data) {
    return procsRequest({
       url: '/knowledgeSection_mgr/list.json',
       method: 'get',
       params: data
    })
}

// 修改知识类型
export function modifyKnowledgeTypeById(id, data) {
    return procsRequest({
        url: `/knowledgeSection_mgr/${id}/update.json`,
        method: 'put',
        data,
        formData: true
    })
}

// 删除知识类型
export function delKnowledgeTypeById(id) {
    return procsRequest({
       url: `/knowledgeSection_mgr/${id}.json`,
       method: 'delete'
    })
}

// 知识类型上下架
export function publishedKnowledgeTypeById(id, data) {
    return procsRequest({
        url: `/knowledgeSection_mgr/${id}/published.json`,
        method: 'put',
        data,
        formData: true
    })
}

// 添加二级分类
export function addCategory(id, data) {
    return procsRequest({
        url: `/knowledgeSection_mgr/${id}/addCategory.json`,
        method: 'post',
        data,
        formData: true
    })
}

// 查询二级分类
export function queryCategory(id, data) {
    return procsRequest({
        url: `/knowledgeSection_mgr/${id}/getCategory.json`,
        method: 'get',
        params: data
    })
}

// 查询知识分享内容列表
export function getContentList(data) {
    return procsRequest({
        url: '/knowledge_mgr/list.json',
        method: 'get',
        params: data
    })
}