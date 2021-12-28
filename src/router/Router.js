/*
 * @Author: Luoshuang
 * @Date: 2021-07-27 17:14:19
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-08 16:42:23
 * @Description:
 * @FilePath: \front-portal-new\src\router\Router.js
 */
import DefLayout from '../layout'
import Login from '../views/login/index'
import Home from '../views/home/index'
import NotFound from '../views/404/index'
import RouterSupplier from './RouterSupplier'
import RouterDemo from './RouterDemo'
import RouterSupplierApprove from './RouterSupplierApprove'
import RouterProCS, { cfProCS as RouterCfProcCS } from './RouterProCS'
import RouterMainData from './RouterMainData'
import RouterProcessApproval from './RouterProcessApproval'
import RouterMaster from './RouterMaster'
import RouterProjectMgmt from './RouterProjectMgmt'
import RouterInfo from './RouterInfo'
import RouterOpcs from './RouterOpcs'
import RouterParams from './RouterParams'
import RouterTaskCenter from './RouterTaskCenter'
import RouterApproval from './RouterApproval'
import RouterMTZ from './RouterMTZ'
import RouterInforMgmt from './RouterInforMgmt'
import partLifeCycle from './partLifeCycle'
import RouterExternal from './RouterExternal'
import RouterBiz from './RouterBiz'
import RouterAchievement from './RouterAchievement'
import RouterAssistant from './RouterAssistant'
import RouterPopupWindowMa from './RouterPopupWindowMa'

import RouterManage from './RouterManage'
import RouterMeeting from './RouterMeeting'

import RouterNews from './news'
import RouterSurvey from './survey'
import RouterColorParts from './RouterColorParts'

import RouterApplications from './applications'
import ApproveDetails from '@/views/generalPage/approveDetails/preview'
import MaintenanceSupplier from '../views/supplierManagement/yuqingjiance/maintenanceSupplier'

import RouterOfflineDownload from './RouterOfflineDownload'

// 嵌入表单的组件路由
import RouterView from './RouterView'
import RouterElectronicSignature from '@/router/RouterElectronicSignature'

import RouterTerms from './RouterTerms'

export default {
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: Login
    },
    {
      path: '/superLogin',
      name: 'superlogin',
      meta: {
        title: '登录'
      },
      component: Login
    },
    ...RouterSupplierApprove,
    ...RouterExternal,
    {
      path: '/applicationForm',
      name: 'applicationForm',
      meta: {
        title: 'MTZ补差申请单'
      },
      component: () =>
        import(
          '@/views/mtz/annualGeneralBudget/replenishmentManagement/components/applicationForm/index.vue'
        )
    },
    {
      path: '/changeOrder',
      name: 'changeOrder',
      meta: {
        title: 'MTZ变更单'
      },
      component: () =>
        import(
          '@/views/mtz/annualGeneralBudget/locationChange/components/MtzLocationChange/MTZapplicationForm/preview.vue'
        )
    },
    {
      path: '/supplier/joinBlackApply',
      name: 'joinBlackApply',
      meta: {
        title: '生产供应生加入黑名单审批'
      },
      component: () =>
        import(
          '@/views/supplierManagement/supplier360/list/joinBlackApply/index.vue'
        )
    },
    {
      path: '/supplier/removeBlackApply',
      name: 'removeBlackApply',
      meta: {
        title: '生产供应生移除黑名单审批'
      },
      component: () =>
        import(
          '@/views/supplierManagement/supplier360/list/removeBlackApply/index.vue'
        )
    },
    {
      path: '/NTierMap',
      name: 'NTierMap',
      meta: {
        title: 'N-tier地图'
      },
      component: () =>
        import('@/views/supplierManagement/NTier/supplyChainMap/index.vue')
    },
    {
      path: '/nTierBKL',
      name: 'nTierBKL',
      component: () =>
        import(
          '@/views/supplierManagement/NTier/supplyMaintain/components/ntierChain'
        )
    },
    {
      path: '/mtzPointView',
      name: 'mtzPointView',
      meta: {
        title: '流转定点推荐'
      },
      component: () =>
        import(
          '@/views/mtz/annualGeneralBudget/locationChange/components/MtzLocationPoint/components/decisionMaterial/components/mtzPointView.vue'
        )
    },
    {
      path: "/terms/management/termsPreview",
      name: "termsPreview",
      component: () => import(`@/views/terms/termsManagement/components/preview.vue`),
    },
    {
      path: "/terms/management/clauseDetail/preText",
      name: "preText",
      component: () => import(`@/views/terms/termsManagement/components/preText.vue`),
    },
    {
      path: '/',
      name: 'home',
      redirect: '/index',
      component: DefLayout,
      children: [
        {
          path: '/index',
          name: 'index',
          component: Home,
          meta: {
            activeMenu: ['RISE_HOME']
          }
        },
        {
          path: '/search',
          name: 'search',
          meta: {
            title: '搜索'
          },
          component: () => import('@/views/search')
        },
        {
          path: '/supplier/approve',
          name: 'approve',
          component: ApproveDetails
        },
        {
          path: '/supplier/maintenancesupplier',
          name: 'MaintenanceSupplier',
          component: MaintenanceSupplier
        },
        ...RouterOpcs,
        ...RouterSupplier,
        ...RouterDemo,
        ...RouterCfProcCS,
        ...RouterProCS,
        ...RouterProcessApproval,
        ...RouterMaster,
        ...RouterProjectMgmt,
        ...RouterMainData,
        ...RouterInfo,
        ...RouterParams,
        ...RouterTaskCenter,
        ...RouterApproval,
        ...RouterMTZ,
        ...RouterInforMgmt,
        ...partLifeCycle,
        ...RouterBiz,
        ...RouterAchievement,
        ...RouterAssistant,
        ...RouterPopupWindowMa,
        ...RouterMeeting,
        ...RouterManage,
        ...RouterNews,
        ...RouterSurvey,
        ...RouterColorParts,
        ...RouterApplications,
        ...RouterOfflineDownload,
        ...RouterElectronicSignature,
        ...RouterTerms
      ]
    },
    ...RouterView,
    { path: '*', name: 'notFound', component: NotFound }
  ],

  authType: 'white', //白名单 white 可以跳过登录 | 黑名单 black 不可以跳过登录
  whiteList: [/^\/login/, /^\/superLogin/],
  blackList: []
}
