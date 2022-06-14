/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-18 09:48:38
 * @LastEditors: YoHo
 * @Descripttion: your project
 */
import { getDictByCode } from '@/api/dictionary'

export const tableTitle = [
  {
    props: 'nameZh',
    name: '供应商中文名',
    width: 200,
    key: 'GONGYINGSHANGZHONGWENMING',
    fixed: true,
    tooltip: true
  },
  {
    props: 'nameEn',
    name: '供应商英文名',
    width: 200,
    key: 'SupplierEn',
    tooltip: true
  },
  //   { props: '', name: '是否黑名单', width: 80, key: 'SUPPLIER_SFHMD' },
  {
    props: 'socialcreditNo',
    name: '统一社会信用代码',
    width: 200,
    key: 'UnifySocialCreditCode',
    tooltip: true
  },
  { props: 'dunsCode', name: 'DUNS', width: 150, tooltip: true },
  {
    props: 'svwTempCode',
    name: '临时号',
    width: 120,
    key: 'SUPPLIER_LINGSHIHAO',
    tooltip: true
  },
  {
    props: 'svwCode',
    name: 'SVW号',
    width: 120,
    key: 'SUPPLIER_SVWHAO',
    tooltip: true
  },
  {
    props: 'sapCode',
    name: 'SAP号',
    width: 120,
    key: 'SUPPLIER_SAPHAO',
    tooltip: true
  },
  { props: 'vwCode', name: 'VW号', key: 'SUPPLIER_VWHAO', tooltip: true },
  {
    props: 'epNatureCategory',
    name: '企业性质（大类）',
    width: 150,
    key: 'QIYEXINGZHIDALEI',
    tooltip: true
  },
  {
    props: 'epNatureSubcategory',
    name: '企业性质（小类）',
    width: 150,
    key: 'QIYEXINGZHIXIAOLEI',
    tooltip: true
  },
  //   { props: 'epNatureSubcategory', name: '企业性质（小类）', width: 150, key: 'QIYEXINGZHI', tooltip: true },
  {
    props: 'supplierType',
    name: '供应商类型',
    width: 120,
    key: 'SUPPLIER_SUPPLIERTYPE'
  },
  {
    props: 'supplierTagNameList',
    name: '供应商标签',
    width: 200,
    key: 'GONGYINGSHANGBIAOQIAN',
    tooltip: true
  },
  { props: 'supplierStatus', name: '供应商状态', width: 120, key: 'GONGHUO1' },
  //   { props: 'dept', name: '科室', width: 120, key: 'SUPPLIER_KESHI', tooltip: true },
  //   { props: 'purchaserNameZh', name: '采购员', width: 120, key: 'SPR_FRM_XGYSPJ_CGY', tooltip: true },
  //   // { props: '', name: '受控状态', width: 120, key: 'SUPPLIER_SHOUKONGZHUANGTAI' },
  {
    props: 'requestVwTime',
    name: 'VW号申请时间',
    width: 120,
    key: 'SUPPLIER_VWHSQSJ',
    tooltip: true
  },
  { props: 'vwCsf', name: 'VW CSF', width: 120, key: 'VW CSF', tooltip: true },
  {
    props: 'vwLinie',
    name: 'VW LINIE',
    width: 120,
    key: 'VW LINIE',
    tooltip: true
  },
  {
    props: 'vwStatus',
    name: 'VW号状态',
    width: 120,
    key: 'SUPPLIER_VWHZT',
    tooltip: true
  },
  {
    props: 'createDate',
    name: '创建时间',
    width: 150,
    key: 'LK_CHUANGJIANSHIJIAN',
    tooltip: true
  },
  {
    props: 'updateDate',
    name: '修改时间',
    width: 150,
    key: 'SUPPLIER_XGSJ',
    tooltip: true
  }
]
export const tableTitleGP = [
  {
    props: 'nameZh',
    name: '供应商中文名',
    width: 200,
    key: 'GONGYINGSHANGZHONGWENMING',
    fixed: true,
    tooltip: true
  },
  {
    props: 'nameEn',
    name: '供应商英文名',
    width: 200,
    key: 'SupplierEn',
    tooltip: true
  },
  //   { props: '', name: '是否黑名单', width: 80, key: 'SUPPLIER_SFHMD' },
  {
    props: 'socialcreditNo',
    name: '统一社会信用代码',
    width: 200,
    key: 'UnifySocialCreditCode',
    tooltip: true
  },
  {
    props: 'supplierTagNameList',
    name: '供应商标签',
    width: 200,
    key: 'GONGYINGSHANGBIAOQIAN',
    tooltip: true
  },
  { props: 'dunsCode', name: 'DUNS', width: 150, tooltip: true },


  {
    props: 'svwTempCode',
    name: '临时号',
    width: 120,
    key: 'SUPPLIER_LINGSHIHAO',
    tooltip: true
  },
  {
    props: 'svwCode',
    name: '正式号',
    width: 120,
    key: 'ZHENGSHIHAO',
    tooltip: true
  },
  {
    props: 'sapCode',
    name: 'SAP号',
    width: 120,
    key: 'SUPPLIER_SAPHAO',
    tooltip: true
  },
  // { props: 'vwCode', name: 'VW号', key: 'SUPPLIER_VWHAO', tooltip: true },
  {
    props: 'epNatureCategory',
    name: '企业性质（大类）',
    width: 150,
    key: 'QIYEXINGZHIDALEI',
    tooltip: true
  },
  {
    props: 'epNatureSubcategory',
    name: '企业性质（小类）',
    width: 150,
    key: 'QIYEXINGZHIXIAOLEI',
    tooltip: true
  },
  {
    props: 'supplierType',
    name: '供应商类型',
    width: 120,
    key: 'SUPPLIER_SUPPLIERTYPE'
  },
  { props: 'gpBusinessTypeArrayStr', name: '业务类型', width: 120, key: 'YEWULEIXING' },
  { props: 'supplierStatus', name: '供应商状态', width: 120, key: 'GONGHUO1' },
  //   { props: 'dept', name: '科室', width: 120, key: 'SUPPLIER_KESHI', tooltip: true },
  //   { props: 'purchaserNameZh', name: '采购员', width: 120, key: 'SPR_FRM_XGYSPJ_CGY', tooltip: true },
  //   // { props: '', name: '受控状态', width: 120, key: 'SUPPLIER_SHOUKONGZHUANGTAI' },
  // {
  //   props: 'requestVwTime',
  //   name: 'VW号申请时间',
  //   width: 120,
  //   key: 'SUPPLIER_VWHSQSJ',
  //   tooltip: true
  // },
  // { props: 'vwCsf', name: 'VW CSF', width: 120, key: 'VW CSF', tooltip: true },
  // {
  //   props: 'vwLinie',
  //   name: 'VW LINIE',
  //   width: 120,
  //   key: 'VW LINIE',
  //   tooltip: true
  // },
  // {
  //   props: 'vwStatus',
  //   name: 'VW号状态',
  //   width: 120,
  //   key: 'SUPPLIER_VWHZT',
  //   tooltip: true
  // },
  {
    props: 'createDate',
    name: '创建时间',
    width: 150,
    key: 'LK_CHUANGJIANSHIJIAN',
    tooltip: true
  },
  {
    props: 'updateDate',
    name: '修改时间',
    width: 150,
    key: 'SUPPLIER_XGSJ',
    tooltip: true
  }
]
const checkEmail = (rule, value, callback) => {
  // const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  const mailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!value) {
    return callback(new Error('邮箱不能为空'))
  }
  setTimeout(() => {
    if (mailReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的邮箱格式'))
    }
  }, 100)
}
export const supplierRegister = {
  supplierName: [
    { required: true, message: '供应商名称', trigger: 'blur' },
    { trigger: 'blur' }
  ],
  contactName: [
    { required: true, message: '供应商联系人姓名', trigger: 'change' }
  ],
  contactEmail: [
    { message: '供应商联系人邮箱', trigger: 'change' },
    {
      validator: checkEmail
    }
  ]
}
// 数据字典查询
export const dictByCode = async function (key) {
  let dicResult = []
  let res = await getDictByCode(key)
  if (res.data) {
    res.data.filter((result) => {
      if (result.code === key) {
        dicResult = result.subDictResultVo || []
      }
    })
    return dicResult
  }
}
export const tabRouterList = [
  {
    value: 1,
    name: '供应商360',
    url: '/supplier/supplierList',
    activePath: '/supplier/supplierList',
    key: 'SUPPLIER_GOYINGSHANG360'
  },
  {
    value: 2,
    name: '供应商绩效',
    key: 'SUPPLIER_GONGYINGSHANGJIXIAO'
  }
]
