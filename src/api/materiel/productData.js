import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const request =axios(process.env.VUE_APP_MATERIEL)
const requestDownload = axiosDownload(process.env.VUE_APP_MATERIEL)

//获取分页信息
export function getProductTabelList(data){
    return request ({
        url:'/web/productGroupPaged',
        method:'POST',
        data
        })
}

//删除产品组
export function deleteProduct(data){
    return request({
        url:`/web/productGroup/productGroupDel/${data}`,
        method:'POST',
        data:data
    })
}

//导出产品组
export function exportExcel(data){
    return requestDownload({
        url:'/web/productGroup/export',
        method:'POST',
        data:data
    })
}

//根据产品组id查询数据
export function getProductById(data){
    return request({
        url:`/web/productGroup/getProductGroupById/${data}`,
        method:'GET',
        params:data
    })
}

//保存产品组详情页
export function saveProductData(data){
    return request({
        url:'/web/productGroup/saveOrUpdate',
        method:'POST',
        data
    })
}

//关联零件六位号删除
export function delProSixNum(data){
    return request({
        url:`/web/productGroup/bindingDel/${data}`,
        method:'POST',
        data:data
    })
}

//产品组关联零件6位号详情
export function getSixNUmDetail(data){
    return request({
        url:`/web/productGroup/getBindingById/${data}`,
        method:'GET',
        params:data
    })
}

//根据零件6位号查询linie及linie科室
export function getLinieBySixNum(data){
    const sixPartNum = data
    return request({
        url:`/web/productGroup/getLinieBySixPartNum`,
        method:'GET',
        params:{sixPartNum}
    })
}

//产品组关联零件6位号更新
export function updateSixNum(data){
    return request({
        url:'/web/productGroup/bindingUpdate',
        method:'POST',
        data:data
    })
}

//产品组关联零件6位号保存
export function saveSixNum(data){
    return request({
        url:'/web/productGroup/binding',
        method:'POST',
        data:data
    })
}

//根据零件六位号获取信息
export function getChangeSixParts(data) {
    let sixPartNum = data
    return request({
      url:'/web/queryFirstBindingSixPartNum',
      method:'GET',
      params: {sixPartNum}
    })
  }
