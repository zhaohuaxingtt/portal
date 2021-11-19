import axios from "@/utils/axios";
const requst = axios(process.env.VUE_APP_USER_CENTER);
import store from '@/store'
requst.interceptors.request.use(function (config) {
  config.params = {
    userId: store.state.permission.userInfo.id,
  }
  return config;
});

//根据条件分页查询账号 1员工  2供应商
export function pageList(data) {
    return requst({
      url: `/api/account/pageList`,
      method: "POST",
      data,
    });
  }
