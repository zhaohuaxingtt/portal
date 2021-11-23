import axios from "@/utils/axios";
const requst = axios(process.env.VUE_APP_SURVEY);
// const requstFile = axios(process.env.VUE_APP_FILE_SERVER);
import store from '@/store'
requst.interceptors.request.use(function (config) {
  config.params = {
    userId: store.state.permission.userInfo.id,
  }
  return config;
});

// 查询问卷数据
export function surveyReport(data) {
  return requst({
    url: `/surveyService/surveyReport`,
    method: "POST",
    data,
  });
}

//根据问题id和问卷id查询问题详细
export function questionReportDetail(data) {
    return requst({
      url: `/surveyService/questionReportDetail`,
      method: "POST",
      data,
    });
  }