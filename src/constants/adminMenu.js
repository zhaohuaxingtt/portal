const menus_admin = [
  {
    title: '新闻发布/公告发布',
    url: ''
  },
  {
    title: 'ProCS',
    url: '/org/list'
  },
  {
    title: '电子签章',
    url: ''
  },
  {
    title: '条款管理',
    url: ''
  },
  {
    title: '审批流管理',
    url: '/bpm/template'
  },
  {
    title: '主数据管理',
    url: '/main-data/product-family'
  },
  {
    title: '消息管理',
    url: '/informationMgmt/template'
  },
  {
    title: '参数管理',
    url: '/params/list'
  }
]

const getMeetingUrl = params => {
  console.log(params)
  menus_admin.unshift(
    {
      title: '会议类型管理',
      url: `http://10.122.17.38/portal/meeting/#/meeting/type?userId=${params}`
    },
    {
      title: '会议中心',
      url: `http://10.122.17.38/portal/meeting/#/meeting/home?userId=${params}`
    }
  )
  return menus_admin
}

export { getMeetingUrl }
