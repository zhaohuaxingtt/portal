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
            ref="form"
            :inline="true" 
            label-width="100px"
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
                        <iFormItem :label="language('Telefone')" prop='phoneNumber'>
                            <iInput v-model="form.phoneNumber" placeholder="请输入" clearable maxLength="30"></iInput>
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
                                <img v-if="imageUrl" :src="imageUrl" @error="handleImageError" @load="handleImageLoad" class="avatar" />
                                <!-- <img v-else src="../../../assets/images/popupPic.png"   class="avatar"> -->
                                <i v-else class="el-icon-circle-plus-outline avatar-uploader-icon">
                                </i>
                            </div>
                        </ImgCutter>
                        <!-- <div v-if="imageUrl" class="delete-box" @click="deleteImg">{{`移除${imgName}`}}</div> -->
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
                        >
                            <el-option
                                v-for="item in adminList"
                                :key="item.id"
                                :label="item.label"
                                :value="item.value"
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
                        >
                            <el-option
                                v-for="item in organizationList"
                                :key="item.id"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </iSelect>
                    </iFormItem>
                </div>
                <div>
                    <iFormItem :label="language('报表可见人员')" prop='users'>
                        <iSelect
                            v-model="form.users"
                            filterable
                            placeholder="请选择"
                            clearable
                            @change="handlePerson"
                        >
                            <el-option
                                v-for="item in peopleList"
                                :key="item.id"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </iSelect>
                    </iFormItem>
                </div>
                <div v-if="customFlag">
                    <iFormItem :label="language('选择人员')">
                        <userSelector v-model="form.userList" @change="userListChange" />
                    </iFormItem>
                    <iFormItem :label="language('选择供应商')">
                        <supplierSelect v-model="form.supplierList" @change="supplierListChange" />
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
                phoneNumber: '',
                adminUsers: '',
                users: '',
                userList: [],
                supplierList: [],
                organizations: ''
            },
            rules: {
                name: { required:true, message:"请输入报表类型",trigger:'blur' },
                organization: { required:true, message:"请输入部门信息",trigger:'blur' },
                location: { required:true, message:"请输入location",trigger:'blur' },
                enName: { required:true, message:"请输入英文名",trigger:'blur' },
                phoneNumber: { required:true, message:"请输入Telefone",trigger:'blur' },
            },
            imgCutterRate: '16 : 9',
            imageUrl: '',
            adminList: [
                {label: '管理员1', value: '1', id: 1},
                {label: '管理员2', value: '2', id: 2}
            ],
            peopleList: [
                {label: '人员1', value: '1' , id: 1},
                {label: '人员2', value: '2' , id: 2},
                {label: '张三', value: '3' , id: 3},
                {label: '自定义', value: 'custom', id: 999}
            ],
            organizationList: [
                {label: 'CS', value: '1' , id: 1},
                {label: 'CF', value: '2' , id: 2},
            ],
            customFlag: false
        }
    },
    methods: {
        userListChange(val){
            this.form.userList = val
        },
        supplierListChange(val){
            this.form.supplierList = val
        }, 
        closeDialogBtn () {
            this.$emit('update:show', false)
            this.imageUrl = ''
            Object.keys(this.form).forEach(key => {
                this.form[key] = ''
            })
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
            console.log(content, "12345")
            uploadFileWithNOTokenTwo(form).then((result)=>{
                if(result.code == '200'){
                    console.log(result, "12222")
                    let data = result.data
                    this.imageUrl = data.path
                    this.imgName = `${data?.name.split('.')[0]}.${data?.extensionName}`
                    this.$emit('imgUrl',this.imageUrl)
                }else{
                this.$message.error(result.desZh)
                }
            })
        },
        deleteImg() {
            this.imageUrl = ''
        },
        handlePerson(va) {
            console.log(va, '111')
            if (va === 'custom') {
                this.customFlag = true
            } else {
                this.customFlag = false
            }
        },
        handleClose(){
            this.$emit("update:show",false)
        },
        save(){
            console.log('123')
        },
        initModify(row) {
            Object.assign(this.form, row)
            this.form.users  = row.usersId
            this.form.organizations = row.organizationsId
            this.form.adminUsers = row.adminUsersId
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