/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:06
 * @LastEditTime: 2023-05-08 10:16:02
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
let urlObj = {}
router.beforeEach(async (to, from, next) => {
  store.commit('setToPath', to)

  const token = getToken()
  // eslint-disable-next-line no-debugger
  if (token) {
    if (to.path === '/login' || to.path === '/superLogin') {
      //有token的时候，如果输入了一个登陆界面。则将其定向到主页
      next('/')
    } else {
      // var _vds = _vds || [];
      // window._vds = _vds;
      // _vds.push(["setAccountId", "c9jaGnRybxEMznFF"]);
      // let userNum = JSON.parse(sessionStorage.getItem('userInfo'))?.userNum
      // if(userNum){
      //   console.log('记录行为');
      //   _vds.push(["setUserId", userNum]);
      //   _vds.push(["setTrackerHost", 'webbehavior.csvw.com/saicio']);
      //   if(!document.getElementsByTagName("script")['saic']){
      //     var vds = document.createElement("script");
      //     vds.id = 'saic'
      //     vds.type = "text/javascript";
      //     vds.async = true;
      //     vds.src = ("https:" == document.location.protocol ? "https://" : "http://") + "webbehavior.csvw.com/saicio/js/saic.js";
      //     var s = document.getElementsByTagName("script")[0];
      //     s.parentNode.insertBefore(vds, s);
      //   }
      // }else{
      //   console.log('未获取到员工号')
      // }
      const userId = store.state.permission.userInfo.id
      if (!userId) {
        store
          .dispatch('userInfoByToken')
          .then(() => {
            store
              .dispatch('getPermissinInfo')
              .then(async (res) => {
                if (Array.isArray(allUrl) && !allUrl.length) {
                  let res = await fetchResource({ type: 3 })
                  let menuList = treeToArray(res?.data[0].menuList, 'menuList', [])
                  allUrl = menuList.filter(item => { return item.url && item.url }).map(item => {
                    return item.url
                  })
                }
                if (Array.isArray(hasUrl) && !hasUrl.length) {
                  let menuList = treeToArray(store.state.permission.menuList, 'menuList', [])
                  if (!Object.keys(urlObj).length) {
                    urlObj = getUrlObj(store.state.permission, 'menuList')
                  }
                  hasUrl = menuList.filter(item => { return item.url && item.url }).map(item => {
                    return item.url
                  })
                  hasUrl.push('/404')
                }
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
                  let flag = false
                  // 有些权限配置加了工程名，有些没加
                  if (allUrl.includes('/portal/#' + to.path) || allUrl.includes(to.path)) {
                    if (hasUrl.includes('/portal/#' + to.path) || hasUrl.includes(to.path)) {
                      flag = true
                    }
                  } else {
                    flag = true
                  }
                  if (!flag) {
                    if (to.redirectedFrom) {
                      let item = urlObj['/portal/#' + to.redirectedFrom]?.menuList[0] || urlObj[to.redirectedFrom]?.menuList[0] || {}
                      if (item?.url) {
                        let arr = item.url.split('#')
                        let url = arr[arr.length - 1]
                        next(url)
                      } else {
                        next('/404')
                      }
                    } else {
                      next('/404')
                    }
                  } else {
                    next()
                  }
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
        let flag = false
        // 有些权限配置加了工程名，有些没加
        if (allUrl.includes('/portal/#' + to.path) || allUrl.includes(to.path)) {
          if (hasUrl.includes('/portal/#' + to.path) || hasUrl.includes(to.path)) {
            flag = true
          }
        } else {
          flag = true
        }
        console.log('allUrl.includes', ('/portal/#' + to.path) || allUrl.includes(to.path));
        console.log('hasUrl.includes', ('/portal/#' + to.path) || hasUrl.includes(to.path));
        console.log('flag=>', flag);
        console.log('to.path=>', to);
        if (!flag) {
          if (to.redirectedFrom) {
            let item = urlObj['/portal/#' + to.redirectedFrom]?.menuList[0] || urlObj[to.redirectedFrom]?.menuList[0] || {}
            if (item?.url) {
              let arr = item.url.split('#')
              let url = arr[arr.length - 1]
              next(url)
            } else {
              next('/404')
            }
          } else {
            next('/404')
          }
        } else {
          next()
        }
      }
    }
  } else {
    allUrl = []
    hasUrl = []
    urlObj = {}
    if (whiteList.indexOf(to.path) !== -1) {
      //当前没token，并且路由满足白名单，则按照当前路由来控制。
      next()
    } else {
      next('/login' + `?state=${encodeURIComponent(window.location.href)}`)
    }
  }
})

function getUrlObj(urlTree, menuKey, obj = {}) {
  for (let index = 0; index < urlTree[menuKey].length; index++) {
    const element = urlTree[menuKey][index];
    if (element.url) obj[element.url] = element
    if (element[menuKey]) {
      getUrlObj(element, menuKey, obj)
    }
  }
  return obj
}