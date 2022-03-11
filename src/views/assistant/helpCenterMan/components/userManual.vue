<template>
    <div class="manual" ref="content" v-loading="loading">
        <div class="manual-btns">
            <template v-if="type == 'detail'">
                <iButton v-if="qs.id" @click="del">{{language('删除')}}</iButton>
                <iButton v-if="qs.id" @click="edit">{{language('编辑')}}</iButton>
            </template>
            <template v-if="type == 'edit'">
                <template v-if="!preview">
                    <iButton @click="cancel">{{language('取消')}}</iButton>
                    <iButton @click="preview = true">{{language('预览')}}</iButton>
                    <iButton @click="save">{{language('保存')}}</iButton>
                </template>
                <iButton v-else @click="preview = false">{{language('返回')}}</iButton>
            </template>
        </div>
        <template v-if="type == 'detail'">
            <div class="manual-tlt" v-text="qs.menuName"></div>
            <div class="content" v-if="detail.manualContent" v-html="detail.manualContent"></div>
        </template>
        <template v-if="type == 'edit'">
            <div class="content" v-if="preview" v-html="content"></div>
            <template v-else>
                <iEditor class="content manual-editor" v-model="content" :html="content"></iEditor>
            </template>
        </template>
        <!-- <div class="flex" v-if="files.length > 0">
            <div v-if="type == 'detail'">附件：</div>
            <iUpload ref="upload" v-model="files" :disabled="type == 'detail'" :maxSize="20" >
                <div class="upload flex" v-if="type == 'edit'" style="align-items: end;">
                    <iButton>添加附件</iButton>
                    <span @click.stop=";">只能上传不超过20MB的文件</span>
                </div>
            </iUpload>
        </div> -->
    </div>
</template>

<script>
    import { iButton } from "rise"
    // import iEditor from "@/components/iEditor"
    import iUpload from "./../../components/iUpload.vue"
    import iEditor from "./../../components/iEditor.vue"
    import { delManual, insertNewManual } from "@/api/assistant"
    export default {
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
                this.files = n.attachmentList || []
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
                        source:this.userType,
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
                this.$confirm(this.language('确定要删除该问题吗?'), this.language('提示'), {
                    confirmButtonText: this.language('确定'),
                    cancelButtonText: this.language('取消'),
                    type: 'warning'
                }).then(async () => {
                    await delManual(this.detail.id)
                    this.$message.success("已删除")
                    this.$emit("refresh")
                })
            },
            edit(){
                this.type = 'edit'
                this.content = this.detail.manualContent ? JSON.parse(JSON.stringify(this.detail.manualContent)) : ""
            },
            cancel(){
                this.type = 'detail'
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
    margin-bottom: 10px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
}
.content{
    flex: 1;
    margin-top: 20px;
    padding: 20px 10px;
    overflow: auto;
}
.manual-editor{
    flex: 1;
    // margin-top: 40px;
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