/*
 * @Author: your name
 * @Date: 2021-12-02 17:24:36
 * @LastEditTime: 2021-12-09 21:03:05
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\api\offlineDownload\index.js
 */
import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const request = axios(process.env.VUE_APP_FILEAPI + '/fileud')
const download = axiosDownload(process.env.VUE_APP_FILEAPI + '/fileud')

//获取离线下载列表
export function getOfflineDownloadList(data) {
  return request({
    url: '/offline/task/page',
    method: 'POST',
    data
  })
}

//下载
export function downLoadXls(url) {
  return download({
    url,
    method: 'GET'
  })
}
