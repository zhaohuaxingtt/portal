
/*
 * @version: 1.0
 * @Author: 曹鹏
 * @Date: 2021-11-9 15:03:31
 */
import { getDictByCode } from "@/api/dictionary";

export const tableTitle=[
  {props:'nameZh',name:'供应商名称',key:'',width:250},
  {props:'progress',name:'未开始',key:''},
  {props:'deepCommentResult',name:'进行中',key:''},
  {props:'trackingFrequency',name:'已完成',key:''},
  {props:'',name:'结果',key:''},
  {props:'',name:'频率（月）',key:'',width:'100'},
]

export const tableTitleMonitor = [
    { props: 'partNum', name: 'SAP号', key: 'SAPHAO' , tooltip: true },
    { props: 'supplierName', name: '供应商名称', key: 'GONGYINGSHANGMINGCHENG', tooltip: true },
    { props: 'deptNum', name: '相关科室/股', key: 'XIANGGUANKESHI', tooltip: true },
    { props: 'userId', name: '负责采购员', key: 'XIANGGUANCAIGOUYUAN', tooltip: true },
    { props: 'email', name: '采购员邮箱', key: 'CAIGOUYUANYOUXIANG', tooltip: true },
    { props: 'ratingSource', name: 'C-Rating来源', key: 'CRATINGLAIYUAN', tooltip: true },
  ]
  
export const tableTitleMonitorRecord = [
    { props: 'factoryName', name: 'SAP号', key: 'SAPHAO' , tooltip: true },
    { props: 'province', name: '供应商名称', key: 'GONGYINGSHANGMINGCHENG', tooltip: true },
    { props: 'city', name: '相关科室/股', key: 'XIANGGUANKESHI', tooltip: true },
    { props: 'carType', name: '负责采购员', key: 'XIANGGUANCAIGOUYUAN', tooltip: true },
    { props: 'materialGroupName', name: '采购员邮箱', key: 'CAIGOUYUANYOUXIANG', tooltip: true },
    { props: 'materialGroupName', name: 'C-Rating来源', key: 'CRATINGLAIYUAN', tooltip: true },
    { props: 'materialGroupName', name: '零件信息', key: 'LINGJIANXINXI', tooltip: true },
    { props: 'materialGroupName', name: 'RFQ号', key: 'RFQHAO', tooltip: true },
    { props: 'materialGroupName', name: '零件采购项目号', key: 'LINGJIANCAIGOUXIANGMUHAO', tooltip: true },
    { props: 'materialGroupName', name: '零件状态', key: 'LINGJIANZHUANGTAI', tooltip: true },
    { props: 'materialGroupName', name: '项目编号', key: 'XIANGMUBIANHAO', tooltip: true },
    { props: 'materialGroupName', name: '报价车型', key: 'BAOJIACHEXING', tooltip: true },
  ]
   // 数据字典查询
export const dictByCode = async function(key) {
    let dicResult = []
    let res = await getDictByCode(key)
    if (res.data) {
      res.data.filter(result => {
        if (result.code === key) {
          dicResult = result.subDictResultVo || []
        }
      })
      return dicResult
    }
  }