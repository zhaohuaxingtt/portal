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

// 删除二级分类
export function deleteCategory(id) {
    return procsRequest({
        url: `/knowledgeSection_mgr/${id}/deleteCategory.json`,
        method: 'delete'
    })
}

// 查询当前用户可见的知识分享类型
export function queryCurrType() {
    return procsRequest({
        url: '/knowledge_mgr/findAllSection.json',
        method: 'get'
    })
}

// 查询配置知识分享类型的管理者列表
export function getKnowledgeUser(data) {
    return procsRequest({
        url: `/master/privilege/users.json`,
        method: 'get',
        params: data
    })
}

// 报讯配置知识分享类型的管理者
export function saveKnowledgeUser(id, data) {
    return procsRequest({
        url: `knowledgeSection_mgr/${id}/newBindPrivileges.json`,
        method: 'post',
        data,
        formData: true
    })
}

// 新建内容时 根据所选的类型查询二级分类
export function getCurrCategory(id) {
    return procsRequest({
        url: `/knowledge_mgr/${id}/findSectionByParent.json`,
        method: 'get'
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

// 添加知识分享内容
export function createKnowledgeContent(data) {
    return procsRequest({
        url: `/knowledge_mgr/create.json`,
        method: 'POST',
        data,
        formData: true
    })
}

// 修改知识分享内容
export function modifyKnowledgeContent(id, data) {
    return procsRequest({
        url: `/knowledge_mgr/${id}/update.json`,
        method: 'put',
        data,
        formData: true
    })
}

// 知识分享内容上下架
export function publishedKnowledgeById(id, data) {
    return procsRequest({
        url: `/knowledge_mgr/${id}/published.json`,
        method: 'put',
        data,
        formData: true
    })
}

// 知识分享内容发送消息
export function sendKnowledgeMessage(id, data) {
    return procsRequest({
        url: `/knowledge_mgr/${id}/isSendMessage.json`,
        method: 'put',
        data,
        formData: true
    })
}

// 删除知识类型
export function delKnowledgeById(id) {
    return procsRequest({
       url: `/knowledge_mgr/${id}.json`,
       method: 'delete'
    })
}

/**
 * 流程
 */

// 获取流程专家列表
export function getUsersList(data) {
    return procsRequest({
        url: '/master/users',
        method: 'get',
        params:data
    })
}

// 获取管理机构列表
export function getOrganizationList() {
    return procsRequest({
        url: '/master/organizations.json',
        method: 'get'
        // params: data
    })
}
// 流程列表查询
export function queryProcessList(data) {
    return procsRequest({
        url: '/workflow_mgr/list.json',
        method: 'get',
        params: data
    })
}
// 流程上下架
export function changeProcsState(id,data) {
    return procsRequest({
        url: `/workflow_mgr/${id}/published.json`,
        method: 'put',
        data,
        formData: true
    })
}
// 流程是否发送消息
export function changeProcsSendMessage(id,data) {
    return procsRequest({
        url: `/workflow_mgr/${id}/isSendMessage.json`,
        method: 'put',
        data,
        formData: true
    })
}
// 添加流程
export function addProcess(data) {
    return procsRequest({
        url: `/workflow_mgr/workflow.json`,
        method: 'post',
        data,
        formData: true
    })
}
// 查流程详情
export function getProcess(id) {
    return procsRequest({
        url: `/workflow_mgr/${id}/detail.json`,
        method: 'get',
    })
}
// 修改流程
export function updateProcess(id,data) {
    return procsRequest({
        url: `/workflow_mgr/${id}/update.json`,
        method: 'put',
        data
    })
}
// 删除流程
export function deleteProcess(id) {
    return procsRequest({
        url: `/workflow_mgr/${id}/detete.json`,
        method: 'delete'
    })
}


// 查询流程页面list
export function loadProcessPageList(id,data) {
    return procsRequest({
        url: `/workflow_mgr/${id}/pageList.json`,
        method: 'post',
        data,
        formData: true
    })
}
// 新增流程页面
export function ProcessAddPage(id,data) {
    return procsRequest({
        url: `/workflow_mgr/${id}/createPage.json`,
        method: 'post',
        data,
        formData: true
    })
}
// 编辑流程页面
export function ProcessEditPage(id,data) {
    return procsRequest({
        url: `/workflow_mgr/${id}/updatePage.json`,
        method: 'post',
        data,
        formData: true
    })
}
// 获取流程页面详情
export function getProcessPage(id) {
    return procsRequest({
        url: `/workflow_mgr/${id}/pageDetail.json`,
        method: 'get'
    })
}
// 删除流程页面
export function deleteProcessPage(id) {
    return procsRequest({
        url: `/workflow_mgr/${id}/deletePage.json`,
        method: 'delete'
    })
}
// 删除页面附件（手册/视频）
export function deletePageFile(id) {
    return procsRequest({
        url: `/workflow_mgr/${id}/deletePageFile.json`,
        method: 'delete'
    })
}
// 上传操作手册文件
export function uploadPageFile(pageId,data) {
    return procsRequest({
        url: `/workflow_mgr/${pageId}/addPageFile.json`,
        method: 'post',
        data,
        formData: true
    })
}

/**
 * 创建主流程图
 */
 export function createFlowchartInfo(data) {
    return procsRequest({
        url: `/flowchart_mgr/main/flowchart.json`,
        method: 'POST',
        data,
    })
 }

// 获取主流程图信息
export function getFlowchartInfo() {
    return procsRequest({
        url: `/flowchart_mgr/main/flowchart.json`,
        method: 'get'
    })
}
