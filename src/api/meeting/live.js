import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_MEETING)

//查询生产采购CSC会议
export function findFirstStartCSCMeeting(data) {
  return requst({
    url: `/meetingService/findFirstStartCSCMeeting`,
    method: 'POST',
    data
  })
}
//关注
export function follow(data) {
  return requst({
    url: `/themenFollowService/follow`,
    method: 'POST',
    data
  })
}

//根据会议id查询当前用户所关注的全部议题
export function queryByMeetingId(data) {
  return requst({
    url: `/themenFollowService/queryByMeetingId`,
    method: 'POST',
    data
  })
}

//取消关注
export function unfollow(data) {
  return requst({
    url: `/themenFollowService/unfollow`,
    method: 'POST',
    data
  })
}

//分页查询当前用户会议议题
export function findMyThemens(data) {
  return requst({
    url: `/meetingService/findMyThemens`,
    method: 'POST',
    data
  })
}

// 获取Commidty部门列表
export function queryDeptList(data) {
  return requst({
    url: `/meetingService/queryDeptList`,
    method: 'POST',
    data
  })
}
