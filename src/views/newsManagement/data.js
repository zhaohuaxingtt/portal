import language from '@/utils/language'

export const tabRouterList = [
    {
        value: 1,
        name: language('NEWS_XINWENGUANLI', "新闻管理"),
        url: "/news",
        key: language('NEWS_XINWENGUANLI', "新闻管理"),
    },
];

export const newsButtonList = [
    {
        value: 1,
        name: language('NEWS_XWNRGL', "新闻内容管理"),
        url: "/news/content",
        activePath: "/news/content",
        key: language('NEWS_XWNRGL', "新闻内容管理"),
    },
    {
        value: 2,
        name: language('NEWS_XWBQGL', '新闻标签管理'),
        url: '/news/label',
        activePath: '/news/label',
        key: language('NEWS_XWBQGL', '新闻标签管理'),
    },
    {
        value: 3,
        name: language('NEWS_ZTXWGL', "专题新闻管理"),
        url: "/news/topic",
        activePath: "/news/topic",
        key: language('NEWS_ZTXWGL', "专题新闻管理"),
    },
    {
        value: 4,
        name: language('NEWS_KVTGL', "KV图管理"),
        url: "/news/KVmanagement",
        activePath: "/news/KVmanagement",
        key: language('NEWS_KVTGL', "KV图管理"),
    },
];
