<template>
   <iDialog
      title="添加内容"
      :visible.sync="show"
      width="500px"
      @open="handleOpen"
      @close="handleClose"
    >
        <el-form :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal">
            <iFormItem :label="language('报表类型')">
                <iSelect v-model="form.type" filterable clearable>
                    <el-option v-for="item in status" :key="item.id" :label="item.lableName" :value="item.id"></el-option>
                </iSelect>
            </iFormItem>
            <iFormItem :label="language('报表标题')">
                <iInput v-model="form.type"></iInput>
            </iFormItem>
            <iFormItem :label="language('发布日期')">
                <iDatePicker
                    value-format="yyyy-MM-dd"
                    type="date"
                    v-model="form.date"
                    />
            </iFormItem>
            <iFormItem :label="language('报表分类')">
                <iSelect v-model="form.type" filterable clearable>
                    <el-option v-for="item in status" :key="item.id" :label="item.lableName" :value="item.id"></el-option>
                </iSelect>
            </iFormItem>
            <iFormItem :label="language('上传附件')">
                <iInput v-model="form.type"></iInput>
            </iFormItem>
        </el-form>
        
        <span slot="footer" class="dialog-footer">
            <i-button @click="handleSave">保存</i-button>
            <i-button @click="handleCancel">取消</i-button>
        </span>
    </iDialog>
</template>

<script>
    import {iDialog,iButton,iInput,iFormItem, iSelect, iDatePicker} from 'rise';
    export default {
        components: {
            iDialog,
            iButton,
            iInput,
            iFormItem,
            iSelect,
            iDatePicker
        },
        props:{
            show:{
                type:Boolean,
                default:false
            }
        },
        data() {
            return {
                form:{}
            }
        },
        methods: {
            handleOpen(){

            },
            handleClose(){}
        },
    }
</script>

<style lang="scss" scoped>

</style>