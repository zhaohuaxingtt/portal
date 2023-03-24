/*
 * @Author: your name
 * @Date: 2021-11-09 15:26:18
 * @LastEditTime: 2023-03-06 15:38:07
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\api\file\index.js
 */
import axios from '@/utils/axios.download'
import { serialize } from '@/utils'

const requst = axios(process.env.VUE_APP_COMMON)
const fileRequst = axios(process.env.VUE_APP_FILEAPI + '/fileud')
const wopi = axios(process.env.VUE_APP_FILEAPI)

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
export function downloadUdFileNews(params) {
  return fileRequst({
    url: `/udDown?${
      Array.isArray(params)
        ? serialize(
            params.map((id) => ({ fileIds: id })),
            Array
          )
        : 'fileIds=' + params
    }`,
    method: 'POST'
  })
}

// 获取文件嵌入地址
export function getFileUrl(fileId,fileName) {
  return wopi({
    url: `/wopi/getWopiUrl/${fileId}/${fileName}`,
    method: 'GET',
  })
}