<template>
    <iDialog
        :title="dialogTitle"
        style="margin-top:10vh"
        :visible.sync="show" 
        width="60%" 
        @close='closeDialogBtn' 
        @open="open"
        append-to-body
    >
        <el-form
            label-position="left" 
            :model="newAnswerForm" 
            :rules="newAnswerRules" 
            label-width="100px" 
            ref="form"
            v-loading="loading"
            class="questionForm validate-required-form"
        >
            <iFormItem :label="language('答案标题')" prop='name'>
				<iInput v-model="newAnswerForm.name" placeholder="请输入答案标题" maxLength="200"></iInput>
			</iFormItem>
            <iFormItem :label="language('内容')" prop='pageRichContent'>
				<iEditor v-model="newAnswerForm.pageRichContent" id="pageQsEditor" class="flex-1" :html="newAnswerForm.pageRichContent"></iEditor>
			</iFormItem>

            <div class="flex justify-end btn">
                <iButton @click="close">{{ language('取消') }}</iButton>
                <iButton @click="save">{{ language('确定') }}</iButton>
            </div>
        </el-form>
    </iDialog>
</template>

<script>
import { iDialog, iFormItem, iInput,iButton } from 'rise'
import iEditor from '../../components/iEditor.vue';
import {addFAQAnswer, editFAQAnswer} from '@/api/adminProCS';
export default {
    name: 'addAnswer',
    components: {
        iDialog,
		iFormItem,
        iInput,
        iButton,
        iEditor
    },
    props: {
        detail: {
            type: Object,
            default: () => {}
        },
        show: {
            type: Boolean,
            default: false
        },
        qsId:{
            default:""
        }
    },
    data() {
        return {
            newAnswerForm: {
                name: '',
                pageRichContent: ''
            },
            newAnswerRules: {
                name: { required:'true',message:"请输入答案标题",trigger:'blur' },
                pageRichContent: { required:'true',message:"请输入内容",trigger:'blur' },
            },
            loading:false
        }
    },
    methods: {
        closeDialogBtn() {
            this.newAnswerForm = {
                name: '',
                pageRichContent: ''
            }
            this.$refs.form.resetFields()
            this.$emit('update:show', false)
        },
        open(){
            if(this.detail.id){
                this.newAnswerForm = this.detail
                this.$set(this.newAnswerForm,"pageRichContent",this.detail.richContent)
                console.log(this.newAnswerForm);
            }
        },
        save(){
            this.$refs.form.validate(async v => {
                if(v){
                    this.loading = true
                    let data = new FormData()
                    for (const key in this.newAnswerForm) {
                        data.append(key, this.newAnswerForm[key])
                    }
                    try {
                        if(this.newAnswerForm.id){
                            await editFAQAnswer(this.newAnswerForm.id,data)
                        }else{
                            await addFAQAnswer(this.qsId, data)
                        }
                        this.$emit("refresh")
                        this.$message.success("保存成功")
                        this.close()
                    } finally {
                        this.loading = false
                    }
                }
            })
        },
        close() {
            this.closeDialogBtn()
        },
        initInfo(currVal) {
            this.newAnswerForm = currVal
        },
    },
    computed: {
        dialogTitle() {
			return !this.newAnswerForm.id ? '添加问题回答' : '修改问题回答'
		}
    }
}
</script>

<style lang="scss" scoped>
@import '../../../comon.scss';
.questionForm {
	padding-bottom: 10px;
}
</style>
