<template>
    <iDialog
        title="编辑子页面"
        :visible.sync="show" 
        width="800px" 
        @close='close' 
        append-to-body
        class="process-dialog"
        top="30px"
    >
        <div class="content">
            <el-form 
                :model="form" 
                :rules="rules" 
                label-width="90px" 
                ref="form"
                class="validate-required-form"
            >
                <iFormItem :label="language('页面标题')" prop='name'>
                    <iInput v-model="form.name" class="w-250" placeholder="请输入"></iInput>
                </iFormItem>
                <iFormItem :label="language('更新日期')" prop='updateDt'>
                    <iDatePicker
                        value-format="yyyy-MM-dd"
                        type="date"
                        v-model="form.updateDt"
                        class="w-250"
                        :placeholder="language('请选择')"
                        />
                </iFormItem>
                <iFormItem :label="language('排序')" prop='orderBy'>
                    <iInput v-model="form.orderBy" type="number" class="w-250" placeholder="请输入"></iInput>
                </iFormItem>
                <iFormItem :label="language('页面内容')"  prop='pageRichContent'>
                    <iEditor v-model="form.pageRichContent" class="flex-1"></iEditor>
                </iFormItem>
            </el-form>
        </div>
        <div class="flex felx-row mt20 pb20 justify-end ">
            <iButton @click="close">{{ language('取消') }}</iButton>
            <iButton @click="openPreview">{{ language('预览') }}</iButton>
            <iButton @click.native="save">{{ language('保存') }}</iButton>
        </div>


        <iDialog
            title="编辑子页面"
            :visible.sync="preview" 
            width="800px" 
            @close='preview = false' 
            append-to-body
            class="process-dialog"
            top="50px"
        >
            <div class="content preview-c">
                <h3 class="title" v-text="form.name"></h3>
                <div class="inner" v-html="form.pageRichContent"></div>
            </div>    
        </iDialog>
    </iDialog>
</template>

<script>
import {iDialog,iButton,iFormItem,iInput,iDatePicker} from 'rise';
import iEditor from '../../components/iEditor.vue';
export default {
    components: {
        iDialog,
        iFormItem,
        iButton,
        iInput,
        iDatePicker,
        iEditor
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
                updateDt:"",
                orderBy:"",
                pageRichContent:""
            },
            rules:{
                name:[
                    { required: true, message: '请输入页面标题!', trigger:'blur'},
                    {max:50,message:'页面标题长度不能超过50个字符！'}
                ],
                updateDt: { required: true, message: '请选择更新日期!',trigger:'change' },
                orderBy:{ required: true, message: '请输入排序!',trigger:'blur' }
            },
            preview:false
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
        },
        openPreview(){
            if(!this.form.name || !this.form.pageRichContent) return this.$message.warning("请输入页面标题及页面内容")
            this.preview = true
        }
    },
}
</script>

<style lang="scss" scoped>
@import "./../../../comon";
.preview-c{
    margin-bottom: 30px;
    padding: 10px;
    background-color: #f7f8fa;
    .title{
        margin: 10px 0;
        padding: 10px 0;
        color: #0077c8;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        font-size: 18px;
    }
    .inner{
        padding: 10px 5px;
        background-color: #fff;
    }
    
}

.cild{
    position: relative;
}
</style>