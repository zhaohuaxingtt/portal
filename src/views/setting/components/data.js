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
    customRender: (h, scope) => {
      return scope.row.nameLinked || scope.row.name
    }
  },
  {
    width: '100px',
    customRender: (h, scope, column, extraData) => {
      if (scope.row.level > 1) {
        return (
          <span
            class="el-icon-star-off"
            onclick={() => extraData.handleFavorite(scope.row)}
          ></span>
        )
      }
      return ''
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
