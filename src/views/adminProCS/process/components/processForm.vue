<template>
    <div v-loading="loading">
		<el-form 
			:model="form" 
			:rules="rules" 
			label-width="90px" 
			ref="form"
            :inline="type == 'edit'"
			class="validate-required-form process-form"
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
					type="date"
					v-model="form.updateDt"
					class="w-300"
					:placeholder="language('请选择')"
					/>
			</iFormItem>
			<iFormItem :label="language('流程专家')" prop='exports'>
				<el-select v-model="form.exports" class="w-300" filterable remote reserve-keyword :remote-method="queryUser" :loading="exports_loading" multiple placeholder="可进行搜索">
					<el-option v-for="user in userList" :key="user.id" :label="user.name" :value="user.id"></el-option>
				</el-select>
				
			</iFormItem>
			<iFormItem :label="language('关联机构')" prop='organizations'>
				<el-select v-model="form.organizations" class="w-300" remote reserve-keyword :remote-method="queryOrg" :loading="org_loading" filterable multiple placeholder="可进行搜索">
					<el-option v-for="org in orgList" :key="org.id" :label="org.name" :value="org.id"></el-option>
				</el-select>
			</iFormItem>
		</el-form>
		<div class="flex felx-row mt20 pb20 justify-end ">
			<iButton @click="reset" v-if="type == 'add'">{{ language('取消') }}</iButton>
			<iButton @click="$router.back()" v-else>{{ language('返回') }}</iButton>
			<iButton @click.native="save">{{ language('保存') }}</iButton>
		</div>
    </div>
</template>

<script>
import { iFormItem, iInput,iDatePicker, iButton } from 'rise';
import { getOrganizationList, getUsersList, addProcess,updateProcess, getProcess } from '@/api/adminProCS';
import moment from 'moment';
export default {
	components: {
		iFormItem,
		iInput,
		iDatePicker,
		iButton
	},
	props: {
		type: {
			type: String,
			default: 'add'
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
		let enName_valid = (rule, value, callback) => {
            if(!value){
				callback(new Error("请输入英文名"));
				return;
			}
			var reg = /^[a-zA-Z]+$/; //验证规则
			if (reg.test(value)) {
				callback();
				return;
			}else{
				callback(new Error("请输入英文名"));
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
				exports: [],
				organizations: []
			},
			rules: {
				name: [
					{ required:true,message:"请输入流程标题",trigger:'blur' },
                    {max:50,message:'流程标题长度不能超过50个字符！'},
				],
				firstLetter: { required:true, validator: firstLetter_valid,trigger:'blur' },
				nameEn: [
					{ required:true, enName_valid: enName_valid,trigger:'blur' },
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
			allOrgList:[],
			userList:[],
			loading:false,
			exports_loading:false,
			org_loading:false,
			onceGetUser:true
		}
	},
	created() {
		this.organizationList()
		this.queryUsersList()
	},
	
	methods: {
        async queryDetail(id){
            try {
                this.loading = true
                this.form = await getProcess(id)
				console.log(this.form, '233333')
				this.$set(this.form, "exports", this.form.experts ? this.form.experts.map(e => e.id) : [])
				this.$set(this.form, "organizations", this.form.organizations ? this.form.organizations.map(e => e.id) : [])
				return this.form
            } finally {
                this.loading = false
            }
        },
		queryUser(v){
			this.queryUsersList(v)
		},
		queryOrg(v){
			// if(this.type != "add"){
			// 	this.org_loading = true
			// 	this.orgList = this.allOrgList.filter(e => e.name.includes(v))
			// 	this.org_loading = false
			// }
			this.org_loading = true
			this.orgList = this.allOrgList.filter(e => e.name.includes(v))
			this.org_loading = false
		},
		save(){
			this.$refs.form.validate(async v => {
				if(v){
					// 保存
					try {
						this.loading = true
						this.form.updateDt = moment(this.form.updateDt).format("YYYY-MM-DD HH:mm:ss")
						// this.form.organizations = this.form.organizations.map(e => e + '')
						let formData = new FormData()
						Object.keys(this.form).forEach(key => {
							if (key === 'exports' || key === 'organizations') {
								this.form[key].forEach(e => {
									formData.append(key, e)
								})
							} else {
								formData.append(key, this.form[key])
							}
						})
						formData.append("type","WorkFlow")
                        if(this.type == "add"){
                            await addProcess(formData).then(res => {
                                if (res) {
                                    this.$message({type: 'success', message: '新增流程成功'})
                                    this.reset()
                                    this.$emit("refresh")
                                    this.$emit("close")
                                }
                            })
                        }else{
                            await updateProcess(this.form.id, formData)
                            this.$message({type: 'success', message: '保存成功'})
                        }
					} finally {
						this.loading = false	
					}
				}
			})
		},
		async organizationList() {
			this.allOrgList = await getOrganizationList()
			if(this.type == 'add'){
				this.orgList = this.allOrgList.splice(0,20)
			}else{
				this.orgList = this.allOrgList
			}
		},
		async queryUsersList(keyword) {
			let params = {
				keyword: keyword || ""
			}
			try {
				this.exports_loading = true
				let res = await getUsersList(params)
				console.log("usersList");
				if(this.type != "add" && this.onceGetUser){
					let uIds = res.map(e => e.id)
					let many = this.form.experts ? this.form.experts.filter(e => !uIds.includes(e.id)) : []
					this.userList = [...res, ...many]
					this.onceGetUser = false
				}else{
					this.userList = res
				}
			} finally {
				this.exports_loading = false
			}
		},
        reset(){
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
			this.$emit("close")
        }
	}
}
</script>

<style lang="scss" scoped>
@import '../../comon.scss';
.process-form {
    ::v-deep &.el-form--inline {
        .el-form-item{
            margin-right: 30px !important;
        }
    }

}


::v-deep .el-loading-mask{
	z-index: 2000;
}
</style>