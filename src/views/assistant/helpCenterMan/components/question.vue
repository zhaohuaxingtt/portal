<template>
    <div class="qs">
        <div class="qs-btns">
            <template v-if="type == 'detail'">
                <iButton @click="del">删除</iButton>
                <iButton @click="type = 'edit'">编辑</iButton>
                <iButton @click="dialog = true">新建问题</iButton>
            </template>
            <template v-else>
                <iButton @click="type = 'detail'">取消</iButton>
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
                <i-input class="input" type="text" :disabled="type == 'detail'" v-model="form.createBy" placeholder="请输入" />
            </div>
        </div>
        <iEditor class="flex-1 qs-editor" :disabled="type == 'detail'" v-model="form.answerContent"></iEditor>

        <CreateQuestion :qs="qs" :source="getUserType()" :moduleList="moduleList" :labelList="labelList" :show.sync="dialog" @moduleChange="moduleChange"></CreateQuestion>
    </div>
</template>

<script>
    import { iInput, iLabel, iButton, iSelect } from "rise"
    import CreateQuestion from "../components/createQuestion"
    import iEditor from "@/components/iEditor"
    import { queryModuleBySource, getCurrLabelList, delFaq } from "@/api/assistant"
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
            }
        },
        data() {
            return {
                form:{
                    module:"",
                    tag:"",
                    creator:"",
                    content:""
                },
                dialog:false,
                type: "detail",
                moduleList:[],
                labelList:[],
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
                })
            },
            save(){

            },
            del(){
                this.$confirm('确定要删除该问题吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await delFaq(this.detail.id)
                    this.$message.success("已删除")
                    this.$emit("refresh")
                })
            }
        },
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
    width: 320px;
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