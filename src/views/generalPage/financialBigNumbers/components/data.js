/*
 * @Author: moxuan
 * @Date: 2021-04-14 17:50:00
 * @LastEditTime: 2021-04-14 17:50:00
 * @LastEditors: Please set LastEditors
 * @Description: 财务大数
 */

export const tableTitle = [
  {
    props: 'year',
    name: '年份',
    key: 'SUPPLIER_NIANFEN',
    width: 100,
    required: true,
    rule: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    props: 'currency',
    name: '币种',
    key: 'BIZHONG',
    width: 120,
    required: true,
    rule: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    props: 'receivables',
    name: '应收账款',
    width: 120,
    key: 'SUPPLIER_YINGSHOUZHANGKUAN',
    required: true,
    rule: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    props: 'inventory',
    name: '存货',
    key: 'SUPPLIER_CUNHUO',
    required: true,
    rule: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    props: 'advancePayment',
    name: '预付账款',
    icon: 'iconxinxitishi',
    iconText: '或“预付款项+待摊费用”。',
    width: 120,
    key: 'SUPPLIER_YFZK',
    iconTextKey: 'SUPPLIER_YFZKBZ',
    required: true,
    rule: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    props: 'otherReceivables',
    name: '其他应收款',
    icon: 'iconxinxitishi',
    iconText: '或“其他应收款+应收补贴款”。',
    width: 120,
    key: 'SUPPLIER_QTYSK',
    iconTextKey: 'SUPPLIER_QTYSKBZ',
    required: true,
    rule: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    props: 'rollingAssetsTotal',
    name: '流动资产',
    icon: 'iconxinxitishi',
    iconText: '旧准则需减去“预计负债”。',
    width: 100,
    key: 'SUPPLIER_LDZC',
    required: true,
    rule: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    props: 'totalCurrentLab',
    name: '流动负债',
    width: 120,
    key: 'SUPPLIER_LDZL',
    required: true,
    rule: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    props: 'totalLab',
    name: '负债合计',
    width: 100,
    key: 'SUPPLIER_FZHJ',
    required: true,
    rule: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    props: 'paidInCapital',
    name: '实收资本',
    width: 100,
    key: 'SUPPLIER_SFZB',
    required: true,
    rule: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    props: 'totalOwnersEquity',
    name: '所有者权益合计',
    width: 140,
    key: 'SUPPLIER_SHOUZHEQUANYIHEJI',
    required: true,
    rule: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    props: 'assetsTotal',
    name: '资产总计',
    key: 'SUPPLIER_ZICHANZONGJI',
    width: 120,
    required: true,
    rule: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    props: 'taking',
    name: '营业收入',
    key: 'SUPPLIER_YINGYESHOURU',
    width: 120,
    required: true,
    rule: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    props: 'cost',
    name: '营业成本',
    icon: 'iconxinxitishi',
    iconText: '或“主营业务收入+其他业务利润”。',
    width: 120,
    key: 'SUPPLIER_YINGYECHENGBEN',
    required: true,
    rule: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    props: 'totalProfit',
    name: '利润总额',
    key: 'SUPPLIER_LIRUIZONGE',
    width: 120,
    required: true,
    rule: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    props: 'retainedProfits',
    name: '净利润',
    key: 'SUPPLIER_JINLIRUN',
    required: true,
    rule: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    props: 'debtRatio',
    name: '负债率（%）',
    width: 120,
    required: true,
    key: 'SUPPLIER_FUZAILV',
    rule: [
      {
        pattern:
          /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/,
        message: '请输入正确的格式',
        trigger: 'blur'
      }
    ]
  }
]
