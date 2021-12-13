/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2021-11-25 21:33:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\utils\axios.js
 */
import { iMessage } from 'rise'
import { getToken } from '@/utils'

export default function httpRequest(baseUrl = '', timeOut = 600000) {
  // eslint-disable-next-line no-undef
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: timeOut
  })
  instance.interceptors.request.use(
    function (config) {
      if (getToken()) {
        config.headers['token'] = getToken() || ''
      }
      config.headers['language'] = window.localStorage.getItem('lang') || 'zh'

      // 查询参数自动清除null，'' 值
      if (config.clearEmptyParams && config.params) {
        const newParams = {}
        for (const key in config.params) {
          if (Object.hasOwnProperty.call(config.params, key)) {
            const element = config.params[key]
            if (element !== null && element !== '') {
              newParams[key] = element
            }
          }
        }
        config.params = newParams
      }

      // IE上的同一个url请求会走cache
      config.params = {
        t: parseInt(Math.random() * 10000000000),
        ...config.params
      }
      // 定义请求得数据结构是json
      config.headers['json-wrapper'] = '1'
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    (response) => {
      const responseData = response.data
      if (responseData) {
        // 自动提示错误或成功
        const responseDataMessage = response.data.desZh || response.data.desEn
        switch (responseData.code) {
          case '400':
            iMessage.error(responseDataMessage || '请求失败')
            return Promise.reject(responseData)
          case '401':
            iMessage.error(responseDataMessage || '鉴权失败')
            return Promise.reject(responseData)
          case '403':
            iMessage.error(responseDataMessage || '禁止访问')
            return Promise.reject(responseData)
          case '404':
            iMessage.error(responseDataMessage || '无法访问')
            return Promise.reject(responseData)
          case '500':
            iMessage.error(responseDataMessage || '服务处理失败')
            return Promise.reject(responseData)
          default:
            break
        }
        return Promise.resolve(responseData)
      } else {
        return Promise.reject(response.data)
      }
    },
    (error) => {
      if (error && error.response && error.response.status) {
        const errorResponseData = error?.response?.data
        let message = error.message
        if (errorResponseData && errorResponseData.message) {
          message = errorResponseData.message
        }
        if (
          document.getElementsByClassName('el-message').length === 0 &&
          message.length
        ) {
          iMessage.error(message)
        }
      }
    }
  )
  return instance
}
