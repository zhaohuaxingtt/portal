import language from '@/utils/language'
  export const newsClassify = [
    {
      label: language('NEWS_TOUTIAOXINWEN',"头条新闻"),
      value: 0,
    },
    {
      label: language('NEWS_GONGYINGJIANXUN',"供应简讯"),
      value: 1,
    },
    {
      label: language('NEWS_GONGYINGSHANGXINWEN','供应商新闻'),
      value: 2,
    },
    {
      label: language('NEWS_YINGXIANGZHUANQU','影像专区'),
      value: 3,
    },
    
  ];
  export const newsTypes = [
    {
      label: language('NEWS_TUJIXINWEN','图集新闻'),
      value: 1,
    },
    {
      label: language('NEWS_SHIPINXINWEN','视频新闻'),
      value: 2,
    },
  ];
  export const newsAllTypes = [
    {
      label: language('NEWS_TUWENXINWEN','图文新闻'),
      value: 0,
    },
    {
      label: language('NEWS_TUJIXINWEN','图集新闻'),
      value: 1,
    },
    {
      label: language('NEWS_SHIPINXINWEN','视频新闻'),
      value: 2,
    },
  ];
  export const baseRules = {
    category: [
      { required: true, message: language('NEWS_BITIAN',"必填"), trigger: "blur" },
    ],
    name: [
      { required: true, message: language('NEWS_BITIAN',"必填"), trigger: "blur" },
      { min: 1, max: 80, message: language('NEWS_ZUIDASHURUCHANGDU80',"最大输入长度80"), trigger: "blur" },
    ],
    source: [
      { required: true, message: language('NEWS_BITIAN',"必填"), trigger: "blur" },
    ],
    publishDate: [
      { required: true, message: language('NEWS_BITIAN',"必填"), trigger: "blur" },
    ],
    isTop: [
      { required: true, message: language('NEWS_BITIAN',"必填"), trigger: "blur" },
    ],
    publishRange: [
      { required: true, message: language('NEWS_BITIAN',"必填"), trigger: "blur" },
    ],
    summary: [
      { required: true, message: language('NEWS_BITIAN',"必填"), trigger: "blur" },
      { min: 1, max: 100, message: language('NEWS_ZUIDASHURUCHANGDU100',"最大输入长度100"), trigger: "blur" },
    ],
  };

  export const supplierTableListColumns =[
    {
      type: "selection",
      width: 68,
    },
    {
      type: "index",
      width: 50,
      label: language('NEWS_BIANHAO',"编号"),
    },
    {
      prop: "title",
      width: 500,
      label: language('NEWS_XINWENBIAOTI',"新闻标题"),
    },
    {
      prop: "source",
      label: language('NEWS_LAIYUAN',"来源"),
    },
    {
      prop: "publishDate",
      label: language('NEWS_FABURIQI',"发布日期"),
    },
    {
      prop: "category",
      label: language('NEWS_XINWENFENLEI',"新闻分类"),
      customRender: (h, scope) => {
        let obj = newsClassify?.reduce((obj, item) => {
          return { ...obj, [item.value]: item.label };
        }, {});
        return <span class="">{obj[scope.row.category]}</span>;
      },
    },
  ];
