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
// /gpMeetingService/endMbdlThemen
export function endMbdlThemen(data) {
  return requst({
    url: `/gpMeetingService/endMbdlThemen`,
    method: 'POST',
    data
  }) 
}
// 发送大会议程接口
// /gpMeetingService/sendBigMeetingThemen
export function sendBigMeetingThemen(data) {
  return requst({
    url: `/gpMeetingService/sendBigMeetingThemen`,
    method: 'POST',
    data
  })
}

// Csc议题结束接口
// /gpMeetingService/endCscThemen
export function endCscThemen(data) {
  return requst({
    url: `/gpMeetingService/endCscThemen`,
    method: 'POST',
    data
  })
}
// 通过一般议题id查询供应商信息  结束列表
// /gpMeetingService/findGpBidderInfoByThemenId
export function findGpBidderInfoByThemenId(data) {
  return requst({
    url: `/gpMeetingService/findGpBidderInfoByThemenId`,
    method: 'POST',
    data
  })
}

// 通过一般议题id查询采购信息  结束表单
// /gpMeetingService/findGpInfoByThemenId
export function findGpInfoByThemenId(data) {
  return requst({
    url: `/gpMeetingService/findGpInfoByThemenId`,
    method: 'POST',
    data
  })
}
// 导出会议纪要
// /gpMeetingService/exportMeetingMinutes
export function exportMeetingMinutes(data) {
  return requst({
    url: `/gpMeetingService/exportMeetingMinutes`,
    method: 'POST',
    data,
    responseType: 'blob'
  })
}
// 导出会议纪要 mbdl
// /gpMeetingService/exportMbdlMeetingMinutes
export function exportMbdlMeetingMinutes(data) {
  return requst({
    url: `/gpMeetingService/exportMbdlMeetingMinutes`,
    method: 'POST',
    data,
    responseType: 'blob'
  })
}

//货币下拉框
// gpMeetingService/getCscCurrencyList
export function getCscCurrencyList(data) {
  return requst({
    url: `/gpMeetingService/getCscCurrencyList`,
    method: 'POST',
    data,
  })
}
// 改期页面信息
// /gpMeetingService/findToReschedule
export function findToReschedule(data) {
  return requst({
    url: `/gpMeetingService/findToReschedule`,
    method: 'POST',
    data,
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
// //二次修改结论 通用  modifyConclusionById
// export function modifyConclusionById(data) {
//   return requst({
//     url: `/gpMeetingService/modifyConclusionById`,
//     method: 'POST',
//     data
//   })
// }
// Csc议题结束接口  二次修改
// /gpMeetingService/modifyConclusionByCscId
export function modifyConclusionByCscId(data) {
  return requst({
    url: `/gpMeetingService/modifyConclusionByCscId`,
    method: 'POST',
    data
  })
}
// MBDl 议题结束接口  二次修改
// /gpMeetingService/modifyConclusionByMbdlId
export function modifyConclusionByMbdlId(data) {
  return requst({
    url: `/gpMeetingService/modifyConclusionByMbdlId`,
    method: 'POST',
    data
  })
}
// 导出会议agenda
// /gpMeetingService/exportMeetingAgenda
export function exportMeetingAgenda(data) {
  return requst({
    url: `/gpMeetingService/exportMeetingAgenda`,
    method: 'POST',
    responseType: 'blob',
    data
  })
}
// 根据会议类型id查询议题结论
// /gpMeetingService/findThemenConclusion
export function findThemenConclusion(data) {
  return requst({
    url: `/gpMeetingService/findThemenConclusion`,
    method: 'POST',
    data
  })
}
