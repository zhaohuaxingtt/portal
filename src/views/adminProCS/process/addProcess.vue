<template>
	<iDialog
		:title="dialogTitle"
		:visible.sync="show" 
		width="60%" 
		@close='closeDialogBtn' 
		append-to-body
	>
		<el-form 
			label-position="left" 
			:model="form" 
			:rules="rules" 
			label-width="100px" 
			class="typeForm"
		>
			<iFormItem :label="language('流程标题')" prop='name'>
				<iInput v-model="form.name" placeholder="请输入流程标题"></iInput>
			</iFormItem>
			<iFormItem :label="language('首字母')" prop='firstLetter'>
				<iInput v-model="form.firstLetter" placeholder="请输入标题首字母"></iInput>
			</iFormItem>
			<iFormItem :label="language('英文标题')" prop='nameEn'>
				<iInput v-model="form.nameEn" placeholder="请输入英文标题"></iInput>
			</iFormItem>
			<iFormItem :label="language('英文首字母')" prop='firstLetterEn'>
				<iInput v-model="form.firstLetterEn" placeholder="请输入版本号"></iInput>
			</iFormItem>
			<iFormItem :label="language('版本号')" prop='version'>
				<iInput v-model="form.version" placeholder="请输入英文标题首字母"></iInput>
			</iFormItem>
			
			<iFormItem :label="language('更新日期')" prop='updateDt'>
				<iDatePicker
					value-format="yyyy-MM-dd"
					type="date"
					v-model="form.updateDt"
					:placeholder="language('请选择')"
					/>
			</iFormItem>
			<iFormItem :label="language('流程专家')" prop='exports'>
				<ISelect v-model="form.exports" placeholder="请输入用户名、邮箱进行搜索"></ISelect>
			</iFormItem>
			<iFormItem :label="language('关联机构')" prop='organizations'>
				<ISelect v-model="form.organizations" placeholder="请至少输入2个字符进行搜索"></ISelect>
			</iFormItem>
		</el-form>
		<div class="flex felx-row mt20 justify-end ">
			<iButton @click="closeDialogBtn">{{ language('取消') }}</iButton>
			<iButton @click.native="save">{{ language('保存') }}</iButton>
		</div>
	</iDialog>
</template>

<script>
import { iDialog, iFormItem, iInput,iDatePicker, iButton } from 'rise'
import ISelect from './../components/ISelect.vue';

export default {
	components: {
		iDialog,
		iFormItem,
		iInput,
		iDatePicker,
		ISelect,
		iButton
	},
	props: {
		operateType: {
			type: String,
			default: 'add'
		},
		show: {
			type: Boolean,
			default: false
		}
	},
	data() {
		let firstLetter_valid = (rule, value, callback) =>{
			if(!value){
				callback(new Error("请输入标题"));
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
				firstLetter: { required:true, validator: firstLetter_valid, message:"请输入标题首字母",trigger:'blur' },
				nameEn: [
					{ required:true,message:"请输入英文标题",trigger:'blur' },
                    {max:100,message:'英文标题长度不能超过100个字符！'},
				],
				firstLetterEn: { required:true, validator: firstLetter_valid, message:"请输入英文标题首字母",trigger:'blur' },
				version:[
					{ required:true, message:"请输入版本号",trigger:'blur' },
					{ max: 20, message: '版本号长度不能超过20个字符！', trigger: 'blur' }
				],
				updateDt: { required:true,message:"请选择更新时间",trigger:'change' },
				exports: { required:true,message:"请输入用户名、邮箱进行搜索",trigger:'change' },
				organizations: { required:true,message:"请至少输入2个字符进行搜索",trigger:'change' },
			},
		}
	},
	methods: {
		
		closeDialogBtn () {
			this.$emit('update:show', false)
		},
		save(){

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
.right-content {
	
}
</style>