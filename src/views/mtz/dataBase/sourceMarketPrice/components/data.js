/*
 * @Author: your name
 * @Date: 2021-10-07 15:05:40
 * @LastEditTime: 2021-11-16 11:48:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\dataBase\sourceMarketPrice\components\data.js
 */
// 员工列表Table配置
export const tableSetting = [
  {
    props: 'parentMaterialCategoryCode',
    name: '原材料大类',
    key: 'YUANCAILIAODALEI',
    width: 150
  },
  {
    props: 'materialElementShort',
    name: '大类元素简称',
    key: 'DALEIYUANSUJIANCHENG',
    width: 150
  },
  {
    props: 'materialNameZh',
    name: '材料中类',
    key: 'ZHONGLEIBIANHAO',
    width: 150
  },
  {
    props: 'materialCategoryDesc',
    name: '中类描述',
    key: 'ZHONGLEIMINGCHENG',
    width: 150
  },
  {
    props: 'materialCode',
    name: '原材料牌号',
    key: 'YUANCAILIAOBIANHAO',
    width: 150
  },
  {
    props: 'materialName',
    name: '原材料名称',
    key: 'YUANCAILIAOMINGCHENG',
    width: 150
  },
  { props: 'countUnit', name: '计量单位', key: 'JILIANGDANWEI', width: 150 },
  { props: 'prPriceSourceTypeValue', name: '', key: 'PR(P)', width: 120 },
  {
    props: 'forecastPriceSourceTypeValue',
    name: '预测价(F)',
    key: 'YUCEJIAF',
    width: 120
  },
  {
    props: 'marketPriceSourceTypeValue',
    name: '市场价(E)',
    key: 'SHICHANGJIAF',
    width: 150
  },
  {
    props: 'externalMarketPriceSource',
    name: '外部市场价来源',
    key: 'WAIBUSHICHANGJIALAIYUAN',
    width: 180
  },
  {
    props: 'externalMaterialCode',
    name: '外部来源对应牌号',
    key: 'WAIBULAIYUANDUIYINGPAIHAO',
    width: 180
  },
  {
    props: 'prPriceSourceTypeValue',
    name: '取价规则',
    key: 'QUJIAGUIZE',
    width: 500
  }
]

export const queryFormData = [
  {
    props: 'parentMaterialCategoryCode',
    name: '原材料(大类)',
    key: 'YUANCAILIAODALEI',
    dropDownTitle: 'dropDownParentMaterialCategoryCodeData'
  },
  {
    props: 'materialElementShort',
    name: '大类元素简称',
    key: 'DALEIYUANSUJIANCHENG',
    dropDownTitle: 'dropDownMaterialElementShortData'
  },
  {
    props: 'materialNameZh',
    name: '材料中类',
    key: 'ZHONGLEIBIANHAO',
    dropDownTitle: 'dropDownMaterialNameZhData'
  },
  {
    props: 'materialCategoryDesc',
    name: '中类描述',
    key: 'ZHONGLEIMINGCHENG',
    dropDownTitle: 'dropDownMaterialCategoryDescData'
  },
  {
    props: 'materialCode',
    name: '原材料牌号',
    key: 'YUANCAILIAOBIANHAO',
    dropDownTitle: 'dropDownMaterialCodeData'
  },
  {
    props: 'materialName',
    name: '原材料名称',
    key: 'YUANCAILIAOMINGCHENG',
    dropDownTitle: 'dropDownMaterialNameData'
  },
  {
    props: 'marketPriceSourceType',
    name: '市场价维护方式',
    key: 'SHICHANGJIAWEIHUFANGSHI',
    dropDownTitle: 'dropDownMarketPriceSourceTypeData'
  },
  {
    props: 'externalMarketPriceSource',
    name: '外部市场价来源',
    key: 'WAIBUSHICHANGJIALAIYUAN',
    dropDownTitle: 'dropDownExternalMarketPriceSourceData'
  }
]
