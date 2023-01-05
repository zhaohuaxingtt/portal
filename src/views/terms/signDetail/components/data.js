// 导出表格
export const tableTitle = [
  { props: 'termsCode', name: '条款编码', i18n: 'TM_TIAOKUANBIANMA' },
  { props: 'name', name: '条款名称', i18n: 'TM_TIAOKUANMINGCHENG' },
  { props: 'termsVersion', name: '版本号', i18n: 'TM_BANBENHAO' },
  { props: 'state', name: '条款状态', i18n: 'TM_TIAOKUANZHUANGTAI' },
  {
    props: 'inDate',
    name: '条款生效时间',
    i18n: 'TM_TIAOKUAISHENGXIAOSHIJIAN'
  },
  { props: 'publishDate', name: '发布日期', i18n: 'TM_FABURIQI' },
  { props: 'signNode', name: '签署节点', i18n: 'TM_QIANSHUJIEDIAN' },
  { props: 'signResult', name: '签署情况', i18n: 'TM_QIANSHUQINGKUANG' },
  {
    props: 'isPersonalTerms',
    name: '是否个人条款',
    i18n: 'TM_SHIFOUGERENTIAOKUAN'
  },
  {
    props: 'supplierRange',
    name: '供应商范围',
    i18n: 'TM_GONGYINGSHANGFANWEI'
  },
  {
    props: 'supplierIdentity',
    name: '供应商身份',
    i18n: 'TM_GONGYINGSHANGSHENFEN'
  },
  {
    props: 'supplierContacts',
    name: '供应商用户',
    i18n: 'TM_GONGYINGSHANGYONGHU'
  },
  { props: 'chargeName', name: '条款负责人', i18n: 'TM_TIAOKUANFUZEREN' }
]

// 条款状态
export const statusList = [
  {
    label: '草稿',
    value: '01',
    i18n: 'TM_CAOGAO'
  },
  {
    label: '待生效',
    value: '02',
    i18n: 'TM_DAISHENGXIAO'
  },
  {
    label: '生效',
    value: '03',
    i18n: 'TM_SHENGXIAO'
  },
  {
    label: '失效',
    value: '04',
    i18n: 'TM_SHIXIAO'
  }
]

// 供应商范围
export const supplierRangeList = [
  {
    label: '生产供应商',
    value: 'PP',
    i18n: 'TM_SHENGCHANGONGYINGSHANG'
  },
  {
    label: '一般供应商',
    value: 'GP',
    i18n: 'TM_YIBANGONGYINGSHANG'
  },
  {
    label: 'N-Tier',
    value: 'NT',
    i18n: ''
  }
]

// 供应商身份
export const supplierIdentityList = [
  {
    label: '临时',
    value: '0',
    i18n: 'TM_LINSHI'
  },
  {
    label: '正式',
    value: '1',
    i18n: 'TM_ZHENGSHI'
  },
  {
    label: '储蓄池',
    value: '2',
    i18n: 'TM_CHUXUCHI'
  }
]

// 是否个人条款
export const isPersonalTermsList = [
  {
    label: '是',
    value: true,
    i18n: 'TM_SHI'
  },
  {
    label: '否',
    value: false,
    i18n: 'TM_FOU'
  }
]

// 供应商用户范围
export const supplierContactsList = [
  {
    label: '所有用户',
    value: '01',
    i18n: 'TM_SUOYOUYONGHU'
  },
  {
    label: '主联系人',
    value: '02',
    i18n: 'TM_ZHULIANXIREN'
  }
]

// 是否在线确认
export const isSignatureList = [
  {
    label: '是',
    value: true,
    i18n: 'TM_SHI'
  },
  {
    label: '否',
    value: false,
    i18n: 'TM_FOU'
  }
]

// 签署状态
export const signStatusList = [
  {
    label: '未签署',
    value: '01',
    i18n: 'TM_WEIQIANSHU'
  },
  {
    label: '已签署标准',
    value: '02',
    i18n: 'TM_YIQIANSHUBIAOZHUN'
  },
  {
    label: '已签署非标',
    value: '03',
    i18n: 'TM_YIQIANSHUFEIBIAO'
  },
  {
    label: '例外',
    value: '04',
    i18n: 'TM_LIWAI'
  }
]

export const isPersonalTermsObj = {
  true: 'TM_SHI',
  false: 'TM_FOU'
}

export const stateObj = {
  '01': 'TM_CAOGAO',
  '02': 'TM_DAISHENGXIAO',
  '03': 'TM_SHENGXIAO',
  '04': 'TM_SHIXIAO'
}

export const supplierRangeObj = {
  PP: 'TM_SHENGCHANGONGYINGSHANG',
  GP: 'TM_YIBANGONGYINGSHANG',
  NT: 'N-Tier'
}

export const supplierContactsObj = {
  '01': 'TM_SUOYOUYONGHU',
  '02': 'TM_ZHULIANXIREN'
}

export const supplierIdentityObj = {
  0: 'TM_LINSHI',
  1: 'TM_ZHENGSHI',
  2: 'TM_CHUXUCHI'
}