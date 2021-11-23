import axios from "@/utils/axios";
const requst = axios(process.env.VUE_APP_NEWS);
import store from '@/store'
requst.interceptors.request.use(function (config) {
  config.params = {
    userId: store.state.permission.userInfo.id,
  }
  return config;
});
// 根据筛选条件查询公告
export function getNotice(data) {
  return requst({
    url: `/noticeService/getNotice`,
    method: "POST",
    data,
  });
}

// 删除公告
export function deleteNotice(data) {
  return requst({
    url: `/noticeService/deleteNotice`,
    method: "POST",
    data,
  });
}

// 保存公告
export function saveNotice(data) {
  return requst({
    url: `/noticeService/saveNotice`,
    method: "POST",
    data,
  });
}

// 更新公告
export function updateNotice(data) {
  return requst({
    url: `/noticeService/updateNotice`,
    method: "POST",
    data,
  });
}

// 根据id查询公告
export function getNoticeById(data) {
  return requst({
    url: `/noticeService/getNoticeById`,
    method: "POST",
    data,
  });
}

// 查询公告列表
export function getNoticeList(data) {
  return requst({
    url: `/noticeService/getNoticeList`,
    method: "POST",
    data,
  });
}

// 根据类型查询公告列表
export function getNoticeListByType(data) {
  return requst({
    url: `/noticeService/getNoticeListByType`,
    method: "POST",
    data,
  });
}

// 编辑公告
export function editNotice(data) {
  return requst({
    url: `/noticeService/editNotice`,
    method: "POST",
    data,
  });
}

// 根据发布范围
export function findNewsPublishRange(data) {
  return requst({
    url: `/newsQueryService/findNewsPublishRange`,
    method: "POST",
    data,
  });
}

// 获取当前登录用户公告模块的权限
export function getNoticeType(data) {
  return requst({
    url: `/noticeService/getNoticeType`,
    method: "POST",
    data,
  });
}

export function findGroupList(data) {
  return requst({
    url: `/groupService/findGroupList`,
    method: "POST",
    data,
  });
}

// 查询未读的公告总数
export function getUnReadNoticeAmount(data) {
  return requst({
    url: `/noticeService/getUnReadNoticeAmount`,
    method: "POST",
    data,
  });
}
