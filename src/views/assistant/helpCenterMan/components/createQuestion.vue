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

            <div class="flex" style="margin-top:20px;align-items: flex-start;">
                <iLabel class="label" label="附件:" slot="label"></iLabel>
                <div class="upload-btn flex">
                    <i class="el-icon-link"></i>
                    <iUpload ref="upload" v-model="files" @onSuccess="uploadSucc" >
                        <span>点击上传</span>
                    </iUpload>
                </div>
            </div>
        </div>
        <div slot="footer">
            <iButton>上 传</iButton>
            <iButton>确 认</iButton>
        </div>
    </iDialog>
</template>

<script>
    import { iDialog, iFormGroup, iInput, iLabel, iButton } from "rise"
    import iEditor from "@/components/iEditor"
    import iUpload from "./../../components/iUpload.vue"
    export default {
        components:{
            iDialog,
            iFormGroup,
            iInput,
            iButton,
            iLabel,
            iUpload,
            iEditor
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
                },
                files:[
                    {name:'123.png'}
                ]
            }
        },
        methods: {
            closeDialog(){
                this.$emit("update:show",false)
            },
            uploadSucc(res){
                console.log(res);
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
    align-items: baseline;
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