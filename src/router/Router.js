/*
 * @Author: Luoshuang
 * @Date: 2021-07-27 17:14:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-19 14:15:08
 * @Description:
 * @FilePath: \front-portal\src\router\Router.js
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

import RouterNews from "./news";

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
      path: '/mtzPointView',
      name: 'mtzPointView',
      meta: {
        title: '流转定点推荐'
      },
      component: () =>
        import('@/views/mtz/annualGeneralBudget/locationChange/components/MtzLocationPoint/components/decisionMaterial/components/mtzPointView.vue')
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
            top: 'RISE_HOME'
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
      ]
    },

    { path: '*', name: 'notFound', component: NotFound }
  ],

  authType: 'white', //白名单 white 可以跳过登录 | 黑名单 black 不可以跳过登录
  whiteList: [/^\/login/],
  blackList: []
}
