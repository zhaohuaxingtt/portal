import language from '@/utils/language'
export const labelTableTitle = [
  {
    type: "selection",
    width: 60,
  },
  {
    type: "index",
    width: 70,
    // label: "序号",
  },
  {
    prop: "content",
    label: language('NEWS_BIAOQIANNEIRONG',"标签内容"),
    width: 200,
    customRender: (h, scope, column, extraData) => {
      return <span title={scope.row.content}>
        {
          scope.row.content.length > 7
            ? scope.row.content.substring(0, 7) + "..."
            : scope.row.content
        }
      </span>;
    },
  },
  {
    prop: "categoryName",
    label: language('NEWS_SUOSHUFENLEI',"所属分类"),
    customRender: (h, scope, column, extraData) => {
      return <span>{scope.row.categoryName.toString()}</span>;
    },
  },
  {
    prop: "createUserName",
    label: language('NEWS_TIANJIAREN',"添加人"),
  },
  {
    prop: "createDate",
    label: language('NEWS_TIANJIARIQI',"添加日期"),
    // align: "right",
    customRender: (h, scope, column, extraData) => {
      return <span>{scope.row.createDate?.substring(0, 10)}</span>;
    },
  },
]

export const fromData = {
  content: null,  //标签内容
  category: null,  //所属分类
  createBy: null  //添加人
}

export const category = [
  {
    value: 0,
    label: language('NEWS_TOUTIAOXINWEN',"头条新闻"),
  },
  {
    value: 1,
    label: language('NEWS_GONGYINGJIANXUN',"供应简讯"),
  },
  {
    value: 2,
    label: language('NEWS_GONGYINGSHANGXINWEN','供应商新闻'),
  },
  {
    value: 3,
    label: language('NEWS_YINGXIANGZHUANQU','影像专区'),
  },

]
