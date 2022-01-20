<template>
	<iDialog
		:title="dialogTitle"
		:visible.sync="show" 
		width="500px" 
		@close='closeDialogBtn' 
		append-to-body
	>
		<el-form 
			v-loading="loading"
			:model="form" 
			:rules="rules" 
			label-width="90px" 
			ref="form"
			class="validate-required-form"
		>
			<iFormItem :label="language('流程标题')" prop='name'>
				<iInput v-model="form.name" class="w-300" placeholder="请输入流程标题"></iInput>
			</iFormItem>
			<iFormItem :label="language('首字母')" prop='firstLetter'>
				<iInput v-model="form.firstLetter" class="w-300" placeholder="请输入标题首字母"></iInput>
			</iFormItem>
			<iFormItem :label="language('英文标题')" prop='nameEn'>
				<iInput v-model="form.nameEn" class="w-300" placeholder="请输入英文标题"></iInput>
			</iFormItem>
			<iFormItem :label="language('英文首字母')" prop='firstLetterEn'>
				<iInput v-model="form.firstLetterEn" class="w-300" placeholder="请输入英文标题首字母"></iInput>
			</iFormItem>
			<iFormItem :label="language('版本号')" prop='version'>
				<iInput v-model="form.version" class="w-300" placeholder="请输入版本号"></iInput>
			</iFormItem>
			
			<iFormItem :label="language('更新日期')" prop='updateDt'>
				<iDatePicker
					value-format="yyyy-MM-dd"
					type="date"
					v-model="form.updateDt"
					class="w-300"
					:placeholder="language('请选择')"
					/>
			</iFormItem>
			<iFormItem :label="language('流程专家')" prop='exports'>
				<iSelect v-model="form.exports" class="w-300" filterable multiple placeholder="可进行搜索">
					<el-option v-for="user in userList" :key="user.id" :label="user.name" :value="user.id"></el-option>
				</iSelect>
				
			</iFormItem>
			<iFormItem :label="language('关联机构')" prop='organizations'>
				<iSelect v-model="form.organizations" class="w-300" filterable multiple placeholder="可进行搜索">
					<el-option v-for="org in orgList" :key="org.id" :label="org.name" :value="org.id"></el-option>
				</iSelect>
			</iFormItem>
		</el-form>
		<div class="flex felx-row mt20 pb20 justify-end ">
			<iButton @click="closeDialogBtn">{{ language('取消') }}</iButton>
			<iButton @click.native="save">{{ language('保存') }}</iButton>
		</div>
	</iDialog>
</template>

<script>
import { iDialog, iFormItem, iInput,iDatePicker, iButton, iSelect } from 'rise';
// import ISelect from './../components/ISelect.vue';
import { getOrganizationList, getUsersList, addProcess,updateProcess } from '@/api/adminProCS';

export default {
	components: {
		iDialog,
		iFormItem,
		iInput,
		iDatePicker,
		iSelect,
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
	created() {
		this.organizationList()
		this.usersList()
	},
	methods: {
		closeDialogBtn () {
			this.form = {
				name: '',
				firstLetter:"",
				nameEn:"",
				firstLetterEn:"",
				version:"",
				updateDt:"",
				exports:"",
				organizations:""
			}
			this.$refs.form.resetFields()
			this.$emit('update:show', false)
			this.$emit('refresh')
		},
		save(){
			this.$refs.form.validate(async v => {
				if(v){
					// 保存
					try {
						this.loading = true
						let formData = new FormData()
						Object.keys(this.form).forEach(key => {
							formData.append(key, this.form[key])
						})
						await addProcess(formData).then(res => {
							if (res) {
								this.$message({type: 'success', message: '新增流程成功'})
							}
						})
						// this.$parent.query()
						this.closeDialogBtn()
					} finally {
						this.loading = false	
					}
				}
			})
		},
		async organizationList() {
			this.orgList = await getOrganizationList()
		},
		async usersList() {
			let params = {
				keyword: ''
			}
			this.userList = await getUsersList(params)
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