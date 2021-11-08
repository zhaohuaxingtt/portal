/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-05 15:41:21
 * @LastEditors: zbin
 * @Descripttion: your project
 */
import { getDictByCode } from "@/api/dictionary";

export const supplierTableTitle = [
  { props: 'supplierName', name: '供应商名称', key: 'GONGYINGSHANGMINGCHEN' },
  { props: 'toolType', name: '零件数量', key: 'LINGJIANSHULIANG' },
  { props: 'materialGroup', name: '反馈状态', key: 'FANKUIZHANGTAI' },
  { props: 'materialGroup', name: '预警信', key: 'YUJINGXING' },
]
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