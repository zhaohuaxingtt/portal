/*
 * @Author: your name
 * @Date: 2022-02-07 10:34:32
 * @LastEditTime: 2023-05-06 17:51:11
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
    prop: 'ttNominateAppId', name: '关联单号', i18n: '关联单号', width: 120, emit: 'handleClickTtNominateAppId', customRender: (h, scope, c, extraData) => {
      return <span class="link">{scope.row.ttNominateAppId}</span>
    }
  },
  {
    prop: 'appName',
    name: '申请单名',
    i18n: '申请单名',
    width: 250,
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
    prop: 'supplier',
    name: '供应商',
    i18n: 'GONGYINGSHANG',
    minWidth: 200,
    customRender: (h, scope) => {
      let supplierList = scope.row.supplier?.split(',') || []
      let result = supplierList.map(item=>{
        return (<p>{item}</p>)
      })
      return result
    }
  },
  {
    prop: 'meetingName',
    name: '会议',
    i18n: 'HUIYI',
    width: 300
  },
  {
    prop: 'createDate',
    name: '创建时间',
    i18n: '创建时间',
    width: 125,
    customRender: (h, scope, c, extraData) => {
      return <div><p class="date-time-cell">
        {scope.row.createDate ? scope.row.createDate.split(' ')[0] : ''}
      </p>
        <p class="date-time-cell">
          {scope.row.createDate ? scope.row.createDate.split(' ')[1] : ''}
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
  { prop: 'linieDeptName', name: '科室', i18n: 'KESHI' },
  { prop: 'buyer', name: '采购员', i18n: 'CAIGOUYUAN' },
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
    name: '维护MTZ申请单',
    key: 'WEIHUMTZSHENGQINGDANXIANGQING',
    url: '/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow/applyInfor'
  },
  {
    id: 2,
    name: '关联定点申请与确认审批人列表',
    key: 'GUANLIANSHENGPIRENSHENGPIJILU',
    url: '/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow/approverRecord'
  },
  {
    id: 3,
    name: '生成决策资料',
    key: 'SHENGCHENGJUECEZILIAO',
    url: '/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow/decisionMaterial'
  }
]
