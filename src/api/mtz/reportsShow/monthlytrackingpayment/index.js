import axios from '@/utils/axios'
const request = axios(process.env.VUE_APP_MTZ)

//获取支付金额月度跟踪报表数据
export function searchReport(data){
    return request({
        url:'/web/mtz/forecastReport/payMonthTracking',
        method:'POST',
        data
    })
}

//获取当前用户下的科室
export function getDept(data){
    return request({
        // url:'/web/mtz/forecastOther/queryDeptSection',
        url:'api/mtz/forecastReport/deptDropDown',
        method:'GET',
        // data
    })
}

//获取月度跟踪报表数据
export function searchTrackingReport(data){
    return request({
        url:'/web/mtz/forecastReport/forecastMonthTracking',
        method:'POST',
        data
    })
}