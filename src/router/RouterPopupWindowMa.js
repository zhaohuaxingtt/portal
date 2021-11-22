export default [
  {
    path: 'popup-window-management',
    name: 'popup-window-management',
    meta: {
      title: 'popup-window-management',
      activeMenu: ['RISE_ADMIN', 'ADMIN_MESSAGE']
    },
    component: () => import('@/views/popupWindowManagement')
  },
  {
    path: 'popup-window-management/create',
    name: 'create-new',
    meta: {
      title: 'create-new',
      activeMenu: ['RISE_ADMIN', 'ADMIN_MESSAGE']
    },
    component: () => import('@/views/popupWindowManagement/createNew')
  }
]
