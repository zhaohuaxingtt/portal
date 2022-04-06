import language from '@/utils/language'
export default [
  {
    type: 'index',
    width: 50,
    i18n: '序号'
  },
  {
    prop: 'sectionName',
    i18n: '类型',
    align: 'center',
    sortable: true
  },
  {
    prop: 'title',
    i18n: '报告标题',
    align: 'center',
    sortable: true
  },
  {
    prop: 'publishDate',
    i18n: '发布日期',
    align: 'center',
    sortable: true
  },
  {
    prop: 'published',
    i18n: '状态',
    align: 'center',
    emit: 'stateChange',
    customRender: (h, scope) => {
      return (
        <el-switch
          value={scope.row.published}
          active-text={language('上架')}
          inactive-text={language('下架')}
        ></el-switch>
      )
    },
    sortable: true
  },
  {
    i18n: '通知',
    align: 'center',
    emit: 'msgChange',
    prop: 'isSendMessage',
    customRender: (h, scope) => {
      return (
        <el-switch
          value={scope.row.isSendMessage}
          active-text={language('通知')}
          inactive-text={language('不通知')}
        ></el-switch>
      )
    },
    sortable: true
  },
  {
    i18n: '操作',
    align: 'center',
    customRender: (h, { row }, column, extraData) => {
      return (
        <span>
          <el-button type="text" onclick={() => extraData.edit(row)}>
            {language('修改')}
          </el-button>
          <el-button type="text" onclick={() => extraData.del(row)}>
            {language('删除')}
          </el-button>
        </span>
      )
    }
  }
]
