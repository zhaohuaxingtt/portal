import axios from '@/utils/axios.download'
import { serialize } from '@/utils'

const requst = axios(process.env.VUE_APP_COMMON)
const fileRequst = axios(process.env.VUE_APP_FILEAPI)
// const fileRequst = axios(process.env.VUE_APP_FILEAPI + '/fileud')

export function downloadFile(parmars) {
    return requst({
        url: `/download?applicationName=${parmars.applicationName}&fileList=${parmars.fileList}`,
        method: 'GET'
    })
}

//cf下载接口
export function downloadUdFile(params) {
    return fileRequst({
        url: `/udDown?${ Array.isArray(params) ? serialize(params.map(id => ({ fileIds: id })), Array) : 'fileIds=' + params }`,
        method: 'POST'
    })
}
