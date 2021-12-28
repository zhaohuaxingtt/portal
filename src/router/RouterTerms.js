export default [
  {
    path: '/terms',
    name: 'terms',
    meta: {
      title: '条款模板管理'
    },
    component: () => import('@/views/terms/index.vue'),
    children: [
      {
        path: "/terms/management",
        name: "termsManagement",
        // redirect: "/terms/management/standard",
        component: () => import("@/views/terms/termsManagement/index.vue"),
      },
      {
        path: "/terms/management/addClause",
        name: "addClause",
        component: () => import(`@/views/terms/termsManagement/components/addClause.vue`),
      },
      {
        path: "/terms/management/clauseDetail",
        name: "clauseDetail",
        component: () => import(`@/views/terms/termsManagement/components/clauseDetail.vue`),
      },
    ]
  }
]
