<template>
    <div class="manual" v-loading="loading">
        <div class="manual-btns">
            <template v-if="type == 'detail'">
                <iButton @click="del">删除</iButton>
                <iButton @click="type = 'edit'">编辑</iButton>
            </template>
            <template v-if="type == 'edit'">
                <template v-if="!preview">
                    <iButton @click="type = 'detail'">取消</iButton>
                    <iButton @click="preview = true">预览</iButton>
                    <iButton @click="save">保存</iButton>
                </template>
                <iButton v-else @click="preview = false">返回</iButton>
            </template>
        </div>
        <template v-if="type == 'detail'">
            <div class="manual-tlt" v-text="qs.menuName"></div>
            <div class="content" v-if="detail && detail.manualContent" v-html="detail.manualContent"></div>
        </template>
        <template v-if="type == 'edit'">
            <div v-if="preview" v-html="content"></div>
            <template v-else>        
                <iEditor class="manual-editor" v-model="content"></iEditor>
                <iUpload ref="upload" v-model="files" :maxSize="20" >
                    <div class="upload flex" style="align-items: end;">
                        <iButton>添加附件</iButton>
                        <span @click.stop=";">只能上传不超过20MB的文件</span>
                    </div>
                </iUpload>
            </template>
        </template>
    </div>
</template>

<script>
    import { iButton } from "rise"
    import iEditor from "@/components/iEditor"
    import iUpload from "./../../components/iUpload.vue"
    import { delManual, insertNewManual } from "@/api/assistant"
    import assistant_mixin from "./../../mixins"
    export default {
        mixins: [assistant_mixin],
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
        components: {
            iButton,
            iEditor,
            iUpload
        },
        data() {
            return {
                type:"detail",
                content:"",
                files:[],
                preview:false,
                loading:false
            }
        },
        watch:{
            detail(n){
                this.content = n && n.manualContent ? JSON.parse(JSON.stringify(n.manualContent)) : ""
            }
        },
        methods: {
            async save(){
                if(!this.content) return this.$message.warning("请输入内容")
                try {
                    this.loading = true
                    await insertNewManual({
                        id:this.detail.id || "",
                        moduleId:this.qs.id,
                        manualContent:this.content,
                        source:this.getUserType(),
                        attachmentList: this.files
                    })
                    this.$message.success("保存成功")
                    this.type = "detail"
                    this.$emit("refresh")
                } finally {
                    this.loading = false
                }
            },
            async del(){
                this.$confirm('确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await delManual(this.detail.id)
                    this.$message.success("已删除")
                    this.$emit("refresh")
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
@import "./../../comon.scss";

.manual{
    height: 100%;
    display: flex;
    flex-direction: column;
    .manual-btns{
        text-align: right;
    }
}

.manual-tlt{
    padding: 40px 0 20px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
}
.content{
    padding: 20px 10px;
}
.manual-editor{
    flex: 1;
    margin-top: 40px;
    overflow: hidden;
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
.upload{
    margin-top: 20px;
    span{
        margin-left: 20px;
        color: #999;
    }
}
</style>