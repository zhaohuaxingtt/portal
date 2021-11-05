import axios from '@/utils/axios';
const requst = axios();

// 查询所有会议联系人
export function getMeetingContact(data) {
  return requst({
    url: `/rise-meeting/meetingContactService/findAllMeetingContact`,
    method: 'POST',
    data,
  });
}

// 更新会议联系人
export function updateMeetingContact(data) {
  return requst({
    url: `/rise-meeting/meetingContactService/updateMeetingContact`,
    method: 'POST',
    data,
  });
}

// 创建会议联系人
export function saveMeetingContact(data) {
  return requst({
    url: `/rise-meeting/meetingContactService/saveMeetingContact`,
    method: 'POST',
    data,
  });
}

// 删除会议联系人
export function deleteMeetingContact(data) {
  return requst({
    url: `/rise-meeting/meetingContactService/deleteMeetingContact`,
    method: 'POST',
    data,
  });
}

// 会议资料管理分页查询
export function getDocumentServiceByPage(data) {
  return requst({
    url: `/rise-meeting/documentService/findByPage`,
    method: 'POST',
    data,
  });
}
// 会议资料管理id查询
export function getDocumentServiceById(data) {
  return requst({
    url: `/rise-meeting/documentService/findById`,
    method: 'POST',
    data,
  });
}
// 会议资料管理创建
export function saveDocument(data) {
  return requst({
    url: `/rise-meeting/documentService/saveDocument`,
    method: 'POST',
    data,
  });
}
// 会议资料管理更新
export function updateDocument(data) {
  return requst({
    url: `/rise-meeting/documentService/updateDocument`,
    method: 'POST',
    data,
  });
}
// 会议资料管理删除
export function deleteDocument(data) {
  return requst({
    url: `/rise-meeting/documentService/deleteDocument`,
    method: 'POST',
    data,
  });
}

// 会议类型管理分页查询
export function getDocumentTypeServiceByPage(data) {
  return requst({
    url: `/rise-meeting/documentTypeService/findByPage`,
    method: 'POST',
    data,
  });
}

// 会议类型管理id查询
export function getDocumentTypeServiceById(data) {
  return requst({
    url: `/rise-meeting/documentTypeService/findById`,
    method: 'POST',
    data,
  });
}
// 会议类型管理创建
export function saveDocumentType(data) {
  return requst({
    url: `/rise-meeting/documentTypeService/saveDocumentType`,
    method: 'POST',
    data,
  });
}
// 会议类型管理更新
export function updateDocumentType(data) {
  return requst({
    url: `/rise-meeting/documentTypeService/updateDocumentType`,
    method: 'POST',
    data,
  });
}
// 会议类型管理删除
export function deleteDocumentType(data) {
  return requst({
    url: `/rise-meeting/documentTypeService/deleteDocumentType`,
    method: 'POST',
    data,
  });
}

// 查询会议资料
export function findMeetingDocuments(data) {
  return requst({
    url: `/rise-meeting/documentTypeService/findMeetingDocuments`,
    method: 'POST',
    data,
  });
}
