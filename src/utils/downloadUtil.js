import axios from '@/utils/axios'
// import { callbackify } from "util";
import { MOCK_FILE_URL } from '@/constants/index'

const request = axios()

const requestFile = axios(process.env.VUE_APP_FILEAPI + '/fileud')

const createAnchorLink = (href, filename = '') => {
  const a = document.createElement('a')
  a.download = filename
  a.href = href
  document.body.appendChild(a)
  a.click()
  a.remove()
}

const download = ({
  fileIds,
  filename,
  url,
  callback,
  type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  noFileUd = false
}) => {
  if (noFileUd) {
    request({
      url: url ? url : MOCK_FILE_URL + '?isDown=true&fileId=' + fileIds,
      method: 'get',
      responseType: 'blob', // 响应类型必须设置
      getResponse: true
    })
      .then((response) => {
        let blob = new Blob([response], { type })
        console.log(blob)
        const blobUrl = window.URL.createObjectURL(blob)
        createAnchorLink(blobUrl, filename)
        window.URL.revokeObjectURL(blobUrl)
        callback && callback(true)
      })
      .catch(() => {
        callback && callback(false)
      })
  } else {
    requestFile({
      url: url ? url : MOCK_FILE_URL + '?isDown=true&fileId=' + fileIds,
      // method: 'post',
      method: 'get',
      responseType: 'blob', // 响应类型必须设置
      getResponse: true
    })
      .then((response) => {
        const blobUrl = window.URL.createObjectURL(response)
        createAnchorLink(blobUrl, filename)
        window.URL.revokeObjectURL(blobUrl)
        callback && callback(true)
      })
      .catch(() => {
        callback && callback(false)
      })
  }
}

export { download, createAnchorLink }
