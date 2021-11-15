import axios from '@/utils/axios'
import { deleteString } from '@/utils/utils'
const requst = axios(process.env.VUE_APP_MEETING)
const requstDict = axios(process.env.VUE_APP_BASE_INFO);

// 获取会议列表
export function getMettingList(data) {
  return requst({
    url: `/meetingService/findByPage`,
    method: 'POST',
    data: deleteString(data)
  })
}

// 获取会议信息列表
export function getMyMettingList(data) {
  return requst({
    url: `/meetingService/findMyMeetings`,
    method: 'POST',
    data: deleteString(data)
  })
}

// 获取会议信息列表
export function findByMeetingAll(data) {
  return requst({
    url: `/meetingTypeService/findByMeetingAll`,
    method: 'POST',
    data: deleteString(data)
  })
}

// 删除会议
export function deleteMeeting(data) {
  return requst({
    url: `/meetingService/batchDeleteMeeting`,
    method: 'POST',
    data: deleteString(data)
  })
}

// 新增会议
export function addMeeting(data) {
  return requst({
    url: `/meetingService/saveMeeting`,
    method: 'POST',
    data: deleteString(data)
  })
}

// 修改会议
export function updateMeeting(data) {
  return requst({
    url: `/meetingService/updateMeeting`,
    method: 'POST',
    data: deleteString(data)
  })
}

// 修改会议状态
export function changeStateMeeting(data) {
  return requst({
    url: `/meetingService/changeState`,
    method: 'POST',
    data: deleteString(data)
  })
}

// 获取审批流程
export function getApprovalProcessList() {
  // return requst({
  //   url: `/rise-mock/mockService/approval-processes`,
  //   method: 'POST',
  //   data: deleteString(data)
  return requstDict({
    url: `/api/dict`,
    method: 'get',
    params: {
      code: 'FAC'
    }
  })
  // })
}

// 获取会议详情
export function getMeetingById(data) {
  return requst({
    url: `/meetingService/findById`,
    method: 'POST',
    data: deleteString(data)
  })
}

// 生成会议Agenda
export function generateAgenda(data) {
  return requst({
    url: `/meetingService/generateAgenda`,
    method: 'POST',
    data: deleteString(data)
  })
}

// 上传会议Agenda
export function uploadAttachment(data) {
  return requst({
    url: `/meetingService/uploadAttachment`,
    method: 'POST',
    data: deleteString(data)
  })
}

// 上传会议Agenda
export function getMeetingDetail(data) {
  return requst({
    url: `/meetingService/findById`,
    method: 'POST',
    data: deleteString(data)
  })
}

// 下载模版
export function downloadThemenImportTemplate(data) {
  return requst({
    url: `/meetingService/downloadThemenImportTemplate`,
    method: 'POST',
    data: deleteString(data)
  })
}

// 根据会议 id 获取会议纪要
export function getMeetingSummary(data) {
  return requst({
    url: `/meetingService/getMeetingMinutes`,
    method: 'POST',
    data: deleteString(data)
  })
}

// 保存会议纪要
export function saveMeetingMinutes(data) {
  return requst({
    url: `/meetingService/saveMeetingMinutes`,
    method: 'POST',
    data: deleteString(data)
  })
}

// 导入议题
export function importThemen(data) {
  return requst({
    url: `/meetingService/importThemen`,
    method: 'POST',
    data: deleteString(data)
  })
}

// 关闭触发审批流程
export function closeMeeting(data) {
  return requst({
    url: `/meetingService/closeMeeting`,
    method: 'POST',
    data: deleteString(data)
  })
}
