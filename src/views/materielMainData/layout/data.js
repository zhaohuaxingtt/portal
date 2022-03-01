export const COLUMNS = [
  {
    type: 'fullIndex',
    width: 40
  },
  {
    prop: 'title',
    label: '主数据管理',
    i18n: '主数据管理',
    align: 'left',
    headerAlign: 'left',
    emit: 'click-menu',
    customRender: (h, scope) => {
      return <span class="cursor-pointer">{scope.row.title}</span>
    }
  }
]

export const MENUSZh = [
  {
    title: '零件信息',
    url: '/materielData/parts-message',
    permissionKey: 'ADMIN_MATERIEL_DATA_PARTS_MESSAGE'
  },
  {
    title: '零件材料组信息',
    url: '/materielData/material-group',
    permissionKey: 'ADMIN_MATERIEL_DATA_MATERIAL_GROUP'
  },
  {
    title: '产品组信息',
    url: '/materielData/product-message',
    permissionKey: 'ADMIN_MATERIEL_DATA_PRODUCT_MESSAGE'
  },
  {
    title: '模具材料组信息',
    url: '/materielData/mould',
    permissionKey: 'ADMIN_MATERIEL_DATA_MOULD'
  },
  {
    title: 'Heavy Item信息',
    url: '/materielData/Heavy-Item',
    permissionKey: 'ADMIN_MATERIEL_DATA_HEAVY_ITEM'
  },
  {
    title: '原材料信息',
    url: '/materielData/RAW-message',
    permissionKey: 'ADMIN_MATERIEL_DATA_RAW_MESSAGE'
  },
  {
    title: 'MTZ原材料信息',
    url: '/materielData/MTZ-RAW-materiel',
    permissionKey: 'ADMIN_MATERIEL_DATA_MTZ_RAW_MATERIEL'
  },
  {
    title: 'MTZ材料组信息',
    url: '/materielData/MTZ-materiel-group',
    permissionKey: 'ADMIN_MATERIEL_DATA_MTZ_MATERIEL_GROUP'
  }
]
export const MENUSEn = [
  {
    title: 'Part Information',
    url: '/materielData/parts-message',
    permissionKey: 'ADMIN_MATERIEL_DATA_PARTS_MESSAGE'
  },
  {
    title: 'Part Material Group Information',
    url: '/materielData/material-group',
    permissionKey: 'ADMIN_MATERIEL_DATA_MATERIAL_GROUP'
  },
  {
    title: 'Product Group Information',
    url: '/materielData/product-message',
    permissionKey: 'ADMIN_MATERIEL_DATA_PRODUCT_MESSAGE'
  },
  {
    title: 'Mold Material Group Information',
    url: '/materielData/mould',
    permissionKey: 'ADMIN_MATERIEL_DATA_MOULD'
  },
  {
    title: 'Heavy Item Information',
    url: '/materielData/Heavy-Item',
    permissionKey: 'ADMIN_MATERIEL_DATA_HEAVY_ITEM'
  },
  {
    title: 'Raw Material Information',
    url: '/materielData/RAW-message',
    permissionKey: 'ADMIN_MATERIEL_DATA_RAW_MESSAGE'
  },
  {
    title: 'MTZ Raw Material Information',
    url: '/materielData/MTZ-RAW-materiel',
    permissionKey: 'ADMIN_MATERIEL_DATA_MTZ_RAW_MATERIEL'
  },
  {
    title: 'MTZ Material Group Information',
    url: '/materielData/MTZ-materiel-group',
    permissionKey: 'ADMIN_MATERIEL_DATA_MTZ_MATERIEL_GROUP'
  }
]