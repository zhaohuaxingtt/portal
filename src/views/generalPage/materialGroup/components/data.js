/*
 * @Author: moxuan
 * @Date: 2021-04-15 17:50:00
 * @LastEditors: zbin
 * @Description: 材料组
 */



export const materialTableTitle = [
  { props: 'categoryCode', name: '材料组编号', key: 'SUPPLIER_CAILIAOZUBIANHAO' },
  { props: 'categoryNameZh', name: '材料组名称', key: 'SUPPLIER_CAILIAOZUMINGCHENG' },
  { props: 'stuffCode', name: '材料组工艺编号', key: 'SUPPLIER_CAILIAOZUGONGYIBIAOHAO' ,width:120},
  { props: 'stuffName', name: '材料组工艺中文名称', key: 'SUPPLIER_CAILIAOZUGONGYIZHONGWENGMINGCHENG',width:170 },
  { props: 'stuffNameDe', name: '材料组工艺德文名称', key: 'SUPPLIER_CAILIAOZUGONGYIDEWENMINGCHENG' ,width:170},
  { props: 'linieGroup', name: 'Linie组别', key: 'SUPPLIER_LINIEJIBIE' },
  { props: 'linieNames', name: 'Linie人员', key: 'SUPPLIER_LINIERENYUAN' },
  { props: 'bdlType', name: '是否属于MBDL', key: 'SUPPLIER_SHIFOUSHUYUBDL' ,width:120},
  { props: 'controlledState', name: '受控状态', key: 'SUPPLIER_SHOUKONGZHUANGTAI' },
  { props: 'isEffect', name: '状态', key: 'LK_ZHUANGTAI' },
  { props: 'controlledBegindate', name: '受控起始时间', key: 'SUPPLIER_SHOUKONGKAISHISHIJIAN' ,width:100},
  { props: 'controlledEnddate', name: '受控截止时间', key: 'SUPPLIER_SHOUKONGJIEZHISHIJIAN' ,width:100},
  { props: 'remark', name: '受控原因', key: 'SUPPLIER_SHOUKONGYUANYIN' ,width:120}
]
export const controllerRecordTableTitle = [
  { props: 'controlledBegindate', name: '受控起始时间', key: 'SUPPLIER_SHOUKONGKAISHISHIJIAN' },
  { props: 'controlledEnddate', name: '受控截止时间', key: 'SUPPLIER_SHOUKONGJIEZHISHIJIAN' },
  { props: 'controlledState', name: '受控状态', key: 'SUPPLIER_SHOUKONGZHUANGTAI' },
  { props: 'remark', name: '备注说明', key: 'SUPPLIER_BEIZHUSHUOMING' }
]

