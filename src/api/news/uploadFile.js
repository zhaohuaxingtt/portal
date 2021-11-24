import axios from '@/utils/axios'
import store from '@/store'
const requstFile = axios(process.env.VUE_APP_FILEAPI)
requstFile.interceptors.request.use(function (config) {
  config.params = {
    userId: store.state.permission.userInfo.id
  }
  return config
})
// 上传文件
export function uploadFile(data, options) {
  data.append('multifile', data.get('file'))
  data.append('applicationName', 111)
  data.append('businessId', 8025)
  data.append(
    'currentUser',
    store.state.permission?.userInfo?.nameZh || 'admin'
  )
  data.append('type', 1)
  data.delete('file')
  return requstFile({
    url: `/fileud/udMutilfiles`,
    data,
    method: 'POST',
    timeout: 600000,
    ...options
  }).then(async (res) => {
    return res[0]
  })
}

//通过文件 ID 下载文件, 返回字节流
export function getFileId(fileId) {
  return requstFile({
    url: `/udDown/${fileId}`,
    method: 'GET',
    responseType: 'blob'
  })
}
