import axios from '@/utils/axios'
const request = axios(process.env.VUE_APP_BASE_INFO)

export function queryContractList(reqData){
  return request({
    url: `/web/contract/page/${reqData.businessScenarios}`,
    method: 'POST',
    data:reqData.data
  })
}
//获取印章类型
export function querySealtype(){
  return request({
    url:'/web/contract/signList',
    method: 'POST',
  })
}

//签署状态、合同类型下拉数据
export function queryEnumeration (){
  return request({
    url:'/web/contract/selectData',
    method: 'POST',
  })
}

//撤销
export  function  cancelContract(data){
  return request({
    url:'/web/contract/cancelContract',
    method: 'POST',
    data:data
  })
}

//查看合同
export function  detailLook(data){
  return request({
    url:'/web/contract/detailLook',
    method:'POST',
    data:data
  })
}

