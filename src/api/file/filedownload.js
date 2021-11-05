import axios from "@/utils/axios";
const requst = axios();
const requstFile = axios(process.env.VUE_APP_FILE_SERVER);

// 通过文件id获取文件
// export function getFileByIds(data) {
//   return requst({
//     url: `/rise-mock/mockService/files/list`,
//     method: "POST",
//     data,
//   });
// }
// 通过文件id获取文件
export function getFileByIds(data) {
  if (process.env.NODE_ENV == "develop") {
    return requst({
      // url: `/rise-mock/batchSelectByIds`,
      url: `/batchSelectByIds`,
      method: "POST",
      data,
    });
  }
  return requstFile({
    // url: `/rise-mock/batchSelectByIds`,
    url: `/batchSelectByIds`,
    method: "POST",
    data,
  });
}

// 通过会议类型id获取文件资料
export function findByMeetingTypeId(data) {
  return requst({
    url: `/rise-meeting/documentTypeService/findByMeetingTypeId`,
    method: "POST",
    data,
  });
}

// 通过 文件id获取 文件类型

export function getDoucumentsById(id) {
  return requstFile({
    url: `/rise-mock/mockService/files/${id}`,
    method: "POST",
    data: {},
  });
}
