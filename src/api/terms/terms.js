import axios from '@/utils/axios'
import store from '@/store'
const requst = axios(process.env.VUE_APP_NEWS)
const requstInvalidate = axios(process.env.VUE_APP_NEWS)
const requstDIC = axios(process.env.VUE_APP_BASE_INFO)
const requstUser = axios(process.env.VUE_APP_USER_CENTER)

requst.interceptors.request.use(function (config) {
  config.params = {
    userId: store.state.permission.userInfo.id,
  }
  return config;
});
requstDIC.interceptors.request.use(function (config) {
  config.params = {
    userId: store.state.permission.userInfo.id,
  }
  return config;
});
requstUser.interceptors.request.use(function (config) {
  config.params = {
    userId: store.state.permission.userInfo.id,
  }
  return config;
});

// 分页查询标准条款信息
export function findByPage(data) {
  return requst({
    url: `/termsQueryService/findByPage`,
    method: "POST",
    data,
  });
}

// 根据 Id 查询标准条款信息
export function findById(data) {
  return requst({
    url: `/termsQueryService/findById`,
    method: "POST",
    data,
  });
}

// 根据 Id 删除附件
export function deleteAttachment(data) {
  return requst({
    url: `/termsService/deleteAttachment`,
    method: "POST",
    params: data,
  });
}

// 根据条款 ID 上传附件
export function saveAttachment(data) {
  return requst({
    url: `/termsService/saveAttachment`,
    method: "POST",
    data,
  });
}

// 根据 Id 使条款失效
export function invalidateTerms(data) {
  return requstInvalidate({
    url: `/termsService/invalidateTerms`,
    method: "POST",
    params: {...data,userId: store.state.permission.userInfo.id},
  });
}

// 获取条款签署情况
export function getSignatureResult(data) {
  return requst({
    url: `/termsQueryService/getSignatureResult`,
    method: "POST",
    data,
  });
}

// 导出条款签署情况
export function exportSignatureResult(data) {
  return requst({
    url: `/termsQueryService/exportSignatureResult`,
    method: "POST",
    data,
  });
}

// 标记例外
export function markExclude(data) {
  return requst({
    url: `/termsService/markExclude`,
    method: "POST",
    data,
  });
}

// 获取非标附件
export function getUnStandard(data) {
  return requst({
    url: `/termsQueryService/getUnStandard`,
    method: "POST",
    data,
  });
}

// 创建标准条款
export function saveTerms(data) {
  return requst({
    url: `/termsService/saveTerms`,
    method: "POST",
    data,
  });
}

// 更新标准条款
export function updateTerms(data) {
  return requst({
    url: `/termsService/updateTerms`,
    method: "POST",
    data,
  });
}

// 更新有效条款
export function updateEffectiveTerms(data) {
  return requst({
    url: `/termsService/updateEffectiveTerms`,
    method: "POST",
    data,
  });
}

// 发布标准条款
export function releaseTerms(data) {
  return requst({
    url: `/termsService/releaseTerms`,
    method: "POST",
    data,
  });
}

// 根据 Id 删除条款
export function deleteTerms(data) {
  return requst({
    url: `/termsService/deleteTerms`,
    method: "POST",
    data,
  });
}

// 分页查询当前供应商所属条款信息
export function findCurrentPage(data) {
  return requst({
    url: `/termsQueryService/findCurrentPage`,
    method: "POST",
    data,
  });
}

// 分页查询供应商列表
export function findSupplierPage(data) {
  return requst({
    url: `/supplierService/findByPage`,
    method: "POST",
    data,
  });
}

// 预览pdf
export function word2Pdf(data) {
  return requst({
    url: `/termsService/word2Pdf`,
    method: 'POST',
    responseType: "blob",
    data
  })
}

//城市信息查询
export function getCityInfo(params) {
  return requstDIC({
    url: `/web/cityInfo`,
    method: "GET",
    params,
  });
}

export const getCity = async () => {
  let areaList = [];
  let res = await getCityInfo();
  // 筛选国家
  res.data.map((item) => {
    if (item.locationType === "Nation") {
      areaList.push({
        value: item.cityId,
        label: item.cityNameCn,
        cityId: item.cityId,
        children: [],
      });
    }
  });
  // 筛选省
  res.data.forEach((item) => {
    areaList.forEach((val, index) => {
      if (
        item.locationType === "Province" &&
        item.parentCityId === val.cityId
      ) {
        areaList[index].children.push({
          value: item.cityId,
          label: item.cityNameCn,
          cityId: item.cityId,
          parentCityId: item.parentCityId,
          children: [],
        });
      }
    });
  });
  // 筛选市
  res.data.forEach((item) => {
    areaList.forEach((val, j) => {
      val.children.forEach((i, index) => {
        if (item.locationType === "City" && item.parentCityId === i.cityId) {
          areaList[j].children[index].children.push({
            value: item.cityId,
            label: item.cityNameCn,
            cityId: item.cityId,
            parentCityId: item.parentCityId,
          });
        }
      });
    });
  });
  // 删除空数组
  areaList.map((item) => {
    if (item.children.length) {
      item.children.map((val) => {
        if (item.children.length === 0) {
          delete val.children;
        }
      });
    } else {
      delete item.children;
    }
  });
  areaList.reverse();
  areaList.map((item) => {
    return item.children && item.children.reverse();
  });
  return areaList;
};

// 通过id查询收件人
export function getPageListByParam(data) {
  return requstUser({
    url: `/api/sapUser/getPageListByParam`,
    method: 'POST',
    data
  })
}
