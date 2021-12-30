import axios from "@/utils/axios";
const requst = axios();

// 获取rfqCode
export function getRfqCodesList(data) {
  return requst({
    url: `/rise-mock/mockService/getRfqCodes`,
    method: "POST",
    data,
  });
}

//获取车型
export function getModels(data) {
  return requst({
    url: `/rise-mock/mockService/getModels`,
    method: "POST",
    data,
  });
}

//获取车型项目
export function getProjects(data) {
  return requst({
    url: `/rise-mock/mockService/getProjects`,
    method: "POST",
    data,
  });
}

// 获取供应商信息
export function getSupplierInfo(data) {
  return requst({
    url: `/rise-mock/mockService/getSupplierInfo`,
    method: "POST",
    data,
  });
}

// 获取供应商层级
export function getSuppliers(data) {
  return requst({
    url: `/rise-mock/mockService/getSuppliers`,
    method: "POST",
    data,
  });
}

//下载文件
export function downloadFile(fileId) {
  return `/rise-mock/mockService/files/download/${fileId}`;
}

// 上传文件
export function uploadFile(data) {
  return requst({
    url: `/rise-mock/mockService/files/upload-file`,
    method: "POST",
    data,
  });
}

//通过文件 ID 下载文件, 返回字节流
export function getFileId(fileId) {
  return requst({
    url: `/rise-mock/mockService/files/download/${fileId}`,
    method: "GET",
    responseType: "blob",
  });
}
