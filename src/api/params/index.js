import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_BASE_INFO)

/*根据数据字典编号查询数据字典信息，若其包含子节点则一并查出 */
export function getDictList(params) {
  return requst({
    url: '/web/dict',
    method: 'GET',
    params: params
  })
}
/*新增数据字典信息 */
export function addDict(data) {
  return requst({
    url: '/web/dict',
    method: 'POST',
    data: data
  })
}
/*更新数据字典信息 */
export function updateDict(data) {
  return requst({
    url: '/web/dict',
    method: 'PUT',
    data: data
  })
}

/*删除数据字典信息（若是父节点子节点一并删除）*/
export function deleteDict(data) {
  return requst({
    url: `/web/dict`,
    method: 'delete',
    params: data
  })
}

/*数据字典父节点信息列表查询 */
export function queryDictPaged(data) {
  return requst({
    url: '/web/queryDictPaged',
    method: 'post',
    data: data
  })
}

export function queryCalendar(data) {
  return requst({
    url: '/web/queryCalendar',
    method: 'post',
    data: data
  })
}
