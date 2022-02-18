/*
 * @Author: your name
 * @Date: 2021-08-04 20:49:10
 * @LastEditTime: 2022-02-18 19:54:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\kpiChart\components\data.js
 */
/*
    设置开始点 start:true
    设置开始点 start:true
*/
export const tabSetting = [
  {
    prop: 'nameZh',
    label: '供应商名称',
    permission: 'all'
  },
  {
    prop: 'all',
    label: 'KPI(ALL)',
    permission: 'all'
  },
  {
    prop: 'cs',
    label: 'KPI(CS)',
    icon: 'el-icon-minus',
    start: true,
    permission: 'cs'
  },
  {
    prop: 'mq',
    label: 'KPI(MQ)',
    permission: 'mq'
  },
  {
    prop: 'tp',
    label: 'KPI(EP)',
    permission: 'ep'
  },
  {
    prop: 'tl',
    label: 'KPI(PL)',
    permission: 'pl'
  },
  {
    prop: 'sa',
    label: 'KPI(SA)',
    permission: 'sa'
  }
]

export const tabsetting = [
  {
    type: 'selection',
    width: 50
  },
  {
    prop: '#',
    label: '#',
    i18n: '#',
    width: 50,
    align: 'center'
  },
  {
    prop: 'nameZh',
    label: '供应商名称',
    i18n: 'LK_GONGYINGSHANGMINGCHENG1',
    align: 'center',
    tooltip: true
  }
]

export const setCloum = [
  {
    prop: 'index',
    label: '#',
    i18n: '#',
    width: 50,
    align: 'center'
  },
  {
    prop: 'nameZh',
    label: '供应商名称',
    i18n: 'partsprocure.GongYingShangMingCheng',
    align: 'left',
    emit: 'go-detail',
    customRender: (h, scope) => {
      return (
        <span class="open-link-text" style="text-decoration: underline;">
          {scope.row.nameZh}
        </span>
      )
    },
    tooltip: true
  }
]
