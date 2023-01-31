export default [
  {
    path: '/mtz',
    name: 'mtz',
    redirect: 'mtz/annualGeneralBudget',
    meta: {
      activeMenu: ['RISE_WORKBENCH', 'WORKBENCH_MTZ'] // 一级菜单,二级菜单
    },
    component: () => import('@/views/mtz/router.vue'),
    children: [
      {
        path: 'annualGeneralBudget',
        name: 'annualGeneralBudget',
        component: () => import('@/views/mtz/annualGeneralBudget/index.vue'),
        meta: {
          activeMenu: ['RISE_WORKBENCH', 'WORKBENCH_MTZ'] // 一级菜单,二级菜单
        },
        redirect: 'annualGeneralBudget/annualBudget',
        children: [
          {
            path: 'annualBudget',
            name: 'annualBudget',
            meta: {
              title: '年度预算',
              showFooter: true //跳转路由判断是否隐藏父级及以上层级样式
            },
            component: () =>
              import('@/views/mtz/annualGeneralBudget/annualBudget/index.vue')
          },
          {
            path: 'reportsShow',
            name: 'reportsShow',
            meta: {
              title: '报表展示',
              showFooter: true
            },
            component: () =>
              import('@/views/mtz/annualGeneralBudget/reportsShow/index.vue'),
            redirect: 'reportsShow/mtzAnnualBudget',
            children: [
              {
                path: 'mtzAnnualBudget',
                name: 'mtzAnnualBudget',
                meta: {
                  title: '年度预算',
                  showFooter: true
                },
                component: () => import('@/views/mtz/annualGeneralBudget/reportsShow/components/annualbudget/index.vue'),
                redirect: 'mtzAnnualBudget/classMaterial',
                children: [
                  {
                    path: 'classMaterial',
                    name: 'classMaterial',
                    meta: {
                      title: '材料中类',
                      showFooter: true
                    },
                    component: () => import('@/views/mtz/annualGeneralBudget/reportsShow/components/annualbudget/classmaterial/index'),
                  },
                  {
                    path: 'materialGroup',
                    name: 'materialGroup',
                    meta: {
                      title: '材料组',
                      showFooter: true
                    },
                    component: () => import('@/views/mtz/annualGeneralBudget/reportsShow/components/annualbudget/materialgroup/index'),
                  },
                  {
                    path: 'department',
                    name: 'department',
                    meta: {
                      title: '科室',
                      showFooter: true
                    },
                    component: () => import('@/views/mtz/annualGeneralBudget/reportsShow/components/annualbudget/department/index'),
                  },
                  {
                    path: 'brand',
                    name: 'brand',
                    meta: {
                      title: '品牌',
                      showFooter: true
                    },
                    component: () => import('@/views/mtz/annualGeneralBudget/reportsShow/components/annualbudget/brand/index'),
                  },
                  {
                    path: 'model',
                    name: 'model',
                    meta: {
                      title: '车型',
                      showFooter: true
                    },
                    component: () => import('@/views/mtz/annualGeneralBudget/reportsShow/components/annualbudget/model/index'),
                  }
                ]
              },
              {
                path: 'monthlyTracking',
                name: 'monthlyTracking',
                meta: {
                  title: '月度跟踪',
                  showFooter: true
                },
                component: () => import('@/views/mtz/annualGeneralBudget/reportsShow/components/monthlytracking/index.vue'),
                redirect: 'monthlyTracking/monthlyBudgetTracking',
                children: [
                  {
                    path: 'monthlyBudgetTracking',
                    name: 'monthlyBudgetTracking',
                    meta: {
                      title: '预算月度跟踪',
                      showFooter: true
                    },
                    component: () => import('@/views/mtz/annualGeneralBudget/reportsShow/components/monthlytracking/monthlybudgettracking/index'),

                  },
                  {
                    path: 'causeAnalysisDifference',
                    name: 'causeAnalysisDifference',
                    meta: {
                      title: '差异原因分析',
                      showFooter: true
                    },
                    component: () => import('@/views/mtz/annualGeneralBudget/reportsShow/components/monthlytracking/causeanalysisdifference/index'),

                  },
                  {
                    path: 'monthlyTrackingPayment',
                    name: 'monthlyTrackingPayment',
                    meta: {
                      title: '支付金额月度跟踪',
                      showFooter: true
                    },
                    component: () => import('@/views/mtz/annualGeneralBudget/reportsShow/components/monthlytracking/monthlytrackingpayment/index'),

                  },
                  {
                    path: 'modelMonthlyBudgetTracking',
                    name: 'modelMonthlyBudgetTracking',
                    meta: {
                      title: '车型月度预算跟踪',
                      showFooter: true
                    },
                    component: () => import('@/views/mtz/annualGeneralBudget/reportsShow/components/monthlytracking/modelmonthlybudgettracking/index'),

                  }
                ]
              },
            ]
          },
          {
            path: 'locationChange',
            name: 'locationChange',
            meta: {
              title: '定点与变更',
              activeMenu: ['RISE_WORKBENCH', 'WORKBENCH_MTZ'] // 一级菜单,二级菜单
            },
            component: () =>
              import(
                '@/views/mtz/annualGeneralBudget/locationChange/index.vue'
              ),
            redirect: 'locationChange/MtzLocationPoint',
            children: [
              {
                path: 'MtzLocationPoint',
                name: 'MtzLocationPoint',
                meta: {
                  title: 'MTZ定点',
                  showFooter: true, //隐藏
                  activeMenu: ['RISE_WORKBENCH', 'WORKBENCH_MTZ'] // 一级菜单,二级菜单
                },
                component: () =>
                  import(
                    '@/views/mtz/annualGeneralBudget/locationChange/components/MtzLocationPoint/index.vue'
                  ),
                children: [
                  {
                    path: 'overflow',
                    name: 'overflow',
                    meta: {
                      title: 'MTZ定点',
                      showFooter: false //隐藏
                    },
                    redirect: 'overflow/applyInfor',
                    component: () =>
                      import(
                        '@/views/mtz/annualGeneralBudget/locationChange/components/MtzLocationPoint/components/overflow'
                      ),
                    children: [
                      {
                        path: 'applyInfor',
                        name: 'applyInfor',
                        meta: {
                          title: 'MTZ申请单详情',
                          showFooter: false //隐藏
                        },
                        component: () =>
                          import(
                            '@/views/mtz/annualGeneralBudget/locationChange/components/MtzLocationPoint/components/applyInfor/index.vue'
                          )
                      },
                      {
                        path: 'approverRecord',
                        name: 'approverRecord',
                        meta: {
                          title: '审批人&审批记录',
                          showFooter: false //隐藏
                        },
                        component: () =>
                          import(
                            '@/views/mtz/annualGeneralBudget/locationChange/components/MtzLocationPoint/components/approverRecord'
                          )
                      },
                      {
                        path: 'decisionMaterial',
                        name: 'decisionMaterial',
                        meta: {
                          title: '决策资料',
                          showFooter: false //隐藏
                        },
                        component: () =>
                          import(
                            '@/views/mtz/annualGeneralBudget/locationChange/components/MtzLocationPoint/components/decisionMaterial'
                          )
                      }
                    ]
                  },
                  {
                    path: 'signPreview',
                    name: 'signPreview',
                    meta: {
                      title: '流转预览',
                      showFooter: false //隐藏
                    },
                    component: () =>
                      import(
                        '@/views/mtz/annualGeneralBudget/locationChange/components/MtzLocationPoint/components/decisionMaterial/components/signPreview'
                      )
                  },
                  {
                    path: 'signPreviewBefore',
                    name: 'signPreviewBefore',
                    meta: {
                      title: '流转预览跳转',
                      showFooter: false //隐藏
                    },
                    component: () =>
                      import(
                        '@/views/mtz/annualGeneralBudget/locationChange/components/MtzLocationPoint/components/decisionMaterial/components/signPreviewBefore'
                      )
                  }
                ]
              }, {
                path: 'ChipLocationPoint',
                name: 'ChipLocationPoint',
                meta: {
                  title: '芯片定点',
                  showFooter: true, //隐藏
                  activeMenu: ['RISE_WORKBENCH', 'WORKBENCH_MTZ'] // 一级菜单,二级菜单
                },
                component: () =>
                  import(
                    '@/views/mtz/annualGeneralBudget/locationChange/components/ChipLocationPoint/index.vue'
                  ),
                children: [
                  {
                    path: 'overflow',
                    name: 'overflow',
                    meta: {
                      title: '芯片定点',
                      showFooter: false //隐藏
                    },
                    redirect: 'overflow/applyInfor',
                    component: () =>
                      import(
                        '@/views/mtz/annualGeneralBudget/locationChange/components/ChipLocationPoint/components/overflow'
                      ),
                    children: [
                      {
                        path: 'applyInfor',
                        name: 'applyInfor',
                        meta: {
                          title: '芯片申请单详情',
                          showFooter: false //隐藏
                        },
                        component: () =>
                          import(
                            '@/views/mtz/annualGeneralBudget/locationChange/components/ChipLocationPoint/components/applyInfor/index.vue'
                          )
                      },
                      {
                        path: 'approverRecord',
                        name: 'approverRecord',
                        meta: {
                          title: '审批人&审批记录',
                          showFooter: false //隐藏
                        },
                        component: () =>
                          import(
                            '@/views/mtz/annualGeneralBudget/locationChange/components/ChipLocationPoint/components/approverRecord'
                          )
                      },
                      {
                        path: 'decisionMaterial',
                        name: 'decisionMaterial',
                        meta: {
                          title: '决策资料',
                          showFooter: false //隐藏
                        },
                        component: () =>
                          import(
                            '@/views/mtz/annualGeneralBudget/locationChange/components/ChipLocationPoint/components/decisionMaterial'
                          )
                      }
                    ]
                  },
                  {
                    path: 'signPreview',
                    name: 'signPreview',
                    meta: {
                      title: '流转预览',
                      showFooter: false //隐藏
                    },
                    component: () =>
                      import(
                        '@/views/mtz/annualGeneralBudget/locationChange/components/ChipLocationPoint/components/decisionMaterial/components/signPreview'
                      )
                  },
                  {
                    path: 'signPreviewBefore',
                    name: 'signPreviewBefore',
                    meta: {
                      title: '流转预览跳转',
                      showFooter: false //隐藏
                    },
                    component: () =>
                      import(
                        '@/views/mtz/annualGeneralBudget/locationChange/components/ChipLocationPoint/components/decisionMaterial/components/signPreviewBefore'
                      )
                  }
                ]
              },
              {
                path: 'MtzLocationChange',
                name: 'MtzLocationChange',
                meta: {
                  title: 'MTZ变更',
                  showFooter: true //隐藏
                },
                component: () =>
                  import(
                    '@/views/mtz/annualGeneralBudget/locationChange/components/MtzLocationChange/MtzLocationChangeOverview/index.vue'
                  )
              },
              {
                path: 'ChipLocationChange',
                name: 'ChipLocationChange',
                meta: {
                  title: '芯片变更',
                  showFooter: true //隐藏
                },
                component: () =>
                  import(
                    '@/views/mtz/annualGeneralBudget/locationChange/components/ChipLocationChange/ChipLocationChangeOverview/index.vue'
                  )
              },
            ]
          },
          {
            path: 'newMtzLocationChange',
            name: 'newMtzLocationChange',
            meta: {
              title: '新建MTZ变更申请'
            },
            component: () =>
              import(
                '@/views/mtz/annualGeneralBudget/locationChange/components/MtzLocationChange/newMtzlocationChange/index.vue'
              )
          },
          {
            path: 'MTZapplicationForm',
            name: 'MTZapplicationForm',
            meta: {
              title: 'MTZ申请单'
            },
            component: () =>
              import(
                '@/views/mtz/annualGeneralBudget/locationChange/components/MtzLocationChange/MTZapplicationForm/index.vue'
              )
          },
          {
            path: 'newMtzLocationChange',
            name: 'newMtzLocationChange',
            meta: {
              title: '新建芯片补差变更申请'
            },
            component: () =>
              import(
                '@/views/mtz/annualGeneralBudget/locationChange/components/ChipLocationChange/newChipLocationChange/index.vue'
              )
          },
          {
            path: 'ChipApplicationForm',
            name: 'ChipApplicationForm',
            meta: {
              title: '芯片补差申请单'
            },
            component: () =>
              import(
                '@/views/mtz/annualGeneralBudget/locationChange/components/ChipLocationChange/ChipApplicationForm/index.vue'
              )
          },
          {
            path: 'replenishmentManagement',
            name: 'replenishmentManagement',
            meta: {
              title: '补差管理'
            },
            component: () =>
              import(
                '@/views/mtz/annualGeneralBudget/replenishmentManagement/index.vue'
              ),
            redirect: 'replenishmentManagement/mtzCalculationTask',
            children: [
              {
                path: 'mtzCalculationTask',
                name: 'mtzCalculationTask',
                meta: {
                  title: 'MTZ补差计算任务',
                  showFooter: true
                },
                component: () =>
                  import(
                    '@/views/mtz/annualGeneralBudget/replenishmentManagement/components/mtzCalculationTask/index.vue'
                  )
              },
              {
                path: 'mtzReplenishmentOverview',
                name: 'mtzReplenishmentOverview',
                meta: {
                  title: 'MTZ补差总览',
                  showFooter: true
                },
                component: () =>
                  import(
                    '@/views/mtz/annualGeneralBudget/replenishmentManagement/components/mtzReplenishmentOverview/index.vue'
                  )
              },
              {
                path: 'supplementaryList',
                name: 'supplementaryList',
                meta: {
                  title: '补差单列表',
                  showFooter: true
                },
                component: () =>
                  import(
                    '@/views/mtz/annualGeneralBudget/replenishmentManagement/components/supplementaryList/index.vue'
                  )
              },
              {
                path: 'vwptUploadQuantity',
                name: 'vwptUploadQuantity',
                meta: {
                  title: 'VWPT上载数量',
                  showFooter: true
                },
                component: () =>
                  import(
                    '@/views/mtz/annualGeneralBudget/replenishmentManagement/components/vwptUploadQuantity/index.vue'
                  )
              },
              {
                path: 'chipCalculationTask',
                name: 'chipCalculationTask',
                meta: {
                  title: '芯片补差计算任务',
                  showFooter: true
                },
                component: () =>
                  import(
                    '@/views/mtz/annualGeneralBudget/replenishmentManagement/components/chipCalculationTask/index.vue'
                  )
              },
              {
                path: 'chipReplenishmentOverview',
                name: 'chipReplenishmentOverview',
                meta: {
                  title: '芯片补差总览',
                  showFooter: true
                },
                component: () =>
                  import(
                    '@/views/mtz/annualGeneralBudget/replenishmentManagement/components/chipReplenishmentOverview/index.vue'
                  )
              },
              {
                path: 'chipSupplementaryList',
                name: 'chipSupplementaryList',
                meta: {
                  title: '芯片补差单列表',
                  showFooter: true
                },
                component: () =>
                  import(
                    '@/views/mtz/annualGeneralBudget/replenishmentManagement/components/chipSupplementaryList/index.vue'
                  )
              },
            ]
          }
        ]
      },
      // {
      //   path: 'annualGeneralBudgetLeader',
      //   name: 'annualGeneralBudgetLeader',
      //   redirect: 'annualGeneralBudgetLeader/annualBudgetLeader',
      //   component: () =>
      //     import('@/views/mtz/annualGeneralBudgetLeader/index.vue'),
      //   children: [
      //     {
      //       path: 'annualBudgetLeader',
      //       name: 'annualBudgetLeader',
      //       meta: {
      //         title: '年度预算'
      //       },
      //       component: () =>
      //         import(
      //           '@/views/mtz/annualGeneralBudgetLeader/annualBudget/index.vue'
      //         )
      //     },
      //     {
      //       path: 'reportsShowLeader',
      //       name: 'reportsShowLeader',
      //       meta: {
      //         title: '报表展示'
      //       },
      //       component: () =>
      //         import(
      //           '@/views/mtz/annualGeneralBudgetLeader/reportsShow/index.vue'
      //         )
      //     }
      //   ]
      // },
      {
        path: 'annualBudgetEdit',
        name: 'annualBudgetEdit',
        redirect: 'annualBudgetEdit/buyerOverview',
        component: () => import('@/views/mtz/annualBudgetEdit/index.vue'),
        meta: {
          title: '年度预算编辑'
        },
        children: [
          {
            path: 'buyerOverview',
            name: 'buyerOverview',
            meta: {
              title: '采购员预算总览'
            },
            component: () =>
              import('@/views/mtz/annualBudgetEdit/buyerOverview/index.vue')
          },
          {
            path: 'officeOverview',
            name: 'officeOverview',
            meta: {
              title: '科室预算总览'
            },
            component: () =>
              import('@/views/mtz/annualBudgetEdit/officeOverview/index.vue')
          },
          {
            path: 'brandOverview',
            name: 'brandOverview',
            meta: {
              title: '品牌预算总览'
            },
            component: () =>
              import('@/views/mtz/annualBudgetEdit/brandOverview/index.vue')
          },
          {
            path: 'otherOverview',
            name: 'otherOverview',
            meta: {
              title: '编辑其他'
            },
            component: () =>
              import('@/views/mtz/annualBudgetEdit/otherOverview/index.vue')
          }
        ]
      },
      {
        path: 'dataBase',
        name: 'dataBase',
        meta: {
          title: '数据库'
        },
        component: () => import('@/views/mtz/dataBase/index.vue'),
        redirect: 'dataBase/partsQuery',
        children: [
          {
            path: 'partsQuery',
            name: 'partsQuery',
            meta: {
              title: 'MTZ零件查询'
            },
            component: () => import('@/views/mtz/dataBase/partsQuery/index.vue')
          },
          {
            path: 'preciousMetalMarketPriceInquiry',
            name: 'preciousMetalMarketPriceInquiry',
            meta: {
              title: '贵金属市场价查询'
            },
            component: () =>
              import(
                '@/views/mtz/dataBase/preciousMetalMarketPriceInquiry/index.vue'
              )
          },
          {
            path: 'rulesQuery',
            name: 'rulesQuery',
            meta: {
              title: 'mtz规则查询'
            },
            component: () => import('@/views/mtz/dataBase/rulesQuery/index.vue')
          },
          {
            path: 'chipRulesQuery',
            name: 'chipRulesQuery',
            meta: {
              title: '芯片补差规则查询'
            },
            component: () => import('@/views/mtz/dataBase/chipRulesQuery/index.vue')
          },
          {
            path: 'sourceMarketPrice',
            name: 'sourceMarketPrice',
            meta: {
              title: 'mtz市场价来源'
            },
            component: () =>
              import('@/views/mtz/dataBase/sourceMarketPrice/index.vue')
          },
          {
            path: 'marketPriceEnquiry',
            name: 'marketPriceEnquiry',
            meta: {
              title: 'mtz市场价查询'
            },
            component: () =>
              import('@/views/mtz/dataBase/marketPriceEnquiry/index.vue')
          },
          {
            path: 'partsRelationship',
            name: 'partsRelationship',
            meta: {
              title: '一二次件零件关系'
            },
            component: () =>
              import('@/views/mtz/dataBase/partsRelationship/index.vue')
          }
        ]
      }
    ]
  }, {
    path: '/chip',
    name: 'chip',
    redirect: 'chip/annualGeneralBudget',
    meta: {
      activeMenu: ['RISE_WORKBENCH', 'WORKBENCH_MTZ'] // 一级菜单,二级菜单
    },
    component: () => import('@/views/mtz/router.vue'),
    children: [
      {
        path: 'annualGeneralBudget',
        name: 'annualGeneralBudget',
        component: () => import('@/views/mtz/annualGeneralBudget/index.vue'),
        meta: {
          activeMenu: ['RISE_WORKBENCH', 'WORKBENCH_MTZ'] // 一级菜单,二级菜单
        },
        redirect: 'annualGeneralBudget/annualBudget',
        children: [
          {
            path: 'locationChange',
            name: 'locationChange',
            meta: {
              title: '定点与变更',
              activeMenu: ['RISE_WORKBENCH', 'WORKBENCH_MTZ'] // 一级菜单,二级菜单
            },
            component: () =>
              import(
                '@/views/mtz/annualGeneralBudget/locationChange/index.vue'
              ),
            redirect: 'locationChange/MtzLocationPoint',
            children: [
              {
                path: 'ChipLocationPoint',
                name: 'ChipLocationPoint',
                meta: {
                  title: '芯片定点',
                  showFooter: true, //隐藏
                  activeMenu: ['RISE_WORKBENCH', 'WORKBENCH_MTZ'] // 一级菜单,二级菜单
                },
                component: () =>
                  import(
                    '@/views/mtz/annualGeneralBudget/locationChange/components/ChipLocationPoint/index.vue'
                  ),
                children: [
                  {
                    path: 'overflow',
                    name: 'overflow',
                    meta: {
                      title: '芯片定点',
                      showFooter: false //隐藏
                    },
                    redirect: 'overflow/applyInfor',
                    component: () =>
                      import(
                        '@/views/mtz/annualGeneralBudget/locationChange/components/ChipLocationPoint/components/overflow'
                      ),
                    children: [
                      {
                        path: 'applyInfor',
                        name: 'applyInfor',
                        meta: {
                          title: '芯片申请单详情',
                          showFooter: false //隐藏
                        },
                        component: () =>
                          import(
                            '@/views/mtz/annualGeneralBudget/locationChange/components/ChipLocationPoint/components/applyInfor/index.vue'
                          )
                      },
                      {
                        path: 'approverRecord',
                        name: 'approverRecord',
                        meta: {
                          title: '审批人&审批记录',
                          showFooter: false //隐藏
                        },
                        component: () =>
                          import(
                            '@/views/mtz/annualGeneralBudget/locationChange/components/ChipLocationPoint/components/approverRecord'
                          )
                      },
                      {
                        path: 'decisionMaterial',
                        name: 'decisionMaterial',
                        meta: {
                          title: '决策资料',
                          showFooter: false //隐藏
                        },
                        component: () =>
                          import(
                            '@/views/mtz/annualGeneralBudget/locationChange/components/ChipLocationPoint/components/decisionMaterial'
                          )
                      }
                    ]
                  },
                  {
                    path: 'signPreview',
                    name: 'signPreview',
                    meta: {
                      title: '流转预览',
                      showFooter: false //隐藏
                    },
                    component: () =>
                      import(
                        '@/views/mtz/annualGeneralBudget/locationChange/components/ChipLocationPoint/components/decisionMaterial/components/signPreview'
                      )
                  },
                  {
                    path: 'signPreviewBefore',
                    name: 'signPreviewBefore',
                    meta: {
                      title: '流转预览跳转',
                      showFooter: false //隐藏
                    },
                    component: () =>
                      import(
                        '@/views/mtz/annualGeneralBudget/locationChange/components/ChipLocationPoint/components/decisionMaterial/components/signPreviewBefore'
                      )
                  }
                ]
              },
              {
                path: 'ChipLocationChange',
                name: 'ChipLocationChange',
                meta: {
                  title: '芯片变更',
                  showFooter: true //隐藏
                },
                component: () =>
                  import(
                    '@/views/mtz/annualGeneralBudget/locationChange/components/ChipLocationChange/ChipLocationChangeOverview/index.vue'
                  )
              },
            ]
          },
          {
            path: 'newMtzLocationChange',
            name: 'newMtzLocationChange',
            meta: {
              title: '新建芯片补差变更申请'
            },
            component: () =>
              import(
                '@/views/mtz/annualGeneralBudget/locationChange/components/ChipLocationChange/newChipLocationChange/index.vue'
              )
          },
          {
            path: 'ChipApplicationForm',
            name: 'ChipApplicationForm',
            meta: {
              title: '芯片补差申请单'
            },
            component: () =>
              import(
                '@/views/mtz/annualGeneralBudget/locationChange/components/ChipLocationChange/ChipApplicationForm/index.vue'
              )
          },
        ]
      },
      {
        path: 'annualBudgetEdit',
        name: 'annualBudgetEdit',
        redirect: 'annualBudgetEdit/buyerOverview',
        component: () => import('@/views/mtz/annualBudgetEdit/index.vue'),
        meta: {
          title: '年度预算编辑'
        },
        children: [
          {
            path: 'buyerOverview',
            name: 'buyerOverview',
            meta: {
              title: '采购员预算总览'
            },
            component: () =>
              import('@/views/mtz/annualBudgetEdit/buyerOverview/index.vue')
          },
          {
            path: 'officeOverview',
            name: 'officeOverview',
            meta: {
              title: '科室预算总览'
            },
            component: () =>
              import('@/views/mtz/annualBudgetEdit/officeOverview/index.vue')
          },
          {
            path: 'brandOverview',
            name: 'brandOverview',
            meta: {
              title: '品牌预算总览'
            },
            component: () =>
              import('@/views/mtz/annualBudgetEdit/brandOverview/index.vue')
          },
          {
            path: 'otherOverview',
            name: 'otherOverview',
            meta: {
              title: '编辑其他'
            },
            component: () =>
              import('@/views/mtz/annualBudgetEdit/otherOverview/index.vue')
          }
        ]
      },
      {
        path: 'dataBase',
        name: 'dataBase',
        meta: {
          title: '数据库'
        },
        component: () => import('@/views/mtz/dataBase/index.vue'),
        redirect: 'dataBase/partsQuery',
        children: [
          {
            path: 'partsQuery',
            name: 'partsQuery',
            meta: {
              title: 'MTZ零件查询'
            },
            component: () => import('@/views/mtz/dataBase/partsQuery/index.vue')
          },
          {
            path: 'preciousMetalMarketPriceInquiry',
            name: 'preciousMetalMarketPriceInquiry',
            meta: {
              title: '贵金属市场价查询'
            },
            component: () =>
              import(
                '@/views/mtz/dataBase/preciousMetalMarketPriceInquiry/index.vue'
              )
          },
          {
            path: 'rulesQuery',
            name: 'rulesQuery',
            meta: {
              title: 'mtz规则查询'
            },
            component: () => import('@/views/mtz/dataBase/rulesQuery/index.vue')
          },
          {
            path: 'chipRulesQuery',
            name: 'chipRulesQuery',
            meta: {
              title: '芯片补差规则查询'
            },
            component: () => import('@/views/mtz/dataBase/chipRulesQuery/index.vue')
          },
          {
            path: 'sourceMarketPrice',
            name: 'sourceMarketPrice',
            meta: {
              title: 'mtz市场价来源'
            },
            component: () =>
              import('@/views/mtz/dataBase/sourceMarketPrice/index.vue')
          },
          {
            path: 'marketPriceEnquiry',
            name: 'marketPriceEnquiry',
            meta: {
              title: 'mtz市场价查询'
            },
            component: () =>
              import('@/views/mtz/dataBase/marketPriceEnquiry/index.vue')
          },
          {
            path: 'partsRelationship',
            name: 'partsRelationship',
            meta: {
              title: '一二次件零件关系'
            },
            component: () =>
              import('@/views/mtz/dataBase/partsRelationship/index.vue')
          }
        ]
      }
    ]
  },
  {
    path: 'partsRelationship',
    name: 'partsRelationship',
    meta: {
      title: '查看一/二次件零件关系'
    },
    component: () =>
      import('@/views/mtz/dataBase/partsQuery/components/partsRelationship.vue')
  },
  {
    path: 'chipCeated',
    name: 'chipCeated',
    meta: {
      title: '芯片补差单列表',
      showFooter: true
    },
    component: () =>
      import(
        '@/views/mtz/annualGeneralBudget/replenishmentManagement/components/created/index.vue'
      )
  },
  {
    path: 'chipComputed',
    name: 'chipComputed',
    meta: {
      title: '芯片补差单计算',
      showFooter: true
    },
    component: () =>
      import(
        '@/views/mtz/annualGeneralBudget/replenishmentManagement/components/created/computePage.vue'
      )
  },
  
]
