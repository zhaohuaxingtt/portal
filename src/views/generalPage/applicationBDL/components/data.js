/*
 * @Author: moxuan
 * @Date: 2021-04-15 17:50:00
 * @LastEditors: Please set LastEditors
 * @Description: BDL
 */

export const applicationBDLTableTitle = [
  {
    type: 'selection',
    width: 50
  },
  {
    type: 'index',
    width: 60,
    label: '序号'
  },
  {
    prop: 'categoryCode',
    label: '材料组编号',
    li8n: 'SUPPLIER_CAILIAOZUBIANHAO',
    tooltip: true
  },
  {
    prop: 'categoryNameZh',
    label: '材料组名称',
    li8n: 'SUPPLIER_CAILIAOZUMINGCHENG',
    tooltip: true
  },
  { prop: 'bdl', label: '是否BDL', li8n: 'SHIFOUBDL', tooltip: true },
  {
    prop: 'stuffCode',
    label: '材料组工艺编号',
    li8n: 'SUPPLIER_CAILIAOZUGONGYIBIAOHAO',
    width: 150,
    tooltip: true
  },
  {
    prop: 'stuffName',
    label: '材料组工艺中文名称',
    li8n: 'SUPPLIER_CAILIAOZUGONGYIZHONGWENGMINGCHENG',
    width: 160,
    tooltip: true
  },
  {
    prop: 'stuffNameDe',
    label: '材料组工艺德文名称',
    li8n: 'SUPPLIER_CAILIAOZUGONGYIDEWENMINGCHENG',
    width: 160,
    tooltip: true
  },
  {
    prop: 'linieGroup',
    label: 'Linie组别',
    li8n: 'SUPPLIER_LINIEJIBIE',
    tooltip: true
  },
  {
    prop: 'userNames',
    label: 'Linie人员',
    li8n: 'SUPPLIER_LINIERENYUAN',
    tooltip: true
  },
  {
    prop: 'mbdl',
    label: '是否属于MBDL',
    li8n: 'SUPPLIER_SHIFOUSHUYUmbDL',
    width: 130,
    tooltip: true
  },
  {
    prop: 'controlledState',
    label: '受控状态',
    li8n: 'SUPPLIER_SHOUKONGZHUANGTAI',
    width: 130,
    tooltip: true
  },
  {
    prop: 'controlledBegindate',
    label: '受控起始时间',
    li8n: 'SUPPLIER_SHOUKONGQISHISHIJIAN',
    width: 130,
    tooltip: true
  },
  {
    prop: 'controlledEnddate',
    label: '受控截止时间',
    li8n: 'SUPPLIER_JIEZHISHIJIAN',
    width: 130,
    tooltip: true
  }
]

export const addBDLTableTitle = [
  {
    props: 'categoryCode',
    name: '材料组编号',
    key: 'SUPPLIER_CAILIAOZUBIANHAO',
    tooltip: true
  },
  {
    props: 'categoryNameZh',
    name: '材料组名称',
    key: 'SUPPLIER_CAILIAOZUMINGCHENG',
    tooltip: true
  },
  { props: 'bdl', name: '是否BDL', key: 'SHIFOUBDL', tooltip: true },
  {
    props: 'stuffCode',
    name: '材料组工艺编号',
    key: 'SUPPLIER_CAILIAOZUGONGYIBIAOHAO',
    tooltip: true
  },
  {
    props: 'stuffName',
    name: '材料组工艺中文名称',
    key: 'SUPPLIER_CAILIAOZUGONGYIZHONGWENGMINGCHENG',
    tooltip: true
  },
  {
    props: 'stuffNameDe',
    name: '材料组工艺德文名称',
    key: 'SUPPLIER_CAILIAOZUGONGYIDEWENMINGCHENG',
    tooltip: true
  },
  {
    props: 'linieGroup',
    name: '采购员科室',
    key: 'CAIGOUYUANKESHI',
    tooltip: true
  },
  {
    props: 'userNames',
    name: '采购员',
    key: 'CAIGOUYUAN',
    tooltip: true
  }
]
