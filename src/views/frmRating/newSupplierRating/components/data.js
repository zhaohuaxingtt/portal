/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: zbin
 * @LastEditTime: 2021-07-14 20:02:27
 * @Descripttion: your project
 */
import { getDictByCode } from "@/api/dictionary";
export const tableTitle = [
  { props: 'nameZh', name: '供应商名称', key: 'LK_GONGYINGSHANGMINGCHENG', width: 120, tooltip: true },
  { props: 'nameEn', name: '供应商英文名称', key: 'SPR_FRM_XGYSPJ_GYSYWMC', width: 120, tooltip: true },
  { props: 'socialcreditNo', name: '统一社会信用代码', key: 'UnifySocialCreditCode', width: 120 },
  { props: 'dunsCode', name: 'DUNS号', key: 'SUPPLIER_CAILIAOZU_DUNSHAO', width: 100, tooltip: true },
  { props: 'approvalTime', name: '申请时间', key: 'SPR_FRM_XGYSPJ_SQSJ', width: 100, tooltip: true },
  { props: 'buyerDept', name: '采购科室', key: 'SPR_FRM_XGYSPJ_CGKS', tooltip: true },
  { props: 'buyer', name: '采购员', key: 'SPR_FRM_XGYSPJ_CGY', tooltip: true },
  { props: 'categoryId', name: '材料组编号', key: 'LK_CAILIAOZUBIANHAO', width: 120 },
  { props: 'categoryNameZh', name: '材料组名称', key: 'SUPPLIER_CAILIAOZUMINGCHENG', width: 120, tooltip: true },
  { props: 'ratingResult', name: '评级结果', key: 'SPR_FRM_XGYSPJ_PJJG', width: 100, tooltip: true },
  { props: 'markingTime', name: '评级时间', key: 'SPR_FRM_XGYSPJ_PJSJ', width: 120, tooltip: true },
  { props: 'gradingPerson', name: '评级负责人', key: 'SPR_FRM_XGYSPJ_PJFZR', width: 110, tooltip: true },
  { props: 'ratingStatus', name: '状态', key: 'LK_ZHUANGTAI', tooltip: true },
  { props: 'remark', name: '不通过原因', key: 'SPR_FRM_XGYSPJ_BTGYY', tooltip: true, tooltip: true },
  { props: 'dataChannel', name: '数据来源', key: 'SPR_FRM_XGYSPJ_SJLY', width: 120, tooltip: true },
]
export const supplierMessageTitle = [
  {
    key: 'nameZh',
    name: 'LK_GONGYINGSHANGMINGCHENG',
    icons: "",
    tip: "",
    permission: 'LK_GONGYINGSHANGMINGCHENG'
  },
  {
    key: 'shortNameZh',
    name: 'SupplierAbbreviationZh',
    permission: 'SupplierAbbreviationZh'
  },
  {
    key: 'socialcreditNo',
    name: 'UnifySocialCreditCode',
    icons: "",
    tip: "",
    permission: 'SUPPLIER_BASEINFO_UNIFYSOCIALCREDITCODE'
  },
  {
    key: 'nameEn',
    name: 'SupplierEn',
    icons: "",
    tip: "",
    permission: 'SUPPLIER_BASEINFO_SUPPLIEREN'
  },
  {
    key: 'shortNameEn',
    name: 'SupplierAbbreviationEn',
    permission: 'SUPPLIER_BASEINFO_SUPPLIERABBREVIATIONEN'
  },
  {
    key: 'dunsCode',
    name: 'DUNS',
    permission: 'SUPPLIER_BASEINFO_DUNS'
  },
]
export const supplierAddMaterialsTableTitle = [
  { props: 'approvalTime', name: '任务日期', key: 'SPR_FRM_XGYSPJ_RWRQ', },
  { props: 'stuffCode', name: '材料组编号', key: 'SUPPLIER_CAILIAOZUBIANHAO' },
  { props: 'categoryNameZh', name: '材料组名称', key: 'SUPPLIER_CAILIAOZUMINGCHENG' },
  { props: 'materialStuffGroupCode', name: '材料组工艺编号', key: 'SUPPLIER_CAILIAOZUGONGYIBIAOHAO' },
  { props: 'materialStuffGroupName', name: '材料组工艺中文名称', key: 'SUPPLIER_CAILIAOZUGONGYIZHONGWENGMINGCHENG' },
  { props: 'materialStuffGroupNameDe', name: '材料组工艺德文名称', key: 'SUPPLIER_CAILIAOZUGONGYIDEWENMINGCHENG' },
  { props: 'linieGroup', name: 'Linie组别', key: 'SUPPLIER_LINIEJIBIE' },
  { props: 'linieNames', name: 'Linie人员', key: 'SUPPLIER_LINIERENYUAN' }
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
