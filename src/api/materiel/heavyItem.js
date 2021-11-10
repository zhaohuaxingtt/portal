import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const request =axios(process.env.VUE_APP_MATERIEL)
const requestDownload = axiosDownload(process.env.VUE_APP_MATERIEL)

//工艺组分页请求
export function getHeavyItemPage(data){
    return request({
        url:'/web/stuffPaged',
        method:'POST',
        data:data
    })
}

//保存或更新工艺组信息
export function saveHeavyItemPage(data){
    return request({
        url:'/web/stuffBatchSaveOrUpd',
        // url:'/web/batchSaveOrUpdStuff',
        method:'POST',
        data:data
    })
}

//导出工艺组信息
export function exportHeavyItem(data){
    return requestDownload({
        url:'/web/queryStuff4ExcelExport',
        method:'POST',
        data
    })
}

//零件成本分析员和模具成本分析员
export function getAnalyseSelect (data){
    return request({
        url:'/web/analystSelectDict',
        method:'GET',
        params:data
    })
}