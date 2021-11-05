export const COLUMNS = [
  {
    type: 'fullIndex',
    width: 70
  },
  {
    prop: 'title',
    label: '主数据管理',
    i18n: '',
    type: 'expanded',
    align: 'left',
    headerAlign: 'left',
    minWidth: 160,
    emit: 'click-menu'
  }
]

export const MENUS = [
  {
    title: '零件信息',
    url: '/materielData/parts-message'
  },
  {
    title: '零件材料组信息',
    url: '/materielData/material-group'
  },
  {
    title: '产品组信息',
    url: '/materielData/product-message'
  },
  {
    title: '模具材料组信息',
    url: '/materielData/mould'
  },
  {
    title:'Heavy Item信息',
    url:'/materielData/Heavy-Item'
  },
  {
    title: '原材料信息',
    url: '/materielData/RAW-message'
  },
  {
    title: 'MTZ原材料信息',
    url: '/materielData/MTZ-RAW-materiel'
  },
  {
    title: 'MTZ材料组信息',
    url: '/materielData/MTZ-materiel-group'
  }
]
