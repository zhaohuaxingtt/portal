<template>
   <iDialog
      :title="form.id ? '修改内容' : '添加内容'"
      :visible.sync="show"
      width="500px"
      @close="handleClose"
      @open="open"
    >
        <el-form :model="form" ref="form" label-width="90px" :inline="false" size="normal">
            <iFormItem :label="language('报表类型')" prop="type" :rules="{ required:true, message:'请选择', trigger:'change'}">
                <iSelect v-model="form.type" filterable clearable>
                    <el-option v-for="item in status" :key="item.id" :label="item.lableName" :value="item.id"></el-option>
                </iSelect>
            </iFormItem>
            <iFormItem :label="language('报表标题')" prop="name" :rules="{ required:true, message:'请输入', trigger:'blur'}">
                <iInput v-model="form.name"></iInput>
            </iFormItem>
            <iFormItem :label="language('发布日期')" prop="date" :rules="{ required:true, message:'请输入', trigger:'blur'}">
                <iDatePicker
                    value-format="yyyy-MM-dd"
                    type="date"
                    v-model="form.date"
                    style="width:100%"
                    />
            </iFormItem>
            <iFormItem :label="language('报表分类')" prop="cate" :rules="{ required:true, message:'请选择', trigger:'change'}">
                <iSelect v-model="form.cate" filterable clearable>
                    <el-option v-for="item in status" :key="item.id" :label="item.lableName" :value="item.id"></el-option>
                </iSelect>
            </iFormItem>
            <iFormItem :label="language('上传附件')" prop="file" :rules="{ required:true, message:'请选择', trigger:'change'}">
                <iUpload v-model="form.file" btnTxt="选择文件"></iUpload>
            </iFormItem>
        </el-form>
        
        <span slot="footer" class="dialog-footer">
            <i-button @click="save">保存</i-button>
            <i-button @click="handleClose">取消</i-button>
        </span>
    </iDialog>
</template>

<script>
    import {iDialog,iButton,iInput,iFormItem, iSelect, iDatePicker} from 'rise';
    import iUpload from './../../components/iUpload.vue';
    export default {
        components: {
            iDialog,
            iButton,
            iInput,
            iFormItem,
            iSelect,
            iDatePicker,
            iUpload
        },
        props:{
            show:{
                type:Boolean,
                default:false
            },
            params:{
                type:Object,
                default: () => {}
            }
        },
        data() {
            return {
                form:{
                    type:""
                },
                rules:{

                }
            }
        },
        methods: {
            save(){
                this.$refs.form.validate(v => {
                    if(v){
                        // 
                    }
                })
            },
            open(){
                this.form = Object.assign({},this.form,this.params)
            },
            handleClose(){
                this.form = {
                    
                }
                this.$emit("update:show",false)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>