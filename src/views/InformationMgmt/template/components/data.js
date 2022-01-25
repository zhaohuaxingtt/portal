import CellContent from './cellContent'
export const tableSetting = [
  {
    type: 'selection'
  },
  {
    type: 'index',
    width: 50
  },
  {
    prop: 'code',
    label: '模板编码',
    i18n: '模板编号',
    align: 'center',
    width: 100,
    tooltip: true
  },
  {
    prop: 'name',
    label: '模板名称',
    i18n: '模板名称',
    // openNewPage:true,
    minWidth:'150px',
    customRender: (h, scope) => {
      return <span class="link-text">{scope.row.name}</span>
    },
    tooltip: true,
    emit: 'go-detail',
    
  },
  {
    prop: 'content',
    label: '模板内容',
    i18n: '模板内容',
    align: 'center',
    tooltip: true,
    minWidth: '150',
    customRender: (h, scope) => {
      return <CellContent content={scope.row.richContent} />
    }
  },
  {
    prop: 'title',
    label: '模板标题',
    i18n: '模板标题',
    align: 'center',
    tooltip: true,
    minWidth: '150'
  },
  {
    prop: 'type',
    label: '模板类型',
    i18n: '模板类型',
    align: 'center',
    customRender: (h, scope, column, extraData) => {
      return extraData.templateTypeMap[scope.row.type] || ''
    }
  },
  {
    prop: 'createDate',
    label: '创建时间',
    i18n: '创建时间',
    align: 'center',
    width: 100,
    customRender: (h, scope) => {
      if (scope.row.createDate) {
        return moment(scope.row.createDate).format('YYYY-MM-DD')
      }
      return scope.row.createDate
    }
  },
  {
    prop: 'updateDate',
    label: '更新时间',
    i18n: '更新时间',
    align: 'center',
    width: 100,
    customRender: (h, scope) => {
      if (scope.row.updateDate) {
        return moment(scope.row.updateDate).format('YYYY-MM-DD')
      }
      return scope.row.updateDate
    }
  },
  {
    prop: 'version',
    label: '发布次数',
    i18n: '发布次数',
    align: 'center',
    width: 100
  },
  {
    prop: 'updateDate',
    label: '最后发布时间',
    i18n: '最后发布时间',
    align: 'center',
    width: 160,
    tooltip: true,
    customRender: (h, scope) => {
      return scope.row.updateDate
    }
  }
]

export const TEMPLATE_CHANNELS = [
  {
    label: '站内信模板',
    value: 16
  },
  {
    label: '邮件模板',
    value: 2
  }
]

export const TEMPLATE_CHANNEL_MAP = {
  2: '邮件模板',
  16: '站内信模板'
}

export const TOOLBAR = {
  16: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: ['small', false, 'large', 'huge'] }], // 用户自定义下拉
    ['bold', 'italic', 'underline', 'strike'], // 切换按钮
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }], // 减少缩进/缩进
    [{ color: [] }, { background: [] }], // 主题默认下拉，使用主题提供的值
    [{ align: [] }],
    ['clean'] // 清除格式
  ],
  2: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: ['small', false, 'large', 'huge'] }], // 用户自定义下拉
    ['bold', 'italic', 'underline', 'strike'], // 切换按钮
    ['image'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }], // 减少缩进/缩进
    [{ color: [] }, { background: [] }], // 主题默认下拉，使用主题提供的值
    [{ align: [] }],
    ['clean'] // 清除格式
  ]
}

export const PARAMETER_OPTIONS = [
  { label: '姓名', value: '${sponsor}' },
  { label: '开始时间', value: '${beginDate}' },
  { label: '结束时间', value: '${endDate}' },
  { label: '地址', value: '${addr}' },
  { label: '链接', value: '${url}' }
]

export const TEMPLATE_TYPES = [
  {
    label: '未知类型',
    value: 0
  },
  {
    label: '系统通知',
    value: 1
  },
  {
    label: '头条新闻',
    value: 2
  },
  {
    label: '会议提醒',
    value: 3
  },
  {
    label: '话题提醒',
    value: 4
  },
  {
    label: '新闻',
    value: 5
  },
  {
    label: '通告',
    value: 6
  },
  {
    label: '审批提醒',
    value: 7
  },
  {
    label: '其他',
    value: 8
  }
]
