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
        <div class="content" v-loading="loading">
            <iButton class="mb20" @click="addFirst">添加一级目录</iButton>
           <el-tree
            :data="tree"
            node-key="id"
            class="p-tree"
            expand-on-click-node>
            <span class="custom-tree-node" slot-scope="{ data }">
                <span>{{ data.name && data.name.ch }}</span>
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
                        @click.stop="() => edit(data)">
                        编辑
                    </el-button>
                    <el-button
                        v-if="!data.children || data.children.length == 0"
                        type="text"
                        size="mini"
                        @click.stop="() => remove(data)">
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
                label-width="100px" 
                ref="form"
                v-loading="formLoading"
                class="validate-required-form"
            >
                <iFormItem :label="language('目录中文名')" prop='cnName'>
                    <iInput v-model="form.cnName" maxlength="50" placeholder="请输入目录中文名"></iInput>
                </iFormItem>
                <iFormItem :label="language('目录英文名')" prop='enName'>
                    <iInput v-model="form.enName" maxlength="50" placeholder="请输入目录英文名"></iInput>
                </iFormItem>
                <iFormItem :label="language('流程页面')" prop='workFlowPage'>
                    <iSelect
                        v-model="form.workFlowPage"
                        filterable
                        clearable
                        placeholder="请选择页面"
                        >
                        <el-option
                            v-for="item in processPageList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                        </iSelect>
                </iFormItem>
                <div class="flex felx-row mt20 pb20 justify-end ">
                    <iButton @click="editClose">{{ language('取消') }}</iButton>
                    <iButton @click="save">{{ language('确认') }}</iButton>
                </div>
            </el-form>
        </iDialog>
    </iDialog>
</template>

<script>
import {iDialog,iButton, iInput,iFormItem,iSelect} from 'rise';
import {queryProcessCatalogue,addProcessCatalogue, updateProcessCatalogue, deleteProcessCatalogueNode, loadProcessPageList} from '@/api/adminProCS';
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
            tree:[],
            editDialog:false,
            form:{
                cnName:"",
                enName:"",
                workFlowPage:""
            },
            formLoading:false,
            parent:"",
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
            processPageList:[],
            id:this.$route.query.id,
            loading:false
        }
    },
    methods: {
        close(){
            this.$emit("update:show",false)
        },
        async open(){
            try {
                this.loading = true
                this.query()
                let pRes = await loadProcessPageList(this.id,{page:0,size:10000})
                this.processPageList = pRes.content
            } finally {
                this.loading = false
            }
        },
        async query(){
            try {
                this.loading = true
                let res = await queryProcessCatalogue(this.id)
                this.tree = res.children
                this.parent = res.id
            } finally {
                this.loading = false
            }
        },
        editClose(){
            this.form = {
                cnName:"",
                enName:"",
                workFlowPage:""
            }
            this.$refs.form.resetFields()
            this.editDialog = false
        },
        save(){
            this.$refs.form.validate(async v => {
                if(v){
                    this.formLoading = true
                    let data = new FormData()
                    for (const key in this.form) {
                        data.append(key, this.form[key])
                    }
                    try {
                        if(this.form.id){
                            await updateProcessCatalogue(this.form.id, data)
                        }else{
                            await addProcessCatalogue(this.id, data)
                        }
                        this.$message.success("保存成功")
                        this.editClose()
                        this.query()
                    } finally {
                        this.formLoading = false
                    }
                }
            })
        },
        addFirst(){
            this.form.parent = this.parent
            this.editDialog = true
        },
        append(data){
            this.form.parent = data.id
            this.editDialog = true
        },
        edit(data){
            this.form = {
                cnName: data.name.ch,
                enName: data.name.en,
                workFlowPage: data.pageId,
                id:data.id
            }
            this.editDialog = true
        },
        remove(data){
             this.$confirm('确定删除此目录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await deleteProcessCatalogueNode(data.id)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.query()
                })
        }
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
        align-items: center;
    }
}
</style>