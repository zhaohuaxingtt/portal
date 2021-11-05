import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_RFQ + '/web')
const requstDict = axios(process.env.VUE_APP_BASE_INFO + '/web')

export function page(parmars) {
  //定点申请单分页查询
  return requst({
    url: '/nominate-apps/page',
    method: 'POST',
    data: parmars
  })
}

export function selectDictByKeys(data) {
  //字典
  return requstDict({
    url: '/web/selectDictByKeys',
    method: 'GET',
    params: data
  })
}

export function getRfqPartList(parmars) {
  //引用RFQ中零件查询列表
  return requst({
    url: '/mtz/getRfqPartList',
    method: 'POST',
    data: parmars
  })
}

export function getRfqListsByRfqId(parmars) {
  //根据RFQ编号模糊查询RFQ分页列表
  return requst({
    url: '/mtz/getRfqListsByRfqId',
    method: 'POST',
    data: parmars
  })
}

export function getNomiAppPageList(parmars) {
  //根据RFQ编号模糊查询RFQ分页列表
  return requst({
    url: '/mtz/getNomiAppPageList',
    method: 'POST',
    data: parmars
  })
}

export function getApplicationPartPagedList(parmars) {
  //查询定点申请零件列表
  return requst({
    url: '/mtz/getApplicationPartPagedList',
    method: 'POST',
    data: parmars
  })
}
