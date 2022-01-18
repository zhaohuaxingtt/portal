<template>
   <iDialog
      :title="form.id ? '修改内容' : '添加内容'"
      :visible.sync="show"
      width="500px"
      @close="handleClose"
      @open="open"
    >
        <el-form :model="form" ref="form" label-width="90px" :inline="false" size="normal" class="validate-required-form" v-loading="loading">
            <iFormItem :label="language('Report类型')" prop="reportSection" :rules="{ required:true, message:'请选择', trigger:'change'}">
                <iSelect v-model="form.reportSection" filterable clearable @change="handleTypeChange">
                    <el-option v-for="item in reportSectionList" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
                    <el-option v-for="item in reportCategoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </iSelect>
            </iFormItem>
            <iFormItem :label="language('上传附件')" prop="file" :rules="{ required:true, message:'请选择', trigger:'change'}">
                <iUpload
                    v-model="form.file" 
                    btnTxt="选择文件"
                    maxSize= 10
                    :limit="1"
                    :picObject="true"
                ></iUpload>
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
    import iUpload from '@/views/adminProCS/components/iUpload.vue';
    import { addReportContent, updateReportContent, queryTypeList, queryCurrCategory } from '@/api/reportForm';
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
            },
            operateType: {
                type: String,
                default: 'add'
            },
        },
        data() {
            return {
                form:{
                    title: '',
                    reportSection: '',
                    publishDate: '',
                    reportCategory: '',
                    file: null
                },
                rules:{
                    reportSection: { required:true, message:"请选择报表类型",trigger:'blur' },
                    title: { required:true, message:"请输入报表标题",trigger:'blur' },
                    publishDate: { required:true, message:"请选择报表发布时期",trigger:'blur' },
                    reportCategory: { required:true, message:"请输入报表类型",trigger:'blur' }
                },
                reportSectionList: [],
                reportCategoryList: [],
                loading: false,
                uploadFileStream: null,
                currId: null
            }
        },
        methods: {
            async getTypeList() {
                console.log('1234')
                let params = {
                    page: 1,
                    size: 99
                }
                this.loading = true
                await queryTypeList(params).then(res => {
                    if (res?.code) {
                        this.reportSectionList = res?.data
                        this.loading = false
                    }
                })
            },
            handleTypeChange(va) {
                this.getCurrCategory(va)
            },
            async getCurrCategory(va) {
                let param = {
                    page: 1,
                    size: 99,
                    name: ' '
                }
                await queryCurrCategory(va, param).then(res => {
                    if (res?.code === '200') {
                        this.reportCategoryList = res?.data || []
                    }
                })
            },
            save(){
                this.$refs.form.validate(async v => {
                    if(v){
                        try {
                            if (this.operateType === 'add') {
                                this.form.file = this.form.file[0]?.fileUrl || ''
                                this.loading = true
                                await addReportContent(this.form).then(res => {
                                    if (res?.success) {
                                        this.$message({type: 'success', message: '新增内容成功'})
                                        this.loading = false
                                    }
                                })
                            } else {
                                this.form.file = Array.isArray(this.form.file) ? this.form.file[0]?.fileUrl || '' : this.form.file
                                this.loading = true
                                await updateReportContent(this.currId, this.form).then(res => {
                                    if (res?.success) {
                                        this.$message({type: 'success', message: '修改内容成功'})
                                        this.loading = false
                                    }
                                })
                            }
                            this.close()
                        } finally {
                            this.loading = false
                        }
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
                this.uploadFileStream = null
                this.currId = null
                this.$emit("update:show",false)
            },
            close() {
                this.handleClose()
                this.$emit('refresh')
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>