import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const request = axios(process.env.VUE_APP_FILEAPI)
const download = axiosDownload(process.env.VUE_APP_FILEAPI)

//获取离线下载列表
export function getOfflineDownloadList(data){
    return request({
        url:'/offline/task/page',
        method:'POST',
        data
    })
}


//下载
export function downLoadXls(url){
    return download({
        url,
        method:'GET',
    })
}