import RouterMainData, { routerDetailMainData } from './RouterMainData'
import RouterMaterieData, { routerDetailMaterieData } from './RouterMaterieData'
import RouterMainDataSupplier, {
  RouterDetailSupplier
} from './RouterMainDataSupplier'
import RouterParities from './RouterParities'
export default [
  {
    path: '/masterDataManage',
    name: 'masterDataManage',
    meta: {
      title: 'masterDataManage'
    },
    redirect: '/main-data/product-family',
    component: () => import('@/views/MasterDataManage'),
    children: [
      ...RouterMainData,
      ...RouterMaterieData,
      ...RouterMainDataSupplier,
      ...RouterParities
    ]
  },
  ...routerDetailMaterieData,
  ...routerDetailMainData,
  ...RouterDetailSupplier
]
