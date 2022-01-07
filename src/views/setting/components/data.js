export const COLUMNS_MENU = [
  {
    type: 'fullIndex',
    width: '80',
    align: 'left',
    label: '序号'
  },
  {
    prop: 'name',
    label: '名称',
    i18n: '名称',
    type: 'expanded',
    align: 'left',
    emit: 'row-click'
  },
  {
    customRender: (h, scope) => {
      return <span class="el-icon-star-off"></span>
    }
  }
]
