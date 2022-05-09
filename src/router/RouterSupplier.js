//updated by dolphin on 5/19/2020, 7:54:14 PM.

'use strict'
import ApplicationBDL from '../views/generalPage/applicationBDL/index'
import ViewSuppliers from '../views/viewSuppliers/index'
import Frmintegratedmanagement from '../views/frmRating/frmIntegratedManagement/index'
import Initiateapreliminaryrating from '../views/frmRating/frmIntegratedManagement/initiateAPreliminaryRating/index'
import Newsupplierrating from '../views/frmRating/newSupplierRating/index'
import Newsupplierrating1 from '../views/frmRating/newSupplierRating/newSupplierRating1/index'
import SupplierFrmDepthRating from '../views/frmRating/depthRating/index'
import SupplierFrmDepthRatingInterView from '../views/frmRating/depthRating/interView/index'
import IndustryAverage from '../views/frmRating/depthRating/industryAverage/index'
import DepthRatingFinancialAnalysis from '../views/frmRating/depthRating/financialAnalysis/index'
import DepthReport from '../views/frmRating/depthRating/depthReport/index'
import EnDepthReport from '../views/frmRating/depthRating/depthReportEn/index'
import Preliminaryrating from '../views/frmRating/preliminaryRating/preliminaryRatingPage/index'
import QualitativeScoringPage from '../views/frmRating/preliminaryRating/qualitativeScoringPage/index'
import SupplierOverview from '../views/frmRating/supplierOverview/index'
import PreliminaryEvaluationOfSuppliers from '../views/frmRating/preliminaryEvaluationOfSuppliers/index'
import OperationRecord from '../views/frmRating/preliminaryRating/qualitativeScoringPage/components/operationRecord'
import SuppliersDetails from '@/views/supplierManagement/supplier360/detailes/index.vue'
import RiskSignal from '../views/frmRating/riskSignal/index'
import Details from '../views/frmRating/riskSignal/details'
import Supplier360 from '@/views/supplierManagement/supplier360/list/list.vue'
import Supplier360GP from '@/views/supplierManagement/supplier360/list/listGP.vue'
import supplierManagement from '@/views/supplierManagement/index.vue'
import NTierMap from '@/views/supplierManagement/NTier/supplyChainMap/index.vue'
import NTierRouter from '@/views/supplierManagement/NTier/router.vue'
import PublicOpinionDetection from '@/views/supplierManagement/yuqingjiance'
import dispersedSupplier from '@/views/supplierManagement/dispersedSupplier'

export default [
  {
    path: '/supplier/supplierListDis/supplierDisDetails',
    name: 'supplierDisDetails',
    component: () =>import('@/views/supplierManagement/dispersedSupplier/components/supplierDisDetails')
  },
  {
    path: '/supplier/frmrating/riskSignal',
    name: 'riskSignal',
    component: RiskSignal
  },
  {
    path: '/supplier/frmrating/riskSignal/details',
    name: 'details',
    component: Details
  },
  {
    path: '/supplier/frmrating/frmintegratedmanagement',
    name: 'frmintegratedmanagement',
    component: Frmintegratedmanagement
  },
  {
    path: '/supplier/frmrating/frmintegratedmanagement/initiateapreliminaryrating',
    name: 'initiateapreliminaryrating',
    component: Initiateapreliminaryrating
  },
  {
    path: '/supplier/frmrating/newsupplierrating',
    name: 'newsupplierrating',
    component: Newsupplierrating
  },
  {
    path: '/supplier/frmrating/newsupplierrating/rating1',
    name: 'newsupplierrating1',
    component: Newsupplierrating1
  },
  {
    path: '/supplier/frmrating/depthRating',
    name: 'supplierFrmDepthRating',
    component: SupplierFrmDepthRating
  },
  {
    path: '/supplier/frmrating/publicOpinion',
    name: 'PublicOpinionDetection',
    component: PublicOpinionDetection
  },
  {
    path: '/supplier/frmrating/depthRating/interView',
    name: 'supplierFrmDepthRatingInterView',
    component: SupplierFrmDepthRatingInterView
  },
  {
    path: '/supplier/frmrating/depthRating/industryAverage',
    name: 'SupplierFrmDepthRatingIndustryAverage',
    component: IndustryAverage
  },
  {
    path: '/supplier/frmrating/depthRating/financialAnalysis',
    name: 'depthRatingFinancialAnalysis',
    component: DepthRatingFinancialAnalysis
  },
  {
    path: '/supplier/frmrating/depthRating/depthReport',
    name: 'depthReport',
    component: DepthReport
  },
  {
    path: '/supplier/frmrating/depthRating/EnDepthReport',
    name: 'EnDepthReport',
    component: EnDepthReport
  },
  {
    path: '/supplier/frmrating/preliminaryrating',
    redirect: '/supplier/frmrating/preliminaryrating/qualitativeScoringPage',
    component: QualitativeScoringPage,
    meta: {
      title: '定性打分',
    },
  },
  {
    path: '/supplier/frmrating/preliminaryrating/preliminaryrating',
    name: 'Preliminaryrating',
    component: Preliminaryrating,
    meta: {
      title: '初步评级',
    },
  },
  {
    path: '/supplier/frmrating/preliminaryrating/qualitativeScoringPage',
    name: 'QualitativeScoringPage',
    component: QualitativeScoringPage,
    meta: {
      title: '定性打分',
    },
  },
  {
    path: '/supplier/frmrating/supplieroverview',
    name: 'supplierOverview',
    component: SupplierOverview
  },
  {
    path: '/supplier/frmrating/preliminaryevaluationofsuppliers',
    name: 'preliminaryEvaluationOfSuppliers',
    component: PreliminaryEvaluationOfSuppliers
  },
  {
    path: '/supplier/frmrating/preliminaryrating/operationrecord',
    name: 'operationrecord',
    component: OperationRecord
  },
  {
    path: '/supplier/application-BDL',
    name: 'applicationBDL',
    component: ApplicationBDL
  },
  {
    path: '/supplier/view-suppliers',
    name: 'viewSuppliers',
    component: ViewSuppliers
  },
  {
    path: '/supplier/supplierDetail',
    name: 'supplierDetail',
    component: () =>
      import('@/views/supplierManagement/supplierKPI/components/supplierDetail')
  },
  {
    path: '/supplier/supplierTakeNote',
    name: 'supplierTakeNote',
    component: () =>
      import(
        '@/views/supplierManagement/supplierKPI/components/supplierTakeNote'
      )
  },
  {
    path: '/supplier/supplierKeyNote',
    name: 'supplierKeyNote',
    component: () =>
      import(
        '@/views/supplierManagement/supplierKPI/components/supplierKeyNote'
      )
  },
  {
    path: '/supplier/supplierMeasure',
    name: 'supplierMeasure',
    component: () =>
      import(
        '@/views/supplierManagement/supplierKPI/components/supplierMeasure'
      )
  },
  {
    path: '/supplier/supplierIndex',
    name: 'supplierIndex',
    component: () =>
      import('@/views/supplierManagement/supplierKPI/supplierIndex/index.vue')
  },
  {
    path: '/supplier/supplierTag',
    name: 'supplierTag',
    component: () => import('@/views/supplierManagement/supplierTag/index.vue')
  },
  {
    path: '/supplier/supplierIndex',
    name: 'supplierIndex',
    component: () =>
      import('@/views/supplierManagement/supplierKPI/supplierIndex/index.vue')
  },
  {
    path: '/supplier/NTier/task',
    name: 'task',
    component: () =>
      import('@/views/supplierManagement/NTier/supplyChainRisk/task/index.vue')
  },
  {
    path: '/supplier/NTier/feedback',
    name: 'feedback',
    component: () =>
      import(
        '@/views/supplierManagement/NTier/supplyChainRisk/feedback/index.vue'
      )
  },
  {
    path: '/supplier/NTier/alarmLetter',
    name: 'index',
    redirect: '/supplier/NTier/alarmLetter/alarmLetterView',
    component: () =>
      import(
        '@/views/supplierManagement/NTier/supplyChainRisk/alarmLetter/index.vue'
      ),
    children: [
      {
        path: 'alarmLetterView',
        name: 'alarmLetter',
        component: () =>
          import(
            '@/views/supplierManagement/NTier/supplyChainRisk/alarmLetter/alarmLetter.vue'
          )
      }
    ]
  },
  {
    path: '/supplier',
    name: 'supplierManagement',
    meta: {
      title: '供应商管理',
      activeMenu: ['RISE_WORKBENCH', 'SUPPLIER_SUPPLIERLIST'] // 一级菜单,二级菜单
    },
    component: supplierManagement,
    children: [
      {
        path: 'supplierList',
        name: 'supplierList',
        meta: {
          title: '供应商管理',
          activeMenu: ['RISE_WORKBENCH', 'SUPPLIER_SUPPLIERLIST'] // 一级菜单,二级菜单
        },
        component: Supplier360
      },
      {
        path: 'supplierListDis',
        name: 'supplierListDis',
        component: dispersedSupplier,
      },
      {
        path: 'supplierListGP',
        name: 'supplierListGP',
        component: Supplier360GP,
        meta: {
          title: '供应商管理',
          activeMenu: ['RISE_GP', 'GP_SUPPLIER'] // 一级菜单,二级菜单
        },
      },
      {
        path: 'supplierList/details',
        name: 'suppliersDetails',
        component: SuppliersDetails
      },
      {
        path: 'supplierListDis/detailsGP',
        name: 'detailsGP3',
        component: () =>
          import(
            '@/views/supplierManagement/supplier360/detailesGP/index.vue'
          )
      },
      {
        path: 'supplierListGP/detailsGP',
        name: 'detailsGP',
        component: () =>
          import(
            '@/views/supplierManagement/supplier360/detailesGP/index.vue'
          )
      },
      {
        path: 'NTier',
        name: 'NTier',
        redirect: 'NTier/NTierMap',
        component: NTierRouter,
        children: [
          {
            path: 'NTierMap',
            name: 'NTierMap',
            component: NTierMap
          },
          {
            path: 'supplyChainRisk',
            name: 'supplyChainRisk',
            redirect: 'supplyChainRisk/emergenciesOverview',
            component: () =>
              import(
                '@/views/supplierManagement/NTier/supplyChainRisk/router.vue'
              ),
            children: [
              {
                path: 'map',
                name: 'map',
                component: () =>
                  import(
                    '@/views/supplierManagement/NTier/supplyChainRisk/index.vue'
                  )
              },
              {
                path: 'emergenciesOverview',
                name: 'emergenciesOverview',
                component: () =>
                  import(
                    '@/views/supplierManagement/NTier/supplyChainRisk/emergenciesOverview/index.vue'
                  )
              }
              // {
              //   path: 'alarmLetter',
              //   name: 'alarmLetter',
              //   redirect: 'supplyChainRisk/emergenciesOverview',
              //   component: () =>
              //     import(
              //       '@/views/supplierManagement/NTier/supplyChainRisk/components/alarmLetter.vue'
              //     )
              // }
            ]
          },
          {
            path: 'supplyChainAnalysis',
            name: 'supplyChainAnalysis',
            component: () =>
              import(
                '@/views/supplierManagement/NTier/supplyChainAnalysis/index.vue'
              )
          },
          {
            path: 'supplyMaintain',
            name: 'supplyMaintain',
            component: () =>
              import(
                '@/views/supplierManagement/NTier/supplyMaintain/index.vue'
              ),
            children: [
              {
                path: 'nTierBKL',
                name: 'supplyChainAnalysis',
                component: () =>
                  import(
                    '@/views/supplierManagement/NTier/supplyMaintain/components/theNodeChain'
                  )
              }
            ]
          }
        ]
      },
      {
        path: 'spiIndex',
        name: 'spiIndex',
        component: () =>
          import('@/views/supplierManagement/supplierKPI/router.vue'),
        redirect: 'spiIndex/spiAll',
        children: [
          {
            path: 'spiAll',
            name: 'spiAll',
            component: () =>
              import('@/views/supplierManagement/supplierKPI/supplierkpi')
          },
          {
            path: 'supplierPowerBi',
            name: 'supplierPowerBi',
            component: () =>
              import('@/views/supplierManagement/supplierKPI/supplierPowerBi')
          },
          {
            path: 'supplierList',
            name: 'supplierList',
            component: () =>
              import('@/views/supplierManagement/supplierKPI/supplierList')
          },
          {
            path: 'supplierPoint',
            name: 'supplierPoint',
            component: () =>
              import('@/views/supplierManagement/supplierKPI/supplierPoint')
          }
        ]
      },
      {
        path: 'kpiRouter',
        name: 'kpiRouter',
        component: () => import('@/views/supplierManagement/KPI/router.vue'),
        // redirect:to=>{
        //     if(store.state.permission.isLeader){
        //         return 'kpiRouter/kpiList'
        //     }else{
        //         return 'kpiRouter/supplierKpiTreeTable'
        //     }
        // },
        redirect: 'kpiRouter/kpiList',
        children: [
          {
            path: 'kpiList',
            name: 'kpiList',
            component: () => import('@/views/supplierManagement/KPI/kpiList')
          },
          {
            path: 'supplierKpiTreeTable',
            name: 'supplierKpiTreeTable',
            component: () =>
              import('@/views/supplierManagement/KPI/supplierKpiTreeTable')
          },
          {
            path: 'imgKpi',
            name: 'imgKpi',
            component: () => import('@/views/supplierManagement/KPI/imgKpi')
          },
          {
            path: 'view',
            name: 'view',
            component: () => import('@/views/supplierManagement/KPI/view')
          }
        ]
      },
      {
        path: 'supplierTracking',
        name: 'supplierTracking',
        component: () =>
          import(
            '@/views/supplierManagement/NTier/supplyChainRisk/emergenciesOverview/index.vue'
          )
      },
      {
        path: 'suppliergroupmanagement',
        name: 'suppliergroupmanagement',
        meta: {
          title: '供应商组管理',
          activeMenu: ['RISE_WORKBENCH', 'SUPPLIER_SUPPLIERLIST'] // 一级菜单,二级菜单
        },
        component: () => import('@/views/supplierManagement/supplierGroup/index.vue')
      },
      {
        path: 'suppliergroupmanagementdetail',
        name: 'suppliergroupmanagementdetail',
        meta: {
          title: '供应商组管理',
          activeMenu: ['RISE_WORKBENCH', 'SUPPLIER_SUPPLIERLIST'] // 一级菜单,二级菜单
        },
        component: () => import('@/views/supplierManagement/supplierGroup/components/supplierGroupDetail.vue')
      },
      // {
      //   path: 'alarmLetter',
      //   name: 'alarmLetter',
      //   redirect: 'supplyChainRisk/emergenciesOverview',
      //   component: () =>
      //     import(
      //       '@/views/supplierManagement/NTier/supplyChainRisk/components/alarmLetter.vue'
      //     )
      // }
    ]
  },
  {
    path: 'supplyChainAnalysis',
    name: 'supplyChainAnalysis',
    component: () =>
      import('@/views/supplierManagement/NTier/supplyChainAnalysis/index.vue')
  }
]
