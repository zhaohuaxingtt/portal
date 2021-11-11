export const tableSetting = [
  {
    type: 'selection',
    width: 50,
    reserveSelection: true
  },
  {
    label: '编号',
    i18n: 'ORGANIZATION_MANAGERMENT.ORG_CHOOSE_DOWNLEVEL.TABLE_INDEX',
    key: '',
    width: '50px',
    tooltip: false,
    align: 'center',
    type: 'index'
  },
  {
    prop: 'fullCode',
    label: '组织机构编号',
    i18n: 'ORGANIZATION_MANAGERMENT.ORG_CHOOSE_DOWNLEVEL.TABLE_ORG_CODE',
    width: '100px',
    align: 'center'
  },
  {
    prop: 'nameZh',
    label: '组织机构名称',
    i18n: 'ORGANIZATION_MANAGERMENT.ORG_CHOOSE_DOWNLEVEL.TABLE_ORG_NAME',
    align: 'center',
    customRender: (h, scope) => {
      return <span class="open-link-text">{scope.row.nameZh}</span>
    }
  },
  {
    prop: 'shortCode',
    label: '组织机构简码',
    i18n: 'ORGANIZATION_MANAGERMENT.ORG_CHOOSE_DOWNLEVEL.TABLE_ORG_SHORT_CODE',
    align: 'center'
  },
  {
    prop: 'shortName',
    label: '组织机构简称',
    i18n: 'ORGANIZATION_MANAGERMENT.ORG_CHOOSE_DOWNLEVEL.TABLE_ORG_SHORT_NAME',
    align: 'center'
  },
  {
    prop: 'leadUserName',
    label: '负责人',
    i18n: 'ORGANIZATION_MANAGERMENT.ORG_CHOOSE_DOWNLEVEL.TABLE_ORG_OWNER',
    align: 'center'
  }
]
