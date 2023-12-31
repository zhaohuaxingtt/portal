import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const request = axios(process.env.VUE_APP_MAIL)
const download = axiosDownload(process.env.VUE_APP_MAIL)

//获取列表
export function getPage(data){
    return request({
        url:'/popup/page',
        method:'POST',
        data
    })
}

//删除
export function delPageItems(data){
    return request({
        url:`/popup/del/${data}`,
        method:'POST',
        data
    })
}

//导出
export function exportEx(data){
    return download({
        url:'/popup/export',
        method:'POST',
        data
    })
}

//保存
export function savePopup(data){
    return request({
        url:'/popup/add',
        method:'POST',
        data
    })
}

//查看详情
export function searchDetail(data){
    return request({
        url:`/popup/detail/${data}`,
        method:'GET',
        params:data
    })
}

//获取最新的popup
export function getPopupList(data){
    return request({
        url:`/popup/lastest5/${data}`,
        method:'GET',
        data
    })
}

//改成这条消息已读
export function changeCheckedSta(data){
    const userId = data.userId
    const popupId = data.popupId
    return request({
        url:`/popup/detail/${userId}/${popupId}`,
        method:'GET',
        // params:data
    })
}