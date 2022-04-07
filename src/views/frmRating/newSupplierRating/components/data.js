/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: YoHo
 * @LastEditTime: 2022-04-01 10:54:07
 * @Descripttion: your project
 */
import { getDictByCode } from '@/api/dictionary'
export const tableTitle = [
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
    prop: 'nameZh',
    label: '供应商名称',
    li8n: 'LK_GONGYINGSHANGMINGCHENG1',
    width: 300,
    tooltip: true,
    emit: 'go-detail',
    customRender: (h, scope) => {
      return (
        <span class="cursor" style="color:#1763F7">
          {scope.row.nameZh}
        </span>
      )
    }
  },
  {
    prop: 'nameEn',
    label: '供应商英文名称',
    li8n: 'SPR_FRM_XGYSPJ_GYSYWMC',
    width: 150,
    tooltip: true
  },
  {
    prop: 'socialcreditNo',
    label: '统一社会信用代码',
    li8n: 'UnifySocialCreditCode',
    width: 200
  },
  {
    prop: 'dunsCode',
    label: 'DUNS号',
    li8n: 'SUPPLIER_CAILIAOZU_DUNSHAO',
    width: 150,
    tooltip: true
  },
  {
    prop: 'ratingResult',
    label: '评级结果',
    li8n: 'SPR_FRM_XGYSPJ_PJJG',
    width: 120,
    tooltip: true
  },
  {
    prop: 'ratingStatus',
    label: '状态',
    li8n: 'LK_ZHUANGTAI',
    tooltip: true,
    width: 120
  },
  {
    prop: 'approvalTime',
    label: '申请时间',
    li8n: 'SPR_FRM_XGYSPJ_SQSJ',
    width: 120,
    tooltip: true
  },
  {
    prop: 'buyerDept',
    label: '采购科室',
    width: 120,
    li8n: 'SPR_FRM_XGYSPJ_CGKS',
    tooltip: true
  },
  {
    prop: 'buyer',
    label: '采购员',
    li8n: 'SPR_FRM_XGYSPJ_CGY',
    tooltip: true,
    width: 120
  },
  {
    prop: 'categoryId',
    label: '材料组编号',
    li8n: 'LK_CAILIAOZUBIANHAO',
    width: 120
  },
  {
    prop: 'categoryNameZh',
    label: '材料组名称',
    li8n: 'SUPPLIER_CAILIAOZUMINGCHENG',
    width: 120,
    tooltip: true
  },
  {
    prop: 'markingTime',
    label: '评级时间',
    li8n: 'SPR_FRM_XGYSPJ_PJSJ',
    width: 120,
    tooltip: true
  },
  {
    prop: 'gradingPerson',
    label: '评级负责人',
    li8n: 'SPR_FRM_XGYSPJ_PJFZR',
    width: 150,
    tooltip: true
  },
  {
    prop: 'remark',
    label: '不通过原因',
    li8n: 'SPR_FRM_XGYSPJ_BTGYY',
    tooltip: true,
    width: 120
  },
  {
    prop: 'dataChannel',
    label: '数据来源',
    li8n: 'SPR_FRM_XGYSPJ_SJLY',
    width: 120,
    tooltip: true
  }
]
export const supplierMessageTitle = [
  {
    //供应商名称
    key: 'nameZh',
    name: 'LK_GONGYINGSHANGMINGCHENG1',
    icons: '',
    tip: '',
    permission: 'SUPPLIER_BASEINFO_SUPPLIERNAME'
  },
  {
    //供应商名称（中）
    key: 'shortNameZh',
    name: 'SupplierAbbreviationZh',
    permission: 'SUPPLIER_BASEINFO_SUPPLIERABBREVIATIONZH'
  },
  {
    //统一社会信用代码
    key: 'socialcreditNo',
    name: 'UnifySocialCreditCode',
    icons: '',
    tip: '',
    permission: 'SUPPLIER_BASEINFO_UNIFYSOCIALCREDITCODE'
  },
  {
    //供应商英文名
    key: 'nameEn',
    name: 'SupplierEn',
    icons: '',
    tip: '',
    permission: 'SUPPLIER_BASEINFO_SUPPLIEREN'
  },
  {
    //供应商简称（英）
    key: 'shortNameEn',
    name: 'SupplierAbbreviationEn',
    permission: 'SUPPLIER_BASEINFO_SUPPLIERABBREVIATIONEN'
  },
  {
    //DUNS
    key: 'dunsCode',
    name: 'DUNS',
    permission: 'SUPPLIER_BASEINFO_DUNS'
  }
]
export const supplierAddMaterialsTableTitle = [
  { props: 'approvalTime', name: '任务日期', key: 'SPR_FRM_XGYSPJ_RWRQ' },
  { props: 'stuffCode', name: '材料组编号', key: 'SUPPLIER_CAILIAOZUBIANHAO' },
  {
    props: 'categoryNameZh',
    name: '材料组名称',
    key: 'SUPPLIER_CAILIAOZUMINGCHENG'
  },
  {
    props: 'materialStuffGroupCode',
    name: '材料组工艺编号',
    key: 'SUPPLIER_CAILIAOZUGONGYIBIAOHAO'
  },
  {
    props: 'materialStuffGroupName',
    name: '材料组工艺中文名称',
    key: 'SUPPLIER_CAILIAOZUGONGYIZHONGWENGMINGCHENG'
  },
  {
    props: 'materialStuffGroupNameDe',
    name: '材料组工艺德文名称',
    key: 'SUPPLIER_CAILIAOZUGONGYIDEWENMINGCHENG'
  },
  { props: 'linieGroup', name: 'Linie组别', key: 'SUPPLIER_LINIEJIBIE' },
  { props: 'linieNames', name: 'Linie人员', key: 'SUPPLIER_LINIERENYUAN' }
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
