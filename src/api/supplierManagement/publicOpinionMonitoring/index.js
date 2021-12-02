import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
//获取舆情列表
export function queryPublicOptionMonitoring(data) {
  return requst({
    url: '/opinionMonitoring/page',
    method: 'POST',
    data: data
  })
}
//修改舆情监控
export function  updatePublicOptionMonitoringItem(data){
  return requst({
    url: '/opinionMonitoring/update',
    method: 'POST',
    data: data
  })
}

//获取内容分类
export function getContentCategory(){
  return requst({
    url: '/opinionMonitoring/listContentClassification',
    method: 'POST',
  })
}

//导入
export  function importOpinionMonitorings(data){
  return requst({
    url: '/opinionMonitoring/importOpinionMonitorings',
    method: 'POST',
    data,
  })
}
//获取舆情详情
export function queryOpinionMonitoringDetail(id){
  return requst({
    url: `opinionMonitoring/detail/${id}`,
    method: 'GET',
  })

}


//删除
export  function deleteOpinionMonitorings(ids){
  return requst({
    url: `opinionMonitoring/delete/${ids}`,
    method: 'GET',
  })
}


//舆情供应商列表
export  function  queryopinionSupplier(data){
  return requst({
    url: '/opinionSupplier/page',
    method: 'POST',
    data:data,
  })
}

//新增供应商
export function  addNewOpinionSupplier(data){
  return requst({
    url: '/opinionSupplier/add',
    method: 'POST',
    data:data,
  })
}

//修改供应商
export  function  updateOpinionSupplier(data){
  return requst({
    url: '/opinionSupplier/update',
    method: 'POST',
    data:data,
  })
}

//删除供应商
export  function  deleteOpinionSupplier(ids){
  return requst({
    url: `/opinionSupplier/delete/${ids}`,
    method: 'GET',
  })

}

