import axios from "@/utils/axios";
import store from '@/store'

const requstFile = axios(process.env.VUE_APP_FILEAPI+ '/fileud')
requstFile.interceptors.request.use(function (config) {
  config.params = {
    userId: store.state.permission.userInfo.id,
  }
  return config;
});

const appName = "userAssistant"

// 上传文件
export function uploadFile(data, options) {
	data.append('multifile', data.get('file'))
	data.append('applicationName', appName)
	data.append('businessId', 8059)
	data.append(
    'currentUser',
    store.state.permission?.userInfo?.nameZh || 'admin'
  )
	data.append('type', 1)
  data.delete('file')
	return requstFile({
		url: '/udMutilfiles',
		data,
		method: 'POST',
    timeout: 600000,
		...options
	}).then(async (res) => {
		if(res.code == 200){
			return res.data[0]
		}
	})
}

//通过文件 ID 下载文件, 返回字节流
export function getFileId(fileId) {
	return requstFile({
		url: `/udDown?fileIds=${fileId}`,
		method: 'GET',
		responseType: 'blob'
	})
}
