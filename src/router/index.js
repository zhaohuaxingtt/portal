import routeConfig from './Router.js'
// eslint-disable-next-line no-undef
Vue.use(VueRouter)

// eslint-disable-next-line no-undef
const router = new VueRouter({
  base: process.env.VUE_APP_PUBLICPATH,
  mode: 'hash',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: routeConfig.routes
})
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('app-loading')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch((err) => err)
}

export default router
