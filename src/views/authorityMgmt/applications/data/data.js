export const tableColumnSetting = [
  {
    type: 'selection',
    width: 50
  },
  {
    type: 'index',
    width: 50,
    label: '#'
  },
  {
    prop: 'appNameCn',
    i18n: '中文名称',
    align: 'center',
    emit: 'open-detail',
    customRender: (h, scope) => {
      return <span class="link-text">{scope.row.appNameCn}</span>
    },
    sortable: true
  },
  {
    prop: 'appNameEn',
    i18n: '英文名称',
    align: 'center',
    sortable: true
  },
  {
    prop: 'url',
    i18n: '链接',
    align: 'center',
    sortable: true
  },
  {
    prop: 'description',
    i18n: '系统功能说明',
    align: 'center',
    sortable: true
  }
]
