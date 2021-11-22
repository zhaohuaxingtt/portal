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
    prop: 'userNum',
    label: '负责模块',
    align: 'center'
  },
  {
    prop: 'name',
    label: '姓名',
    align: 'center',
    customRender: (h, scope, column, extraData) => {
      if (extraData.selectionRowIds.includes(scope.row.id)) {
        return (
          <iSelect
            value={extraData.nameForm.name}
            onChange={(val) => {
              extraData.changeNameHandler(scope, val)
            }}
          >
            {extraData.nameList.map((item) => (
              <el-option
                key={item.id}
                label={item.name}
                value={item.id}
              ></el-option>
            ))}
          </iSelect>
        )
      } else {
        return <span>{scope.row.name}</span>
      }
    }
  },
  {
    prop: 'nameEn',
    label: '添加日期',
    align: 'center',
    tooltip: true
  }
]
