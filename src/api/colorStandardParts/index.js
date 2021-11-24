import axios  from '@/utils/axios'

const request = axios(process.env.VUE_APP_MATERIEL)

//单位选择
export function unitSelect(data){
    return request({
        url:'web/unitSelect',
        method:'GET',
        params:data
    })
}

//根据id查询当前零件信息
export function getPartsBYId(data){
    return request({
        url:`web/part/${data}`,
        method:'GET',
        params:data
    })
}

//批量更新
export function updateColorParts (data){
    return request({
        url:'/web/batchUpdColorPart',
        method:'POST',
        data
    })
}

//根据零件编号和色号标号查询色标列表
export function getColorListById(data){
    return request({
        url:'web/colorPartList',
        method:'POST',
        data
    })
}

//根据零件编号获取单位列表
export function getUnitList(data){
    let param = {'bizId':data}
    return request({
        url:'/web/queryUnitConverseByBizId',
        method:'GET',
        params: param
    })
}