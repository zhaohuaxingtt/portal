/*
 * @author:shujie
 * @Date: 2021-4-22 16:14:04
 * @Description: 股东 集团 与 关联公司
 */
import axios from '@/utils/axios'
import store from '@/store'
const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

//投资方股东信息对内接口（前端）
export function getSupplierInvestor() {
  return requst({
    url: '/supplierInvestor/page',
    method: 'POST',
    data: {
      supplierToken: store.state.home.valiCode
    }
  })
}

//供应商集团公司信息分页查询
export function getSupplierCorp() {
  return requst({
    url: '/supplierCorp/page',
    method: 'POST',
    data: {
      supplierToken: store.state.home.valiCode
    }
  })
}

//关联公司信息分页查询
export function getCompanyList() {
  return requst({
    url: '/company/page',
    method: 'POST',
    data: {
      supplierToken: store.state.home.valiCode
    }
  })
}
//保存关联公司信息
export function saveCompany(parmars) {
  return requst({
    url: '/company/infos',
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}

//删除关联公司信息
export function delCompany(parmars) {
  return requst({
    url: `/company/infos`,
    method: 'DELETE',
    data: parmars
  })
}
//获取单个关联公司信息
export function getCompany(parmars) {
  return requst({
    url: `/company/infos/${parmars}`,
    method: 'GET'
  })
}


//股东保存
export function supplierInvestorInfos(parmars) {
  return requst({
    url: '/register/supplierInvestor/infos',
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}

//股东删除
export function delSupplierInvestor(parmars) {
  return requst({
    url: `/supplierInvestor/infos`,
    method: 'DELETE',
    data: parmars
  })
}

//集团保存
export function supplierCorpInfos(parmars) {
  return requst({
    url: '/supplierCorp/infos',
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}

//删除供应商集团公司信息
export function delSupplierCorp(parmars) {
  return requst({
    url: `/supplierCorp/infos`,
    method: 'DELETE',
    data: parmars
  })
}