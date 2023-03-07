/*
 * @Author: your name
 * @Date: 2022-02-07 10:34:32
 * @LastEditTime: 2023-03-07 18:53:57
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\data.js
 */
export const tableTitle = [
  { props: 'id', name: '申请单号', key: 'SHENQINGDANHAO', width: 120 },
  { props: 'ttNominateAppId', name: '关联申请单号', key: 'GLSQDH', width: 120 },
  {
    props: 'appName',
    name: '申请单名称',
    key: 'SHENQINGDANMINGCHENG',
    width: 300,
    tooltip: true
  },
  {
    props: 'flowTypeDesc',
    name: '流程类型',
    key: 'LIUCHENGLEIXING',
    width: 100
  },
  {
    props: 'appStatusDesc',
    name: '申请状态',
    key: 'SHENQINGZHUANGTAI',
    width: 100
  },
  {
    props: 'meetingName',
    name: '会议',
    key: 'HUIYI',
    width: 300
  },
  {
    props: 'freezeDate',
    name: '冻结时间',
    key: 'DONGJIESHIJIAN',
    width: 125
  },
  {
    props: 'nominateDate',
    name: '定点时间',
    key: 'DINGDIANSHIJIAN',
    width: 125
  },
  { props: 'buyer', name: '采购员', key: 'CAIGOUYUAN' },
  { props: 'linieDeptName', name: '科室', key: 'KESHI' }
  // { props: 'isRsFreezed', name: 'RS单状态', key: 'RSDANZHUANGTAI' },
  // { props: 'rsFreezeDate', name: 'RS冻结时间', key: 'RSDONGJIESHIJIAN' },
]
export const tableTitle1 = [
  {
    type: 'selection',
    width: 50,
  }, {
    type: 'index',
    label:'#',
    width: 50,
  },
  {
    prop: 'id', name: '申请单号', i18n: 'SHENQINGDANHAO', width: 120, emit: 'handleClickFsupplierName', customRender: (h, scope, c, extraData) => {
      if (scope.row.viewDetailsFlag) {
        return <span class="link">{scope.row.id}</span>
      }
      return <span>{scope.row.id}</span>
    }
  },
  {
    prop: 'ttNominateAppId', name: '关联申请单号', i18n: 'GLSQDH', width: 160, emit: 'handleClickTtNominateAppId', customRender: (h, scope, c, extraData) => {
      return <span class="link">{scope.row.ttNominateAppId}</span>
    }
  },
  {
    prop: 'appName',
    name: '申请单名称',
    i18n: 'SHENQINGDANMINGCHENG',
    width: 300,
    tooltip: true
  },
  {
    prop: 'flowTypeDesc',
    name: '流程类型',
    i18n: 'LIUCHENGLEIXING',
    width: 100
  },
  {
    prop: 'appStatusDesc',
    name: '申请状态',
    i18n: 'SHENQINGZHUANGTAI',
    width: 100
  },
  {
    prop: 'meetingName',
    name: '会议',
    i18n: 'HUIYI',
    width: 300
  },
  {
    prop: 'freezeDate',
    name: '冻结时间',
    i18n: 'DONGJIESHIJIAN',
    width: 125,
    customRender: (h, scope, c, extraData) => {
      return <div><p class="date-time-cell">
        {scope.row.freezeDate ? scope.row.freezeDate.split(' ')[0] : ''}
      </p>
        <p class="date-time-cell">
          {scope.row.freezeDate ? scope.row.freezeDate.split(' ')[1] : ''}
        </p></div>
    }
  },
  {
    prop: 'nominateDate',
    name: '定点时间',
    i18n: 'DINGDIANSHIJIAN',
    width: 125,
    customRender: (h, scope, c, extraData) => {
      return <div><p class="date-time-cell">
        {scope.row.nominateDate ? scope.row.nominateDate.split(' ')[0] : ''}
      </p>
        <p class="date-time-cell">
          {scope.row.nominateDate ? scope.row.nominateDate.split(' ')[1] : ''}
        </p></div>
    }
  },
  { prop: 'buyer', name: '采购员', i18n: 'CAIGOUYUAN' },
  { prop: 'linieDeptName', name: '科室', i18n: 'KESHI' }
  // { prop: 'isRsFreezed', name: 'RS单状态', i18n: 'RSDANZHUANGTAI' },
  // { prop: 'rsFreezeDate', name: 'RS冻结时间', i18n: 'RSDONGJIESHIJIAN' },
]

export const tableTitleCp = [
  { props: 'name', name: '会议名称', key: 'HUIYIMINGCHENG' },
  { props: 'meetingTypeName', name: '会议类型', key: 'HUIYILEIXING' },
  { props: 'startDate', name: '开始日期', key: 'KAISHIRIQI' },
  { props: 'startTime', name: '开始时间', key: 'KAISHISHIJIAN' },
  { props: 'meetingPlace', name: '会议地点', key: 'HUIYIDIDIAN' }
]

export const topImgList = [
  {
    id: 1,
    name: 'MTZ申请单详情',
    key: 'MTZSHENGQINGDANXIANGQING',
    url: '/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow/applyInfor'
  },
  {
    id: 2,
    name: '审批人&审批记录',
    key: 'SHENGPIRENSHENGPIJILU',
    url: '/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow/approverRecord'
  },
  {
    id: 3,
    name: '决策资料',
    key: 'JUECEZILIAO',
    url: '/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow/decisionMaterial'
  }
]
