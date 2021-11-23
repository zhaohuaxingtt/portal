import language from '@/utils/language'
export const supplierTableTitle = [
  {
    type: "selection",
    width: 60,
  },
  {
    type: "index",
    width: 70,
    label: language('NEWS_XUHAO',"序号"),
  },
  {
    prop: "supplierNameZh",
    label: language('NEWS_GYSZWM',"供应商中文名"),
  },
  {
    prop: "supplierNameEn",
    label: language('NEWS_GYSYWM',"供应商英文名"),
  },
  {
    prop: "sapNum",
    label: language('SAPHAO',"SAP号"),
  },
  {
    prop: "svwCode",
    label: language('SVWHAO',"SVW号"),
  },
  {
    prop: "temporaryNum",
    label: language('NEWS_LINSHIHAO',"临时号"),
  },
  {
    prop: "supplierType",
    label: language("NEWS_GONGYINGSHANGLEIXING","供应商类型"),
    customRender: (h, scope, column, extraData) => {
      return <span>
        {
          scope.row.supplierType ===1
            ? language('NEWS_SHENGCHANGONGYINGSHANG','生产供应商')
            : scope.row.supplierType ===2?language('NEWS_YIBANGONGYINGSHANG','一般供应商'):scope.row.supplierType ===3?language('NEWS_NTIERGYINGSHANG','N-Tier供应商'):''
        }
      </span>;
    },
  },
  {
    prop: "supplierScope",
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
    prop: "userNum",
    label: language('NEWS_YUANGONGHAO',"员工号"),
  },
  {
    prop: "nameZh",
    label: language('NEWS_XINGMING',"姓名"),
  },
  {
    prop: "deptNameZh",
    label: language('NEWS_SUOSHUBUMEN',"所属部门"),
  },
  {
    prop: "email",
    label: language('NEWS_YOUXIANG',"邮箱"),
  },
  {
    prop: "mobile",
    label: language('NEWS_SHOUJI',"手机"),
  },
  {
    prop: "phone",
    label: language('NEWS_DIANHUA',"电话"),
  },
]

export const supplierType = [
  {
    label:language('NEWS_YIBANGONGYINGSHANG','一般供应商'),
    value:2
  },
  {
    label:language('NEWS_SHENGCHANGONGYINGSHANG','生产供应商'),
    value:1
  },{
    label:language('NEWS_NTIERGYINGSHANG','N-Tier供应商'),
    value:3
  }
]
