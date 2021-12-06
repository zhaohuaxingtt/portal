/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: zbin
 * @LastEditTime: 2021-06-08 19:31:41
 * @Descripttion: your project
 */
export const tabRouterList = [
    {
        value: 1,
        name: '我的业绩',
        url: '/achievement/baseData/mymerit',
        activePath: '/achievement/baseData/mymerit',
        permissionKey:'ACHIEVEMENT',
        key: 'EKL_WDYJ',
    },
    {
        value: 2,
        name: '业绩基础',
        url: '/achievement/baseData/list',
        activePath: '/achievement/baseData/list',
        key: 'EKL_YJJC',
        permissionKey:'ACHIEVEMENT',
    },
]
export const btnsgroup1 = [
    { value: 0, name: "年度业绩基础", message: 0, url: '',active:true, activePath: "", key: "EKL_NDYJJC" },
    { value: 1, name: "总成散件基础表", message: 0, url: '', activePath: "", key: "EKL_ZCSJJCB" },
    { value: 2, name: "其它", message: 0, url: '', activePath: "", key: "EKL_QT" },
];
export const getNowFormatDate = () => {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var hour = date.getHours();
    var minutes = date.getMinutes() ;
    var seconds = date.getSeconds();
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate+"  "+hour+":" +minutes+":" +seconds;

    return currentdate;
}