export default [
  {
    type: 'index',
    width: 50,
    label: '序号'
  },
  {
    prop: 'sectionName',
    label: '类型',
    align: 'center'
  },
  {
    prop: 'title',
    label: '报告标题',
    align: 'center'
  },
  {
    prop: 'publishDate',
    label: '发布日期',
    align: 'center'
  },
  {
    label: '状态',
    align: 'center',
    emit: 'stateChange',
    customRender: (h, scope) => {
        return <el-switch value={scope.row.published} active-text="上架" inactive-text="下架"></el-switch>
    }
  },
  {
    label: '通知',
    align: 'center',
    emit: 'msgChange',
    customRender: (h, scope) => {
        return <el-switch value={scope.row.isSendMessage} active-text="通知" inactive-text="不通知"></el-switch>
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
