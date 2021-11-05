/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:06
 * @LastEditTime: 2021-08-17 10:58:23
 * @LastEditors: Please set LastEditors
 * @Description: 项目中登录时候获取整个项目的权限以及token.
 * @FilePath: \rise\src\permission.js
 */
import router from './router'
import store from '@/store'
import { getToken, removeToken } from '@/utils'
// eslint-disable-next-line no-unused-vars
const whiteList = ['/login', '/ui']
router.beforeEach((to, from, next) => {
  const token = getToken()
  // eslint-disable-next-line no-debugger
  if (token) {
    if (to.path === '/login') {
      //有token的时候，如果输入了一个登陆界面。则将其定向到主页
      next('/')
    } else {
      const userId = store.state.permission.userInfo.id
      if (!userId) {
        store
          .dispatch('userInfoByToken')
          .then(userInfo => {
            console.log('permission userinfo', userInfo)
            /* if (userInfo.userType === 2) {
              window.location.href = 'http://10.122.17.38/site/'
            } */
            store
              .dispatch('getPermissinInfo')
              .then(res => {
                if (res.length == 0) {
                  removeToken()
                  next('/login')
                } else {
                  store.dispatch('getModules')
                  next({ ...to, replace: true })
                }
              })
              .catch(() => {
                console.warn(
                  '警告：获取菜单或解析菜单错误！已为您重定向到登录界面.'
                )
                removeToken()
                next('/login')
              })
          })
          .catch(err => {
            console.log('permisssion', err)
            removeToken()
            next('/login')
          })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      //当前没token，并且路由满足白名单，则按照当前路由来控制。
      next()
    } else {
      next('/login')
    }
  }
})
