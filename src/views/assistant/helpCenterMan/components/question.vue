<template>
    <div class="qs" v-loading="loading">
        <div class="qs-btns">
            <template v-if="type == 'detail'">
                <template v-if="detail.id">
                    <iButton @click="del">删除</iButton>
                    <iButton @click="edit">编辑</iButton>
                </template>
                <iButton @click="dialog = true">新建问题</iButton>
            </template>
            <template v-else>
                <iButton @click="cancel">取消</iButton>
                <iButton @click="save">确定</iButton>
            </template>
        </div>

        <div class="flex qs-p">
            <div class="flex flex-column qs-params">
                <iLabel class="label" label="常见问题" slot="label"></iLabel>
                <i-input class="input" type="text" :disabled="type == 'detail'" v-model="form.questionTitle" placeholder="请输入" />
            </div>
            <div class="flex flex-column qs-params">
                <iLabel class="label" label="问题模块" slot="label"></iLabel>
                <iSelect class="input" :disabled="type == 'detail'" v-model="form.questionModuleId" @change="moduleChange">
                    <el-option v-for="m in moduleList" :key="m.id" :value='m.id' :label='m.menuName'></el-option>
                </iSelect>
            </div>
            <div class="flex flex-column qs-params">
                <iLabel class="label" label="标签" slot="label"></iLabel>
                <iSelect class="input" :disabled="type == 'detail'" v-model="form.questionLableId">
                    <el-option v-for="l in labelList" :key="l.id" :value='l.id' :label='l.lableName'></el-option>
                </iSelect>
            </div>
            <div class="flex flex-column qs-params">
                <iLabel class="label" label="创建人" slot="label"></iLabel>
                <i-input class="input" type="text" disabled v-model="form.createByName" placeholder="请输入" />
            </div>
        </div>
        <iEditor class="flex-1 qs-editor" :class="[type == 'detail' ? 'overflow-auto' : 'overflow-hidden']" :disabled="type == 'detail'" v-if="form.answerContent" v-model="form.answerContent" :html="form.answerContent"></iEditor>
        <div class="flex" style="margin-top:20px;align-items: flex-start;">
            <div class="label">附件：</div>
            <iUpload ref="upload" :disabled="type == 'detail'" v-model="form.annexList" @onSuccess="uploadSucc" >
                <div class="upload-btn flex" v-if="type != 'detail'">
                    <i class="el-icon-link"></i>
                    <span>点击上传</span>
                </div>
            </iUpload>
            <span v-if="type == 'detail' && form.annexList && form.annexList.length == 0" >无</span>
        </div>
        
        <CreateQuestion 
            :qs="qs" 
            :source="userType" 
            :moduleList="moduleList" 
            :labelList="labelList" 
            :show.sync="dialog" 
            @refresh="$emit('addChange')"></CreateQuestion>
    </div>
</template>

<script>
    import { iInput, iLabel, iButton, iSelect } from "rise"
    import CreateQuestion from "../components/createQuestion"
    import iEditor from "./../../components/iEditor.vue"
    import { queryModuleBySource, getCurrLabelList, delFaq,updateFaq } from "@/api/assistant"
    import iUpload from "./../../components/iUpload.vue"

    export default {
        components:{
            iInput,
            iLabel,
            iButton,
            iSelect,
            iEditor,
            CreateQuestion,
            iUpload
        },
        props:{
            detail:{
                type:Object,
                default:()=>{}
            },
            qs:{
                type:Object,
                default:()=>{}
            },
            userType:{
                type: String,
                default: ""
            }
        },
        watch:{
            detail(n){
                this.form = JSON.parse(JSON.stringify(n))
                this.tempContent = n.answerContent ? JSON.parse(JSON.stringify(n.answerContent)) : ""
                this.moduleChange(this.form.questionModuleId)
            }
        },
        data() {
            return {
                form:{
                    questionModuleId:"",
                    questionLableId:"",
                    createBy:"",
                    questionTitle:"",
                    answerContent:""
                },
                dialog:false,
                type: "detail",
                moduleList:[],
                labelList:[],
                loading:false,
                tempContent:""
            }
        },
        created(){
            this.getModuleList()
        },
        methods: {
            async getModuleList(){
                let { data } = await queryModuleBySource(this.userType)
                this.moduleList = data
                return data
            },
            moduleChange(v){
                if(v){
                    getCurrLabelList(v).then(res => {
                        this.labelList = res.data
                        this.$forceUpdate()
                    })
                }
            },
            // 编辑
            async save(){
                if(!this.form.questionModuleId) return this.$message.warning("请选择问题模块")
                if(!this.form.questionLableId) return this.$message.warning("请选择标签")
                if(!this.form.createBy) return this.$message.warning("请输入创建人")
                if(!this.form.questionTitle) return this.$message.warning("请输入问题描述")
                if(!this.form.answerContent) return this.$message.warning("请输入回答内容")
                try {
                    this.loading = true
                    let res = await updateFaq(this.form.id, this.form)
                    if(res.code == 200){
                        this.$message.success("保存成功")
                        this.type = 'detail'
                        this.$emit("editChange")
                    }
                } finally {
                    this.loading = false
                }
            },
            del(){
                this.$confirm('确定要删除该问题吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await delFaq(this.detail.id)
                    this.$message.success("已删除")
                    this.$emit("delChange")
                })
            },
            edit(){
                this.type = 'edit'
            },
            cancel(){
                this.type = 'detail'
                this.form.answerContent = this.tempContent
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "../../comon.scss";
.qs{
   display: flex; 
   flex-direction: column;
   height: 100%;
   overflow: auto;
}
.qs-btns{
    text-align: right;
}
.qs-p{
    margin: 30px 0 10px;
    flex-wrap: wrap;
}

.qs-editor{
    flex:1;

    ::v-deep .quillWrapper{
        height: 100%;
        display: flex;
        flex-direction: column;
        border: 1px solid #eee;
        #quill-container{
            overflow: hidden;
        }
        .ql-editor{
            flex: 1;
        }
    }
}
.input{
    width: 320px !important;
}
.label{
    margin-bottom: 10px;
}
.qs-params{
    margin-bottom:20px;
    margin-right: 60px;
}
::v-deep .el-select .el-input__inner{
  height: auto !important;
}
.upload-btn{
    align-items: baseline;
    color: #2369f1;
    cursor: pointer;
    span{
        text-decoration: underline;
    }
}
</style>