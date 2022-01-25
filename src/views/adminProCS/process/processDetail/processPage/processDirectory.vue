<template>
<!-- 流程目录 -->
    <iDialog
        title="主流程目录"
        :visible.sync="show" 
        width="600px" 
        @close='close' 
        @open="open"
        append-to-body
        class="process-dialog"
    >
        <div class="content">
            <iButton class="mb20" @click="editDialog = true">添加一级目录</iButton>
           <el-tree
            :data="data"
            node-key="id"
            class="p-tree"
            expand-on-click-node>
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                    <el-button
                        type="text"
                        size="mini"
                        @click.stop="() => append(data)">
                        添加
                    </el-button>
                    <el-button
                        type="text"
                        size="mini"
                        @click.stop="() => edit(node, data)">
                        编辑
                    </el-button>
                    <el-button
                        v-if="!data.children"
                        type="text"
                        size="mini"
                        @click.stop="() => remove(node, data)">
                        删除
                    </el-button>
                </span>
            </span>
            </el-tree> 
        </div>
        <div class="flex felx-row mt20 pb20 justify-end ">
            <iButton @click="close">{{ language('取消') }}</iButton>
        </div>

        <iDialog
            title="添加目录"
            :visible.sync="editDialog" 
            width="500px" 
            @close='editClose' 
            class="process-dialog"
            append-to-body
        >
            <el-form 
                :model="form" 
                :rules="rules" 
                label-width="90px" 
                ref="form"
                class="validate-required-form"
            >
                <iFormItem :label="language('目录中文名')" prop='cnName'>
                    <iInput v-model="form.cnName"  placeholder="请输入目录中文名"></iInput>
                </iFormItem>
                <iFormItem :label="language('目录英文名')" prop='enName'>
                    <iInput v-model="form.enName"  placeholder="请输入目录英文名"></iInput>
                </iFormItem>
                <iFormItem :label="language('流程页面')" prop='workFlowPage'>
                    <iSelect
                        v-model="form.workFlowPage"
                        filterable
                        clearable
                        
                        placeholder="请选择页面"
                        >
                        <el-option
                            v-for="item in options"
                            :key="item.code"
                            :label="item.value"
                            :value="item.code"
                        ></el-option>
                        </iSelect>
                </iFormItem>
            </el-form>
             <div class="flex felx-row mt20 pb20 justify-end ">
                <iButton @click="close">{{ language('取消') }}</iButton>
                <iButton @click="save">{{ language('确认') }}</iButton>
            </div>
        </iDialog>
    </iDialog>
</template>

<script>
import {iDialog,iButton, iInput,iFormItem,iSelect} from 'rise';
import {queryProcessCatalogue} from '@/api/adminProCS';
export default {
    components: {
        iDialog,
        iButton,
        iInput,
        iFormItem,
        iSelect
    },
    props:{
        show:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            data:[{
                id: 1,
                label: '一级 1',
                children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                    id: 9,
                    label: '三级 1-1-1'
                }, {
                    id: 10,
                    label: '三级 1-1-2'
                }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                id: 5,
                label: '二级 2-1'
                }, {
                id: 6,
                label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                id: 7,
                label: '二级 3-1'
                }, {
                id: 8,
                label: '二级 3-2'
                }]
            }],
            editDialog:false,
            form:{
                cnName:"",
                enName:"",
                workFlowPage:""
            },
            rules:{
                cnName:[
                    { required: true, message: '请输入目录中文名!', trigger:"blur" },
                    {max:50,message:'目录中文名长度不能超过50个字符！',trigger:"blur"},
                ],
                enName:[
                    { required: true, message: '请输入目录英文名!', trigger:"blur" },
                    {max:50,message:'目录英文名长度不能超过50个字符！',trigger:"blur"},
                ]
            },
            options:[],
            id:this.$route.query.id
        }
    },
    methods: {
        close(){
            this.$emit("update:show",false)
        },
        async open(){
            this.data = await queryProcessCatalogue(this.id)
        },
        editClose(){
            this.editDialog = false
        },
        save(){

        },
        append(){
            this.editDialog = true
        },
        edit(){
            this.editDialog = true
        },
        remove(){}
    },
}
</script>

<style lang="scss" scoped>
@import "./../../../comon";
.p-tree{
    ::v-deep .el-tree-node__content{   
        margin-bottom: 10px;
    }
    .custom-tree-node{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
}
</style>