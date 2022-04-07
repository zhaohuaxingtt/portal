/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-05 15:41:21
 * @LastEditors: YoHo
 * @Descripttion: your project
 */
import { getDictByCode } from "@/api/dictionary";

export const supplierTableTitle = [
  { props: 'sapCode', name: '供应商编号', key: 'GONGYINGSHANGBIANHAO', tooltip: true, width: 100 },
  { props: 'supplierNameCn', name: '供应商名称', key: 'GONGYINGSHANGMINGCHEN', tooltip: true, width: 140 },
  { props: 'address', name: '工厂地址', key: 'GONGCHANGDIZHI', tooltip: true },
]
export const partTableTitle = [
  { props: 'partNum', name: '总成零件', key: 'ZONGCHENLINGJIAN', tooltip: true },
  { props: 'supplierNameCn', name: '总成供应商', key: 'CONGCHENGONGYINGSHANG', tooltip: true },
  { props: 'carTypeName', name: '车型', key: 'CHEXING', tooltip: true },
]
export const meterialsTableTitle = [
  { props: 'categoryCode', name: '材料组编号', key: 'CAILIAOZUBIANHAO' },
  { props: 'categoryName', name: '材料组名称', key: 'CAILIAOZUMINGCHENG' },
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