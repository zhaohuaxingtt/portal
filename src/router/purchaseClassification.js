export default [
    {
      path: '/purchaseClassification',
      name: 'purchaseClassification',
      component: () => import('@/views/purchaseClassification/index'),
      meta: {
        activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
      }
    }
  ]