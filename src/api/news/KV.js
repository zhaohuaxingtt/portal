import axios from "@/utils/axios";
import { deleteString } from "@/utils/utils";
import store from '@/store'
const requst = axios(process.env.VUE_APP_NEWS);
requst.interceptors.request.use(function (config) {
  config.params = {
    userId: store.state.permission.userInfo.id,
  }
  return config;
});

// 分页查询KV图信息
export function findKVPage(data) {
  return requst({
    url: `/kvService/findKVPage`,
    method: "POST",
    data: deleteString(data),
  });
}

// 删除KV图
export function deleteKV(data) {
  return requst({
    url: `/kvService/deleteKV`,
    method: "POST",
    data: deleteString(data),
  });
}

// 修改KV图状态
export function updateKVStatus(data) {
  return requst({
    url: `/kvService/updateKVStatus`,
    method: "POST",
    data: deleteString(data),
  });
}

// 修改KV图顺序
export function moveKVPosition(data) {
  return requst({
    url: `/kvService/moveKVPosition`,
    method: "POST",
    data: deleteString(data),
  });
}

// 创建KV图
export function saveKV(data) {
  return requst({
    url: `/kvService/saveKV`,
    method: "POST",
    data: deleteString(data),
  });
}
