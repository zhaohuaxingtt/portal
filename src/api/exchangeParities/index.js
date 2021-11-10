import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_BASE_INFO)

//分页列表请求
export function getPageList(data){
    return request({
        url:'/web/queryExchangeRatePaged',
        method:'POST',
        data
    })
}

//删除
export function delPageListItems(data){
    return request({
        url:'/web/deleteExchangeRate',
        method:'DELETE',
        data
    })
}

//保存 
export function savePageList(data){
    return request({
        url:'/web/saveOrUpdExchangeRate',
        method:'POST',
        data
    })
}

//下拉货币Code
export function getSelectOptions(){
    return request({
        url:'/web/currencyCodeSelect',
        method:'GET'
    })
}

