/*
 * @Author: your name
 * @Date: 2021-11-09 15:26:22
 * @LastEditTime: 2021-12-10 18:12:30
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\utils\downloadUtil.js
 */
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
  createAnchorLink(MOCK_FILE_URL + '?isDown=true&fileId=' + fileIds, filename)
}

export { download, createAnchorLink }
