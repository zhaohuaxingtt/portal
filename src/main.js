/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:06
 * @LastEditTime: 2021-11-01 21:27:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\main.js
 */
/* eslint-disable no-undef */
import router from './router'
import App from './App.vue'
import store from './store'
import '../public/theme/index.css'
import '@/assets/style/index.scss'
import './utils/mydirect'
import './permission'
import './utils/language'
import './globalComponnets'
import './i18n'
import { iMessage } from 'rise'
import custom from '@/utils/filters.js'
Object.keys(custom.filters).forEach((key) => {
  Vue.filter(key, custom.filters[key])
})

import { showFullScreenLoading, hideFullScreenLoading } from '@/utils/loading'
Vue.prototype.showLoading = showFullScreenLoading
Vue.prototype.hideLoading = hideFullScreenLoading
Vue.prototype.$message = iMessage

require('./auto').init()
Vue.config.productionTip = false
// Vue.prototype.$t = (key, value) => i18n.t(key, value)

window.sessionStorage.setItem('env', process.env.NODE_ENV)

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
