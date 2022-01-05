/*
 * @Author: your name
 * @Date: 2021-11-09 15:26:18
 * @LastEditTime: 2022-01-05 11:42:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\api\file\index.js
 */
import axios from '@/utils/axios.download'
import { serialize } from '@/utils'

const requst = axios(process.env.VUE_APP_COMMON)
const fileRequst = axios(process.env.VUE_APP_FILEAPI + '/fileud')

export function downloadFile(parmars) {
  return requst({
    url: `/download?applicationName=${parmars.applicationName}&fileList=${parmars.fileList}`,
    method: 'GET'
  })
}

//cf下载接口
export function downloadUdFile(params) {
  return fileRequst({
    url: `/getFileByFileId?${
      Array.isArray(params)
        ? serialize(
            params.map((id) => ({ fileId: id })),
            Array
          )
        : 'fileId=' + params
    }`,
    method: 'GET'
  })
}
