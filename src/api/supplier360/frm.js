import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

export function getFrmRating(params) {
    return requst({
      url: `/newVendorAccessRating/getFrmRating`,
      method: 'POST',
      data:params
    })
}
