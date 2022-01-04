/*
 * @Author: your name
 * @Date: 2021-11-09 15:26:18
 * @LastEditTime: 2022-01-04 19:30:00
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\api\file\filedownload.js
 */
import axios from '@/utils/axios'
const requstFile = axios(process.env.VUE_APP_FILEAPI)
const requstType = axios(process.env.VUE_APP_MEETING)
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
  return requstFile({
    // url: `/rise-mock/batchSelectByIds`,
    url: `/batchSelectByIds`,
    method: 'POST',
    data
  })
}

// 通过会议类型id获取文件资料
export function findByMeetingTypeId(data) {
  return requstType({
    url: `/documentTypeService/findByMeetingTypeId`,
    method: 'POST',
    data
  })
}

// 通过 文件id获取 文件类型

export function getDoucumentsById(id) {
  return requstFile({
    url: `/rise-mock/mockService/files/${id}`,
    method: 'POST',
    data: {}
  })
}
