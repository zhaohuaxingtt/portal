//供应商标签 caopeng 2021.11.6
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER+ '/web')

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
} //   