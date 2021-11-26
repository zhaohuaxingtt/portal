import axios from "@/utils/axios";
import store from '@/store'

const requstFile = axios(process.env.VUE_APP_FILEAPI)
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
		url: '/fileud/udMutilfiles',
		data,
		method: 'POST',
    timeout: 600000,
		...options
	}).then(async (res) => {
		return res[0]
	})
}