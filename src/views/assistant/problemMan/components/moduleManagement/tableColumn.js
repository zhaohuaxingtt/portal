export const tableColumn = [
  {
    type: 'selection',
    width: 50
  },
  {
    type: 'index',
    width: 50,
    label: '序号'
  },
  {
    prop: 'parentName',
    label: '父级菜单',
    align: 'center',
    sortable: true
  },
  {
    prop: 'menuName',
    label: '负责模块',
    align: 'center',
    sortable: true
  },
  {
    prop: 'name',
    label: '姓名',
    align: 'center',
    customRender: (h, scope, column, extraData) => {
      if (extraData.selectionRowIds.includes(scope.row.menuId)) {
        return (
          <iSelect
            multiple
            value={extraData.tableListData[scope.$index].adminUserId}
            onChange={(val) => {
              extraData.changeNameHandler(scope, val)
            }}
          >
            {extraData.nameList.map((item) => (
              <el-option
                key={item.id}
                label={item.nameZh}
                value={item.id}
              ></el-option>
            ))}
          </iSelect>
        )
      } else {
        let nameIds = scope.row.adminUserId
        return nameIds
          .map((e) => {
            return extraData.nameListKV[+e]
              ? extraData.nameListKV[+e].nameZh
              : ''
          })
          .join(',')
      }
    },
    sortable: true
  },
  {
    prop: 'updateDate',
    label: '添加日期',
    align: 'center',
    tooltip: true,
    sortable: true
  }
]
