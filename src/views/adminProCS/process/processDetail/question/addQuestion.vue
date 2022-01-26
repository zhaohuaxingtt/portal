<template>
    <iDialog
        :title="dialogTitle"
        style="margin-top:10vh"
        :visible.sync="show" 
        width="500px" 
        @close='closeDialogBtn' 
        append-to-body
    >
        <el-form 
            ref="form"
            label-position="left" 
            :model="newQuestionForm" 
            :rules="newQuestionRules" 
            label-width="100px" 
            v-loading="loading"
            class="questionForm validate-required-form"
        >
			<iFormItem :label="language('问题描述')" prop='name'>
				<iInput v-model="newQuestionForm.name" placeholder="请输入问题描述"></iInput>
			</iFormItem>
			<iFormItem :label="language('标题首字母')" prop='firstLetter'>
				<iInput v-model="newQuestionForm.firstLetter" placeholder="请输入标题首字母"></iInput>
			</iFormItem>	
			<iFormItem :label="language('更新日期')" prop='updateDt'>
				<el-date-picker
                    style="width:100%"
					v-model="newQuestionForm.updateDt"
					type="date"
					placeholder="请选择更新日期">
				>
				</el-date-picker>
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
import {ProcessAddFAQ,ProcessEditFAQ} from '@/api/adminProCS';
import moment from 'moment';
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
        },
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
            newQuestionForm: {
				name: '',
				firstLetter: '',
				updateDt: ''
            },
            newQuestionRules: {
				name: { required:'true',message:"请输入问题描述",trigger:'blur' },
				firstLetter: { required:'true',validator: firstLetter_valid,trigger:'blur' },
				updateDt: { required:'true',message:"请选择更新日期",trigger:'blur' },
			},
            processId: this.$route.query.id,
            loading: false
        }
    },
    methods: {
        initForm(form){
            this.newQuestionForm = form
            this.$set(this.newQuestionForm, "updateDt", form.updatedAt)
        },
        closeDialogBtn() {
            this.newQuestionForm = {
                name: '',
				firstLetter: '',
				updateDt: ''
            }
            this.$refs.form.resetFields()
            this.$emit('update:show', false)
        },
        save(){
            this.$refs.form.validate(async v => {
                if(v){
                    this.loading = true
                    let data = new FormData()
                    this.newQuestionForm.updateDt = moment(this.newQuestionForm.updateDt).format("YYYY-MM-DD HH:mm:ss")
                    for (const key in this.newQuestionForm) {
                        data.append(key, this.newQuestionForm[key])
                    }
                    try {
                        if(this.newQuestionForm.id){
                            await ProcessEditFAQ(this.newQuestionForm.id,data)
                        }else{
                            await ProcessAddFAQ(this.processId, data)
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