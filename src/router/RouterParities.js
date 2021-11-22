export default [
  {
    path: '/exchange-parities',
    name: 'ExchangeParities',
    component: () => import('@/views/exchangeParities/index'),
    meta: {
      activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
    }
  }
]
