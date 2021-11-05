import axios from "@/utils/axios";
import { deleteString } from '@/utils/utils'
const requst = axios();

// 获取议题列表
export function findMyThemens(data) {
  return requst({
    url: `/rise-meeting/meetingService/findMyThemens`,
    method: "POST",
    data: deleteString(data),
  });
}

// 获取我的会议列表
export function findMyMeetings(data) {
  return requst({
    url: `/rise-meeting/meetingService/findMyMeetings`,
    method: "POST",
    data: deleteString(data),
  });
}

// 关注议题
export function follow(data) {
  return requst({
    url: `/rise-meeting/themenFollowService/follow`,
    method: "POST",
    data: deleteString(data),
  });
}
// 取消关注议题
export function unfollow(data) {
  return requst({
    url: `/rise-meeting/themenFollowService/unfollow`,
    method: "POST",
    data: deleteString(data),
  });
}

// 查询会议相关信息
export function findMeetingInfo(data) {
  return requst({
    url: `/rise-meeting/meetingService/findMeetingInfo`,
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