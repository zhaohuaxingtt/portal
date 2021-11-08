/*
 * @Author: your name
 * @Date: 2021-07-28 11:52:46
 * @LastEditTime: 2021-07-28 11:57:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\utils\language.js
 */
//i18N 翻译
// eslint-disable-next-line no-undef
import { sendKey } from '@/api/usercenter'
import router from '../router'
let languageList = []
// eslint-disable-next-line no-undef
Vue.prototype.language = function(languageKey, name) {
  if (process.env.NODE_ENV == 'dev') {
    name = name || languageKey
    languageList.push(
      languageKey + '----' + name + '----' + this.$router.currentRoute.path
    )
  }
  return this.$t(languageKey)
}
// eslint-disable-next-line no-undef
router.afterEach(() => {
  if (process.env.NODE_ENV == 'dev' && languageList.length !== 0) {
    let languageLists = Array.from(new Set(languageList))
    sendKey(languageLists)
      .then(res => {
        if (res.code == 200) {
          languageList = []
        }
      })
      .catch(err => {
        languageList = []
      })
  }
})
