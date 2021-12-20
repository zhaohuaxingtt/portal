// import axios from '@/utils/axios'
// import { callbackify } from "util";

// const request = axios()

// const requestFile = axios(process.env.VUE_APP_FILEAPI + '/fileud')

const createAnchorLink = (href, filename = '') => {
  // console.log('href', href)
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
    createAnchorLink(process.env.VUE_APP_FILEAPI + '/fileud/getFileByFileId?isDown=true&fileId=' + fileIds, filename);
}

export { download, createAnchorLink }
