import axios from '@/utils/axios'
const request = axios(process.env.VUE_APP_MTZ)

///报表展示接口API

export function  yearBrand(data){
  return request({
    url: '/api/mtz/forecastReport/yearBrand',
    method: 'POST',
    data: data
  })
}