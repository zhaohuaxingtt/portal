export const tableTitle = [
    {props: 'partNumber', name: '零件号', key: 'LK_LINGJIANHAO', tooltip: true, width: 150, required: true},
    {props: 'partName', name: '零件名称', key: 'LK_PFJ_LJMC', width: 120, tooltip: true,},
    {props: 'carFamily', name: '产品家族', key: 'LK_CPJZ', width: 120, tooltip: true},
    {props: 'carconfigSixcode', name: '车型代码', key: 'LK_CXDM', tooltip: true,},
    {props: 'factoryCode', name: '采购工厂', key: 'LK_CAIGOUGONGCHANG', width: 100,tooltip: true,},
    {props: 'supplierName', name: '供应商', key: 'LK_GONGYINGSHANG', tooltip: true, width: 240},
    {props: 'unit', name: '单位', key: 'LK_DANWEI', width: 80, tooltip: true,},
    {props: 'price', name: 'KSL价', key: 'LK_KSLJ', width: 120, tooltip: true,},
    {props: 'kslPriceSource', name: 'KSL价来源', key: 'LK_KSLJLY', width: 120, tooltip: true,iconText: 'C:正式订单价 D:定点价格 T:目标价 F:上期正式订单价 M:手工', iconTextKey: 'LK_QRJG',icon:'iconxinxitishi'},
    // {props: 'quantity', name: '确认数量', key: 'LK_QRSL', tooltip: true},
    {props: 'priceConfirm', name: '确认价格', key: 'LK_QRJG', width: 150, tooltip: true, iconText: '确认价格', iconTextKey: 'LK_QRJG', required: true},
    {props: 'confirmPrice', name: '参考价格', key: 'LK_CKJG', width: 150, tooltip: true, iconText: '参考价格', iconTextKey: 'LK_CKJG', required: true},
    {props: 'priceSource', name: '参考价格来源', key: 'LK_CKJGLY', width: 150, tooltip: true,},
    {props: '_isConfirm', name: '确认状态', key: 'LK_QUERENZHUANGTAI', width: 100, tooltip: true,},
    {props: 'procAmount', name: '采购金额', key: 'LK_CAIGOUJINE', width: 150, tooltip: true,},
    {props: 'carconfigSixcodeVolumn', name: '全年产量', key: 'LK_QNCL', width: 100, tooltip: true,},
    {props: 'configName', name: '配置', key: 'LK_PEIZ', width: 120, tooltip: true,},
    {props: 'csGroupName', name: '材料组', key: 'LK_CAILIAOZU', width: 120, tooltip: true,},
    {props: 'partType', name: '零件类型', key: 'LK_LINGJIANLEIXING', width: 120, tooltip: true,},
    {props: 'deptCode', name: '科室', key: 'LK_KESHI', width: 80, tooltip: true,},
    {props: 'buyerName', name: '采购员', key: 'LK_CGY', width: 80, tooltip: true,},
    {props: 'idxCode', name: '索引号', key: 'LK_SYH', width: 80, tooltip: true,},
    {props: 'carconfigVolumn', name: '数量', key: 'LK_SHUL', width: 80, tooltip: true,},
];
export const monthTitle = [
    {props: 'janCarvolumn', name: '1月', key: 'JANUARY', width: 80, tooltip: true,},
    {props: 'febCarvolumn', name: '2月', key: 'FEBRUARY', width: 80, tooltip: true,},
    {props: 'marCarvolumn', name: '3月', key: 'MARCH', width: 80, tooltip: true,},
    {props: 'aprCarvolumn', name: '4月', key: 'APRIL', width: 80, tooltip: true,},
    {props: 'mayCarvolumn', name: '5月', key: 'MAY', width: 80, tooltip: true,},
    {props: 'junCarvolumn', name: '6月', key: 'JUNE', width: 80, tooltip: true,},
    {props: 'julCarvolumn', name: '7月', key: 'JULY', width: 80, tooltip: true,},
    {props: 'augCarvolumn', name: '8月', key: 'AUGUST', width: 80, tooltip: true,},
    {props: 'sepCarvolumn', name: '9月', key: 'SEPTEMBER', width: 80, tooltip: true,},
    {props: 'octCarvolumn', name: '10月', key: 'OCTOBER', width: 80, tooltip: true,},
    {props: 'novCarvolumn', name: '11月', key: 'NOVEMBER', width: 80, tooltip: true,},
    {props: 'decCarvolumn', name: '12月', key: 'DECEMBER', width: 80, tooltip: true,},
]
export const getRequest = () => {
    var url = location.search || decodeURIComponent(document.location.toString()); //获取url中"?"符后的字串
    url = url.substring(url.indexOf('?'))
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = encodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
