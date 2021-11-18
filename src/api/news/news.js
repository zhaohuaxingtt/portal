import axios from "@/utils/axios";
const requst = axios(process.env.VUE_APP_NEWS);
import store from '@/store'
requst.interceptors.request.use(function (config) {
  config.params = {
    userId: store.state.permission.userInfo.id,
  }
  return config;
});
//分页查询新闻信息
export function findNewsPage(data) {
  return requst({
    url: `/newsQueryService/findNewsPage`,
    method: "POST",
    data,
  });
}
//删除新闻
export function deleteNews(data) {
  return requst({
    url: `/newsService/deleteNews`,
    method: "POST",
    data,
  });
}
//根据 Id 查询新闻信息（管理系统）
export function findNewsById(data) {
  return requst({
    url: `/newsQueryService/findNewsById`,
    method: "POST",
    data,
  });
}
//询新闻发布范围
export function findNewsPublishRange(data) {
  return requst({
    url: `/newsQueryService/findNewsPublishRange`,
    method: "POST",
    data,
  });
}
//修改新闻状态
export function updateNewsStatus(data) {
  return requst({
    url: `/newsService/updateNewsStatus`,
    method: "POST",
    data,
  });
}
//管理界面根据 category 分类获取标签信息
export function findTagList(data) {
  return requst({
    url: `/tagService/findTagList`,
    method: "POST",
    data,
  });
}
//更新新闻
export function updateNews(data) {
  return requst({
    url: `/newsService/updateNews`,
    method: "POST",
    data,
  });
}
//新增新闻
export function saveNews(data) {
  return requst({
    url: `/newsService/saveNews`,
    method: "POST",
    data,
  });
}
//查询用户组信息
export function findGroupList(data) {
  return requst({
    url: `/groupService/findGroupList`,
    method: "POST",
    data,
  });
}
//查询模块管理员权限
export function findAdminPermission(data) {
  return requst({
    url: `/newsQueryService/findAdminPermission`,
    method: "POST",
    data,
  });
}

//分页查询标签信息
export function findTagPage(data) {
  return requst({
    url: `/tagService/findTagPage`,
    method: "POST",
    data,
  });
}

//创建标签
export function saveTag(data) {
  return requst({
    url: `/tagService/saveTag`,
    method: "POST",
    data,
  });
}

//删除标签
export function deleteTag(data) {
  return requst({
    url: `/tagService/deleteTag`,
    method: "POST",
    data,
  });
}


//分页查询专题新闻信息
export function findTopicPage(data) {
  return requst({
    url: `/topicService/findTopicPage`,
    method: "POST",
    data,
  });
}
//根据 Id 查询专题新闻信息
export function findTopicDetailById(data) {
  return requst({
    url: `/topicService/findTopicDetailById`,
    method: "POST",
    data,
  });
}
//修改专题新闻状态
export function updateTopicStatus(data) {
  return requst({
    url: `/topicService/updateTopicStatus`,
    method: "POST",
    data,
  });
}
//专题新闻 --  新闻列表
export function findTopicNewsPage(data) {
  return requst({
    url: `/newsQueryService/findTopicNewsPage`,
    method: "POST",
    data,
  });
}
//删除专题新闻
export function deleteTopic(data) {
  return requst({
    url: `/topicService/deleteTopic`,
    method: "POST",
    data,
  });
}
//新建专题新闻
export function saveTopic(data) {
  return requst({
    url: `/topicService/saveTopic`,
    method: "POST",
    data,
  });
}
//更新专题新闻
export function updateTopic(data) {
  return requst({
    url: `/topicService/updateTopic`,
    method: "POST",
    data,
  });
}

//添加新闻到该专题下
export function addTopicNews(data) {
  return requst({
    url: `/topicService/addTopicNews`,
    method: "POST",
    data,
  });
}

//根据 Id 查询新闻详情
export function findNewsDetails(data) {
  return requst({
    url: `/newsQueryService/findNewsDetails`,
    method: "POST",
    data,
  });
}

//将新闻从该专题下移除
export function removeTopicNews(data) {
  return requst({
    url: `/topicService/removeTopicNews`,
    method: "POST",
    data,
  });
}


//查询最新新闻列表
export function findLatestNews(data) {
  return requst({
    url: `/newsQueryService/findLatestNews`,
    method: "POST",
    data,
  });
}

//查询最热新闻列表
export function findHotNews(data) {
  return requst({
    url: `/newsQueryService/findHotNews`,
    method: "POST",
    data,
  });
}

//查询可能同样喜欢的新闻
export function findFondNews(data) {
  return requst({
    url: `/newsQueryService/findFondNews`,
    method: "POST",
    data,
  });
}

//获取模块管理员用户列表
export function findModuleAdminUserList(data) {
  return requst({
    url: `/moduleAdminService/findModuleAdminUserList`,
    method: "POST",
    data,
  });
}

//查询模块管理员名称信息
export function findModuleAdminName(data) {
  return requst({
    url: `/moduleAdminService/findModuleAdminName`,
    method: "POST",
    data,
  });
}

//查询模块管理员列表
export function findModuleAdminList(data) {
  return requst({
    url: `/moduleAdminService/findModuleAdminList`,
    method: "POST",
    data,
  });
}

//创建模块管理员
export function saveModuleAdmin(data) {
  return requst({
    url: `/moduleAdminService/saveModuleAdmin`,
    method: "POST",
    data,
  });
}

//获取员工信息
export function sapUserInfo(data) {
  return requst({
    // url: `/usercenterApi/usercenter/web/sapUser/pageList`,
    url: `/usercenterApi/usercenter/web/sapUser/pageList`,
    method: "POST",
    data,
  });
}

//分页查询用户组信息
export function findGroupPage(data) {
  return requst({
    url: `/groupService/findGroupPage`,
    method: "POST",
    data,
  });
}

//创建用户组
export function saveGroup(data) {
  return requst({
    url: `/groupService/saveGroup`,
    method: "POST",
    data,
  });
}

//更新用户组
export function updateGroup(data) {
  return requst({
    url: `/groupService/updateGroup`,
    method: "POST",
    data,
  });
}

//删除用户组
export function deleteGroup(data) {
  return requst({
    url: `/groupService/deleteGroup`,
    method: "POST",
    data,
  });
}

//根据 Id 查询用户组信息  
export function findGroupById(data) {
  return requst({
    url: `/groupService/findGroupById`,
    method: "POST",
    data,
  });
}


//查询KV图列表
export function findKVs(data) {
  return requst({
    url: `/newsQueryService/findKVs`,
    method: "POST",
    data,
  });
}

//根据新闻类型 category获取标签列表
export function findHallTagList(data) {
  return requst({
    url: `/newsQueryService/findTagList`,
    method: "POST",
    data,
  });
}

//查询新闻卡片列表,查询专题新闻卡片列表
export function findNewsCards(data) {
  return requst({
    url: `/newsQueryService/findNewsCards`,
    method: "POST",
    data,
  });
}

//获取最新发布新闻数量
export function getNewAmount(data) {
  return requst({
    url: `/newsQueryService/getNewAmount`,
    method: "POST",
    data,
  });
}

//新闻点赞接口，已点赞会取消点赞
export function likes(data) {
  return requst({
    url: `/newsService/likes`,
    method: "POST",
    data,
  });
}

//专题点赞接口，已点赞会取消点赞
export function topicLikes(data) {
  return requst({
    url: `/newsService/topicLikes`,
    method: "POST",
    data,
  });
}

//新闻大厅-查询新闻卡片列表
export function findNewsTopicCards(data) {
  return requst({
    url: `/newsQueryService/findNewsTopicCards`,
    method: "POST",
    data,
  });
}
//增加新闻阅读量（外部新闻链接）
export function increasePageViews(data) {
  return requst({
    url: `/newsQueryService/increasePageViews`,
    method: "POST",
    data,
  });
}

//问卷查询未完成数
export function total(data) {
  return requst({
    url: `/surveyService/total`,
    method: "POST",
    data,
  });
}
