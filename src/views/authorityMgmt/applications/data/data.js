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
    label: '中文名称',
    align: 'center',
    emit: 'open-detail',
    customRender: (h, scope) => {
      return <span class="link-text">{scope.row.appNameCn}</span>
    }
  },
  {
    prop: 'appNameEn',
    label: '英文名称',
    align: 'center'
  },
  {
    prop: 'url',
    label: '链接',
    align: 'center'
  },
  {
    prop: 'description',
    label: '系统功能说明',
    align: 'center'
  }
]
