/* eslint-disable no-useless-escape */
import axios from "@/utils/axios.download";
import { callbackify } from "util";

const request = axios();

const createAnchorLink = (href, filename = "") => {
  const a = document.createElement("a");
  a.download = filename;
  a.href = href;
  document.body.appendChild(a);
  a.click();
  a.remove();
};

const exportFile = ({
  url,
  filename,
  callback,
  // type = "application/pdf",
  type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel",
  data,
}) => {
  request({
    url: url,
    method: "POST",
    responseType: "blob", // 响应类型必须设置
    getResponse: true,
    data,
  })
    .then((response) => {
      console.log("response", response);
      let blob = new Blob([response.data], { type });
      const blobUrl = window.URL.createObjectURL(blob);
      console.log("blobUrl", blobUrl);
      //获取响应中的filename
      const contentDisposition = response.headers["content-disposition"];
      console.log("contentDisposition", contentDisposition);
      const resFileName =
        contentDisposition &&
        decodeURI(contentDisposition.split("filename*=utf-8")?.[1]).replace("\'","").replace("\'","");
      console.log("resFileName", resFileName);
      const downloadFileName = decodeURIComponent(resFileName ?? filename);
      createAnchorLink(blobUrl, downloadFileName ?? filename);
      window.URL.revokeObjectURL(blobUrl);
      callback && callback(true);
    })
    .catch((err) => {
      console.log("err", err);
      callback && callback(false);
    });
};

export { exportFile };
