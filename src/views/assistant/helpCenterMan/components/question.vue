<template>
    <div class="qs">
        <div class="qs-btns">
            <template v-if="type == 'detail'">
                <iButton>删除</iButton>
                <iButton>编辑</iButton>
                <iButton @click="dialog = true">新建问题</iButton>
            </template>
            <template v-else>
                <iButton>取消</iButton>
                <iButton>确定</iButton>
            </template>
        </div>
        <div class="flex qs-p">
            <div class="flex flex-column qs-params">
                <iLabel class="label" label="问题模块" slot="label"></iLabel>
                <iSelect class="input" v-model="form.module">
                    <el-option value='' label='全部'></el-option>
                </iSelect>
            </div>
            <div class="flex flex-column qs-params">
                <iLabel class="label" label="标签" slot="label"></iLabel>
                <i-input class="input" type="text" v-model="form.tag" placeholder="请输入" />
            </div>
            <div class="flex flex-column qs-params">
                <iLabel class="label" label="创建人" slot="label"></iLabel>
                <i-input class="input" type="text" v-model="form.creator" placeholder="请输入" />
            </div>
        </div>
        <iEditor class="flex-1 qs-editor" v-model="form.content"></iEditor>

        <CreateQuestion :show.sync="dialog"></CreateQuestion>
    </div>
</template>

<script>
    import { iInput, iLabel, iButton, iSelect, iEditor } from "rise"
    import CreateQuestion from "../components/createQuestion"
    export default {
        components:{
            iInput,
            iLabel,
            iButton,
            iSelect,
            iEditor,
            CreateQuestion
        },
        data() {
            return {
                form:{
                    content:""
                },
                dialog:false,
                type: "detail"
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
</style>