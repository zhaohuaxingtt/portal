<template>
    <div class="manual">
        <div class="manual-btns">
            <template v-if="type == 'detail'">
                <iButton>删除</iButton>
                <iButton @click="type = 'edit'">编辑</iButton>
            </template>
            <template v-else>
                <iButton @click="type = 'detail'">取消</iButton>
                <iButton>预览</iButton>
                <iButton>保存</iButton>
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
            <iEditor class="manual-editor"  v-model="content"></iEditor>
            <div class="upload">
                <iButton @click="upload">添加附件</iButton>
                <span>只能上传不超过20MB的文件</span>
                <iUpload v-show="false" ref="upload" @callback="uploadChange" />
            </div>
            <div>{{file}}</div>
        </template>
    </div>
</template>

<script>
    import { iButton, iEditor, iUpload } from "rise"
    
    export default {
        components: {
            iButton,
            iEditor,
            iUpload
        },
        data() {
            return {
                type:"detail",
                content:"",
                file:""
            }
        },
        methods: {
            upload(){
                this.$refs.upload.$el.querySelector("input[type='file']").click()
            },
            uploadChange(file){
                console.log(JSON.stringify(file)+'-------');
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
    ::v-deep .editor{
        height: 100%;
        display: flex;
        flex-direction: column;
        border: 1px solid #eee;
        .w-e-text-container{
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