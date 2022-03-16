const path = require('path')
const files = require.context('./modules', false, /.js$/)
console.log('files', files)
const modules = {}
files.keys().forEach((key) => {
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
        prevKeys.forEach((key) => {
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

  const zh = {}
  for (const key in res) {
    if (Object.hasOwnProperty.call(res, key)) {
      zh[key] = key
    }
  }
  console.log('en', res)
  console.log('zh', zh)
  const en = res
  return { zh, en }
}

export default getI18n
