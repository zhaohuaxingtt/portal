<template>
    <iDialog
        :title="dialogTitle" 
        style="margin-top:10vh" 
        :visible.sync="show" 
        v-if="show" 
        width="500px" 
        @close='closeDialogBtn' 
        append-to-body 
        class="attachForm"
    >
        <el-form
            label-position="left"
            :model="newAttachForm"
            :rules="newAttachRules"
            label-width="100px"
            ref="form"
            v-loading="loading"
            class="attachForm validate-required-form"
        >
            <iFormItem :label="language('流程附件标题')" prop='name'>
				<iInput v-model="newAttachForm.name" placeholder="请输入流程附件标题" maxLength="50"></iInput>
			</iFormItem>
            <iFormItem :label="language('版本号')" prop='version'>
				<iInput v-model="newAttachForm.version" placeholder="请输入版本号" maxLength="20"></iInput>
			</iFormItem>
            <iFormItem :label="language('发布日期')" prop='publishDate'>
                <el-date-picker
                    v-model="newAttachForm.publishDate"
                    type="date"
                    placeholder="请选择发布日期">
                </el-date-picker>
            </iFormItem>
            <iFormItem :label="language('添加附件')" prop='fileList'>
                <el-checkbox-group v-model="newAttachForm.fileList"></el-checkbox-group>
                <iUpload 
					v-model="newAttachForm.fileList"
					:accept="acceptPicType"
					:maxSize="10"
					:limit="1"
                    isCustHttp
                    :uploadHandle="uploadHandle"
                    :removeHandle="removeHandle"
				>
					<div>
						<iButton>添加图片</iButton>
						<div slot="tip" class="el-upload__tip">文件大小最大限制10MB!</div>
					</div>
				</iUpload>
			</iFormItem>
            <div class="flex justify-end btn">
                <iButton @click="close">{{ language('取消') }}</iButton>
                <iButton @click="save">{{ language('确定') }}</iButton>
            </div>
        </el-form>
    </iDialog>
</template>

<script>
import { iDialog, iFormItem, iInput, iButton } from 'rise'
import iUpload from '../../../components/iUpload.vue'
import {addProcessFile} from '@/api/adminProCS';
import moment from 'moment';
export default {
    name: 'addAttach',
    components: {
        iDialog,
        iFormItem,
        iInput,
        iButton,
        iUpload
    },
    props: {
		type: {
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
            newAttachForm: {
                name: '',
                version: '',
                publishDate: '',
                fileList: [],
                file:null
            },
            newAttachRules: {
                name: { required:'true',message:"请输入流程附件标题",trigger:'blur' },
                version: { required:'true',message:"请输入版本号",trigger:'blur' },
                publishDate: { required:'true',message:"请选择发布日期",trigger:'blur' },
                fileList: { type:"array", required:'true',message:"请上传附件",trigger:'change' },
            },
            loading:false,
            processId: this.$route.query.id,
            uploadHandle:this.upload,
            removeHandle:this.removeFile
        }
    },
    methods: {
        closeDialogBtn () {
            this.newAttachForm = {
                name: '',
                version: '',
                publishDate: '',
                file: "",
                fileList:[]
            }
            this.$refs.form.resetFields()
            this.$emit('update:show', false)
        },
        close() {
            this.closeDialogBtn();
        },
        initModifyAttach(va) {
            this.newAttachForm = va
        },
        save(){
            this.$refs.form.validate(async v => {
                if(v){
                    this.loading = true
                    let data = {
                        name: this.newAttachForm.name,
                        version: this.newAttachForm.version,
                        publishDate: moment(this.newAttachForm.publishDate).format("YYYY-MM-DD HH:mm:ss"),
                        fileType: "PRO_SAMPLE",
                        file: this.newAttachForm.file
                    }
                    let formdata = new FormData()
                    for (const key in data) {
                        formdata.append(key, data[key])
                    }
                    try {
                        await addProcessFile(this.processId, formdata)
                        this.$emit("refresh")
                        this.$message.success("保存成功")
                        this.close()
                    } finally {
                        this.loading = false
                    }
                }
            })
        },
        upload(file){
            return new Promise((res) => {
                this.newAttachForm.file = file
                res({
                    name: file.name
                })
            })
        },
        removeFile(){
            this.newAttachForm.fileList = []
            this.newAttachForm.file = ""
        }
    },
    computed: {
        dialogTitle() {
			return this.type === 'add' ? '新增流程附件' : '修改流程附件'
		}
    }
}
</script>

<style lang="scss" scoped>
@import '../../../comon.scss';
    .attachForm {
		padding-bottom: 10px;
	}
    .btn {
		padding-bottom: 20px;
	}
</style>