<template>
	<iDialog
		:title="dialogTitle"
		:visible.sync="show" 
		width="500px" 
		@close='closeDialogBtn' 
		append-to-body
	>
		<ProcessForm ref="form" type="add"></ProcessForm>
	</iDialog>
</template>

<script>
import { iDialog } from 'rise';
import ProcessForm from './components/processForm.vue';

export default {
	components: {
		iDialog,
		ProcessForm
	},
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	data() {
		let firstLetter_valid = (rule, value, callback) =>{
			if(!value){
				callback(new Error("请输入标题首字母"));
				return;
			}
			if(value.length > 1) return callback(new Error("只能填写一个字母"));
			var reg = /^[A-Z]+$/; //验证规则
			if (reg.test(value)) {
				callback();
				return;
			}else{
				callback(new Error("请输入大写字母"));
			}
		}
		
		return {
			visible: false,
			form: {
				name: '',
				firstLetter:"",
				nameEn:"",
				firstLetterEn:"",
				version:"",
				updateDt:"",
				exports:"",
				organizations:""
			},
			rules: {
				name: [
					{ required:true,message:"请输入流程标题",trigger:'blur' },
                    {max:50,message:'流程标题长度不能超过50个字符！'},
				],
				firstLetter: { required:true, validator: firstLetter_valid,trigger:'blur' },
				nameEn: [
					{ required:true,message:"请输入英文标题",trigger:'blur' },
                    {max:100,message:'英文标题长度不能超过100个字符！'},
				],
				firstLetterEn: {required:true, validator: firstLetter_valid,trigger:'blur' },
				version:[
					{ required:true, message:"请输入版本号",trigger:'blur' },
					{ max: 20, message: '版本号长度不能超过20个字符！', trigger: 'blur' }
				],
				updateDt: { required:true,message:"请选择更新时间",trigger:'change' },
				exports: { required:true,message:"请输入用户名、邮箱进行搜索",trigger:'blur' },
				organizations: { required:true,message:"请至少输入2个字符进行搜索",trigger:'blur' },
			},
			orgList:[],
			userList:[],
			loading:false
		}
	},
	methods: {
		closeDialogBtn () {
			this.$refs.form.reset()
			this.$emit('update:show', false)
		},
		refresh(){
			this.$emit('refresh')
		}
	},
	computed: {
		dialogTitle() {
			return this.operateType === 'add' ? '添加流程' : '修改流程'
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../comon.scss';
.typeForm {
	padding-bottom: 20px;
}


::v-deep .el-loading-mask{
	z-index: 2000;
}
</style>