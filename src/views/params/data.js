import changeSta from './components/changeStatus.vue'

export const PARAMS_TABLE_LIST = [
  {
    type: 'selection'
  },
  {
    label: '#',
    type: 'fullIndex',
    align: 'left',
    width: 100
  },
  {
    label: '内容',
    i18n: '内容',
    prop: 'name',
    align: 'left',
    type: 'expanded',
    width: '1050px',
    customRender: (h, scope) => {
      return scope.row.name
    }
  },
  {
    label: '状态',
    i18n: '状态',
    prop: 'state',
    customRender: (h, scope) => {
      return <changeSta row={scope.row}></changeSta>
    }
  }
]
