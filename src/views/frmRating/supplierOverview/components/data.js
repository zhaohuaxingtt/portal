/*
 * @version: 1.0
 * @Author: 曹鹏
 * @Date: 2021-11-9 15:03:31
 */
import { getDictByCode } from '@/api/dictionary'

export const tableTitle = [
  { props: 'nameZh', name: '供应商名称', key: '', width: 250 },
  { props: 'progress', name: '未开始', key: '' },
  { props: 'deepCommentResult', name: '进行中', key: '' },
  { props: 'trackingFrequency', name: '已完成', key: '' },
  { props: '', name: '结果', key: '' },
  { props: '', name: '频率（月）', key: '', width: '100' }
]

export const tableTitleMonitor = [
  { props: 'sapCode', name: 'SAP号', key: 'SAPHAO', tooltip: true },
  {
    props: 'supplierName',
    name: '供应商名称',
    key: 'GONGYINGSHANGMINGCHENG',
    tooltip: true
  },
  { props: 'deptNum', name: '相关科室', key: 'XIANGGUANKESHI', tooltip: true },
  {
    props: 'userName',
    name: '负责采购员',
    key: 'XIANGGUANCAIGOUYUAN',
    tooltip: true
  },
  // { props: 'email', name: '采购员邮箱', key: 'CAIGOUYUANYOUXIANG', tooltip: true },
  {
    props: 'ratingSource',
    name: '加入C-Rating原因',
    key: 'JIARUCRATINGYUANYIN',
    tooltip: true
  },
  {
    props: 'ratingDate',
    name: '加入C-Rating时间',
    key: 'JIARUCRATINGSHIJIAN',
    tooltip: true,
    width: 150
  }
]

export const tableTitleMonitorRecord = [
  { props: 'sapCode', name: 'SAP号', key: 'SAPHAO', tooltip: true, width: 150 },
  {
    props: 'supplierName',
    name: '供应商名称',
    key: 'GONGYINGSHANGMINGCHENG',
    tooltip: true,
    width: 150
  },
  {
    props: 'deptNum',
    name: '相关科室',
    key: 'XIANGGUANKESHI',
    tooltip: true,
    width: 150
  },
  {
    props: 'userName',
    name: '负责采购员',
    key: 'XIANGGUANCAIGOUYUAN',
    tooltip: true,
    width: 150
  },
  {
    props: 'email',
    name: '采购员邮箱',
    key: 'CAIGOUYUANYOUXIANG',
    tooltip: true,
    width: 150
  },
  {
    props: 'iscRatingNow',
    name: ' 目前是否C-Rating',
    key: 'MUQIANSHIFOUCRATING',
    tooltip: true,
    width: 150
  },
  {
    props: 'ratingSource',
    name: '加入C-Rating原因',
    key: 'JIARUCRATINGYUANYIN',
    tooltip: true,
    width: 150
  },
  {
    props: 'ratingDate',
    name: '加入C-Rating时间',
    key: 'JIARUCRATINGSHIJIAN',
    tooltip: true,
    width: 150
  },
  {
    props: 'cancelReason',
    name: '移出C-Rating原因',
    key: 'YICHUCRATINGYUANYIN',
    tooltip: true,
    width: 150
  },
  {
    props: 'cancelDate',
    name: '移出C-Rating时间',
    key: 'YICHUCRATINGSHIJIAN',
    tooltip: true,
    width: 150
  },
  {
    props: 'rfqStatus',
    name: '零件状态',
    key: 'LINGJIANZHUANGTAI',
    tooltip: true,
    width: 150
  },
  {
    props: 'partNum',
    name: '零件信息',
    key: 'LINGJIANXINXI',
    tooltip: true,
    width: 150
  },
  { props: 'rfq', name: 'RFQ号', key: 'RFQHAO', tooltip: true, width: 150 },
  {
    props: 'motorProject',
    name: '车型项目',
    key: 'CHEXIANGXIANGMU',
    tooltip: true,
    width: 150
  },
  {
    props: 'motorType',
    name: '报价车型',
    key: 'BAOJIACHEXING',
    tooltip: true,
    width: 150
  }
]
// 数据字典查询
export const dictByCode = async function (key) {
  let dicResult = []
  let res = await getDictByCode(key)
  if (res.data) {
    res.data.filter((result) => {
      if (result.code === key) {
        dicResult = result.subDictResultVo || []
      }
    })
    return dicResult
  }
}
