import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_APPROVAL)

export function getUrl(data){
    return request({
        url:'/web/report/info',
        method:'POST',
        data
    })
}