import language from '@/utils/language'

export const tabRouterList = [
  {
    value: 1,
    name: language('NEWS_XINWENGUANLI', '新闻管理'),
    url: '/news',
    key: language('NEWS_XINWENGUANLI', '新闻管理')
  }
]

export const newsButtonList = [
  {
    value: 1,
    name: 'NEWS_XWNRGL',
    url: '/news/content',
    activePath: '/news/content',
    key: 'NEWS_XWNRGL',
    permissionKey: 'ADMIN_NEWS_MANAGEMENT_CONTENT'
  },
  {
    value: 2,
    name: 'NEWS_XWBQGL',
    url: '/news/label',
    activePath: '/news/label',
    key: 'NEWS_XWBQGL',
    permissionKey: 'ADMIN_NEWS_MANAGEMENT_LABEL'
  },
  {
    value: 3,
    name: 'NEWS_ZTXWGL',
    url: '/news/topic',
    activePath: '/news/topic',
    key: 'NEWS_ZTXWGL',
    permissionKey: 'ADMIN_NEWS_MANAGEMENT_TOPIC'
  },
  {
    value: 4,
    name: 'NEWS_KVTGL',
    url: '/news/KVmanagement',
    activePath: '/news/KVmanagement',
    key: 'NEWS_KVTGL',
    permissionKey: 'ADMIN_NEWS_MANAGEMENT_KV'
  }
]
