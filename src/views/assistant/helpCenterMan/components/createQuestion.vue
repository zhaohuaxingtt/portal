<template>
     <iDialog
      :visible.sync="show"
      title="新建问题"
      @close="closeDialog"
      width="800px"
      min-height="400px"
    >
        <div class="content">
            <iFormGroup :model="form" ref="form" :inline="false" :rules="formRules">
                <div class="flex">
                    <el-form-item class="flex" label="问题模块" prop="questionModuleId">
                        <iSelect class="input" v-model="form.questionModuleId" filterable @change="change">
                            <el-option v-for="m in moduleList" :key="m.id" :value='m.id' :label='m.menuName'></el-option>
                        </iSelect>
                    </el-form-item>
                    <el-form-item class="flex" label="问题标签" prop="questionLableId" style="margin-left:30px">
                        <iSelect class="input" v-model="form.questionLableId" filterable>
                            <el-option v-for="l in labelList" :key="l.id" :value='l.id' :label='l.lableName'></el-option>
                        </iSelect>
                    </el-form-item>
                </div>
                <el-form-item label="问题描述" prop="questionTitle">
                    <i-input class="textarea" rows="5" type="textarea" v-model="form.questionTitle" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="管理员回复" prop="answerContent">
                    <!-- <div class="flex flex-column"> -->
                        <!-- <iLabel class="label" label="管理员回复" slot="label"></iLabel> -->
                        <iEditor class="flex-1 editor" style="margin-top:30px" id="qs-add" v-model="form.answerContent"></iEditor>
                    <!-- </div> -->
                </el-form-item>

            </iFormGroup>

            <div class="flex" style="margin-top:20px;align-items: flex-start;">
                <div class="label">附件：</div>
                <iUpload ref="upload" v-model="form.annexList" @onSuccess="uploadSucc" >
                    <div class="upload-btn flex">
                        <i class="el-icon-link"></i>
                        <span>点击上传</span>
                    </div>
                </iUpload>
            </div>
        </div>
        <div slot="footer">
            <!-- <iButton>上 传</iButton> -->
            <iButton @click="save">确 认</iButton>
        </div>
    </iDialog>
</template>

<script>
    import { iDialog, iFormGroup, iInput, iButton,iSelect } from "rise"
    import iEditor from "@/components/iEditor"
    import iUpload from "./../../components/iUpload.vue"
    import { saveFaq } from "@/api/assistant"
    export default {
        components:{
            iDialog,
            iFormGroup,
            iInput,
            iButton,
            iUpload,
            iEditor,
            iSelect
        },
        props:{
            show:{
                type: Boolean,
                default:false
            },
            moduleList:{
                type: Array,
                default:() => []
            },
            labelList:{
                type: Array,
                default:() => []
            },
            qs:{
                type:Object,
                default:() => {}
            },
            source:{
                default:""
            }
        },
        data() {
            return {
                form:{
                    questionModuleId:"",
                    questionLableId:"",
                    questionTitle:"",
                    answerContent:"",
                    annexList:[]
                },

                formRules: {
                    questionModuleId:{required:'true',message:"请选择问题模块",trigger:'cahnge'},
                    questionLableId:{required:'true',message:"请选择标签",trigger:'change'},
                    questionTitle:{required:'true',message:"请输入问题描述",trigger:'blur'},
                    answerContent:{required:'true',message:"请输入回复内容",trigger:'blur'},
                },
            }
        },
        methods: {
            change(id){
                this.$emit('moduleChange',id)
                this.form.questionLableId = ""
            },
            closeDialog(){
                this.form = {
                    questionModuleId:"",
                    questionLableId:"",
                    questionTitle:"",
                    answerContent:"",
                    annexList:[],
                }
                this.$emit("update:show",false)
            },
            save(){
                this.$refs.form.validate(async v => {
                    if(v){
                        this.form.questionId = this.qs.id
                        this.form.source = this.source
                        await saveFaq(this.form)
                        this.$message.success("保存成功")
                        this.closeDialog()
                        this.$emit("refresh")
                    }
                })
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