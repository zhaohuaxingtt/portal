<template>
    <iDialog
        :title="dialogTitle"
        style="margin-top:10vh"
        :visible.sync="show" 
        v-if="show" 
        width="60%" 
        @close='closeDialogBtn' 
        append-to-body
    >
        <el-form
            label-position="left" 
            :model="newAnswerForm" 
            :rules="newAnswerRules" 
            label-width="100px" 
            class="questionForm"
        >
            <iFormItem :label="language('答案标题')" prop='name'>
				<iInput v-model="newAnswerForm.name" placeholder="请输入答案标题" maxLength="200"></iInput>
			</iFormItem>
            <iFormItem :label="language('内容')" prop='pageRichContent'>
				<iEditor v-model="newAnswerForm.pageRichContent" class="flex-1"></iEditor>
			</iFormItem>
        </el-form>
    </iDialog>
</template>

<script>
import { iDialog, iFormItem, iInput } from 'rise'
import iEditor from '../../components/iEditor.vue';
export default {
    name: 'addAnswer',
    components: {
        iDialog,
		iFormItem,
        iInput,
        iEditor
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
            newAnswerForm: {
                name: '',
                pageRichContent: ''
            },
            newAnswerRules: {
                name: { required:'true',message:"请输入答案标题",trigger:'blur' },
            }
        }
    },
    methods: {
        closeDialogBtn() {
            this.$emit('update:show', false)
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
			return this.type === 'add' ? '添加问题回答' : '修改问题回答'
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
