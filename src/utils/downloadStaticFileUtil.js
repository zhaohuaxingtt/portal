import axios from '@/utils/axios'
const request = axios()
const requestFile = axios(process.env.VUE_APP_FILEAPI)

const createAnchorLink = (href, filename = '') => {
  const a = document.createElement('a')
  a.download = filename
  a.href = href
  document.body.appendChild(a)
  a.click()
  a.remove()
}

const downloadStaticFile = ({
  filename,
  url,
  callback,
  type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  noFileUd = false
}) => {
  if (noFileUd) {
    request({
      url,
      method: 'get',
      responseType: 'blob', // 响应类型必须设置
      getResponse: true
    })
      .then((response) => {
        let blob = new Blob([response], { type })
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
      url,
      method: 'post',
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
export { downloadStaticFile, createAnchorLink }
