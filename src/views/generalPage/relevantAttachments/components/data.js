/*
 * @Author: moxuan
 * @Date: 2021-04-13 17:50:00
 * @LastEditTime: 2022-04-08 14:56:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 */

export const upadtingFilesTableTitle = [
  {
    props: 'templateName',
    name: '附件名称',
    key: 'SUPPLIER_FUJIANMINGCHENG',
    width: 330
  },
  {
    props: 'isCommitment',
    name: '操作',
    key: 'SUPPLIER_CAOZUO',
    minWidth: 180
  },
  {
    props: 'createDateTime',
    name: '上传/确认日期',
    key: 'SUPPLIER_SHANGCHUANQUERENRQI',
    width: 180
  },
  {
    props: 'attachRemark',
    name: '备注说明',
    key: 'SUPPLIER_BEIZHUSHUOMING',
    width: 160
  },
  {
    props: 'templateDemoUrl',
    name: '样例文件',
    key: 'SUPPLIER_YANGLIWENJIAN',
    width: 120
  },
  {
    props: 'notAvailableReason',
    name: '不能提供原因',
    key: 'SUPPLIER_BUNENGTIGONGYUANYIN',
    width: 160
  },
  {
    props: 'lastAvailableTime',
    name: '最晚提供时间',
    key: 'SUPPLIER_ZUIWANTIGONGSHIJIAN',
    width: 160
  },
  {
    props: 'validityOfCertificate',
    name: '证件有效期',
    key: 'SUPPLIER_ZHENGJIANYOUXIAOQI',
    width: 160
  }
]

export const freeUploadTableTitle = [
  { props: 'fileName', name: '文件名称', key: 'SUPPLIER_WENJIANMINGCHENG' },
  { props: 'fileSizeStr', name: '大小', key: 'SUPPLIER_DAXIAOMB' },
  { props: 'createDateTime', name: '上传日期', key: 'SUPPLIER_SHANGCHUQNRQI' },
  { props: 'createrName', name: '上传人', key: 'SUPPLIER_SHANGCHUANREN' },
  {
    props: 'validityOfCertificate',
    name: '证件有效期',
    key: 'SUPPLIER_ZHENGJIANYOUXIAOQI'
  }
]

export const supplierComplete = {
  // 主表
  supplierDTO: {
    addressId: '',
    stepCode: 'register', //
    legalPerson: '', //法人
    enterpriseType: '', //企业类型
    registeredCapital: '', //注册资金
    registeredDate: '', //注册日期
    country: '', //国家
    province: '', //省
    city: '', //城市
    provinceCode: '',
    countryCode: '',
    cityCode: '',
    companyAddress: '', //注册地址
    post: '', //公司注册地址邮编
    industry: '', //所属行业
    industryCode: '', //行业代码
    nameZh: '', //供应商简称中
    nameEn: '', //供应商简称英
    shortNameZh: '',
    shortNameEn: '',
    socialcreditNo: '', //社会信用代码
    dunsCode: '',
    epNatureCategory: '', //企业性质(大类)
    epNatureSubcategory: '', //企业性质(小类)
    businessScope: '', //经营范围
    businessPeriod: '', //经营期限
    businessPlaceForm: '', //经营场所所有形式
    businessPlacePosition: '', //经营场所位置
    businessOfScope: '', //业务范围
    companySize: '', //企业规模
    businessState: '', //经营状态
    financialStatus: '', //财务状况
    financialTrend: '', //财务趋势
    companyWebPage: '', //公司网址
    listingAddress: '', //上市地点
    stockCode: '', //股票代码
    isListing: '', //是否上市
    supplyProperty: '' //供货属性
  },
  // 一般供应商
  gpSupplierDTO: {},
  // 生产供应商
  ppSupplierDTO: {
    payHistory: '', //付款记录
    isSupply: '', //是否在供
    ccc: '', //CCC
    isSubjectionchina: '', //是否隶属华域
    isSafetyPart: '', //是否安全件
    isShareSupplier: '', //是否共用供应商
    supplyType: '', //供货类型
    supplyPartForm: '', //供货零件类型
    isCommunityMember: '', //是否隶属桑塔纳共同体
    isFactory: '' //是否业内工厂
  },
  // 银行
  settlementBankDTO: {
    bankCode: '', //	《金融机构营业许可证》上的编号
    bankName: '', //结算银行名称
    country: '', //国家
    province: '', //省份
    city: '', //	城市
    bankAccount: '', //结算银行账号
    bankTaxCode: '' //税务号
  }
}
