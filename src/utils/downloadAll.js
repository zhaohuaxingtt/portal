import axios from '@/utils/axios'

const request = axios()

const createAnchorLink = (href, filename = '') => {
  const a = document.createElement('a')
  a.download = filename
  a.href = href
  document.body.appendChild(a)
  a.click()
  a.remove()
}

const downloadAll = ({
  url,
  filename,
  callback,
  // type = "application/pdf",
  type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
  data
}) => {
  request({
    url: url,
    method: 'POST',
    responseType: 'blob', // 响应类型必须设置
    getResponse: true,
    data
  })
    .then((response) => {
      let blob = new Blob([response], { type })
      const blobUrl = window.URL.createObjectURL(blob)
      // 获取响应中的filename
      // const contentDisposition = response.headers.get('Content-Disposition');
      // const resFileName =
      //   contentDisposition &&
      //   decodeURI(contentDisposition.split('filename=')?.[1]);
      // const downloadFileName = decodeURIComponent(resFileName ?? filename);
      createAnchorLink(blobUrl, filename)
      window.URL.revokeObjectURL(blobUrl)
      callback && callback(true)
    })
    .catch(() => {
      callback && callback(false)
    })
}

const downloadAllExport = ({
  url,
  filename,
  callback,
  // type = "application/pdf",
  // type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel",
  data
}) => {
  request({
    url: url,
    method: 'POST',
    responseType: 'blob', // 响应类型必须设置
    getResponse: true,
    data
  })
    .then((response) => {
      const blobUrl = window.URL.createObjectURL(response)
      // 获取响应中的filename
      // const contentDisposition = response.headers.get('Content-Disposition');
      // const resFileName =
      //   contentDisposition &&
      //   decodeURI(contentDisposition.split('filename=')?.[1]);
      // const downloadFileName = decodeURIComponent(resFileName ?? filename);
      createAnchorLink(blobUrl, filename)
      window.URL.revokeObjectURL(blobUrl)
      callback && callback(true)
    })
    .catch(() => {
      callback && callback(false)
    })
}

export { downloadAll, downloadAllExport }
