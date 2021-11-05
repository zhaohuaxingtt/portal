import axios from "@/utils/axios";
const requst = axios();

// 分页查询 会议议题
export function findThemen(data) {
  return requst({
    url: `/rise-meeting/meetingService/findThemenByPage`,
    method: "POST",
    data,
  });
}

// 上传会议议题资料  备注:该接口已弃用
// export function uploadThemenFile(data) {
//   return requst({
//     url: `/rise-meeting/meetingService/uploadThemenFile`,
//     method: "POST",
//     data,
//   });
// }

// 创建议题
export function saveThemen(data) {
  return requst({
    url: `/rise-meeting/meetingService/saveThemen`,
    method: "POST",
    data,
  });
}

//根据会议id查询会议议题
export function findThemenById(data) {
  return requst({
    url: `/rise-meeting/meetingService/findById`,
    method: "POST",
    data,
  });
}

//findThemenById

//根据会议id查询会议议题
export function findTheThemenById(data) {
  return requst({
    url: `/rise-meeting/meetingService/findThemenById`,
    method: "POST",
    data,
  });
}

//更新会议议题
export function updateThemen(data) {
  return requst({
    url: `/rise-meeting/meetingService/updateThemen`,
    method: "POST",
    data,
  });
}

//删除会议议题 /rise-meeting/meetingService/deleteThemen

export function deleteThemen(data) {
  return requst({
    url: `/rise-meeting/meetingService/deleteThemen`,
    method: "POST",
    data,
  });
}

//会议议题拆分
export function spiltThemen(data) {
  return requst({
    url: `/rise-meeting/meetingService/spiltThemen`,
    method: "POST",
    data,
  });
}

//会议议题维护资料
export function addThemenAttachment(data) {
  return requst({
    url: `/rise-meeting/meetingService/addThemenAttachment`,
    method: "POST",
    data,
  });
}
// 会议议题维护资料之删除文件
export function deleteThemenAttachment(data) {
  return requst({
    url: `/rise-meeting/meetingService/deleteThemenAttachment`,
    method: "POST",
    data,
  });
}

// 会议议题改期
export function rescheduleThemen(data) {
  return requst({
    url: `/rise-meeting/meetingService/rescheduleThemen`,
    method: "POST",
    data,
  });
}

//prenster 系统用户
export function getUsers(data) {
  return requst({
    url: `/rise-mock/mockService/users`,
    method: "POST",
    data,
  });
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
    url: `/rise-meeting/meetingService/resortThemen`,
    method: "POST",
    data,
  });
}

//导入会议议题
// /rise-meeting/meetingService/importThemen
export function importThemen(data) {
  return requst({
    url: `/rise-meeting/meetingService/importThemen?meetingId=${data.meetingId}`,
    method: "POST",
    data: data.file,
  });
}

//开始议题
export function startThemen(data) {
  return requst({
    url: `/rise-meeting/meetingService/startThemen`,
    method: "POST",
    data,
  });
}
//结束议题
export function endThemen(data) {
  return requst({
    url: `/rise-meeting/meetingService/endThemen`,
    method: "POST",
    data,
  });
}
//撤回议题
export function recallThemen(data) {
  return requst({
    url: `/rise-meeting/meetingService/recallThemen`,
    method: "POST",
    data,
  });
}
//撤回议题
export function addRestThemen(data) {
  return requst({
    url: `/rise-meeting/meetingService/addRestThemen`,
    method: "POST",
    data,
  });
}
///rise-meeting/meetingService/updateRestThemen

//修改休息
export function updateRestThemen(data) {
  return requst({
    url: `/rise-meeting/meetingService/updateRestThemen`,
    method: "POST",
    data,
  });
}
//修改休息
export function passThemenRecall(data) {
  return requst({
    url: `/rise-meeting/meetingService/passThemenRecall`,
    method: "POST",
    data,
  });
}
//修改休息
export function rejectThemenRecall(data) {
  return requst({
    url: `/rise-meeting/meetingService/rejectThemenRecall`,
    method: "POST",
    data,
  });
}
