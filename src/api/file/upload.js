/*
 * @Author: your name
 * @Date: 2021-08-26 16:00:57
 * @LastEditTime: 2022-01-04 19:29:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\api\file\upload.js
 */
import axios from '@/utils/axios'
import store from '@/store'

const requst = axios(process.env.VUE_APP_COMMON)
const filedud_requst = axios(process.env.VUE_APP_FILEAPI)
const fileRequst = axios(process.env.VUE_APP_NEW_COMMON)
const requstUploads = axios(process.env.VUE_APP_AON)
const requestMtz = axios(process.env.VUE_APP_MTZ + '/web/mtz')

export function uploadFile(parmars) {
  return requst({
    url: '/upload',
    method: 'POST',
    data: parmars
  })
}

export function uploadFileWithNoToken(parmars) {
  return requst({
    url: '/api/file/uploadSingleFile',
    method: 'POST',
    data: parmars
  })
}

export function uploadFileWithNOTokenTwo(data) {
  return filedud_requst({
    url: '/udSingleFile',
    method: 'POST',
    data: data
  })
}
// 上传 + 水印 接口来源ws3
export function uploads(params) {
  const formData = new FormData()
  formData.append('applicationName', params.applicationName || 'rise') // 桶名，默认固定rise
  formData.append('businessId', params.businessId || 8025) // 业务id，默认固定8025
  formData.append('currentUserId', store.state.permission.userInfo.id) // 用户id
  formData.append('type', params.type || 1) // 文件类型 1:OBS 2:NFS，默认1
  formData.append('multifile', params.multifile || []) // 文件
  formData.append('watermark', params.watermark || '')

  return requstUploads({
    url: `/web/aon/common/uploads`,
    method: 'POST',
    data: formData
  })
}

// export function uploadAttach(params){
//   return requestMtz({
//     url: `/mtzBasePriceChange/uploadAttach`,
//     method: 'POST',
//     data: params
//   })
// }
// 上传 统一使用该接口
export function uploadUdFile(params) {
  const formData = new FormData()
  formData.append('applicationName', params.applicationName || 'rise') // 桶名，默认固定rise
  formData.append('businessId', params.businessId || 8025) // 业务id，默认固定8025
  formData.append('currentUser', store.state.permission.userInfo.userName) // 用户id
  formData.append('type', params.type || 1) // 文件类型 1:OBS 2:NFS，默认1
  formData.append('multifile', params.multifile || []) // 文件

  return fileRequst({
    url: `/udMutilfilesController`,
    method: 'POST',
    data: formData
  }).then((res) => {
    if (Array.isArray(res) || res.length > 0) {
      return {
        code: 200,
        data: res,
        desEn: 'success',
        desZh: '操作成功'
      }
    } else {
      return {
        code: 400,
        data: null,
        desEn: 'error',
        desZh: '操作失败'
      }
    }
  })
}
