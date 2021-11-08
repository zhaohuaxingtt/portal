import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const request = axios(process.env.VUE_APP_MATERIEL)
const requestDownload = axiosDownload(process.env.VUE_APP_MATERIEL)

//MTZ原材料/小类 分页查询
export function getMtzRawPage (data){
    return request({
        url:'/web/queryMtzRawMaterialPaged',
        method:'POST',
        data:data
    })
}

//MTZ原材料/小类 分页查询导出
export function exportMtzRawExcel (data) {
    return requestDownload({
        url:'/web/export4MtzRawMaterialExcel',
        method:'POST',
        data:data
    })
}

//材料小类/MTZ原材料根据Id批量删除
export function delMtzRawItems (data) {
    return request({
        url:"/web/mtzRawMaterialBatchDelete",
        method:'DELETE',
        data:data

    })
}

//材料小类/MTZ原材料保存或更新
export function saveOrUpdateMtzRaw (data) {
    return request ({
        url:'/web/saveOrUpdMtzRawMaterial',
        method:'POST',
        data
    })
}

//材料小类/MTZ原材料 数据状态修改 
export function changeMtzRawSta (data) {
    return request({
        url:'/web/mtzCategoryBatchSetStatus',
        method:'POST',
        data
    })
}

//材料小类/MTZ原材料根据id查询信息
export function getDetailById (data) {
    return request({
        url:'/web/queryMtzRawMaterialById',
        method:'GET',
        params:data
    })
}

//原材料大类下拉查询
export function getMtzRawCodeOptions(data){
    return request({
        url:'/web/queryMtzGeneralCategory4SelectDictVo',
        method:'GET',
        params:data
    })
}

//原材料中类下拉查询
export function getRawCodeOptions(data){
    return request({
        url:'/web/queryRawMaterial4SelectDictVo',
        method:'GET',
        params:data
    })
}

//带出最大值
export function getMaxCode (data) {
    return request({
        url:'web/queryMaxVoByRawMaterial',
        method:'GET',
        params:data
    })
}

