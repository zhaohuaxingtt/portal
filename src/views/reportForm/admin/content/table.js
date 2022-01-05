export default [
  {
    type: 'index',
    width: 50,
    label: '序号'
  },
  {
    prop: 'type',
    label: '类型',
    align: 'center'
  },
  {
    prop: 'menuName',
    label: '报告标题',
    align: 'center'
  },
  {
    prop: 'menuName',
    label: '发布日期',
    align: 'center'
  },
  {
    label: '状态',
    align: 'center',
    customRender: (h, scope, column, extraData) => {
        return <el-switch value={scope.row.state} onchange={e => extraData.stateChange(e,scope.$index) }></el-switch>
    }
  },
  {
    label: '通知',
    align: 'center',
    customRender: (h, scope, column, extraData) => {
        return <el-switch value={scope.row.notice} onChange={e => extraData.msgChange(e,scope.$index) }></el-switch>
    }
  },
  {
    label: '操作',
    align: 'center',
    customRender: (h, {row}, column, extraData) => {
        return <span>
            <el-button type="text" onclick={() => extraData.edit(row)}>修改</el-button>
            <el-button type="text" onclick={() => extraData.del(row)}>删除</el-button>
        </span>
    }
  }
]
