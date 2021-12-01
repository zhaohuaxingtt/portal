export const tableTitle = [
    {props: 'partNumber', name: '零件号', key: 'EKL_YJGL_LJHAO', tooltip: true, width: 150, required: true},
    {props: 'partName', name: '零件名称', key: 'EKL_PFJ_LJMC', width: 200, tooltip: true,},
    {props: 'carFamily', name: '产品家族', key: 'EKL_YJGL_CPJZ', width: 120, tooltip: true},
    {props: 'carconfigSixcode', name: '车型代码', key: 'EKL_YJGL_CXDM',width: 120, tooltip: true,},
    {props: 'factoryCode', name: '采购工厂', key: 'EKL_YJGL_CGGC', width: 120,tooltip: true,},
    {props: 'supplierName', name: '供应商', key: 'EKL_YJGL_GYS', tooltip: true, width: 280},
    {props: 'unit', name: '单位', key: 'EKL_DANWEI', width: 120, tooltip: true,},
    {props: 'price', name: 'KSL价', key: 'EKL_YJGL_KSLJ', width: 120, tooltip: true,},
    {props: 'kslPriceSource', name: 'KSL价来源', key: 'EKL_YJGL_KSLJLY', width: 120, tooltip: true,iconText: 'C:正式订单价 D:定点价格 T:目标价 F:上期正式订单价 M:手工', iconTextKey: 'EKL_YJGL_QRJG',icon:'iconxinxitishi'},
    {props: 'confirmPrice', name: '采购参考价', key: 'EKL_YJGL_CGCKJ', width: 150, tooltip: true, },
    {props: 'priceConfirm', name: '基价', key: 'EKL_YJGL_JIJIA', width: 120, tooltip: true,},
    {props: 'confirmQuantity', name: '数量', key: 'EKL_YJGL_SHUL', width: 80, tooltip: true,},
    {props: 'carconfigSixcodeVolumn', name: '全年产量', key: 'EKL_YJGL_QNCL', width: 150, tooltip: true,},
    {props: 'procAmount', name: '采购金额', key: 'EKL_CAIGOUJINE', width: 100, tooltip: true,},
    {props: 'lasting', name: 'Lasting', key: '', width: 150, tooltip: true,},
    {props: 'average', name: 'Average', key: '', width: 150, tooltip: true,},
    {props: '', name: '跟踪进度', key: 'EKL_YJGL_GZJD', width: 100, tooltip: true,},

    {props: 'configName', name: '配置', key: 'EKL_YJGL_PEIZ', width: 200, tooltip: true,},
    {props: 'csGroupName', name: '材料组', key: 'EKL_CAILIAOZU', width: 150, tooltip: true,},
    {props: 'partType', name: '零件类型', key: 'EKL_LINGJIANLEIXING', width: 120, tooltip: true,},
    {props: 'deptCode', name: '科室', key: 'EKL_KESHI', width: 100, tooltip: true,},
    {props: 'buyerName', name: '采购员', key: 'EKL_YJGL_CGY', width: 120, tooltip: true,},
    {props: 'idxCode', name: '索引号', key: 'EKL_YJGL_SYH', width: 150, tooltip: true,},

];
export const monthTitle = [
    {props: 'janCarvolumn', name: '1月', key: 'JANUARY', width: 120, tooltip: true,
     child:[
         {props: 'janPrice', name: '价格', key: 'EKL_YJGL_JAGE', width: 120, tooltip: true,},
         {props: 'janCarvolumn', name: '数量', key: 'EKL_YJGL_SHUL', width: 80, tooltip: true,}
     ]
    },
    {props: 'febCarvolumn', name: '2月', key: 'FEBRUARY', width: 120, tooltip: true,
        child:[
            {props: 'febPrice', name: '价格', key: 'EKL_YJGL_JAGE', width: 120, tooltip: true,},
            {props: 'febCarvolumn', name: '数量', key: 'EKL_YJGL_SHUL', width: 80, tooltip: true,}
        ]
    },
    {props: 'marCarvolumn', name: '3月', key: 'MARCH', width: 120, tooltip: true,
        child:[
            {props: 'marPrice', name: '价格', key: 'EKL_YJGL_JAGE', width: 120, tooltip: true,},
            {props: 'marCarvolumn', name: '数量', key: 'EKL_YJGL_SHUL', width: 80, tooltip: true,}
        ]
    },
    {props: 'aprCarvolumn', name: '4月', key: 'APRIL', width: 120, tooltip: true,
        child:[
            {props: 'aprPrice', name: '价格', key: 'EKL_YJGL_JAGE', width: 120, tooltip: true,},
            {props: 'aprCarvolumn', name: '数量', key: 'EKL_YJGL_SHUL', width: 80, tooltip: true,}
        ]
    },
    {props: 'mayCarvolumn', name: '5月', key: 'MAY', width: 120, tooltip: true,
        child:[
            {props: 'augPrice', name: '价格', key: 'EKL_YJGL_JAGE', width: 120, tooltip: true,},
            {props: 'mayCarvolumn', name: '数量', key: 'EKL_YJGL_SHUL', width: 80, tooltip: true,}
        ]
    },
    {props: 'junCarvolumn', name: '6月', key: 'JUNE', width: 120, tooltip: true,
        child:[
            {props: 'junPrice', name: '价格', key: 'EKL_YJGL_JAGE', width: 120, tooltip: true,},
            {props: 'junCarvolumn', name: '数量', key: 'EKL_YJGL_SHUL', width: 80, tooltip: true,}
        ]
    },
    {props: 'julCarvolumn', name: '7月', key: 'JULY', width: 120, tooltip: true,
        child:[
            {props: 'julPrice', name: '价格', key: 'EKL_YJGL_JAGE', width: 120, tooltip: true,},
            {props: 'julCarvolumn', name: '数量', key: 'EKL_YJGL_SHUL', width: 80, tooltip: true,}
        ]
    },
    {props: 'augCarvolumn', name: '8月', key: 'AUGUST', width: 120, tooltip: true,
        child:[
            {props: 'augPrice', name: '价格', key: 'EKL_YJGL_JAGE', width: 120, tooltip: true,},
            {props: 'augCarvolumn', name: '数量', key: 'EKL_YJGL_SHUL', width: 80, tooltip: true,}
        ]
    },
    {props: 'sepCarvolumn', name: '9月', key: 'SEPTEMBER', width: 120, tooltip: true,
        child:[
            {props: 'sepPrice', name: '价格', key: 'EKL_YJGL_JAGE', width: 120, tooltip: true,},
            {props: 'sepCarvolumn', name: '数量', key: 'EKL_YJGL_SHUL', width: 80, tooltip: true,}
        ]
    },
    {props: 'octCarvolumn', name: '10月', key: 'OCTOBER', width: 120, tooltip: true,
        child:[
            {props: 'octPrice', name: '价格', key: 'EKL_YJGL_JAGE', width: 120, tooltip: true,},
            {props: 'octCarvolumn', name: '数量', key: 'EKL_YJGL_SHUL', width: 80, tooltip: true,}
        ]
    },
    {props: 'novCarvolumn', name: '11月', key: 'NOVEMBER', width: 120, tooltip: true,
        child:[
            {props: 'novPrice', name: '价格', key: 'EKL_YJGL_JAGE', width: 120, tooltip: true,},
            {props: 'novCarvolumn', name: '数量', key: 'EKL_YJGL_SHUL', width: 80, tooltip: true,}
        ]
    },
    {props: 'decCarvolumn', name: '12月', key: 'DECEMBER', width: 120, tooltip: true,
        child:[
            {props: 'decPrice', name: '价格', key: 'EKL_YJGL_JAGE', width: 120, tooltip: true,},
            {props: 'decCarvolumn', name: '数量', key: 'EKL_YJGL_SHUL', width: 80, tooltip: true,}
        ]
    },
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
