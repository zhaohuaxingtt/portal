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
            :model="newQuestionForm" 
            :rules="newQuestionRules" 
            label-width="100px" 
            class="questionForm"
        >
			<iFormItem :label="language('问题描述')" prop='name'>
				<iInput v-model="newQuestionForm.name" placeholder="请输入问题描述"></iInput>
			</iFormItem>
			<iFormItem :label="language('标题首字母')" prop='firstLetter'>
				<iInput v-model="newQuestionForm.firstLetter" placeholder="请输入标题首字母"></iInput>
			</iFormItem>	
			<iFormItem :label="language('更新日期')" prop='updatedAt'>
				<el-date-picker
					v-model="newQuestionForm.updatedAt"
					type="date"
					placeholder="请选择更新日期">
				>
				</el-date-picker>
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
export default {
    name: 'addQuestion',
    components: {
        iDialog,
		iFormItem,
		iInput,
		iButton
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
            newQuestionForm: {
				name: '',
				firstLetter: '',
				updatedAt: ''
            },
            newQuestionRules: {
				name: { required:'true',message:"请输入问题描述",trigger:'blur' },
				firstLetter: { required:'true',message:"请输入标题首字母",trigger:'blur' },
				updatedAt: { required:'true',message:"请选择更新日期",trigger:'blur' },
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
		initModifyQuestion(currVa) {
			this.newQuestionForm = currVa[0]
		}
    },
    computed: {
        dialogTitle() {
			return this.type === 'add' ? '添加常见问题' : '修改常见问题'
		}
    }
}
</script>

<style lang="scss" scoped>
@import '../../../comon.scss';
    .questionForm {
		padding-bottom: 10px;
	}
	.btn {
		padding-bottom: 20px;
	}
</style>