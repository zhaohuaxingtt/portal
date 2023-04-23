/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:06
 * @LastEditTime: 2023-04-23 09:54:48
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: 项目中登录时候获取整个项目的权限以及token.
 * @FilePath: \front-portal\src\permission.js
 */
import router from './router'
import store from '@/store'
import { getToken, removeToken, treeToArray } from '@/utils'
import { MessageBox } from 'element-ui'
import { fetchResource } from "@/api/role";
// eslint-disable-next-line no-unused-vars
const whiteList = ['/login', '/ui', '/superLogin']
let allUrl = []
let hasUrl = []
router.beforeEach(async(to, from, next) => {
  store.commit('setToPath', to)

  const token = getToken()
  // eslint-disable-next-line no-debugger
  if (token) {
    if (to.path === '/login' || to.path === '/superLogin') {
      //有token的时候，如果输入了一个登陆界面。则将其定向到主页
      next('/')
    } else {
      const userId = store.state.permission.userInfo.id
      if (!userId) {
        store
          .dispatch('userInfoByToken')
          .then(() => {
            store
              .dispatch('getPermissinInfo')
              .then((res) => {
                if (res.length == 0) {
                  removeToken()
                  const appLoading = document.getElementById('app-loading')
                  if (appLoading) {
                    appLoading.style.display = 'none'
                  }
                  MessageBox.alert(
                    '该账号无任何权限，请授予权限或切换账号再登录!',
                    '无权限',
                    {
                      confirmButtonText: '确定',
                      type: 'warning ',
                      callback: (action) => {
                        console.groupEnd('action ', action)
                        next('/login')
                      }
                    }
                  )
                } else {
                  store.dispatch('getModules')
                  next()
                }
              })
              .catch((err) => {
                console.log('err', err)
                console.warn(
                  '警告：获取菜单或解析菜单错误！已为您重定向到登录界面.'
                )
                removeToken()
                next('/login')
              })
          })
          .catch((err) => {
            console.log('permisssion', err)
            removeToken()
            next('/login')
          })
      } else {
        if(Array.isArray(allUrl)&&!allUrl.length){
          let res = await fetchResource({type:3})
          let menuList = treeToArray(res?.data[0].menuList,'menuList',[])
          allUrl = menuList.filter(item=>{return item.url&&item.url}).map(item=>{
            let arr = item.url.split('#')
            let url = arr[arr.length-1]
            return url
          })
        }
        if(Array.isArray(hasUrl)&&!hasUrl.length){
          let menuList = treeToArray(store.state.permission.menuList,'menuList',[])
          hasUrl = menuList.filter(item=>{return item.url&&item.url}).map(item=>{
            let arr = item.url.split('#')
            let url = arr[arr.length-1]
            return url
          })
          hasUrl.push('/404')
        }
        // console.log('allUrl=>',allUrl);
        // console.log('hasUrl=>',hasUrl);
        // console.log('to.path=>',to.path);
        let flag = false
        if(allUrl.includes(to.path)){
          if(hasUrl.includes(to.path)){
            flag = true
          }
        }else{
          flag = true
        }
        if(!flag){
          next('/404')
        }else{
          next()
        }
      }
    }
  } else {
    allUrl = []
    hasUrl = []
    if (whiteList.indexOf(to.path) !== -1) {
      //当前没token，并且路由满足白名单，则按照当前路由来控制。
      next()
    } else {
      next('/login'+`?state=${encodeURIComponent(window.location.href)}`)
    }
  }
})
