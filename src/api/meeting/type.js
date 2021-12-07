import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_MEETING)
const requstFile = axios(process.env.VUE_APP_FILEAPI)
const requstDict = axios(process.env.VUE_APP_BASE_INFO)

export function getMettingType(data) {
  return requst({
    url: `/meetingTypeService/findByPage`,
    method: 'POST',
    data
  })
}
export function saveMettingType(data) {
  return requst({
    url: `/meetingTypeService/saveMeetingType`,
    method: 'POST',
    data
  })
}
export function getMettingDetailType(data) {
  return requst({
    url: `/meetingTypeService/findById`,
    method: 'POST',
    data
  })
}

export function deleteMeeting(data) {
  return requst({
    url: `/meetingTypeService/deleteMeetingType`,
    method: 'POST',
    data
  })
}
// 批量删除会议类型
export function batchDeleteMeeting(data) {
  return requst({
    url: `/meetingTypeService/batchDeleteMeetingType`,
    method: 'POST',
    data
  })
}

export function updateMettingType(data) {
  return requst({
    url: `/meetingTypeService/updateMeetingType`,
    method: 'POST',
    data
  })
}
//上传图片
// export function uploadFile(data) {
//   console.log(data);
//   return requst({
//     url: `/rise-mock/mockService/files/upload-file`,
//     method: "POST",
//     data,
//   });
// }
export function uploadFile(data) {
  let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  let currentUser = userInfo.nameZh ? userInfo.nameZh : userInfo.nameEn
  if (process.env.NODE_ENV == 'develop') {
    return requst({
      url: `/udMutilfilesController?currentUser=${currentUser}`,
      method: 'POST',
      data
    })
  }

  return requstFile({
    url: `/udMutilfilesController?currentUser=${currentUser}`,
    method: 'POST',
    data
  })
}

//从字典表获取审批流程列表
export function getApprovalProcess() {
  return requstDict({
    url: `/api/dict`,
    method: 'get',
    params: {
      code: 'FAC'
    }
  })
}

// 分页查询参会人信息
export function getAttendee(data) {
  return requst({
    url: `/attendeeService/findByPage`,
    method: 'POST',
    data
  })
}

// 创建与会人group
export function saveGroup(data) {
  return requst({
    url: `/attendeeService/saveAttendee`,
    method: 'POST',
    data
  })
}

//创建会议议题
export function createMeetingTopic(data) {
  return requst({
    url: `/meetingService/saveThemen`,
    method: 'POST',
    data
  })
}

// 修改与会人group
export function updateGroup(data) {
  return requst({
    url: `/attendeeService/updateAttendee`,
    method: 'POST',
    data
  })
}

// 删除与会人group
export function deleteGroup(data) {
  return requst({
    url: `/attendeeService/deleteAttendee`,
    method: 'POST',
    data
  })
}

// 分页查询收件人
export function getReceiver(data) {
  return requst({
    url: `/receiverService/findByPage`,
    method: 'POST',
    data
  })
}

// 通过id查询收件人
export function getReceiverById(data) {
  return requst({
    url: `/receiverService/findById`,
    method: 'POST',
    data
  })
}

// 创建收件人
export function saveReceiver(data) {
  return requst({
    url: `/receiverService/saveReceiver`,
    method: 'POST',
    data
  })
}

// 更新收件人
export function updateReceiver(data) {
  return requst({
    url: `/receiverService/updateReceiver`,
    method: 'POST',
    data
  })
}

// 删除收件人
export function deleteReceiver(data) {
  return requst({
    url: `/receiverService/deleteReceiver`,
    method: 'POST',
    data
  })
}

// 分页获取用户信息
export function getUsers(data) {
  return requst({
    url: `/rise-mock/mockService/users`,
    method: 'POST',
    data
  })
}
// export function getPageListByParam(data) {
//   return requst({
//     url: `/usercenter/api/sapUser/getPageListByParam`,
//     method: "POST",
//     data,
//   });
// }

// 查询关联关系
export function findMeetingTypesByProperties(data) {
  return requst({
    url: `/meetingService/findMeetingTypesByProperties`,
    method: 'POST',
    data
  })
}
