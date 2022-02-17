export const tableTitleGp = [
    {
      type: 'selection',
      width: 50
    },
    {
      type: 'index',
      width: 60,
      label: '序号'
    },
    { prop: 'type', label: '受控业务类型', li8n: 'SHOUKONGYEWULEIXING', tooltip: true },
    { prop: 'measures', label: '受控措施', li8n: 'SHOUKONGCUOSHI', tooltip: true },
    { prop: 'createByName', label: '操作人', li8n: 'CAOZUOREN', tooltip: true },
    { prop: 'createDate', label: '操作时间', li8n: 'CAOZUOSHIJIAN', tooltip: true },
    { prop: 'startTime', label: '受控起始时间', li8n: 'SHOUKONGQISHISHIJIAN', tooltip: true },
    { prop: 'endTime', label: '受控截止时间', li8n: 'SHOUKOINGJIEZHISHIJIAN', tooltip: true },
  ]
  export const tableTitlePp = [
    {
      type: 'selection',
      width: 50
    },
    {
      type: 'index',
      width: 60,
      label: '序号'
    },
    { prop: 'categoryCode', label: '材料组编号',width:150, li8n: 'CAILIAOZUBIANHAO', tooltip: true },
    { prop: 'categoryName', label: '材料组名称',width:150, li8n: 'CAILIAOZUMINGCHENG', tooltip: true },
    { prop: 'stuffCode', label: '⼯艺组编号', width:150,li8n: 'GONGYIZUBIANHAO', tooltip: true },
    { prop: 'stuffNameEnDe', label: '⼯艺组名称（中-德）', width:180,li8n: 'GONGYIZUMINGCHENGZHONGDE', tooltip: true,
      customRender: (h, scope) => {
        var str = scope.row.stuffName + "-" + scope.row.stuffNameDe
        return str
      }
    },
    { prop: 'linieDeptName', label: 'LINIE科室',width:150, li8n: 'LINIEKESHI', tooltip: true },
    { prop: 'liniePurchaserName', label: 'LINIE采购员',width:150, li8n: 'LINIECAIGOUYUAN', tooltip: true },
    { prop: 'purchaserName', label: '前期采购员', width:150,li8n: 'QIANQICAIGOUYUAN', tooltip: true },
    { prop: 'measures', label: '受控措施', width:150,li8n: 'SHOUKONGCUOSHI', tooltip: true },
    { prop: 'startTime', label: '受控起始时间',width:160, li8n: 'SHOUKONGQISHISHIJIAN', tooltip: true },
    { prop: 'endTime', label: '受控截⽌时间', width:160,li8n: 'SHOUKOINGJIEZHISHIJIAN', tooltip: true },
    { prop: 'createByName', label: '操作⼈', width:100,li8n: 'CAOZUOREN', tooltip: true },
    { prop: 'createDate', label: '操作时间', width:200,li8n: 'CAOZUOSHIJIAN', tooltip: true },
    { prop: 'mbdl', label: '是否属于MBDL', width:160,li8n: 'SHIFOUSHUYUMBDL', tooltip: true },
  ]
  export const tableTitleGpBlackList=[
    { props: 'type', name: '受控业务类型', key: 'SHOUKONGYEWULEIXING', tooltip: true },
    { props: 'measuresStatus', name: '受控状态', key: 'SHOUKONGZHUANGTAI', tooltip: true },
    { props: 'measures', name: '受控措施', key: 'SHOUKONGCUOSHI', tooltip: true },
    { props: 'startTime', name: '受控起始时间', key: 'SHOUKONGQISHISHIJIAN', tooltip: true },
    { props: 'endTime', name: '受控截止时间', key: 'SHOUKOINGJIEZHISHIJIAN', tooltip: true },
  ]
  export const tableTitleGpBlackListRecord=[
    { props: 'type', name: '受控业务类型', key: 'SHOUKONGYEWULEIXING', tooltip: true },
    { props: 'handleType', name: '受控操作', key: 'SHOUKONGCAOZUO', tooltip: true },
    { props: 'measures', name: '受控措施', key: 'SHOUKONGCUOSHI', tooltip: true },
    { props: 'reason', name: '加⼊⿊名单原因', key: 'JIARUHEIMINGDANYUANYIN', tooltip: true },
    { props: 'createByName', name: '操作⼈', key: 'CAOZUOREN', tooltip: true },
    { props: 'createDate', name: '操作时间', key: 'CAOZUOSHIJIAN', tooltip: true },
    { props: 'startTime', name: '受控起始时间', key: 'SHOUKONGQISHISHIJIAN', tooltip: true },
    { props: 'endTime', name: '受控截止时间', key: 'SHOUKOINGJIEZHISHIJIAN', tooltip: true },
  ]
  export const tableTitlePpBlackList=[
    { props: 'categoryCode', name: '材料组编号', key: 'CAILIAOZUBIANHAO', tooltip: true },
    { props: 'categoryName', name: '材料组名称', key: 'CAILIAOZUMINGCHENG', tooltip: true },
    { props: 'stuffCode', name: '⼯艺组编号', key: 'GONGYIZUBIANHAO', tooltip: true },
    { props: 'stuffNameEnDe', name: '⼯艺组名称（中-德）',width:180, key: 'GONGYIZUMINGCHENGZHONGDE', tooltip: true },
    { props: 'measuresStatus', name: '受控状态', key: 'SHOUKONGZHUANGTAI', tooltip: true },
    { props: 'measures', name: '受控措施', key: 'SHOUKONGCUOSHI', tooltip: true },
    { props: 'startTime', name: '受控起始时间', key: 'SHOUKONGQISHISHIJIAN', tooltip: true },
    { props: 'endTime', name: '受控截止时间', key: 'SHOUKOINGJIEZHISHIJIAN', tooltip: true },
    { props: 'mbdl', name: '是否属于MBDL', key: 'SHIFOUSHUYUMBDL', tooltip: true },
  ]
  export const tableTitlePpBlackListRecord=[
    { props: 'categoryCode', name: '材料组编号',width:140, key: 'CAILIAOZUBIANHAO', tooltip: true },
    { props: 'categoryName', name: '材料组名称',width:140,  key: 'CAILIAOZUMINGCHENG', tooltip: true },
    { props: 'stuffCode', name: '⼯艺组编号',width:140,  key: 'GONGYIZUBIANHAO', tooltip: true },
    { props: 'stuffNameEnDe', name: '⼯艺组名称（中-德）',width:180,key: 'GONGYIZUMINGCHENGZHONGDE', tooltip: true },
    { props: 'linieDeptName', name: 'LINIE科室',width:140,  key: 'LINIEKESHI', tooltip: true },
    { props: 'liniePurchaserName', name: 'LINIE采购员',width:140,  key: 'LINIECAIGOUYUAN', tooltip: true },
    { props: 'purchaserName', name: '前期采购员',width:140,  key: 'QIANQICAIGOUYUAN', tooltip: true },
    { props: 'handleType', name: '受控操作', width:140, key: 'SHOUKONGCAOZUO', tooltip: true },
    { props: 'reason', name: '加⼊⿊名单原因',width:160, key: 'JIARUHEIMINGDANYUANYIN', tooltip: true },
    { props: 'measures', name: '受控措施', width:140, key: 'SHOUKONGCUOSHI', tooltip: true },

    { props: 'startTime', name: '受控起始时间',width:160, key: 'SHOUKONGQISHISHIJIAN', tooltip: true },
    { props: 'endTime', name: '受控截止时间', width:160,key: 'SHOUKOINGJIEZHISHIJIAN', tooltip: true },
    { props: 'createByName', name: '操作⼈',width:140,  key: 'CAOZUOREN', tooltip: true },
    { props: 'createDate', name: '操作时间',width:140, key: 'CAOZUOSHIJIAN', tooltip: true },
    { props: 'mbdl', name: '是否属于MBDL',width:160,  key: 'SHIFOUSHUYUMBDL', tooltip: true },
  ]
  export const setTagCloum=[{
    props: 'tagName',
    name: '标签名称',
    key: 'BIAOQIANMINGCHENG',
    width: 150,
    tooltip: true
},
{
    props: 'tagTypeVale',
    name: '标签类型',
    key: 'BIAOQIANLEIXING',
    width: 150,
    tooltip: true
},
{
    props: 'tagDesc',
    name: '系统判断标准',
    key: 'XITONGPANDUANBIAOZHUN',
    tooltip: true
},


]