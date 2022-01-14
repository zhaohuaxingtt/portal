<template>
   <iDialog
      :title="form.id ? '修改内容' : '添加内容'"
      :visible.sync="show"
      width="500px"
      @close="handleClose"
      @open="open"
    >
        <el-form :model="form" ref="form" label-width="90px" :inline="false" size="normal">
            <iFormItem :label="language('Report类型')" prop="reportSection" :rules="{ required:true, message:'请选择', trigger:'change'}">
                <iSelect v-model="form.reportSection" filterable clearable>
                    <el-option v-for="item in reportSectionList" :key="item.id" :label="item.lableName" :value="item.id"></el-option>
                </iSelect>
            </iFormItem>
            <iFormItem :label="language('Report标题')" prop="title" :rules="{ required:true, message:'请输入', trigger:'blur'}">
                <iInput v-model="form.title"></iInput>
            </iFormItem>
            <iFormItem :label="language('发布日期')" prop="publishDate" :rules="{ required:true, message:'请输入', trigger:'blur'}">
                <iDatePicker
                    value-format="yyyy-MM-dd"
                    type="date"
                    v-model="form.publishDate"
                    style="width:100%"
                    />
            </iFormItem>
            <iFormItem :label="language('报表分类')" prop="reportCategory" :rules="{ required:true, message:'请选择', trigger:'change'}">
                <iSelect v-model="form.reportCategory" filterable clearable>
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
    import {iDialog,iButton,iInput, iSelect, iDatePicker, iFormItem} from 'rise';
    import iUpload from './../../components/iUpload.vue';
    import { addReportContent, queryTypeList } from '@/api/reportForm';
    export default {
        components: {
            iDialog,
            iButton,
            iInput,
            iSelect,
            iDatePicker,
            iUpload,
            iFormItem
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
                    reportSection: '',
                    type:""
                },
                rules:{
                    reportSection:"",
                    title:"",
                    publishDate:"",
                    reportCategory:""
                },
                reportSectionList: []
            }
        },
        created() {
            this.getTypeList()
        },
        methods: {
            async getTypeList() {
                let params = {
                    page: this.page.currPage,
                    size: this.page.pageSize
                }
                await queryTypeList(params).then(res => {
                    console.log(res, '12222')
                })
            },
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
                    reportSection: '',
                    title:"",
                    publishDate:"",
                    reportCategory:""
                }
                this.$emit("update:show",false)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>