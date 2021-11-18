import language from '@/utils/language'
export const userNewTableTitle = [
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
    prop: "providerNameZh",
    label: language('NEWS_GYSZWM',"供应商中文名"),
  },
  {
    prop: "providerNameEn",
    label: language('NEWS_GYSYWM',"供应商英文名"),
  },
  {
    prop: "sapNum",
    label: language('SAPHAO',"SAP号"),
  },
  {
    prop: "svwNum",
    label: language('SVWHAO',"SVW号"),
  },
  {
    prop: "temporaryNum",
    label: language('NEWS_LINSHIHAO',"临时号"),
  },
  {
    prop: "providerType",
    label: language("NEWS_GONGYINGSHANGLEIXING","供应商类型"),
    customRender: (h, scope, column, extraData) => {
      return <span>
        {
          scope.row.providerType ===1
            ? language('NEWS_SHENGCHANGONGYINGSHANG','生产供应商')
            : scope.row.providerType ===2?language('NEWS_YIBANGONGYINGSHANG','一般供应商'):scope.row.providerType ===3?language('NEWS_NTIERGYINGSHANG','N-Tier供应商'):''
        }
      </span>;
    },
  },
  {
    prop: "providerRange",
    label: language('NEWS_GONGYINGSHANGHFANWEI',"供应商范围"),
  },
]
export const userTableTitle = [
  {
    type: "selection",
    width: 60,
  },
  {
    type: "index",
    width: 70,
    label: language('NEWS_BIANHAO',"编号"),
  },
  {
    prop: "userName",
    label: language('NEWS_XINGMING',"姓名"),
  },

  {
    prop: "email",
    label: language('NEWS_DIANZIYOUXIANG',"电子邮箱"),
  },
  {
    prop: "userNum",
    label: language('NEWS_GONGHAO',"工号"),
  },
  {
    prop: "dept",
    label: language('NEWS_SUOSHUBUMEN',"所属部门"),
  },
]

export const userType = [
  {
    label: language('NEWS_GONGYINGSHANGYONGHU','供应商用户'),
    value: 0
  },
  {
    label: language('NEWS_YUANGONGYONGHU','员工用户'),
    value: 1
  },
]

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
  {
    value: 4,
    label: language('NEWS_CAIGOUGONGGAO',"采购公告"),
  },
  {
    value: 5,
    label: language('NEWS_WULIUGONGGAO',"物流公告"),
  },
  {
    value: 6,
    label: language('NEWS_ZHIBAOGONGGAO',"质保公告"),
  },
  {
    value: 7,
    label: language('NEWS_CAIGOUWENJUAN','采购问卷'),
  },
  {
    value: 8,
    label: language('NEWS_WULIUWENJUAN','物流问卷'),
  },
  {
    value: 9,
    label: language('NEWS_ZHIBAOWENJUAN','质保问卷'),
  },

]

export const infoRules = {
  groupName: [
    { required: true, message: language('NEWS_BITIAN',"必填"), trigger: ["blur", "change"] },
  ],
  category: [
    { required: true, message: language('NEWS_BITIAN',"必填"), trigger: "change" },
  ],
  userType: [
    { required: true, message: language('NEWS_BITIAN',"必填"), trigger: "change" },
  ],
};
