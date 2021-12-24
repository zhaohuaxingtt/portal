<template>
    <iDialog
        :title="dialogTitle" 
        style="margin-top:10vh" 
        :visible.sync="show" 
        v-if="show" 
        width="60%" 
        @close='closeDialogBtn' 
        append-to-body 
        class="attachForm"
    >
        <el-form
            label-position="left"
            :model="newAttachForm"
            :rules="newAttachRules"
            label-width="100px"
            class="attachForm"
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
            <iFormItem :label="language('添加附件')" prop='file'>
				<!-- <el-upload>
                    <iButton>点击上传</iButton>
                    <div slot="tip" class="el-upload__tip">文件大小最大限制10MB!</div>
                </el-upload> -->
                <iUpload 
					v-model="newAttachForm.file"
					:accept="acceptPicType"
					maxSize= 10
					:limit="1"
				>
					<div>
						<iButton>添加图片</iButton>
						<div slot="tip" class="el-upload__tip">文件大小最大限制10MB!</div>
					</div>
				</iUpload>
			</iFormItem>
        </el-form>
        <div class="flex justify-end btn">
			<iButton @click="close">{{ language('取消') }}</iButton>
			<iButton @click="sure">{{ language('确定') }}</iButton>
		</div>
    </iDialog>
</template>

<script>
import { iDialog, iFormItem, iInput, iButton } from 'rise'
import iUpload from '../../../components/iUpload.vue'
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
            visible: false,
            newAttachForm: {
                name: '',
                version: '',
                publishDate: '',
                file: []
            },
            newAttachRules: {
                name: { required:'true',message:"请输入流程附件标题",trigger:'blur' },
                version: { required:'true',message:"请输入版本号",trigger:'blur' },
                publishDate: { required:'true',message:"请选择发布日期",trigger:'blur' },
            }
        }
    },
    methods: {
        closeDialogBtn () {
            this.$emit('update:show', false)
        },
        close() {
            this.closeDialogBtn();
        },
        initModifyAttach(va) {
            this.newAttachForm = va
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