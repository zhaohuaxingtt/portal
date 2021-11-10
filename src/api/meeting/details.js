import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_MEETING)

// 分页查询 会议议题
export function findThemen(data) {
  return requst({
    url: `/meetingService/findThemenByPage`,
    method: 'POST',
    data
  })
}

// 上传会议议题资料  备注:该接口已弃用
// export function uploadThemenFile(data) {
//   return requst({
//     url: `/meetingService/uploadThemenFile`,
//     method: "POST",
//     data,
//   });
// }

// 创建议题
export function saveThemen(data) {
  return requst({
    url: `/meetingService/saveThemen`,
    method: 'POST',
    data
  })
}

//根据会议id查询会议议题
export function findThemenById(data) {
  return requst({
    url: `/meetingService/findById`,
    method: 'POST',
    data
  })
}

//findThemenById

//根据会议id查询会议议题
export function findTheThemenById(data) {
  return requst({
    url: `/meetingService/findThemenById`,
    method: 'POST',
    data
  })
}

//更新会议议题
export function updateThemen(data) {
  return requst({
    url: `/meetingService/updateThemen`,
    method: 'POST',
    data
  })
}

//删除会议议题 /rise-meeting/meetingService/deleteThemen

export function deleteThemen(data) {
  return requst({
    url: `/meetingService/deleteThemen`,
    method: 'POST',
    data
  })
}

//会议议题拆分
export function spiltThemen(data) {
  return requst({
    url: `/meetingService/spiltThemen`,
    method: 'POST',
    data
  })
}

//会议议题维护资料
export function addThemenAttachment(data) {
  return requst({
    url: `/meetingService/addThemenAttachment`,
    method: 'POST',
    data
  })
}
// 会议议题维护资料之删除文件
export function deleteThemenAttachment(data) {
  return requst({
    url: `/meetingService/deleteThemenAttachment`,
    method: 'POST',
    data
  })
}

// 会议议题改期
export function rescheduleThemen(data) {
  return requst({
    url: `/meetingService/rescheduleThemen`,
    method: 'POST',
    data
  })
}

//prenster 系统用户
export function getUsers(data) {
  return requst({
    url: `/rise-mock/mockService/users`,
    method: 'POST',
    data
  })
}

// export function getUsers(data) {
//   return requst({
//     url: `/usercenter/api/sapUser/getPageListByParam`,
//     method: "POST",
//     data,
//   });
// }
//议题调整
///rise-meeting/meetingService/resortThemen

export function resortThemen(data) {
  return requst({
    url: `/meetingService/resortThemen`,
    method: 'POST',
    data
  })
}

//导入会议议题
// /rise-meeting/meetingService/importThemen
export function importThemen(data) {
  return requst({
    url: `/meetingService/importThemen?meetingId=${data.meetingId}`,
    method: 'POST',
    data: data.file
  })
}

//开始议题
export function startThemen(data) {
  return requst({
    url: `/meetingService/startThemen`,
    method: 'POST',
    data
  })
}
//结束议题
export function endThemen(data) {
  return requst({
    url: `/meetingService/endThemen`,
    method: 'POST',
    data
  })
}
//撤回议题
export function recallThemen(data) {
  return requst({
    url: `/meetingService/recallThemen`,
    method: 'POST',
    data
  })
}
//撤回议题
export function addRestThemen(data) {
  return requst({
    url: `/meetingService/addRestThemen`,
    method: 'POST',
    data
  })
}
///rise-meeting/meetingService/updateRestThemen

//修改休息
export function updateRestThemen(data) {
  return requst({
    url: `/meetingService/updateRestThemen`,
    method: 'POST',
    data
  })
}
//修改休息
export function passThemenRecall(data) {
  return requst({
    url: `/meetingService/passThemenRecall`,
    method: 'POST',
    data
  })
}
//修改休息
export function rejectThemenRecall(data) {
  return requst({
    url: `/meetingService/rejectThemenRecall`,
    method: 'POST',
    data
  })
}
