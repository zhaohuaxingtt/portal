/*
 * @Author: moxuan
 * @Date: 2021-04-13 17:50:00
 * @LastEditTime: 2022-03-03 17:51:32
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 */

export const subSupplierTableTitle = [
  {
    props: 'name',
    name: '主要分供方名称',
    width: 200,
    key: 'SUPPLIER_ZHUYAOFENGONGFANGMINGCHENG',
    maxlength: 200,
    required: true,
    rule: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    props: 'socialcreditNo',
    name: '统一社会信用代码',
    width: 150,
    required: true,
    key: 'SUPPLIER_SHEHUITONGYIXINYONGDAIMA',
    rule: [{ required: true, message: '请输入', trigger: 'blur' }],
    maxlength: 20
  },
  {
    props: 'productName',
    name: '产品',
    width: 120,
    key: 'SUPPLIER_CHANPIN',
    maxlength: 200
  },
  {
    props: 'country',
    name: '国家',
    width: 120,
    required: true,
    key: 'SUPPLIER_GUOJIA',
    maxlength: 200,
    rule: [{ required: true, message: '请选择', trigger: 'change' }]
  },
  {
    props: 'province',
    name: '省份',
    width: 120,
    // required: true,
    key: 'SUPPLIER_SHENGFEN',
    maxlength: 200
    // rule: [{required: true, message: '请选择', trigger: 'change'}],
  },
  {
    props: 'city',
    name: '城市',
    width: 120,
    // required: true,
    key: 'SUPPLIER_CHENGSHI',
    maxlength: 200
    // rule: [{required: true, message: '请选择', trigger: 'change'}],
  },
  {
    props: 'contacts',
    name: '联系人名称',
    width: 120,
    key: 'SUPPLIER_LIANXIRENMINGCHENG',
    maxlength: 100,
    required: true,
    rule: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  { props: 'duty', name: '职务', key: 'SUPPLIER_ZHIWU', maxlength: 40 },
  {
    props: 'tel',
    name: '固定电话',
    width: 150,
    key: 'SUPPLIER_LIANXIDIANHUA',
    maxlength: 40,
    required: true,
    rule: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    props: 'mobilePhone',
    name: '手机号码',
    width: 150,
    key: 'SUPPLIER_SHOUJIHAOMA',
    rule: [
      {
        pattern:
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
        message: '请输入正确的手机号码',
        trigger: 'blur'
      }
    ],
    maxlength: 14
  },
  { props: 'fax', name: '传真', key: 'SUPPLIER_CHUANZHEN' },
  {
    props: 'email',
    name: '电子邮件',
    width: 150,
    key: 'SUPPLIER_DIANZIYOUJIAN',
    rule: [
      {
        pattern:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: '请输入正确的电子邮件',
        trigger: 'blur'
      }
    ],
    maxlength: 40
  },
  {
    props: 'cooperationLeft',
    name: '合作年限',
    key: 'SUPPLIER_HEZUONIANXIAN',
    maxlength: 200
  },
  {
    props: 'purchaseYear',
    name: '采购年份',
    key: 'SUPPLIER_CAIGOUNIANFNE',
    maxlength: 200
  },
  {
    props: 'purchaseNum',
    name: '采购量',
    key: 'SUPPLIER_CAIGOULIANG',
    maxlength: 100
  },
  {
    props: 'purchaseNumCost',
    name: '采购金额',
    key: 'SUPPLIER_CAIGOUJINE',
    maxlength: 100
  },
  {
    props: 'proportionTotal',
    name: '占总采购额比例（%）',
    width: 180,
    key: 'SUPPLIER_ZHANCAIGOUZONGBILI',
    rule: [
      {
        pattern: /^([1-9][0-9]{0,1}|100)$/,
        message: '请输入1-100的整数',
        trigger: 'blur'
      }
    ],
    maxlength: 3
  },
  {
    props: 'paymentDays',
    name: '账期（天）',
    width: 180,
    key: 'LK_ZHANGQITIAN',
    maxlength: 200,
    rule: [
      {
        pattern: /^[1-9]\d*$/,
        message: '请输入正整数',
        trigger: 'blur'
      }
    ]
  },
  {
    props: 'cashNotesPro',
    name: '现金票据比例',
    width: 150,
    key: 'SUPPLIER_XIANJINPIAOJUBILI',
    maxlength: 20,
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

export const paymentTableTitle = [
  {
    props: 'payTime',
    name: '付款记录-时间',
    key: 'SUPPLIER_FUJIANJILUSHIJIAN'
  },
  { props: 'payHabit', name: '付款习惯', key: 'SUPPLIER_FUKUANXIGUAN' },
  { props: 'payWay', name: '付款方式', key: 'SUPPLIER_FUKUANFANGSHI' },
  { props: 'productName', name: '商品/服务', key: 'SUPPLIER_SHANGPINFUWU' },
  { props: 'payRemark', name: '备注', key: 'SUPPLIER_BEIZHU' }
]
