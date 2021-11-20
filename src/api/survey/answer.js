import axios from "@/utils/axios";
const requst = axios(process.env.VUE_APP_SURVEY);
import store from '@/store'
requst.interceptors.request.use(function (config) {
  config.params = {
    userId: store.state.permission.userInfo.id,
  }
  return config;
});

// 通过 ID 查询survey信息
export function listUserSurvey(data) {
  return requst({
    url: `/surveyService/listUserSurvey`,
    method: "POST",
    data,
  });
}

// 通过 ID 查询survey信息,用来答题
export function queryForAnswer(data) {
  return requst({
    url: `/surveyService/queryForAnswer`,
    method: "POST",
    data,
  });
}

// 查询答题者未完成问卷
export function total(data) {
  return requst({
    url: `/surveyService/total`,
    method: "POST",
    data,
  });
}
