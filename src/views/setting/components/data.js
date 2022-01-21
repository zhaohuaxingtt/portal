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
      return scope.row.name
    }
  },
  {
    width: '100px',
    customRender: (h, scope, column, extraData) => {
      if (scope.row.level > 1) {
        const { row } = scope
        const { handleFavorite, favourites } = extraData
        const favouriteItem = favourites.find((e) => e.objId === row.id)
        const classes =
          favouriteItem !== undefined
            ? 'el-icon-star-on text-blue'
            : 'el-icon-star-off text-blue'
        return (
          <span
            class={classes}
            onclick={() => handleFavorite(scope.row)}
          ></span>
        )
      }
      return ''
    }
  }
]

export const COLUMNS_FAVOURITE_MENU = [
  {
    prop: 'objName',
    label: '已收藏',
    i18n: '已收藏',
    align: 'left'
  },
  {
    width: '100px',
    align: 'center',
    customRender: (h, scope, column, extraData) => {
      const { handleFavorite } = extraData
      return (
        <span
          onclick={() => handleFavorite(scope.row)}
          class="el-icon-star-on text-blue"
        ></span>
      )
    }
  }
]
