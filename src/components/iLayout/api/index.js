import axios from '@/utils/axios'

const requestPopup = axios(process.env.VUE_APP_MAIL)
const requestUSER = axios(process.env.VUE_APP_USER_CENTER)
const requestFile = axios(process.env.VUE_APP_FILEAPI + '/fileud')

export function updateModules(params) {
  return requestUSER({
    url: '/home/module/update',
    method: 'POST',
    data: params
  })
}

export function updateBatchModules(data) {
  return requestUSER({
    url: '/home/module/updateBatch',
    method: 'POST',
    data
  })
}

//获取最新的popup
export function getPopupList(data) {
  return requestPopup({
    url: `/popup/lastest5/${data}`,
    method: 'GET',
    data
  })
}

//改成这条消息已读
export function changeCheckedSta(data) {
  const userId = data.userId
  const popupId = data.popupId
  return requestPopup({
    url: `/popup/detail/${userId}/${popupId}`,
    method: 'GET'
    // params:data
  })
}

export function updateUserInfo(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ result: true, code: '200', data: data })
    }, 500)
  })
}

export function uploadAvatar(data) {
  return requestFile({
    url: `/udSignaturephoto`,
    method: 'post',
    data
  })
}
