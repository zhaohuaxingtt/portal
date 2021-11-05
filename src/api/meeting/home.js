import axios from "@/utils/axios";
import { deleteString } from '@/utils/utils'
const requst = axios();

// 获取会议列表
export function getMettingList(data) {
  return requst({
    url: `/rise-meeting/meetingService/findByPage`,
    method: "POST",
    data: deleteString(data),
  });
}

// 获取会议信息列表
export function getMyMettingList(data) {
  return requst({
    url: `/rise-meeting/meetingService/findMyMeetings`,
    method: "POST",
    data: deleteString(data),
  });
}

// 获取会议信息列表
export function findByMeetingAll(data) {
  return requst({
    url: `/rise-meeting/meetingTypeService/findByMeetingAll`,
    method: "POST",
    data: deleteString(data),
  });
}

// 删除会议
export function deleteMeeting(data) {
  return requst({
    url: `/rise-meeting/meetingService/batchDeleteMeeting`,
    method: "POST",
    data: deleteString(data),
  });
}
//撤回会议
export function batchRecallMeeting(data) {
  return requst({
    url: `/rise-meeting/meetingService/batchRecallMeeting`,
    method: "POST",
    data: deleteString(data),
  });
}
// 新增会议
export function addMeeting(data) {
  return requst({
    url: `/rise-meeting/meetingService/saveMeeting`,
    method: "POST",
    data: deleteString(data),
  });
}

// 修改会议
export function updateMeeting(data) {
  return requst({
    url: `/rise-meeting/meetingService/updateMeeting`,
    method: "POST",
    data: deleteString(data),
  });
}

// 修改会议状态
export function changeStateMeeting(data) {
  return requst({
    url: `/rise-meeting/meetingService/changeState`,
    method: "POST",
    data: deleteString(data),
  });
}

// 获取审批流程
export function getApprovalProcessList(data) {
  return requst({
    url: `/rise-mock/mockService/approval-processes`,
    method: "POST",
    data: deleteString(data),
  });
}

// 获取会议详情
export function getMeetingById(data) {
  return requst({
    url: `/rise-meeting/meetingService/findById`,
    method: "POST",
    data: deleteString(data),
  });
}

// 生成会议Agenda
export function generateAgenda(data) {
  return requst({
    url: `/rise-meeting/meetingService/generateAgenda`,
    method: "POST",
    data: deleteString(data),
  });
}

// 上传会议Agenda
export function uploadAttachment(data) {
  return requst({
    url: `/rise-meeting/meetingService/uploadAttachment`,
    method: "POST",
    data: deleteString(data),
  });
}

// 上传会议Agenda
export function getMeetingDetail(data) {
  return requst({
    url: `/rise-meeting/meetingService/findById`,
    method: "POST",
    data: deleteString(data),
  });
}

// 下载模版
export function downloadThemenImportTemplate(data) {
  return requst({
    url: `/rise-meeting/meetingService/downloadThemenImportTemplate`,
    method: "POST",
    data: deleteString(data),
  });
}

// 根据会议 id 获取会议纪要
export function getMeetingSummary(data) {
  return requst({
    url: `/rise-meeting/meetingService/getMeetingMinutes`,
    method: "POST",
    data: deleteString(data),
  });
}

// 保存会议纪要
export function saveMeetingMinutes(data) {
  return requst({
    url: `/rise-meeting/meetingService/saveMeetingMinutes`,
    method: "POST",
    data: deleteString(data),
  });
}

// 导入议题
export function importThemen(data) {
  return requst({
    url: `/rise-meeting/meetingService/importThemen`,
    method: "POST",
    data: deleteString(data),
  });
}

// 关闭触发审批流程
export function closeMeeting(data) {
  return requst({
    url: `/rise-meeting/meetingService/closeMeeting`,
    method: "POST",
    data: deleteString(data),
  });
}

