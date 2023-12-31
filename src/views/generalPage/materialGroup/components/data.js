/*
 * @Author: moxuan
 * @Date: 2021-04-15 17:50:00
 * @LastEditors: YoHo
 * @Description: 材料组
 */

export const materialTableTitle = [
  {
    props: 'categoryCode',
    name: '材料组编号',
    key: 'SUPPLIER_CAILIAOZUBIANHAO',
    tooltip: true,
    width: 100
  },
  {
    props: 'categoryNameZh',
    name: '材料组名称',
    key: 'SUPPLIER_CAILIAOZUMINGCHENG',
    tooltip: true,
    width: 160
  },
  {
    props: 'stuffCode',
    name: '材料组工艺编号',
    key: 'SUPPLIER_CAILIAOZUGONGYIBIAOHAO',
    tooltip: true,
    width: 130
  },
  {
    props: 'stuffName',
    name: '材料组工艺中文名称',
    key: 'SUPPLIER_CAILIAOZUGONGYIZHONGWENGMINGCHENG',
    tooltip: true,
    width: 170
  },
  {
    props: 'stuffNameDe',
    name: '材料组工艺德文名称',
    key: 'SUPPLIER_CAILIAOZUGONGYIDEWENMINGCHENG',
    tooltip: true,
    width: 170
  },
  {
    props: 'linieGroup',
    name: '采购员科室',
    key: 'CAIGOUYUANKESHI',
    tooltip: true,
    width: 160
  },
  {
    props: 'linieNames',
    name: '采购员',
    key: 'CAIGOUYUAN',
    tooltip: true,
    width: 160
  },
  {
    props: 'bdlType',
    name: '是否属于MBDL',
    key: 'SUPPLIER_SHIFOUSHUYUBDL',
    width: 150,
    tooltip: true
  },
  {
    props: 'controlledState',
    name: '受控状态',
    key: 'SUPPLIER_SHOUKONGZHUANGTAI',
    tooltip: true
  },
  // { props: 'isEffect', name: '状态', key: 'LK_ZHUANGTAI', tooltip: true },
  {
    props: 'controlledBegindate',
    name: '受控起始时间',
    key: 'SUPPLIER_SHOUKONGKAISHISHIJIAN',
    width: 140,
    tooltip: true
  },
  {
    props: 'controlledEnddate',
    name: '受控截止时间',
    key: 'SUPPLIER_SHOUKONGJIEZHISHIJIAN',
    width: 140,
    tooltip: true
  },
  {
    props: 'remark',
    name: '受控原因',
    key: 'SUPPLIER_SHOUKONGYUANYIN',
    width: 300,
    tooltip: true
  }
]
export const controllerRecordTableTitle = [
  {
    props: 'controlledBegindate',
    name: '受控起始时间',
    key: 'SUPPLIER_SHOUKONGKAISHISHIJIAN'
  },
  {
    props: 'controlledEnddate',
    name: '受控截止时间',
    key: 'SUPPLIER_SHOUKONGJIEZHISHIJIAN'
  },
  {
    props: 'controlledState',
    name: '受控状态',
    key: 'SUPPLIER_SHOUKONGZHUANGTAI'
  },
  { props: 'remark', name: '备注说明', key: 'SUPPLIER_BEIZHUSHUOMING' }
]
