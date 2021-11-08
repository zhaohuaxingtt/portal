import {getDictByCode} from "@/api/dictionary";


const checkEmail = (rule, value, callback) => {
    const mailReg = /^([a-zA-Z0-9_-])+@([csvw])+(.[a-zA-Z0-9_-])+/
    setTimeout(() => {
      if (mailReg.test(value)) {
        callback()
      } else {
        callback(new Error('邮箱错误，例：xx@csvw.com'))
      }
	}, 100)
}

export const  baseRules= {
	nameZh: [
		{ required: true, message: '请输入供应商中文名', trigger: 'blur' },
		{ min: 1, max: 70, message: '长度在 1 到 70个字符', trigger: 'blur' }  
	],
	shortNameZh: [
		{ required: true, message: '请输入供应商简称(中)', trigger: 'blur' },
		{ min: 1, max: 10, message: '长度在 1 到 10个字符', trigger: 'blur' }
	],
	socialcreditNo: [
		{ required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
		{ min: 1, max: 18, message: '长度在 1 到 18个字符', trigger: 'blur' }
	],
	nameEn: [
		{ required: true, message: '请输入供应商英文名', trigger: 'blur' },
		{ min: 1, max: 70, message: '长度在 1 到 70个字符', trigger: 'blur' }
	],
	shortNameEn: [
		{ required: true, message: '请输入供应商简称(英)', trigger: 'blur' },
		{ min: 1, max: 20, message: '长度在 1 到 20个字符', trigger: 'blur' }
	]   			   
}

export const  purchaseRules= {
	purchaserEmail: [
		{ required: true, message: '请输入采购员邮箱', trigger: 'blur' },
		{ validator: checkEmail, trigger: 'blur' },
		{ min: 1, max: 50, message: '长度在 1 到 50个字符', trigger: 'blur' }
	],
	supplierType: [
		{ required: true, message: '请选择供应商类型', trigger: 'change' }
	]
}

// 数据字典查询
export const dictByCode=async function(key){
	let dicResult=[]
	let res=await getDictByCode(key)
	if (res.data) {
		res.data.filter(result=>{
			if (result.code=== key) {
				dicResult=result.subDictResultVo || []
			}
		})
		return dicResult
	}
}