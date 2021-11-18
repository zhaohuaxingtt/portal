import language from '@/utils/language'
// 是否置顶
export const isTopOption = [
  {
    label:language('TERMS_FOU', '否'),
    value: 0,
  },
  {
    label: language('TERMS_SHI', '是'),
    value: 1,
  },
];

// 公告状态
export const noticeStatus = [
  {
    label: language('NEWS_CAOGAO',"草稿"),
    value: 0,
  },
  {
    label: language('NEWS_YIFABU',"已发布"),
    value: 2,
  },
];
export const noticeStatusObj = {
  "0": language('NEWS_CAOGAO',"草稿"),
  "1": language('NEWS_YIFABU',"已发布"),
  "2": language('NEWS_YIFABU',"已发布"),
};

// 公告类型
export const noticeTypes = [
  {
    label: language('NEWS_CAIGOUGONGGAO',"采购公告"),
    value: 4,
  },
  {
    label: language('NEWS_WULIUGONGGAO',"物流公告"),
    value: 5,
  },
  {
    label: language('NEWS_ZHIBAOGONGGAO',"质保公告"),
    value: 6,
  },
];
export const noticeTypesObj = {
  "4": language('NEWS_CAIGOUGONGGAO',"采购公告"),
  "5": language('NEWS_WULIUGONGGAO',"物流公告"),
  "6": language('NEWS_ZHIBAOGONGGAO',"质保公告"),
};
