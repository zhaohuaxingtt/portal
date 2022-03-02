<template>
     <iDialog
      :visible.sync="show"
      :title="language('新建问题')"
      @close="closeDialog"
      width="800px"
      class="qs-dialog"
      top="30px"
    >
        <div class="content">
            <iFormGroup :model="form" ref="form" :inline="false" :rules="formRules">
                <div class="flex">
                    <el-form-item class="flex" :label="language('问题模块')" prop="questionModuleId">
                        <iSelect class="input" v-model="form.questionModuleId" filterable @change="change">
                            <el-option v-for="m in moduleList" :key="m.id" :value='m.id' :label='m.menuName'></el-option>
                        </iSelect>
                    </el-form-item>
                    <el-form-item class="flex" :label="language('问题标签')" prop="questionLableId" style="margin-left:30px">
                        <iSelect class="input" v-model="form.questionLableId" filterable>
                            <el-option v-for="l in labelList" :key="l.id" :value='l.id' :label='l.lableName'></el-option>
                        </iSelect>
                    </el-form-item>
                </div>
                <el-form-item :label="language('常见问题')" prop="questionTitle">
                    <i-input class="textarea" rows="5" type="textarea" v-model="form.questionTitle" :placeholder="language('请输入')" />
                </el-form-item>
                <el-form-item :label="language('管理员回复')" prop="answerContent">
                    <iEditor class="editor" :height="300" style="margin-top:40px" id="qs-add" :zIndex="500" v-model="form.answerContent" :html="form.answerContent"></iEditor>
                </el-form-item>

            </iFormGroup>

            <div class="flex" style="align-items: flex-start;">
                <div class="label">{{language('附件')}}：</div>
                <iUpload ref="upload" v-model="form.annexList" @onSuccess="uploadSucc" >
                    <div class="upload-btn flex">
                        <i class="el-icon-link"></i>
                        <span>{{language('点击上传')}}</span>
                    </div>
                </iUpload>
            </div>
        </div>
        <div slot="footer">
            <iButton @click="save">{{language('确认')}}</iButton>
        </div>
    </iDialog>
</template>

<script>
    import { iDialog, iFormGroup, iInput, iButton,iSelect } from "rise"
    import iUpload from "./../../components/iUpload.vue"
    import iEditor from "./../../components/iEditor.vue"
    import { saveFaq,getCurrLabelList } from "@/api/assistant"
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
                labelList:[],
                formRules: {
                    questionModuleId:{required:'true',message:"请选择问题模块",trigger:'cahnge'},
                    questionLableId:{required:'true',message:"请选择标签",trigger:'change'},
                    questionTitle:{required:'true',message:"请输入问题描述",trigger:'blur'},
                    answerContent:{required:'true',message:"请输入回复内容",trigger:'change'},
                },
            }
        },
        methods: {
            change(id){
                this.form.questionLableId = ""
                if(id){
                    getCurrLabelList(id).then(res => {
                        this.labelList = res.data
                        this.$forceUpdate()
                    })
                }
            },
            closeDialog(){
                this.form = {
                    questionModuleId:"",
                    questionLableId:"",
                    questionTitle:"",
                    answerContent:"",
                    annexList:[],
                }
                this.$refs.form.resetFields()
                this.$emit("update:show",false)
                this.labelList = []
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
    display: flex;
    flex-direction: column;
}
.input{
    width: 320px;
}
.textarea{
    width: 100%;
}


.label{
    margin-bottom: 10px;
}
</style>