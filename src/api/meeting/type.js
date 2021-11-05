import axios from "@/utils/axios";
const requst = axios();
const requstFile = axios(process.env.VUE_APP_FILE_SERVER);

export function getMettingType(data) {
  return requst({
    url: `/rise-meeting/meetingTypeService/findByPage`,
    method: "POST",
    data,
  });
}

export function saveMettingType(data) {
  return requst({
    url: `/rise-meeting/meetingTypeService/saveMeetingType`,
    method: "POST",
    data,
  });
}
export function getMettingDetailType(data) {
  return requst({
    url: `/rise-meeting/meetingTypeService/findById`,
    method: "POST",
    data,
  });
}

export function deleteMeeting(data) {
  return requst({
    url: `/rise-meeting/meetingTypeService/deleteMeetingType`,
    method: "POST",
    data,
  });
}
// 批量删除会议类型
export function batchDeleteMeeting(data) {
  return requst({
    url: `/rise-meeting/meetingTypeService/batchDeleteMeetingType`,
    method: "POST",
    data,
  });
}

export function updateMettingType(data) {
  return requst({
    url: `/rise-meeting/meetingTypeService/updateMeetingType`,
    method: "POST",
    data,
  });
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
  let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  let currentUser = userInfo.nameZh ? userInfo.nameZh : userInfo.nameEn;
  if (process.env.NODE_ENV == "develop") {
    return requst({
      // url: `/rise-mock/udMutilfilesController`,
      url: `/udMutilfilesController?currentUser=${currentUser}`,
      method: "POST",
      data,
    });
  }

  return requstFile({
    // url: `/rise-mock/udMutilfilesController`,
    url: `/udMutilfilesController?currentUser=${currentUser}`,
    method: "POST",
    data,
  });
}
//updateMettingType

export function getApprovalProcess() {
  return requst({
    url: `/rise-mock/mockService/approval-processes`,
    method: "POST",
  });
}

// 分页查询参会人信息
export function getAttendee(data) {
  return requst({
    url: `/rise-meeting/attendeeService/findByPage`,
    method: "POST",
    data,
  });
}

// 创建与会人group
export function saveGroup(data) {
  return requst({
    url: `/rise-meeting/attendeeService/saveAttendee`,
    method: "POST",
    data,
  });
}

//创建会议议题
export function createMeetingTopic(data) {
  return requst({
    url: `/rise-meeting/meetingService/saveThemen`,
    method: "POST",
    data,
  });
}

// 修改与会人group
export function updateGroup(data) {
  return requst({
    url: `/rise-meeting/attendeeService/updateAttendee`,
    method: "POST",
    data,
  });
}

// 删除与会人group
export function deleteGroup(data) {
  return requst({
    url: `/rise-meeting/attendeeService/deleteAttendee`,
    method: "POST",
    data,
  });
}

// 分页查询收件人
export function getReceiver(data) {
  return requst({
    url: `/rise-meeting/receiverService/findByPage`,
    method: "POST",
    data,
  });
}

// 通过id查询收件人
export function getReceiverById(data) {
  return requst({
    url: `/rise-meeting/receiverService/findById`,
    method: "POST",
    data,
  });
}

// 创建收件人
export function saveReceiver(data) {
  return requst({
    url: `/rise-meeting/receiverService/saveReceiver`,
    method: "POST",
    data,
  });
}

// 更新收件人
export function updateReceiver(data) {
  return requst({
    url: `/rise-meeting/receiverService/updateReceiver`,
    method: "POST",
    data,
  });
}

// 删除收件人
export function deleteReceiver(data) {
  return requst({
    url: `/rise-meeting/receiverService/deleteReceiver`,
    method: "POST",
    data,
  });
}

// 分页获取用户信息
export function getUsers(data) {
  return requst({
    url: `/rise-mock/mockService/users`,
    method: "POST",
    data,
  });
}
// export function getPageListByParam(data) {
//   return requst({
//     url: `/usercenter/api/sapUser/getPageListByParam`,
//     method: "POST",
//     data,
//   });
// }
