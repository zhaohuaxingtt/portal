export const tableTitle = [
    {props: 'partNum', name: '零件号', key: 'EKL_YJGL_LJHAO', tooltip: true, width: 150,},
    {props: 'partName', name: '零件名称', key: 'EKL_PFJ_LJMC', width: 200, tooltip: true,},
    {props: 'spMaterialGroup', name: '配附件材料组', key: 'EKL_PFJ_CLZ', width: 150, tooltip: true,},
    {props: 'partBrand', name: '品牌', key: 'EKL_PFJ_PP', width: 120, tooltip: true},
    {props: '_partProperty', name: '属性', key: 'EKL_PFJ_SX', width: 120, tooltip: true},
    {props: 'dptKeCode', name: '科室', key: 'EKL_KESHI', width: 100, tooltip: true,},
    {props: 'linieName', name: '采购员', key: 'EKL_YJGL_CGY', width: 120, tooltip: true,},
    {props: 'isConfirm', name: '确认状态', key: 'EKL_YJGL_QRZT', width: 120, tooltip: true,},
    {props: '_supplierName', name: '供应商', key: 'EKL_YJGL_GYS', tooltip: true, width: 200},
    {props: '_supplierPercent', name: '份额', key: 'EKL_PFJ_FE', tooltip: true, width: 120},
    {props: 'preYearPrice', name: '上年采购价格', key: 'EKL_PFJ_CGJG', width: 150, tooltip: true,},
    {props: 'yearForecastVolume', name: '当年销售量预测', key: 'EKL_PFJ_XSLYC', width: 150, tooltip: true,},
    {props: 'yearAmount', name: '当年采购金额', key: 'EKL_PFJ_DNCGJE', width: 150, tooltip: true,},
    {props: 'memo', name: '备注', key: 'EKL_PFJ_BZ', width: 150, tooltip: true,},
];

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
