/*
 * @Date: 2021-11-08 13:43:39
 * @LastEditors: caopeng
 * @LastEditTime: 2022-01-24 15:51:27
 * @FilePath: \front-portal-new\src\api\supplierManagement\supplierTag\index.js
 */
//供应商标签 caopeng 2021.11.6
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER+ '/web')

// 采购分类
export function getProcureCategory(parmars) {
    return requst({
        url: '/getProcureCategory',
        method: 'GET',
    })
}

// 查询标签管理页面
export function getTagPage(parmars) {
    return requst({
        url: '/tags/tags/tagPage',
        method: 'POST',
        data: parmars
    })
}
//批量删除
export function delBatchDel(parmars) {
    return requst({
        url: '/tags/tags/batchDel',
        method: 'POST',
        data: parmars
    })
}
//展示或隐藏
export function showOrHide(parmars) {
    return requst({
        url: '/tags/tags/showOrHide',
        method: 'POST',
        data: parmars
    })
}
//标签管理页新增
export function tagAdd(parmars) {
    return requst({
        url: '/tags/tags/tagAdd',
        method: 'POST',
        data: parmars
    })
}
//   标签列表
export function getTagList(parmars) {
    return requst({
        url: 'tags/tags/tagList',
        method: 'POST',
        data: parmars
    })
}
//   查询下拉标签列表
export function dropDownTagName(parmars) {
    return requst({
        url: 'tags/tags/dropDownTagName',
        method: 'POST',
        data: parmars
    })
}
//   查询下拉标签列表
export function pageInner(parmars) {
    return requst({
        url: '/gpSupplier/pageInner',
        method: 'POST',
        data: parmars
    })
}
//   查询下拉标签列表
export function getGpBusinessType(parmars) {
    return requst({
        url: `/gpSupplier/getGpBusinessType/${parmars}`,
        method: 'GET',
    })
}
//   039-供应商标签设置
export function saveSupplierTag(parmars) {
    return requst({
        url: 'tags/tags/saveSupplierTag',
        method: 'POST',
        data: parmars
    })
} //   038-供应商标签详情列表-保存
export function supplierTagListSave(parmars) {
    return requst({
        url: 'tags/tags/supplierTagListSave',
        method: 'POST',
        data: parmars
    })
} //   038-供应商标签分页列表
export function supplierTagPage(parmars) {
    return requst({  
        url: 'tags/tags/supplierTagPage',
        method: 'POST',
        data: parmars
    })
}  
//  集团下拉
export function groupCompanyList(parmars) {
    return requst({  
        url: '/supplier360View/page/groupCompanyList',
        method: 'POST',
        data: parmars
    })
}   
// 状态下拉
export function vwStatusList(parmars) {
    return requst({  
        url: '/supplier360View/page/vwStatusList',
        method: 'POST',
        data: parmars
    })
} //   