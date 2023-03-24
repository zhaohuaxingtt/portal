const requestDownload = axiosDownload()
import axiosDownload from '@/utils/axios.download'



// CF文件下载,自定义文件名
export function downloadFileWithName (params) {
    return requestDownload({
      url: `/fileApi/fileud/udDownWithName`,
      params,
      method: 'GET'
    })
  }