/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-10-21 15:44:29
 * @LastEditors: zbin
 * @Descripttion: your project
 */
/* ntier */
export default [
  {
    path: '/supplier/supplyChainMap/NTier',
    name: 'NTier',
    component: () =>
      import(
        '@/views/supplierManagement/NTier/supplyChainMap/index.vue'
      )
  },
]
