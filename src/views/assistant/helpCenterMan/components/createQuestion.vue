<template>
     <iDialog
      :visible.sync="show"
      title="新建问题"
      @close="closeDialog"
      width="800px"
      min-height="400px"
    >
        <div class="content">
            <iFormGroup :model="form" ref="demoForm" :inline="true">
                <el-form-item label="问题模块">
                    <i-input class="input" type="text" v-model="form.module" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="问题标签" style="margin-left:30px">
                    <i-input class="input" type="text" v-model="form.tag" placeholder="请输入" />
                </el-form-item>
                <div class="flex flex-column" style="margin-bottom:20px;">
                    <iLabel class="label" label="问题描述" slot="label"></iLabel>
                    <i-input class="textarea" rows="5" type="textarea" v-model="form.desc" placeholder="请输入" />
                </div>
                <div class="flex flex-column">
                    <iLabel class="label" label="管理员回复" slot="label"></iLabel>
                    <iEditor class="flex-1 editor" id="qs-add" v-model="form.content"></iEditor>
                </div>
            </iFormGroup>

            <div class="flex" style="margin-top:20px;">
                <iLabel class="label" label="附件:" slot="label"></iLabel>
                <div class="upload-btn">
                    <i class="el-icon-link"></i>
                    <span @click="upload">点击上传</span>
                    <iUpload v-show="false" ref="upload" :fileIds="fileIds" :extraData="extraData" @callback="handelCallback" />
                </div>
            </div>
            <FileList></FileList>
        </div>
        <div slot="footer">
            <iButton>上 传</iButton>
            <iButton>确 认</iButton>
        </div>
    </iDialog>
</template>

<script>
    import { iDialog, iFormGroup, iInput, iLabel, iButton, iUpload } from "rise"
    import iEditor from "@/components/iEditor"
    import FileList from "./fileList"
    export default {
        components:{
            iDialog,
            iFormGroup,
            iInput,
            iButton,
            iLabel,
            iUpload,
            iEditor,
            FileList
        },
        props:{
            show:{
                type: Boolean,
                default:false
            }  
        },
        data() {
            return {
                extraData: { applicationName: 'rise-dev', type: '1', businessId: '01', isTemp: 0 },
                fileIds: [],
                form:{
                    module:"",
                    tag:"",
                    desc:"",
                    answer:""
                }
            }
        },
        methods: {
            closeDialog(){
                this.$emit("update:show",false)
            },
            handelCallback(res){
                console.log(res);
            },
            upload(){
                this.$refs.upload.$el.querySelector("input[type='file']").click()
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "../../comon.scss";
.content{
    margin: 20px 0;
}
.input{
    width: 320px;
}
.textarea{
    width: 100%;
}

.upload-btn{
    color: #2369f1;
    cursor: pointer;
    span{
        text-decoration: underline;
    }
}

.label{
    margin-bottom: 10px;
}
</style>