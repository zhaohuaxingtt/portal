/*
 * @Author: qyu
 * @Date: 2021-08-12 16:08:46
 * @LastEditTime: 2021-08-13 09:39:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\i18n\index.js
 */

const path = require('path')
const files = require.context('./modules', false, /.js$/)
const modules = {}
files.keys().forEach(key => {
  const name = path.basename(key, '.js')
  modules[name] = files(key).default || files(key)
})

function checkRepeat() {
  const modulesKeys = Object.keys(modules)
  for (let i = 0; i < modulesKeys.length; i++) {
    const prev = modulesKeys[i]
    const prevModules = modules[prev]
    const prevKeys = Object.keys(prevModules)
    for (let j = i + 1; j < modulesKeys.length; j++) {
      const next = modulesKeys[j]
      const nextModules = modules[next]
      if (nextModules.hasOwnProperty(...prevKeys)) {
        const nextKeys = Object.keys(nextModules)
        prevKeys.forEach(key => {
          if (nextKeys.includes(key)) {
            console.error(
              `i18n 定义重复!!! 模块: 【${prev},${next}】, 关键词: "${key}"`
            )
          }
        })
      }
    }
  }
}

function getI18n() {
  if (process.env.NODE_ENV === 'dev') {
    checkRepeat()
  }
  let res = {}
  for (const key in modules) {
    if (Object.hasOwnProperty.call(modules, key)) {
      const element = modules[key]
      res = { ...res, ...element }
    }
  }
  return res
}
export default getI18n()
