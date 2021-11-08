import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const request =axios(process.env.VUE_APP_MATERIEL)
const requestDownload = axiosDownload(process.env.VUE_APP_MATERIEL)

//分页列表
export function getRawPage(data){
    return request({
        url:'web/mtzGeneralCategoryPaged',
        method:'POST',
        data:data
    })
}

//导出
export function exportRawExcel (data) {
    return  requestDownload({
        url:'web/mtzGeneralCategoryExport4Excel',
        method:'POST',
        data:data
    })
}

//批量删除
export function delRawPageItems (data) {
    return request ({
        url:'web/mtzGeneralCategoryBatchDelete',
        method:'DELETE',
        data:data
    })
}

//根据ID查询原材料大类
export function getDetailById(data){
    return request({
        url:'web/mtzGeneralCategoryById',
        method:'GET',
        params:data
    })
}

//状态修改生效、失效
export function changeSta(data){
    return request({
        url:'web/mtzGeneralCategoryBatchSetStatus',
        method:'POST',
        data:data
    })
}

//新增或修改
export function saveDetailMe(data){
    return request({
        url:'web/saveOrUpdMtzGeneralCategory',
        method:'POST',
        data:data
    })
}
