<template>
     <iDialog
      :visible.sync="show"
      title="新建问题"
      @close="closeDialog"
      width="800px"
      min-height="400px"
    >
        <div class="content">
            <iFormGroup :model="form" ref="demoForm" :inline="true">
                <el-form-item label="问题模块">
                    <i-input class="input" type="text" v-model="keyword" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="问题标签" style="margin-left:30px">
                    <i-input class="input" type="text" v-model="keyword" placeholder="请输入" />
                </el-form-item>
                <div class="flex flex-column" style="margin-bottom:20px;">
                    <iLabel class="label" label="问题描述" slot="label"></iLabel>
                    <i-input class="textarea" rows="5" type="textarea" v-model="keyword" placeholder="请输入" />
                </div>
                <div class="flex flex-column">
                    <iLabel class="label" label="问题描述" slot="label"></iLabel>
                    <i-input class="textarea" rows="5" type="textarea" v-model="keyword" placeholder="请输入" />
                </div>
            </iFormGroup>
        </div>
        <div slot="footer">
            <iButton>上 传</iButton>
            <iButton>确 认</iButton>
        </div>
    </iDialog>
</template>

<script>
    import { iDialog, iFormGroup, iInput, iLabel, iButton } from "rise"
    export default {
        components:{
            iDialog,
            iFormGroup,
            iInput,
            iButton,
            iLabel
        },
        props:{
            show:{
                type: Boolean,
                default:false
            }  
        },
        data() {
            return {
                form:{}
            }
        },
        methods: {
            closeDialog(){
                console.log(1)
                this.$emit("update:show",false)
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

.label{
    margin-bottom: 10px;
}
</style>