<template>
    <div class="manual">
        <div class="manual-btns">
            <template v-if="type == 'detail'">
                <iButton>删除</iButton>
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
            <div class="manual-tlt">主数据管理</div>
            <div class="content">
                <div>（1）供应商在首页点击注册，打开供应商账号申请界面；</div>
                <div>（2）在供应商申请界面输入供应商信息，包括联系人姓名，供应商中文名，临时号，职位，部门，区号，联系电话，手机号码等；</div>
            </div>
        </template>
        <template v-if="type == 'edit'">
            <div v-if="preview" v-html="content"></div>
            <iEditor v-else class="manual-editor" v-model="content"></iEditor>
            <div class="upload">
                <iButton @click="upload">添加附件</iButton>
                <span>只能上传不超过20MB的文件</span>
                <iUpload v-show="false" ref="upload" @callback="uploadChange" />
            </div>
            <FileList v-for="(f,i) in files" :key="i" :file="f" @del="delFile"></FileList>
        </template>
    </div>
</template>

<script>
    import { iButton, iUpload } from "rise"
    import iEditor from "@/components/iEditor"
    import FileList from "./fileList"
    
    export default {
        components: {
            iButton,
            iEditor,
            iUpload,
            FileList
        },
        data() {
            return {
                type:"detail",
                content:"",
                files:[
                    {name:'1.png'}
                ],
                preview:false
            }
        },
        methods: {
            upload(){
                this.$refs.upload.$el.querySelector("input[type='file']").click()
            },
            uploadChange(file){
                console.log(file+'-------');
            },
            save(){
                
            },
            delFile(file){
                
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