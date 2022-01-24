<template>
    <iDialog
        :title="dialogTitle"
        :visible.sync="show" 
		v-if="show"
		width="70%" 
		@close='closeDialogBtn' 
		append-to-body
    >
        <el-form 
            :model="form"
            :rules="rules"
            ref="typeForm"
            :inline="true" 
            label-width="100px"
            v-loading="loading"
            class="validate-required-form"
        >
            <div class="base-info">
                <div style="width: 70%">
                    <div>
                        <iFormItem :label="language('报告类型')" prop='name'>
                            <iInput v-model="form.name" placeholder="请输入" clearable maxLength="50"></iInput>
                        </iFormItem>
                        <iFormItem :label="language('部门信息')" prop='organization'>
                            <iInput v-model="form.organization" placeholder="请输入" clearable maxLength="100"></iInput>
                        </iFormItem>
                    </div>
                    <div>
                        <iFormItem :label="language('location')" prop='location'>
                            <iInput v-model="form.location" placeholder="请输入" clearable maxLength="100"></iInput>
                        </iFormItem>
                        <iFormItem :label="language('英文名')" prop='enName'>
                            <iInput v-model="form.enName" placeholder="请输入" clearable maxLength="50"></iInput>
                        </iFormItem>
                    </div>
                    <div>
                        <iFormItem :label="language('Telefone')" prop='telefone'>
                            <iInput v-model="form.telefone" placeholder="请输入" clearable maxLength="30"></iInput>
                        </iFormItem>
                    </div>
                </div>
                <div style="width: 30%">
                    <div>
                        <div>封面图片</div>
                        <ImgCutter
                            class="avatar-uploader"
                            fileType=".jpg, .jpeg, .png"
                            :rate = 'imgCutterRate'
                            @cutDown='upload'
                        >
                            <div slot="open">
                                <img v-if="imageUrl" :src="imageUrl" @error="handleImageError" class="avatar" />
                                <i v-else class="el-icon-circle-plus-outline avatar-uploader-icon">
                                </i>
                            </div>
                        </ImgCutter>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <iFormItem :label="language('管理员')" prop='adminUsers'>
                        <iSelect
                            v-model="form.adminUsers"
                            filterable
                            placeholder="请选择"
                            clearable
                            multiple
                        >
                            <el-option
                                v-for="item in adminList"
                                :key="item.userId"
                                :label="item.nameZh"
                                :value="item.userId"
                            >
                            </el-option>
                        </iSelect>
                    </iFormItem>
                    <iFormItem :label="language('报表可见组织')" prop='organizations'>
                        <iSelect
                            v-model="form.organizations"
                            filterable
                            placeholder="请选择"
                            clearable
                            multiple
                        >
                            <el-option
                                v-for="item in organizationList"
                                :key="item.id"
                                :label="item.nameZh"
                                :value="item.id"
                            >
                            </el-option>
                        </iSelect>
                    </iFormItem>
                </div>
                <div>
                    <iFormItem :label="language('报表可见人员')" prop='canUsers'>
                        <iSelect
                            v-model="form.canUsers"
                            filterable
                            placeholder="请选择"
                            clearable
                            @change="handlePerson"
                            multiple
                        >
                            <el-option
                                v-for="item in usersList"
                                :key="item.userId"
                                :label="item.nameZh"
                                :value="item.userId"
                            >
                            </el-option>
                        </iSelect>
                    </iFormItem>
                </div>
                <div v-if="customFlag">
                    <iFormItem :label="language('选择人员')">
                        <userSelector v-model="form.users" @change="userListChange" />
                    </iFormItem>
                    <iFormItem :label="language('选择供应商')">
                        <supplierSelect v-model="form.suppliers" @change="supplierListChange" />
                    </iFormItem>
                </div>
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <iButton @click="save">保存</iButton>
            <iButton @click="closeDialogBtn">取消</iButton>
        </span>
    </iDialog>
</template>

<script>
import { iDialog, iFormItem, iInput, iSelect, iButton } from 'rise'
import ImgCutter from 'vue-img-cutter'
import { uploadFileWithNOTokenTwo } from '@/api/file/upload'
import userSelector from '@/views/popupWindowManagement/components/userSelector'
import supplierSelect from '@/views/popupWindowManagement/components/supplierSelect'
import { addReportType, modifyReportType } from '@/api/reportForm';
import { getUserSelectPageList } from '@/api/authorityMgmt/index'
import { getDeptDropDownList } from '@/api/authorityMgmt'
export default {
    name: 'addTypeDialog',
    components: {
        iDialog,
        iFormItem,
        iInput,
        ImgCutter,
        iSelect,
        iButton,
        userSelector,
        supplierSelect
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
        return {
            visible: false,
            form : {
                name: '',
                organization: '',
                location: '',
                enName: '',
                telefone: '',
                adminUsers: [],
                canUsers: [],
                users: [],
                suppliers: [],
                organizations: []
            },
            rules: {
                name: { required:true, message:"请输入报表类型",trigger:'blur' },
                organization: { required:true, message:"请输入部门信息",trigger:'blur' },
                location: { required:true, message:"请输入location",trigger:'blur' },
                enName: { required:true, message:"请输入英文名",trigger:'blur' },
                telefone: { required:true, message:"请输入Telefone",trigger:'blur' },
                adminUsers: { required:true, message:"请选择adminUsers",trigger:'blur' },
                canUsers: { required:true, message:"请选择报表可见人员",trigger:'blur' }
            },
            imgCutterRate: '16 : 9',
            imageUrl: '',
            adminList: [],
            organizationList: [],
            customFlag: false,
            loading: false,
            modifyId: null
        }
    },
    methods: {
        async getUsersList() {
            let params = {current:1, size:999, pageNo:1}
            await getUserSelectPageList(params).then(res => {
                if (res?.code === '200') {
                    this.adminList = res?.data || []
                    let arr = JSON.parse(JSON.stringify(this.adminList))
                    arr.unshift({
                        nameZh: '自定义',
                        userId: 7250
                    })
                    this.usersList = arr
                }
            })
        },
        async getOrganizationsList() {
            // let params = {
            //     keyword: ' '
            // }
            await getDeptDropDownList({}).then(res => {
                if (res?.code === '200') {
                    this.organizationList = res?.data || []
                }
            }) 
        },
        userListChange(val){
            val.map(item => {
                this.form.users.push(item.userId * 1)
            })
        },
        supplierListChange(val){
            val.map(item => {
                this.form.suppliers.push(item.id * 1)
            })
        },
        clear() {
            this.form = {
                name: '',
                organization: '',
                location: '',
                enName: '',
                telefone: '',
                adminUsers: [],
                canUsers: [],
                users: [],
                suppliers: [],
                organizations: []
            }
        },
        closeDialogBtn () {
            this.$emit('update:show', false)
            this.imageUrl = ''
            this.customFlag = false
            this.modifyId = null
            // Object.keys(this.form).forEach(key => this.form[key] = '')
            this.clear()
        },
        close() {
            this.closeDialogBtn();
            this.$emit('refresh')
        },
        handleImageError(){
            let img = document.querySelector('avatar')
            img.src = this.linkUrl()
        },
        linkUrl(){
            return this.imageUrl
        },
        beforeAvatarUpload(file){
            const isLt10M = file.size / 10240 / 10240 < 10;
            if (!isLt10M) {
                this.$message.error('上传头像图片大小不能超过 10MB!');
            }
            return  isLt10M;
        },
        async upload(content){
            let form = new FormData()
            form.append('file',content.file)
            form.append('applicationName','popupImage')
            uploadFileWithNOTokenTwo(form).then((result)=>{
                if(result.code == '200'){
                    let data = result.data
                    this.imageUrl = data.path
                    this.imgName = `${data?.name.split('.')[0]}.${data?.extensionName}`
                    this.$emit('imgUrl',this.imageUrl)
                }else{
                this.$message.error(result.desZh)
                }
            })
        },
        handlePerson(va) {
            if (va.includes(7250)) {
                this.customFlag = true
            } else {
                this.customFlag = false
            }
        },
        handleClose(){
            this.$emit("update:show",false)
        },
        save(){
            if (!this.imageUrl) return this.$message({type: 'warning', message: "请上传一张封面！"})
            this.$refs.typeForm.validate(async v => {
                if (v) {
                    try {
                        if (this.operateType === 'add') {
                            this.form.cover = this.imageUrl
                            if (this.customFlag) {
                                this.form.canUsers.map(item => {
                                    if (item !== 7250) {
                                        this.form.users.push(item)
                                    }
                                })
                            } else {
                                this.form.users = [...this.form.canUsers]
                            }
                            this.loading = true
                            await addReportType(this.form).then(res => {
                                if (res?.success) {
                                    this.$message({
                                        type: 'success',
                                        message: '新增类型成功!'
                                    });
                                    this.loading = false
                                }
                            })
                        } else {
                            this.form.cover = this.imageUrl
                            this.form.id = this.modifyId
                            debugger
                            if (this.customFlag) {
                                this.form.canUsers.map(item => {
                                    if (item !== 7250) {
                                        this.form.users.push(item)
                                    }
                                })
                            } else {
                                this.form.users = [...this.form.canUsers]
                            }
                            this.loading = true
                            await modifyReportType(this.form).then(res => {
                                if (res?.success) {
                                    this.$message({
                                        type: 'success',
                                        message: '修改类型成功!'
                                    });
                                    this.loading = false
                                }
                                
                            })
                        }
                        this.close()
                    } finally {
                        this.loading = false
                    }
                }
            })
        },
        initModify(row) {
            Object.assign(this.form, row)
            this.imageUrl = row.cover
            this.modifyId = row.id
            if (this.form.organizations) {
                let testOrganizationsArr = JSON.parse(JSON.stringify(this.form.organizations))
                testOrganizationsArr.map(item => {
                    this.form.organizations.push(item.id)
                })
            }
            if (this.form.adminUsers) {
                let testAdminUsersArr = JSON.parse(JSON.stringify(this.form.adminUsers))
                testAdminUsersArr.map(item => {
                    this.form.adminUsers.push(item.id)
                })
            }
            if (this.form.users) {
                let testUsersArr = JSON.parse(JSON.stringify(this.form.users))
                this.form.canUsers = []
                testUsersArr.map(item => {
                    this.form.canUsers.push(item.id)
                })
            }
            // 返回的信息有供应商 说明是自定义
            if (this.form.suppliers) {
                this.form.canUsers.unshift({
                    nameZh: '自定义',
                    userId: 7250
                })
                this.customFlag = true
            } else {
                this.customFlag = false
            }
        }
    },
    computed: {
        dialogTitle() {
            return this.operateType === 'add' ? '新增类型管理' : '修改类型管理'
        }
    }
}
</script>

<style lang="scss" scoped>
.base-info {
    display: flex;
    justify-content: space-between;
}
.avatar-uploader{
  z-index: 9999;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 360px;
    height: 180px;
    line-height: 180px;
    text-align: center;
    background-color: #F8F8FA;
    border: 1px dashed #D0D4D9;
    border-radius: 2px;
	width: 100%;
	margin-top: 20px;
  }
.avatar {
    width: 100%;
	margin-top: 20px;
    height: 180px;
    line-height: 180px;
}
.delete-box {
	width: 100%;
     height: 30px;
    line-height: 30px;
	text-align: center;
	border: 1px solid #D0D4D9;
	cursor: pointer;
	color: #F8F8FA;
	background-color: red;
}
</style>