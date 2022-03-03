/*
 * @Author: wentliao
 * @Date: 2021-12-30 17:36:03
 * @Description: 评分设置-- 暂时放在souring里面 后期会移动到protal里面
 */

export default [
  {
    path: "/backstagemanagement",
    meta: {
      title: "设置评分管理",
      activeMenu: ['RISE_COMMON_FUNCTION', 'BACKSTAGEMANAGEMENT']
    },
    component: () => import("@/views/backstagemanagement"),
    redirect: "/backstagemanagement/configscoredept",
    children: [
      {
        path: "/backstagemanagement/configscoredept",
        name: "configscoredept",
        meta: {
          title: "评分部门设置",
          activeMenu: ['RISE_COMMON_FUNCTION', 'BACKSTAGEMANAGEMENT']
        },
        component: () => import("@/views/backstagemanagement/configscoredept"),
      },
      {
        path: "qualityscorerules",
        name: "qualityscorerules",
        meta: {
          title: "质量评分预设规则",
          activeMenu: ['RISE_COMMON_FUNCTION', 'BACKSTAGEMANAGEMENT']
        },
        component: () => import("@/views/backstagemanagement/qualityscorerules"),
      },
      {
        path: "defaultLogic",
        name: "defaultLogic",
        meta: {
          title: "定点申请预设逻辑",
          activeMenu: ['RISE_COMMON_FUNCTION', 'BACKSTAGEMANAGEMENT']
        },
        component: () => import("@/views/backstagemanagement/defaultLogic"),
      },
      {
        path: "partsItemConfig",
        name: "partsItemConfig",
        meta: {
          title: "零件采购类型规则维护",
          activeMenu: ['RISE_COMMON_FUNCTION', 'BACKSTAGEMANAGEMENT']
        },
        component: () => import("@/views/backstagemanagement/partsItemConfig"),
      }
    ]
  }
]