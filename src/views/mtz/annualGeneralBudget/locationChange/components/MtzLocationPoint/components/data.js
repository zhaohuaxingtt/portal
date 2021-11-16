export const tableTitle = [
    { props: 'id', name: '申请单号', key: 'SHENQINGDANHAO' },
    { props: 'ttNominateAppId', name: '关联申请单号', key: 'GUANLIANSHENQINGDANHAO' },
    { props: 'appName', name: '申请单名称', key: 'SHENQINGDANMINGCHENG' },
    { props: 'flowTypeDesc', name: '流程类型', key: 'LIUCHENGLEIXING' },
    { props: 'appStatusDesc', name: '申请状态', key: 'SHENQINGZHUANGTAI' },
    { props: 'appStatusName', name: '会议', key: 'HUIYI' },
    { props: 'freezeDate', name: '冻结时间', key: 'DONGJIESHIJIAN' },
    { props: 'nominateDate', name: '定点时间', key: 'DINGDIANSHIJIAN' },
    { props: 'buyer', name: '采购员', key: 'CAIGOUYUAN' },
    { props: 'linieDeptName', name: '科室', key: 'KESHI' },
    // { props: 'isRsFreezed', name: 'RS单状态', key: 'RSDANZHUANGTAI' },
    // { props: 'rsFreezeDate', name: 'RS冻结时间', key: 'RSDONGJIESHIJIAN' },
]

export const tableTitleCp = [
  { props: 'name', name: '会议名称', key: 'HUIYIMINGCHENG' },
  { props: 'meetingTypeName', name: '会议类型', key: 'HUIYILEIXING' },
  { props: 'startDate', name: '开始日期', key: 'KAISHIRIQI' },
  { props: 'startTime', name: '开始时间', key: 'KAISHISHIJIAN' },
  { props: 'meetingPlace', name: '会议地点', key: 'HUIYIDIDIAN' },
]

export const topImgList = [
  {
    id: 1,
    name:"MTZ申请单详情",
    key: 'MTZSHENGQINGDANXIANGQING',
    url: '/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow/applyInfor'
  },{
    id: 2,
    name:"审批人&审批记录",
    key: 'SHENGPIRENSHENGPIJILU',
    url: '/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow/approverRecord'
  },{
    id: 3,
    name:"决策资料",
    key: 'JUECEZILIAO',
    url: '/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow/decisionMaterial'
  }
]