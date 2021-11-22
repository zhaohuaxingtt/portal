import axios from "@/utils/axios";
const requst = axios(process.env.VUE_APP_SURVEY);
const requstNews = axios(process.env.VUE_APP_NEWS);
// const requstFile = axios(process.env.VUE_APP_FILE_SERVER);
import store from '@/store'
requst.interceptors.request.use(function (config) {
  config.params = {
    userId: store.state.permission.userInfo.id,
  }
  return config;
});
requstNews.interceptors.request.use(function (config) {
  config.params = {
    userId: store.state.permission.userInfo.id,
  }
  return config;
});


// 查询模块管理员权限
export function findAdminPermission(data) {
  return requstNews({
    url: `/newsQueryService/findAdminPermission`,
    method: "POST",
    data,
  });
}

// 查询用户组信息
export function findGroupList(data) {
  return requstNews({
    url: `/groupService/findGroupList`,
    method: "POST",
    data,
  });
}

// 查询未读的公告总数
export function getUnReadNoticeAmount(data) {
  return requstNews({
    url: `/noticeService/getUnReadNoticeAmount`,
    method: "POST",
    data,
  });
}

// 获取最新发布新闻数量
export function getNewAmount(data) {
  return requstNews({
    url: `/newsQueryService/getNewAmount`,
    method: "POST",
    data,
  });
}


// 分页查询问卷
export function findPage(data) {
  return requst({
    url: `/surveyService/findPage`,
    method: "POST",
    data,
  });
}

// 删除问卷
export function deleteSurvey(data) {
  return requst({
    url: `/surveyService/deleteSurvey`,
    method: "POST",
    data,
  });
}

// 发布问卷
export function publishSurvey(data) {
  return requst({
    url: `/surveyService/publishSurvey`,
    method: "POST",
    data,
  });
}
export function updateSurvey(data) {
  return requst({
    url: `/surveyService/updateSurvey`,
    method: "POST",
    data,
  });
}

// 复制问卷
export function copySurvey(data) {
  return requst({
    url: `/surveyService/copySurvey`,
    method: "POST",
    data,
  });
}

// 创建问卷
export function saveSurvey(data) {
  return requst({
    url: `/surveyService/saveSurvey`,
    method: "POST",
    data,
  });
}

// 通过 ID 查询survey信息
export function findById(data) {
  return requst({
    url: `/surveyService/findById`,
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

// 保存答案
export function saveAnswer(data) {
  return requst({
    url: `/surveyService/saveAnswer`,
    method: "POST",
    data,
  });
}

// 查询投放范围
export function findPutoutRange(data) {
  return requst({
    url: `/surveyService/findPutoutRange`,
    method: "POST",
    data,
  });
}