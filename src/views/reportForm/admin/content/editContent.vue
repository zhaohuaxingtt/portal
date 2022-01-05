<template>
   <iDialog
      title="添加内容"
      :visible.sync="show"
      width="500px"
      @close="handleClose"
      @open="open"
    >
        <el-form :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal">
            <iFormItem :label="language('报表类型')" prop="type">
                <iSelect v-model="form.type" filterable clearable>
                    <el-option v-for="item in status" :key="item.id" :label="item.lableName" :value="item.id"></el-option>
                </iSelect>
            </iFormItem>
            <iFormItem :label="language('报表标题')" prop="name">
                <iInput v-model="form.name"></iInput>
            </iFormItem>
            <iFormItem :label="language('发布日期')">
                <iDatePicker
                    value-format="yyyy-MM-dd"
                    type="date"
                    v-model="form.date"
                    style="width:100%"
                    />
            </iFormItem>
            <iFormItem :label="language('报表分类')">
                <iSelect v-model="form.cate" filterable clearable>
                    <el-option v-for="item in status" :key="item.id" :label="item.lableName" :value="item.id"></el-option>
                </iSelect>
            </iFormItem>
            <iFormItem :label="language('上传附件')">
                <iUpload v-model="form.attchment" btnTxt="选择文件"></iUpload>
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
                form:{},
                rules:{

                }
            }
        },
        methods: {
            save(){
                
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