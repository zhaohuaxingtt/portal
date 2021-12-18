export const tableTitle = [
    {props: 'partNum', name: '零件号', key: 'LK_LINGJIANHAO', tooltip: true, width: 150,},
    {props: 'partName', name: '零件名称', key: 'LK_PFJ_LJMC', width: 200, tooltip: true,},
    {props: 'spMaterialGroup', name: '配附件材料组', key: 'LK_PFJ_CLZ', width: 150, tooltip: true,},
    {props: 'partBrand', name: '品牌', key: 'LK_PFJ_PP', width: 120, tooltip: true},
    {props: '_partProperty', name: '属性', key: 'LK_PFJ_SX', width: 120, tooltip: true},
    {props: 'dptKeCode', name: '科室', key: 'LK_KESHI', width: 100, tooltip: true,},
    {props: 'linieName', name: '采购员', key: 'LK_CAIGOUYUAN', width: 120, tooltip: true,},
    {props: '_supplierName', name: '供应商', key: 'LK_GONGYINGSHANG', tooltip: true, width: 200},
    {props: '_supplierPercent', name: '份额', key: 'LK_PFJ_FE', tooltip: true, width: 120},
    {props: 'preYearPrice', name: '上年采购价格', key: 'LK_PFJ_CGJG', width: 150, tooltip: true,},
    {props: 'yearForecastVolume', name: '当年销售量预测', key: 'LK_PFJ_XSLYC', width: 150, tooltip: true,},
    {props: 'yearAmount', name: '当年采购金额', key: 'LK_PFJ_DNCGJE', width: 150, tooltip: true,},
    {props: 'lasting', name: 'Lasting', key: 'Lasting', width: 150, tooltip: true,},
    {props: 'average', name: 'Average', key: 'Average', width: 150, tooltip: true,},
    {props: '', name: '跟踪进度', key: 'LK_GZJD', width: 100, tooltip: true,},
    {props: 'idxCode', name: '备注', key: 'LK_PFJ_BZ', width: 150, tooltip: true,},

];
export const monthTitle = [
    {props: 'janPrice', name: '1月价格', key: 'janPrice', width: 100, tooltip: true},
    {props: 'febPrice', name: '2月价格', key: 'febPrice', width: 100, tooltip: true},
    {props: 'marPrice', name: '3月价格', key: 'marPrice', width: 100, tooltip: true},
    {props: 'aprPrice', name: '4月价格', key: 'aprPrice', width: 100, tooltip: true},
    {props: 'augPrice', name: '5月价格', key: 'augPrice', width: 100, tooltip: true},
    {props: 'junPrice', name: '6月价格', key: 'junPrice', width: 100, tooltip: true},
    {props: 'julPrice', name: '7月价格', key: 'julPrice', width: 100, tooltip: true},
    {props: 'augPrice', name: '8月价格', key: 'augPrice', width: 100, tooltip: true},
    {props: 'sepPrice', name: '9月价格', key: 'sepPrice', width: 100, tooltip: true},
    {props: 'octPrice', name: '10月价格', key: 'octPrice', width: 100, tooltip: true},
    {props: 'novPrice', name: '11月价格', key: 'novPrice', width: 100, tooltip: true},
    {props: 'decPrice', name: '12月价格', key: 'decPrice', width: 90, tooltip: true},
]
export const getRequest = () => {
    var url = location.search || location.hash; //获取url中"?"符后的字串
    var theRequest = new Object();
    url = url.substr(url.indexOf("?"))
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = encodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
