import language from '@/utils/language'

export default [
  {
    type: 'selection',
    width: 50
  },
  {
    type: 'index',
    label: '序号',
    width: 100
  },
  {
    prop: 'name',
    label: '标题',
    i18n: '标题',
    align: 'center'
  },
  {
    prop: 'updateDt',
    label: '更新日期',
    i18n: '更新日期',
    align: 'center'
  },
  {
    prop: 'version',
    label: '版本号',
    i18n: '版本号',
    align: 'center'
  },
  {
    label: '状态',
    i18n: '状态',
    align: 'center',
    customRender: (h, { row, $index }, col, { updateState }) => {
      return (
        <div on-click={(e) => e.stopPropagation()}>
          <el-switch
            value={row.published}
            active-text={language('上架')}
            inactive-text={language('下架')}
            on-change={(e) => updateState(e, $index, row)}
          ></el-switch>
        </div>
      )
    }
  },
  {
    label: '是否发送消息',
    i18n: '是否发送消息',
    align: 'center',
    customRender: (h, { row, $index }, col, { updateMsg }) => {
      return (
        <div on-click={(e) => e.stopPropagation()}>
          <el-switch
            value={row.sendMessage}
            active-text={language('是')}
            disabled={row.published}
            inactive-text={language('否')}
            on-change={(e) => updateMsg(e, $index)}
          ></el-switch>
        </div>
      )
    }
  }
]
