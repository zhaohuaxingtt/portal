export const COLUMNS_MENU = [
  {
    type: 'fullIndex',
    width: '120',
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
    width: '100px',
    customRender: (h, scope) => {
      return <span class="el-icon-star-off"></span>
    }
  }
]

export const COLUMNS_FAVOURITE_MENU = [
  {
    prop: 'name',
    label: '已收藏',
    i18n: '已收藏',
    type: 'expanded',
    align: 'left',
    emit: 'row-click'
  },
  {
    width: '100px',
    customRender: (h, scope) => {
      return <span class="el-icon-star-off"></span>
    }
  }
]
