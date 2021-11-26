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

export default router
