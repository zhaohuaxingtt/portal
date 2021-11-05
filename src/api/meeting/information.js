import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_MEETING)

// 查询所有会议联系人
export function getMeetingContact(data) {
  return requst({
    url: `/meetingContactService/findAllMeetingContact`,
    method: 'POST',
    data
  })
}

// 更新会议联系人
export function updateMeetingContact(data) {
  return requst({
    url: `/meetingContactService/updateMeetingContact`,
    method: 'POST',
    data
  })
}

// 创建会议联系人
export function saveMeetingContact(data) {
  return requst({
    url: `/meetingContactService/saveMeetingContact`,
    method: 'POST',
    data
  })
}

// 删除会议联系人
export function deleteMeetingContact(data) {
  return requst({
    url: `/meetingContactService/deleteMeetingContact`,
    method: 'POST',
    data
  })
}

// 会议资料管理分页查询
export function getDocumentServiceByPage(data) {
  return requst({
    url: `/documentService/findByPage`,
    method: 'POST',
    data
  })
}
// 会议资料管理id查询
export function getDocumentServiceById(data) {
  return requst({
    url: `/documentService/findById`,
    method: 'POST',
    data
  })
}
// 会议资料管理创建
export function saveDocument(data) {
  return requst({
    url: `/documentService/saveDocument`,
    method: 'POST',
    data
  })
}
// 会议资料管理更新
export function updateDocument(data) {
  return requst({
    url: `/documentService/updateDocument`,
    method: 'POST',
    data
  })
}
// 会议资料管理删除
export function deleteDocument(data) {
  return requst({
    url: `/documentService/deleteDocument`,
    method: 'POST',
    data
  })
}

// 会议类型管理分页查询
export function getDocumentTypeServiceByPage(data) {
  return requst({
    url: `/documentTypeService/findByPage`,
    method: 'POST',
    data
  })
}

// 会议类型管理id查询
export function getDocumentTypeServiceById(data) {
  return requst({
    url: `/documentTypeService/findById`,
    method: 'POST',
    data
  })
}
// 会议类型管理创建
export function saveDocumentType(data) {
  return requst({
    url: `/documentTypeService/saveDocumentType`,
    method: 'POST',
    data
  })
}
// 会议类型管理更新
export function updateDocumentType(data) {
  return requst({
    url: `/documentTypeService/updateDocumentType`,
    method: 'POST',
    data
  })
}
// 会议类型管理删除
export function deleteDocumentType(data) {
  return requst({
    url: `/documentTypeService/deleteDocumentType`,
    method: 'POST',
    data
  })
}

// 查询会议资料
export function findMeetingDocuments(data) {
  return requst({
    url: `/documentTypeService/findMeetingDocuments`,
    method: 'POST',
    data
  })
}
