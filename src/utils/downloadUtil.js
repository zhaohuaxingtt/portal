import axios from "@/utils/axios";
// import { callbackify } from "util";
import { word2Pdf } from "@/api/terms/terms";
// const request = axios(process.env.VUE_APP_FILE_SERVER);
const request = axios(process.env.VUE_APP_FILEAPI + "/fileud");

const createAnchorLink = (href, filename = '') => {
  // console.log('href', href)
  const a = document.createElement('a')
  a.download = filename
  a.href = href
  document.body.appendChild(a)
  a.click()
  a.remove()
}

const download = ({
                      fileIds,
                      filename,
                      url,
                      callback,
                      type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                      noFileUd = false
                  }) => {
    createAnchorLink(process.env.VUE_APP_FILEAPI + '/fileud/getFileByFileId?isDown=true&fileId=' + fileIds, filename);
}

const downloadZip = ({ fileIds }) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", process.env.VUE_APP_FILEAPI + `/fileud/udDown?fileIds=${fileIds}`, true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhr.responseType = "blob";
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const response = xhr.response;
      const contentDisposition = xhr.getResponseHeader("content-disposition");
      const filename = contentDisposition.split("=")[1];
      const elink = document.createElement("a");
      const blob = response;
      const url = window.URL.createObjectURL(blob);
      elink.download = filename;
      elink.style.display = "none";
      elink.href = url;
      elink.click();
      document.body.removeChild(elink);
      window.URL.revokeObjectURL(url);
    }
  };
  xhr.send();
};

const preview = ({ id, callback }) => {
  request({
    url: "/udDown?fileIds=" + id,
    method: "GET",
    responseType: "blob", // 响应类型必须设置
  }).then((response) => {
    let formData = new FormData();
    formData.append("file", response);
    // 测试查看word文档正确
    // let blob1 = new Blob([response.data], { type });
    // const blobUrl1 = window.URL.createObjectURL(blob1);
    // createAnchorLink(blobUrl1, 'word文件下载.docx');
    // window.URL.revokeObjectURL(blobUrl1);
    word2Pdf(formData).then((res) => {
      let blob = new Blob([res], {
        type: "application/pdf",
      });
      let blobUrl = window.URL.createObjectURL(blob);
      callback && callback(blobUrl);
      // createAnchorLink(blobUrl, 'pdf下载');
    });
  });
};

export { download, createAnchorLink, downloadZip, preview }
