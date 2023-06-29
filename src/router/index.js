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
const List = ['/supplier/supplierListGP']
const EXCLUDE = ['/login','/superLogin', '/ui']

router.beforeEach((to,from,next) => {
  if(List.includes(to.fullPath)){
  // if(!EXCLUDE.includes(to.fullPath)){
    var _vds = _vds || [];
    window._vds = _vds;
    _vds.push(["setAccountId", "c9jaGnRybxEMznFF"]);
    let userId = JSON.parse(sessionStorage.getItem('userInfo'))?.id
    if(userId){
      console.log('记录行为');
      _vds.push(["setUserId", userId]);
      _vds.push(["setTrackerHost", 'webbehavior.csvw.com/saicio']);
      var vds = document.createElement("script");
      vds.id = 'saic'
      vds.type = "text/javascript";
      vds.async = true;
      vds.src = ("https:" == document.location.protocol ? "https://" : "http://") + "webbehavior.csvw.com/saicio/js/saic.js";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(vds, s);
    }else{
      console.log('未获取到用户id')
    }
  }
  next()
})

router.afterEach(() => {
  document.getElementsByTagName("script")['saic']?.remove();
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
