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
