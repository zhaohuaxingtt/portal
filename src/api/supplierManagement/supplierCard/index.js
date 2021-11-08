//供应商卡片  caopeng
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER+ '/web')
 const requstEkl = axios(process.env.VUE_APP_EKL)
// 查询标签管理页面
export function getSupplierCard(parmars) {
    return requstEkl({
        url: '/spEklreportEntity/getSupplierCard',
        method: 'POST',
        data: parmars
    })
}