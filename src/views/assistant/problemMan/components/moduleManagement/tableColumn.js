export const tableColumn = (c) => {
  return [
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
      customRender: (h, scope) => {
        if (c.selectionRowIds.includes(scope.row.id)) {
          console.log(c.nameForm.name, '???')
          return (
            <el-form model={c.nameForm}>
              <iFormItem>
                <iSelect
                  model={c.nameForm.name}
                  filterable
                  placeholder="请选择"
                  onChange={c.changeNameHandler}
                >
                  {c.nameList.map((item) => {
                    return (
                      <el-option
                        key={item.id}
                        label={item.name}
                        value={item.id}
                      ></el-option>
                    )
                  })}
                </iSelect>
              </iFormItem>
            </el-form>
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
}
