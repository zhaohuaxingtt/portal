import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_APPROVAL)
const requstUcenter = axios(process.env.VUE_APP_USER_CENTER)
export function addAgent(data) {
  return requst({
    url: `/web/delegate/save`,
    method: 'post',
    data
  })
}

export function updateAgent(data) {
  return requst({
    url: `/web/delegate/update`,
    method: 'put',
    data
  })
}

export function fetchAgents(params, data) {
  return requst({
    url: `/web/delegate/findDelegateList`,
    method: 'post',
    params,
    data
  })
}

export function fetchAgent(id) {
  return requst({
    url: `/web/delegate/${id}`
  })
}

export function invalidAgent(delegateId) {
  return requst({
    url: `/web/delegate/invalid/${delegateId}`,
    method: 'put'
  })
}

export function batchInvalidAgent(data) {
  return requst({
    url: `/web/delegate/batchInvalid`,
    method: 'put',
    data
  })
}

export function fetchUser(data) {
  return requstUcenter({
    url: `/web/sapUser/pageList`,
    method: 'post',
    data
  })
}
