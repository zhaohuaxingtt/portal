<<<<<<< HEAD
import axios from "@/utils/axios";
import { callbackify } from "util";
import { MOCK_FILE_URL } from "@/constants/index";

const request = axios();

const requestFile = axios(process.env.VUE_APP_FILE_SERVER);

const createAnchorLink = (href, filename = "") => {
  const a = document.createElement("a");
  a.download = filename;
  a.href = href;
  document.body.appendChild(a);
  a.click();
  a.remove();
};

const download = ({
  fileIds,
  filename,
  url,
  callback,
  type = "application/pdf",
  noFileUd = false,
}) => {
  if (process.env.NODE_ENV == "develop") {
    if (noFileUd) {
      request({
        url: url ? url : MOCK_FILE_URL + "?fileIds=" + fileIds,
        method: "get",
        responseType: "blob", // 响应类型必须设置
        getResponse: true,
      })
        .then((response) => {
          let blob = new Blob([response.data], { type });
          const blobUrl = window.URL.createObjectURL(blob);
          // 获取响应中的filename
          // const contentDisposition = response.headers.get('Content-Disposition');
          // const resFileName =
          //   contentDisposition &&
          //   decodeURI(contentDisposition.split('filename=')?.[1]);
          // const downloadFileName = decodeURIComponent(resFileName ?? filename);
          createAnchorLink(blobUrl, filename);
          window.URL.revokeObjectURL(blobUrl);
          callback && callback(true);
        })
        .catch((err) => {
          callback && callback(false);
        });
    } else {
      request({
        url: url ? url : MOCK_FILE_URL + "?fileIds=" + fileIds,
        method: "post",
        responseType: "blob", // 响应类型必须设置
        getResponse: true,
      })
        .then((response) => {
          let blob = new Blob([response.data], { type });
          const blobUrl = window.URL.createObjectURL(blob);
          // 获取响应中的filename
          // const contentDisposition = response.headers.get('Content-Disposition');
          // const resFileName =
          //   contentDisposition &&
          //   decodeURI(contentDisposition.split('filename=')?.[1]);
          // const downloadFileName = decodeURIComponent(resFileName ?? filename);
          createAnchorLink(blobUrl, filename);
          window.URL.revokeObjectURL(blobUrl);
          callback && callback(true);
        })
        .catch((err) => {
          callback && callback(false);
        });
    }
  } else {
    if (noFileUd) {
      request({
        url: url ? url : MOCK_FILE_URL + "?fileIds=" + fileIds,
        method: "get",
        responseType: "blob", // 响应类型必须设置
        getResponse: true,
      })
        .then((response) => {
          let blob = new Blob([response.data], { type });
          const blobUrl = window.URL.createObjectURL(blob);
          createAnchorLink(blobUrl, filename);
          window.URL.revokeObjectURL(blobUrl);
          callback && callback(true);
        })
        .catch((err) => {
          callback && callback(false);
        });
    } else {
      requestFile({
        url: url ? url : MOCK_FILE_URL + "?fileIds=" + fileIds,
        method: "post",
        responseType: "blob", // 响应类型必须设置
        getResponse: true,
      })
        .then((response) => {
          let blob = new Blob([response.data], { type });
          const blobUrl = window.URL.createObjectURL(blob);
          // 获取响应中的filename
          // const contentDisposition = response.headers.get('Content-Disposition');
          // const resFileName =
          //   contentDisposition &&
          //   decodeURI(contentDisposition.split('filename=')?.[1]);
          // const downloadFileName = decodeURIComponent(resFileName ?? filename);
          createAnchorLink(blobUrl, filename);
          window.URL.revokeObjectURL(blobUrl);
          callback && callback(true);
        })
        .catch((err) => {
          callback && callback(false);
        });
    }
  }
};

export { download };
=======
import axios from "@/utils/axios";
import { callbackify } from "util";
import { MOCK_FILE_URL } from "@/constants/index";

const request = axios();

const requestFile = axios(process.env.VUE_APP_FILE_SERVER);

const createAnchorLink = (href, filename = "") => {
  const a = document.createElement("a");
  a.download = filename;
  a.href = href;
  document.body.appendChild(a);
  a.click();
  a.remove();
};

const download = ({
  fileIds,
  filename,
  url,
  callback,
  type = "application/pdf",
  noFileUd = false,
}) => {
  if (process.env.NODE_ENV == "develop") {
    if (noFileUd) {
      request({
        url: url ? url : MOCK_FILE_URL + "?fileIds=" + fileIds,
        method: "get",
        responseType: "blob", // 响应类型必须设置
        getResponse: true,
      })
        .then((response) => {
          let blob = new Blob([response.data], { type });
          const blobUrl = window.URL.createObjectURL(blob);
          // 获取响应中的filename
          // const contentDisposition = response.headers.get('Content-Disposition');
          // const resFileName =
          //   contentDisposition &&
          //   decodeURI(contentDisposition.split('filename=')?.[1]);
          // const downloadFileName = decodeURIComponent(resFileName ?? filename);
          createAnchorLink(blobUrl, filename);
          window.URL.revokeObjectURL(blobUrl);
          callback && callback(true);
        })
        .catch((err) => {
          callback && callback(false);
        });
    } else {
      request({
        url: url ? url : MOCK_FILE_URL + "?fileIds=" + fileIds,
        method: "post",
        responseType: "blob", // 响应类型必须设置
        getResponse: true,
      })
        .then((response) => {
          let blob = new Blob([response.data], { type });
          const blobUrl = window.URL.createObjectURL(blob);
          // 获取响应中的filename
          // const contentDisposition = response.headers.get('Content-Disposition');
          // const resFileName =
          //   contentDisposition &&
          //   decodeURI(contentDisposition.split('filename=')?.[1]);
          // const downloadFileName = decodeURIComponent(resFileName ?? filename);
          createAnchorLink(blobUrl, filename);
          window.URL.revokeObjectURL(blobUrl);
          callback && callback(true);
        })
        .catch((err) => {
          callback && callback(false);
        });
    }
  } else {
    if (noFileUd) {
      request({
        url: url ? url : MOCK_FILE_URL + "?fileIds=" + fileIds,
        method: "get",
        responseType: "blob", // 响应类型必须设置
        getResponse: true,
      })
        .then((response) => {
          let blob = new Blob([response.data], { type });
          const blobUrl = window.URL.createObjectURL(blob);
          createAnchorLink(blobUrl, filename);
          window.URL.revokeObjectURL(blobUrl);
          callback && callback(true);
        })
        .catch((err) => {
          callback && callback(false);
        });
    } else {
      requestFile({
        url: url ? url : MOCK_FILE_URL + "?fileIds=" + fileIds,
        method: "post",
        responseType: "blob", // 响应类型必须设置
        getResponse: true,
      })
        .then((response) => {
          let blob = new Blob([response.data], { type });
          const blobUrl = window.URL.createObjectURL(blob);
          // 获取响应中的filename
          // const contentDisposition = response.headers.get('Content-Disposition');
          // const resFileName =
          //   contentDisposition &&
          //   decodeURI(contentDisposition.split('filename=')?.[1]);
          // const downloadFileName = decodeURIComponent(resFileName ?? filename);
          createAnchorLink(blobUrl, filename);
          window.URL.revokeObjectURL(blobUrl);
          callback && callback(true);
        })
        .catch((err) => {
          callback && callback(false);
        });
    }
  }
};

export { download };
>>>>>>> 02245dc9149cc4d18820df0e72ba69fdaa9b2bdb
