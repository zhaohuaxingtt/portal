<template>
   <iDialog
      :title="form.id ? language('修改内容') : language('添加内容')"
      :visible.sync="show"
      width="500px"
      @close="handleClose"
      @open="open"
    >
        <el-form :model="form" ref="form" :rules="rules" label-width="120px" :inline="false" size="normal" class="validate-required-form" v-loading="loading">
            <iFormItem :label="language('Report类型')" prop="reportSectionId">
                <iSelect v-model="form.reportSectionId" filterable clearable @change="handleTypeChange">
                    <el-option v-for="item in reportSectionList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </iSelect>
            </iFormItem>
            <iFormItem :label="language('Report标题')" prop="title">
                <iInput v-model="form.title"></iInput>
            </iFormItem>
            <iFormItem :label="language('发布日期')" prop="publishDate">
                <iDatePicker
                    value-format="yyyy-MM-dd"
                    type="date"
                    v-model="form.publishDate"
                    style="width:100%"
                    />
            </iFormItem>
            <iFormItem :label="language('报表分类')" prop="reportCategoryId">
                <iSelect v-model="form.reportCategoryId" filterable clearable>
                    <el-option v-for="item in reportCategoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </iSelect>
            </iFormItem>
            <iFormItem :label="language('上传附件')" prop="file">
                <iUpload
                    v-model="form.file"
                    :btnTxt="language('选择文件')"
                    maxSize= 10
                    :limit="1"
                ></iUpload>
            </iFormItem>
        </el-form>
        
        <span slot="footer" class="dialog-footer">
            <i-button @click="save">{{language('保存')}}</i-button>
            <i-button @click="handleClose">{{language('取消')}}</i-button>
        </span>
    </iDialog>
</template>

<script>
    import {iDialog,iButton,iInput, iSelect, iDatePicker, iFormItem} from 'rise';
    import iUpload from '@/views/adminProCS/components/iUpload.vue';
    import { addReportContent, updateReportContent, queryCurrTypeList, getCategoryById } from '@/api/reportForm';
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
                    reportSectionId: '',
                    publishDate: '',
                    reportCategoryId: '',
                    file: null
                },
                rules:{
                    reportSectionId: { required:true, message: this.language("请选择报表类型") ,trigger:'change' },
                    title: { required:true, message: this.language("请输入报表标题") ,trigger:'blur' },
                    publishDate: { required:true, message: this.language("请选择报表发布时期") ,trigger:'blur' },
                    reportCategoryId: { required:true, message: this.language("请输入报表类型") ,trigger:'change' },
                    file: {required:true, message:this.language('请选择附件'), trigger:'change'}
                },
                reportSectionList: [],
                reportCategoryList: [],
                loading: false,
                uploadFileStream: null,
                currId: null,
                // pickerOptions: {
                //     disabledDate(time) {
                //         return time.getTime() < Date.now() - 8.64e7
                //     }
                // }
            }
        },
        methods: {
            async getTypeList() {
                this.loading = true
                await queryCurrTypeList().then(res => {
                    if (res) {
                        this.reportSectionList = res || []
                        this.loading = false
                    }
                })
            },
            handleTypeChange(va) {
                this.form.reportCategoryId = ''
                this.getCurrCategory(va)
            },
            async getCurrCategory(va) {
                if (!va) return this.reportCategoryList = []
                await getCategoryById(va).then(res => {
                    if (res) {
                        this.reportCategoryList = res || []
                    }
                })
            },
            save(){
                this.$refs.form.validate(async v => {
                    if(v){
                        try {
                            if (this.operateType === 'add') {
                                this.form.cover = this.form.file[0]?.fileUrl || ''
                                this.form.source = this.form.file[0]?.fileName || ''
                                this.form.reportCategoryId = this.form.reportCategoryId + ''
                                this.loading = true
                                await addReportContent(this.form).then(res => {
                                    if (res?.success) {
                                        this.$message({type: 'success', message: '新增内容成功'})
                                        this.loading = false
                                    }
                                })
                            } else {
                                this.form.cover = this.form.file[0]?.fileUrl || ''
                                this.form.source = this.form.file[0]?.fileName || ''
                                this.form.reportCategoryId = this.form.reportCategoryId + ''
                                this.loading = true
                                await updateReportContent(this.form).then(res => {
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
                    reportSectionId: '',
                    title:"",
                    publishDate:"",
                    reportCategoryId:"" 
                }
                this.uploadFileStream = null
                this.currId = null
                this.reportCategoryList = []
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