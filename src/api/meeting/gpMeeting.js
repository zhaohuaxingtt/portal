/*
 * @Author: HS
 * @FilePath: \front-portal\src\api\meeting\gpMeeting.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_MEETING)

//根据会议id查询会议议题
///gpMeetingService/findById
export function findThemenById(data) {
  console.log(data);
    return requst({
      // url: `/gpMeetingService/findById?id=${data.id}`,
      url: `/gpMeetingService/findById`,
      method: 'POST',
      data
    })
} 
//预备会关联会议分页列表接口
//gpMeetingService/findByRelationMeeting
export function findByRelationMeeting(data) {
    return requst({
      url: `/gpMeetingService/findByRelationMeeting`,
      method: 'POST',
      data
    })
} 
// Mbdl议题结束接口
// /gpMeetingService/endThemen
export function endThemen(data) {
  return requst({
    url: `/gpMeetingService/endThemen`,
    method: 'POST',
    data
  })
}