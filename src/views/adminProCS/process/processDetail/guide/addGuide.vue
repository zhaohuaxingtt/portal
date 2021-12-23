<template>
    <iDialog
        title="添加流程指导书"
        :visible.sync="show" 
        width="600px" 
        @close='close' 
        append-to-body
        class="process-dialog"
    >
        <div class="content">
            <el-form 
                :model="form" 
                :rules="rules" 
                label-width="90px" 
                ref="form"
                class="validate-required-form"
            >
                <iFormItem :label="language('附件标题')" prop='name'>
                    <iInput v-model="form.name" class="w-250" placeholder="请输入"></iInput>
                </iFormItem>
                <iFormItem :label="language('发布日期')" prop='publishDate'>
                    <iDatePicker
                        value-format="yyyy-MM-dd"
                        type="date"
                        v-model="form.publishDate"
                        class="w-250"
                        :placeholder="language('请选择')"
                        />
                </iFormItem>
                <iFormItem :label="language('添加附件')" prop='file'>
                    <i-upload v-model="form.file" :maxSize="10" tipTxt="文件大小最大限制10MB!"></i-upload>
                </iFormItem>
            </el-form>
        </div>
        <div class="flex felx-row mt20 pb20 justify-end ">
            <iButton @click="close">{{ language('取消') }}</iButton>
            <iButton @click.native="save">{{ language('保存') }}</iButton>
        </div>
    </iDialog>
</template>

<script>
import {iDialog,iButton,iFormItem,iInput,iDatePicker} from 'rise';
import iUpload from '../../../components/iUpload.vue';
export default {
    components: {
        iDialog,
        iFormItem,
        iButton,
        iInput,
        iDatePicker,
        iUpload
    },
    props:{
        show:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            form:{
                name:"",
                publishDate:"",
                file:"",
                pageRichContent:""
            },
            rules:{
                name:[
                    { required: true, message: '请输入附件标题!', trigger:'blur'},
                    { max:50, message:'附件标题长度不能超过50个字符!'}
                ],
                publishDate: { required: true, message: '请选择发布日期!',trigger:'change' },
                file:{ required: true, message: '请上传附件!',trigger:'change' }
            }
        }
    },
    methods: {
        save(){
            this.$refs.form.validate(v => {
                if(v){
                    // api
                }
            })
        },
        close(){
            this.$emit("update:show",false)
        }
    },
}
</script>

<style lang="scss" scoped>
@import "./../../../comon";
</style>