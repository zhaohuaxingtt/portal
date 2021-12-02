<template>
    <div class="qs" v-loading="loading">
        <div class="qs-btns">
            <template v-if="type == 'detail'">
                <template v-if="detail.id">
                    <iButton @click="del">删除</iButton>
                    <iButton @click="type = 'edit'">编辑</iButton>
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
            <div class="flex flex-column qs-params">
                <iLabel class="label" label="问题描述" slot="label"></iLabel>
                <i-input class="input" type="text" :disabled="type == 'detail'" v-model="form.questionTitle" placeholder="请输入" />
            </div>
        </div>
        <iEditor class="flex-1 qs-editor" :disabled="type == 'detail'" v-model="form.answerContent"></iEditor>

        <CreateQuestion 
            :qs="qs" 
            :source="getUserType()" 
            :moduleList="moduleList" 
            :labelList="labelList" 
            :show.sync="dialog" 
            @moduleChange="moduleChange"
            @refresh="$emit('addChange')"></CreateQuestion>
    </div>
</template>

<script>
    import { iInput, iLabel, iButton, iSelect } from "rise"
    import CreateQuestion from "../components/createQuestion"
    import iEditor from "@/components/iEditor"
    import { queryModuleBySource, getCurrLabelList, delFaq,updateFaq } from "@/api/assistant"
    import assistant_mixin from "./../../mixins"

    export default {
        mixins: [assistant_mixin],
        components:{
            iInput,
            iLabel,
            iButton,
            iSelect,
            iEditor,
            CreateQuestion
        },
        props:{
            detail:{
                type:Object,
                default:()=>{}
            },
            qs:{
                type:Object,
                default:()=>{}
            }
        },
        watch:{
            detail(n){
                this.form = JSON.parse(JSON.stringify(n))
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
                loading:false
            }
        },
        async created(){
            let { data } = await queryModuleBySource(this.getUserType())
            this.moduleList = data
        },
        methods: {
            moduleChange(v){
                getCurrLabelList(v).then(res => {
                    this.labelList = res.data
                    this.$forceUpdate()
                })
            },
            async save(){
                if(!this.form.questionModuleId) return this.$message.warning("请选择问题模块")
                if(!this.form.questionLableId) return this.$message.warning("请选择标签")
                if(!this.form.createBy) return this.$message.warning("请输入创建人")
                if(!this.form.questionTitle) return this.$message.warning("请输入问题描述")
                if(!this.form.answerContent) return this.$message.warning("请输入回答内容")
                try {
                    this.loading = true
                    await updateFaq(this.form.id, this.form)
                    this.$message.success("保存成功")
                    this.$emit("editChange")
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
            cancel(){
                this.type = 'detail'
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
}
.qs-btns{
    text-align: right;
}
.qs-p{
    margin: 30px 0 10px;
    flex-wrap: wrap;
}

.qs-editor{
    // height: 100%;
    // display: flex;
    // flex-direction: column;
    ::v-deep .w-e-text-container{
        height: auto !important;
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
</style>