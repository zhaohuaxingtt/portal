//间接物料供应商
import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const request = axios(process.env.VUE_APP_SUPPLIER + '/web')
const requestDownload = axiosDownload(process.env.VUE_APP_SUPPLIER + '/web')

// 供应商信息导出
export function exportData(data) {
    return requestDownload({
        url: '/gpSupplierIndirect/exportData',
        method: 'POST',
        data
    })
}
//   供应商信息导入
export function importData(data) {
    return request({
        url: '/gpSupplierIndirect/importData',
        method: 'POST',
        data
    })
}
// 分页查询数据
export function getPage(data) {
    return request({
        url: 'gpSupplierIndirect/page',
        method: 'POST',
        data
    })
}
// 保存或修改供应商主数据
export function saveOrUpdate(data) {
    return request({
        url: 'gpSupplierIndirect/saveOrUpdate',
        method: 'POST',
        data
    })
}
// 同步SAP号
export function synchronizationSap(data) {
    return request({
        url: 'gpSupplierIndirect/synchronizationSap',
        method: 'POST',
        data
    })
}

// 导出供应商用户信息
export function exportSupplierUser(supplierId) {
    return requestDownload({
        url: `/gpSupplierIndirect/exportSupplierUser/${supplierId}`,
        method: 'GET',
    })
}

// 获取供应商用户信息
export function listSupplierUser(supplierId) {
    return request({
        url: `/gpSupplierIndirect/listSupplierUser/${supplierId}`,
        method: 'GET',
    })
}

// 根据社会信用代码获取供应商信息
export function getSupplierByNameOrSocialCode(data) {
    return request({
        url: `/gpSupplierIndirect/getSupplierByNameOrSocialCode`,
        method: 'POST',
        data
    })
}