import { numberProcessor } from "@/utils"

export const tableTitle = [
  { props:'itemNo', name:'行项目编号', key:'HANGXIANGMUBIANHAO', tooltip: true, minWidth:120 },
	{ props:'itemName', name:'行项目名称', key:'HANGXIANGMUMINGCHENG', tooltip: true, minWidth:120 },
	{ props:'currPayNum', name:'本次支付数量', key:'BENCIZHIFUSHULIANG', tooltip: true, minWidth:120 },
	{ props:'waitPayNum', name:'待支付数量', key:'DAIZHIFUSHULIANG', tooltip: true, minWidth:120 },
	{ props:'itemQuantity', name:'订单行项目总数', key:'DINGDANHANGXIANGMUZONGSHU', tooltip: true, minWidth:120 },
	{ props:'unit', name:'单位', key:'DANWEI', tooltip: true, minWidth:120 },
	{ props:'priceUnit', name:'价格单位', key:'JIAGEDANWEI', tooltip: true, minWidth:120 },
	{ props:'netPrice', name:'单价', key:'DANJIA', tooltip: true, minWidth:120 },
	{ props:'currPayAmount', name:'本次支付金额', key:'BENCIZHIFUJINE', tooltip: true, minWidth:120 },
	{ props:'waitPayAmount', name:'待支付金额', key:'DAIZHIFUJINE', tooltip: true, minWidth:120 },
	{ props:'itemTotalAmount', name:'订单行项目总金额', key:'DINGDANHANGXIANGMUZONGJINE', tooltip: true, minWidth:120 },
	{ props:'currency', name:'货币', key:'HUOBI', tooltip: true, minWidth:120 },
]

export const handleInputByNumber = function (value, key, row, precision, cb, negative) {
	this.$set(row, key, numberProcessor(value, precision, negative))
	if (typeof cb === "function") {
		cb(value, key, row)
	}
}

// 保留位数
export function floatNum(num, minFixed = 2, maxFixed = 4) {
	const _num = (num || num === 0) ? num : ''
	if (_num === '') return null;
	let floatNum = Number(Number(_num).toFixed(maxFixed));
	let float = floatNum.toString().split(".")[1];
	const length = typeof float ==='string' ? float.length : 0;
	
	return length < minFixed ? floatNum.toFixed(minFixed) : floatNum;
}
  
// 费用千分位处理
export function fixNumber(str, precision = 2) {
	if (!str) return null;
	var re = /(?=(?!(\b))(\d{3})+$)/g;
	var fixstr = (str || 0).toString().split(".");
	fixstr[0] = fixstr[0].replace(re, ",");
	if (precision == 0) {
		// 若小数点后两位是 .00 去除小数点后两位
		if (fixstr[1] && fixstr[1] == "00") return fixstr[0];
	}
  
	return fixstr.join(".");
}
export function floatFixNum(num, minFixed = 2, maxFixed = 4) {
  return fixNumber(floatNum(num, minFixed, maxFixed), minFixed)
}

