import language from '@/utils/language'
export const tabRouterList = [
  {
    value: 1,
    message: 0,
    name: language('NEWS_XINWEN',"新闻"),
    url: "/news/news",
    activePath: "/news/news",
    key: language('NEWS_XINWEN',"新闻"),
  },
  {
    value: 2,
    message: 0,
    name: language('NEWS_GONGGAO',"公告"),
    url: "/news/notice",
    activePath: "/news/notice",
    key: language('NEWS_GONGGAO',"公告"),
  },
  {
    value: 3,
    message: 0,
    name: language('NEWS_DIAOCHAWENJUAN',"调查问卷"),
    url:"/survey/answer",
    activePath: "/survey/answer",
    key: language('NEWS_DIAOCHAWENJUAN',"调查问卷"),
  },
];

