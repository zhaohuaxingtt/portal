<template>
    <iDialog
        :title="dialogTitle"
        :visible.sync="show" 
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
                    <div style="width: 100%">
                        <iFormItem :label="language('报告类型')" prop='name' style="width: 50%">
                            <iInput v-model="form.name" placeholder="请输入" style="width: 280px" clearable maxLength="50"></iInput>
                        </iFormItem>
                        <iFormItem :label="language('部门信息')" prop='organization'>
                            <iInput v-model="form.organization" placeholder="请输入" style="width: 280px" clearable maxLength="100"></iInput>
                        </iFormItem>
                    </div>
                    <div style="width: 100%">
                        <iFormItem :label="language('location')" prop='location' style="width: 50%">
                            <iInput v-model="form.location" placeholder="请输入" clearable maxLength="100" style="width: 280px"></iInput>
                        </iFormItem>
                        <iFormItem :label="language('英文名')" prop='enName'>
                            <iInput v-model="form.enName" placeholder="请输入" clearable maxLength="50" style="width: 280px"></iInput>
                        </iFormItem>
                    </div>
                    <div style="width: 100%">
                        <iFormItem :label="language('Telefone')" prop='telefone'>
                            <iInput v-model="form.telefone" placeholder="请输入" clearable maxLength="30" style="width: 280px"></iInput>
                        </iFormItem>
                    </div>
                </div>
                <!-- <div class="s-line"></div> -->
                <div style="width: 26%">
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
                        <p class="right-content-bottom">{{language('建议使用16:9比例图片，不超过10M')}}</p>
                    </div>
                </div>
            </div>
            <div class="h-line"></div>
            <div>
                <div>
                    <iFormItem :label="language('管理员')" prop='adminUsers'>
                        <iSelect
                            v-model="form.adminUsers"
                            filterable
                            placeholder="请选择"
                            clearable
                            multiple
                            style="width: 280px"
                        >
                            <el-option
                                v-for="item in adminList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            >
                            </el-option>
                        </iSelect>
                    </iFormItem>
                    <iFormItem :label="language('报表可见组织')" prop='organizations' style="marginLeft: 70px">
                        <iSelect
                            v-model="form.organizations"
                            filterable
                            placeholder="请选择"
                            clearable
                            multiple
                            style="width: 280px"
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
                    <iFormItem :label="language('报表可见人员')" prop='userRange'>
                        <iSelect
                            v-model="form.userRange"
                            filterable
                            placeholder="请选择"
                            clearable
                            @change="handlePerson"
                            style="width: 280px"
                        >
                            <el-option
                                v-for="item in usersList"
                                :key="item.id"
                                :label="item.nameZh"
                                :value="item.id"
                            >
                            </el-option>
                        </iSelect>
                    </iFormItem>
                </div>
                <div v-show="customFlag">
                    <iFormItem :label="language('选择人员')">
                        <userSelector v-model="form.users" @change="userListChange" :onlyReportForm="true" style="width: 280px" />
                    </iFormItem>
                    <iFormItem :label="language('选择供应商')">
                        <supplierSelect v-model="form.suppliers" @change="supplierListChange" style="width: 280px"/>
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
import userSelector from '@/components/userSelector'
import supplierSelect from '@/views/popupWindowManagement/components/supplierSelect'
import { addReportType, modifyReportType } from '@/api/reportForm';
import { getKnowledgeUser } from '@/api/adminProCS';
import { getDeptDropDownList } from '@/api/authorityMgmt'
import { userList } from './columnData'
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
        },
        modifyId: {
            type: String,
            default: ''
        },
        currDetailInfo: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            visible: false,
            form: {
                name: '',
                organization: '',
                location: '',
                enName: '',
                telefone: '',
                adminUsers: [],
                userRange: '',
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
                adminUsers: { required:true, message:"请选择管理员",trigger:'blur' },
                userRange: { required:true, message:"请选择报表可见人员",trigger:'blur' }
            },
            imgCutterRate: '16 : 9',
            imageUrl: '',
            adminList: [],
            organizationList: [],
            customFlag: false,
            loading: false,
            usersList: userList
        }
    },
    async created() {
        if (this.modifyId && this.operateType === 'edit') {
            // await this.getCurrDetail(this.modifyId)
            this.initModify(this.currDetailInfo)
        }
        this.getUsersList()
        this.getOrganizationsList()
    },
    methods: {
        // async getCurrDetail(id) {
        //     await reportTypeDetailById(id).then(res => {
        //         if (res) {
        //             this.initModify(res)
        //         }
        //     })
        // },
        async getUsersList() {
            let params = {
				privilege: 'BBNRGLY'
			}
            await getKnowledgeUser(params).then(res => {
                if (res) {
                    this.adminList = res || [{name: '测试', id: '1'}]
                }
            })
        },
        async getOrganizationsList() {
            this.orgLoading = true
            await getDeptDropDownList({}).then(res => {
                if (res?.code === '200') {
                    this.organizationList = res?.data || []
                }
            }) 
        },
        userListChange(val){
            this.form.users = val
        },
        supplierListChange(val){
            this.form.suppliers = val
        },
        clear() {
            this.form = {
                name: '',
                organization: '',
                location: '',
                enName: '',
                telefone: '',
                adminUsers: [],
                userRange: '',
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
            if (va === 15) {
                this.customFlag = true
            } else {
                this.customFlag = false
            }
        },
        handleClose(){
            this.$emit("update:show",false)
        },
        dealAccount(list, type) {
            let userAccountIdFlag = false
            list && list.map(item => {
                if (type === 'users' ? !item.accountId : !item.id) {
                    userAccountIdFlag = true
                }
            })
            return userAccountIdFlag
        },
        save(){
            if (this.customFlag && this.form?.users?.length === 0 && this.form?.suppliers?.length === 0) return this.$message({type:'warning', message: '您已选择自定义,请选择供应商或人员'})
            if (!this.imageUrl) return this.$message({type: 'warning', message: "请上传一张封面！"})
            this.$refs.typeForm.validate(async v => {
                if (v) {
                    try {
                        // if (this.customFlag) {
                        //     this.form.users = this.form.users && this.form.users.map(e => e.id)
                        //     this.form.suppliers = this.form.suppliers && this.form.suppliers.map(e => e.id)
                        // }
                        if (this.customFlag) {
                            if (this.dealAccount(this.form.users, 'users')) return this.$message({type: 'warning', message: '选择的账户没有账户id'})
                            if (this.dealAccount(this.form.suppliers, 'suppliers')) return this.$message({type: 'warning', message: '选择的供应商没有账户id'})
                            this.form.users = this.form.users && this.form.users.map(e => e.accountId ? e.accountId : '')
                            this.form.suppliers = this.form.suppliers && this.form.suppliers.map(e => e.id ? e.id : '')
                        } else {
                            this.form.users = []
                            this.form.suppliers = []
                        }
                        if (this.operateType === 'add') {
                            this.form.cover = this.imageUrl
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
            this.form = JSON.parse(JSON.stringify(row))
            this.imageUrl = row.cover
            this.form.adminUsers = row.adminUsers.map(e => String(e?.id))
            if (row.organizations.length > 0) {
                this.form.organizations = row.organizations.map(e => (e.id) * 1)
            }
            if (this.form.userRange === 15) {
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
    justify-content: space-around;
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
.h-line {
    width: 100%;
    height: 1px;
    background: #707070;
    opacity: 0.15;
    margin-bottom: 10px;
}
.s-line {
    width: 1px;
    height: 180px;
    background: #EAEAEA;
    opacity: 1;
}
.right-content-bottom{
    margin-top: 20px;
    color: #999999;
  }
</style>