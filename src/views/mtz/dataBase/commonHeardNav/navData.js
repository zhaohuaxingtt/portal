/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-22 11:05:40
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
 */
/*
 * @Author: yourname
 * @Descripttion: your project
 */
export const tabRouterList1 = [
  {
    value: 1,
    name: '数据库',
    url: '/mtz/dataBase',
    activePath: '/mtz/dataBase',
    key: 'SHUJUKU',
    permissionKey:"PORTAL_MTZ_SHUJUKU"
  },
];

export const tabRouterList2 = [
  {
    value: 1,
    name: 'MTZ零件查询',
    url: '/mtz/dataBase/partsQuery',
    activePath: '/mtz/dataBase/partsQuery',
    key: 'MTZLINGJIANCHAXUN',
    permissionKey:"PORTAL_MTZ_SEARCH_MTZLINGJIANCHAXUN"
  },
  {
    value: 2,
    name: 'MTZ规则查询',
    url: '/mtz/dataBase/rulesQuery',
    activePath: '/mtz/dataBase/rulesQuery',
    key: 'MTZGUIZECHAXUN',
    permissionKey:"PORTAL_MTZ_SEARCH_MTZGUIZECHAXUN"
  },
  {
    value: 3,
    name: 'MTZ市场价来源',
    url: '/mtz/dataBase/sourceMarketPrice',
    activePath: '/mtz/dataBase/sourceMarketPrice',
    key: 'MTZSHICHANGJIALAIYUAN',
    permissionKey:"PORTAL_MTZ_SEARCH_MTZSHICHANGJIALAIYUAN"
  },
  {
    value: 4,
    name: 'MTZ市场价查询',
    url: '/mtz/dataBase/marketPriceEnquiry',
    activePath: '/mtz/dataBase/marketPriceEnquiry',
    key: 'MTZSHICHANGJIACHAXUN',
    permissionKey:"PORTAL_MTZ_SEARCH_MTZSHICHANGJIACHAXUN"
  },
  {
    value: 5,
    name: '贵金属市场价查询',
    url: '/mtz/dataBase/preciousMetalMarketPriceInquiry',
    activePath: '/mtz/dataBase/preciousMetalMarketPriceInquiry',
    key: 'GUIJINSHUSHICHANGJIACHAXUN',
    permissionKey:"PORTAL_MTZ_SEARCH_GUIJINSHUSHICHANGJIACHAXUN"
  }
];
