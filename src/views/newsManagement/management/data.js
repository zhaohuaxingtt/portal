import language from '@/utils/language'
export const newsButtonList = [
  {
    value: 1,
    name: language('NEWS_MOKUAIGUANLI','模块管理'),
    url: '/news/management/moduleManagement/index',
    activePath: '/news/management/moduleManagement/index',
    key: language('NEWS_MOKUAIGUANLI','模块管理'),
  },
  {
    value: 2,
    name: language('NEWS_YONGHUZUSHEZHI','用户组设置'),
    url: '/news/management/userManagement/index',
    activePath: '/news/management/userManagement/index',
    key: language('NEWS_YONGHUZUSHEZHI','用户组设置'),
  },
  {
    value: 3,
    name: language('知识分享类型管理'),
    url: '/news/management/knowledgeManagement/index',
    activePath: '/news/management/knowledgeManagement/index',
    key: language('知识分享类型管理'),
  }
];
